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
4. **Pošiljatelj:** `M365_FROM_EMAIL` mora biti korisnik u tvom tenantu (npr. servis@tvoja-domena.hr). Aplikacija mora imati dozvolu slanja kao taj korisnik (npr. u Exchangeu “Send As” za taj mailbox, ili koristi dedicated korisnički račun za servis).

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

1. Root Directory: **server**
2. Variables: postavi `M365_CLIENT_ID`, `M365_CLIENT_SECRET`, `M365_TENANT_ID`, `M365_FROM_EMAIL`, `TO_EMAIL`, opcionalno `FRONTEND_ORIGIN`.
3. Start: `npm start`
4. U frontendu postavi `VITE_API_URL` na Railway URL backenda.

## API

- **POST /api/servis** – multipart/form-data: `name`, `phone`, `message` (opcionalno), `image` (opcionalno). Odgovor: `200 { success: true }` ili `4xx/5xx { success: false, error: "..." }`.
- **GET /api/health** – `200 { ok: true }`.
