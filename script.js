history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// FOTOS POR CATEGORIA
const fotos = {
  brasileiro: ['img/brasileiro.jpeg', 'img/brasileiro2.jpeg', 'img/brasileiro3.jpeg'],
  egipcio:    ['img/egipcio1.jpeg', 'img/egipcio2.jpeg', 'img/egipcio3.jpeg'],
  hibrido:    ['img/hibrido.jpeg'],
  fox:        ['img/fox.jpeg'],
  russo:      ['img/russo.jpeg'],
  '4d':       ['img/marrom.jpeg'],
}

const nomes = {
  brasileiro: 'Volume Brasileiro',
  egipcio:    'Volume Egípcio',
  hibrido:    'Volume Híbrido',
  fox:        'Volume Fox',
  russo:      'Volume Russo',
  '4d':       'Volume 4D Marrom',
  maquiagem:  'Maquiagem',
};

let slideAtual = 0;
let fotosAtivas = [];

function abrirGaleria(categoria) {
  fotosAtivas = fotos[categoria];
  slideAtual = 0;

  document.getElementById('galeria-titulo').textContent = nomes[categoria];
  atualizarSlide();

  const miniaturas = document.getElementById('galeria-miniaturas');
  miniaturas.innerHTML = '';
  fotosAtivas.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = nomes[categoria];
    if (i === 0) img.classList.add('ativa');
    img.onclick = () => irParaSlide(i);
    miniaturas.appendChild(img);
  });

  document.getElementById('galeria-overlay').classList.add('ativa');
}

function atualizarSlide() {
  document.getElementById('slide-img').src = fotosAtivas[slideAtual];
  document.querySelectorAll('.galeria-miniaturas img').forEach((img, i) => {
    img.classList.toggle('ativa', i === slideAtual);
  });
}

function mudarSlide(direcao) {
  slideAtual = (slideAtual + direcao + fotosAtivas.length) % fotosAtivas.length;
  atualizarSlide();
}

function irParaSlide(index) {
  slideAtual = index;
  atualizarSlide();
}

function fecharGaleria() {
  document.getElementById('galeria-overlay').classList.remove('ativa');
}

// Fecha clicando fora
document.getElementById('galeria-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('galeria-overlay')) fecharGaleria();
});

// Teclado
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('galeria-overlay').classList.contains('ativa')) return;
  if (e.key === 'ArrowRight') mudarSlide(1);
  if (e.key === 'ArrowLeft') mudarSlide(-1);
  if (e.key === 'Escape') fecharGaleria();
});

// Swipe celular
let touchStartX = 0;
document.getElementById('galeria-overlay').addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

document.getElementById('galeria-overlay').addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) mudarSlide(diff > 0 ? 1 : -1);
}, { passive: true });

// SCROLL REVEAL
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visivel');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .card, .card-categoria').forEach(el => {
    el.classList.add('oculto');
    observer.observe(el);
  });

  const sobreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animado');
    });
  }, { threshold: 0.2 });

  const sobreTexto = document.querySelector('.sobre-texto');
  if (sobreTexto) sobreObserver.observe(sobreTexto);
});