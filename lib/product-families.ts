export type Kind = 'split' | 'indoor' | 'outdoor';
export interface Variant {
  title:string;brand:string;description:string;referenceCover?:string;
  id: string; model: string; series: string; kind: Kind; color: string; form: string;
  facts: [string,string | number][]; images: {url:string;caption:string}[];
  documents: [string,string][]; reference?:[string,string]|null;
}
export const kindNames: Record<Kind,string> = {split:'Splitová sestava',indoor:'Vnitřní jednotka',outdoor:'Venkovní jednotka'};
export function familyForTitle(title:string,brand=''):string | undefined {
  const name=(brand+' '+title).toLowerCase();
  if(name.includes('panasonic') && /\btz\b/.test(name)) { return 'panasonic-tz'; }
  if(name.includes('panasonic') && name.includes('etherea')) { return 'panasonic-etherea'; }
  if(name.includes('midea') && name.includes('breezeless')){
    if(/breezeless\s*e\b/.test(name))return 'midea-breezeless-e';
    if(/breezeless\s*s\b/.test(name))return 'midea-breezeless-s';
    if(/breezeless\s*\+/.test(name))return 'midea-breezeless-plus';
    return 'midea-breezeless';
  }
}
