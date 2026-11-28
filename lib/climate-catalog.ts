import {cache} from 'react';
import type {Kind, Variant} from './product-families';

export type ClimateIndexRow = {id:string; brand:string; series:string; model:string; kind:Kind; cool?:number};
const crm='https://crm.sfera-domov.cz/api/';
export const climateIndex=cache(async ():Promise<ClimateIndexRow[]>=>{
  const response=await fetch(crm+'modely-klimatizaci',{next:{revalidate:60}});
  if(!response.ok){throw new Error('Katalog klimatizací je dočasně nedostupný.');}
  return response.json();
});
export const climateVariant=cache(async (id:string):Promise<Variant|null>=>{
  const response=await fetch(crm+'karta-klimatizace/'+encodeURIComponent(id)+'?dokumenty=archiv',{next:{revalidate:60}});
  if(response.status===404){return null;}
  if(!response.ok){throw new Error('Karta zařízení je dočasně nedostupná.');}
  return publishedVariant(await response.json());
});
export function publishedVariant(row:Variant):Variant{
  return {...row,documents:row.documents.filter(([,url])=>/^https:\/\/crm\.sfera-domov\.cz\/katalogy\/(?:panasonic-rac-2026|midea-rac-2026)\.pdf(?:#page=\d+)?$/.test(url))};
}
export function normalized(value:string){
  return value.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'').replace(/[^a-z0-9+]+/g,' ').trim();
}
export function matchingModel(rows:ClimateIndexRow[],title:string,brand:string){
  const text=' '+normalized(brand+' '+title)+' ';
  const matches=rows.filter(r=>r.kind==='split'&&text.includes(' '+normalized(r.brand)+' ')&&r.series&&
    text.includes(' '+normalized(r.series)+' '));
  return matches.sort((a,b)=>b.series.length-a.series.length||
    Math.abs(Number(a.cool||0)-3.5)-Math.abs(Number(b.cool||0)-3.5)||a.id.localeCompare(b.id))[0];
}
