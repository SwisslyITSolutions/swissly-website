// Legal page data — single source of truth for Impressum, Datenschutz, AGB

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalPage {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export const impressumData: LegalPage = {
  title: 'Impressum',
  intro: 'Transparenz und Vertrauen sind die Basis unserer Arbeit.',
  sections: [
    {
      heading: 'Verantwortlich für den Inhalt',
      body: 'Swissly IT Solutions KLG\nGeorg Ristic & Taha Afif\nPilatusweg 23\n6030 Ebikon\nSchweiz',
    },
    {
      heading: 'Kontakt',
      body: 'E-Mail: info@swisslyit.ch\nWebsite: www.swisslyit.ch',
    },
    {
      heading: 'Rechtsform',
      body: 'Kollektivgesellschaft (KLG) nach Schweizer Recht',
    },
    {
      heading: 'Handelsregister',
      body: 'CHE-288.328.570',
    },
    {
      heading: 'Mehrwertsteuer',
      body: 'Aktuell nicht MWST-pflichtig',
    },
    {
      heading: 'Haftung für Inhalte',
      body: 'Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.',
    },
    {
      heading: 'Haftung für Links',
      body: 'Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    },
    {
      heading: 'Urheberrecht',
      body: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem Schweizer Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
    },
  ],
};

export const datenschutzData: LegalPage = {
  title: 'Datenschutzerklärung',
  intro: 'Transparenz und Sicherheit für Ihre Daten.',
  sections: [
    {
      heading: '1. Verantwortliche Stelle',
      body: 'Verantwortlich für die Datenbearbeitung auf dieser Website ist:\nSwissly IT Solutions KLG\nGeorg Ristic & Taha Afif\nPilatusweg 23, 6030 Ebikon\ninfo@swisslyit.ch',
    },
    {
      heading: '2. Erhebung und Bearbeitung personenbezogener Daten',
      body: 'Wir erheben personenbezogene Daten, wenn Sie uns freiwillig im Rahmen einer Kontaktaufnahme mitteilen. Wir verwenden Ihre Angaben ausschliesslich zur Beantwortung Ihrer Anfrage und zur Erbringung unserer Dienstleistungen.',
    },
    {
      heading: '3. Kontaktformular',
      body: 'Wenn Sie uns über das Kontaktformular kontaktieren, werden Ihre Angaben (Name, E-Mail, Nachricht) zur Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.',
    },
    {
      heading: '4. Google Analytics (GA4)',
      body: 'Diese Website nutzt Google Analytics 4 (GA4), einen Webanalysedienst der Google Ireland Limited (Muttergesellschaft: Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA), Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Wir haben die IP-Anonymisierung aktiviert. Für Übermittlungen in die USA stützen wir uns auf das EU-U.S. Data Privacy Framework (DPF) sowie ergänzend auf Standarddatenschutzklauseln (SCC) nach Art. 46 DSGVO. Google Ireland Limited ist unter dem EU-U.S. DPF zertifiziert. Sie können die Erfassung durch Google Analytics verhindern, indem Sie auf unseren Cookie-Banner klicken und Analytics ablehnen. Weitere Informationen: https://policies.google.com/privacy',
    },
    {
      heading: '5. Einwilligung und Cookie-Verwaltung',
      body: 'Ihre Cookie-Einwilligung wird im Browser-Speicher (localStorage) gespeichert und gilt ausschliesslich für das aktuelle Gerät und diesen Browser. Sie können Ihre Einwilligung jederzeit widerrufen: Klicken Sie dazu auf den Link «Cookie-Einstellungen» in der Fusszeile dieser Website. Der Cookie-Banner öffnet sich erneut und Sie können Ihre Wahl anpassen. Ohne Einwilligung wird kein Google Analytics geladen.',
    },
    {
      heading: '6. Cookies',
      body: 'Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Wir unterscheiden zwischen technisch notwendigen Cookies (für den Betrieb der Website erforderlich) und optionalen Analyse-Cookies (Google Analytics). Sie können der Nutzung von Analyse-Cookies über unseren Cookie-Banner widersprechen. Technisch notwendige Cookies können nicht deaktiviert werden.',
    },
    {
      heading: '7. Data Privacy Framework und Standarddatenschutzklauseln',
      body: 'Für die Übermittlung von Daten in die USA stützen wir uns auf das EU-U.S. Data Privacy Framework (DPF) sowie auf Standarddatenschutzklauseln (SCC) nach Art. 46 DSGVO als ergänzende Garantien. Google Ireland Limited (Muttergesellschaft Google LLC) ist unter dem EU-U.S. Data Privacy Framework zertifiziert. Dies stellt ein angemessenes Schutzniveau für die übermittelten Daten sicher.',
    },
    {
      heading: '8. Notion',
      body: 'Wir nutzen Notion (Notion Labs, Inc., 2300 Harrison St., San Francisco, CA 94110, USA) intern für die Organisation unserer Arbeitsprozesse und Kundenkommunikation. Personenbezogene Daten, die Sie uns übermitteln, können in Notion gespeichert werden. Die Datenübertragung in die USA erfolgt auf Grundlage des EU-U.S. Data Privacy Framework sowie Standarddatenschutzklauseln (SCC), unter denen Notion zertifiziert ist. Weitere Informationen: https://www.notion.so/privacy',
    },
    {
      heading: '9. OpenStreetMap',
      body: 'Wir binden Karten des Dienstes OpenStreetMap ein (Openstreetmap Foundation, St John\'s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, UK). Bei Nutzung von OpenStreetMap werden Daten an Server der OpenStreetMap Foundation übertragen. OpenStreetMap speichert für jeden Zugriff auf das Kartenmaterial Ihre IP-Adresse. Rechtsgrundlage ist unser berechtigtes Interesse an der Darstellung des Unternehmensstandortes (Art. 6 Abs. 1 lit. f DSGVO / Art. 31 DSG).',
    },
    {
      heading: '10. Hosting',
      body: 'Diese Website wird auf Servern in der Schweiz gehostet. Alle Daten, die Sie an uns übermitteln, verbleiben in der Schweiz. Unser Hosting-Anbieter verarbeitet Verbindungsdaten (IP-Adresse, Datum/Uhrzeit, abgerufene Seite) aus technischen Gründen und zur Sicherheit.',
    },
    {
      heading: '11. Ihre Rechte',
      body: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Ausserdem haben Sie das Recht auf Datenübertragbarkeit. Zur Geltendmachung Ihrer Rechte wenden Sie sich bitte an: info@swisslyit.ch',
    },
    {
      heading: '12. Beschwerderecht',
      body: 'Sie haben das Recht, sich bei der zuständigen Datenschutzbehörde zu beschweren. In der Schweiz ist dies der Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB), Feldeggweg 1, 3003 Bern.',
    },
    {
      heading: '13. Datensicherheit',
      body: 'Wir setzen technische und organisatorische Massnahmen ein, um Ihre Daten gegen Verlust, Missbrauch und unberechtigten Zugriff zu schützen. Unsere Website wird über eine verschlüsselte HTTPS-Verbindung übertragen.',
    },
    {
      heading: '14. Aktualität',
      body: 'Stand: 26. Juni 2026. Wir behalten uns vor, diese Datenschutzerklärung jederzeit zu aktualisieren.',
    },
  ],
};

export const agbData: LegalPage = {
  title: 'Allgemeine Geschäftsbedingungen',
  intro: 'Gültig für alle Leistungen der Swissly IT Solutions KLG.',
  sections: [
    {
      heading: '1. Geltungsbereich',
      body: 'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Leistungen, die die Swissly IT Solutions KLG (nachfolgend «Swissly») ihren Kundinnen und Kunden erbringt, soweit keine abweichenden schriftlichen Vereinbarungen getroffen wurden.',
    },
    {
      heading: '2. Vertragsabschluss',
      body: 'Angebote von Swissly sind freibleibend und unverbindlich. Ein Vertrag kommt erst durch die schriftliche Auftragsbestätigung von Swissly oder durch Beginn der Leistungserbringung zustande. Änderungen und Ergänzungen bedürfen der Schriftform.',
    },
    {
      heading: '3. Leistungen und Preise',
      body: 'Der Leistungsumfang ergibt sich aus dem jeweiligen Angebot oder der Auftragsbestätigung. Alle Preise verstehen sich in Schweizer Franken (CHF) und sind, sofern nichts anderes vereinbart, exklusive allfälliger Mehrwertsteuer. Swissly behält sich vor, Preise bei wesentlicher Änderung der Grundlagen mit einer Frist von 30 Tagen anzupassen.',
    },
    {
      heading: '4. Zahlungsbedingungen',
      body: 'Rechnungen sind innerhalb von 30 Tagen nach Rechnungsdatum netto ohne Abzug zu bezahlen. Bei Zahlungsverzug ist Swissly berechtigt, Verzugszinsen von 5 % pro Jahr zu verrechnen und ausstehende Leistungen zu sistieren.',
    },
    {
      heading: '5. Mitwirkungspflichten der Kundschaft',
      body: 'Die Kundschaft stellt Swissly alle für die Leistungserbringung notwendigen Informationen, Zugangsdaten und Materialien rechtzeitig und vollständig zur Verfügung. Verzögerungen durch fehlende Mitwirkung gehen nicht zu Lasten von Swissly.',
    },
    {
      heading: '6. Kündigung',
      body: 'Laufende Verträge (Care-Pläne) können jederzeit mit einer Frist von 30 Tagen auf Ende der Rechnungsperiode gekündigt werden. Die Kündigung bedarf der Schriftform (E-Mail genügt). Ein Recht auf ausserordentliche Kündigung aus wichtigem Grund bleibt vorbehalten.',
    },
    {
      heading: '7. Gerichtsstand und anwendbares Recht',
      body: 'Diese AGB und alle daraus resultierenden Rechtsbeziehungen unterliegen ausschliesslich dem Schweizer Recht. Gerichtsstand für sämtliche Streitigkeiten ist Luzern, Schweiz, soweit gesetzlich zulässig.',
    },
  ],
};
