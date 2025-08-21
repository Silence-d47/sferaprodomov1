# Hero Section & Service Hub Overlap Fix

## 🚨 Problém

CTA tlačítka v hero sekci byly překrytá ServiceHub komponentou, což způsobovalo špatnou viditelnost a UX.

## 🔧 Řešení

### **1. ServiceHub Timing**
- **Před**: ServiceHub se zobrazoval hned po 100px scrollování
- **Po**: ServiceHub se zobrazuje až po scrollování za hero sekci (80vh)

```typescript
// Před
setIsScrolled(scrollY > 100);

// Po  
const heroHeight = window.innerHeight * 0.8;
setIsScrolled(scrollY > heroHeight);
```

### **2. Z-Index Hierarchy**
- **Hero pozadí**: `z-0` (nejníže)
- **Hero overlay**: `z-10` 
- **Hero obsah**: `z-30`
- **CTA tlačítka**: `z-50` (nejvýše)
- **Navigace**: `z-40`
- **ServiceHub**: `z-20` (pod hero obsahem)

### **3. ServiceHub Animace**
- **Plynulé zobrazení**: `opacity`, `scale`, `translate-y`
- **Délka animace**: 700ms s `ease-out`
- **Pointer events**: Neaktivní dokud není viditelný

```typescript
className={`transition-all duration-700 ease-out ${
  isScrolled ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
}`}
```

## 📱 Responsivní chování

### **Desktop**
- ServiceHub se zobrazuje jako horizontální lišta
- Hover efekty s tooltips
- Aktivní služba má modrý ring

### **Mobile** 
- ServiceHub se zobrazuje jako tlačítko s menu
- Rozbalovací grid layout (2x3)
- Touch-friendly interakce

## 🎯 Výsledek

### **✅ Vyřešeno:**
- CTA tlačítka jsou plně viditelná
- ServiceHub neprekrývá hero sekci
- Plynulé přechody mezi stavy
- Profesionální vzhled

### **🎨 UX vylepšení:**
- ServiceHub se objeví až po scrollování
- Lepší hierarchie vizuálních prvků
- Konzistentní animace
- Responsivní design

## 🔍 Testování

### **1. Hero sekce**
- [ ] CTA tlačítka jsou viditelná
- [ ] Text je čitelný
- [ ] Navigace funguje

### **2. ServiceHub**
- [ ] Nezobrazuje se hned
- [ ] Objeví se po scrollování
- [ ] Animace jsou plynulé
- [ ] Responsivní na mobile

### **3. Scrollování**
- [ ] ServiceHub se objeví ve správný čas
- [ ] Žádné překrytí obsahu
- [ ] Plynulé přechody

## 🛠️ Technické detaily

### **Z-Index schéma:**
```
z-50: CTA tlačítka (nejvýše)
z-40: Navigace & progress bar
z-30: Hero obsah
z-20: ServiceHub
z-10: Hero overlay
z-0:  Hero pozadí (nejníže)
```

### **Scroll trigger:**
```typescript
const heroHeight = window.innerHeight * 0.8; // 80% výšky viewportu
setIsScrolled(scrollY > heroHeight);
```

### **Animace:**
```typescript
transition-all duration-700 ease-out
opacity-100 scale-100 translate-y-0  // Viditelné
opacity-0 scale-95 translate-y-4     // Skryté
```

## ✨ Shrnutí

Problém s překrytím hero sekce a ServiceHub byl vyřešen:

1. **Timing**: ServiceHub se zobrazuje až po scrollování za hero
2. **Z-Index**: Správná hierarchie vrstev
3. **Animace**: Plynulé přechody mezi stavy
4. **Responsivita**: Optimalizováno pro všechna zařízení

Výsledek je profesionální a uživatelsky přívětivý! 🎯
