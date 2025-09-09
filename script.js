

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


const card = document.getElementById('bachelorArbeit');
const slider = document.querySelector('.slider');
const sliderBG = document.querySelector('.slider-bg');
const bg = document.querySelector('.background-An');

card.addEventListener('mouseenter', () => {
  // Entferne kurzzeitig die Klasse, um die Animation neu zu starten
  slider.classList.remove('animate');


  // Trigger reflow, um den Neustart der Animation zu erzwingen
  void slider.offsetWidth;

  // Füge die Klasse wieder hinzu, um die Animation zu starten
  slider.classList.add('animate');
  sliderBG.classList.add('animate');

});

card.addEventListener('mouseleave', () => {
  slider.classList.remove('animate');
  sliderBG.classList.remove('animate');

});
