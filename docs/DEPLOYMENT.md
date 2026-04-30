# EkonomOS — Deployment Guide

Krok-za-krokem postup od dokončené aplikace k live na **`ekonomos.velyos.cz`**.

---

## Předpoklady

- ✅ Repo `stepanmanda/schekonom-web` (fork)
- ✅ Cloudflare účet
- ✅ Doména `velyos.cz` v Cloudflare DNS
- ✅ Velyos repo `stepanmanda/velyos-web` s Cloudflare Pages
- ✅ Brevo API key + Apps Script webhook (už máš pro `/api/diagnostika`)

---

## 1. Backend — kontaktní endpoint na velyos.cz

### 1.1 Zkopíruj template do velyos repa

```bash
cd ~/path/to/velyos-web   # nebo kde máš velyos repo
mkdir -p functions/api
cp ~/Desktop/schekonom_rebrand/schekonom-web-fork/docs/velyos-cf-function-template.ts \
   functions/api/ekonomos-contact.ts
```

### 1.2 Apps Script Sheet update

Endpoint posílá `sheet: "EKONOMOS LEADS"` v payloadu. V tvém Apps Script webhooku přidej rozlišovač:

```javascript
// V Apps Script (Tools → Script editor v Google Sheet "VELYOS LEADS")
function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // Verify webhook secret
  const secret = e.parameter['X-Webhook-Secret'] ||
                 (e.postData.headers && e.postData.headers['X-Webhook-Secret']);
  if (secret !== SHEET_WEBHOOK_SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Choose tab based on sheet name from payload
  const sheetName = data.sheet || 'VELYOS LEADS';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  // If tab doesn't exist, create it with headers
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Company', 'Inquiry', 'Message', 'Source'
    ]);
  }

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.company || '',
    data.inquiry || '',
    data.message || '',
    data.source || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Save → Deploy → New deployment → Web app. (Pokud už deployment máš, stačí Save — nový kód se aktivuje.)

### 1.3 Push velyos do main

```bash
cd ~/path/to/velyos-web
git add functions/api/ekonomos-contact.ts
git commit -m "feat: add ekonomos-contact endpoint"
git push origin main
```

Cloudflare Pages **auto-deploy** spustí build. Za 1–2 minuty bude endpoint dostupný na:
```
https://velyos.cz/api/ekonomos-contact
```

### 1.4 Verifikace endpointu

```bash
# OPTIONS (CORS preflight)
curl -i -X OPTIONS https://velyos.cz/api/ekonomos-contact \
  -H "Origin: https://ekonomos.velyos.cz"
# → 204, Access-Control-Allow-Origin: https://ekonomos.velyos.cz

# POST (test request)
curl -X POST https://velyos.cz/api/ekonomos-contact \
  -H "Content-Type: application/json" \
  -H "Origin: https://ekonomos.velyos.cz" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message from curl"}'
# → {"ok":true}
```

Po úspěšném testu zkontroluj:
- [ ] Přišel ti email na `stepan@velyos.cz` z Brevo
- [ ] V Google Sheet vznikl nový tab "EKONOMOS LEADS" s testovacím záznamem

Pokud něco selže — koukni do Cloudflare Pages → velyos-web → Functions → Real-time logs.

---

## 2. Frontend — deploy ekonomos.velyos.cz

### 2.1 Cloudflare Pages — nový projekt

1. Otevři [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages** → **Create a project** → **Connect to Git**
2. Vyber repo `stepanmanda/schekonom-web`
3. Project name: `ekonomos` (nebo `schekonom-web`)
4. Production branch: `main`
5. Build configuration:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: ` ` (prázdné)
6. Environment variables (Production):
   ```
   NEXT_PUBLIC_CONTACT_ENDPOINT = https://velyos.cz/api/ekonomos-contact
   NEXT_PUBLIC_CONTACT_EMAIL = stepan@velyos.cz
   ```
   Volitelně (pokud chceš analytics):
   ```
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN = ekonomos.velyos.cz
   ```
7. **Save and Deploy**

První build trvá 2–4 minuty. Po dokončení dostaneš URL typu `ekonomos.pages.dev`.

### 2.2 Custom doména

V CF Pages → projekt → **Custom domains** → **Set up a custom domain**:
- Doména: `ekonomos.velyos.cz`
- Cloudflare automaticky přidá CNAME v DNS pro `velyos.cz` zóně.

Za 1–2 minuty je live na `https://ekonomos.velyos.cz`. SSL je automatický.

### 2.3 Verifikace deployu

Otevři `https://ekonomos.velyos.cz` a zkontroluj:

