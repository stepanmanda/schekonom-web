// Centralized team roster for SCH-EKONOM s.r.o.
// Source of truth for all team member data across the application.

export interface TeamMember {
  name: string;
  position: string;
  department: DepartmentId;
  tel?: string;
  mob?: string;
  email?: string;
  photo?: string;
  badge?: string;
}

export type DepartmentId =
  | "vedeni"
  | "provoz"
  | "dane"
  | "ucetni"
  | "plzen"
  | "mzdy"
  | "nemecko"
  | "it"
  | "materska";

export interface Department {
  id: DepartmentId;
  name: string;
  color: "gold" | "cyan" | "green" | "slate";
}

export const departments: Department[] = [
  { id: "vedeni", name: "Vedení", color: "gold" },
  { id: "provoz", name: "Provozní oddělení", color: "cyan" },
  { id: "dane", name: "Daňoví poradci", color: "green" },
  { id: "ucetni", name: "Účetní oddělení", color: "cyan" },
  { id: "plzen", name: "Pobočka Plzeň", color: "slate" },
  { id: "mzdy", name: "Mzdové oddělení", color: "green" },
  { id: "nemecko", name: "Německé daně", color: "gold" },
  { id: "it", name: "IT oddělení", color: "cyan" },
  { id: "materska", name: "Na mateřské dovolené", color: "slate" },
] as const;

