# Servis API (forma → email)

Backend prima servisnu formu s web stranice i šalje email putem **Microsoft 365 Graph API** (Client Credentials Flow).

## Potrebne varijable (.env)

- **M365_CLIENT_ID** – Application (client) ID iz Azure App registracije
- **M365_CLIENT_SECRET** – Client secret iz Certificates & secrets
- **M365_TENANT_ID** – Directory (tenant) ID
- **M365_FROM_EMAIL** – Email adresa pošiljatelja (korisnik u tvom M365 tenantu)
- **TO_EMAIL** – Primatelj servisnih zahtjeva (npr. armalhrvatska@gmail.com)

## Azure / Entra postavke

1. **App registracija:** [entra.microsoft.com](https://entra.microsoft.com) → App registrations → New registration.
2. **Certificates & secrets:** Kreiraj Client secret, kopiraj vrijednost u `M365_CLIENT_SECRET`.
3. **API permissions:** Dodaj **Application permission** `Mail.Send` (Microsoft Graph), zatim **Grant admin consent**.
4. **Pošiljatelj:** `M365_FROM_EMAIL` mora biti korisnik u tvom tenantu (npr. servis@tvoja-domena.hr). Za app-only `Mail.Send` obavezno ograniči aplikaciju na dedicated mailbox putem Exchange application access policy / application RBAC-a, da kompromitirani secret ne može slati kao cijeli tenant.

## Lokalno

1. U mapi `server/`:
   ```bash
   cd server
   npm install
   ```

2. Kopiraj `.env.example` u `.env` i popuni M365 varijable (vidi gore).

3. Pokreni server:
   ```bash
   npm run dev
   ```
   API: `http://localhost:3001`

4. U **rootu** frontenda u `.env` stavi:
   ```env
   VITE_API_URL=http://localhost:3001
   ```
   Zatim pokreni frontend i testiraj formu na stranici Servis.

## Railway

1. Za trenutni one-deploy setup koristi root Docker build i relativni `/api/servis`.
2. Variables: postavi `M365_CLIENT_ID`, `M365_CLIENT_SECRET`, `M365_TENANT_ID`, `M365_FROM_EMAIL`, `TO_EMAIL`, opcionalno `FRONTEND_ORIGIN`.
3. Ako backend i frontend nisu isti deploy, deployaj `server` odvojeno i u frontendu postavi `VITE_API_URL` na Railway URL backenda.
4. Ako mijenjaš proxy topologiju, postavi `TRUST_PROXY_HOPS` na stvaran broj trusted proxy hopova ispred aplikacije.

## API

- **POST /api/servis** – multipart/form-data: `name`, `email`, `phone`, `street`, `houseNumber`, `city`, `postalCode`, `country`, `message` (opcionalno), `images` (obavezno; do 5 slika, ponovljeno polje; JPEG/PNG/GIF/WebP, max 2 MB po slici). Staro polje `image` je i dalje podržano radi kompatibilnosti. Odgovor: `200 { success: true }` ili `4xx/5xx { success: false, error: "..." }`.
- **GET /api/health** – `200 { ok: true }`.
