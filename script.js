

function updateImageHeight() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 800) {
    // Bei kleinen Bildschirmen keine Anpassung nötig
    return;
  }
  const container = document.querySelector('.meinWerdegang_TextButtonContainer');
  const img = document.querySelector('.img');
  if (container && img && img.complete) {
    const height = container.offsetHeight;
    img.style.height = height + 'px';
    img.style.width = 'auto';
  }
}

// Bei Seitenladung und Resize
window.addEventListener('resize', updateImageHeight);
window.addEventListener('load', () => {
  const img = document.querySelector('.img');
  if (img) {
    img.addEventListener('load', updateImageHeight);
  }
  updateImageHeight();
});

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');


document.addEventListener('DOMContentLoaded', () => {

    // Alle Elemente auswählen, die wir brauchen
    const cards = document.querySelectorAll('.meineProjekte_Card');
    const overlay = document.getElementById('projektOverlay');
    const closeButton = overlay.querySelector('.close-button');
    
    // Die Platzhalter im Overlay auswählen
    const overlayTitle = document.getElementById('overlay-title');
    const dynamicContentContainer = document.getElementById('overlay-dynamic-content');

    // 2. Eine Funktion, die auf JEDE Karte angewendet wird
    cards.forEach(card => {
        
        card.addEventListener('click', () => {
            
            // --- DATEN SAMMELN ---
            const title = card.querySelector('.caption').innerHTML;
            const videoSrc = card.dataset.videoSrc;
            const galleryImages = card.dataset.galleryImages;
            
            // --- OVERLAY FÜLLEN ---
            dynamicContentContainer.innerHTML = ''; // WICHTIG: Zuerst alte Inhalte leeren
            overlayTitle.innerHTML = title.replace(/<br\s*\/?>/gi, ' ');

            // Video ODER Galerie einfügen
            if (videoSrc) {
                // Fall 1: Video
                dynamicContentContainer.innerHTML = `
                    <video controls autoplay muted loop playsinline>
                        <source src="${videoSrc}" type="video/mp4">
                        Dein Browser unterstützt keine Videos.
                    </video>`;
            } 
            else if (galleryImages) {
                // Fall 2: NEUE GALERIE-LOGIK
                const imagesArray = galleryImages.split(',').map(img => img.trim());
                
                // HTML für die Bilder-Wrapper generieren
                let imagesHtml = imagesArray.map((imgUrl, index) => {
                    return `<img src="${imgUrl}" alt="Projekt-Detailbild ${index + 1}" class="gallery-image ${index === 0 ? 'active' : ''}" data-index="${index}">`;
                }).join('');

                // Gesamtes Galerie-HTML mit Navigation
                const galleryHtml = `
                    <div class="gallery-container" data-total-images="${imagesArray.length}">
                        <button class="gallery-nav gallery-prev" aria-label="Vorheriges Bild">&lt;</button>
                        <div class="gallery-image-wrapper">
                            ${imagesHtml}
                        </div>
                        <button class="gallery-nav gallery-next" aria-label="Nächstes Bild">&gt;</button>
                    </div>
                `;
                
                dynamicContentContainer.innerHTML = galleryHtml;
            }

            // --- OVERLAY ANZEIGEN ---
            overlay.style.display = 'flex'; 
        });
    });

    // GALERIE-STEUERUNG
    // Hört auf Klicks innerhalb des Content-Containers
    dynamicContentContainer.addEventListener('click', (event) => {
        const target = event.target;
        
        // Prüfen, ob ein Navigations-Button geklickt wurde
        if (!target.classList.contains('gallery-nav')) {
            return; // Klick war nicht auf 'prev' oder 'next'
        }

        const galleryContainer = target.closest('.gallery-container');
        if (!galleryContainer) return;

        const images = galleryContainer.querySelectorAll('.gallery-image');
        const totalImages = images.length;
        
        // Aktuell aktives Bild finden
        const currentActiveImage = galleryContainer.querySelector('.gallery-image.active');
        let currentIndex = parseInt(currentActiveImage.dataset.index);

        // Neues Index berechnen
        if (target.classList.contains('gallery-next')) {
            currentIndex = (currentIndex + 1) % totalImages; 
        } else if (target.classList.contains('gallery-prev')) {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages; 
        }

        // Klassen aktualisieren
        currentActiveImage.classList.remove('active');
        images[currentIndex].classList.add('active');
    });


    // Funktion zum Schließen des Overlays
    function closeOverlay() {
        // Video stoppen, wenn das Overlay geschlossen wird
        const video = overlay.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        // Galerie-Inhalt leeren, um Zustand zurückzusetzen
        dynamicContentContainer.innerHTML = ''; 
        overlay.style.display = 'none';
    }

    // Overlay schließen, wenn der Schließen-Button geklickt wird
    closeButton.addEventListener('click', closeOverlay);

    // Overlay schließen, wenn auf den dunklen Hintergrund geklickt wird
    overlay.addEventListener('click', (event) => {
        // Prüfen, ob das geklickte Element der Hintergrund selbst ist
        if (event.target === overlay) {
            closeOverlay();
        }
    });
});