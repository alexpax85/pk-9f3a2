# Portachiavi 3D — il chiosco

Questa cartella e' **solo il risultato**: la pagina gia' pronta da aprire.
Non e' qui che si lavora.

**Aprila qui:** https://alexpax85.github.io/pk-9f3a2/ (il chiosco)
e https://alexpax85.github.io/pk-9f3a2/admin.html (l'admin)

Il programma vero, quello che si modifica, sta sul Mac in
`~/Coding/Assistente 3D`. Da li' si rifa' questa cartella con:

    python3 tools/build.py
    python3 tools/pubblica.py

e poi si manda online con:

    cd pubblica
    git add -A && git commit -m "aggiorna" && git push

## Cosa c'e' dentro

| File | A cosa serve |
|---|---|
| `index.html` | il chiosco: font, librerie e codice in un file solo |
| `admin.html` | l'admin del titolare: la coda di tutti i dispositivi, lo studio, i conti |
| `studio.html` | lo studio, che l'admin apre dentro di se' |
| `manifest.webmanifest`, `admin.webmanifest` | dicono a iPhone e iPad come chiamare le due app e che icona dare |
| `sw.js` | ne tiene una copia sul dispositivo, cosi' funziona senza rete |
| `icona-*.png`, `icona-admin-*.png` | le icone sulla schermata Home: scura il chiosco, chiara l'admin |
| `robots.txt` | chiede ai motori di ricerca di lasciarla stare |

## Attenzione all'indirizzo

Gli ordini vivono nella memoria del browser, legata a **questo** indirizzo.
Se un giorno la pagina trasloca altrove, per il tablet diventa un'altra app e
gli ordini restano indietro. Prima di spostarla: scheda **Dispositivo** ->
*Copia di sicurezza*, e poi la si rimette dentro dalla nuova.
