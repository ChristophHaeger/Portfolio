

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
