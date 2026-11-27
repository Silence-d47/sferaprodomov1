'use client';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import type {Variant} from '@/lib/product-families';
import styles from './[slug]/product.module.css';

function knownOrientation(url:string){
  const match = /^https:\/\/cdn\.sanity\.io\/images\/[^?]+-(\d+)x(\d+)\.[a-z]+(?:\?|$)/i.exec(url);
  return match ? Number(match[1]) > Number(match[2]) : undefined;
}

export default function ProductGallery({images}:{images:Variant['images']}){
  const [verified,setVerified]=useState<string[]>([]);
  const [selected,setSelected]=useState('');
  useEffect(()=>{
    let active=true;
    for(const {url} of images){
      if(knownOrientation(url)!==undefined){continue;}
      const probe=new window.Image();
      probe.onload=()=>{
        if(active && probe.naturalWidth>probe.naturalHeight){
          setVerified(prev=>prev.includes(url)?prev:[...prev,url]);
        }
      };
      probe.src=url;
    }
    return ()=>{active=false;};
  },[images]);
  const gallery=images.filter(({url})=>knownOrientation(url)??verified.includes(url));
  const photo=gallery.find(item=>item.url===selected)??gallery[0];
  if(!photo){return null;}
  return <div className={styles.visual}><figure className={styles.figure}>
    <a href={photo.url} target="_blank" rel="noopener noreferrer">
      <Image src={photo.url} alt={photo.caption} width={1100} height={800} unoptimized priority className={styles.mainPhoto}/>
    </a><figcaption>{photo.caption}</figcaption></figure>
    {gallery.length>1&&<div className={styles.thumbs} aria-label="Fotogalerie">{gallery.map(item=>
      <button type="button" key={item.url} aria-label={item.caption} aria-pressed={photo.url===item.url} onClick={()=>setSelected(item.url)}>
        <Image src={item.url} alt="" width={90} height={68} unoptimized/>
      </button>)}</div>}
  </div>;
}
