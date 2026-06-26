// Typed service data — single source of truth for all service pages

export interface ServiceSection {
  h: string;
  p: string;
}

export interface Service {
  slug: string;
  title: string;
  eyebrow: string;
  teaser: string;
  intro: string;
  bullets: string[];
  sections: ServiceSection[];
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: 'webseiten',
    title: 'Webseiten & Redesign',
    eyebrow: 'webseiten & redesign',
    teaser:
      'Moderne, schnelle Websites für KMU — vom One-Pager bis zur mehrseitigen Firmenseite, immer mit Eigentum beim Kunden.',
    intro:
      'Wir entwickeln Websites, die nicht nur gut aussehen, sondern auch technisch sauber umgesetzt sind. Mobile-first, schnell ladend und DSG-konform — Code, Domain und Dateien gehören stets Ihnen.',
    bullets: [
      'Mobile-First-Design & individuelles Erscheinungsbild',
      'One-Pager bis mehrseitige Firmenseite',
      'Basis-SEO & On-Page-Optimierung',
      'Schweizer Hosting, DSG-konforme Grundstruktur',
      'Eigentum an Code, Domain und Dateien liegt bei Ihnen',
    ],
    sections: [
      {
        h: 'Für jeden Betrieb die passende Lösung',
        p: 'Ob Handwerker, Dienstleister oder KMU — Ihre Website soll Ihr Angebot klar kommunizieren und Vertrauen wecken. Wir entwickeln massgeschneiderte Webseiten mit oder ohne CMS, auf einem modernen Stack (Astro, Next.js), der langfristig wartbar ist.',
      },
      {
        h: 'Technisch sauber und datenschutzkonform',
        p: 'Wir hosten in der Schweiz, richten eine DSG-konforme Grundstruktur ein und implementieren strukturierte Daten für Suchmaschinen — alles als selbstverständlicher Standard, nicht als Aufpreis.',
      },
      {
        h: 'Ihr Eigentum, Ihre Kontrolle',
        p: 'Code, Domain und Dateien gehören Ihnen — kein Lock-in, keine versteckten Abhängigkeiten. Möchten Sie nach dem Launch nichts mehr mit Technik zu tun haben? Mit einem Care-Plan übernehmen wir die laufende Wartung zuverlässig für Sie.',
      },
    ],
    metaTitle: 'Webseiten & Redesign für KMU — Swissly IT Ebikon',
    metaDescription:
      'Professionelle Websites für KMU in der Zentralschweiz. Mobile-first, schnell, DSG-konform, Schweizer Hosting. Eigentum beim Kunden. Kostenlose Erstberatung anfragen.',
  },
  {
    slug: 'webshops',
    title: 'Webshops',
    eyebrow: 'e-commerce',
    teaser:
      'Online-Shops mit klarem Backend und einfachem Bestellprozess — inklusive Schweizer Zahlungsarten wie TWINT und Kreditkarte.',
    intro:
      'Wir richten Ihnen einen Webshop ein, den Sie nach der Übergabe selbst pflegen können. Schweizer Zahlungslösungen, sauberes Backend und eine verständliche Einschulung sind von Anfang an dabei.',
    bullets: [
      'Schweizer Zahlungsarten (TWINT, Kreditkarte, Rechnung)',
      'Einfaches Backend für eigene Produktpflege',
      'Versandlogik & Grundsetup bis ca. 500 Produkte',
      'Basis WooCommerce, anpassbar',
      'Einschulung inklusive',
    ],
    sections: [
      {
        h: 'Einfach verkaufen im Netz',
        p: 'Wir bauen Ihren Online-Shop auf einer bewährten Basis (WooCommerce) auf und konfigurieren ihn so, dass Sie ihn nach dem Launch selbstständig bedienen können. Keine unnötige Komplexität — nur das, was Sie wirklich brauchen.',
      },
      {
        h: 'Schweizer Zahlungslösungen',
        p: 'TWINT, Kreditkarte und Rechnung via Stripe, Datatrans oder Wallee — wir integrieren die Zahlungsanbieter, die Ihre Kunden bereits kennen und denen sie vertrauen.',
      },
      {
        h: 'Einschulung und Übergabe',
        p: 'Sie erhalten eine verständliche Einschulung für Produkte, Preise und Bestellverwaltung — damit Sie wirklich unabhängig sind. Und wenn später Fragen auftauchen, sind wir da.',
      },
    ],
    metaTitle: 'Webshops für KMU — Swissly IT, Ebikon Luzern',
    metaDescription:
      'Online-Shops mit TWINT, Kreditkarte & Rechnung. WooCommerce-Basis, einfaches Backend, Einschulung inklusive. Swissly IT in Ebikon — Anfrage kostenlos und unverbindlich.',
  },
  {
    slug: 'wartung-care',
    title: 'Wartung & Care-Pläne',
    eyebrow: 'wartung & care',
    teaser:
      'Rundum-sorglos für Ihre Website — Updates, Backups, Monitoring und Support auf Schweizer Servern, ab CHF 59/Mt.',
    intro:
      'Unsere Care-Pläne übernehmen die vollständige Pflege Ihrer Website: Sicherheits- und Plattform-Updates, tägliche Backups, Uptime-Monitoring und kleine Anpassungen — alles auf Schweizer Premium-Servern, monatlich kündbar.',
    bullets: [
      'Tägliche Backups & Sicherheits-Updates',
      'Uptime-Monitoring & Performance-Checks',
      'Schweizer Premium-Hosting inklusive',
      'Kleine Anpassungen im monatlichen Kontingent',
      '30 Tage kündbar, keine versteckten Kosten',
    ],
    sections: [
      {
        h: 'Damit Sie sich nicht um Technik kümmern müssen',
        p: 'Plugins veralten, Sicherheitslücken entstehen, Backups vergisst man. Mit einem Care-Plan erledigen wir das für Sie — leise im Hintergrund, zuverlässig und ohne dass Sie etwas tun müssen.',
      },
      {
        h: 'Drei Pläne, eine Philosophie',
        p: 'Foundation bietet solide Basiswartung. Growth ergänzt ein monatliches Anpassungsbudget und priorisierten Support. Scale ist für anspruchsvollere Betriebe mit kürzerer Reaktionszeit und Quartalsreports. Jeder Plan ist jährlich verrechnet, 30 Tage auf Ende der Rechnungsperiode kündbar.',
      },
      {
        h: 'Hosting in der Schweiz inklusive',
        p: 'Bei allen Care-Plänen ist Schweizer Premium-Hosting enthalten — Ihre Daten verlassen die Schweiz nicht. Sie behalten jederzeit die volle Kontrolle über Domain und Daten.',
      },
    ],
    metaTitle: 'Website-Wartung & Care-Pläne — Swissly IT Ebikon',
    metaDescription:
      'Rundum-sorglos für Ihre Website: Updates, Backups, Monitoring & CH-Hosting ab CHF 59/Mt. Drei Care-Pläne, 30 Tage kündbar. Swissly IT — jetzt Beratung anfragen.',
  },
  {
    slug: 'migrationen',
    title: 'Migrationen',
    eyebrow: 'migrationen',
    teaser:
      'Sicherer Umzug von veralteten Systemen auf moderne Stacks — ohne Datenverlust und Ranking-Einbruch.',
    intro:
      'Wir migrieren Ihre bestehende Website von WordPress, Joomla oder Typo3 auf einen modernen Stack — sauber, strukturiert und mit 301-Weiterleitungen für den vollständigen SEO-Erhalt.',
    bullets: [
      'Umzug von WordPress, Joomla, Typo3 und mehr',
      '301-Weiterleitungen für SEO-Kontinuität',
      'Test-Umgebung vor Go-Live (kein Blindflug)',
      'Optionaler Hosting-Wechsel in die Schweiz',
      'Kein Datenverlust, kein Ranking-Einbruch',
    ],
    sections: [
      {
        h: 'Moderner Stack, vertraute Inhalte',
        p: 'Wir übertragen Ihre bestehenden Inhalte sorgfältig auf eine neue, leistungsfähige Plattform (Astro, Next.js oder schlankes WordPress). Das Ergebnis sehen Sie zuerst auf einer Staging-Umgebung — erst wenn Sie begeistert sind, gehen wir live.',
      },
      {
        h: 'SEO-Erhalt durch saubere Weiterleitungen',
        p: 'Jede alte URL erhält eine 301-Weiterleitung auf die neue Adresse. So behalten Sie Ihr Google-Ranking und verlieren keine Besucher durch Fehlerseiten — der Wechsel bleibt für Suchmaschinen nahtlos.',
      },
      {
        h: 'Hosting-Wechsel auf Wunsch',
        p: 'Möchten Sie gleichzeitig auf Schweizer Hosting wechseln? Wir koordinieren den DNS-Umzug und sorgen für einen reibungslosen Cutover — für Sie transparent, für Ihre Besucher unsichtbar.',
      },
    ],
    metaTitle: 'Website-Migration — Swissly IT, Ebikon Luzern',
    metaDescription:
      'WordPress, Joomla oder Typo3 auf moderne Plattform migrieren — ohne SEO-Verlust. 301-Weiterleitungen, Staging-Umgebung, optionales CH-Hosting. Gratis Erstberatung.',
  },
  {
    slug: 'seo-performance',
    title: 'SEO & Performance',
    eyebrow: 'seo & performance',
    teaser:
      'Technisches SEO und Performance-Optimierung für bessere Rankings und schnellere Ladezeiten — Lighthouse 90+.',
    intro:
      'Wir verbessern die technische Grundlage Ihrer Website: Ladezeit, Mobile-Optimierung, saubere Meta-Tags und strukturierte Daten — messbar via Google Search Console. Kein Content-Marketing, keine Werbung, nur ehrliche technische Arbeit.',
    bullets: [
      'Performance-Audit & Lighthouse 90+',
      'Bild-, Code- und Caching-Optimierung',
      'Meta-Tags & strukturierte Daten (Schema.org)',
      'Mobile-Optimierung',
      'Monitoring via Google Search Console',
    ],
    sections: [
      {
        h: 'Technisches SEO — was wirklich zählt',
        p: 'Wir konzentrieren uns auf das Fundament: Ladezeit, Mobile-Optimierung, saubere Seitenstruktur und korrekte Meta-Daten. Das sind die Faktoren, die Suchmaschinen tatsächlich bewerten — und die sich direkt auf Ihre Sichtbarkeit auswirken.',
      },
      {
        h: 'Was wir nicht anbieten — und warum',
        p: 'Content-Marketing, Google Ads und SEA liegen ausserhalb unseres Angebots. Wir sind ehrlich: Nachhaltige Rankings entstehen durch technisch saubere Seiten und relevante Inhalte — nicht durch bezahlte Klicks.',
      },
      {
        h: 'Messbarer Fortschritt',
        p: 'Alle Massnahmen werden dokumentiert und mit Google Search Console überwacht. Sie sehen, was wir tun und was es bringt — transparent, nachvollziehbar, ohne Fachjargon.',
      },
    ],
    metaTitle: 'SEO & Performance-Optimierung — Swissly IT Ebikon',
    metaDescription:
      'Technisches SEO für KMU: Lighthouse 90+, Meta-Tags, strukturierte Daten, Monitoring via Search Console. Kein Content-Marketing — ehrliche technische Arbeit. Swissly IT.',
  },
  {
    slug: 'it-support',
    title: 'IT-Support & Infrastruktur',
    eyebrow: 'it-support',
    teaser:
      'Persönlicher IT-Support remote und vor Ort — abgerechnet im 15-Minuten-Takt zu CHF 140/Stunde, ohne Pauschalen.',
    intro:
      'Wir helfen Ihnen schnell und unkompliziert, wenn etwas nicht funktioniert — remote oder persönlich vor Ort in der Zentralschweiz. Abrechnung im 15-Minuten-Takt, keine Mindestzeiten, keine blöden Fragen.',
    bullets: [
      'Remote- und Vor-Ort-Support in der Zentralschweiz',
      'Abrechnung im 15-Minuten-Takt (CHF 140/Std.)',
      'Arbeitsplatz-Einrichtung (PC/Mac startklar)',
      'Netzwerke & sichere Backups',
      'PC-/Drucker-Probleme rasch behoben',
    ],
    sections: [
      {
        h: 'Hilfe, wann Sie sie brauchen',
        p: 'Ob Drucker-Problem, neuer PC, langsames Netzwerk oder Datenverlust — wir beheben das Problem schnell und erklären Ihnen dabei, was passiert ist. Kein Fachjargon, kein Blabla.',
      },
      {
        h: 'Faire Abrechnung im 15-Minuten-Takt',
        p: 'Sie zahlen nur für die Zeit, die wir tatsächlich brauchen — im 15-Minuten-Takt zum Stundensatz von CHF 140. Keine Anfahrtspauschalen, keine Mindestzeiten, kein Abo-Zwang.',
      },
      {
        h: 'Infrastruktur mit Weitblick',
        p: 'Wir richten nicht nur Ihren aktuellen Arbeitsplatz ein — wir denken mit: sichere Backup-Konzepte, stabile Netzwerke und eine Infrastruktur, die mit Ihrem Betrieb mitfächst.',
      },
    ],
    metaTitle: 'IT-Support & Infrastruktur — Swissly IT, Ebikon',
    metaDescription:
      'Persönlicher IT-Support in der Zentralschweiz. Remote & vor Ort, 15-Min-Takt, CHF 140/Std. PC, Netzwerk, Backups, Fehlerbehebung. Keine blöden Fragen. Swissly IT.',
  },
  {
    slug: 'schulungen',
    title: 'KI- & IT-Schulungen',
    eyebrow: 'schulungen',
    teaser:
      'Praxisnahe KI- und IT-Schulungen für KMU — verständlich erklärt, datenschutzkonform, direkt im Arbeitsalltag umsetzbar.',
    intro:
      'Wir schulen Ihre Mitarbeitenden im sicheren Umgang mit KI-Tools, Datenschutz und digitalem Arbeiten. Halbtages-Workshops bis 4 Stunden, geduldig erklärt, direkt auf Ihren Betrieb zugeschnitten.',
    bullets: [
      'KI-Workshops (bis 4 Std.) für KMU-Teams',
      'Datenschutzkonformer KI-Einsatz im Alltag',
      'Digitalwerkzeuge verständlich erklärt',
      'Auf Ihrem Niveau — keine Vorkenntnisse nötig',
      'Bis zu 4 Personen pro Session',
    ],
    sections: [
      {
        h: 'KI ohne Berührungsängste',
        p: 'ChatGPT und andere KI-Tools können den Arbeitsalltag erheblich erleichtern — wenn man weiss, wie man sie sinnvoll und sicher einsetzt. In unseren Workshops zeigen wir Ihnen genau das, Schritt für Schritt und ohne Vorkenntnisse vorauszusetzen.',
      },
      {
        h: 'Datenschutz ist kein Afterthought',
        p: 'Wir erklären, welche Daten Sie KI-Tools anvertrauen dürfen und welche nicht. Datenschutzkonforme Nutzung ist fester Bestandteil jedes Workshops — nicht ein Anhang, den niemand liest.',
      },
      {
        h: 'Für jeden verständlich',
        p: 'Unsere Schulungen sind nicht für IT-Profis gemacht. Wir sprechen Klartext, machen keine Annahmen über Ihr Vorwissen und nehmen uns Zeit für Ihre Fragen. Bis zu 4 Personen pro Session, damit niemand zurückbleibt.',
      },
    ],
    metaTitle: 'KI- & IT-Schulungen für KMU — Swissly IT Ebikon',
    metaDescription:
      'Praxisnahe KI-Workshops & IT-Schulungen für KMU in der Zentralschweiz. Datenschutzkonform, verständlich, bis 4 Personen. Swissly IT Ebikon — jetzt Termin anfragen.',
  },
];
