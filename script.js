const L=[["Sobhapoti (President)","Mo: Arefin Ahmmed Arnob","crown"],["Soha-Sobhapoti (Vice President)","MD. Mahim Ahmed","star"],["Sompadok (General Secretary)","Mushfiq Alam Tasin","pen"],["Jugmo Sadharon Sompadok","Mridul Kumar Sikder","pen"],["Sangothonik Sompadok","Mohammad Asif","users"],["Doptor Sompadok","Mo: Robiul Mostofa","file"],["Up Doptor Sompadok","Jabid Hasan","file"],["Prochar Sompadok","Mushfiq Bin Habib","mega"],["Upo-Prochar Sompadok","Halima Tuj Sadia","mega"],["Ortho Bishoyok Sompadok","Tithi Debnath","coin"]];
const S=[["Apyayon Sompadok","Khatune Jannat Fatima","heart"],["Upo Apyayon Sompadok","Kazi Tahsin Miti","heart"],["Chhatri Bishoyok Sompadok","Songjukta Singho Joti","cap"],["Karjo Nirbahi Sodosso 1","Sha Poran Hasan Shuvo","users"],["Karjo Nirbahi Sodosso 2","Sadman Sakib","users"],["Karjo Nirbahi Sodosso 3","Yeashin Arafat Shifat","users"],["Upodeshta 1","Tahsin Afsar Adib","users"],["Upodeshta 2","Rubayet Islam Mahi","users"],["Upodeshta 3","Ashpaun Alvi","users"],["Law Bishoyok Sompadok","Md.Aswad Karim Ifrad","scale"],["Biggan o Projukti Bishoyok Sompadok","Oindrila Haldar Oishi","chip"],["Proshikkhon Bishoyok Sompadok","Juariar Rahman Rafi","cap"],["Bibaho Nidhon Sompadok","[TBD]","heart"]];
const P={crown:'<path d="M3 18h18l-1.5-10-4.5 4-3-6-3 6-4.5-4z"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',pen:'<path d="M12 20h9"/><path d="M16.5 3.5l4 4L8 20l-5 1 1-5z"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6"/><path d="M17 7a3.5 3.5 0 1 1 0 7"/><path d="M22 21c0-3.5-2.3-5.2-5.5-5.8"/>',file:'<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/>',mega:'<path d="M5 12h4l2-5 2 5h6"/><path d="M4 16h16"/><path d="M8 15l-2 4M16 15l2 4"/>',heart:'<path d="M12 21s-8.5-5-8.5-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 9 3c0 6-8.5 11-8.5 11z"/>',cap:'<path d="M3 11h18l-2 9H5z"/><path d="M6 11V8a6 6 0 0 1 12 0v3"/>',coin:'<circle cx="12" cy="12" r="8"/><path d="M12 7v10M7 12h10"/>',scale:'<path d="M3 18h18"/><path d="M7 18V8l5-5 5 5v10"/><path d="M12 13v5"/><path d="M9 13h6"/>'};
const svg=(k,s=18)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[k]}</svg>`;
const ini=n=>n.replace(/[\[\]]/g,'').replace(/^(Mo:|Mu\.)\s*/,'').split(' ').map(w=>w[0]).slice(0,2).join('');
const memberImages={
  'Mo: Arefin Ahmmed Arnob':'arnob.jpg',
  'MD. Mahim Ahmed':'main.jpeg',
  'Jabid Hasan':'jabid.jpg',
  'Tithi Debnath':'tithi.jpg',
  'Kazi Tahsin Miti':'miti.jpg',
  'Songjukta Singho Joti':'joti.jpg',
  'Sha Poran Hasan Shuvo':'shuvo.jpg',
  'Tahsin Afsar Adib':'adib.jpg',
  'Rubayet Islam Mahi':'mahi.jpg',
  'Ashpaun Alvi':'alvi.jpg',
  'Mushfiq Alam Tasin':'tasin.jpg',
  'Md.Aswad Karim Ifrad':'ifrad.jpg',
  'Oindrila Haldar Oishi':'oishi.jpg',
  'Juariar Rahman Rafi':'rafi.jpg'
};
const members=[...L,...S].map(([r,n,i],x)=>({id:x,role:r,name:n,icon:i,paid:false,pen:0,date:'',image:memberImages[n]?`assects/${memberImages[n]}`:''}));
let st={};try{st=JSON.parse(localStorage.getItem('cks-fees')||'{}')}catch(e){}
const BASE=members.length;
const ld=k=>{try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}};
let pending=ld('cks-pending');
ld('cks-extra').forEach(x=>members.push({id:members.length,role:'Member · '+x.dept,name:x.name,icon:'users',paid:false,pen:0,date:'',x}));
members.forEach(m=>{if(st[m.id])Object.assign(m,st[m.id])});
const save=()=>{try{localStorage.setItem('cks-fees',JSON.stringify(Object.fromEntries(members.map(m=>[m.id,{paid:m.paid,pen:m.pen,date:m.date}]))))}catch(e){}};
const photos={};
const photoStatus=document.getElementById('photoStatus');
const PHOTO_DB='cks-member-photos';
const PHOTO_STORE='photos';
const photoDb=new Promise((resolve,reject)=>{
  const request=indexedDB.open(PHOTO_DB,1);
  request.onupgradeneeded=()=>request.result.createObjectStore(PHOTO_STORE,{keyPath:'id'});
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error||new Error('Could not open the photo database.'));
});
const card=(m,lead)=>{const image=photos[m.id]||m.image;return `<div class="card${lead?' lead':''}"><span class="ico">${svg(m.icon)}</span><div class="av" data-id="${m.id}" role="button" tabindex="0" aria-label="${image?'Change':'Add'} photo for ${m.name}">${image?`<img src="${image}" alt="">`:ini(m.name)}</div><h3 class="${m.name==='[TBD]'?'tbd':''}">${m.name==='[TBD]'?'To be announced':m.name}</h3><div class="role">${m.role}</div></div>`};
function drawCards(){document.getElementById('lead').innerHTML=members.slice(0,10).map(m=>card(m,1)).join('');document.getElementById('spec').innerHTML=members.slice(10,BASE).map(m=>card(m)).join('')}
async function loadPhotos(){
  try{
    const db=await photoDb;
    const records=await new Promise((resolve,reject)=>{
      const request=db.transaction(PHOTO_STORE,'readonly').objectStore(PHOTO_STORE).getAll();
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(request.error||new Error('Could not load saved photos.'));
    });
    records.forEach(({id,blob})=>{photos[id]=URL.createObjectURL(blob)});
    drawCards();
  }catch(error){
    photoStatus.textContent=`Could not load saved photos: ${error.message}`;
    photoStatus.classList.add('photo-error');
    console.error('Could not load saved member photos.',error);
  }
}
function savePhoto(db,id,blob){
  return new Promise((resolve,reject)=>{
    const transaction=db.transaction(PHOTO_STORE,'readwrite');
    transaction.objectStore(PHOTO_STORE).put({id,blob});
    transaction.oncomplete=resolve;
    transaction.onerror=()=>reject(transaction.error||new Error('Could not save the photo.'));
    transaction.onabort=()=>reject(transaction.error||new Error('Photo saving was cancelled.'));
  });
}
const pick=document.createElement('input');pick.type='file';pick.accept='image/*';let cur=null;
pick.onchange=async()=>{
  const file=pick.files[0];
  if(!file)return;
  try{
    if(!file.type.startsWith('image/'))throw new Error('Choose an image file.');
    const db=await photoDb;
    await savePhoto(db,cur,file);
    if(photos[cur])URL.revokeObjectURL(photos[cur]);
    photos[cur]=URL.createObjectURL(file);
    drawCards();
    photoStatus.textContent='Photo saved in this browser.';
    photoStatus.classList.remove('photo-error');
  }catch(error){
    photoStatus.textContent=`Could not save photo: ${error.message}`;
    photoStatus.classList.add('photo-error');
    console.error('Could not save member photo.',error);
  }finally{
    pick.value='';
  }
};
document.addEventListener('click',e=>{const a=e.target.closest('.av');if(a){cur=a.dataset.id;pick.value='';pick.click()}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList.contains('av'))e.target.click()});

let filter='all',admin=false;
const fmt=d=>d?new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'—';
function drawRows(){
  const list=members.filter(m=>m.name!=='[TBD]'&&(filter==='all'||(filter==='paid'&&m.paid)||(filter==='unpaid'&&!m.paid)||(filter==='pen'&&m.pen>0)));
  document.getElementById('rows').innerHTML=list.length?list.map(m=>`<tr><td><b>${m.name}</b></td><td>${m.role}</td><td>${admin?`<button class="chip" data-t="${m.id}">${m.paid?'Mark unpaid':'Mark paid'}</button>`:m.paid?'<span class="paid">Paid</span>':'<span class="unpaid">Unpaid</span>'}</td><td><span class="tick${m.paid?' on':''}" aria-label="${m.paid?'Paid':'Not paid'}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></span></td><td>${admin?`৳<input type="number" min="0" step="10" value="${m.pen}" data-p="${m.id}" aria-label="Penalty for ${m.name}">`:`<span class="${m.pen?'pen':''}">৳${m.pen}</span>`}</td><td>${fmt(m.date)}</td></tr>`).join(''):'<tr><td colspan="6" class="empty">No members match this filter. Try “All”.</td></tr>';
  const real=members.filter(m=>m.name!=='[TBD]');
  sPaid.textContent=real.filter(m=>m.paid).length;sUnpaid.textContent=real.filter(m=>!m.paid).length;sPen.textContent='৳'+real.reduce((a,m)=>a+m.pen,0);
}
document.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{filter=b.dataset.f;document.querySelectorAll('[data-f]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawRows()});

rows.addEventListener('click',e=>{const t=e.target.closest('[data-t]');if(!t)return;const m=members[t.dataset.t];m.paid=!m.paid;m.date=m.paid?new Date().toISOString().slice(0,10):'';save();drawRows()});
rows.addEventListener('change',e=>{const p=e.target.dataset.p;if(p===undefined)return;members[p].pen=Math.max(0,+e.target.value||0);save();drawRows()});
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const saveX=()=>{try{localStorage.setItem('cks-extra',JSON.stringify(members.slice(BASE).map(m=>m.x)));localStorage.setItem('cks-pending',JSON.stringify(pending))}catch(e){}};
function drawPend(){const p=$('pend');p.hidden=!admin;if(!admin)return;p.innerHTML=`<h3 class="disp">Join requests (${pending.length})</h3>`+(pending.length?pending.map((a,i)=>`<div class="req"><div><b>${esc(a.name)}</b><br><span class="role">Intake ${esc(a.intake)} · Section ${esc(a.section)} · ${esc(a.dept)} · ${esc(a.phone)}</span></div><div class="row2"><button class="chip" data-a="${i}">Approve</button><button class="chip" data-r="${i}">Reject</button></div></div>`).join(''):'<p class="sub">No pending requests.</p>')}
$('pend').addEventListener('click',e=>{const a=e.target.dataset.a,r=e.target.dataset.r;if(a!==undefined){const x=pending.splice(+a,1)[0];members.push({id:members.length,role:'Member · '+x.dept,name:x.name,icon:'users',paid:false,pen:0,date:'',x})}else if(r!==undefined)pending.splice(+r,1);else return;saveX();drawPend();drawRows()});
adm.onclick=()=>{if(admin){admin=false;adm.textContent='Admin login';drawRows();drawPend()}else{$('lerr').textContent='';$('dLogin').showModal()}};
$('fLogin').onsubmit=e=>{e.preventDefault();if($('u').value.trim()==='chirokumar'&&$('pw').value==='chirokumar420'){admin=true;adm.textContent='Admin logout';$('dLogin').close();e.target.reset();drawRows();drawPend()}else $('lerr').textContent='Wrong username or password.'};
$('fJoin').onsubmit=e=>{e.preventDefault();pending.push(Object.fromEntries(new FormData(e.target)));saveX();e.target.reset();$('jmsg').textContent='Request sent. An admin will approve or reject it.';drawPend()};
$('bJoin').onclick=()=>{$('jmsg').textContent='';$('dJoin').showModal()};
$('bRules').onclick=()=>$('dRules').showModal();
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
drawCards();loadPhotos();drawRows();
