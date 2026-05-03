let chart = null;

const CORES_SERIES = [
    "#2563eb",
    "#dc2626",
    "#16a34a",
    "#9333ea",
    "#ea580c",
    "#0891b2"
];

const fundoBranco = {
    id: "fundoBranco",
    beforeDraw(chartInstance) {
        const { ctx, width, height } = chartInstance;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
};

Chart.register(fundoBranco);
Chart.defaults.font.family = "'Poppins', 'Segoe UI', sans-serif";
Chart.defaults.color = "#334155";

function gerarGrafico() {
    const equacoesTexto = document.getElementById("equacao").value;
    const modo = document.getElementById("modo").value;

    const tituloGrafico = document.getElementById("tituloGrafico").value;
    const tituloX = document.getElementById("tituloX").value;
    const tituloY = document.getElementById("tituloY").value;

    const xmin = parseFloat(document.getElementById("xmin").value);
    const xmax = parseFloat(document.getElementById("xmax").value);
    const passoCurva = parseFloat(document.getElementById("passoCurva").value);
    const passoPontos = parseFloat(document.getElementById("passoPontos").value);

    const largura = parseInt(document.getElementById("larguraGrafico").value, 10);
    const altura = parseInt(document.getElementById("alturaGrafico").value, 10);
    const mostrarPontos = document.getElementById("mostrarPontos").checked;
    const mostrarGrade = document.getElementById("mostrarGrade").checked;
    const cores = obterCoresPersonalizadas();

    if (!Number.isFinite(xmin) || !Number.isFinite(xmax) || !Number.isFinite(passoCurva) || xmin >= xmax || passoCurva <= 0) {
        alert("Intervalo ou passo invalido.");
        return;
    }

    if (!Number.isFinite(passoPontos) || passoPontos <= 0) {
        alert("O passo dos pontos deve ser maior que zero.");
        return;
    }

    if (!Number.isFinite(largura) || !Number.isFinite(altura) || largura < 320 || altura < 260) {
        alert("Use uma largura minima de 320 px e altura minima de 260 px.");
        return;
    }

    const valoresX = gerarValoresX(xmin, xmax, passoCurva);
    const opcoesPontos = {
        mostrarPontos,
        passoPontos,
        passoCurva,
        xmin
    };
    const datasets = [];

    try {
        if (modo === "normal") {
            const equacoes = equacoesTexto
                .split(";")
                .map(eq => eq.trim())
                .filter(Boolean);

            if (equacoes.length === 0) {
                alert("Digite pelo menos uma funcao.");
                return;
            }

            equacoes.forEach((eq, i) => {
                const expressao = math.compile(eq);
                datasets.push(
                    criarDataset(formatarExpressao(eq), expressao, valoresX, cores[i % cores.length], opcoesPontos)
                );
            });
        } else {
            const eq = equacoesTexto.trim();

            if (!eq) {
                alert("Digite uma funcao para o modo cinematica.");
                return;
            }

            const s = math.compile(eq);
            const v = math.derivative(eq, "x");
            const a = math.derivative(v, "x");

            datasets.push(criarDataset("s(x) = " + formatarExpressao(eq), s, valoresX, cores[0], opcoesPontos));
            datasets.push(criarDataset("v(x)", v, valoresX, cores[1], opcoesPontos));
            datasets.push(criarDataset("a(x)", a, valoresX, cores[2], opcoesPontos));
        }
    } catch {
        alert("Erro na funcao. Confira a sintaxe e tente novamente.");
        return;
    }

    const container = document.querySelector(".area-grafico");

    if (chart) {
        chart.destroy();
    }

    container.innerHTML = "";

    const novoCanvas = document.createElement("canvas");
    novoCanvas.id = "graficoCanvas";
    novoCanvas.width = largura;
    novoCanvas.height = altura;

    container.appendChild(novoCanvas);

    const ctx = novoCanvas.getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            datasets
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            devicePixelRatio: Math.max(window.devicePixelRatio || 1, 2),
            interaction: {
                mode: "nearest",
                intersect: false
            },
            animation: {
                duration: 450,
                easing: "easeOutQuart"
            },
            layout: {
                padding: {
                    top: 12,
                    right: 18,
                    bottom: 8,
                    left: 12
                }
            },
            plugins: {
                legend: {
                    position: "top",
                    align: "end",
                    labels: {
                        boxWidth: 26,
                        boxHeight: 3,
                        usePointStyle: true,
                        pointStyle: "line",
                        padding: 18,
                        font: {
                            size: 12,
                            weight: "700"
                        }
                    }
                },
                title: {
                    display: true,
                    text: tituloGrafico,
                    color: "#0f172a",
                    padding: {
                        top: 6,
                        bottom: 18
                    },
                    font: {
                        size: 20,
                        weight: "800"
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(15, 23, 42, 0.92)",
                    borderColor: "rgba(255, 255, 255, 0.18)",
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        title(items) {
                            return `x = ${formatarNumero(items[0].parsed.x)}`;
                        },
                        label(item) {
                            return `${item.dataset.label}: ${formatarNumero(item.parsed.y)}`;
                        }
                    }
                }
            },
            scales: {
                x: criarEscala(tituloX, true, mostrarGrade),
                y: criarEscala(tituloY, false, mostrarGrade)
            }
        }
    });
}

