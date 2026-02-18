/**
 * Cloudflare Worker Form Handler
 * Replacements for Netlify Forms
 */
document.addEventListener('DOMContentLoaded', () => {
    handleForm('premium-order');
    handleForm('general-contact');
});

function handleForm(formNameOrId) {
    // Try to find by name attribute first, then ID
    let form = document.querySelector(`form[name="${formNameOrId}"]`);
    if (!form) {
        form = document.getElementById(formNameOrId);
    }

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // Loading State
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="material-icons spin">refresh</span> 送信中...';

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
                alert('送信成功！\nResend ID: ' + (result.resendData?.id || 'Unknown'));
                // Success - Redirect
                window.location.href = '/submission-success.html';
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || '送信に失敗しました');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            alert('送信エラー: ' + error.message);

            // Revert Button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Simple CSS for spinner if not exists
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.material-icons.spin { animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 5px; font-size: 18px; }
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
