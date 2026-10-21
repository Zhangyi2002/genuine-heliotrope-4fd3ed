'use strict';
const stories={
 morning:{category:'日常 / SLOW LIVING',title:'一个不赶时间的早晨',image:'cafe.jpg',alt:'一杯咖啡的温暖日常',paragraphs:['有些早晨，适合把日程表放远一点。打开窗，让空气先走进来。等一壶水烧开，磨一点咖啡，再给自己找个有光的位置。','不需要很特别的安排。一杯热饮，一小段阅读，或是什么也不做。慢下来的意义，也许就是重新看见那些一直在身边、却常被忽略的事。','如果要给这样的早晨留一句话，那就是：今天，先好好开始。']},
 walk:{category:'漫游 / WANDERING',title:'向有树的地方走去',image:'forest.jpg',alt:'阳光下的树林',paragraphs:['出门的时候，不一定要想好去哪里。沿着有树荫的那一边走，看树叶的颜色，看一片光是怎样落在地上的。','少看一会儿屏幕，就多了一点余地听见脚步声。路边的一间小店，转角的旧门，都是平时赶路时错过的细节。','散步不必有什么收获。带着一点风回家，也很好。']},
 paper:{category:'片刻 / LITTLE RITUALS',title:'把思绪还给纸张',image:'journal.jpg',alt:'桌面上的书写与记录',paragraphs:['纸张有一种让人慢下来的力量。写字的速度跟不上思绪，于是我们开始挑选：今天，究竟有什么值得留下？','可以记下吃到的味道、路上听见的一句话，或只是描画窗外树枝的轮廓。没有人来打分，也不需要有完整的开头和结尾。','等过些日子再翻开，那些原本以为会忘记的小事，就有了重新被看见的机会。']},
 book:{category:'偏爱 / 阅读',title:'一本可以随时翻开的书',image:'books.jpg',alt:'安静的书架',paragraphs:['有一类书，不一定按顺序读。从中间翻开，读一两页，也可以度过很好的十分钟。','把这里留给你真正喜欢的一本书：写下书名、作者，再抄下让你停顿的一句话。比起一份长长的书单，一个具体的喜欢，往往更能让人认识你。']},
 film:{category:'偏爱 / 影像',title:'一部适合雨天重看的电影',image:'journal.jpg',alt:'适合安静停留的桌面',paragraphs:['有时重看一部电影，是为了回到它带来的某一种心情。熟悉的镜头和对白，让一个雨天也有了自己的节奏。','这里可以收藏你的私人片单：一部电影、一帧喜欢的画面，以及你为什么愿意再看一次。']},
 cup:{category:'偏爱 / 器物',title:'一只握起来刚好的杯子',image:'cafe.jpg',alt:'一杯温热的咖啡',paragraphs:['喜欢的器物，常常不是因为多么特别，而是每天都想拿起来用。杯沿的弧度、手里的重量、表面的一点纹理，慢慢成了生活的一部分。','这里可以放那只一直陪着你的杯子。拍一张照片，说说它从哪里来，或者只是记下它陪你喝过什么。']},
 music:{category:'偏爱 / 声音',title:'留给傍晚的背景音乐',paragraphs:['傍晚适合一些不催促人的声音。整理房间、做一顿简单的饭，让旋律轻轻待在身边。','这里可以留给你的一张专辑，或一份私人歌单。写下最适合听它的时刻，比任何曲风标签都更有画面。']},
 magazine:{category:'偏爱 / 阅读',title:'舍不得扔掉的旧杂志',image:'books.jpg',alt:'纸本阅读的收藏',paragraphs:['有的杂志，即使已经读完，也会放在伸手可及的地方。偶尔翻开，为了一张照片、一种排版，或一种关于生活的想象。','这片位置可以放你的纸本收藏。慢慢积累下来，书架也会成为一份关于自己的审美记录。']},
 light:{category:'偏爱 / 器物',title:'只照亮一小块地方的灯',paragraphs:['一盏小灯，会给房间划出一个安静的角落。不需要照亮所有地方，只让眼前的书页和桌面清楚起来。','这里可以记录一件让你觉得舒服的物品：它不必昂贵，也不必有名。它在你的生活里，刚好。']}
};
const dialog=document.querySelector('#reading-dialog');
const content=document.querySelector('#reading-content');
let lastOpener=null;
document.querySelectorAll('[data-story]').forEach(button=>button.addEventListener('click',()=>{
 const story=stories[button.dataset.story];if(!story)return;lastOpener=button;
 content.replaceChildren();const category=document.createElement('p');category.className='reading-category';category.textContent=story.category;content.append(category);
 const title=document.createElement('h2');title.id='reading-title';title.textContent=story.title;content.append(title);
 if(story.image){const img=document.createElement('img');img.src='assets/'+story.image;img.alt=story.alt;img.className='reading-image';content.append(img)}
 const body=document.createElement('div');body.className='reading-body';story.paragraphs.forEach(text=>{const p=document.createElement('p');p.textContent=text;body.append(p)});content.append(body);
 dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastOpener?.focus({preventScroll:true})});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});
 document.querySelectorAll('.favorite').forEach(item=>item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter);
}));
document.querySelector('#year').textContent=String(new Date().getFullYear());
