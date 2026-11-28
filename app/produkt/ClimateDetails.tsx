import type {Variant} from '@/lib/product-families';
import styles from './[slug]/product.module.css';

export default function ClimateDetails({card}:{card:NonNullable<Variant['climate']>}){
  return <section className={styles.panel}>
    <h2>Technické údaje</h2>
    <dl className={styles.facts}>{card.facts.map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
    {card.features.length>3&&<><h2>Další funkce a výbava</h2><ul className="list-disc pl-6 space-y-2">{card.features.slice(3).map((v,i)=><li key={i}>{v}</li>)}</ul></>}
    {card.description&&<details className={styles.more}><summary>Podrobnosti o modelu</summary><p className="whitespace-pre-line leading-relaxed">{card.description}</p></details>}
  </section>;
}
