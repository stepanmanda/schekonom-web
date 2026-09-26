export type AssistantLink = {
  label: string;
  href: string;
};

export type AssistantAnswer = {
  id: string;
  answer: string;
  links: AssistantLink[];
};

type KnowledgeEntry = AssistantAnswer & {
  keywords: string[];
  phrases?: string[];
};

export const quickQuestions = [
  "Co je EkonomOS?",
  "Co umí pro účetní kancelář?",
  "Na jaké systémy se napojuje?",
  "Jak probíhá pilot?",
  "Kolik stojí?",
  "Jak chráníte data?",
  "Za jak dlouho lze EkonomOS nasadit?",
] as const;

const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "product",
    keywords: ["ekonomos", "produkt", "reseni", "platforma", "co je"],
    phrases: ["co je ekonomos", "jak funguje ekonomos"],
    answer:
      "EkonomOS je nadstavba pro účetní a poradenské firmy: spojuje veřejný web, klientský portál a administrátorskou aplikaci. Propojuje stávající systémy, automatizuje rutinu a hlídá termíny a rizika. Aktuálně jde o produkt v pilotní fázi; veřejné demo používá pouze statická anonymizovaná data.",
    links: [
      { label: "Přehled funkcí", href: "/funkce" },
      { label: "Roadmapa", href: "/roadmap" },
    ],
  },
  {
    id: "accounting-office",
    keywords: [
      "ucetni",
      "kancelar",
      "firma",
      "klienti",
      "rutina",
      "prace",
      "kapacita",
    ],
    phrases: ["ucetni kancelar", "pro ucetni", "co umi"],
    answer:
      "Účetní kanceláři EkonomOS sjednotí klienty, úkoly, dokumenty, termíny a rizika do jednoho přehledu. Umí připravovat OCR příjem faktur, párování plateb, upomínky a uzávěrkové workflow; kritické kroky zůstávají za schvalovací bránou člověka. Přínos se v pilotu teprve měří. Web neslibuje hotové výsledky pro každou kancelář.",
    links: [
      { label: "Co EkonomOS umí", href: "/funkce" },
      { label: "Účetní modul", href: "/modul-ucetnictvi" },
    ],
  },
  {
    id: "integrations",
    keywords: [
      "integrace",
      "napojeni",
      "money",
      "pohoda",
      "docuware",
      "banka",
      "banky",
      "ares",
      "cssz",
      "elster",
      "api",
      "csv",
      "xml",
    ],
    phrases: ["na jake systemy", "s cim se propoji", "na co se napojuje"],
    answer:
      "Repozitář uvádí napojení na Money S3, Pohodu, DocuWare, banky, ARES, ČSSZ a ELSTER. U dalších účetních systémů se při auditu ověřuje API nebo export CSV/XML; krajní variantou je OCR výstupních sestav. Konkrétní rozsah integrací se dolaďuje v pilotu podle vašeho stacku.",
    links: [
      { label: "Funkce a integrace", href: "/funkce" },
      { label: "Časté dotazy", href: "/caste-dotazy" },
    ],
  },
  {
    id: "pilot",
    keywords: ["pilot", "partner", "spoluprace", "mesicu", "baseline", "onboarding"],
    phrases: ["jak probiha pilot", "pilotni faze", "mam zajem o pilot"],
    answer:
      "Pilot trvá 6 měsíců: týdny 1 až 2 jsou určené na audit a baseline, týdny 3 až 6 na integraci a customizaci, týdny 7 až 12 na pilotní provoz a měsíce 4 až 6 na měření a vyhodnocení. Po pilotu se rozhodnete, zda pokračovat; web uvádí možnost ukončení s 30denní výpovědí. Aktuálně jsou komunikována 3 z 5 volných míst.",
    links: [
      { label: "Podmínky pilotu", href: "/pilot" },
      { label: "Domluvit hovor", href: "/kontakt" },
    ],
  },
  {
    id: "pricing",
    keywords: ["cena", "ceny", "stoji", "cenik", "platba", "poplatek", "fee"],
    phrases: ["kolik stoji", "cenovy model"],
    answer:
      "Cena má tři části: jednorázový setup za audit, integrace a customizaci; měsíční platformní poplatek za hosting, údržbu a podporu; a měsíční poplatek podle počtu klientů. Konkrétní nabídka závisí na rozsahu a vzniká po auditu stacku. Pilot má zvýhodněné podmínky.",
    links: [
      { label: "Cenový model a pilot", href: "/pilot" },
      { label: "Vyžádat nabídku", href: "/kontakt" },
    ],
  },
  {
    id: "security",
    keywords: [
      "bezpecnost",
      "data",
      "gdpr",
      "sifrovani",
      "hosting",
      "eu",
      "tls",
      "aes",
      "mfa",
      "pristup",
      "soukromi",
    ],
    phrases: ["jak chranite data", "kde jsou data", "ochrana dat"],
    answer:
      "Produkční řešení je v dokumentaci popsané s hostingem v EU, šifrováním AES-256 v klidu a TLS 1.3 při přenosu, řízením přístupu podle rolí, audit logem a MFA. Citlivé behaviorální, hlasové a textové analýzy jsou opt-in. ISO 27001 je v přípravě a SOC 2 Type II je plánováno na rok 2027. Nejde tedy o hotové certifikace.",
    links: [
      { label: "Zabezpečení dat", href: "/zabezpeceni-dat" },
      { label: "Ochrana soukromí", href: "/soukromi" },
    ],
  },
  {
    id: "deployment",
    keywords: ["nasazeni", "nasadit", "dlouho", "tydnu", "implementace", "spusteni"],
    phrases: ["za jak dlouho", "jak dlouho trva", "doba nasazeni"],
    answer:
      "Standardní nasazení je na webu uvedeno jako 8 až 12 týdnů: první 2 týdny jsou určené na audit a baseline, týdny 3 až 6 na integraci a customizaci a týdny 7 až 12 na pilotní provoz. Od vaší kontaktní osoby se počítá přibližně se 2 hodinami týdně během prvních 6 týdnů.",
    links: [
      { label: "Průběh pilotu", href: "/pilot" },
      { label: "Časté dotazy", href: "/caste-dotazy" },
    ],
  },
  {
    id: "demo",
    keywords: ["demo", "ukazka", "profil", "profily", "registrace", "testovaci"],
    phrases: ["demo rezim", "vyzkouset demo"],
    answer:
      "Demo je frontendová ukázka: používá statická anonymizovaná data, nemá backend, databázi ani externí volání. Nabízí tři profily: klient firmy, specialista německých daní a mzdová účetní. Pokročilé funkce a část AI vrstvy jsou v demu záměrně zamčené; produkční backend se staví na míru klientovi.",
    links: [
      { label: "Otevřít demo", href: "/prihlaseni" },
      { label: "Roadmapa", href: "/roadmap" },
    ],
  },
  {
    id: "modules",
    keywords: ["modul", "moduly", "ucetnictvi", "mzdy", "dane", "dph", "cz", "de"],
    phrases: ["jake moduly", "ctyri moduly"],
    answer:
      "EkonomOS popisuje čtyři moduly: účetní reporting, mzdy + ČSSZ + zdravotní pojišťovny, daně a DPH a přeshraniční agendu CZ/DE. Nad nimi je AI vrstva pro predikce, detekci rizik a automatizaci. Produkt je nyní v pilotní fázi, takže konkrétní napojení a workflow se ověřují s partnerem.",
    links: [
      { label: "Všechny moduly", href: "/funkce" },
      { label: "CZ/DE agenda", href: "/modul-cz-de" },
    ],
  },
  {
    id: "accounting",
    keywords: ["ucetnictvi", "reporting", "cashflow", "rozpocet", "prognoza", "doklad"],
    phrases: ["ucetni modul", "cash flow"],
    answer:
      "Účetní modul propojuje skutečnost s plánem, cash flow, variance analýzu a prognózu. Dokumentace popisuje výhled cash flow až na 12 měsíců a drill-down z reportu ke zdrojovému dokladu. Jde o prezentované schopnosti pilotního produktu; demo pracuje jen s ukázkovými daty.",
    links: [{ label: "Účetní reporting", href: "/modul-ucetnictvi" }],
  },
  {
    id: "payroll",
    keywords: ["mzdy", "mzdova", "dochazka", "zamestnanec", "eldp", "exekuce", "pojistovna"],
    phrases: ["mzdovy modul", "mzdova uzaverka"],
    answer:
      "Mzdový modul pokrývá docházku, mzdovou uzávěrku, ČSSZ a zdravotní pojišťovny, ELDP, roční zúčtování a exekuce. Systém připravuje podklady a výkazy, člověk řeší výjimky a schvaluje. Detailní napojení se ukazuje na demu a ověřuje při nasazení.",
    links: [{ label: "Modul mzdy", href: "/modul-mzdy" }],
  },
  {
    id: "tax",
    keywords: ["dane", "dan", "dph", "kh", "sh", "dppo", "dpfo", "vida", "fakturace"],
    phrases: ["dane a dph", "kontrolni hlaseni"],
    answer:
      "Daňový modul sdružuje DPPO, DPFO, DPH, kontrolní a souhrnné hlášení, monitoring legislativy a podporu při kontrolách. Připravuje podání z účetních dat ke kontrole a podpisu člověkem; ViDA a e-fakturace jsou popsané jako oblast připravenosti a dalšího rozvoje.",
    links: [{ label: "Modul daně a DPH", href: "/modul-dane" }],
  },
  {
    id: "cross-border",
    keywords: ["nemecko", "nemecky", "pendler", "elster", "kindergeld", "freistellung", "a1", "preshranicni"],
    phrases: ["cz de", "cesko nemecko"],
    answer:
      "CZ/DE modul je určený pro pendlery, vyslané pracovníky a firmy s přeshraničními operacemi. Dokumentace uvádí Steuererklärung, Freistellung, Kindergeld, ELSTER, A1, transferové ceny a koordinaci sociálního pojištění. Demo obsahuje samostatný profil specialisty německých daní.",
    links: [
      { label: "Modul CZ/DE", href: "/modul-cz-de" },
      { label: "Vyzkoušet demo", href: "/prihlaseni" },
    ],
  },
  {
    id: "automation",
    keywords: ["ocr", "parovani", "platby", "upominky", "terminy", "workflow", "automatizace", "uzaverka"],
    phrases: ["parovani plateb", "prijem faktur", "hlidani terminu"],
    answer:
      "Repozitář uvádí 8 workflow pro OCR příjem faktur, párování plateb, třístupňové upomínky, mzdové uzávěrky a ELSTER. Automatizace připravuje kroky a hlídá stav; kritické akce schvaluje člověk. Ve veřejném demu jsou některé pokročilé workflow zamčené.",
    links: [
      { label: "Automatizace a funkce", href: "/funkce" },
      { label: "Demo portál", href: "/prihlaseni" },
    ],
  },
  {
    id: "ai",
    keywords: ["ai", "predikce", "riziko", "fraud", "iban", "duplicitni", "schvaleni", "model"],
    phrases: ["umela inteligence", "detekce rizik", "schvalovaci brany"],
    answer:
      "AI vrstva je popsaná pro predikci odchodu klienta a cash flow, hledání rizik včetně změn IBAN a duplicitních faktur a doporučování dalšího kroku. Kritické akce mají lidské schvalovací brány. Některé modely se v pilotu teprve ladí a plánované autonomní agenty roadmapa řadí až do období 2027+.",
    links: [
      { label: "AI funkce", href: "/funkce" },
      { label: "Stav roadmapy", href: "/roadmap" },
    ],
  },
  {
    id: "roadmap",
    keywords: ["roadmapa", "stav", "hotovo", "plan", "budoucnost", "produkce", "verejne spusteni"],
    phrases: ["co je hotove", "co se chysta", "produkční verze"],
    answer:
      "Roadmapa označuje MVP a demo základ jako hotové a pilotní fázi jako probíhající. Veřejné spuštění, public pricing, self-service onboarding, marketplace integrací a mobilní aplikace jsou vedené jako další fáze; autonomní agenti a hlasový asistent jsou plánované na rok 2027+. Demo tedy není totéž co produkční nasazení.",
    links: [{ label: "Celá roadmapa", href: "/roadmap" }],
  },
];

