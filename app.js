const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
if(menu&&nav){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('is-open');
    menu.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded','false');
  }));
  window.addEventListener('resize',()=>{
    if(window.innerWidth>1000){
      nav.classList.remove('is-open');
      menu.setAttribute('aria-expanded','false');
    }
  });
}
document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();
  alert('お問い合わせありがとうございます。公開前に送信先を接続してください。');
}));