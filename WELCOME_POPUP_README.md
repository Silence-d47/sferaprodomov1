# Welcome Popup Systém

## Popis
Konverzní popup systém, který se zobrazí 5 sekund po načtení stránky. Po zavření se zobrazí plovoucí tlačítko pro znovuotevření.

## Funkce
- **Automatické zobrazení**: Popup se zobrazí po 5 sekundách
- **Lokální úložiště**: Popup se nezobrazuje opakovaně v rámci session
- **Plovoucí tlačítko**: Po zavření se zobrazí v pravém dolním rohu
- **Responzivní design**: Optimalizováno pro všechny zařízení
- **Animace**: Plynulé přechody a hover efekty

## Komponenty

### 1. WelcomePopup
Hlavní popup s formulářem pro konzultaci.

**Vlastnosti:**
- Formulář s 4 poli (jméno, email, telefon, PSČ)
- Validace formuláře
- Toast notifikace po odeslání
- Animované zobrazení/skrytí

### 2. FloatingConsultationButton
Plovoucí tlačítko pro znovuotevření popupu.

**Vlastnosti:**
- Umístění: pravý dolní roh
- Hover tooltip
- Pulzující animace
- Gradient design

### 3. useWelcomePopup Hook
Hook pro správu stavu popupu.

**Funkce:**
- `openPopup()` - otevře popup
- `closePopup()` - zavře popup
- `resetPopup()` - resetuje stav
- `showPopupImmediately()` - okamžité zobrazení

## Použití

### Základní implementace
```tsx
// V layout.tsx
import { WelcomePopupProvider } from "@/components/welcome-popup-provider"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WelcomePopupProvider>
          {children}
        </WelcomePopupProvider>
      </body>
    </html>
  )
}
```

### Testování (Development)
V development módu jsou funkce dostupné v konzoli:

```javascript
// Otevřít popup
window.welcomePopup.open()

// Zavřít popup
window.welcomePopup.close()

// Resetovat stav
window.welcomePopup.reset()

// Okamžité zobrazení
window.welcomePopup.showImmediately()
```

## Konverzní optimalizace

### 1. Timing
- Popup se zobrazí po 5 sekundách (dostatečný čas na prozkoumání stránky)
- Není agresivní, nechává uživatele v klidu

### 2. Design
- Přátelský vzhled s emoji
- Barevné sekce pro lepší čitelnost
- Ikonky v input polích
- Gradient tlačítka

### 3. Obsah
- Jasná hodnotová propice (bezplatná konzultace)
- Důvěryhodnost (lokální firma)
- Konkrétní benefity
- Minimální formulář (4 pole)

### 4. UX
- Snadné zavření (X tlačítko)
- Plovoucí tlačítko pro návrat
- Toast notifikace po odeslání
- Loading stavy

## Customizace

### Změna času zobrazení
```tsx
// V hooks/use-welcome-popup.ts
const timer = setTimeout(() => {
  setIsPopupOpen(true)
  // Změňte 5000 na požadovaný čas v ms
}, 5000)
```

### Změna umístění plovoucího tlačítka
```tsx
// V components/ui/floating-consultation-button.tsx
<div className="fixed bottom-6 right-6 z-40">
  {/* Změňte bottom-6 right-6 na požadované umístění */}
</div>
```

### Změna barev
```tsx
// V components/ui/welcome-popup.tsx
className="bg-gradient-to-r from-green-50 to-emerald-50"
// Změňte barvy podle vašeho designu
```

## Technické detaily

### Session Storage
- Klíč: `"welcome-popup-shown"`
- Hodnota: `"true"`
- Automaticky se maže při zavření prohlížeče

### Z-index
- Popup: `z-50`
- Plovoucí tlačítko: `z-40`

### Responzivita
- Popup: `max-w-2xl` s `mx-4`
- Formulář: `grid-cols-1 sm:grid-cols-2`

## Problémy a řešení

### Popup se nezobrazuje
1. Zkontrolujte, zda je `WelcomePopupProvider` v layout.tsx
2. Zkontrolujte konzoli pro chyby
3. Resetujte session storage: `window.welcomePopup.reset()`

### Formulář se neodesílá
1. Zkontrolujte, zda jsou všechna pole vyplněna
2. Zkontrolujte konzoli pro chyby
3. Ověřte, zda funguje toast systém

### Animace nefungují
1. Zkontrolujte, zda máte Tailwind CSS
2. Zkontrolujte, zda máte `tailwindcss-animate` plugin
3. Ověřte, zda jsou CSS třídy správně načteny
