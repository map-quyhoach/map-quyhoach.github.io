const C='qh-hn-v3';
const SHELL=['./','index.html','manifest.json','hanoi-gazetteer.json','icons/icon-192.png','icons/icon-512.png','layers/sdd2045.webp','layers/sdd2065.webp','layers/sdd2045-legend.webp','layers/sdd2065-legend.webp','https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET')return;
 if(u.origin!=location.origin&&!/unpkg\.com|tile\.openstreetmap\.org|arcgisonline\.com/.test(u.host))return; // geocoder/overpass: không chặn, không cache
 if(u.origin==location.origin&&e.request.mode=='navigate'){e.respondWith(fetch(e.request).then(r=>{caches.open(C).then(c=>c.put('index.html',r.clone()));return r}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{if(r.ok&&(u.origin==location.origin||/unpkg\.com|tile\.openstreetmap\.org|arcgisonline\.com/.test(u.host))){const cl=r.clone();caches.open(C).then(c=>c.put(e.request,cl))}return r})))});
