'use strict';
const memes = [
  {num:'01',name:'Paw Cloudship',category:'Sky & Wonder',src:'assets/gallery_01.webp',desc:'PAWCAT takes to the clouds in a tiny floating ship.'},
  {num:'02',name:'Paw Express',category:'Adventure',src:'assets/gallery_02.webp',desc:'All aboard the train with a cat inside its paw emblem.'},
  {num:'03',name:'Paw Shrine',category:'Worlds',src:'assets/gallery_03.webp',desc:'A peaceful paw sanctuary beneath the cherry blossoms.'},
  {num:'04',name:'Paw Ocean',category:'Worlds',src:'assets/gallery_04.webp',desc:'An undersea kingdom built around the sacred paw.'},
  {num:'05',name:'Paw Island',category:'Adventure',src:'assets/gallery_05.webp',desc:'Treasure, palm trees, a pirate ship, and one giant paw.'},
  {num:'06',name:'Paw Moon',category:'Cosmos',src:'assets/gallery_06.webp',desc:'Even the moon gets a paw print.'},
  {num:'07',name:'Paw Library',category:'Worlds',src:'assets/gallery_07.webp',desc:'Every story begins with a cat and a good book.'},
  {num:'08',name:'Paw Mountain',category:'Adventure',src:'assets/gallery_08.webp',desc:'A mountain with four peaks and one unforgettable cat.'},
  {num:'09',name:'Paw Carnival',category:'Community',src:'assets/gallery_09.webp',desc:'The carnival is open. Everyone is welcome.'},
  {num:'10',name:'Paw Ramen Night',category:'Community',src:'assets/gallery_10.webp',desc:'A hot bowl and a warm paw for everyone.'},
  {num:'11',name:'Paw Parade',category:'Community',src:'assets/gallery_11.webp',desc:'A city-wide celebration of PAWCAT.'},
  {num:'12',name:'Paw Universe',category:'Cosmos',src:'assets/gallery_12.webp',desc:'An entire galaxy fits inside a single white paw.'}
];
let currentFilter='All', currentIdx=0, visible=memes.slice(), previousFocus=null, toastTimer;
const $=id=>document.getElementById(id);
const grid=$('galleryGrid'), dialog=$('lightbox');
function safeText(str){return String(str).replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}
function drawGallery(){
  visible = currentFilter==='All'?memes.slice():memes.filter(m=>m.category===currentFilter);
  grid.innerHTML=visible.map((m,i)=>`<button class="meme-card reveal show" type="button" data-index="${i}" aria-label="View ${safeText(m.name)} full image"><span class="meme-image"><img src="${m.src}" alt="${safeText(m.desc)}" loading="lazy" width="1300" height="1300" /></span><span class="meme-num">${m.num} / 12</span><span class="meme-caption"><span>${safeText(m.name)}</span><span class="caption-arrow" aria-hidden="true">↗</span></span><span class="meme-category">${safeText(m.category)}</span></button>`).join('');
  grid.querySelectorAll('.meme-card').forEach(b=>b.addEventListener('click',()=>openModal(Number(b.dataset.index),b)));
}
function openModal(idx,source){currentIdx=(idx+visible.length)%visible.length;previousFocus=source||document.activeElement;updateModal(); if(!dialog.open)dialog.showModal();}
function updateModal(){const m=visible[currentIdx];$('lightImage').src=m.src;$('lightImage').alt=m.desc;$('lightTitle').textContent=m.name;$('lightCat').textContent=m.desc;$('lightCount').textContent=`FIG. ${m.num} / ${String(visible.length).padStart(2,'0')} — PAWCAT ARCHIVE`;$('downloadImage').href=m.src;$('downloadImage').download=`PAWCAT_${m.num}_${m.name.replaceAll(' ','_')}.webp`}
function closeModal(){dialog.close();if(previousFocus?.focus)previousFocus.focus()}
$('closeModal').addEventListener('click',closeModal);
$('prevImage').addEventListener('click',()=>{currentIdx=(currentIdx+visible.length-1)%visible.length;updateModal()});
$('nextImage').addEventListener('click',()=>{currentIdx=(currentIdx+1)%visible.length;updateModal()});
dialog.addEventListener('click',e=>{if(e.target===dialog)closeModal()});
dialog.addEventListener('close',()=>{if(previousFocus?.focus)previousFocus.focus()});
document.addEventListener('keydown',e=>{if(!dialog.open)return;if(e.key==='ArrowLeft')$('prevImage').click();else if(e.key==='ArrowRight')$('nextImage').click()});
$('filters').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{currentFilter=b.dataset.filter;$('filters').querySelectorAll('button').forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))});drawGallery()}));
$('surpriseBtn').addEventListener('click',()=>openModal(Math.floor(Math.random()*visible.length),$('surpriseBtn')));
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2800)}
$('copyBtn').addEventListener('click',async()=>{
 const str=$('contractText').textContent.trim();
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(str)}else{const a=document.createElement('textarea');a.value=str;a.style.position='fixed';a.style.opacity='0';document.body.append(a);a.select();const success=document.execCommand('copy');a.remove();if(!success)throw new Error('Clipboard unavailable')}toast(str==='Coming Soon..'?'Copied placeholder — contract not live yet':'Contract address copied')}catch{toast('Clipboard unavailable. Address is Coming Soon..')}
});
const menu=$('menuBtn'),mob=$('mobileNav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mob.hidden=!open;document.body.classList.toggle('menu-open',open)});
mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mob.hidden=true;menu.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}));
const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
if(!reduce&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}})},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('show'))}
const progress=$('readingProgress');let ticking=false;window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?(scrollY/max*100):0}%`;ticking=false});ticking=true}},{passive:true});
drawGallery();
