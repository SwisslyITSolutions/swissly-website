// Team members — single source of truth

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string; // path relative to /images/team/
}

export const team: TeamMember[] = [
  {
    name: 'Taha Afif',
    role: 'Web & Kundenkommunikation',
    bio: 'Taha ist Dipl. Wirtschaftsinformatiker HF und verantwortet bei Swissly Webentwicklung, Design und Erstgespräche. Nach einer Lehre als Montage-Elektriker EFZ wechselte er in die Softwareentwicklung und IT-Beratung. Seither erklärt er komplexe Technik so, dass sie verständlich wird. Sein Auge für Webdesign und UX ist sein grösster Trumpf.',
  },
  {
    name: 'Georg Ristic',
    role: 'Cybersecurity & Organisation',
    bio: 'Georg studiert Information & Cyber Security an der Hochschule Luzern und verantwortet bei Swissly Sicherheit, Verträge, Buchhaltung und Hosting-Verwaltung. Der Weg vom Milchtechnologen EFZ über die Berufsmatura bis zum Hauptfeldweibel brachte ihm eines: Adlerauge für Details und absolute Ruhe unter Druck. In der Freizeit findet man ihn auf dem Velo, der Skipiste oder, als ehemaliger Pfadileiter der Pfadi Luzern, draussen in der Natur.',
  },
];
