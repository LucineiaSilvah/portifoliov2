const botao = document.querySelector('.fa-jet-fighter-up');
const corpo = document.querySelector('html')
const projetosBase = '/src/db.json'
document.addEventListener('scroll', vereficar)
const plus = document.getElementById('plus')
const lista = document.getElementById('lista')
const mode = document.getElementById('theme')


theme.addEventListener('click',()=>{
  document.body.classList.toggle('dark')
})

fetch(projetosBase).then(res=> res.json()).then(projetos =>{
 
  console.log(projetos[1].plus);
  projetos[0].destaque.forEach(projeto => {
   lista.innerHTML += `

 <li class="experiencias__card">
 <img
   class="experiencias__imagem"
   src="${projeto.imagem}"
   alt=""
 />
 <div class="experiencias__info">
   <p class="titulo">${projeto.titulo}</p>
   <p class="descricao">${projeto.descricao}</p>
   <p class="tech">${projeto.tech}</p>
   <div class="experiencias__botaoes">
     <button class="experiencias__botao">
       <a class="repo"
         href="${projeto.repo}"
         target="_blank"
         rel="noopener noreferrer"
         >Repositorio</a
       >
     </button>
     <button class="experiencias__botao experiencias__botao--demo">
       <a
         class="demo"
         href="${projeto.demo}"
         target="_blank"
         rel="noopener noreferrer"
         >Ver demo</a
       >
     </button>
   </div>
 </div>
</li>

  
   `
  });
 
})

fetch(projetosBase).then(res=> res.json()).then(projetos =>{
 projetos[1].plus.forEach(projeto =>{
  plus.innerHTML += `

  <li class="experiencias__card">
  <img
    class="experiencias__imagem"
    src="${projeto.imagem}"
    alt=""
  />
  <div class="experiencias__info">
    <p class="titulo">${projeto.titulo}</p>
    <p class="descricao">${projeto.descricao}</p>
    <p class="tech">${projeto.tech}</p>
    <div class="experiencias__botaoes">
      <button class="experiencias__botao">
        <a class="repo"
          href="${projeto.repo}"
          target="_blank"
          rel="noopener noreferrer"
          >Repositorio</a
        >
      </button>
      <button class="experiencias__botao experiencias__botao--demo">
        <a
          class="demo"
          href="${projeto.demo}"
          target="_blank"
          rel="noopener noreferrer"
          >Ver demo</a
        >
      </button>
    </div>
  </div>
 </li>
 `
 })
})
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



