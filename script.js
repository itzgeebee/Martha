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

function createPhotoFigure(src, alt) {
  const figure = document.createElement('figure');
  figure.className = 'image-card';
  figure.innerHTML = `<img src="${src}" alt="${alt}" />`;
  return figure;
}

function addAaronPhotos() {
  const photoStack = document.querySelector('#story .stacked-photos');
  if (!photoStack) return;

  photoStack.classList.add('aaron-photos');

  const extraPhotos = [
    ['assets/photos/aaron-martha-03.jpg', 'Aaron and Martha at a cafe'],
    ['assets/photos/aaron-martha-04.jpg', 'Aaron and Martha memory 4']
  ];

  const insertBefore = photoStack.querySelector('img[src="assets/photos/martha-solo-02.jpg"]')?.closest('figure');

  extraPhotos.forEach(([src, alt]) => {
    if (photoStack.querySelector(`img[src="${src}"]`)) return;
    const figure = createPhotoFigure(src, alt);
    photoStack.insertBefore(figure, insertBefore || null);
    prepareImage(figure.querySelector('img'));
  });
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

function showFullBrotherMessages() {
  const olisaCard = [...document.querySelectorAll('.brothers-section .quote-card')].find(card => card.querySelector('h3')?.textContent.trim().toLowerCase() === 'olisa');
  const kosiCard = [...document.querySelectorAll('.brothers-section .quote-card')].find(card => card.querySelector('h3')?.textContent.trim().toLowerCase() === 'kosi');

  if (olisaCard) {
    olisaCard.innerHTML = `
      <h3>Olisa</h3>
      <p>Happy Birthday, my lovely sister! 🎉❤️</p>
      <p>I wish you success in all that you do in this life. May God continue to bless your efforts and guide you in every step you take. May you continue to grow in wisdom, happiness, good health, and prosperity. May all your plans and endeavors be successful, and may every dream in your heart come to fruition.</p>
      <p>Thank you for being such a wonderful sister. Your kindness, strength, and love are truly appreciated. On this special day, I pray that joy and more blessings surround you always. May this new year of your life bring greater achievements, beautiful memories, and endless reasons to smile.</p>
      <p>Happy Birthday once again, sis. Wishing you a long life filled with happiness and God’s abundant blessings. Enjoy your day to the fullest! 🎂🎈❤️</p>
    `;
  }

  if (kosiCard) {
    kosiCard.innerHTML = `
      <h3>Kosi</h3>
      <p>Happy birthday to my love, one of the big three in my life😂.</p>
      <p>One of the kindest persons in my life, I wouldn't be anywhere I am or anywhere at all without you. Even the times I mess up or even the days I feel down or feel like giving up, you're always there to support me. The opportunities you've created for me, even the ones I didn't take advantage of, I can never forget them and I don't think I'll ever be able to repay it.</p>
      <p>I hope you get everything you deserve in life, God bless you❤️</p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  addAaronPhotos();
  addBrothersPhoto();
  showFullBrotherMessages();
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
