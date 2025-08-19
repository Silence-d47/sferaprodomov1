# Správa tlačítek v Hero sekci

## Přehled

Hero sekce nyní podporuje plně konfigurovatelná tlačítka přes Sanity CMS. Místo pevně zakódovaných tlačítek můžete nyní upravovat:

- **Text tlačítek**
- **Odkazy/URL**
- **Viditelnost tlačítek**

## Struktura v Sanity

### Primární tlačítko (oranžové)
- **Pole**: `primaryButton`
- **Typ**: Object
- **Pole**:
  - `text`: Text tlačítka (výchozí: "Nezávazná nabídka")
  - `link`: Odkaz (výchozí: "/kontakt")
  - `isActive`: Zobrazit/skrýt tlačítko (výchozí: true)

### Sekundární tlačítko (modré)
- **Pole**: `secondaryButton`
- **Typ**: Object
- **Pole**:
  - `text`: Text tlačítka (výchozí: "Zavolejte nám")
  - `link`: Odkaz (výchozí: "tel:+420735014112")
  - `isActive`: Zobrazit/skrýt tlačítko (výchozí: true)

## Jak upravit tlačítka

1. **Přihlaste se do Sanity Studio**
2. **Najděte dokument typu "Hero slide"**
3. **Rozbalte sekci "Primární tlačítko (oranžové)"**
4. **Upravte text, odkaz nebo zrušte zaškrtnutí "Zobrazit tlačítko"**
5. **Stejně upravte sekundární tlačítko**
6. **Uložte změny**

## Příklady použití

### Změna textu tlačítka
```
Primární tlačítko:
- Text: "Získejte nabídku zdarma"
- Link: "/nabidka"

Sekundární tlačítko:
- Text: "Konzultace zdarma"
- Link: "/konzultace"
```

### Skrytí tlačítka
- Zrušte zaškrtnutí "Zobrazit tlačítko" pro příslušné tlačítko
- Tlačítko se nebude zobrazovat na webu

### Vlastní odkazy
- Můžete použít interní odkazy: `/sluzby/klimatizace`
- Externí odkazy: `https://example.com`
- Telefonní odkazy: `tel:+420123456789`
- Email odkazy: `mailto:info@example.com`

## Fallback hodnoty

Pokud nejsou tlačítka definována v Sanity, použijí se výchozí hodnoty:

- **Primární tlačítko**: "Nezávazná nabídka" → `/kontakt`
- **Sekundární tlačítko**: "Zavolejte nám" → `tel:+420735014112`

## Technické detaily

- **Komponenta**: `components/ui/unified-hero.tsx`
- **Sanity schéma**: `sanity/schemaTypes/heroSlide.ts`
- **GROQ query**: Aktualizována v `app/page.tsx`
- **TypeScript interface**: Aktualizován pro podporu nových polí

## Migrace existujících dat

Existující hero slides budou fungovat s výchozími hodnotami tlačítek. Pro plnou funkcionalnost doporučujeme:

1. Otevřít každý hero slide v Sanity
2. Vyplnit pole pro tlačítka
3. Nastavit správné odkazy a texty
4. Otestovat na webu

