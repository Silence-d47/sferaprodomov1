import {notFound} from 'next/navigation';
import {climateVariant} from '@/lib/climate-catalog';

import ProductDetail from '../../[slug]/product-detail';

type Props={params:Promise<{id:string}>};
export async function generateMetadata({params}:Props){
  const v=await climateVariant((await params).id);
  if(!v?.climate){return {};}
  return {title:[v.climate.brand,v.series,v.model,'| Sfera pro domov'].join(' '),description:v.climate.description.slice(0,170)};
}
export default async function Page({params}:Props){
  const v=await climateVariant((await params).id);
  if(!v?.climate){notFound();}
  return <ProductDetail variants={[v]} defaultId={v.id}/>;
}
