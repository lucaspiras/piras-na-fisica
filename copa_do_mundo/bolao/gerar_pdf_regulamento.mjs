/**
 * Gera um PDF de PÁGINA ÚNICA, idêntico à versão HTML, a partir de um arquivo
 * HTML local. Renderiza com Chromium (Puppeteer) em mídia "screen", com fundo e
 * efeitos, numa única página do tamanho exato do conteúdo (sem quebras).
 *
 * O Puppeteer precisa estar instalado LOCALMENTE na pasta de onde o script roda
 * (o Node não resolve `import` por NODE_PATH/instalação global). Para não encher
 * o OneDrive de node_modules, o setup mora numa pasta fora do repositório:
 *
 *   C:\Users\Usuario\reg-pdf-tool\   (criada uma vez: npm init -y && npm install puppeteer)
 *
 * Regerar o PDF depois de editar o HTML (no PowerShell):
 *   $base = "<...>\copa_do_mundo\bolao"
 *   Set-Location C:\Users\Usuario\reg-pdf-tool
 *   node gerar_pdf_regulamento.mjs "$base\regulamento_bolao_ifsul.html" "$base\regulamento_bolao_ifsul.pdf"
 *
 * (A cópia em reg-pdf-tool é a que tem o puppeteer ao lado; esta cópia no repo é
 *  só a fonte versionada. Mantê-las iguais ao alterar o script.)
 *
 * Opcional: largura de renderização em px (padrão 1000)
 *   $env:PDF_WIDTH = 1100
 */

import puppeteer from 'puppeteer'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const HTML  = resolve(process.argv[2] ?? 'regulamento_bolao_ifsul.html')
const OUT   = resolve(process.argv[3] ?? 'regulamento_bolao_ifsul.pdf')
const WIDTH = Number(process.env.PDF_WIDTH || 1000)

const browser = await puppeteer.launch({ headless: true })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: WIDTH, height: 1400, deviceScaleFactor: 2 })
  // Mídia "screen" = aparência idêntica à do navegador (não a de impressão).
  await page.emulateMediaType('screen')
  await page.goto(pathToFileURL(HTML).href, { waitUntil: 'networkidle0', timeout: 120000 })

  // Garante que as fontes carregaram e neutraliza as animações de entrada
  // (senão a captura pode pegar seções ainda em opacity:0).
  try { await page.evaluate(() => document.fonts.ready) } catch {}
  await page.addStyleTag({ content:
    '*,*::before,*::after{animation:none!important;transition:none!important}' +
    '.section{opacity:1!important;transform:none!important}' })
  await new Promise(r => setTimeout(r, 300))

  const height = await page.evaluate(() =>
    Math.ceil(document.documentElement.getBoundingClientRect().height))

  await page.pdf({
    path: OUT,
    printBackground: true,
    width:  `${WIDTH}px`,
    height: `${height}px`,
    pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })
  console.log(`✓ PDF gerado: ${OUT}  (${WIDTH}×${height}px, página única)`)
} finally {
  await browser.close()
}
