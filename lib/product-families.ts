export const productFamilies = {
  'panasonic-tz': {
    name: 'Panasonic TZ', brand: 'Panasonic', preferred: 'panasonic-387',
    description: 'Kompaktní nástěnná klimatizace do místností, kde rozhoduje prostor pro vnitřní jednotku. Porovnejte jednotlivé výkony a provedení pro samostatný split i multisplit.',
  },
  'panasonic-etherea': {
    name: 'Panasonic Etherea', brand: 'Panasonic', preferred: 'panasonic-680',
    description: 'Nástěnná klimatizace s technologií nanoe™ X. Vyberte výkon a barvu pro svůj interiér a prohlédněte si, jak Etherea vypadá po montáži v rodinném domě.',
  },
  'midea-breezeless': {
    name: 'Midea Breezeless', brand: 'Midea', preferred: 'midea-cmid003449',
    description: 'Řady Breezeless E a Breezeless+ rozptylují proud vzduchu přes perforované lamely. Na jednom místě můžete porovnat jejich provedení a vybrat jednotku pro svou místnost.',
  },
} as const;

export type FamilySlug = keyof typeof productFamilies;
export type Kind = 'split' | 'indoor' | 'outdoor';
export interface Variant {
  id: string; model: string; series: string; kind: Kind; color: string; form: string;
  facts: [string,string | number][]; images: {url:string;caption:string}[];
  documents: [string,string][]; reference?:[string,string];
}
export const kindNames: Record<Kind,string> = {split:'Splitová sestava',indoor:'Vnitřní jednotka',outdoor:'Venkovní jednotka'};
export function isFamily(value:string):value is FamilySlug {
  return Object.prototype.hasOwnProperty.call(productFamilies,value);
}
export function familyForTitle(title:string,brand=''):FamilySlug | undefined {
  const name=(brand+' '+title).toLowerCase();
  if(name.includes('panasonic') && /\btz\b/.test(name)) { return 'panasonic-tz'; }
  if(name.includes('panasonic') && name.includes('etherea')) { return 'panasonic-etherea'; }
  if(name.includes('midea') && name.includes('breezeless')) { return 'midea-breezeless'; }
}
