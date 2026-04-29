# EkonomOS

Klientský portál nové generace pro účetní a poradenské firmy. Postavili jsme ho ve [Studiu VELYOS](https://velyos.cz).

EkonomOS dodáváme jako kompletní řešení — veřejný web na vaší doméně, klientský portál pod ním a administrátorská aplikace pro vaši kancelář. Napojuje se na vaše stávající systémy (Money S3, Pohoda, DocuWare, banky, ARES, ČSSZ, ELSTER) a hlídá rizika za vás.

## Co umí

- **205 analýz** napříč **23 kategoriemi** — od tvrdého účetnictví přes mzdy, daně, DPH, ViDA, klientskou komunikaci a hlasovou analýzu až po fraud detection a deepfake watchdog
- **184 datových zdrojů** propojených v jedné aplikaci
- **8 N8N workflow** pro běžné úkony (OCR příjem faktur, párování plateb, 3stupňové upomínky, mzdové uzávěrky, ELSTER)
- **AI prediktivní vrstva** — predikce odchodu klienta, uplift modeling, optimální moment kontaktu, cenová elasticita, predikce akvizice/fúze

Detail na [`/funkce`](http://localhost:3000/funkce).

## Vývoj

```bash
npm install
npm run dev
```

Dev server běží na [`http://localhost:3000`](http://localhost:3000).

## Stack

- Next.js 16.2.3 (Turbopack, App Router)
- React 19
- Tailwind CSS 4
- TypeScript 5
- Lucide ikony

⚠️ Next.js 16 má breaking changes oproti starším verzím. Před úpravami čti `node_modules/next/dist/docs/`.

## Struktura

```
src/
├── app/
│   ├── (marketing)/        # veřejný web (homepage, /funkce, moduly, /o-nas, /kontakt)
│   ├── portal/             # klientský/administrátorský portál
│   ├── prihlaseni/         # demo login
│   └── layout.tsx
├── components/
│   ├── marketing/          # Hero, Services, About, Stats, Testimonials, Contact, Footer, Header, DataTicker
│   ├── portal/             # KpiCard, ClientCard, SectionCard
│   └── shared/             # Logo
├── hooks/
│   └── useInView.ts
└── lib/
    ├── auth/               # frontend-only mock auth context
    ├── demo/               # mock workspace data (anonymizovaná)
    └── utils.ts
```

## Demo režim

Aplikace běží ve frontend-only demo režimu (`DEMO_MODE = true`). Data jsou statická v `src/lib/demo/data.ts`. Žádný backend, žádná databáze, žádné externí volání. Tři demo profily:

- **Klient** (jednoduchý cockpit s dokumenty, cash-flow, dalšími kroky)
- **DE specialista** (pendleři, ELSTER, Kindergeld, A1)
- **Mzdová účetní** (docházka, mzdy, ONZ, exekuce)

Produkční verze EkonomOS staví na stejném UI, ale s reálným backendem na míru klientovi.

## Licence

© 2026 Studio VELYOS. Všechna práva vyhrazena.
