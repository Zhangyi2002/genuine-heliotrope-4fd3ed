'use strict';
const routeData={
 rail:{name:'GORNERGRAT BAHN / 参考路线 A',stops:[
  {name:'采尔马特',english:'Zermatt',altitude:'山脚小镇',unit:'出发与回到日常的地方',text:'登山火车线从采尔马特出发。山脚下的小镇，让这场关于雪山的旅行有了日常的尺度。',extra:'一条向山而去的观景线，从小镇的尺度开始。'},
  {name:'利菲尔山',english:'Riffelberg',altitude:'沿线经停',unit:'山坡上的观景视角',text:'Riffelberg 是戈尔内格拉特铁路沿途的站点之一。山坡、铁路和远处的山形，让景观从小镇逐渐过渡到高山。',extra:'可以沿登山铁路上下山；湖景步道则是另一段需要单独安排的体验。'},
  {name:'罗滕博登',english:'Rotenboden · Riffelsee 支线',altitude:'湖景支线',unit:'利菲尔湖不在站台上',text:'Rotenboden 是接近利菲尔湖的经典出发站。湖面平静时，可以看到马特洪峰的倒影。',extra:'湖边需要步行到达。十月能否通行、是否结冰及能否见到倒影，取决于实际路况与天气。'},
  {name:'戈尔内格拉特',english:'Gornergrat',altitude:'3,089',unit:'m · 铁路终点站海拔',text:'登山铁路终点站的海拔为 3,089 米。这里以马特洪峰和周围高山的观景视角闻名，适合把视线从单座山峰，放到整个山地景观。',extra:'经典游览内容：观景、辨认群峰，再乘登山火车下山。'}]},
 glacier:{name:'MATTERHORN GLACIER PARADISE / 参考路线 B',stops:[
  {name:'采尔马特',english:'Zermatt',altitude:'山脚小镇',unit:'缆车游览的起点',text:'冰川观景线同样以采尔马特为起点。与登山火车相比，这条线的视觉主题是从山坡逐渐过渡到高山冰雪。',extra:'用另一种交通方式，认识同一片阿尔卑斯山地。'},
  {name:'富里',english:'Furi',altitude:'缆车枢纽',unit:'经典连接站点',text:'Furi 是采尔马特上方的缆车连接点，在冰川游览动线中承担中转角色。',extra:'具体经停与换乘方式随运营安排变化，本页展示的是经典站点关系。'},
  {name:'黑湖',english:'Schwarzsee',altitude:'山景经停',unit:'经典线路的一种经停选择',text:'Schwarzsee 是马特洪峰周边的高山观景地点，可出现在经由黑湖上行的经典缆车动线中。',extra:'经由黑湖的线路与经停安排，以相应时段的实际运营为准。'},
  {name:'特罗克内尔施泰格',english:'Trockener Steg',altitude:'2,939',unit:'m · 站点海拔',text:'这里连接着岩石与冰雪景观，也是继续前往冰川天堂的中转地点。向上行进，景观的尺度逐渐变得开阔。',extra:'可以把这里理解为缆车动线中，从岩石景观走向冰雪世界的连接点。'},
  {name:'马特洪峰冰川天堂',english:'Klein Matterhorn / Glacier Paradise',altitude:'3,883',unit:'m · 小马特洪峰观景区域',text:'这里位于小马特洪峰，经典体验包括观景平台、冰宫和 Cinema Lounge。周边瓦莱州的群峰，也在这里展开另一种辽阔。',extra:'冰川天堂位于小马特洪峰，和马特洪峰主峰是不同地点。观景平台、冰宫与影像展厅，是这里的经典游览项目。'}]}
};
const stationRoot=document.querySelector('#route-stations');
const detailRoot=document.querySelector('#route-detail');
let activeRoute='rail';
function selectStation(index){
 const stop=routeData[activeRoute].stops[index];
 stationRoot.querySelectorAll('button').forEach((button,i)=>{
  button.classList.toggle('active',i===index);
  button.setAttribute('aria-pressed',String(i===index));
 });
 detailRoot.replaceChildren();
 const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=routeData[activeRoute].name;
 const heading=document.createElement('h3');heading.id='route-detail-title';heading.tabIndex=-1;heading.textContent=stop.name;
 const altitude=document.createElement('p');altitude.className='route-altitude';altitude.append(document.createTextNode(stop.altitude));
 const unit=document.createElement('span');unit.textContent=stop.unit;altitude.append(unit);
 const text=document.createElement('p');text.textContent=stop.text;
 const extra=document.createElement('div');extra.className='route-extra';extra.textContent=stop.extra;
 detailRoot.append(eyebrow,heading,altitude,text,extra);
}
function renderRoute(key){
 activeRoute=key;stationRoot.replaceChildren();
 routeData[key].stops.forEach((stop,index)=>{
  const button=document.createElement('button');button.className='station-button';button.type='button';
  button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls','route-detail');
  button.setAttribute('aria-label','查看'+stop.name+'站点介绍');
  const dot=document.createElement('span');dot.className='station-dot';dot.textContent=String(index+1).padStart(2,'0');
  const label=document.createElement('span');label.className='station-name';label.append(document.createTextNode(stop.name));
  const english=document.createElement('small');english.textContent=stop.english;label.append(english);
  const arrow=document.createElement('span');arrow.className='station-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↓';
  button.append(dot,label,arrow);button.addEventListener('click',()=>selectStation(index));stationRoot.append(button);
 });
 document.querySelectorAll('.route-choice').forEach(button=>{
  const active=button.dataset.route===key;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
 });
 selectStation(key==='rail'?3:4);
}
document.querySelectorAll('.route-choice').forEach(button=>button.addEventListener('click',()=>renderRoute(button.dataset.route)));renderRoute('rail');
const photos=[
 {id:'cover',src:'matterhorn.jpg',title:'马特洪峰的轮廓',alt:'从利菲尔湖附近望向马特洪峰',credit:'Mark Slomkowski / Unsplash'},
 {id:'lake',src:'riffelsee.jpg',title:'山的另一半，在水里。',alt:'马特洪峰在利菲尔湖中的倒影',credit:'Robert Richarz / Unsplash'},
 {id:'train',src:'railway.jpg',title:'沿着铁轨，向山靠近。',alt:'戈尔内格拉特雪地上的登山火车',credit:'Michael Lammli / Unsplash'},
 {id:'village',src:'zermatt.jpg',title:'山脚下，也有生活。',alt:'采尔马特小镇的河流与马特洪峰',credit:'Teddy Hartanto / Unsplash'},
 {id:'glacier',src:'gornergrat-panorama.jpg',title:'把视野，再打开一点。',alt:'戈尔内格拉特天文台与马特洪峰的雪景',credit:'Christian Buergi / Pexels'},
 {id:'window',src:'train-window.jpg',title:'靠窗的位置，永远加分。',alt:'瑞士列车车窗外的山景与铁轨',credit:'Austris Augusts / Unsplash'},
 {id:'street',src:'street-walk.jpg',title:'这条小路，也想走走。',alt:'采尔马特的木屋、街道与行人',credit:'Daniele La Rosa Messina / Unsplash'},
 {id:'coffee',src:'../cafe.jpg',title:'先喝点热的，再说。',alt:'吧台上正在制作的手冲咖啡',credit:'Unsplash'},
 {id:'cafe',src:'mountain-cafe.jpg',title:'景色这么好，坐着也算在旅行。',alt:'马特洪峰附近的山间露台与游客',credit:'Pexels · Scenic View of Matterhorn from Mountain Café'}

];
const photoDialog=document.querySelector('#photo-dialog');let photoIndex=0;let photoOpener=null;
function showPhoto(index){photoIndex=(index+photos.length)%photos.length;const photo=photos[photoIndex];const image=document.querySelector('#photo-full');image.src='/assets/travel/'+photo.src;image.alt=photo.alt;document.querySelector('#photo-dialog-title').textContent=photo.title;document.querySelector('#photo-counter').textContent=String(photoIndex+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0');document.querySelector('#photo-attribution').textContent=photo.credit;photoDialog.scrollTop=0}
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{photoOpener=button;showPhoto(photos.findIndex(photo=>photo.id===button.dataset.photo));photoDialog.showModal();document.body.classList.add('modal-open')}));
document.querySelector('#photo-close').addEventListener('click',()=>photoDialog.close());document.querySelector('#photo-prev').addEventListener('click',()=>showPhoto(photoIndex-1));document.querySelector('#photo-next').addEventListener('click',()=>showPhoto(photoIndex+1));
photoDialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();showPhoto(photoIndex+1)}if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(photoIndex-1)}});
photoDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');photoOpener?.focus({preventScroll:true})});photoDialog.addEventListener('click',event=>{if(event.target!==photoDialog)return;const rect=photoDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)photoDialog.close()});
