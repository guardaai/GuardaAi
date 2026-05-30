const CACHE_NAME = 'guardai-v1.0';
const ASSETS = [
  '/GuardaAi/',
  '/GuardaAi/index.html',
  '/GuardaAi/home.html',
  '/GuardaAi/transacoes.html',
  '/GuardaAi/dividas.html',
  '/GuardaAi/chat.html',
  '/GuardaAi/setup.html',
  '/GuardaAi/manifest.json'
];

self.addEventListener('install', (event) => {
  console.log('🦔 SW: instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((err) => {
        console.log('SW cache:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('🦔 SW: ativado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cn) => {
          if (cn !== CACHE_NAME) {
            return caches.delete(cn);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  if (url.includes('supabase.co') || 
      url.includes('anthropic.com') || 
      url.includes('functions/v1/') ||
      url.includes('googleapis.com') ||
      url.includes('gstatic.com') ||
      event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cloned);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
