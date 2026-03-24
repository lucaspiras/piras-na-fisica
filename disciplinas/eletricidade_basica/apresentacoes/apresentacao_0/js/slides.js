let slideHorizontal = 0
let slideVertical = 0
let fragmentoAtual = 0

const stacks = document.querySelectorAll(".presentation > section, .presentation > .stack")
const contador = document.getElementById("contador")
const progressBar = document.getElementById("progress-bar")
const overlay = document.getElementById("overlay")

function getSlidesDoStack(stack){

if(stack.classList.contains("stack")){
return stack.querySelectorAll(".slide")
}

return [stack]

}

function slideAtualElemento(){

const stack = stacks[slideHorizontal]
const slides = getSlidesDoStack(stack)

return slides[slideVertical]

}

function mostrarSlide(){

document.querySelectorAll(".slide").forEach(s=>{
s.classList.remove("ativo")
})

const slide = slideAtualElemento()

slide.classList.add("ativo")

fragmentoAtual = 0

slide.querySelectorAll(".fragment").forEach(f=>{
f.classList.remove("visivel")
})

atualizarUI()

}

function atualizarUI(){

const stack = stacks[slideHorizontal]
const slides = getSlidesDoStack(stack)

contador.textContent =
(slideHorizontal + 1) + "." + (slideVertical + 1)

let progresso = (slideHorizontal + 1) / stacks.length
progressBar.style.width = progresso * 100 + "%"

}

function proximo(){

const stack = stacks[slideHorizontal]
const slides = getSlidesDoStack(stack)

const slide = slides[slideVertical]
const fragments = slide.querySelectorAll(".fragment")

if(fragmentoAtual < fragments.length){

fragments[fragmentoAtual].classList.add("visivel")
fragmentoAtual++

return

}

/* percorre verticais primeiro */

if(slideVertical < slides.length - 1){

slideVertical++
mostrarSlide()
return

}

/* depois vai para horizontal */

if(slideHorizontal < stacks.length - 1){

slideHorizontal++
slideVertical = 0
mostrarSlide()

}

}

function anterior(){

if(slideVertical > 0){

slideVertical--
mostrarSlide()
return

}

if(slideHorizontal > 0){

slideHorizontal--

const stack = stacks[slideHorizontal]
const slides = getSlidesDoStack(stack)

slideVertical = slides.length - 1

mostrarSlide()

}

}

document.addEventListener("keydown", e => {

if(e.key === "ArrowRight" || e.key === " ") proximo()

if(e.key === "ArrowLeft") anterior()

if(e.key === "ArrowDown"){

const stack = stacks[slideHorizontal]

if(stack.classList.contains("stack")){

const slides = getSlidesDoStack(stack)

if(slideVertical < slides.length - 1){

slideVertical++
mostrarSlide()

}

}

}

if(e.key === "ArrowUp"){

if(slideVertical > 0){

slideVertical--
mostrarSlide()

}

}

if(e.key === "f" || e.key === "F"){

document.documentElement.requestFullscreen()

}

if(e.key === "b" || e.key === "B"){

overlay.className = overlay.className === "black" ? "" : "black"

}

if(e.key === "w" || e.key === "W"){

overlay.className = overlay.className === "white" ? "" : "white"

}

if(e.key === "p" || e.key === "P"){

alert("Modo professor em desenvolvimento")

}

})

mostrarSlide()