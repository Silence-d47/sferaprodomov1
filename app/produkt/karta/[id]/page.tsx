import {notFound} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {climateVariant} from '@/lib/climate-catalog';
import ClimateDetails from '../../ClimateDetails';
import styles from '../../[slug]/product.module.css';

type Props={params:Promise<{id:string}>};
export async function generateMetadata({params}:Props){
  const v=await climateVariant((await params).id);
  if(!v?.climate)return {};
  return {title:[v.climate.brand,v.series,v.model,'| Sfera pro domov'].join(' '),description:v.climate.description.slice(0,170)};
}
export default async function Page({params}:Props){
  const v=await climateVariant((await params).id);
  if(!v?.climate)notFound();
  const card=v.climate;
  return <main className={styles.page}>
    <nav className={styles.crumb}><Link href="/produkt/karta">Katalog klimatizací</Link></nav>
    <div className={styles.hero}>{v.images.length>0&&<div className={styles.visual}><figure className={styles.figure}><Image unoptimized priority src={v.images[0].url} alt={v.images[0].caption} width={1100} height={800} className={styles.mainPhoto}/></figure></div>}
      <div className={styles.intro}><h1>{card.brand} {card.series}</h1><p>{card.model}</p>
      <Link href={'/produkt/karta?q='+encodeURIComponent(card.brand+' '+card.series)}>Další varianty této řady</Link></div></div>
    <div className={styles.columns}><ClimateDetails card={card}/><div>
      {v.documents.length>0&&<section className={styles.panel}><h2>Dokumenty ke stažení</h2><ul className={styles.docs}>{v.documents.map(([name,url])=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></li>)}</ul></section>}
      {v.images.length>1&&<section className={styles.panel}><h2>Fotografie</h2>{v.images.slice(1).map((photo,i)=><a href={photo.url} key={i}><Image unoptimized loading="lazy" src={photo.url} alt={photo.caption} width={480} height={320}/></a>)}</section>}
      {v.reference&&<section className={styles.panel}><h2>Naše realizace</h2><a href={v.reference[1]}>{v.reference[0]}</a></section>}
    </div></div></main>;
}
