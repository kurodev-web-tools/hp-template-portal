document.addEventListener('DOMContentLoaded', () => {
    // Initialize Stripe with Test Publishable Key
    const stripe = Stripe('pk_test_51SxogT1rosuOg7Yt1mrCMbbRuXIgcZbrq029ypmnS1OjrVVzQ1ne3DigOfj7LIIbT7dAUEXREksfjt1dtTjZczTq00FQAERq2s');

    const modal = document.getElementById('standard-order-modal');
    // Select the standard plan button - Note: We will add ID 'btn-standard-order' to it in HTML
    const openBtn = document.querySelector('.standard-btn');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('standard-order-form');

    if (!modal) return;

    // Open Modal
    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

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
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="material-icons spin">refresh</span> 処理中...';

            const formData = new FormData(form);

            // 1. Submit to Netlify Forms (for email notification)
            try {
                await fetch(window.location.href, { // Post to current page for proper handling
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString(),
                });
                console.log('Form submitted to Netlify');
            } catch (formError) {
                console.warn('Form submission failed, proceeding to payment anyway', formError);
            }

            // 2. Prepare data for Stripe backend
            const data = {
                customerEmail: formData.get('email'),
                customerName: formData.get('name'),
                successUrl: window.location.origin + '/success.html', // Redirect here after payment
                cancelUrl: window.location.href, // Redirect here if canceled
                // Metadata to be passed to Stripe (handled by create-checkout-session)
                metadata: {
                    template: formData.get('template'),
                    domain: formData.get('domain'),
                    message: formData.get('message')
                }
            };

            try {
                // Call Netlify Function
                const response = await fetch('/.netlify/functions/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                const session = await response.json();

                if (session.error) {
                    throw new Error(session.error);
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