- [ ] Homepage se načte, OG image, fonty, animace fungují
- [ ] `/funkce`, `/pilot`, `/caste-dotazy` 200
- [ ] `/sitemap.xml` vrací XML
- [ ] `/robots.txt` vrací text
- [ ] Open Graph preview v LinkedIn / Twitter (použij [opengraph.xyz](https://www.opengraph.xyz))
- [ ] **Formulář pošle test:** vyplň, odešli, zkontroluj že přišel email

---

## 3. Email forwarding (volitelné)

Pokud chceš i `info@ekonomos.cz` (zatím nepoužité, ale pro pozdější brand consistency):

1. Cloudflare → `velyos.cz` zóna → **Email** → **Email Routing**
2. Pokud doména je v jiné zóně (`ekonomos.cz`), aktivuj Email Routing tam
3. Custom address: `info@ekonomos.cz` → forward na `stepan@velyos.cz`

Pak v ekonomos repo přepni env var:
```
NEXT_PUBLIC_CONTACT_EMAIL = info@ekonomos.cz
```

---

## 4. Plausible Analytics (volitelné, doporučuju)

1. Vytvoř účet na [plausible.io](https://plausible.io) (10€/měs nebo self-hosted zdarma)
2. Add site → `ekonomos.velyos.cz`
3. V CF Pages → ekonomos projekt → env vars → přidej:
   ```
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN = ekonomos.velyos.cz
   ```
4. Trigger redeploy (push prázdný commit nebo klikni "Retry deployment")
5. Po deploy uvidíš pageviews v Plausible dashboardu

GDPR-compliant, žádné cookies, žádný banner potřeba.

---

## 5. Post-launch checklist

Po deploy:

- [ ] **LinkedIn share preview** test (vystav post, zkontroluj OG image)
- [ ] **Lighthouse audit** v Chrome DevTools → Performance, Accessibility, Best Practices, SEO
- [ ] **Mobile audit** — otevři na telefonu, projdi homepage + /funkce + /pilot
- [ ] **Form test** — pošli reálný formulář, zkontroluj email + Sheet
- [ ] **Demo button** — klikni na 3 demo profily, ověř že portál se otevře
- [ ] **Footer linky** — všechny 3 právní stránky vrací 200
- [ ] **404 page** — přidat? (Next.js má default, stačí to)
- [ ] **Submit sitemap** do Google Search Console:
  ```
  https://ekonomos.velyos.cz/sitemap.xml
  ```

---

## 6. Co dělat když něco selže

### Build fail v Cloudflare Pages
- Check log v Pages → Deployments → Failed build
- Nejčastější: missing env var, TypeScript chyba, `out` adresář prázdný
- Lokálně replikovat: `npm run build` → musí projít bez chyb

### Formulář vrací error
- Check že env var `NEXT_PUBLIC_CONTACT_ENDPOINT` je správně nastavený
- Otevři DevTools → Network → odešli formulář → koukni na response z `velyos.cz/api/ekonomos-contact`
- Možné chyby:
  - **CORS** — origin není povolený. Přidat doménu do `ALLOWED_ORIGINS` v `functions/api/ekonomos-contact.ts`
  - **403/500** — chyba v endpointu. Check Cloudflare Pages → velyos-web → Functions logs
  - **Network error** — endpoint není deployed. Verify že `velyos.cz/api/ekonomos-contact` vrací 200/204 přes curl

### Mailto fallback
Pokud endpoint není dostupný, formulář automaticky spadne na `mailto:stepan@velyos.cz` s předplněným subject + body. Tohle funguje vždy bez backendu — ale klient musí mít nastavený mailový klient v prohlížeči.

---

## 7. Rollback

Pokud něco zásadně selže po deploy:

1. CF Pages → ekonomos projekt → Deployments → vyber předchozí úspěšný build → **Rollback to this deployment**
2. Doména okamžitě servíruje starší verzi
3. Oprav v repu, push, normální flow

GitHub repo má před každým deploy commit hash, takže můžeš `git revert <hash>` lokálně a push pokud potřebuješ vrátit i kód.

---

## Status

- [x] Frontend code — production ready
- [x] CF Function template — připravený v `docs/`
- [x] Form utility se 3 módy (endpoint/mailto/fallback)
- [x] OG image, sitemap, robots, schema.org
- [x] Per-page metadata
- [x] Plausible Analytics ready (jen env var)
- [x] Reduced motion, GH Pages workflow deaktivován
- [ ] **Velyos endpoint deploy** ← TVŮJ DALŠÍ KROK
- [ ] **Cloudflare Pages projekt** ← TVŮJ DALŠÍ KROK
- [ ] **DNS CNAME** ← TVŮJ DALŠÍ KROK
- [ ] **Form test** ← PO DEPLOY
- [ ] **LinkedIn preview test** ← PO DEPLOY

Celkem 4 kroky k live, ~20–30 min.