export const teamMembers: TeamMember[] = [
  // --- Vedení ---
  {
    name: "Petra Poupová",
    position: "Daňový poradce ev. č. 3996, členka KDP ČR",
    department: "vedeni",
    tel: "+420 354 433 005",
    badge: "ev. č. 3996, KDP ČR",
    photo: "/images/team/Poupova.jpg",
  },
  {
    name: "František Schneider",
    position: "Kontrolér a poradce firem",
    department: "vedeni",
    tel: "+420 354 433 005",
    email: "frantisek.schneider@schekonom.cz",
    photo: "/images/team/Schneider.jpg",
  },

  // --- Provozní oddělení ---
  {
    name: "Klaudie Šulcová",
    position: "Vedoucí provozu daňové kanceláře",
    department: "provoz",
    tel: "+420 354 433 005; +420 351 011 836",
    mob: "+420 731 037 177",
    email: "klaudie.sulcova@schekonom.cz",
    photo: "/images/team/Sulcova.jpg",
  },
  {
    name: "Linda Kuklová",
    position: "Asistentka daňové kanceláře",
    department: "provoz",
    tel: "+420 351 011 887",
    mob: "+420 731 037 123",
    email: "linda.kuklova@schekonom.cz",
    photo: "/images/team/Kuklova.jpg",
  },
  {
    name: "Regina Altmanová",
    position: "Fakturantka / Asistentka daňové kanceláře",
    department: "provoz",
    tel: "+420 354 433 005; +420 351 011 825",
    email: "altmanova@schekonom.cz",
    photo: "/images/team/Altmanova.jpg",
  },
  {
    name: "Alice Hovorková",
    position: "Asistentka",
    department: "provoz",
    tel: "+420 354 433 005",
    email: "hovorkova@schekonom.cz",
    photo: "/images/team/Hovorkova.jpg",
  },
  {
    name: "Isabella Formica",
    position: "Recepční a asistentka daňové kanceláře",
    department: "provoz",
    tel: "+420 351 011 050",
    email: "isabella.formica@schekonom.cz",
    photo: "/images/team/Isabella_Formica_edited.jpg",
  },
  {
    name: "Otto Zeitler",
    position: "Manažer vztahů s klienty pro Německo",
    department: "provoz",
    tel: "+420 351 011 050",
    mob: "+49 9632 92312 15",
    email: "otto.zeitler@schekonom.cz",
    photo: "/images/team/Zeitler.png",
  },

  // --- Daňoví poradci ---
  {
    name: "Monika Zemanová",
    position: "Daňový poradce ev. č. 4756, členka KDP ČR",
    department: "dane",
    tel: "+420 354 433 005; +420 351 011 827",
    email: "zemanova@schekonom.cz",
    badge: "ev. č. 4756, KDP ČR",
    photo: "/images/team/Zemanova.jpg",
  },
  {
    name: "Zlatuše Čtvrtečková",
    position: "Daňový poradce ev. č. 2558, členka KDP ČR",
    department: "dane",
    tel: "+420 354 433 005; +420 351 011 823",
    email: "ctvrteckova@schekonom.cz",
    badge: "ev. č. 2558, KDP ČR",
    photo: "/images/team/Ctvrteckova.jpg",
  },
  {
    name: "Pavlína Prokopcová",
    position: "Asistentka daňového poradce",
    department: "dane",
    tel: "+420 354 433 005",
    mob: "+420 604 192 611",
    email: "prokopcovap@schekonom.cz",
    photo: "/images/team/Prokopcova.jpg",
  },
  {
    name: "Marie Schneiderová",
    position: "Daňový poradce",
    department: "dane",
    tel: "+420 354 433 005",
    email: "schneiderova@schekonom.cz",
  },
  {
    name: "Adéla Vetyšková",
    position: "Asistentka daňového poradce",
    department: "dane",
    tel: "+420 354 433 005",
    mob: "+420 733 125 586",
    email: "adela.vetyskova@schekonom.cz",
    photo: "/images/team/Vetyskova.jpg",
  },

  // --- Účetní oddělení ---
  {
    name: "Lenka Keslová",
    position: "Vedoucí účetního oddělení",
    department: "ucetni",
    tel: "+420 354 433 005; +420 351 011 830",
    email: "keslova@schekonom.cz",
    photo: "/images/team/Keslova.jpg",
  },
  {
    name: "Kateřina Křížová",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 354 433 005; +420 351 011 881",
    email: "katerina.krizova@schekonom.cz",
    photo: "/images/team/Kate_ina_K_ov_final.jpg",
  },
  {
    name: "Martina Mácalová",
    position: "Zástupce vedoucí účetního oddělení",
    department: "ucetni",
    tel: "+420 351 011 886",
    email: "martina.macalova@schekonom.cz",
  },
  {
    name: "Karolína Filipová",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 351 011 839",
    email: "karolina.filipova@schekonom.cz",
    photo: "/images/team/Filipova.jpg",
  },
  {
    name: "Růžena Hartmannová",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 354 433 005",
    email: "hartmannova@schekonom.cz",
    photo: "/images/team/Hartmannova.jpg",
  },
  {
    name: "Markéta Petrovková",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 354 433 005",
    email: "marketa.petrovkova@schekonom.cz",
    photo: "/images/team/Petrovkova.jpg",
  },
  {
    name: "Petr Salajka",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 354 433 005; +420 354 011 884",
    email: "petr.salajka@schekonom.cz",
    photo: "/images/team/Salajka.jpg",
  },
  {
    name: "Ivana Burešová",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 354 433 005; +420 351 011 885",
    email: "ivana.buresova@schekonom.cz",
    photo: "/images/team/Buresova.jpg",
  },
  {
    name: "Aneta Petříková",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 733 634 684",
    email: "aneta.petrikova@schekonom.cz",
  },
  {
    name: "Miroslava Křížová",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 354 433 005",
    email: "miroslava.krizova@schekonom.cz",
    photo: "/images/team/Krizova.jpg",
  },
  {
    name: "Daniela Kejšarová",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 351 011 884",
    email: "daniela.kejsarova@schekonom.cz",
    photo: "/images/team/Kejsarova.jpg",
  },
  {
    name: "Elena Kirschová",
    position: "Junior účetní",
    department: "ucetni",
    tel: "+420 354 433 005",
    email: "elena.kirschova@schekonom.cz",
    photo: "/images/team/Kirschova.jpg",
  },

  // --- Pobočka Plzeň ---
  {
    name: "Ivana Kopecká",
    position: "Junior účetní",
    department: "plzen",
    tel: "+420 354 433 005",
    email: "ivana.kopecka@schekonom.cz",
    photo: "/images/team/Kopecka.jpg",
  },
  {
    name: "Viktorie Sobotková",
    position: "Junior účetní",
    department: "plzen",
    tel: "+420 605 944 932",
    email: "viktorie.sobotkova@schekonom.cz",
    photo: "/images/team/Sobotkova.jpg",
  },
  {
    name: "Denisa Nejedlá",
    position: "Senior účetní",
    department: "plzen",
    tel: "+420 354 433 005",
    email: "denisa.nejedla@schekonom.cz",
    photo: "/images/team/Denisa_Nejedl_edited.jpg",
  },

  // --- Mzdové oddělení ---
  {
    name: "Jaroslava Seitzová",
    position: "Vedoucí mzdového oddělení",
    department: "mzdy",
    tel: "+420 354 433 005; +420 351 011 837",
    mob: "+420 703 146 229",
    email: "seitzova@schekonom.cz",
    photo: "/images/team/Seitzova.jpg",
  },
  {
    name: "Linda Henzlová",
    position: "Junior mzdová účetní",
    department: "mzdy",
    tel: "+420 354 433 005; +420 351 011 828",
    mob: "+420 703 146 231",
    email: "henzlova@schekonom.cz",
    photo: "/images/team/Henzelova.jpg",
  },
  {
    name: "Jana Mouhafidi",
    position: "Junior mzdová účetní",
    department: "mzdy",
    tel: "+420 351 011 829",
    mob: "+420 732 547 650",
    email: "mouhafidij@schekonom.cz",
  },
  {
    name: "Dana Brožová",
    position: "Senior mzdová účetní",
    department: "mzdy",
    tel: "+420 354 433 005",
    mob: "+420 605 196 369",
    email: "dana.brozova@schekonom.cz",
    photo: "/images/team/Brozova.jpg",
  },
  {
    name: "Radka Fritschová",
    position: "Junior mzdová účetní",
    department: "mzdy",
    tel: "+420 354 433 005",
    mob: "+420 703 146 224",
    email: "radka.fritschova@schekonom.cz",
    photo: "/images/team/Fritschova.jpg",
  },

  // --- Německé daně ---
  {
    name: "Jitka Váchová",
    position: "Vedoucí oddělení německých daní",
    department: "nemecko",
    tel: "+420 354 433 005; +420 351 011 820",
    mob: "+420 605 158 556",
    email: "vachova@schekonom.cz",
    photo: "/images/team/Vachova.jpg",
  },
  {
    name: "Klára Pechrová",
    position: "Asistentka německé kanceláře",
    department: "nemecko",
    tel: "+420 354 433 838",
    mob: "+420 733 125 587",
    email: "pechrovak@schekonom.cz",
    photo: "/images/team/Pechrova.jpg",
  },

  // --- IT oddělení ---
  {
    name: "Petr Hána",
    position: "IT specialista",
    department: "it",
    tel: "+420 354 433 005; +420 351 011 882",
    email: "hana@schekonom.cz",
    photo: "/images/team/Hana.jpg",
  },

  // --- Na mateřské dovolené ---
  {
    name: "Tereza Turnerová",
    position: "Junior účetní",
    department: "materska",
    tel: "+420 354 433 005; +420 351 011 886",
    email: "tereza.turnerova@schekonom.cz",
    photo: "/images/team/Turnerova.jpg",
  },
  {
    name: "Alice Skokanová",
    position: "Senior účetní",
    department: "materska",
    tel: "+420 354 433 005; +420 351 011 832",
    mob: "+420 703 146 223",
    email: "skokanova@schekonom.cz",
    photo: "/images/team/Skokanova.jpg",
  },
  {
    name: "Marcela Smrčková",
    position: "Junior účetní",
    department: "materska",
    tel: "+420 354 433 005",
    mob: "+420 733 568 599",
    email: "marcela.smrckova@schekonom.cz",
    photo: "/images/team/Marcela_Smr_kov_final.jpg",
  },
  {
    name: "Natálie Lencová",
    position: "Junior mzdová účetní",
    department: "materska",
    tel: "+420 351 011 829",
    email: "natalie.lencova@schekonom.cz",
    photo: "/images/team/Lencova.jpg",
  },
  {
    name: "Nikola Vávrová",
    position: "Junior účetní",
    department: "materska",
    tel: "+420 354 433 005; +420 351 011 888",
    email: "nikola.vavrova@schekonom.cz",
    photo: "/images/team/Vavrova.jpg",
  },
  {
    name: "Nicole Faustová",
    position: "Junior účetní",
    department: "materska",
    tel: "+420 354 433 005",
    email: "faustova@schekonom.cz",
    photo: "/images/team/Faustova.jpg",
  },
];

// Helper: get members by department
export function getMembersByDepartment(deptId: DepartmentId): TeamMember[] {
  return teamMembers.filter((m) => m.department === deptId);
}

// Helper: get department info by id
export function getDepartment(deptId: DepartmentId): Department | undefined {
  return departments.find((d) => d.id === deptId);
}

// Helper: get first phone number from a potentially multi-number tel string
export function getPrimaryPhone(tel?: string): string | undefined {
  if (!tel) return undefined;
  return tel.split(";")[0].trim();
}

// Helper: get initials from name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
