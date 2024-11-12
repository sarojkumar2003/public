
        // Course content items click handler
        const contentItems = document.querySelectorAll('.content-item');
        const lightbox = document.getElementById('lightbox');
        const closeLightbox = document.getElementById('closeLightbox');
        const lightboxContent = document.getElementById('lightboxContent');

        contentItems.forEach(item => {
            item.addEventListener('click', () => {
                const content = item.querySelector('h3').textContent;
                lightboxContent.innerHTML = `
                    <h3>${content}</h3>
                    <p>Detailed information about "${content}" will be displayed here.</p>
                `;
                lightbox.classList.add('active');
            });
        });

        // Close lightbox
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        // Enroll button click handler
        const enrollButton = document.getElementById('enrollButton');
        enrollButton.addEventListener('click', () => {
            alert('Thank you for your interest! Enrollment process will be initiated.');
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    