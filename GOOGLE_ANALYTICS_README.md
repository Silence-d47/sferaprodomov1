# Google Analytics Setup - SFERA PRO DOMOV

## 📊 Přehled implementace

Google Analytics 4 (GA4) byl implementován na všech stránkách webu s ID **G-1SM70L44DP**.

## 🚀 Implementované soubory

### 1. **Hlavní komponenta**
- `components/ui/google-analytics.tsx` - React komponenta pro GA4

### 2. **Layout soubory**
- `app/layout.tsx` - Hlavní layout (všechny stránky)
- `app/studio/layout.tsx` - Sanity Studio layout

### 3. **Statické soubory**
- `public/thankyou.html` - Děkuji stránka
- `public/robots.txt` - SEO optimalizace
- `public/sitemap.xml` - Mapa stránek

### 4. **Konfigurace**
- `next.config.ts` - Next.js optimalizace
- `vercel.json` - Vercel deployment
- `types/gtag.d.ts` - TypeScript deklarace

## 🔧 Jak to funguje

### **Google Analytics komponenta**
```tsx
<GoogleAnalytics />
```

- Načte GA4 skript asynchronně
- Inicializuje `dataLayer` a `gtag` funkci
- Konfiguruje tracking s ID `G-1SM70L44DP`

### **Automatické tracking**
- **Page views** - automaticky na všech stránkách
- **Form submissions** - přes `use-conversion-metrics.ts`
- **Button clicks** - přes existující analytics hooks

## 📱 Kde je implementováno

### ✅ **Hlavní web**
- Všechny stránky (`/`, `/klimatizace`, `/tepelna-cerpadla`, atd.)
- Blog a reference
- Kontaktní formuláře

### ✅ **Sanity Studio**
- CMS pro správce obsahu
- Tracking admin aktivit

### ✅ **Statické stránky**
- `thankyou.html` - po odeslání formuláře
- `robots.txt` - pro SEO crawlers
- `sitemap.xml` - pro Google indexování

## 🎯 Tracking událostí

### **Automatické události**
- `page_view` - každá návštěva stránky
- `form_submit` - odeslání formulářů
- `button_click` - kliknutí na CTA tlačítka

### **Vlastní události**
```tsx
// Příklad tracking události
gtag('event', 'form_submit', {
  form_name: 'contact_form',
  page_location: window.location.href
});
```

## 🔍 Ověření implementace

### **1. Google Analytics Real-Time**
- Otevřete [GA4 Real-Time](https://analytics.google.com/)
- Navštivte web
- Měli byste vidět aktivitu v real-time

### **2. Developer Tools**
- Otevřete DevTools (F12)
- V Console zadejte: `gtag('event', 'test')`
- Měli byste vidět volání do Google Analytics

### **3. Network tab**
- V DevTools → Network
- Filtrujte podle "google"
- Měli byste vidět volání na `googletagmanager.com`

## 🚨 Troubleshooting

### **Problém: GA4 se nenačítá**
- Zkontrolujte, že ID `G-1SM70L44DP` je správné
- Ověřte, že `GoogleAnalytics` komponenta je v layoutu
- Zkontrolujte console pro chyby

### **Problém: Události se neodesílají**
- Ověřte, že `gtag` funkce existuje: `typeof window.gtag`
- Zkontrolujte `dataLayer` v console
- Ověřte, že formuláře volají tracking funkce

### **Problém: Duplicitní tracking**
- Zkontrolujte, že `GoogleAnalytics` není importován vícekrát
- Ověřte, že není v `_document.tsx` ani `_app.tsx`

## 📈 Další kroky

### **1. Enhanced E-commerce**
```tsx
gtag('event', 'purchase', {
  transaction_id: 'T_12345',
  value: 99.99,
  currency: 'CZK'
});
```

### **2. User Properties**
```tsx
gtag('config', 'G-1SM70L44DP', {
  custom_map: {
    'custom_parameter_1': 'user_property_1'
  }
});
```

### **3. Conversion Tracking**
- Nastavte conversion goals v GA4
- Propojte s Google Ads
- Nastavte remarketing audiences

## 🔗 Užitečné odkazy

- [Google Analytics 4](https://analytics.google.com/)
- [GA4 Events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js Analytics](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Vercel Analytics](https://vercel.com/docs/analytics)

---

**Poznámka:** Všechny změny jsou automaticky nasazeny na všech stránkách webu. Pro testování použijte development server (`npm run dev`).
