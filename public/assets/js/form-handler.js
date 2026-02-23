const Toast = {
    show: (message, type = 'success') => {
        const container = document.getElementById('toast-container') || createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} animate-fade-up`;

        const icon = document.createElement('span');
        icon.className = 'material-icons';
        icon.textContent = type === 'success' ? 'check_circle' : 'error';

        const text = document.createElement('span');
        text.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(text);
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    handleForm('premium-order');
    handleForm('general-contact');
});

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed; bottom:24px; right:24px; display:flex; flex-direction:column; gap:12px; z-index:10000;';
    document.body.appendChild(container);
    return container;
}

function handleForm(formNameOrId) {
    // Try to find by name attribute first, then ID
    let form = document.querySelector(`form[name="${formNameOrId}"]`);
    if (!form) {
        form = document.getElementById(formNameOrId);
    }

    if (!form) return;

    // 1. Inject Turnstile Script and Widget automatically
    if (!form.querySelector('.cf-turnstile')) {
        const tsDiv = document.createElement('div');
        tsDiv.className = 'cf-turnstile';
        tsDiv.setAttribute('data-sitekey', '0x4AAAAAACguINid-Q5ncFph');
        tsDiv.style.marginBottom = '1rem';

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            form.insertBefore(tsDiv, submitBtn);
        } else {
            form.appendChild(tsDiv);
        }

        if (!document.querySelector('script[src*="turnstile/v0/api.js"]')) {
            const script = document.createElement('script');
            script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        // Store original state using textContent or clones to be safer
        const originalContent = submitBtn.cloneNode(true).childNodes;

        // Loading State
        submitBtn.disabled = true;
        const spinner = document.createElement('span');
        spinner.className = 'material-icons spin';
        spinner.textContent = 'refresh';
        submitBtn.textContent = ' '; // Clear text
        submitBtn.appendChild(spinner);
        submitBtn.appendChild(document.createTextNode(' 送信中...'));

        const formData = new FormData(form);
        const data = {};
        const attachments = [];

        // Process FormData Entries
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                if (value.size > 0 && value.name) {
                    // Convert File to Base64
                    try {
                        const base64 = await readFileAsBase64(value);
                        attachments.push({
                            filename: value.name,
                            content: base64 // Resend expects pure base64 string
                        });
                    } catch (err) {
                        console.error('File Read Error:', err);
                    }
                }
            } else {
                data[key] = value;
            }
        }

        // Add attachments if any
        if (attachments.length > 0) {
            data.attachments = attachments;
        }

        // Add form name manually if not in inputs (though it usually is)
        if (!data['form-name']) {
            data['form-name'] = form.getAttribute('name');
        }

        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                Toast.show('送信に成功しました！確認メールをお送りします。', 'success');
                // Success - Redirect after small delay to show toast
                setTimeout(() => {
                    window.location.href = '/submission-success.html';
                }, 1000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || '送信に失敗しました');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            Toast.show('エラー: ' + error.message, 'error');

            // Revert Button
            submitBtn.disabled = false;
            submitBtn.textContent = '';
            originalContent.forEach(node => submitBtn.appendChild(node.cloneNode(true)));
        }
    });
}

// Global Styles for Toast and Spinner
const style = document.createElement('style');
style.textContent = `
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.material-icons.spin { animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 5px; font-size: 18px; }

.toast {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-radius: 8px;
    background: rgba(10, 10, 10, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    min-width: 280px;
    transition: opacity 0.5s ease;
}
.toast-success { border-left: 4px solid #00f2ff; }
.toast-error { border-left: 4px solid #ff0055; }
.toast .material-icons { font-size: 20px; }
.toast-success .material-icons { color: #00f2ff; }
.toast-error .material-icons { color: #ff0055; }
`;
document.head.appendChild(style);

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Remove Data URL prefix (e.g., "data:image/png;base64,")
            const result = reader.result;
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}
