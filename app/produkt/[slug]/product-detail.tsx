'use client';
import ClimateDetails from '../ClimateDetails';
import Image from 'next/image';
import Link from 'next/link';
import ProductGallery from '../ProductGallery';
import { useEffect, useState } from 'react';
import { productFamilies,kindNames,type FamilySlug,type Kind,type Variant } from '@/lib/product-families';
import styles from './product.module.css';

const cz=new Intl.NumberFormat('cs-CZ',{maximumFractionDigits:2});
const cooling=(v:Variant)=>Number(v.climate?.cool)||Number(v.facts.find(([name])=>name==='Chlazení (kW)')?.[1])||0;
const power=(v:Variant)=>cooling(v)?cz.format(cooling(v))+' kW':'';
const label=(v:Variant)=>[power(v),v.color,v.model].filter(Boolean).join(' · ');
const defaultCalculator='https://crm.sfera-domov.cz/poptavka';

export default function ProductDetail({slug,variants,defaultId}:{slug?:FamilySlug;variants:Variant[];defaultId:string}){
  const family=slug?productFamilies[slug]:undefined;
  const [id,setId]=useState(defaultId);
  const [back,setBack]=useState<{url:string;token:string}|null>(null);
  const v=variants.find(row=>row.id===id)||variants[0];
  const series=Array.from(new Set(variants.map(row=>row.series)));
  const seriesVariants=variants.filter(row=>row.series===v.series);
  const kinds=(Object.keys(kindNames) as Kind[]).filter(kind=>seriesVariants.some(row=>row.kind===kind));
  const choices=seriesVariants.filter(row=>row.kind===v.kind).sort((a,b)=>cooling(a)-cooling(b)||a.model.localeCompare(b.model,'cs',{numeric:true}));
  useEffect(()=>{
    const hash=new URLSearchParams(location.hash.slice(1)),token=hash.get('navrat');
    if(token && /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(token)){
      setBack({token,url:hash.get('zdroj')==='aplikace'?'https://sfera-nabidkomat.vercel.app/poptavka':defaultCalculator});
    }
  },[]);
  function select(row:Variant){
    setId(row.id);
    const url=new URL(location.href);url.searchParams.set('varianta',row.id);history.replaceState(history.state,'',url);
  }
  function switchGroup(rows:Variant[]){
    const nearest=[...rows].sort((a,b)=>Number(b.kind===v.kind)-Number(a.kind===v.kind)||Math.abs(cooling(a)-cooling(v))-Math.abs(cooling(b)-cooling(v)));
    if (nearest.length) { select(nearest[0]); }
  }
  const ret=back?'#navrat='+encodeURIComponent(back.token):'';
  const quote=(back?.url||defaultCalculator)+'?varianta='+encodeURIComponent(v.id)+ret;
  const name=v.climate?[v.climate.brand,v.climate.series].join(' '):family?.name||v.series;
  const facts=v.climate?.facts||v.facts;
  const noise=facts.find(([key])=>key==='Minimum uvnitř (dB(A))')?.[1];
  const features=v.climate?.features.slice(0,3)||[];
  const isRealization=(caption:string)=>/montáž|realizac/i.test(caption);
  const realizationPhoto=v.referenceCover||v.images.find(({caption})=>isRealization(caption))?.url;
  const productImages=v.reference?v.images.filter(({caption})=>!isRealization(caption)):v.images;
  return <article className={styles.page}>
    <nav aria-label="Drobečková navigace" className={styles.crumb}><Link href="/klimatizace#modely">Klimatizace</Link><span>/</span><span>{name}</span></nav>
    <div className={styles.hero}><ProductGallery key={v.id} images={productImages}/><div className={styles.intro}><h1>{name}</h1>
      <p className={styles.lead}>{[kindNames[v.kind],v.color].filter(Boolean).join(' · ')} <small>{v.model}</small></p>
      <div className={styles.highlights}>
        {power(v)&&<span><strong>{power(v)}</strong><small>Chlazení</small></span>}
        {typeof noise!=='undefined'&&/^\d+(?:[.,]\d+)?$/.test(String(noise))&&<span><strong>{noise} dB(A)</strong><small>Min. hluk uvnitř</small></span>}
      </div>
      {features.length>0&&<ul className={styles.features}>{features.map(feature=><li key={feature}>{feature}</li>)}</ul>}
      {choices.length>1||kinds.length>1||series.length>1?<div className={styles.filters}>
        {series.length>1&&<label>Modelová řada<select value={v.series} onChange={e=>switchGroup(variants.filter(r=>r.series===e.target.value))}>{series.map(s=><option key={s}>{s}</option>)}</select></label>}
        {kinds.length>1&&<label>Provedení<select value={v.kind} onChange={e=>switchGroup(seriesVariants.filter(r=>r.kind===e.target.value))}>{kinds.map(k=><option value={k} key={k}>{kindNames[k]}</option>)}</select></label>}
        {choices.length>1&&<label>Výkon a varianta<select value={v.id} onChange={e=>{const row=choices.find(r=>r.id===e.target.value);if (row) { select(row); }}}>{choices.map(r=><option key={r.id} value={r.id}>{label(r)}</option>)}</select></label>}
      </div>:<Link className={styles.seriesLink} href={'/produkt/karta?q='+encodeURIComponent(name)}>Další varianty této řady</Link>}
      <div className={styles.actions}><a className={styles.cta} href={quote}>{back?'Vybrat do nabídky':'Spočítat cenu s montáží'}</a>
        {back&&<a href={back.url+ret}>Zpět do rozpracované nabídky</a>}</div>
      {!back&&(v.kind==='indoor'||v.kind==='outdoor')&&<p className={styles.note}>Poptávka zahrnuje výběr kompatibilní sestavy.</p>}
    </div></div>
    <div className={styles.columns}>{v.climate?<ClimateDetails card={v.climate}/>:<section className={styles.panel}>
      <h2>Technické údaje</h2><dl className={styles.facts}>{[['Model',v.model],['Provedení',v.form||kindNames[v.kind]],...(v.color?[['Barva',v.color]]:[]),...v.facts].map(([k,value])=><div key={k}><dt>{k}</dt><dd>{typeof value==='number'?cz.format(value):value}</dd></div>)}</dl>
    </section>}<aside>
      {v.reference&&<section className={styles.panel}><h2>Naše realizace</h2>
        <a className={styles.realization} href={v.reference[1]}>
          {realizationPhoto&&<Image className={styles.referencePhoto} src={realizationPhoto} alt="" width={960} height={540} unoptimized/>}
          <span>{v.reference[0]} →</span>
        </a>
      </section>}
      <section className={styles.panel}><h2>Produktové podklady</h2>
        <button type="button" className={styles.printButton} onClick={()=>window.print()}>Vytisknout produktový list / uložit PDF</button>
        {v.documents.length>0&&
        <ul className={styles.docs}>{v.documents.map(([title,url])=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer"><span className={styles.pdf}>PDF</span>{/RAC leaflet .*FINAL/i.test(title)?'Katalog Panasonic':title}</a></li>)}</ul>}
      </section>
    </aside></div>
  </article>;
}
