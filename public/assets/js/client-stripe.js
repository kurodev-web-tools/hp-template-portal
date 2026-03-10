document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('standard-order-modal');
    // Select all potential open buttons
    const openBtns = document.querySelectorAll('.btn-order-trigger');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('standard-order-form');
    const modalTitle = modal?.querySelector('.modal-title');

    if (!modal) return;

    // Open Modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const planType = btn.dataset.planType;

            // Update modal title dynamically
            if (modalTitle) {
                const planName = planType.charAt(0).toUpperCase() + planType.slice(1);
                modalTitle.textContent = `${planName} Plan お申し込み`;
            }

            // Add hidden field for plan type if not exists
            let planField = form.querySelector('input[name="plan_type"]');
            if (!planField) {
                planField = document.createElement('input');
                planField.type = 'hidden';
                planField.name = 'plan_type';
                form.appendChild(planField);
            }
            planField.value = planType;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Handle Form Submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Make sure Stripe is loaded before proceeding
            // This prevents ad-blockers or slow network from breaking the modal opening
            if (typeof Stripe === 'undefined') {
                alert('決済システム（Stripe）の準備ができていないか、広告ブロッカー等によってブロックされています。\nページを再読み込みするか、広告ブロッカーを一時的に無効にして再試行してください。');
                return;
            }

            let stripe;
            try {
                // Initialize Stripe with Live Publishable Key
                stripe = Stripe('pk_live_51SxogT1rosuOg7Ytyxo2Thw5b7eiPa7diZpJrN9JTUD2arbBHp8mqPu20bnMqLYZpnM63reKRhJleqKR7fJCSHBH00EOfaunAM');
            } catch (err) {
                console.error('Stripe initialization failed:', err);
                alert('決済システムの初期化に失敗しました。');
                return;
            }

            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="material-icons spin">refresh</span> 処理中...';

            const formData = new FormData(form);

            // 1. (Removed Netlify Forms submission)

            // 2. Prepare data for Stripe backend
            const data = {
                customerEmail: formData.get('email'),
                customerName: formData.get('name'),
                successUrl: window.location.origin + '/submission-success.html',
                cancelUrl: window.location.href,
                metadata: {
                    plan: formData.get('plan_type'),
                    template: formData.get('template'),
                    domain: formData.get('domain'),
                    message: formData.get('message')
                }
            };

            try {
                // Call Cloudflare Worker
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                const session = await response.json();

                if (session.error) {
                    const errorMsg = session.message
                        ? `${session.error}\n\n詳細: ${session.message} (${session.code || 'N/A'})`
                        : session.error;
                    throw new Error(errorMsg);
                }

                // Redirect to Stripe Checkout
                const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });

                if (result.error) {
                    throw new Error(result.error.message);
                }

            } catch (error) {
                console.error('Checkout Error:', error);
                alert('エラーが発生しました: ' + error.message);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
});
