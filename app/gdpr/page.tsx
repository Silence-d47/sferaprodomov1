export default function GDPRPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h1>Ochrana osobních údajů (GDPR)</h1>

            <h2>1. Základní informace</h2>
            <p>
              Společnost SFERA s.r.o. se sídlem Praha, IČO: 12345678 (dále jen "správce") zpracovává osobní údaje v
              souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se
              zpracováním osobních údajů a o volném pohybu těchto údajů (GDPR).
            </p>

            <h2>2. Jaké osobní údaje zpracováváme</h2>
            <ul>
              <li>Identifikační údaje (jméno, příjmení)</li>
              <li>Kontaktní údaje (email, telefon, adresa)</li>
              <li>Údaje o komunikaci s námi</li>
              <li>Technické údaje (IP adresa, cookies)</li>
            </ul>

            <h2>3. Účel zpracování</h2>
            <p>Osobní údaje zpracováváme za účelem:</p>
            <ul>
              <li>Poskytování našich služeb</li>
              <li>Komunikace s klienty</li>
              <li>Plnění právních povinností</li>
              <li>Marketingové aktivity (se souhlasem)</li>
            </ul>

            <h2>4. Doba zpracování</h2>
            <p>
              Osobní údaje zpracováváme po dobu nezbytnou k naplnění účelu zpracování, nejdéle však po dobu stanovenou
              právními předpisy.
            </p>

            <h2>5. Vaše práva</h2>
            <p>Máte právo:</p>
            <ul>
              <li>Na přístup k osobním údajům</li>
              <li>Na opravu nepřesných údajů</li>
              <li>Na výmaz údajů</li>
              <li>Na omezení zpracování</li>
              <li>Na přenositelnost údajů</li>
              <li>Vznést námitku proti zpracování</li>
              <li>Podat stížnost u dozorového úřadu</li>
            </ul>

            <h2>6. Kontakt</h2>
            <p>
              Pro uplatnění svých práv nebo dotazy ohledně zpracování osobních údajů nás kontaktujte na emailu:
              gdpr@klima-sfera.cz nebo na adrese našeho sídla: Nákladní 471/32, 746 01 Opava.
            </p>

            <p>
              <em>Tato zásada byla naposledy aktualizována: 1. ledna 2025</em>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
