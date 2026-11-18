/**
 * cloudService.js — Penulisan hasil percobaan kuis ke Cloud Firestore.
 *
 * Menyimpan satu dokumen per percobaan di koleksi `attempts`.
 * Document ID = attemptId (UUID dari localStore) sehingga proses
 * kirim ulang (retry) bersifat idempotent dan tidak pernah duplikat.
 *
 * Struktur dokumen:
 *   userId    : string  (uid Firebase Auth — dipakai oleh Security Rules)
 *   attemptId : string  (UUID v4)
 *   moduleId, stage, answers, startedAt, endedAt, score, version
 *   createdAt : server timestamp
 */

import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, waitForAuthUser, isFirebaseConfigured, FIREBASE_NOT_CONFIGURED_MESSAGE } from './firebaseService';
import { payloadOf } from './attemptContract';

export class NotSignedInError extends Error {
  constructor() {
    super('not-signed-in');
    this.name = 'NotSignedInError';
  }
}

/**
 * Menyimpan satu attempt ke Firestore.
 * @param {object} attempt — minimal: { moduleId, stage, startedAt, endedAt, score, answers, version, attemptId }
 * @returns {Promise<{ attemptId: string }>}
 * @throws {NotSignedInError} jika belum ada sesi Firebase (user belum login Google)
 * @throws {Error} jika Firebase belum dikonfigurasi atau penulisan ke Firestore gagal
 */
export async function saveAttempt(attempt) {
  if (!isFirebaseConfigured || !db) {
    throw new Error(FIREBASE_NOT_CONFIGURED_MESSAGE);
  }

  const user = await waitForAuthUser();
  if (!user) {
    throw new NotSignedInError();
  }

  const attemptId = attempt?.attemptId || crypto.randomUUID();
  const payload = {
    userId: user.uid,
    attemptId,
    ...JSON.parse(payloadOf(attempt || {})),
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'attempts', attemptId), payload, { merge: true });
  return { attemptId };
}
