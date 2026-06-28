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
      'Moderne, schnelle Websites für KMU: vom One-Pager bis zur Firmenseite, Eigentum bleibt bei Ihnen.',
    intro:
      'Wir entwickeln Websites, die gut aussehen und technisch sauber sind: Mobile-first, schnell ladend, DSG-konform. Code, Domain und Dateien gehören Ihnen.',
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
        p: 'Ihre Website soll Ihr Angebot klar zeigen und Vertrauen wecken. Wir entwickeln massgeschneiderte Seiten mit oder ohne CMS, auf einem langfristig wartbaren Stack (Astro, Next.js).',
      },
      {
        h: 'Technisch sauber und datenschutzkonform',
        p: 'Wir hosten in der Schweiz, richten eine DSG-konforme Grundstruktur ein und implementieren strukturierte Daten für Suchmaschinen. Alles Standard, kein Aufpreis.',
      },
      {
        h: 'Ihr Eigentum, Ihre Kontrolle',
        p: 'Code, Domain und Dateien gehören Ihnen, kein Lock-in, keine versteckten Abhängigkeiten. Möchten Sie sich nach dem Launch nicht um Technik kümmern? Mit einem Care-Plan übernehmen wir die Wartung.',
      },
    ],
    metaTitle: 'Webseiten & Redesign für KMU | Swissly IT Ebikon',
    metaDescription:
      'Professionelle Websites für KMU in der Zentralschweiz. Mobile-first, schnell, DSG-konform, Schweizer Hosting. Eigentum beim Kunden. Kostenlose Erstberatung anfragen.',
  },
  {
    slug: 'webshops',
    title: 'Webshops',
    eyebrow: 'e-commerce',
    teaser:
      'Online-Shops mit klarem Backend und einfachem Bestellprozess, inklusive Schweizer Zahlungsarten wie TWINT und Kreditkarte.',
    intro:
      'Wir richten Ihnen einen Webshop ein, den Sie nach der Übergabe selbst pflegen. Schweizer Zahlungslösungen, sauberes Backend und Einschulung sind von Anfang an dabei.',
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
        p: 'Wir bauen Ihren Online-Shop auf bewährter Basis (WooCommerce) und konfigurieren ihn so, dass Sie ihn nach dem Launch selbst bedienen. Nur das, was Sie wirklich brauchen.',
      },
      {
        h: 'Schweizer Zahlungslösungen',
        p: 'TWINT, Kreditkarte und Rechnung via Stripe, Datatrans oder Wallee. Wir integrieren die Zahlungsanbieter, die Ihre Kunden kennen und denen sie vertrauen.',
      },
      {
        h: 'Einschulung und Übergabe',
        p: 'Sie erhalten eine verständliche Einschulung für Produkte, Preise und Bestellverwaltung, damit Sie wirklich unabhängig sind. Tauchen später Fragen auf, sind wir da.',
      },
    ],
    metaTitle: 'Webshops für KMU | Swissly IT, Ebikon Luzern',
    metaDescription:
      'Online-Shops mit TWINT, Kreditkarte & Rechnung. WooCommerce-Basis, einfaches Backend, Einschulung inklusive. Swissly IT in Ebikon. Anfrage kostenlos und unverbindlich.',
  },
  {
    slug: 'wartung-care',
    title: 'Wartung & Care-Pläne',
    eyebrow: 'wartung & care',
    teaser:
      'Rundum-sorglos für Ihre Website: Updates, Backups, Monitoring und Support auf Schweizer Servern, ab CHF 59/Mt.',
    intro:
      'Unsere Care-Pläne pflegen Ihre Website komplett: Sicherheits- und Plattform-Updates, tägliche Backups, Uptime-Monitoring und kleine Anpassungen. Alles auf Schweizer Premium-Servern, monatlich kündbar.',
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
        p: 'Plugins veralten, Sicherheitslücken entstehen, Backups vergisst man. Mit einem Care-Plan erledigen wir das für Sie: leise im Hintergrund, ohne Ihr Zutun.',
      },
      {
        h: 'Drei Pläne, eine Philosophie',
        p: 'Foundation bietet Basiswartung. Growth ergänzt ein monatliches Anpassungsbudget und priorisierten Support. Scale bietet kürzere Reaktionszeit und Quartalsreports für anspruchsvolle Betriebe. Alle Pläne sind jährlich verrechnet, 30 Tage auf Ende der Rechnungsperiode kündbar.',
      },
      {
        h: 'Hosting in der Schweiz inklusive',
        p: 'Bei allen Care-Plänen ist Schweizer Premium-Hosting enthalten. Ihre Daten verlassen die Schweiz nicht. Über Domain und Daten behalten Sie jederzeit die volle Kontrolle.',
      },
    ],
    metaTitle: 'Website-Wartung & Care-Pläne | Swissly IT Ebikon',
    metaDescription:
      'Rundum-sorglos für Ihre Website: Updates, Backups, Monitoring & CH-Hosting ab CHF 59/Mt. Drei Care-Pläne, 30 Tage kündbar. Swissly IT. Jetzt Beratung anfragen.',
  },
  {
    slug: 'migrationen',
    title: 'Migrationen',
    eyebrow: 'migrationen',
    teaser:
      'Sicherer Umzug veralteter Systeme auf moderne Stacks, ohne Datenverlust und Ranking-Einbruch.',
    intro:
      'Wir migrieren Ihre bestehende Website von WordPress, Joomla oder Typo3 auf einen modernen Stack: sauber, strukturiert und mit 301-Weiterleitungen für vollständigen SEO-Erhalt.',
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
        p: 'Wir übertragen Ihre Inhalte sorgfältig auf eine neue, leistungsfähige Plattform (Astro, Next.js oder schlankes WordPress). Das Ergebnis sehen Sie zuerst auf einer Staging-Umgebung. Erst wenn Sie begeistert sind, gehen wir live.',
      },
      {
        h: 'SEO-Erhalt durch saubere Weiterleitungen',
        p: 'Jede alte URL bekommt eine 301-Weiterleitung. So behalten Sie Ihr Google-Ranking und verlieren keine Besucher an Fehlerseiten. Für Suchmaschinen bleibt der Wechsel nahtlos.',
      },
      {
        h: 'Hosting-Wechsel auf Wunsch',
        p: 'Möchten Sie gleichzeitig auf Schweizer Hosting wechseln? Wir koordinieren den DNS-Umzug und sorgen für einen reibungslosen Cutover: für Sie transparent, für Ihre Besucher unsichtbar.',
      },
    ],
    metaTitle: 'Website-Migration | Swissly IT, Ebikon Luzern',
    metaDescription:
      'WordPress, Joomla oder Typo3 auf moderne Plattform migrieren, ohne SEO-Verlust. 301-Weiterleitungen, Staging-Umgebung, optionales CH-Hosting. Gratis Erstberatung.',
  },
  {
    slug: 'seo-performance',
    title: 'SEO & Performance',
    eyebrow: 'seo & performance',
    teaser:
      'Technisches SEO und Performance-Optimierung für bessere Rankings und schnellere Ladezeiten. Lighthouse 90+.',
    intro:
      'Wir verbessern die technische Grundlage Ihrer Website: Ladezeit, Mobile-Optimierung, saubere Meta-Tags und strukturierte Daten, messbar via Google Search Console. Kein Content-Marketing, keine Werbung, nur ehrliche technische Arbeit.',
    bullets: [
      'Performance-Audit & Lighthouse 90+',
      'Bild-, Code- und Caching-Optimierung',
      'Meta-Tags & strukturierte Daten (Schema.org)',
      'Mobile-Optimierung',
      'Monitoring via Google Search Console',
    ],
    sections: [
      {
        h: 'Technisches SEO: was wirklich zählt',
        p: 'Wir konzentrieren uns auf das Fundament: Ladezeit, Mobile-Optimierung, saubere Seitenstruktur und korrekte Meta-Daten. Genau diese Faktoren bewerten Suchmaschinen und beeinflussen Ihre Sichtbarkeit direkt.',
      },
      {
        h: 'Was wir nicht anbieten, und warum',
        p: 'Content-Marketing, Google Ads und SEA bieten wir nicht an. Nachhaltige Rankings entstehen durch technisch saubere Seiten und relevante Inhalte, nicht durch bezahlte Klicks.',
      },
      {
        h: 'Messbarer Fortschritt',
        p: 'Alle Massnahmen werden dokumentiert und mit Google Search Console überwacht. Sie sehen, was wir tun und was es bringt: transparent, nachvollziehbar, ohne Fachjargon.',
      },
    ],
    metaTitle: 'SEO & Performance-Optimierung | Swissly IT Ebikon',
    metaDescription:
      'Technisches SEO für KMU: Lighthouse 90+, Meta-Tags, strukturierte Daten, Monitoring via Search Console. Kein Content-Marketing, nur ehrliche technische Arbeit. Swissly IT.',
  },
  {
    slug: 'it-support',
    title: 'IT-Support & Infrastruktur',
    eyebrow: 'it-support',
    teaser:
      'Persönlicher IT-Support remote und vor Ort. Abgerechnet im 15-Minuten-Takt zu CHF 140/Stunde, ohne Pauschalen.',
    intro:
      'Wenn etwas nicht funktioniert, helfen wir schnell und unkompliziert: remote oder vor Ort in der Zentralschweiz. Abrechnung im 15-Minuten-Takt, keine Mindestzeiten, keine blöden Fragen.',
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
        p: 'Ob Drucker-Problem, neuer PC, langsames Netzwerk oder Datenverlust: Wir lösen es schnell und erklären Ihnen dabei, was passiert ist. Kein Fachjargon, kein Blabla.',
      },
      {
        h: 'Faire Abrechnung im 15-Minuten-Takt',
        p: 'Sie zahlen nur für die Zeit, die wir tatsächlich brauchen: im 15-Minuten-Takt zum Stundensatz von CHF 140. Keine Anfahrtspauschalen, keine Mindestzeiten, kein Abo-Zwang.',
      },
      {
        h: 'Infrastruktur mit Weitblick',
        p: 'Wir richten nicht nur Ihren Arbeitsplatz ein, wir denken mit: sichere Backup-Konzepte, stabile Netzwerke und eine Infrastruktur, die mit Ihrem Betrieb mitwächst.',
      },
    ],
    metaTitle: 'IT-Support & Infrastruktur | Swissly IT, Ebikon',
    metaDescription:
      'Persönlicher IT-Support in der Zentralschweiz. Remote & vor Ort, 15-Min-Takt, CHF 140/Std. PC, Netzwerk, Backups, Fehlerbehebung. Keine blöden Fragen. Swissly IT.',
  },
  {
    slug: 'schulungen',
    title: 'KI- & IT-Schulungen',
    eyebrow: 'schulungen',
    teaser:
      'Praxisnahe KI- und IT-Schulungen für KMU: verständlich, datenschutzkonform und direkt im Arbeitsalltag umsetzbar.',
    intro:
      'Wir schulen Ihre Mitarbeitenden im sicheren Umgang mit KI-Tools, Datenschutz und digitalem Arbeiten. Halbtages-Workshops bis 4 Stunden, geduldig erklärt und auf Ihren Betrieb zugeschnitten.',
    bullets: [
      'KI-Workshops (bis 4 Std.) für KMU-Teams',
      'Datenschutzkonformer KI-Einsatz im Alltag',
      'Digitalwerkzeuge verständlich erklärt',
      'Auf Ihrem Niveau, keine Vorkenntnisse nötig',
      'Bis zu 4 Personen pro Session',
    ],
    sections: [
      {
        h: 'KI ohne Berührungsängste',
        p: 'ChatGPT und andere KI-Tools erleichtern den Arbeitsalltag, wenn man weiss, wie man sie sinnvoll und sicher einsetzt. In unseren Workshops zeigen wir Ihnen genau das, Schritt für Schritt und ohne Vorkenntnisse.',
      },
      {
        h: 'Datenschutz ist kein Afterthought',
        p: 'Wir erklären, welche Daten Sie KI-Tools anvertrauen dürfen und welche nicht. Datenschutzkonforme Nutzung ist fester Bestandteil jedes Workshops, kein Anhang, den niemand liest.',
      },
      {
        h: 'Für jeden verständlich',
        p: 'Unsere Schulungen sind nicht für IT-Profis gemacht. Wir sprechen Klartext, setzen kein Vorwissen voraus und nehmen uns Zeit für Ihre Fragen. Bis zu 4 Personen pro Session, damit niemand zurückbleibt.',
      },
    ],
    metaTitle: 'KI- & IT-Schulungen für KMU | Swissly IT Ebikon',
    metaDescription:
      'Praxisnahe KI-Workshops & IT-Schulungen für KMU in der Zentralschweiz. Datenschutzkonform, verständlich, bis 4 Personen. Swissly IT Ebikon. Jetzt Termin anfragen.',
  },
];
