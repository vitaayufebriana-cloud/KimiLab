import { useState, useEffect, useCallback } from 'react';
import { quizAsamBasa, modulAsamBasa } from '../../data/chemData';
import {
  getQuizSession,
  saveQuizDraft,
  submitQuizSession,
  resetQuizDraft,
  startNewQuizAttempt,
} from '../../lib/localStore';

/**
 * Komponen Kuis Interaktif (QuizSection) untuk Modul 1: Larutan Asam dan Basa
 * Sesuai PRD, AGENTS.md, dan Ketentuan Teknis:
 * - Local-First dengan pemulihan otomatis saat refresh melalui localStore.js
 * - Opsi ganda (A, B, C, D, E) dengan mode 'Satu per Satu' atau 'Daftar Semua Soal'
 * - Pembekuan jawaban pretest/diagnostik sebelum tombol kirim ditekan
 * - Pembahasan ilmiah dan skor akhir terbuka setelah kirim
 * - Pengerjaan ulang setelah pembahasan selalu menghasilkan ID percobaan baru (UUID)
 * - Tombol reset draf berkonfirmasi
 * - Aksesibilitas keyboard penuh (Tab/Enter/Space)
 * 
 * @param {{ onUpdateProgress?: (moduleId: string, percent: number) => void }} props
 */
