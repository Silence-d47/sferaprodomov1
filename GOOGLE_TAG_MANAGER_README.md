# Google Tag Manager (GTM) Implementation

## 📱 Přehled

Google Tag Manager byl implementován pro pokročilé sledování a správu tagů na webu SFERA PRO DOMOV.

## 🔧 Implementované soubory

### 1. **Google Tag Manager Component**
- **Soubor**: `components/ui/google-tag-manager.tsx`
- **Funkce**: Hlavní komponenta pro GTM tracking
- **Strategie**: `afterInteractive` pro optimalizaci načítání

### 2. **Hlavní Layout**
- **Soubor**: `app/layout.tsx`
- **Funkce**: GTM načítán na všech stránkách

### 3. **Sanity Studio Layout**
- **Soubor**: `app/studio/layout.tsx`
- **Funkce**: GTM načítán i v CMS

### 4. **Statická Thank You Stránka**
- **Soubor**: `public/thankyou.html`
- **Funkce**: GTM přímo v HTML

### 5. **TypeScript Deklarace**
- **Soubor**: `types/gtm.d.ts`
- **Funkce**: Typové definice pro `dataLayer` a `gtm`

### 6. **Environment Variables**
- **Soubor**: `env.example`
- **Funkce**: Template pro GTM ID

## 🎯 Konfigurace

### **Google Tag Manager ID**
```
GTM-NH4PBTSJ
```

### **Environment Variable**
```bash
NEXT_PUBLIC_GTM_ID=GTM-NH4PBTSJ
```

## 🚀 Jak to funguje

### **1. GTM Script (Head)**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NH4PBTSJ');</script>
<!-- End Google Tag Manager -->
```

### **2. GTM Noscript (Body)**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NH4PBTSJ"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### **3. DataLayer**
```typescript
window.dataLayer = window.dataLayer || [];
```

## 📊 Sledované události

### **Automaticky sledované:**
- ✅ **GTM Start** - inicializace GTM
- ✅ **PageView** - každé načtení stránky
- ✅ **Všechny stránky** - hlavní web i Sanity Studio

### **Možné rozšíření přes GTM:**
- 🔄 **Lead** - odeslání formulářů
- 🔄 **Purchase** - dokončení objednávek
- 🔄 **Contact** - kontaktní akce
- 🔄 **Custom Events** - vlastní události

## 🛠️ Rozšíření funkcionality

### **Přidání vlastních událostí:**
```typescript
// Sledování odeslání formuláře
window.dataLayer.push({
  event: 'form_submit',
  form_name: 'Kontaktní formulář',
  form_source: 'Hlavní stránka'
});

// Sledování kliknutí na tlačítko
window.dataLayer.push({
  event: 'button_click',
  button_name: 'Nezávazná poptávka',
  button_location: 'Hero sekce'
});
```

### **Sledování konverzí:**
```typescript
// V contact-form komponentě
const handleSubmit = async (data: FormData) => {
  // ... odeslání formuláře
  
  // GTM tracking
  window.dataLayer.push({
    event: 'lead_generated',
    lead_type: 'Kontaktní formulář',
    lead_value: 1,
    lead_currency: 'CZK'
  });
};
```

## 🔍 Ověření funkčnosti

### **1. Google Tag Manager Preview**
- Přihlaste se do [Google Tag Manager](https://tagmanager.google.com/)
- Zkontrolujte, zda se tagy načítají

### **2. DataLayer Console**
- Otevřete Developer Tools
- Zkontrolujte `window.dataLayer` v console

### **3. GTM Debug Mode**
- Přidejte `?gtm_debug=x` na konec URL
- Zobrazí se debug panel

## 📱 Responsivní design

- ✅ **Desktop** - plná funkcionalita
- ✅ **Tablet** - plná funkcionalita  
- ✅ **Mobile** - plná funkcionalita
- ✅ **Noscript** - fallback iframe

## 🔒 Soukromí a GDPR

### **Cookie Consent**
- GTM respektuje cookie consent
- Načítá se až po souhlasu uživatele

### **Data Processing**
- Data jsou odesílána podle GTM konfigurace
- Respektuje nastavení privacy a consent

## 🚨 Troubleshooting

### **GTM se nenačítá:**
1. Zkontrolujte GTM ID
2. Ověřte environment variables
3. Zkontrolujte console pro chyby

### **Události se neodesílají:**
1. Ověřte, zda je GTM inicializován
2. Zkontrolujte dataLayer
3. Ověřte GTM konfiguraci

### **TypeScript chyby:**
1. Restartujte TypeScript server
2. Zkontrolujte `types/gtm.d.ts`
3. Ověřte `next-env.d.ts` reference

## 📚 Užitečné odkazy

- [Google Tag Manager Documentation](https://developers.google.com/tag-manager)
- [GTM Community](https://support.google.com/tagmanager/)
- [Data Layer Guide](https://developers.google.com/tag-manager/devguide#datalayer)
- [GTM Events](https://developers.google.com/tag-manager/devguide#events)

## ✨ Shrnutí

Google Tag Manager je plně implementován a funkční na:
- ✅ Hlavním webu
- ✅ Sanity Studio
- ✅ Statických stránkách
- ✅ Všechny zařízení
- ✅ GDPR compliant

GTM umožňuje pokročilé sledování a správu tagů přes webové rozhraní bez nutnosti úprav kódu! 🎯
