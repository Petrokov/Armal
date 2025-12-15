# Multijezičnost (i18n) - Dokumentacija

## Pregled

Ovaj sustav omogućava jednostavnu implementaciju multijezičnosti u React aplikaciji bez potrebe za vanjskim bibliotekama. Sustav koristi React Context API i JSON datoteke za prijevode.

## Struktura

```
src/
├── contexts/
│   └── LanguageContext.jsx    # Context za upravljanje jezikom
├── translations/
│   ├── hr.json                 # Hrvatski prijevodi
│   ├── slo.json                # Slovenski prijevodi
│   ├── rs.json                 # Srpski prijevodi
│   └── README.md               # Ova dokumentacija
```

## Kako koristiti

### 1. Osnovna upotreba u komponenti

```jsx
import { useLanguage } from '../contexts/LanguageContext'

const MyComponent = () => {
  const { t, language, changeLanguage } = useLanguage()

  return (
    <div>
      <h1>{t('hero.title1')}</h1>
      <p>Trenutni jezik: {language}</p>
      <button onClick={() => changeLanguage('slo')}>
        Promijeni na slovenski
      </button>
    </div>
  )
}
```

### 2. Funkcija `t()` (translate)

Funkcija `t()` prima ključ prijevoda i vraća prevedeni tekst:

```jsx
// Jednostavan ključ
t('navbar.home')  // "Početna" (hr) / "Domov" (slo) / "Почетна" (rs)

// Ugniježđeni ključ
t('features.quality.title')  // "Provjerena Kvaliteta" (hr)
```

### 3. Promjena jezika

```jsx
const { changeLanguage } = useLanguage()

// Promijeni na slovenski
changeLanguage('slo')

// Promijeni na srpski
changeLanguage('rs')

// Promijeni na hrvatski
changeLanguage('hr')
```

## Dodavanje novog jezika

### Korak 1: Kreiraj JSON datoteku

Kreiraj novu datoteku u `src/translations/` direktoriju, npr. `en.json`:

```json
{
  "navbar": {
    "home": "Home",
    "products": "Products",
    ...
  },
  "hero": {
    "title1": "Practical solutions.",
    ...
  }
}
```

### Korak 2: Dodaj jezik u LanguageContext

U `src/contexts/LanguageContext.jsx`:

```jsx
import enTranslations from '../translations/en.json'

const translations = {
  hr: hrTranslations,
  slo: sloTranslations,
  rs: rsTranslations,
  en: enTranslations,  // Dodaj novi jezik
}
```

### Korak 3: Dodaj label u sve prijevode

U svim JSON datotekama dodaj label za novi jezik:

```json
{
  "languages": {
    "hr": "Hrvatski",
    "slo": "Slovenski",
    "rs": "Srpski",
    "en": "English"  // Dodaj label
  }
}
```

## Dodavanje novog prijevoda

### Korak 1: Dodaj ključ u sve JSON datoteke

Npr., ako želiš dodati "contact" u navbar:

**hr.json:**
```json
{
  "navbar": {
    ...
    "contact": "Kontakt"
  }
}
```

**slo.json:**
```json
{
  "navbar": {
    ...
    "contact": "Kontakt"
  }
}
```

**rs.json:**
```json
{
  "navbar": {
    ...
    "contact": "Контакт"
  }
}
```

### Korak 2: Koristi u komponenti

```jsx
const { t } = useLanguage()
<a href="#contact">{t('navbar.contact')}</a>
```

## Fallback mehanizam

Sustav automatski koristi hrvatski (`hr`) kao fallback jezik ako:
- Prijevod za određeni ključ ne postoji
- Odabrani jezik nije podržan
- Dođe do greške pri učitavanju prijevoda

## Spremanje odabranog jezika

Odabrani jezik se automatski sprema u `localStorage` pod ključem `armal_language` i vraća se pri sljedećem učitavanju stranice.

## Best Practices

1. **Konzistentni ključevi**: Koristi istu strukturu ključeva u svim jezicima
2. **Opisni nazivi**: Koristi jasne, opisne nazive za ključeve (npr. `navbar.home` umjesto `nh`)
3. **Organizacija**: Grupiraj prijevode logički (navbar, hero, features, itd.)
4. **Provjera**: Uvijek provjeri da li su svi ključevi prisutni u svim jezicima

## Troubleshooting

### Prijevod se ne prikazuje

1. Provjeri da li ključ postoji u JSON datoteci
2. Provjeri da li koristiš točan format: `t('section.key')`
3. Provjeri konzolu za greške

### Jezik se ne mijenja

1. Provjeri da li je jezik dodan u `translations` objekt u `LanguageContext.jsx`
2. Provjeri da li koristiš točan kod jezika (`hr`, `slo`, `rs`)

### Prijevod se ne sprema

1. Provjeri da li `localStorage` radi u pregledniku
2. Provjeri konzolu za greške vezane uz `localStorage`

## Primjer kompletnog korištenja

```jsx
import { useLanguage } from '../contexts/LanguageContext'

const ExampleComponent = () => {
  const { t, language, changeLanguage } = useLanguage()

  return (
    <div>
      <h1>{t('hero.title1')}</h1>
      <p>{t('hero.subtitle')}</p>
      
      <select 
        value={language} 
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="hr">{t('languages.hr')}</option>
        <option value="slo">{t('languages.slo')}</option>
        <option value="rs">{t('languages.rs')}</option>
      </select>
    </div>
  )
}
```

