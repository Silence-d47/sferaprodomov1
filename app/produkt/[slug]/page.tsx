import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { productFamilies, isFamily, type FamilySlug, type Variant } from '@/lib/product-families';
import ProductDetail from './product-detail';
import {climateVariant,publishedVariant} from '@/lib/climate-catalog';

type Props = {params:Promise<{slug:string}>;searchParams:Promise<{varianta?:string|string[]}>};
const site='https://www.sfera-domov.cz';

const variantsFor = cache(async (slug:FamilySlug):Promise<Variant[]>=>{
  const response=await fetch('https://crm.sfera-domov.cz/api/verejne-produkty/'+slug+'?dokumenty=archiv',{next:{revalidate:60}});
  if (!response.ok) { throw new Error('Katalog klimatizací je dočasně nedostupný.'); }
  const data=await response.json();
  if (data.slug !== slug || !Array.isArray(data.variants) || !data.variants.length) {
    throw new Error('Chybějí varianty této řady.');
  }
  const variants:Variant[]=data.variants.map(publishedVariant);
  return Promise.all(variants.map(async variant=>{
    if((variant.climate?.description.trim().length??0)>=700){return variant;}
    const card=await climateVariant(variant.id);
    return card?.climate ? {...variant,climate:card.climate} : variant;
  }));
});

export async function generateMetadata({params,searchParams}:Props):Promise<Metadata> {
  const {slug}=await params;
  if (!isFamily(slug)) { notFound(); }
  const family=productFamilies[slug],url=site+'/produkt/'+slug;
  const rows=await variantsFor(slug), id=(await searchParams).varianta;
  const selected=rows.find(row=>row.id===id)||rows.find(row=>row.id===family.preferred)||rows[0];
  const title=family.name+' – varianty, technické údaje a návody | Sfera pro domov';
  return {title,description:family.description,alternates:{canonical:url},openGraph:{type:'website',locale:'cs_CZ',url,
    title:id===selected.id?family.name+' · '+selected.model:title,description:family.description,images:selected.images.filter(({url})=>{const size=url.match(/-(\d+)x(\d+)\.[a-z]+(?:\?|$)/i);return size&&Number(size[1])>Number(size[2]);}).slice(0,1).map(image=>({url:image.url,alt:image.caption}))}};
}

export default async function ProductPage({params,searchParams}:Props){
  const {slug}=await params;
  if (!isFamily(slug)) { notFound(); }
  const family=productFamilies[slug],rows=await variantsFor(slug),id=(await searchParams).varianta;
  const chosen=rows.find(v=>v.id===id) || rows.find(v=>v.id===family.preferred) || rows[0];
  const url=site+'/produkt/'+slug;
  const json={'@context':'https://schema.org','@type':'ProductGroup','@id':url+'#rada',url,name:family.name,
    description:family.description,brand:{'@type':'Brand',name:family.brand},productGroupID:slug,
    variesBy:['https://schema.org/color','https://schema.org/model'],
    hasVariant:rows.map(v=>({'@type':'Product',name:family.name+' '+v.model,model:v.model,sku:v.id,
      ...(v.color?{color:v.color}:{}),image:v.images[0]?.url,url:url+'?varianta='+encodeURIComponent(v.id)}))};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(json).replace(/</g,'\\u003c')}}/>
    <ProductDetail slug={slug} variants={rows} defaultId={chosen.id}/></>;
}
