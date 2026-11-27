import Link from 'next/link';
import {climateIndex,normalized} from '@/lib/climate-catalog';
import {kindNames} from '@/lib/product-families';
import styles from '../[slug]/product.module.css';

export const metadata={title:'Katalog klimatizací | Sfera pro domov'};
export default async function Page({searchParams}:{searchParams:Promise<{q?:string}>}){
  const request=await searchParams, q=typeof request.q==='string'?request.q:'',terms=normalized(q).split(' ').filter(Boolean);
  const rows=(await climateIndex()).filter(v=>terms.every(t=>normalized([v.brand,v.series,v.model,kindNames[v.kind]].join(' ')).includes(t)));
  return <main className={styles.page}><nav className={styles.crumb}><Link href="/klimatizace">Klimatizace</Link></nav><h1>Katalog klimatizací</h1>
    <form className={styles.filters}><label>Značka, řada nebo kód modelu<input type="search" name="q" defaultValue={q}/></label><button className={styles.cta}>Vyhledat</button></form>
    <section className={styles.panel}><p>Počet variant: {rows.length}</p><ul className={styles.docs}>{rows.map(v=><li key={v.id}><Link href={'/produkt/karta/'+encodeURIComponent(v.id)}>{v.brand} {v.series} · {v.model} · {kindNames[v.kind]}</Link></li>)}</ul></section></main>;
}