export default function QuizSection({ onUpdateProgress }) {
  const quizData = modulAsamBasa?.quiz || quizAsamBasa;
  const questions = quizData.questions || [];
  const totalQuestions = questions.length;

  // State sesi kuis yang dimuat langsung dari localStore
  const [session, setSession] = useState(() =>
    getQuizSession(quizData.moduleId, quizData.version)
  );

  // State dialog konfirmasi
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showNotification = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 3200);
  };

  // Sinkronisasi reactive event kuis
  const syncSession = useCallback(() => {
    const current = getQuizSession(quizData.moduleId, quizData.version);
    setSession(current);
  }, [quizData.moduleId, quizData.version]);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e?.detail) {
        setSession(e.detail);
      } else {
        syncSession();
      }
    };

    window.addEventListener('kimilab_quiz_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('kimilab_quiz_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [syncSession]);

  const isSubmitted = session.status === 'submitted';
  const currentIndex = session.currentQuestionIndex || 0;
  const currentQuestion = questions[currentIndex] || questions[0];
  const userAnswers = session.answers || {};

  // Hitung jumlah butir yang telah dijawab
  const answeredCount = Object.keys(userAnswers).filter(
    (key) => userAnswers[key] !== undefined && userAnswers[key] !== null
  ).length;

  const isAllAnswered = answeredCount === totalQuestions;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Handler memilih jawaban (hanya aktif jika belum disubmit / jawaban belum beku)
  const handleSelectOption = (questionId, optionKey) => {
    if (isSubmitted) return; // BEKUKAN JAWABAN jika sudah submitted

    const nextAnswers = {
      ...userAnswers,
      [questionId]: optionKey,
    };

    const updated = saveQuizDraft(quizData.moduleId, {
      answers: nextAnswers,
    });
    setSession(updated);
  };

  // Handler navigasi nomor soal
  const handleJumpToQuestion = (idx) => {
    if (idx < 0 || idx >= totalQuestions) return;
    const updated = saveQuizDraft(quizData.moduleId, {
      currentQuestionIndex: idx,
    });
    setSession(updated);
  };

  // Handler ganti mode tampilan (Satu per Satu vs Daftar Semua)
  const handleToggleViewMode = (mode) => {
    const updated = saveQuizDraft(quizData.moduleId, {
      viewMode: mode,
    });
    setSession(updated);
  };

  // Handler konfirmasi submit
  const handleSubmitClick = () => {
    if (!isAllAnswered) {
      setConfirmSubmitOpen(true);
    } else {
      executeSubmit();
    }
  };

  const executeSubmit = () => {
    setConfirmSubmitOpen(false);
    const submitted = submitQuizSession(quizData.moduleId, {
      answers: userAnswers,
      questions,
      version: quizData.version,
    });

    setSession(submitted);

    // Integrasi progres modul (otomatis 100% jika tuntas kuis)
    if (onUpdateProgress) {
      onUpdateProgress(quizData.moduleId, 100);
    }

    showNotification(
      `🎉 Kuis berhasil dikirim! Skor kamu: ${submitted.score}/100. Jawaban dibekukan dan pembahasan terbuka.`
    );

    // Scroll mulus ke ringkasan skor
    const resultsElem = document.getElementById('quiz-results-banner');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler reset draf dengan konfirmasi
  const handleExecuteReset = () => {
    setConfirmResetOpen(false);
    const reset = resetQuizDraft(quizData.moduleId, quizData.version);
    setSession(reset);
    showNotification('🔄 Draf jawaban berhasil dikosongkan.');
  };

  // Handler pengerjaan ulang (Retake) dengan ID percobaan baru (UUID)
  const handleStartNewAttempt = () => {
    const fresh = startNewQuizAttempt(quizData.moduleId, quizData.version);
    setSession(fresh);
    showNotification(
      `✨ Memulai percobaan baru! ID Percobaan baru: ${fresh.attemptId.slice(0, 8)}...`
    );
    const quizTop = document.getElementById('kuis-asam-basa');
    if (quizTop) {
      quizTop.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="kuis-asam-basa"
      className="quiz-section-container"
      aria-labelledby="quiz-main-heading"
    >
      {/* Header Utama Kuis */}
      <div className="quiz-section-header">
        <div className="section-pill-tag">
          <span className="sparkle-icon" aria-hidden="true">📝</span>
          <span>EVALUASI KOMPREHENSIF • LOCAL FIRST</span>
        </div>
        <h2 id="quiz-main-heading" className="quiz-main-title">
          {quizData.title}
        </h2>
        <p className="quiz-main-subtitle">{quizData.description}</p>

        {/* Baris Meta Kuis: ID Percobaan, Versi, dan Status */}
        <div className="quiz-meta-bar">
          <div className="quiz-meta-pill" title="ID Percobaan acak unik sesuai standar UUID v4">
            <span className="meta-icon" aria-hidden="true">🆔</span>
            <span className="meta-label">ID Percobaan:</span>
            <code className="meta-code">
              {session.attemptId ? `${session.attemptId.slice(0, 8)}...` : 'Generating...'}
            </code>
          </div>

          <div className="quiz-meta-pill">
            <span className="meta-icon" aria-hidden="true">🏷️</span>
            <span className="meta-label">Versi:</span>
            <code className="meta-code">{session.version || 'v1'}</code>
          </div>

          <div
            className={`quiz-status-tag ${
              isSubmitted ? 'status-submitted' : 'status-draft'
            }`}
          >
            <span className="status-dot"></span>
            <span>
              {isSubmitted
                ? '🔒 Jawaban Dibekukan (Pembahasan Terbuka)'
                : '✍️ Mode Pengerjaan (Draf Otomatis Tersimpan)'}
            </span>
          </div>
        </div>
      </div>

      {/* Banner Hasil Skor & Umpan Balik (Tampil saat Submitted) */}
      {isSubmitted && (
        <div id="quiz-results-banner" className="quiz-score-banner" role="region" aria-label="Hasil Kuis">
          <div className="score-banner-glow" aria-hidden="true"></div>
          <div className="score-banner-content">
            <div className="score-badge-circle">
              <span className="score-number">{session.score}</span>
              <span className="score-denominator">/ 100</span>
            </div>

            <div className="score-details-text">
              <div className="score-title-row">
                <h3 className="score-grade-title">
                  {session.score >= 80
                    ? '🎉 Sangat Menguasai (Kognitif C4–C5 Teruji)!'
                    : session.score >= 70
                    ? '👍 Tuntas & Memahami Konsep Asam-Basa!'
                    : '💡 Perlu Penguatan Konsep & Reviu Materi!'}
                </h3>
                <span className="score-status-chip">
                  {session.correctCount} dari {session.totalQuestions} Soal Benar
                </span>
              </div>

              <p className="score-feedback-text">
                {session.score >= 80
                  ? 'Pemahaman analitis Anda mengenai kesetimbangan ionisasi air, pasangan konjugasi, dan stoikiometri logaritmik pH sangat kuat.'
                  : session.score >= 70
                  ? 'Selamat, Anda telah melewati standar kompetensi kelulusan kuis. Pelajari pembahasan di bawah untuk menyempurnakan pemahaman butir soal yang belum tepat.'
                  : 'Jangan berkecil hati. Buka kembali bagian materi mengenai derajat ionisasi (α), perhitungan basa bervalensi dua, dan pengaruh pengenceran terhadap pH sebelum mencoba kembali.'}
              </p>

              <div className="score-actions-row">
                <button
                  type="button"
                  id="btn-retake-quiz"
                  className="btn-score-retake"
                  onClick={handleStartNewAttempt}
                  title="Kerjakan ulang kuis dengan ID percobaan baru"
                >
                  <span aria-hidden="true">🔄</span>
                  <span>Kerjakan Ulang (ID Percobaan Baru)</span>
                </button>

                <a href="#modul-belajar" className="btn-score-review">
                  <span aria-hidden="true">📖</span>
                  <span>Ulas Materi Modul 1</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kontrol Navigasi & Progres Kuis */}
      <div className="quiz-controls-card">
        <div className="quiz-progress-info">
          <div className="progress-text-row">
            <span className="progress-answered-label">
              Progres Pengerjaan: <strong>{answeredCount}</strong> dari {totalQuestions} terjawab
            </span>
            <span className="progress-percent-label">{progressPercent}%</span>
          </div>
          <div
            className="quiz-progress-track"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="quiz-progress-fill"
              style={{
                width: `${progressPercent}%`,
                background: isSubmitted
                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                  : 'linear-gradient(90deg, #8b5cf6, #38bdf8)',
              }}
            ></div>
          </div>
        </div>

        {/* Toolbar Switcher Mode & Tombol Aksi */}
        <div className="quiz-toolbar-row">
          <div className="view-mode-selector" role="group" aria-label="Mode Tampilan Soal">
            <button
              type="button"
              id="btn-mode-single"
              className={`view-mode-btn ${session.viewMode === 'single' ? 'active' : ''}`}
              onClick={() => handleToggleViewMode('single')}
              aria-pressed={session.viewMode === 'single'}
            >
              <span aria-hidden="true">🎯</span>
              <span>Satu per Satu</span>
            </button>
            <button
              type="button"
              id="btn-mode-list"
              className={`view-mode-btn ${session.viewMode === 'list' ? 'active' : ''}`}
              onClick={() => handleToggleViewMode('list')}
              aria-pressed={session.viewMode === 'list'}
            >
              <span aria-hidden="true">📑</span>
              <span>Daftar Semua Soal</span>
            </button>
          </div>

          <div className="quiz-toolbar-actions">
            {!isSubmitted && (
              <button
                type="button"
                id="btn-reset-draft-quiz"
                className="btn-toolbar-ghost btn-reset-draft"
                onClick={() => setConfirmResetOpen(true)}
                disabled={answeredCount === 0}
                title="Kosongkan seluruh pilihan jawaban yang belum dikirim"
              >
                <span aria-hidden="true">🗑️</span>
                <span>Reset Draf</span>
              </button>
            )}

            {!isSubmitted ? (
              <button
                type="button"
                id="btn-submit-quiz"
                className="btn-toolbar-primary"
                onClick={handleSubmitClick}
              >
                <span>Kirim & Selesaikan Kuis</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <button
                type="button"
                id="btn-retake-header"
                className="btn-toolbar-retake"
                onClick={handleStartNewAttempt}
              >
                <span>🔄 Percobaan Baru</span>
              </button>
            )}
          </div>
        </div>

        {/* Palette Nomor Soal (1–10) */}
        <nav
          className="question-palette-nav"
          aria-label="Daftar nomor soal kuis"
        >
          <div className="palette-grid">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = currentIndex === idx && session.viewMode === 'single';
              const isCorrect = isSubmitted && userAnswers[q.id] === q.correctAnswer;
              const isWrong = isSubmitted && isAnswered && !isCorrect;

              let statusClass = '';
              if (isSubmitted) {
                statusClass = isCorrect ? 'palette-correct' : isWrong ? 'palette-wrong' : 'palette-empty';
              } else if (isAnswered) {
                statusClass = 'palette-answered';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  id={`palette-btn-${idx + 1}`}
                  className={`palette-num-btn ${isCurrent ? 'active-question' : ''} ${statusClass}`}
                  onClick={() => {
                    handleJumpToQuestion(idx);
                    if (session.viewMode === 'list') {
                      const elem = document.getElementById(`question-card-${q.id}`);
                      if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  aria-label={`Soal nomor ${idx + 1}${isAnswered ? ' (sudah dijawab)' : ''}`}
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  <span className="num-text">{idx + 1}</span>
                  {isSubmitted && (
                    <span className="palette-indicator-icon" aria-hidden="true">
                      {isCorrect ? '✓' : isWrong ? '✗' : '–'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Konten Soal (Mode Satu per Satu ATAU Daftar Semua Soal) */}
      <div className="quiz-questions-container">
        {session.viewMode === 'single' ? (
          // MODE 1: SATU PER SATU
          <article
            id={`question-card-${currentQuestion.id}`}
            className="single-question-card"
            aria-labelledby={`q-title-${currentQuestion.id}`}
          >
            <div className="question-card-top-bar">
              <div className="question-index-chip">
                <span>Soal <strong>{currentIndex + 1}</strong> dari {totalQuestions}</span>
              </div>
              <div className="question-level-tags">
                <span className="tag-level">{currentQuestion.level}</span>
                <span className="tag-topic">{currentQuestion.topic}</span>
              </div>
              {isSubmitted && (
                <div
                  className={`question-result-badge ${
                    userAnswers[currentQuestion.id] === currentQuestion.correctAnswer
                      ? 'badge-correct'
                      : 'badge-wrong'
                  }`}
                >
                  {userAnswers[currentQuestion.id] === currentQuestion.correctAnswer
                    ? '✓ Jawaban Benar (+10)'
                    : '✗ Jawaban Kurang Tepat (0)'}
                </div>
              )}
            </div>

            <div className="question-statement-box">
              <p
                id={`q-title-${currentQuestion.id}`}
                className="question-statement-text"
              >
                {currentQuestion.question}
              </p>
            </div>

            {/* Opsi Pilihan Ganda (A, B, C, D, E) */}
            <div
              className="options-group"
              role="radiogroup"
              aria-label={`Pilihan jawaban untuk soal nomor ${currentIndex + 1}`}
            >
              {currentQuestion.options.map((opt) => {
                const isSelected = userAnswers[currentQuestion.id] === opt.key;
                const isRightAnswer = isSubmitted && opt.key === currentQuestion.correctAnswer;
                const isSelectedWrong = isSubmitted && isSelected && !isRightAnswer;

                let optionStateClass = '';
                if (isSubmitted) {
                  if (isRightAnswer) optionStateClass = 'option-correct-highlight';
                  else if (isSelectedWrong) optionStateClass = 'option-wrong-highlight';
                  else optionStateClass = 'option-disabled';
                } else if (isSelected) {
                  optionStateClass = 'option-selected';
                }

                return (
                  <button
                    key={opt.key}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={isSubmitted}
                    id={`opt-${currentQuestion.id}-${opt.key}`}
                    className={`quiz-option-item ${optionStateClass}`}
                    onClick={() => handleSelectOption(currentQuestion.id, opt.key)}
                  >
                    <div className="option-radio-visual" aria-hidden="true">
                      <span className="option-key-letter">{opt.key}</span>
                    </div>
                    <div className="option-text-wrap">
                      <span className="option-text">{opt.text}</span>
                    </div>
                    {isSubmitted && (
                      <div className="option-feedback-icon" aria-hidden="true">
                        {isRightAnswer ? '✓ Kunci Benar' : isSelectedWrong ? '✗ Jawaban Anda' : ''}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pembahasan Ilmiah (HANYA MUNCUL JIKA SUDAH DISUBMIT / PEMBAHASAN DIBUKA) */}
            {isSubmitted && (
              <div className="scientific-explanation-card" role="region" aria-label="Pembahasan Soal">
                <div className="explanation-header">
                  <div className="explanation-tag">
                    <span aria-hidden="true">🔬</span>
                    <span>Pembahasan Ilmiah & Konsep Reaksi</span>
                  </div>
                  <span className="explanation-key-chip">
                    Kunci Jawaban: <strong>{currentQuestion.correctAnswer}</strong>
                  </span>
                </div>
                <p className="explanation-body-text">{currentQuestion.explanation}</p>
                <div className="explanation-footer-info">
                  <span>Indikator: <strong>{currentQuestion.topic}</strong></span>
                  <span>Tingkat Kognitif: <strong>{currentQuestion.level}</strong></span>
                </div>
              </div>
            )}

            {/* Navigasi Soal Sebelumnya & Berikutnya */}
            <div className="single-question-nav-row">
              <button
                type="button"
                id="btn-prev-question"
                className="btn-nav-step"
                onClick={() => handleJumpToQuestion(currentIndex - 1)}
                disabled={currentIndex === 0}
                aria-label="Pindah ke soal sebelumnya"
              >
                <span aria-hidden="true">&larr;</span>
                <span>Soal Sebelumnya</span>
              </button>

              <span className="question-nav-counter">
                {currentIndex + 1} / {totalQuestions}
              </span>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  id="btn-next-question"
                  className="btn-nav-step btn-nav-primary"
                  onClick={() => handleJumpToQuestion(currentIndex + 1)}
                  aria-label="Pindah ke soal berikutnya"
                >
                  <span>Soal Berikutnya</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              ) : !isSubmitted ? (
                <button
                  type="button"
                  id="btn-finish-nav-submit"
                  className="btn-nav-step btn-nav-finish"
                  onClick={handleSubmitClick}
                >
                  <span>Selesai & Kirim</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-nav-step btn-nav-finish"
                  onClick={() => {
                    const resultsElem = document.getElementById('quiz-results-banner');
                    if (resultsElem) resultsElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Lihat Skor</span>
                  <span aria-hidden="true">&uarr;</span>
                </button>
              )}
            </div>
          </article>
        ) : (
          // MODE 2: DAFTAR SEMUA SOAL LENGKAP
          <div className="all-questions-list-view">
            {questions.map((q, idx) => {
              const selectedOption = userAnswers[q.id];
              const isRight = isSubmitted && selectedOption === q.correctAnswer;

              return (
                <article
                  key={q.id}
                  id={`question-card-${q.id}`}
                  className={`list-question-card ${
                    isSubmitted ? (isRight ? 'card-right' : 'card-wrong') : ''
                  }`}
                  aria-labelledby={`q-list-title-${q.id}`}
                >
                  <div className="question-card-top-bar">
                    <div className="question-index-chip">
                      <span>Soal <strong>0{idx + 1}</strong></span>
                    </div>
                    <div className="question-level-tags">
                      <span className="tag-level">{q.level}</span>
                      <span className="tag-topic">{q.topic}</span>
                    </div>
                    {isSubmitted && (
                      <div
                        className={`question-result-badge ${
                          isRight ? 'badge-correct' : 'badge-wrong'
                        }`}
                      >
                        {isRight ? '✓ Benar (+10)' : '✗ Kurang Tepat (0)'}
                      </div>
                    )}
                  </div>

                  <p id={`q-list-title-${q.id}`} className="question-statement-text">
                    {q.question}
                  </p>

                  <div
                    className="options-group"
                    role="radiogroup"
                    aria-label={`Pilihan jawaban untuk soal nomor ${idx + 1}`}
                  >
                    {q.options.map((opt) => {
                      const isSelected = selectedOption === opt.key;
                      const isCorrectAnswer = isSubmitted && opt.key === q.correctAnswer;
                      const isSelectedWrong = isSubmitted && isSelected && !isCorrectAnswer;

                      let optClass = '';
                      if (isSubmitted) {
                        if (isCorrectAnswer) optClass = 'option-correct-highlight';
                        else if (isSelectedWrong) optClass = 'option-wrong-highlight';
                        else optClass = 'option-disabled';
                      } else if (isSelected) {
                        optClass = 'option-selected';
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          disabled={isSubmitted}
                          id={`opt-list-${q.id}-${opt.key}`}
                          className={`quiz-option-item ${optClass}`}
                          onClick={() => handleSelectOption(q.id, opt.key)}
                        >
                          <div className="option-radio-visual" aria-hidden="true">
                            <span className="option-key-letter">{opt.key}</span>
                          </div>
                          <div className="option-text-wrap">
                            <span className="option-text">{opt.text}</span>
                          </div>
                          {isSubmitted && (
                            <div className="option-feedback-icon" aria-hidden="true">
                              {isCorrectAnswer ? '✓ Kunci Benar' : isSelectedWrong ? '✗ Pilihan Anda' : ''}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pembahasan Ilmiah di Mode Daftar Lengkap */}
                  {isSubmitted && (
                    <div className="scientific-explanation-card">
                      <div className="explanation-header">
                        <div className="explanation-tag">
                          <span aria-hidden="true">🔬</span>
                          <span>Pembahasan Ilmiah:</span>
                        </div>
                        <span className="explanation-key-chip">
                          Kunci Jawaban: <strong>{q.correctAnswer}</strong>
                        </span>
                      </div>
                      <p className="explanation-body-text">{q.explanation}</p>
                    </div>
                  )}
                </article>
              );
            })}

            {/* Tombol Kirim di Bawah Mode Daftar */}
            {!isSubmitted && (
              <div className="list-view-footer-submit">
                <button
                  type="button"
                  id="btn-list-submit-quiz"
                  className="btn-toolbar-primary btn-large-submit"
                  onClick={handleSubmitClick}
                >
                  <span>Kirim & Selesaikan Kuis (10 Soal)</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Dialog Konfirmasi Reset Draf */}
      {confirmResetOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
        >
          <div className="modal-content-box modal-box-alert">
            <div className="modal-alert-icon" aria-hidden="true">⚠️</div>
            <h3 id="reset-modal-title" className="modal-alert-title">
              Kosongkan Draf Jawaban Kuis?
            </h3>
            <p className="modal-alert-desc">
              Tindakan ini akan menghapus semua pilihan jawaban yang telah Anda pilih untuk percobaan saat ini.
              Sesi dan ID percobaan akan tetap aktif.
            </p>
            <div className="modal-alert-actions">
              <button
                type="button"
                className="btn-alert-cancel"
                onClick={() => setConfirmResetOpen(false)}
              >
                Batal
              </button>
              <button
                type="button"
                id="btn-confirm-reset-draft"
                className="btn-alert-confirm"
                onClick={handleExecuteReset}
              >
                Ya, Kosongkan Draf
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dialog Konfirmasi Submit (jika masih ada soal yang belum dijawab) */}
      {confirmSubmitOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
        >
          <div className="modal-content-box modal-box-alert">
            <div className="modal-alert-icon" aria-hidden="true">❓</div>
            <h3 id="submit-modal-title" className="modal-alert-title">
              Masih Ada Soal Belum Terjawab
            </h3>
            <p className="modal-alert-desc">
              Anda baru menjawab <strong>{answeredCount}</strong> dari {totalQuestions} soal.
              Soal yang tidak dijawab akan dihitung sebagai 0. Setelah kuis dikirim, seluruh jawaban akan dibekukan dan pembahasan akan terbuka.
            </p>
            <div className="modal-alert-actions">
              <button
                type="button"
                className="btn-alert-cancel"
                onClick={() => setConfirmSubmitOpen(false)}
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                type="button"
                id="btn-confirm-force-submit"
                className="btn-alert-confirm btn-alert-success"
                onClick={executeSubmit}
              >
                Tetap Kirim Jawaban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert Kuis */}
      {toastMsg && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span>{toastMsg}</span>
        </div>
      )}
    </section>
  );
}