const dataAccessAnswer: AssistantAnswer = {
  id: "data-access",
  answer:
    "Nemám přístup k vašim fakturám, účetnictví, klientským účtům ani jiným datům a nemohu je kontrolovat nebo měnit. Tento průvodce pracuje pouze s veřejnou dokumentací EkonomOS. Nevkládejte sem osobní ani účetní údaje; pro konkrétní případ použijte bezpečný kanál domluvený s týmem.",
  links: [
    { label: "Kontakt", href: "/kontakt" },
    { label: "Zabezpečení dat", href: "/zabezpeceni-dat" },
  ],
};

const privacyAnswer: AssistantAnswer = {
  id: "privacy",
  answer:
    "Tento průvodce nic neodesílá na server a zprávy neukládá; odpověď vybírá lokálně v prohlížeči. Přesto sem nevkládejte jména, kontakty, čísla dokladů ani jiná osobní či účetní data. Po obnovení stránky se konverzace ztratí.",
  links: [{ label: "Ochrana soukromí", href: "/soukromi" }],
};

const unknownAnswer: AssistantAnswer = {
  id: "unknown",
  answer:
    "Tohle v dokumentaci EkonomOS nemám spolehlivě doložené, proto nechci hádat. Napište týmu konkrétní dotaz, případně ho proberte v rámci úvodního hovoru k pilotu.",
  links: [
    { label: "Kontaktovat tým", href: "/kontakt" },
    { label: "Informace o pilotu", href: "/pilot" },
  ],
};

