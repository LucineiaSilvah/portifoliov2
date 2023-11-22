const botao = document.querySelector('.fa-jet-fighter-up');
const corpo = document.querySelector('html')

document.addEventListener('scroll', vereficar)

function vereficar(){
  if(scrollY > 350){
    botao.style.visibility = 'visible'
  }else{
    botao.style.visibility = 'hidden'
  }
}


botao.addEventListener('click',()=>{
  window.scrollTo({
    top:50,
    behavior:"smooth"
  })
})

let menu = document.querySelector('.fa-bars');
menu.addEventListener('click', ()=>{
  let menuLista = document.querySelector('.menu__lista')
  menuLista.classList.toggle('mostrarMenu');
  
})

let modo = document.getElementById('mode')
 
   modo.addEventListener('click', ()=> {
   document.querySelector('.container').classList.toggle('white')

  



 })