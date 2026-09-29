# EkonomOS — Deployment Guide

Krok-za-krokem postup od dokončené aplikace k live na **`ekonomos.velyos.cz`**.

---

## Předpoklady

- ✅ Repo `stepanmanda/schekonom-web` (fork)
- ✅ Cloudflare účet
- ✅ Doména `velyos.cz` v Cloudflare DNS
- ✅ Cloudflare Email Sending aktivní pro doménu `velyos.cz`

---

## 1. Backend — kontaktní endpoint v projektu EkonomOS

Endpoint je součástí tohoto repozitáře jako Cloudflare Pages Function:

```
functions/api/contact.ts
```

1. V Cloudflare otevři **Compute → Email Service → Email Sending**, onboarduj
   doménu `velyos.cz` a ověř cílovou adresu `stepan@velyos.cz`.
2. V projektu EkonomOS přidej produkční Send Email binding s názvem `EMAIL`.
   Omez cílovou adresu na `stepan@velyos.cz` a odesílatele na
   `noreply@velyos.cz`.
3. Volitelně nastav běžné proměnné `EKONOMOS_NOTIFY_EMAIL` a
   `EKONOMOS_FROM_EMAIL`, pokud chceš změnit výchozí adresy.
4. Spusť nový deployment.

Formulář používá same-origin adresu `https://ekonomos.velyos.cz/api/contact`.
Žádný externí API klíč ani heslo k Zoho není potřeba. Endpoint kontroluje
origin, typ a velikost požadavku, validuje pole, používá honeypot a escapuje
obsah emailu.

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
   NEXT_PUBLIC_CONTACT_EMAIL = stepan@velyos.cz
   ```
   Emailový binding `EMAIL` nastav podle kroku 1.
   Volitelně (pokud chceš analytics):
   ```
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN = ekonomos.velyos.cz
   ```
   Meta Pixel používá výchozí veřejné ID VELYOS. Pro jeho změnu nastav:
   ```
   NEXT_PUBLIC_META_PIXEL_ID = 1749869516293565
   ```
   Pixel se načte pouze po marketingovém souhlasu návštěvníka.
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
- Otevři DevTools → Network → odešli formulář → zkontroluj response z `/api/contact`
- Možné chyby:
  - **403** — origin není povolený v `functions/api/contact.ts`
  - **503** — v projektu EkonomOS chybí Send Email binding `EMAIL`
  - **502** — Email Service odmítla odeslání; zkontroluj Functions logs a ověření domény/adresy
  - **404** — Cloudflare Pages Function nebyla součástí deploymentu

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
- [x] Same-origin CF Function — `functions/api/contact.ts`
- [x] Form utility s endpointem a nouzovým mailto fallbackem
- [x] OG image, sitemap, robots, schema.org
- [x] Per-page metadata
- [x] Plausible Analytics ready (jen env var)
- [x] Reduced motion, GH Pages workflow deaktivován
- [ ] **Onboardovat `velyos.cz` do Email Sending a přidat binding `EMAIL`** ← TVŮJ DALŠÍ KROK
- [ ] **Cloudflare Pages projekt** ← TVŮJ DALŠÍ KROK
- [ ] **DNS CNAME** ← TVŮJ DALŠÍ KROK
- [ ] **Form test** ← PO DEPLOY
- [ ] **LinkedIn preview test** ← PO DEPLOY

Celkem 4 kroky k live, ~20–30 min.
