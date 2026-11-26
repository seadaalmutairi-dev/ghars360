/* غرس وأثر — عامل خدمة بسيط: يحفظ واجهة المنصة للعمل عند ضعف الاتصال، ولا يخزن أي بيانات شخصية */
const C = 'athar-v1', SHELL = ['athar.html', 'athar-manifest.webmanifest', 'athar-icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => { const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok && SHELL.some(s => u.pathname.endsWith(s))) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; }).catch(() => caches.match(e.request, {ignoreSearch: true}))); });
