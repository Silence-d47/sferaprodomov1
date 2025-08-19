export default function CookiesPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h1>Používání souborů cookies</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
              <p className="text-blue-800 m-0">
                <strong>Důležité:</strong> Tato stránka vysvětluje, jak naše webové stránky používají soubory cookies a jak můžete spravovat svá nastavení.
              </p>
            </div>

            <h2>Co jsou cookies?</h2>
            <p>
              Cookies (česky "koláčky") jsou malé textové soubory, které se ukládají do vašeho zařízení při návštěvě našich webových stránek. 
              Tyto soubory obsahují informace o vaší návštěvě a pomáhají nám zlepšovat funkčnost a uživatelský zážitek z našich stránek.
            </p>

            <h2>Jak cookies fungují?</h2>
            <p>
              Při návštěvě našich stránek se cookies automaticky stáhnou do vašeho prohlížeče. Při každé další návštěvě se tyto informace 
              odesílají zpět na naše servery, což nám umožňuje rozpoznat vaše zařízení a přizpůsobit obsah vašim potřebám.
            </p>

            <h2>Typy cookies, které používáme</h2>
            
            <div className="grid gap-6 mt-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-3">🍪 Nezbytné cookies</h3>
                <p className="text-gray-700 mb-3">
                  Tyto cookies jsou nutné pro základní funkčnost webových stránek a nelze je vypnout.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Umožňují přihlášení do zabezpečených částí stránek</li>
                  <li>• Zajišťují správné načítání stránek</li>
                  <li>• Umožňují základní navigaci</li>
                  <li>• Zapamatovávají si vaše cookie preference</li>
                </ul>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Vždy aktivní
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">📊 Analytické cookies</h3>
                <p className="text-gray-700 mb-3">
                  Pomáhají nám pochopit, jak návštěvníci používají naše stránky, abychom je mohli neustále vylepšovat.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Počítají návštěvníky a návštěvy</li>
                  <li>• Sledují, které stránky jsou nejpopulárnější</li>
                  <li>• Měří dobu strávenou na stránkách</li>
                  <li>• Identifikují chyby a problémy</li>
                </ul>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    S vaším souhlasem
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-700 mb-3">🎯 Marketingové cookies</h3>
                <p className="text-gray-700 mb-3">
                  Používáme je k zobrazování relevantních reklam a obsahu podle vašich zájmů.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sledují vaše preference a zájmy</li>
                  <li>• Zobrazují personalizované reklamy</li>
                  <li>• Měří efektivnost reklamních kampaní</li>
                  <li>• Umožňují sdílení obsahu na sociálních sítích</li>
                </ul>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    S vaším souhlasem
                  </span>
                </div>
              </div>
            </div>

            <h2>Jak spravovat cookies</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Možnosti správy cookies</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">1. Cookie lišta</h4>
                  <p className="text-sm text-gray-700">
                    Při první návštěvě se zobrazí lišta s možností vyjádřit souhlas s používáním cookies. 
                    Můžete povolit všechny cookies nebo pouze nezbytné.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">2. Nastavení prohlížeče</h4>
                  <p className="text-sm text-gray-700">
                    Většina prohlížečů umožňuje spravovat cookies v nastavení. Můžete cookies mazat, 
                    blokovat nebo nastavit upozornění před jejich uložením.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">3. Změna preferencí</h4>
                  <p className="text-sm text-gray-700">
                    Svůj souhlas s cookies můžete kdykoliv změnit kliknutím na odkaz v patičce stránky 
                    nebo nás kontaktovat.
                  </p>
                </div>
              </div>
            </div>

            <h2>Návody pro jednotlivé prohlížeče</h2>
            
            <div className="grid gap-4 mt-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🌐 Google Chrome</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Nastavení → Pokročilé → Soukromí a zabezpečení → Nastavení obsahu → Cookies
                </p>
                <a 
                  href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=cs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Oficiální návod →
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🦊 Mozilla Firefox</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Nastavení → Soukromí a zabezpečení → Cookies a data webových stránek
                </p>
                <a 
                  href="https://support.mozilla.org/cs/kb/povoleni-zakazani-cookies" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Oficiální návod →
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🍎 Safari</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Předvolby → Soukromí → Cookies a data webových stránek
                </p>
                <a 
                  href="https://support.apple.com/cs-cz/guide/safari/sfri11471/mac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Oficiální návod →
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🔵 Microsoft Edge</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Nastavení → Cookies a oprávnění webových stránek → Cookies a data uložená webovými stránkami
                </p>
                <a 
                  href="https://docs.microsoft.com/cs-cz/sccm/compliance/deploy-use/browser-profiles" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Oficiální návod →
                </a>
              </div>
            </div>

            <h2>Důležité informace</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <ul className="text-yellow-800 space-y-2 m-0">
                <li>• <strong>Cookies neobsahují osobní údaje</strong> - neukládají jména, adresy ani jiné osobní informace</li>
                <li>• <strong>Nejsou škodlivé</strong> - cookies nemohou poškodit vaše zařízení ani spustit viry</li>
                <li>• <strong>Můžete je kdykoliv smazat</strong> - cookies lze snadno odstranit z nastavení prohlížeče</li>
                <li>• <strong>Zlepšují uživatelský zážitek</strong> - díky nim se stránky načítají rychleji a fungují lépe</li>
              </ul>
            </div>

            <h2>Kontakt</h2>
            <p>
              Máte-li jakékoliv otázky ohledně používání cookies na našich webových stránkách, 
              neváhejte nás kontaktovat:
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">📧 E-mail</h4>
                  <a href="mailto:info@klima-sfera.cz" className="text-blue-600 hover:text-blue-800">
                    info@klima-sfera.cz
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">📞 Telefon</h4>
                  <a href="tel:+420735014112" className="text-blue-600 hover:text-blue-800">
                    +420 735 014 112
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                <strong>Poslední aktualizace:</strong> 1. ledna 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
