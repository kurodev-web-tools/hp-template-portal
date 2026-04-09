/**
 * Quiz Funnel Application
 * Personal Wellness Diagnosis
 * Vanilla JS - No Frameworks
 */

const quizApp = (function () {
    'use strict';

    // ============================================
    // Quiz Data
    // ============================================
    const quizData = {
        questions: [
            {
                id: 1,
                title: '<span class="text-safe">今の生活で</span><span class="text-safe">一番の悩みは</span><span class="text-safe">何ですか？</span>',
                options: [
                    { id: 'q1-a', icon: '😴', text: '疲れやすくて<span class="text-safe">活力がない</span>', value: 'energy' },
                    { id: 'q1-b', icon: '😰', text: 'ストレスが<span class="text-safe">溜まりやすい</span>', value: 'stress' },
                    { id: 'q1-c', icon: '🏃', text: '運動不足を<span class="text-safe">感じている</span>', value: 'exercise' },
                    { id: 'q1-d', icon: '🍽️', text: '食生活が<span class="text-safe">不規則</span>', value: 'diet' }
                ]
            },
            {
                id: 2,
                title: '<span class="text-safe">普段の運動量は</span><span class="text-safe">どのくらいですか？</span>',
                options: [
                    { id: 'q2-a', icon: '🛋️', text: 'ほとんど<span class="text-safe">運動しない</span>', value: 'none' },
                    { id: 'q2-b', icon: '🚶', text: '週に<span class="text-safe">1〜2回程度</span>', value: 'light' },
                    { id: 'q2-c', icon: '🏃', text: '週に<span class="text-safe">3〜4回程度</span>', value: 'moderate' },
                    { id: 'q2-d', icon: '💪', text: '週に<span class="text-safe">5回以上</span>', value: 'active' }
                ]
            },
            {
                id: 3,
                title: '<span class="text-safe">1ヶ月後の目標は</span><span class="text-safe">何ですか？</span>',
                options: [
                    { id: 'q3-a', icon: '⚡', text: '毎日をもっと<span class="text-safe">元気に</span><span class="text-safe">過ごしたい</span>', value: 'vitality' },
                    { id: 'q3-b', icon: '🧘', text: '心身のバランスを<span class="text-safe">整えたい</span>', value: 'balance' },
                    { id: 'q3-c', icon: '✨', text: '美しさと健康を<span class="text-safe">両立させたい</span>', value: 'beauty' },
                    { id: 'q3-d', icon: '🎯', text: '具体的な体型や<span class="text-safe">数値を</span><span class="text-safe">改善したい</span>', value: 'shape' }
                ]
            }
        ]
    };

    // Result patterns based on answer combinations
    const resultPatterns = {
        'energy-none-vitality': {
            course: 'スタミナ充電<br>コース',
            icon: '⚡',
            description: 'エネルギーを回復し、毎日を活力あふれるものにするためのプランです。基礎代謝向上と疲労回復に特化したプログラムで、無理なく元気を取り戻しましょう。',
            features: ['疲労回復プログラム', '栄養バランス改善', '睡眠サポート'],
            matchPercentage: 97,
            reason: '運動不足でエネルギーが不足しているあなたに、無理なく<span class="text-safe">体力をつけながら</span><span class="text-safe">活力を回復する</span><span class="text-safe">方法を提供します。</span>'
        },
        'stress-light-balance': {
            course: 'マインドフルネス<br>コース',
            icon: '🧘',
            description: '心と身体のバランスを整え、ストレスと向き合う力を育むプランです。ヨガや瞑想を取り入れながら、内側からの美しさを引き出します。',
            features: ['ストレスケア', 'ヨガ・瞑想', '睡眠改善'],
            matchPercentage: 95,
            reason: 'ストレスを感じやすいあなたに、<span class="text-safe">心身のバランスを</span><span class="text-safe">整えながら</span><span class="text-safe">リラックスできる習慣を</span><span class="text-safe">身につけさせます。</span>'
        },
        'exercise-moderate-beauty': {
            course: 'ビューティーフィットネス<br>コース',
            icon: '✨',
            description: '適度に運動しているあなたのさらなる可能性を引き出すプラン。美しさと健康を両立させながら、理想のスタイルを追求します。',
            features: ['パーソナルトレーニング', '美容栄養指導', '姿勢改善'],
            matchPercentage: 96,
            reason: '運動習慣があるあなたに、<span class="text-safe">美しさと健康を</span><span class="text-safe">両立させるための</span><span class="text-safe">専門的なアプローチを</span><span class="text-safe">提供します。</span>'
        },
        'diet-none-shape': {
            course: 'ライフスタイルリセット<br>コース',
            icon: '🎯',
            description: '不規則な食生活を改善し、健康的な体型を目指すプランです。無理な食事制限ではなく、継続可能な食習慣を構築します。',
            features: ['食事改善プログラム', '栄養カウンセリング', '生活リズム整備'],
            matchPercentage: 98,
            reason: '食生活が不規則なあなたに、<span class="text-safe">無理なく続けられる</span><span class="text-safe">食習慣と</span><span class="text-safe">健康的な体型作りを</span><span class="text-safe">サポートします。</span>'
        },
        default: {
            course: 'パーソナライズド・ウェルネス<br>コース',
            icon: '🌟',
            description: 'あなたのライフスタイルに合わせて、最適なプログラムをカスタマイズします。専門家が一人ひとりに寄り添い、目標達成をサポートします。',
            features: ['完全パーソナライズ', '専門家サポート', '継続サポート'],
            matchPercentage: 94,
            reason: 'あなたの回答から、専門家が<span class="text-safe">最適なプランを</span><span class="text-safe">ご提案させていただきます。</span>'
        }
    };

    // Loading messages
    const loadingMessages = [
        '回答を集計中...',
        'ライフスタイルを分析中...',
        '最適なプランを計算中...',
        'パーソナライズデータを生成中...'
    ];

    // ============================================
    // State Management
    // ============================================
    let state = {
        currentQuestion: 0,
        answers: [],
        isAnimating: false
    };

    // ============================================
    // DOM Elements
    // ============================================
    const elements = {
        hero: document.getElementById('hero'),
        quiz: document.getElementById('quiz'),
        loading: document.getElementById('loading'),
        result: document.getElementById('result'),
        progressFill: document.getElementById('progressFill'),
        currentQuestion: document.getElementById('currentQuestion'),
        totalQuestions: document.getElementById('totalQuestions'),
        questionNum: document.getElementById('questionNum'),
        questionTitle: document.getElementById('questionTitle'),
        questionOptions: document.getElementById('questionOptions'),
        questionCard: document.getElementById('questionCard'),
        loadingPercentage: document.getElementById('loadingPercentage'),
        loadingText: document.getElementById('loadingText'),
        loadingProgress: document.querySelector('.loading-progress'),
        resultCourse: document.getElementById('resultCourse'),
        resultDescription: document.getElementById('resultDescription'),
        resultFeatures: document.getElementById('resultFeatures'),
        resultReason: document.getElementById('resultReason'),
        resultIcon: document.getElementById('resultIcon'),
        matchFill: document.getElementById('matchFill'),
        matchPercentage: document.getElementById('matchPercentage')
    };

    // ============================================
    // Helper Functions
    // ============================================
    function showSection(sectionName) {
        // Hide all sections
        [elements.hero, elements.quiz, elements.loading, elements.result].forEach(section => {
            if (section) {
                section.classList.remove('active');
            }
        });

        // Show target section
        const targetSection = elements[sectionName];
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo(0, 0);
        }
    }

    function updateProgress() {
        const progress = ((state.currentQuestion) / quizData.questions.length) * 100;
        if (elements.progressFill) {
            elements.progressFill.style.width = progress + '%';
        }
        if (elements.currentQuestion) {
            elements.currentQuestion.textContent = state.currentQuestion + 1;
        }
    }

    function getResultKey() {
        // Simple pattern matching based on first 3 answers
        const key = state.answers.slice(0, 3).join('-');
        return resultPatterns[key] ? key : 'default';
    }

    // ============================================
    // Quiz Logic
    // ============================================
    function renderQuestion() {
        const question = quizData.questions[state.currentQuestion];

        if (!question) return;

        // Update question number and title
        if (elements.questionNum) {
            elements.questionNum.textContent = question.id;
        }
        if (elements.questionTitle) {
            elements.questionTitle.innerHTML = question.title;
        }

        // Render options
        if (elements.questionOptions) {
            elements.questionOptions.innerHTML = question.options.map(option => `
                <button class="option-btn" data-value="${option.value}" onclick="quizApp.selectOption('${option.value}')">
                    <span class="option-icon">${option.icon}</span>
                    <span class="option-text">${option.text}</span>
                    <span class="option-arrow">→</span>
                </button>
            `).join('');
        }

        // Reset animation
        if (elements.questionCard) {
            elements.questionCard.classList.remove('slide-out');
            elements.questionCard.style.animation = 'none';
            elements.questionCard.offsetHeight; // Trigger reflow
            elements.questionCard.style.animation = 'slideInRight 0.4s ease';
        }

        updateProgress();
    }

    function nextQuestion() {
        if (state.currentQuestion < quizData.questions.length - 1) {
            // Animate out current question
            if (elements.questionCard) {
                elements.questionCard.classList.add('slide-out');
            }

            setTimeout(() => {
                state.currentQuestion++;
                renderQuestion();
            }, 300);
        } else {
            showLoading();
        }
    }

    // ============================================
    // Loading Animation
    // ============================================
    function showLoading() {
        showSection('loading');

        let progress = 0;
        let messageIndex = 0;
        const duration = 2500; // 2.5 seconds
        const interval = 50; // Update every 50ms
        const increment = 100 / (duration / interval);

        // Reset loading state
        const steps = document.querySelectorAll('.loading-step');
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index === 0) step.classList.add('active');
        });

        const loadingInterval = setInterval(() => {
            progress += increment;

            // Update percentage
            if (elements.loadingPercentage) {
                elements.loadingPercentage.textContent = Math.min(Math.floor(progress), 100) + '%';
            }

            // Update progress circle
            if (elements.loadingProgress) {
                const offset = 251.2 - (251.2 * Math.min(progress, 100) / 100);
                elements.loadingProgress.style.strokeDashoffset = offset;
            }

            // Update messages and steps
            const stepThresholds = [25, 50, 75];
            stepThresholds.forEach((threshold, index) => {
                if (progress >= threshold && steps[index]) {
                    if (index > 0) {
                        steps[index - 1].classList.remove('active');
                        steps[index - 1].classList.add('completed');
                    }
                    steps[index].classList.add('active');
                }
            });

            // Cycle through loading messages
            const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
            if (elements.loadingText && loadingMessages[messageIndex]) {
                elements.loadingText.textContent = loadingMessages[messageIndex];
            }

            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    showResult();
                }, 500);
            }
        }, interval);
    }

    // ============================================
    // Result Display
    // ============================================
    function showResult() {
        const resultKey = getResultKey();
        const result = resultPatterns[resultKey] || resultPatterns.default;

        // Update result content
        if (elements.resultCourse) {
            elements.resultCourse.innerHTML = result.course;
        }
        if (elements.resultDescription) {
            elements.resultDescription.textContent = result.description;
        }
        if (elements.resultIcon) {
            elements.resultIcon.textContent = result.icon;
        }
        if (elements.resultReason) {
            elements.resultReason.innerHTML = result.reason;
        }

        // Update features
        if (elements.resultFeatures) {
            elements.resultFeatures.innerHTML = result.features.map(feature =>
                `<span class="feature-tag">${feature}</span>`
            ).join('');
        }

        // Update match percentage with animation
        if (elements.matchPercentage) {
            elements.matchPercentage.textContent = result.matchPercentage + '%';
        }
        if (elements.matchFill) {
            setTimeout(() => {
                elements.matchFill.style.width = result.matchPercentage + '%';
            }, 300);
        }

        showSection('result');
    }

    // ============================================
    // Public Methods
    // ============================================
    function startQuiz() {
        state.currentQuestion = 0;
        state.answers = [];

        if (elements.totalQuestions) {
            elements.totalQuestions.textContent = quizData.questions.length;
        }

        showSection('quiz');
        renderQuestion();
    }

    function selectOption(value) {
        if (state.isAnimating) return;
        state.isAnimating = true;

        state.answers.push(value);

        // Visual feedback
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            if (btn.dataset.value === value) {
                btn.classList.add('selected');
            }
        });

        setTimeout(() => {
            state.isAnimating = false;
            nextQuestion();
        }, 300);
    }

    function restartQuiz() {
        state.currentQuestion = 0;
        state.answers = [];

        // Reset match bar
        if (elements.matchFill) {
            elements.matchFill.style.width = '0%';
        }

        showSection('hero');
    }

    function showDetails() {
        // Navigate to the plan details page
        window.location.href = 'plan.html';
    }

    // Initialize on load
    function init() {
        // Pre-set total questions
        if (elements.totalQuestions) {
            elements.totalQuestions.textContent = quizData.questions.length;
        }
    }

    // Run init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    return {
        startQuiz,
        selectOption,
        restartQuiz,
        showDetails
    };
})();
