// Our 4-step working process — single source of truth

export interface ProcessStep {
  index: number;
  title: string;
  text: string;
}

export const process: ProcessStep[] = [
  {
    index: 1,
    title: 'Erstgespräch',
    text: '30 Minuten, kostenlos und unverbindlich. Wir hören zu und zeigen Ihnen, was möglich ist. Ohne Verkaufsdruck.',
  },
  {
    index: 2,
    title: 'Konzept & Angebot',
    text: 'Sie erhalten ein klares Konzept und ein transparentes Festpreis-Angebot. Keine versteckten Kosten, keine Überraschungen.',
  },
  {
    index: 3,
    title: 'Umsetzung',
    text: 'Wir bauen Ihr Projekt auf einer Staging-Umgebung auf. Sie sehen jeden Schritt und geben erst frei, wenn Sie zu 100 % begeistert sind.',
  },
  {
    index: 4,
    title: 'Launch & Betreuung',
    text: 'Go-Live auf einem Schweizer Server. Danach laufende Betreuung via Care-Plan, damit Ihre Website langfristig gut läuft.',
  },
];
