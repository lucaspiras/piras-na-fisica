# Refatoração - Simulador de Movimento

## 📋 Resumo das Mudanças

O código do simulador de movimento foi completamente refatorado para um **padrão modular usando ES6 modules**. Isso melhora a organização, manutenibilidade e reutilização de código.

## 🎯 Objetivos Alcançados

✅ **Eliminada duplicação de código**
- `parseEquation()` agora em um único módulo (`engine/mathparser.js`)
- `Object2D` class em arquivo dedicado (`engine/object2D.js`)

✅ **Modularização da aplicação**
- Separação de responsabilidades em módulos especializados
- Fácil manutenção e adição de novas funcionalidades

✅ **Funções controladas em múltiplos arquivos**
- `ui/sidebar.js` gerencia entrada de dados e checkboxes
- `ui/controls.js` gerencia controles de tempo e cenários
- `engine/` contém lógica de negócio reutilizável

## 📁 Estrutura de Pastas

```
Programas/simulador_movimento/
├── main.js                          # Orquestrador principal
├── movimento.html                   # HTML
├── style.css                        # Estilos
├── engine/                          # Módulos reutilizáveis
│   ├── mathparser.js               # Parsing de equações
│   ├── object2D.js                 # Classe Object2D
│   ├── time.js                     # Gerenciamento de tempo
│   ├── renderer.js                 # Renderização (grid, vetores)
│   └── vectors.js                  # (Reservado para cálculos vetoriais)
└── ui/                             # Módulos de interface
    ├── sidebar.js                  # Gerencia sidebar
    └── controls.js                 # Controles de simulação
```

## 🔧 Módulos e Funções

### `engine/mathparser.js`
```javascript
// Converte string em função matemática
export function parseEquation(expr)
```

### `engine/time.js`
```javascript
export function getTime()           // Retorna tempo atual
export function togglePause()       // Pausa/retoma
export function setSpeed(s)         // Define velocidade
export function isPaused()          // Verifica se pausado
```

### `engine/object2D.js`
```javascript
export default class Object2D {
  constructor({x, y, eqX, eqY, color, size})
  update(t)                          // Atualiza posição
  draw(ctx, options)                 // Desenha objeto
}
```

### `engine/renderer.js`
```javascript
export function render(ctx, canvas, objects, options)
export function drawGrid(ctx, canvas)
export function drawVector(ctx, x, y, vx, vy, color)
```

### `ui/sidebar.js`
Gerencia interação com a sidebar:
```javascript
export function getObjectEquations()      // Lê equações dos inputs
export function clearInputs()             // Limpa os campos
export function isTrailVisible()          // Status do checkbox
export function isVelocityVisible()       // Status do checkbox
export function isAccelerationVisible()   // Status do checkbox
export function initializeSidebar()       // Inicializa event listeners
```

### `ui/controls.js`
Gerencia controles de tempo e cenários:
```javascript
export function handlePauseButton()       // Configura botão de pausa
export function handleSpeedControl()      // Configura slider de velocidade
export function handleScenarioButtons()   // Configura botões de cenários
export function initializeControls()      // Inicializa todos
```

## 🚀 Fluxo de Execução

1. **HTML carrega** → `main.js` como módulo
2. **main.js**:
   - Importa todos os módulos
   - Cria estado global (objects, selected, dragging)
   - Configura canvas
   - Escuta eventos de teclado/mouse
   - Executa loop de animação

3. **DOMContentLoaded**:
   - Inicializa sidebar (`ui/sidebar.js`)
   - Inicializa controles (`ui/controls.js`)

4. **Loop de Animação**:
   - Obtém tempo (`engine/time.js`)
   - Atualiza objetos (`engine/object2D.js`)
   - Renderiza (`engine/renderer.js`)

## 🔄 Exemplo: Adicionar Novo Objeto

```javascript
// No HTML: <button onclick="addObject()">Adicionar</button>
// Em main.js:
function addObject() {
  const result = Sidebar.getObjectEquations();  // ← ui/sidebar.js
  const obj = new Object2D({...});              // ← engine/object2D.js
  objects.push(obj);
  updateInfoPanel();
}
```

## 🎮 Exemplo: Pausar Simulação

```javascript
// No HTML: <button onclick="togglePause()">Pausar</button>
// Em main.js:
window.togglePause = togglePause;

// Em engine/time.js:
export function togglePause() {
  paused = !paused;
  if (paused) pauseTime = getTime();
}
```

## 📝 Funções Globais (window)

As seguintes funções estão disponíveis no `window` para serem chamadas pelos `onclick` do HTML:

```javascript
window.addObject()          // Adiciona novo objeto
window.clearScene()         // Limpa a cena
window.loadCircular()       // Carrega movimento circular
window.loadProjectile()     // Carrega lançamento oblíquo
window.togglePause()        // Pausa/retoma
window.setSpeed(speed)      // Define velocidade
window.toggleTutorial()     // Abre/fecha tutorial
```

## ✅ Testes Recomendados

- [x] Adicionar objeto com equações customizadas
- [x] Visualizar trajetória, velocidade e aceleração
- [x] Pausar e retomar simulação
- [x] Ajustar velocidade com slider
- [x] Carregar cenários pré-configurados
- [x] Limpar a cena
- [x] Abrir/fechar tutorial
- [x] Redimensionar janela do navegador

## 💡 Como Adicionar Nova Funcionalidade

### Exemplo: Adicionar novo tipo de vetor (Força)

1. **Estenda `engine/object2D.js`**:
```javascript
drawForce(ctx) {
  // Implementar desenho de força
}
```

2. **Atualize `engine/renderer.js`** se necessário para novos estilos

3. **Adicione checkbox em HTML**
4. **Atualize `ui/sidebar.js`** para ler o checkbox
5. **Atualize `main.js` em `getOptions()`** para incluir o novo estado

## 🐛 Debugging

Para verificar estado da simulação, abra o console e use:

```javascript
// Ver objetos atuais
console.log(objects);

// Ver tempo atual
console.log(getTime());

// Ver se está pausado
console.log(isPaused());
```

## 📚 Próximas Melhorias Sugeridas

1. **engine/vectors.js** - Implementar cálculos vetoriais (magnitude, normalizar, etc)
2. **Validação** - Melhorar tratamento de erros em parseEquation
3. **Temas** - Permitir customização de cores
4. **Persistência** - Salvar/carregar cenários
5. **Performance** - Otimizar renderização com WebGL
6. **Mobile** - Melhorar toque/gestos

---

**Data da Refatoração**: Abril 2026
**Status**: ✅ Completo e Funcional
