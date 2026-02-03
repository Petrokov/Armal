# Optimizacije za brže učitavanje stranice

## Implementirane optimizacije

### 1. Code Splitting (React.lazy)
- ✅ Sve stranice se sada učitavaju na zahtjev (lazy loading)
- ✅ Manji početni bundle size
- ✅ Brže početno učitavanje
- ✅ Loading fallback komponenta za bolje UX

### 2. Vite Build Optimizacije
- ✅ Terser minifikacija s uklanjanjem console.log u production
- ✅ Manual chunks za React vendor biblioteke
- ✅ Optimizacija dependencies
- ✅ Chunk size warnings

### 3. Image Optimizacije
- ✅ Hero slike koriste `loading="eager"` i `fetchPriority="high"` za brže učitavanje
- ✅ Ostale slike koriste `loading="lazy"` za optimizaciju bandwidtha
- ⚠️ Preporuka: Konvertirajte PNG/JPG slike u WebP format za manje veličine

### 4. Resource Hints
- ✅ DNS prefetch za vanjske domene (b2b.armal.hr, uredidom.hr)
- ✅ Preconnect za glavnu domenu

### 5. Tailwind CSS
- ✅ Automatsko uklanjanje neiskorištenog CSS-a u production build-u
- ✅ Content scanning za optimalnu veličinu CSS-a

## Preporuke za daljnje optimizacije

### 1. Image Format Optimization
**Trenutno stanje:**
- Neke slike su PNG/JPG format
- Neke su već WebP

**Preporuka:**
```bash
# Konvertirajte sve slike u WebP format
# PNG/JPG → WebP može smanjiti veličinu za 25-35%
```

**Fajlovi za konverziju:**
- `src/assets/hero_2_2.jpg` → `hero_2_2.webp`
- `src/assets/slika_*_normal.png` → WebP
- `src/assets/slika_*_hover.png` → WebP
- `src/assets/o_nama_kupaonica_2.png` → WebP
- `src/assets/Armal_logo_BLUE.png` → WebP (ili SVG)

### 2. Image Compression
**Preporuka:**
- Koristite alate kao što su:
  - Squoosh.app (online)
  - ImageOptim (Mac)
  - TinyPNG (online)
- Cilj: smanjiti veličinu slika za 50-70% bez vidljivog gubitka kvalitete

### 3. Font Optimization
**Trenutno:**
- Koristi se Inter font (vjerojatno Google Fonts)

**Preporuka:**
- Self-host fontove za brže učitavanje
- Koristite `font-display: swap` za bolji UX
- Preload kritične fontove u `index.html`

### 4. Bundle Analysis
**Preporuka:**
```bash
# Instalirajte vite-bundle-visualizer
npm install --save-dev rollup-plugin-visualizer

# Dodajte u vite.config.js i analizirajte bundle
```

### 5. Service Worker / PWA
**Preporuka:**
- Implementirajte service worker za caching
- Omogućite offline funkcionalnost
- Poboljšajte performanse ponovnih posjeta

### 6. CDN za statičke resurse
**Preporuka:**
- Koristite CDN za slike i fontove
- Smanjite opterećenje glavnog servera
- Brže učitavanje globalno

### 7. Critical CSS
**Preporuka:**
- Ekstraktirajte kritični CSS za above-the-fold sadržaj
- Inline kritični CSS u `<head>`
- Defer ostali CSS

### 8. Preload kritičnih resursa
**Dodajte u index.html:**
```html
<link rel="preload" href="/assets/hero_2_2.webp" as="image" />
<link rel="preload" href="/assets/Armal_logo_BLUE.webp" as="image" />
```

## Mjerenje performansi

### Alati za testiranje:
1. **Lighthouse** (Chrome DevTools)
   - Pokrenite audit za Performance
   - Cilj: 90+ score

2. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Testirajte na mobilnim i desktop uređajima

3. **WebPageTest**
   - https://www.webpagetest.org/
   - Detaljna analiza učitavanja

### Metrije za praćenje:
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Total Blocking Time (TBT)**: < 200ms
- **Cumulative Layout Shift (CLS)**: < 0.1

## Napomene

- Sve optimizacije su implementirane i spremne za production
- Testirajte build sa `npm run build` i `npm run preview`
- Monitorirajte performanse nakon deploya


