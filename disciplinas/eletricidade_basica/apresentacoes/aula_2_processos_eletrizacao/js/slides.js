let slideAtual = 0
let fragmentoAtual = 0

const slides = document.querySelectorAll(".slide")
const contador = document.getElementById("contador")
const progressBar = document.getElementById("progress-bar")

function atualizarUI(){

contador.textContent = (slideAtual + 1) + " / " + slides.length

let progresso = ((slideAtual+1)/slides.length)*100
progressBar.style.width = progresso + "%"

}

function mostrarSlide(n){

slides.forEach(slide=>{
slide.classList.remove("ativo")
})

fragmentoAtual = 0

const slide = slides[n]

slide.classList.add("ativo")

const fragments = slide.querySelectorAll(".fragment")

fragments.forEach(f=>{
f.classList.remove("visivel")
})

atualizarUI()

}

function proximo(){

const slide = slides[slideAtual]

const fragments = slide.querySelectorAll(".fragment")

if(fragmentoAtual < fragments.length){

fragments[fragmentoAtual].classList.add("visivel")

fragmentoAtual++

return

}

if(slideAtual < slides.length - 1){

slideAtual++
mostrarSlide(slideAtual)

}

}

function anterior(){

if(slideAtual > 0){

slideAtual--
mostrarSlide(slideAtual)

}

}

document.addEventListener("keydown", e => {

if(e.key === "ArrowRight" || e.key === " "){
proximo()
}

if(e.key === "ArrowLeft"){
anterior()
}

if(e.key === "f" || e.key === "F"){
document.querySelector(".presentation").requestFullscreen()
}

})

mostrarSlide(0)