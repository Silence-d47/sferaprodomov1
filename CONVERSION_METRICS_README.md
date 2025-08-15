# Konverzní Metriky Systém

## Popis
Kompletní systém pro sledování konverzí z formulářů s metrikami, thank you stránkami a admin dashboardem.

## Funkce

### 1. **Sledování konverzí**
- Automatické zachytávání dat z formulářů
- UTM parametrů (utm_source, utm_medium, utm_campaign)
- Referrer informace
- User agent data
- Timestamp a geografické údaje

### 2. **Thank You stránka**
- Profesionální potvrzení odeslání
- Detaily o konverzi
- Call-to-action tlačítka
- Možnost zobrazení metrik

### 3. **Admin Dashboard**
- Přehled klíčových metrik
- Filtrování podle období
- Export dat
- Detailní tabulky konverzí

## Komponenty

### 1. useConversionMetrics Hook
```tsx
const { 
  saveConversion, 
  getMetrics, 
  getLastConversion 
} = useConversionMetrics()
```

**Funkce:**
- `saveConversion(data)` - uloží konverzi s metrikami
- `getMetrics()` - vrátí agregované metriky
- `getLastConversion()` - vrátí poslední konverzi

### 2. ThankYouPage
```tsx
<ThankYouPage 
  conversionData={conversionData}
  onClose={handleClose}
/>
```

**Vlastnosti:**
- Zobrazuje detaily konverze
- Call-to-action tlačítka
- Možnost zobrazení metrik
- Profesionální design

### 3. ConversionDashboard
```tsx
<ConversionDashboard />
```

**Vlastnosti:**
- Klíčové metriky (KPI)
- Filtrování podle období
- Export dat
- Detailní tabulky

## Implementace

### 1. Základní použití v formuláři
```tsx
import { useConversionMetrics } from "@/hooks/use-conversion-metrics"

export function MyForm() {
  const { saveConversion } = useConversionMetrics()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      zipCode: formData.get("zipCode"),
      source: "my-form"
    }

    // Uložení konverze
    const success = saveConversion(data)
    
    if (success) {
      // Zobrazení thank you stránky
      setShowThankYou(true)
    }
  }
}
```

### 2. Zobrazení Thank You stránky
```tsx
import { ThankYouPage } from "@/components/ui/thank-you-page"

export function MyComponent() {
  const [showThankYou, setShowThankYou] = useState(false)
  const [conversionData, setConversionData] = useState(null)

  if (showThankYou) {
    return (
      <ThankYouPage 
        conversionData={conversionData}
        onClose={() => setShowThankYou(false)}
      />
    )
  }
}
```

### 3. Admin Dashboard
```tsx
import { ConversionDashboard } from "@/components/ui/conversion-dashboard"

export function AdminPage() {
  return (
    <div className="container mx-auto p-6">
      <ConversionDashboard />
    </div>
  )
}
```

## Sledované metriky

### 1. **Základní metriky**
- Celkový počet konverzí
- Konverze podle zdroje
- Konverze podle data
- Konverzní poměr

### 2. **Detailní data**
- Jméno, email, telefon, PSČ
- Zdroj formuláře
- Čas odeslání
- UTM parametry
- Referrer
- User agent

### 3. **Analytické údaje**
- Filtrování podle období (7d, 30d, 90d, all)
- Agregace podle zdroje
- Trendy v čase
- Export dat

## Analytics integrace

### 1. **Google Analytics 4**
```javascript
gtag('event', 'form_submit', {
  event_category: 'engagement',
  event_label: 'welcome-popup',
  value: 1,
  custom_parameters: {
    form_name: 'welcome-popup',
    user_location: '12345'
  }
})
```

### 2. **Facebook Pixel**
```javascript
fbq('track', 'Lead', {
  content_name: 'welcome-popup',
  content_category: 'welcome-popup',
  value: 1,
  currency: 'CZK'
})
```

### 3. **Google Tag Manager**
```javascript
dataLayer.push({
  event: 'form_submit',
  form_name: 'welcome-popup',
  form_source: 'welcome-popup',
  user_location: '12345',
  timestamp: '2024-01-01T12:00:00Z'
})
```

## Uložiště dat

### 1. **LocalStorage**
- Klíč: `sfera-conversions`
- Formát: JSON array
- Trvalé uložení

### 2. **SessionStorage**
- Klíč: `sfera-last-conversion`
- Poslední konverze v session
- Automatické mazání

### 3. **Export**
- Formát: JSON
- Název: `sfera-conversions-{period}-{date}.json`
- Možnost filtrování podle období

## Customizace

### 1. **Změna zdrojů**
```tsx
// V hooks/use-conversion-metrics.ts
const getSourceLabel = (source: string) => {
  const labels: Record<string, string> = {
    'welcome-popup': 'Uvítací popup',
    'contact-form': 'Kontaktní formulář',
    'my-custom-form': 'Můj formulář'
  }
  return labels[source] || source
}
```

### 2. **Přidání nových metrik**
```tsx
// V hooks/use-conversion-metrics.ts
const getMetrics = (): ConversionMetrics => {
  // ... existující kód ...
  
  return {
    // ... existující metriky ...
    newMetric: calculateNewMetric(data),
    customCalculation: performCustomCalculation(data)
  }
}
```

### 3. **Vlastní analytics**
```tsx
// V hooks/use-conversion-metrics.ts
const trackAnalytics = (data: ConversionData) => {
  // ... existující kód ...
  
  // Vlastní tracking
  if (typeof window !== 'undefined' && window.customTracker) {
    window.customTracker.track('conversion', data)
  }
}
```

## Testování

### 1. **Simulace konverze**
```javascript
// V konzoli prohlížeče
window.welcomePopup.showImmediately()
```

### 2. **Zobrazení metrik**
```javascript
// V konzoli prohlížeče
const { getMetrics } = useConversionMetrics()
console.log(getMetrics())
```

### 3. **Reset dat**
```javascript
// V konzoli prohlížeče
localStorage.removeItem('sfera-conversions')
sessionStorage.removeItem('sfera-last-conversion')
```

## Produkční nasazení

### 1. **API endpoint**
- Nahraďte localStorage API voláním
- Implementujte autentizaci pro admin dashboard
- Přidejte rate limiting

### 2. **Databáze**
- Uložte data do databáze
- Implementujte zálohování
- Přidejte indexy pro rychlé dotazy

### 3. **Bezpečnost**
- Validace vstupních dat
- Sanitizace výstupních dat
- HTTPS pro všechna API volání

## Problémy a řešení

### 1. **Metriky se nezobrazují**
- Zkontrolujte localStorage
- Ověřte, zda se volá `saveConversion`
- Zkontrolujte konzoli pro chyby

### 2. **Thank you stránka se nezobrazuje**
- Ověřte `conversionData`
- Zkontrolujte `showThankYou` stav
- Zkontrolujte, zda se renderuje komponenta

### 3. **Dashboard nefunguje**
- Ověřte, zda máte přístup k localStorage
- Zkontrolujte, zda se načítají data
- Ověřte, zda funguje `getMetrics()`

## Budoucí vylepšení

### 1. **Real-time aktualizace**
- WebSocket připojení
- Push notifikace
- Live dashboard

### 2. **Pokročilé analýzy**
- A/B testování
- Funnel analýza
- Prediktivní modely

### 3. **Integrace s CRM**
- Automatické vytvoření leadů
- Synchronizace s externími systémy
- Workflow automatizace
