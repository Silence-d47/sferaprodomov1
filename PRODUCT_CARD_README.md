# ProductCard - Nová implementace s modálním oknem

## Přehled
Nová implementace `ProductCard` komponenty řeší problém s různými délkami textu a nekonzistentním layoutem produktů napříč stránkami. Místo zobrazení všech informací na kartě se nyní zobrazují pouze základní informace s možností rozkliknutí detailů v modálním okně.

## Klíčové změny

### 1. Kompaktní karta
- **Zobrazené informace:**
  - Název produktu (max 2 řádky)
  - Obrázek produktu
  - Značka (pokud existuje)
  - Energetická třída (pokud existuje)
  - Badge "Doporučujeme" nebo "Nejprodávanější"
  - Tlačítko "Zobrazit detaily"
  - Tlačítko "Poptávka"

- **Výhody:**
  - Konzistentní výška karet
  - Lepší grid layout
  - Rychlý přehled produktů
  - Responsivní design

### 2. Modální okno s detaily
- **Zobrazené informace:**
  - Všechny informace z původní karty
  - Technické specifikace
  - Ceny (pokud jsou povoleny)
  - Soubory ke stažení
  - Rozšířený popis
  - Záruka a další detaily

- **Funkce:**
  - Zavírání pomocí X tlačítka nebo tlačítka "Zavřít"
  - Scrollování pro dlouhý obsah
  - Responsivní design (1-2 sloupce podle velikosti obrazovky)

## Implementace

### Grid Layout
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
  {products.map((product) => (
    <ProductCard key={product._id} {...product} />
  ))}
</div>
```

### Použití komponenty
```tsx
import { ProductCard } from "@/components/ui/product-card"

<ProductCard
  title={product.title}
  description={product.description}
  image={product.image}
  features={product.features}
  isRecommended={product.isRecommended}
  isBestSelling={product.isBestSelling}
  catalogUrl={product.catalogUrl}
  energyClass={product.energyClass}
  specifications={product.specifications}
  price={product.price}
  warranty={product.warranty}
  brand={product.brand}
  files={product.files}
/>
```

## Technické detaily

### State Management
- Používá `useState` pro řízení modálního okna
- Komponenta je "use client" kvůli interaktivitě

### Styling
- Tailwind CSS třídy pro konzistentní vzhled
- Hover efekty a animace
- Responsivní breakpointy
- Modální okno s overlay a z-index 50

### Accessibility
- Správné alt texty pro obrázky
- Keyboard navigation support
- Focus management v modálním okně

## Stránky s implementací

Nová implementace je aktivní na následujících stránkách:
- `/rekuperace` - Rekuperační jednotky
- `/klimatizace` - Klimatizační jednotky  
- `/tepelna-cerpadla` - Tepelná čerpadla

## Výhody nového řešení

1. **Konzistentní layout** - Všechny karty mají stejnou výšku
2. **Lepší UX** - Uživatel vidí přehled a může si vybrat, které detaily potřebuje
3. **Responsivní design** - Funguje na všech zařízeních
4. **Snadná údržba** - Jedna komponenta pro všechny produkty
5. **Lepší performance** - Méně DOM elementů na stránce

## Možné vylepšení

1. **Filtrování produktů** - Přidat možnost filtrovat podle značky, energetické třídy
2. **Vyhledávání** - Fulltextové vyhledávání v produktech
3. **Porovnání** - Možnost porovnat více produktů
4. **Favority** - Uložení oblíbených produktů
5. **Sdílení** - Sdílení produktu na sociální sítě

## Troubleshooting

### Problém: Modální okno se neotevírá
- Zkontrolujte, že komponenta má "use client" direktivu
- Ověřte, že všechny props jsou správně předány

### Problém: Karty nejsou zarovnané
- Zkontrolujte grid layout v rodičovské komponentě
- Ověřte, že všechny karty mají stejnou výšku obsahu

### Problém: Modální okno se nezobrazuje správně
- Zkontrolujte z-index (mělo by být 50)
- Ověřte, že není překryto jinými elementy
