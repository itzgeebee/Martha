const year = new Date().getFullYear();

function makeFallback(img) {
  const wrapper = document.createElement('div');
  wrapper.className = 'img-fallback';
  const label = img.getAttribute('alt') || 'Photo placeholder';
  wrapper.innerHTML = `<span>${label}<br><small>Add image: ${img.getAttribute('src')}</small></span>`;
  img.replaceWith(wrapper);
}

document.querySelectorAll('img').forEach((img) => {
  img.loading = 'lazy';
  img.decoding = 'async';
  img.addEventListener('error', () => makeFallback(img), { once: true });
});

const header = document.querySelector('.site-header');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (!header) return;
  header.style.transform = currentY > lastY && currentY > 160 ? 'translateY(-110%)' : 'translateY(0)';
  lastY = currentY;
});
