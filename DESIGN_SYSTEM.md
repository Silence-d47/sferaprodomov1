# SFERA - Jednotný Design Systém

## 🎨 Barevná Paleta

### Primární Barvy
- **Sfera Blue**: `#1B5D93` - Hlavní brand barva
- **Sfera Blue Light**: `#49A3D7` - Světlejší varianta
- **Sfera Blue Dark**: `#196097` - Tmavší varianta

### Neutrální Barvy
- **White**: `#ffffff`
- **Gray 50**: `#f9fafb`
- **Gray 100**: `#f3f4f6`
- **Gray 200**: `#e5e7eb`
- **Gray 300**: `#d1d5db`
- **Gray 400**: `#9ca3af`
- **Gray 500**: `#6b7280`
- **Gray 600**: `#4b5563`
- **Gray 700**: `#374151`
- **Gray 800**: `#1f2937`
- **Gray 900**: `#111827`
- **Black**: `#000000`

### Funkční Barvy
- **Success**: `#10b981` - Zelená pro úspěch
- **Warning**: `#f59e0b` - Oranžová pro varování
- **Error**: `#ef4444` - Červená pro chyby
- **Accent**: `#f59e0b` - Akcentová barva

## 📝 Typografie

### Font Family
- **Primary**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### Velikosti
- **XS**: 0.75rem (12px)
- **SM**: 0.875rem (14px)
- **Base**: 1rem (16px)
- **LG**: 1.125rem (18px)
- **XL**: 1.25rem (20px)
- **2XL**: 1.5rem (24px)
- **3XL**: 1.875rem (30px)
- **4XL**: 2.25rem (36px)
- **5XL**: 3rem (48px)
- **6XL**: 3.75rem (60px)

### Font Weights
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800

### Line Heights
- **Tight**: 1.25
- **Normal**: 1.5
- **Relaxed**: 1.75

## 🎯 Komponenty

### Tlačítka
```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  transition: var(--transition-normal);
}

.btn-secondary {
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
}
```

### Karty
```css
.card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 3px var(--color-shadow-light);
  border: 1px solid var(--color-border-light);
  transition: var(--transition-normal);
}

.card:hover {
  box-shadow: 0 4px 12px var(--color-shadow-medium);
  transform: translateY(-2px);
}
```

### Sekce
```css
.section {
  padding: var(--spacing-3xl) 0;
}

.section-alt {
  background-color: var(--color-bg-secondary);
  padding: var(--spacing-3xl) 0;
}
```

## 📐 Spacing Systém

### Základní jednotky
- **XS**: 0.25rem (4px)
- **SM**: 0.5rem (8px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)
- **3XL**: 4rem (64px)

### Utility třídy
- `.mt-section` - margin-top: var(--spacing-3xl)
- `.mb-section` - margin-bottom: var(--spacing-3xl)
- `.py-section` - padding: var(--spacing-3xl) 0
- `.px-section` - padding: 0 var(--spacing-3xl)

## 🔄 Border Radius

- **SM**: 0.25rem (4px)
- **MD**: 0.5rem (8px)
- **LG**: 0.75rem (12px)
- **XL**: 1rem (16px)
- **2XL**: 1.5rem (24px)
- **Full**: 9999px

## ⚡ Transitions

- **Fast**: 150ms ease
- **Normal**: 300ms ease
- **Slow**: 500ms ease

## 📱 Layout Utilities

### Container
```css
.container-unified {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}
```

### Grid
```css
.grid-responsive {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### Flex
```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

## 🎨 Typography Utilities

### Nadpisy
```css
.text-heading-1 {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

.text-heading-2 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

.text-heading-3 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}
```

### Text
```css
.text-body-large {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}

.text-body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
}

.text-caption {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  color: var(--color-text-muted);
}
```

## 🚀 Použití

### Základní stránka
```tsx
import { UnifiedLayout, UnifiedSection, UnifiedHeading, UnifiedText, UnifiedButton } from "@/components/ui/unified-layout"

export default function ExamplePage() {
  return (
    <UnifiedLayout>
      <UnifiedSection>
        <UnifiedHeading level={1}>Hlavní nadpis</UnifiedHeading>
        <UnifiedText size="lg">
          Popis stránky s jednotným designem.
        </UnifiedText>
        <UnifiedButton variant="primary" size="lg">
          Akční tlačítko
        </UnifiedButton>
      </UnifiedSection>
      
      <UnifiedSection alt>
        <UnifiedHeading level={2}>Sekce s alternativním pozadím</UnifiedHeading>
        <UnifiedText>
          Obsah sekce s šedým pozadím.
        </UnifiedText>
      </UnifiedSection>
    </UnifiedLayout>
  )
}
```

### Grid layout
```tsx
import { UnifiedGrid, UnifiedCard } from "@/components/ui/unified-layout"

<UnifiedGrid cols={3}>
  <UnifiedCard>
    <h3>Karta 1</h3>
    <p>Obsah karty</p>
  </UnifiedCard>
  <UnifiedCard>
    <h3>Karta 2</h3>
    <p>Obsah karty</p>
  </UnifiedCard>
  <UnifiedCard>
    <h3>Karta 3</h3>
    <p>Obsah karty</p>
  </UnifiedCard>
</UnifiedGrid>
```

## 📋 Pravidla

1. **Konzistence**: Vždy používej definované barvy a spacing
2. **Čitelnost**: Zajisti dostatečný kontrast textu
3. **Responzivita**: Všechny komponenty musí být responzivní
4. **Přístupnost**: Dodržuj WCAG standardy
5. **Performance**: Minimalizuj CSS a používej efektivní selektory

## 🔧 Údržba

- Pravidelně kontroluj konzistenci napříč stránkami
- Aktualizuj design systém při změnách brandu
- Dokumentuj nové komponenty
- Testuj na různých zařízeních 