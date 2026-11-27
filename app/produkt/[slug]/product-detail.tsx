'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { kindNames,type Kind,type Variant } from '@/lib/product-families';
import styles from './product.module.css';

const cz=new Intl.NumberFormat('cs-CZ',{maximumFractionDigits:2});
const cooling=(v:Variant)=>Number(v.facts.find(([name])=>name==='Chlazení (kW)')?.[1])||0;
const power=(v:Variant)=>cooling(v)?cz.format(cooling(v))+' kW':'';
const label=(v:Variant)=>[power(v),v.color,v.kind==='indoor'?v.form:'',v.model].filter(Boolean).join(' · ');
const defaultCalculator='https://crm.sfera-domov.cz/poptavka';

export default function ProductDetail({variants,defaultId}:{variants:Variant[];defaultId:string}){
  const [id,setId]=useState(defaultId),[photo,setPhoto]=useState(0);
  const [back,setBack]=useState<{url:string;token:string}|null>(null);
  const v=variants.find(row=>row.id===id)||variants[0];
  const series=Array.from(new Set(variants.map(row=>row.series)));
  const seriesVariants=variants.filter(row=>row.series===v.series);
  const kinds=(Object.keys(kindNames) as Kind[]).filter(kind=>seriesVariants.some(row=>row.kind===kind));
  const choices=seriesVariants.filter(row=>row.kind===v.kind).sort((a,b)=>cooling(a)-cooling(b)||a.model.localeCompare(b.model,'cs',{numeric:true}));
  const image=v.images[photo]||v.images[0];
  useEffect(()=>{
    const hash=new URLSearchParams(location.hash.slice(1)),token=hash.get('navrat');
    if(token && /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(token)){
      setBack({token,url:hash.get('zdroj')==='aplikace'?'https://sfera-nabidkomat.vercel.app/poptavka':defaultCalculator});
    }
  },[]);
  function select(row:Variant){
    setId(row.id);setPhoto(0);
    const url=new URL(location.href);url.searchParams.set('varianta',row.id);history.replaceState(history.state,'',url);
  }
  function switchGroup(rows:Variant[]){
    const nearest=[...rows].sort((a,b)=>Number(b.kind===v.kind)-Number(a.kind===v.kind)||Math.abs(cooling(a)-cooling(v))-Math.abs(cooling(b)-cooling(v)));
    if (nearest.length) { select(nearest[0]); }
  }
  const ret=back?'#navrat='+encodeURIComponent(back.token):'';
  const quote=(back?.url||defaultCalculator)+'?varianta='+encodeURIComponent(v.id)+ret;
  return <main className={styles.page}>
    <nav aria-label="Drobečková navigace" className={styles.crumb}><Link href="/klimatizace#modely">Klimatizace</Link><span>/</span><span>{v.title}</span></nav>
    <div className={styles.hero}><div className={styles.visual}>
      {image&&<figure className={styles.figure}><a href={image.url} target="_blank" rel="noopener noreferrer" aria-label={'Zvětšit fotografii: '+image.caption}>
        <Image src={image.url} alt={image.caption} width={1100} height={800} unoptimized={!image.url.startsWith('https://cdn.sanity.io/')} sizes="(max-width: 760px) 100vw, 52vw" priority className={styles.mainPhoto}/></a><figcaption>{image.caption}</figcaption></figure>}
      {v.images.length>1&&<div className={styles.thumbs} aria-label="Fotogalerie">{v.images.map((item,i)=><button type="button" key={item.url} onClick={()=>setPhoto(i)}
        aria-label={'Zobrazit fotografii: '+item.caption} aria-pressed={photo===i}><Image src={item.url} alt="" width={90} height={68} unoptimized={!item.url.startsWith('https://cdn.sanity.io/')} loading="lazy"/></button>)}</div>}
    </div><div className={styles.intro}><h1>{v.title}</h1><p className={styles.lead}>{v.description}</p>
      <div className={styles.filters}>
        {series.length>1&&<label>Modelová řada<select value={v.series} onChange={e=>switchGroup(variants.filter(r=>r.series===e.target.value))}>{series.map(s=><option key={s}>{s}</option>)}</select></label>}
        <label>Provedení<select value={v.kind} onChange={e=>switchGroup(seriesVariants.filter(r=>r.kind===e.target.value))}>{kinds.map(k=><option value={k} key={k}>{kindNames[k]}</option>)}</select></label>
        <label>Výkon a varianta<select value={v.id} onChange={e=>{const row=choices.find(r=>r.id===e.target.value);if (row) { select(row); }}}>{choices.map(r=><option key={r.id} value={r.id}>{label(r)}</option>)}</select></label>
      </div>
      <div className={styles.actions}><a className={styles.cta} href={quote}>{back?'Vybrat do nabídky':'Spočítat cenu s montáží'}</a>
        {back&&<a href={back.url+ret}>Zpět do rozpracované nabídky</a>}</div>
    </div></div>
    <div className={styles.columns}><section className={styles.panel}>
      <h2>Technické údaje</h2><dl className={styles.facts}>{[['Model',v.model],['Provedení',v.form||kindNames[v.kind]],...(v.color?[['Barva',v.color]]:[]),...v.facts].map(([k,value])=><div key={k}><dt>{k}</dt><dd>{typeof value==='number'?cz.format(value):value}</dd></div>)}</dl>
    </section><div><section className={styles.panel}><h2>Dokumenty ke stažení</h2><ul className={styles.docs}>{v.documents.map(([title,url])=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer"><span className={styles.pdf}>PDF</span>{title}</a></li>)}</ul></section>
      {v.reference&&<section className={styles.panel}><h2>Naše realizace s touto řadou</h2><a className={styles.realization} href={v.reference[1]}>{v.referenceCover&&<Image src={v.referenceCover} alt="" width={960} height={540} unoptimized className={styles.referencePhoto}/>}<span>{v.reference[0]}</span></a></section>}</div></div>
  </main>;
}
