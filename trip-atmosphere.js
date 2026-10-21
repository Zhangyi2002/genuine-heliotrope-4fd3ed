'use strict';
(() => {
 const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const running=new Set();
 const play=(element,frames,options)=>{
  if(reduceMotion.matches||!element?.animate)return;
  const animation=element.animate(frames,options);
  running.add(animation);
  animation.finished.catch(()=>{}).finally(()=>running.delete(animation));
 };
 // Content remains visible if animation APIs or scripts are unavailable.
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    entry.target.classList.add('is-arrived');
    play(entry.target,[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,easing:'cubic-bezier(.2,.65,.3,1)'});
    observer.unobserve(entry.target);
   }
  },{threshold:.1});
  document.querySelectorAll('.trip-intro,.travel-divider,.pocket-heading,.pocket-note,.pocket-pause,.trip-album>.section-heading,.postcard,.panorama-section>.page-width,.panorama-section>figure,.trip-route>.section-heading,.route-explorer,.trip-closing').forEach(element=>observer.observe(element));
 }
 const detail=document.querySelector('#route-detail');
 if(detail)new MutationObserver(()=>{
  for(const animation of detail.getAnimations())animation.cancel();
  play(detail,[{opacity:.5},{opacity:1}],{duration:220,easing:'ease-out'});
 }).observe(detail,{childList:true});
 const readingLine=document.querySelector('.reading-line');
 let scheduled=false;
 function updateProgress(){
  scheduled=false;
  const distance=document.documentElement.scrollHeight-innerHeight;
  if(readingLine)readingLine.style.transform=`scaleX(${distance>0?Math.min(1,Math.max(0,scrollY/distance)):0})`;
 }
 function scheduleProgress(){if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress)}}
 addEventListener('scroll',scheduleProgress,{passive:true});
 addEventListener('resize',scheduleProgress,{passive:true});
 addEventListener('load',scheduleProgress,{once:true});
 if('ResizeObserver' in window)new ResizeObserver(scheduleProgress).observe(document.body);
 reduceMotion.addEventListener('change',()=>{if(reduceMotion.matches)for(const animation of running)animation.cancel()});
 updateProgress();
})();
