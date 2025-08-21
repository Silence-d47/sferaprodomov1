# Sanity CMS Setup - SFERA PRO DOMOV

## 🚀 Rychlé spuštění

### 1. **Kopírování prostředí**
```bash
cp env.example .env.local
```

### 2. **Instalace Sanity dependencies**
```bash
cd sanity
npm install
```

### 3. **Spuštění Sanity Studio**
```bash
# V adresáři sanity/
npm run dev
```
Sanity Studio bude dostupné na `http://localhost:3333`

### 4. **Spuštění Next.js aplikace**
```bash
# V hlavním adresáři
npm run dev
```

## 📊 Import dat

### **Import hero slides (bez obrázků)**
```bash
node scripts/import-hero-slides.js
```

### **Import kompletních dat**
```bash
node scripts/import-data.js
```

## 🔧 Konfigurace

### **Sanity Project ID**
- Aktuální: `cu4viahw`
- Dataset: `production`
- API Version: `2024-01-01`

### **Struktura dat**
- ✅ Hero Slides - funkční
- ✅ Posts (články) - funkční
- ✅ Products (produkty) - funkční
- ✅ Categories (kategorie) - funkční
- ✅ Authors (autoři) - funkční
- ✅ FAQ - funkční
- ✅ Site Settings - funkční

## 🎯 Hero Slides Schema

```typescript
{
  _type: 'heroSlide',
  title: 'string',
  subtitle: 'string',
  description: 'text',
  bgImage: 'image', // volitelné
  slideType: 'intro' | 'service' | 'reference',
  features: ['string'],
  primaryButton: { text, link, isActive },
  secondaryButton: { text, link, isActive },
  phoneNumber: 'string',
  order: 'number',
  isActive: 'boolean'
}
```

## 🚨 Troubleshooting

### **Problém: Sanity se nespustí**
1. Zkontrolujte, že máte `.env.local` s `NEXT_PUBLIC_SANITY_PROJECT_ID`
2. Ověřte, že `sanity/package.json` má správné verze
3. Zkuste `npm install` v `sanity/` adresáři

### **Problém: Chybí data**
1. Spusťte `node scripts/import-hero-slides.js`
2. Zkontrolujte console pro chyby
3. Ověřte, že Sanity Studio běží

### **Problém: Chybí obrázky**
1. Obrázky se importují později
2. Pro testování stačí textový obsah
3. V Sanity Studio můžete přidat obrázky ručně

## 📱 Použití v aplikaci

### **Načtení hero slides**
```typescript
import { client } from '@/lib/sanity.client'
import { heroSlidesQuery } from '@/lib/sanity.queries'

const slides = await client.fetch(heroSlidesQuery)
```

### **Zobrazení v UnifiedHero**
```typescript
import { UnifiedHero } from '@/components/ui/unified-hero'

<UnifiedHero slides={slides} />
```

## 🔗 Užitečné odkazy

- [Sanity Studio](http://localhost:3333) - po spuštění
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Sanity Integration](https://github.com/sanity-io/next-sanity)

---

**Poznámka:** Všechny změny jsou automaticky nasazeny. Pro testování použijte development server. 