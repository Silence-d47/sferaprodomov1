import type {Metadata} from 'next';
import {cache} from 'react';
import {notFound,permanentRedirect} from 'next/navigation';
import type {Variant} from '@/lib/product-families';
import ProductDetail from './product-detail';

type Props={params:Promise<{slug:string}>,searchParams:Promise<{varianta?:string|string[]}>};
const site='https://www.sfera-domov.cz';
const familyRows=cache(async(slug:string):Promise<Variant[]>=>{
  if(!/^[a-z0-9-]{1,100}$/.test(slug)) { notFound(); }
  const response=await fetch('https://crm.sfera-domov.cz/api/verejne-produkty/'+slug,{cache:'no-store'});
  if(response.status===404) { notFound(); }
  if (!response.ok) { throw Error('Katalog klimatizací je dočasně nedostupný.'); }
  const data=await response.json();
  if(data.slug!==slug||!Array.isArray(data.variants)||!data.variants.length) { notFound(); }
  return data.variants;
});
async function selection({params,searchParams}:Props){
  const {slug}=await params,id=(await searchParams).varianta,rows=await familyRows(slug);
  const selected=rows.find(v=>v.id===id)||rows.find(v=>v.kind==='split')||rows[0];
  if(slug==='midea-breezeless'){
    const target=selected.series==='Breezeless+'?'midea-breezeless-plus':'midea-breezeless-e';
    permanentRedirect('/produkt/'+target+(id===selected.id?'?varianta='+encodeURIComponent(selected.id):''));
  }
  return {rows,selected,url:site+'/produkt/'+slug};
}
export async function generateMetadata(props:Props):Promise<Metadata>{
  const {selected:v,url}=await selection(props);
  return {title:v.title+' | Sfera pro domov',description:v.description,alternates:{canonical:url},
    openGraph:{type:'website',locale:'cs_CZ',url,title:v.title,description:v.description,images:v.images.slice(0,1).map(i=>({url:i.url,alt:i.caption}))}};
}
export default async function ProductPage(props:Props){
  const {rows,selected,url}=await selection(props);
  const json={'@context':'https://schema.org','@type':'ProductGroup',url,name:[selected.brand,selected.series].join(' '),
    brand:{'@type':'Brand',name:selected.brand},hasVariant:rows.map(v=>({'@type':'Product',name:v.title,model:v.model,sku:v.id,
    description:v.description,color:v.color||undefined,image:v.images[0]?.url,url:url+'?varianta='+encodeURIComponent(v.id)}))};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(json).replace(/</g,'\\u003c')}}/>
    <ProductDetail variants={rows} defaultId={selected.id}/></>;
}
