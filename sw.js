// EDA V6 - Service Worker CLEAN - Sagesse Totale Offline
const CACHE_NAME = "eda-v6-clean";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json"
];

const SAGESSE_DB = {
  houphouet: [
    "La paix, ce n'est pas un mot. C'est un comportement.",
    "La terre ne ment pas.",
    "La Côte d'Ivoire est une terre d'accueil."
  ],
  maya: [
    "In Lak'ech Ala K'in - Je suis toi, tu es moi.",
    "Nous sommes les hommes de maïs - Popol Vuh",
    "Le temps n'est pas une ligne, c'est une roue.",
    "Hunab Ku : Tout est connecté.",
    "Que ton cœur soit comme le jaguar qui veille."
  ],
  africain: [
    "Un seul doigt ne peut ramasser un caillou.",
    "Si tu veux aller loin, marche ensemble."
  ]
};

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
     .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k!== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  // NASA en network first
  if (e.request.url.includes('nasa.gov') || e.request.url.includes('eonet')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // Reste en cache first
  e.respondWith(
    caches.match(e.request).then(c => c || fetch(e.request))
  );
});
