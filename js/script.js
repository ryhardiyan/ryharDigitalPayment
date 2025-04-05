document.addEventListener('DOMContentLoaded', () => {
    // ========== ELEMENT REFERENCES ==========
    const copyButtons = document.querySelectorAll('.copy-btn');
    const zoomBtn = document.getElementById('zoomBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const cancelBtn = document.getElementById('cancelBtn');
    const sendBtn = document.getElementById('sendBtn');
    const toast = document.querySelector('.toast');

    // ========== COPY FUNCTIONALITY ==========
    const handleCopy = async (copyButton) => {
        const accountNumber = copyButton.dataset.account;
        const icon = copyButton.querySelector('i');
        
        try {
            await navigator.clipboard.writeText(accountNumber);
            showToast();
            toggleCopyFeedback(copyButton, icon);
            
            setTimeout(() => {
                resetCopyButton(copyButton, icon);
            }, 2000);
        } catch (err) {
            console.error('Gagal menyalin:', err);
        }
    };

    const toggleCopyFeedback = (button, icon) => {
        button.classList.add('copied');
        icon.classList.replace('fa-copy', 'fa-check');
    };

    const resetCopyButton = (button, icon) => {
        button.classList.remove('copied');
        icon.classList.replace('fa-check', 'fa-copy');
    };

    // ========== ZOOM FUNCTIONALITY ==========
    const createZoomModal = () => {
        const zoomModal = document.createElement('div');
        zoomModal.className = 'modal-zoom';
        zoomModal.innerHTML = `<img src="images/qris.jpg" alt="QRIS Besar">`;
        
        zoomModal.addEventListener('click', () => {
            zoomModal.classList.remove('active');
        });
        
        document.body.appendChild(zoomModal);
        return zoomModal;
    };

    const zoomModal = createZoomModal();

    // ========== TOAST NOTIFICATION ==========
    const showToast = () => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    };

    // ========== MODAL HANDLERS ==========
    const toggleModal = (show = true) => {
        modalOverlay.style.display = show ? 'flex' : 'none';
    };

    const handleOutsideClick = (e) => {
        if(e.target === modalOverlay) toggleModal(false);
    };

    // ========== EVENT LISTENERS ==========
    // Copy Buttons
    copyButtons.forEach(button => {
        button.addEventListener('click', () => handleCopy(button));
    });

    // Zoom Button
    zoomBtn.addEventListener('click', () => {
        zoomModal.classList.add('active');
    });

    // Confirmation Modal
    confirmBtn.addEventListener('click', () => toggleModal(true));
    cancelBtn.addEventListener('click', () => toggleModal(false));
    sendBtn.addEventListener('click', () => toggleModal(false));
    modalOverlay.addEventListener('click', handleOutsideClick);
});