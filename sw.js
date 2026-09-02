/* =====================================================================
   Portachiavi 3D — il pezzo che lo fa funzionare senza rete

   Alla prima apertura mette da parte una copia dell'app. Da li' in poi
   l'app parte dalla copia, quindi si apre subito e funziona anche con il
   telefono in aereo o con il Mac spento.

   Strategia: prima la copia, e intanto si va a vedere se ce n'e' una piu'
   recente per la volta successiva. Per un chiosco al banco e' quella giusta:
   l'apertura non aspetta mai la rete, e gli aggiornamenti arrivano da soli
   senza che nessuno debba fare niente.
   ===================================================================== */

const VERSIONE = 'portachiavi-74b99dde';

/* Cosa serve per partire. Il grosso e' tutto dentro index.html, che porta
   dentro di se' font, librerie e programma: un file solo, circa un mega. */
const ESSENZIALI = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icona-180.png',
  './icona-192.png',
  './icona-512.png',
];

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(VERSIONE)
      .then(c => c.addAll(ESSENZIALI))
      // se un file secondario manca non si butta via tutto: l'app parte lo stesso
      .catch(() => caches.open(VERSIONE).then(c => c.add('./index.html')))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys()
      .then(nomi => Promise.all(nomi.filter(n => n !== VERSIONE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // roba d'altri: non ci si mette in mezzo

  ev.respondWith(
    caches.match(req, { ignoreSearch: true }).then((copia) => {
      const dallaRete = fetch(req).then((risposta) => {
        if (risposta && risposta.ok && risposta.type === 'basic') {
          const doppione = risposta.clone();
          caches.open(VERSIONE).then(c => c.put(req, doppione));
        }
        return risposta;
      }).catch(() => null);

      // c'e' la copia: si parte da quella, l'aggiornamento va in sottofondo
      if (copia) return copia;

      // niente copia: si prova la rete, e se anche quella manca si ripiega
      // sulla pagina principale, che e' l'unica cosa che serve davvero
      return dallaRete.then(r => r || caches.match('./index.html'));
    })
  );
});

/* Permette alla pagina di chiedere di passare subito alla versione nuova. */
self.addEventListener('message', (ev) => {
  if (ev.data === 'aggiorna') self.skipWaiting();
});
