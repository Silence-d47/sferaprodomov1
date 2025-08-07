# Sanity CMS Setup

## Přehled
Tento projekt používá Sanity CMS pro správu obsahu. Sanity je headless CMS, který umožňuje správu obsahu přes webové rozhraní.

## Instalace a konfigurace

### 1. Vytvoření Sanity projektu
1. Jděte na [https://www.sanity.io/](https://www.sanity.io/)
2. Vytvořte nový projekt nebo použijte existující
3. Zkopírujte Project ID z nastavení projektu

### 2. Konfigurace prostředí
1. Zkopírujte `env.example` jako `.env.local`
2. Vyplňte své Sanity Project ID:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
SANITY_STUDIO_PROJECT_ID=your-actual-project-id
```

### 3. Spuštění Sanity Studio
```bash
npx sanity dev
```
Sanity Studio bude dostupné na `http://localhost:3333`

### 4. Spuštění Next.js aplikace
```bash
npm run dev
```

## Struktura dat

### Post (Články)
- `title` - Název článku
- `slug` - URL slug
- `author` - Reference na autora
- `mainImage` - Hlavní obrázek
- `categories` - Pole kategorií
- `publishedAt` - Datum publikace
- `body` - Obsah článku (Portable Text)

### Author (Autoři)
- `name` - Jméno autora
- `slug` - URL slug
- `image` - Fotografie autora
- `bio` - Biografie (Portable Text)

### Category (Kategorie)
- `title` - Název kategorie
- `description` - Popis kategorie

## Použití v aplikaci

### Načtení všech článků
```typescript
import { client } from '@/lib/sanity.client'
import { postsQuery } from '@/lib/sanity.queries'

const posts = await client.fetch(postsQuery)
```

### Načtení konkrétního článku
```typescript
import { client } from '@/lib/sanity.client'
import { postQuery } from '@/lib/sanity.queries'

const post = await client.fetch(postQuery, { slug: 'article-slug' })
```

### Zobrazení obrázků
```typescript
import { urlForImage } from '@/lib/sanity.image'

const imageUrl = urlForImage(post.mainImage)?.url()
```

### Zobrazení Portable Text
```typescript
import { CustomPortableText } from '@/lib/sanity.portableText'

<CustomPortableText value={post.body} />
```

## Přidání nového typu obsahu

1. Vytvořte nový schema soubor v `sanity/schemaTypes/`
2. Přidejte typ do `sanity/schemaTypes/index.ts`
3. Vytvořte query v `lib/sanity.queries.ts`
4. Použijte v aplikaci

## Užitečné odkazy
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Sanity Integration](https://github.com/sanity-io/next-sanity)
- [Portable Text](https://portabletext.org/) 