function criarDataset(nome, expressao, valoresX, cor, opcoesPontos) {
    const valores = valoresX.map(x => {
        const y = expressao.evaluate({ x });
        return {
            x,
            y: Number.isFinite(y) ? y : null
        };
    });

    return {
        label: nome,
        data: valores,
        borderColor: cor,
        backgroundColor: cor,
        borderWidth: 3,
        fill: false,
        spanGaps: false,
        tension: 0.28,
        cubicInterpolationMode: "monotone",
        pointRadius(context) {
            return deveMostrarPonto(context.raw, opcoesPontos) ? 3 : 0;
        },
        pointHoverRadius(context) {
            return deveMostrarPonto(context.raw, opcoesPontos) ? 5 : 0;
        },
        pointBorderWidth: 2,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: cor,
        hitRadius: 10
    };
}

function criarEscala(titulo, eixoX, mostrarGrade) {
    return {
        ...(eixoX ? { type: "linear" } : {}),
        title: {
            display: true,
            text: titulo,
            color: "#0f172a",
            font: {
                size: 13,
                weight: "800"
            }
        },
        ticks: {
            maxTicksLimit: eixoX ? 11 : 9,
            color: "#475569",
            padding: 8,
            callback(value) {
                return formatarNumero(value);
            },
            font: {
                size: 11
            }
        },
        border: {
            color: "#94a3b8",
            width: 1.5
        },
        grid: {
            display: mostrarGrade,
            color(context) {
                return Number(context.tick.value) === 0 ? "#64748b" : "#e2e8f0";
            },
            lineWidth(context) {
                return Number(context.tick.value) === 0 ? 1.5 : 1;
            },
            drawTicks: false
        }
    };
}

function deveMostrarPonto(ponto, opcoes) {
    if (!opcoes.mostrarPontos || !ponto || ponto.y === null) {
        return false;
    }

    const indiceMarcador = Math.round((ponto.x - opcoes.xmin) / opcoes.passoPontos);
    const xMarcador = opcoes.xmin + indiceMarcador * opcoes.passoPontos;
    const tolerancia = Math.max(opcoes.passoCurva / 2, 0.000001);

    return Math.abs(ponto.x - xMarcador) <= tolerancia;
}

function obterCoresPersonalizadas() {
    const cores = Array.from(document.querySelectorAll(".cor-serie"))
        .map(input => input.value)
        .filter(Boolean);

    return cores.length > 0 ? cores : CORES_SERIES;
}

function formatarNumero(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        maximumFractionDigits: 4
    });
}

function gerarValoresX(xmin, xmax, passo) {
    const valores = [];

    for (let x = xmin; x <= xmax + passo / 1000; x += passo) {
        valores.push(Number(x.toFixed(6)));
    }

    return valores;
}

function formatarExpressao(eq) {
    return eq
        .replace(/\*/g, "")
        .replace(/x\^2/g, "x\u00b2")
        .replace(/x\^3/g, "x\u00b3")
        .replace(/x\^4/g, "x\u2074")
        .replace(/sqrt\(x\)/g, "\u221ax")
        .replace(/exp\(x\)/g, "e^x");
}

function baixarImagem() {
    const canvas = document.getElementById("graficoCanvas");

    if (!canvas) {
        alert("Gere um grafico antes de baixar a imagem.");
        return;
    }

    const link = document.createElement("a");
    link.download = "grafico.png";
    link.href = canvas.toDataURL("image/png", 1);
    link.click();
}

gerarGrafico();
