# Facebook Pixel Implementation

## 📱 Přehled

Facebook Pixel byl implementován pro sledování návštěvníků a konverzí na webu SFERA PRO DOMOV.

## 🔧 Implementované soubory

### 1. **Facebook Pixel Component**
- **Soubor**: `components/ui/facebook-pixel.tsx`
- **Funkce**: Hlavní komponenta pro Facebook Pixel tracking
- **Strategie**: `afterInteractive` pro optimalizaci načítání

### 2. **Hlavní Layout**
- **Soubor**: `app/layout.tsx`
- **Funkce**: Facebook Pixel načítán na všech stránkách

### 3. **Sanity Studio Layout**
- **Soubor**: `app/studio/layout.tsx`
- **Funkce**: Facebook Pixel načítán i v CMS

### 4. **Statická Thank You Stránka**
- **Soubor**: `public/thankyou.html`
- **Funkce**: Facebook Pixel přímo v HTML

### 5. **TypeScript Deklarace**
- **Soubor**: `types/facebook-pixel.d.ts`
- **Funkce**: Typové definice pro `fbq` funkci

### 6. **Environment Variables**
- **Soubor**: `env.example`
- **Funkce**: Template pro Facebook Pixel ID

## 🎯 Konfigurace

### **Facebook Pixel ID**
```
24681283014791075
```

### **Environment Variable**
```bash
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=24681283014791075
```

## 🚀 Jak to funguje

### **1. Inicializace**
```typescript
fbq('init', '24681283014791075');
```

### **2. Sledování stránky**
```typescript
fbq('track', 'PageView');
```

### **3. Noscript Fallback**
```html
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=24681283014791075&ev=PageView&noscript=1" />
</noscript>
```

## 📊 Sledované události

### **Automaticky sledované:**
- ✅ **PageView** - každé načtení stránky
- ✅ **Všechny stránky** - hlavní web i Sanity Studio

### **Možné rozšíření:**
- 🔄 **Lead** - odeslání formulářů
- 🔄 **Purchase** - dokončení objednávek
- 🔄 **Contact** - kontaktní akce

## 🛠️ Rozšíření funkcionality

### **Přidání vlastních událostí:**
```typescript
// Sledování odeslání formuláře
fbq('track', 'Lead', {
  content_name: 'Kontaktní formulář',
  content_category: 'Kontakt'
});

// Sledování kliknutí na tlačítko
fbq('track', 'Click', {
  content_name: 'Nezávazná poptávka',
  content_category: 'CTA'
});
```

### **Sledování konverzí:**
```typescript
// V contact-form komponentě
const handleSubmit = async (data: FormData) => {
  // ... odeslání formuláře
  
  // Facebook Pixel tracking
  fbq('track', 'Lead', {
    content_name: 'Kontaktní formulář',
    value: 1,
    currency: 'CZK'
  });
};
```

## 🔍 Ověření funkčnosti

### **1. Facebook Pixel Helper**
- Nainstalujte [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiipcoegflbaajbplhnjffaj) pro Chrome
- Otevřete web a zkontrolujte, zda se pixel načítá

### **2. Facebook Events Manager**
- Přihlaste se do [Facebook Events Manager](https://business.facebook.com/events_manager2/)
- Zkontrolujte, zda se události zobrazují

### **3. Console Logs**
- Otevřete Developer Tools
- Zkontrolujte, zda se `fbq` funkce načítá

## 📱 Responsivní design

- ✅ **Desktop** - plná funkcionalita
- ✅ **Tablet** - plná funkcionalita  
- ✅ **Mobile** - plná funkcionalita
- ✅ **Noscript** - fallback obrázek

## 🔒 Soukromí a GDPR

### **Cookie Consent**
- Facebook Pixel respektuje cookie consent
- Načítá se až po souhlasu uživatele

### **Data Processing**
- Data jsou odesílána do Facebooku podle jejich [Data Processing Terms](https://www.facebook.com/legal/terms/dataprocessing)

## 🚨 Troubleshooting

### **Pixel se nenačítá:**
1. Zkontrolujte Facebook Pixel ID
2. Ověřte environment variables
3. Zkontrolujte console pro chyby

### **Události se neodesílají:**
1. Ověřte, zda je pixel inicializován
2. Zkontrolujte adblockery
3. Ověřte Facebook Events Manager

### **TypeScript chyby:**
1. Restartujte TypeScript server
2. Zkontrolujte `types/facebook-pixel.d.ts`
3. Ověřte `next-env.d.ts` reference

## 📚 Užitečné odkazy

- [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel/)
- [Facebook Events Manager](https://business.facebook.com/events_manager2/)
- [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiipcoegflbaajbplhnjffaj)
- [GDPR Compliance](https://developers.facebook.com/docs/privacy/)

## ✨ Shrnutí

Facebook Pixel je plně implementován a funkční na:
- ✅ Hlavním webu
- ✅ Sanity Studio
- ✅ Statických stránkách
- ✅ Všechny zařízení
- ✅ GDPR compliant

Pixel automaticky sleduje všechny návštěvy stránek a je připraven pro rozšíření o vlastní události.