function normalize(value: string) {
  return value
    .toLocaleLowerCase("cs-CZ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const accessPatterns = [
  "moje faktury",
  "moje ucetnictvi",
  "muj ucet",
  "nase data",
  "klientska data",
  "zkontroluj fakturu",
  "zmen udaje",
  "prihlas se",
  "mas pristup",
  "vidis moje",
  "ukaz moje",
];

const privacyPatterns = [
  "ukladas zpravy",
  "ukladate zpravy",
  "sbiras data",
  "sbirate data",
  "osobni udaje",
  "historie chatu",
  "kam se posila",
];

export function findAssistantAnswer(query: string): AssistantAnswer {
  const normalizedQuery = normalize(query);
  const queryWords = new Set(normalizedQuery.split(" ").filter((word) => word.length > 1));

  if (accessPatterns.some((pattern) => normalizedQuery.includes(pattern))) {
    return dataAccessAnswer;
  }

  if (privacyPatterns.some((pattern) => normalizedQuery.includes(pattern))) {
    return privacyAnswer;
  }

  const ranked = knowledgeBase
    .map((entry) => {
      const keywordScore = entry.keywords.reduce(
        (score, keyword) => score + (queryWords.has(normalize(keyword)) ? 2 : 0),
        0,
      );
      const phraseScore = (entry.phrases ?? []).reduce(
        (score, phrase) => score + (normalizedQuery.includes(normalize(phrase)) ? 7 : 0),
        0,
      );
      return { entry, score: keywordScore + phraseScore };
    })
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score >= 2 ? ranked[0].entry : unknownAnswer;
}
