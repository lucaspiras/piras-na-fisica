let chart = null;

function gerarGrafico() {

    const equacoesTexto = document.getElementById("equacao").value;
    const modo = document.getElementById("modo").value;

    const tituloGrafico = document.getElementById("tituloGrafico").value;
    const tituloX = document.getElementById("tituloX").value;
    const tituloY = document.getElementById("tituloY").value;

    const xmin = parseFloat(document.getElementById("xmin").value);
    const xmax = parseFloat(document.getElementById("xmax").value);
    const passo = parseFloat(document.getElementById("passo").value);

    const largura = parseInt(document.getElementById("larguraGrafico").value);
    const altura = parseInt(document.getElementById("alturaGrafico").value);

    if (xmin >= xmax || passo <= 0) {
        alert("Intervalo ou passo inválido.");
        return;
    }

    const labels = gerarValoresX(xmin, xmax, passo);
    const datasets = [];
    const cores = ["#1e88e5", "#e53935", "#43a047"];

    try {

        if (modo === "normal") {

            const equacoes = equacoesTexto.split(";").map(eq => eq.trim());

            equacoes.forEach((eq, i) => {

                const expressao = math.compile(eq);
                const valores = [];

                labels.forEach(x => {
                    const y = expressao.evaluate({ x });
                    valores.push(isFinite(y) ? y : null);
                });

                datasets.push({
                    label: formatarExpressao(eq),
                    data: valores,
                    borderColor: cores[i % cores.length],
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                });
            });

        } else {

            const eq = equacoesTexto.trim();

            const s = math.compile(eq);
            const v = math.derivative(eq, "x");
            const a = math.derivative(v, "x");

            datasets.push(criarDataset("s(x) = " + formatarExpressao(eq), s, labels, cores[0]));
            datasets.push(criarDataset("v(x)", v, labels, cores[1]));
            datasets.push(criarDataset("a(x)", a, labels, cores[2]));
        }

    } catch {
        alert("Erro na função.");
        return;
    }

    const container = document.querySelector(".area-grafico");

// Remove gráfico anterior completamente
if (chart) {
    chart.destroy();
}

// Remove canvas antigo
container.innerHTML = "";

// Cria novo canvas
const novoCanvas = document.createElement("canvas");
novoCanvas.id = "graficoCanvas";
novoCanvas.width = largura;
novoCanvas.height = altura;

container.appendChild(novoCanvas);

const ctx = novoCanvas.getContext("2d");

  
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: tituloGrafico,
                    font: { size: 18 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: tituloX },
                    grid: {
                        color: ctx => ctx.tick.value === 0 ? "#000" : "#ddd"
                    }
                },
                y: {
                    title: { display: true, text: tituloY },
                    grid: {
                        color: ctx => ctx.tick.value === 0 ? "#000" : "#ddd"
                    }
                }
            }
        }
    });
}

function criarDataset(nome, expressao, labels, cor) {

    const valores = [];

    labels.forEach(x => {
        const y = expressao.evaluate({ x });
        valores.push(isFinite(y) ? y : null);
    });

    return {
        label: nome,
        data: valores,
        borderColor: cor,
        borderWidth: 2,
        fill: false,
        tension: 0.1
    };
}

function gerarValoresX(xmin, xmax, passo) {
    const valores = [];
    for (let x = xmin; x <= xmax; x += passo) {
        valores.push(Number(x.toFixed(5)));
    }
    return valores;
}

function formatarExpressao(eq) {

    return eq
        .replace(/\*/g, "")
        .replace(/x\^2/g, "x²")
        .replace(/x\^3/g, "x³")
        .replace(/x\^4/g, "x⁴")
        .replace(/sqrt\(x\)/g, "√x")
        .replace(/exp\(x\)/g, "eˣ");
}

function baixarImagem() {
    const link = document.createElement("a");
    link.download = "grafico.png";
    link.href = document.getElementById("graficoCanvas").toDataURL();
    link.click();
}
