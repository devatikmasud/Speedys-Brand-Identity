const header=document.getElementById('siteHeader');
const nav=document.getElementById('nav');
const menuBtn=document.getElementById('menuBtn');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
menuBtn?.addEventListener('click',()=>{nav.classList.toggle('mobile-open');menuBtn.classList.toggle('active')});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('mobile-open');menuBtn.classList.remove('active')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const modal=document.getElementById('videoModal');
const openModal=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');const v=modal.querySelector('video');v.currentTime=0;v.play().catch(()=>{})};
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');const v=modal.querySelector('video');v.pause()};
document.getElementById('videoTrigger')?.addEventListener('click',openModal);
document.getElementById('videoBig')?.addEventListener('click',()=>{const v=document.getElementById('storeVideo');v.paused?v.play():v.pause()});
document.getElementById('modalClose')?.addEventListener('click',closeModal);document.getElementById('modalX')?.addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.querySelectorAll('.pin').forEach((pin,i)=>pin.addEventListener('click',()=>{pin.animate([{transform:'rotate(-45deg) scale(1)'},{transform:'rotate(-45deg) scale(1.28)'},{transform:'rotate(-45deg) scale(1)'}],{duration:450});document.getElementById('locationMessage').textContent=`Speedy's demo location ${i+1} selected. Connect live location data for production.`}));
document.getElementById('searchLocation')?.addEventListener('click',()=>{const val=document.getElementById('zip').value.trim();document.getElementById('locationMessage').textContent=val?`Searching Speedy's locations near “${val}”…`:'Enter a city, state or ZIP to search.'});

const announcement=document.getElementById('announcementClose')?.parentElement;
setTimeout(()=>announcement?.classList.add('show'),900);
document.getElementById('announcementClose')?.addEventListener('click',()=>announcement?.remove());
const newsletterForm=document.getElementById('newsletterForm');
newsletterForm?.addEventListener('submit',e=>{e.preventDefault();const m=document.getElementById('newsletterMsg');m.textContent='Thanks — you’re on the Speedy’s list. Connect this form to your email service in production.';newsletterForm.reset()});
window.addEventListener('scroll',()=>{const y=scrollY;document.querySelector('.hero-media')?.style.setProperty('transform',`translateY(${Math.min(y*.08,35)}px)`);},{passive:true});

// Active section navigation
const sectionLinks=[...document.querySelectorAll('.nav a')];
const tracked=[...document.querySelectorAll('main section[id]')];
const activeObs=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){sectionLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}
}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
tracked.forEach(s=>activeObs.observe(s));

// Premium pointer glow on desktop cards
if(matchMedia('(pointer:fine)').matches){
 document.querySelectorAll('.feature-card,.service,.application,.principle').forEach(card=>{
   card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`)});
 });
}


// Google Maps embed — no API key required
(function(){
  const input = document.getElementById('zip');
  const button = document.getElementById('searchLocation');
  const iframe = document.getElementById('googleMap');
  const open = document.getElementById('mapOpen');
  const msg = document.getElementById('locationMessage');
  if(!input || !button || !iframe) return;
  function updateMap(){
    const q = input.value.trim() || "Speedy's Gas Station";
    const encoded = encodeURIComponent(q + (q.toLowerCase().includes('speedy') ? '' : " Speedy's Gas Station"));
    iframe.src = `https://www.google.com/maps?q=${encoded}&output=embed`;
    if(open) open.href = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
    if(msg) msg.textContent = `Showing Google Maps results for “${q}”.`;
  }
  button.addEventListener('click', updateMap);
  input.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); updateMap(); }});
})();
