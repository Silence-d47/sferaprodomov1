import type {Variant} from '@/lib/product-families';
import styles from './[slug]/product.module.css';

export default function ClimateDetails({card}:{card:NonNullable<Variant['climate']>}){
  return <section className={styles.panel}>
    <h2>Technické údaje</h2>
    <dl className={styles.facts}>{card.facts.map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
    {card.reasons.length>0&&<><h2>Tři důvody ke koupi</h2><ol className="list-decimal pl-6 space-y-2">{card.reasons.map((v,i)=><li key={i}>{v}</li>)}</ol></>}
    {card.features.length>0&&<><h2>Funkce a výbava</h2><ul className="list-disc pl-6 space-y-2">{card.features.map((v,i)=><li key={i}>{v}</li>)}</ul></>}
    {card.description&&<><h2>Proč zvolit tento model</h2><p className="whitespace-pre-line leading-relaxed">{card.description}</p></>}
  </section>;
}
