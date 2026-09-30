// Service worker simples: guarda os arquivos do app em cache para que ele
// abra rapidinho e continue funcionando mesmo sem internet (os dados das
// clientes já ficam salvos no aparelho via localStorage, independente disso).

const CACHE = 'marcia-manicure-v5';
const ARQUIVOS = [
  './',
  './index.html',
  './reserva.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './icon-apple-touch.png',
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((resposta) => resposta || fetch(evento.request))
  );
});
