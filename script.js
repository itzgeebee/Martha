function makeFallback(img) {
  const wrapper = document.createElement('div');
  wrapper.className = 'img-fallback';
  const label = img.getAttribute('alt') || 'Photo placeholder';
  wrapper.innerHTML = `<span>${label}<br><small>Add image: ${img.getAttribute('src')}</small></span>`;
  img.replaceWith(wrapper);
}

function prepareImage(img) {
  img.loading = 'lazy';
  img.decoding = 'async';
  img.addEventListener('error', () => makeFallback(img), { once: true });
}

function addAaronPhoto() {
  const photoStack = document.querySelector('#story .stacked-photos');
  if (!photoStack || document.querySelector('img[src="assets/photos/aaron-martha-03.jpg"]')) return;

  photoStack.classList.add('aaron-photos');

  const figure = document.createElement('figure');
  figure.className = 'image-card';
  figure.innerHTML = '<img src="assets/photos/aaron-martha-03.jpg" alt="Aaron and Martha at a cafe" />';

  const marthaSolo = photoStack.querySelector('img[src="assets/photos/martha-solo-02.jpg"]')?.closest('figure');
  photoStack.insertBefore(figure, marthaSolo || null);
  prepareImage(figure.querySelector('img'));
}

function addBrothersPhoto() {
  const brothersSection = document.querySelector('.brothers-section');
  const heading = brothersSection?.querySelector('.section-heading');
  if (!brothersSection || !heading || document.querySelector('img[src="assets/photos/brothers-group-01.jpg"]')) return;

  const figure = document.createElement('figure');
  figure.className = 'image-card brothers-hero';
  figure.innerHTML = '<img src="assets/photos/brothers-group-01.jpg" alt="Martha with her brothers" /><figcaption>Martha and her brothers.</figcaption>';

  heading.insertAdjacentElement('afterend', figure);
  prepareImage(figure.querySelector('img'));
}

document.addEventListener('DOMContentLoaded', () => {
  addAaronPhoto();
  addBrothersPhoto();
  document.querySelectorAll('img').forEach(prepareImage);
});

const header = document.querySelector('.site-header');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (!header) return;
  header.style.transform = currentY > lastY && currentY > 160 ? 'translateY(-110%)' : 'translateY(0)';
  lastY = currentY;
});
