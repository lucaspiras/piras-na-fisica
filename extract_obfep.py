#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extrai texto e imagens de provas OBFEP.
Uso: python extract_obfep.py <ano>
"""
import sys, pathlib, fitz, pdfplumber, re

ANO = sys.argv[1] if len(sys.argv) > 1 else '2025'
BASE_PROVAS = pathlib.Path('Provas_vestibulares/OBFEP') / ANO
BASE_IMG    = pathlib.Path('banco-questoes/img/obfep') / ANO
BASE_TXT    = pathlib.Path('Provas_vestibulares/OBFEP') / ANO / 'texto'
BASE_IMG.mkdir(parents=True, exist_ok=True)
BASE_TXT.mkdir(parents=True, exist_ok=True)

# Mapeamento de arquivos por nível/fase
ARQUIVOS = {
    '2025': {
        'A-F1': 'Nível-A_2025_rev.pdf',
        'B-F1': 'Nível-B_2025_rev.pdf',
        'C-F1': 'Nível-C_2025_rev.pdf',
        'A-GAB': 'GABARITO-Nivel-A-9o-ano-2025.pdf',
        'B-GAB': 'GABARITO-Nivel-B-1a-e-2a-series-2025.pdf',
        'C-GAB': 'GABARITO-Nivel-C-3a-e-4a-series-2025.pdf',
    },
    '2024': {
        'A-F1': 'Nível-A_2024-01.pdf',
        'B-F1': 'Nível-B_2024-01.pdf',
        'C-F1': 'Nivel-C__2024-01.pdf',
        'A-GAB': 'GABARITO-Nivel-A-9o-ano-2024.pdf',
        'B-GAB': 'GABARITO-Nivel-B-1a-e-2a-serie-2024.pdf',
        'C-GAB': 'GABARITO-Nivel-C-3a-e-4a-serie-2024.pdf',
    },
    '2023': {
        'A-F1': 'OBFEP_2023_fase1_nivel-A.pdf',
        'B-F1': 'OBFEP_2023_fase1_nivel-B.pdf',
        'C-F1': 'OBFEP_2023_fase1_nivel-C.pdf',
        'GAB':  'GABARITO_1a-FASE_OBFEP-2023-c-B6modf.pdf',
    },
    '2022': {
        'A-F1': 'Nível-A_2024-01.pdf',   # nome errado no arquivo
        'B-F1': 'FASE-1-Nível-B-2022.pdf',
        'C-F1': 'FASE-1-Nível-C-2022.pdf',
        'GAB':  'GABARITO_1a-FASE_OBFEP-2022.pdf',
    },
    '2021': {
        'B-F1': 'obfep2021_1fase_nivelb.pdf',
        'C-F1': 'obfep2021_1fase_nivelc.pdf',
        'B-F2': 'obfep2021_2fase_teorica_nivelb.pdf',
        'C-F2': 'obfep2021_2fase_teorica_nivelc.pdf',
        'GAB':  'obfep2021_1fase_gabaritos.pdf',
    },
    '2019': {
        'B-F1': 'FASE-1Nível-B_2019_RFF.pdf',
        'C-F1': 'Fase_1_nivel_C.pdf',
        'B-F2': 'FASE-2-Teo_-Exp-Nivel-B-2019-_Rev.pdf',
        'C-F2': 'FASE-2-Teo_Exp-Nivel-C-2019-_Rev.pdf',
        'GAB':  'FASE-1-OBFEP-2019-Gabarito.pdf',
    },
    '2018': {
        'A-F1': 'Nível-A111_20018OK-f.pdf',
        'B-F1': 'Nível-B-111_20018OK-f.pdf',
        'C-F1': 'Nível-C-111_2018OK-f.pdf',
        'B-F2': 'FASE-2-OBFEP-2018-B-f.pdf',
        'C-F2': 'FASE-2-OBFEP-2018-C-Teoria_nivel-C-ff.pdf',
        'GAB':  'FASE-1-OBFEP-2018-GABARITO.pdf',
    },
    '2017': {
        'B-F1': 'OBFEP_2017_fase1_nivel_B_prova.pdf',
        'B-F2': 'OBFEP2017_fase2_Teo_nivel_B.pdf',
        'GAB':  'OBFEP_2017_fase1_gabarito.pdf',
    },
    '2016': {
        'A-F1': 'FASE-1-nível-A_2016-FF.pdf',
        'B-F1': 'FASE-1-nível-B_2016-FF.pdf',
        'C-F1': 'FASE-1-nível-C_2016-FF.pdf',
        'B-F2': 'FASE-2-OBFEP-2016-Teo_-Exp-nivel-B.pdf',
        'C-F2': 'FASE-2-OBFEP-2016-Teo_-Exp-nivel-C.pdf',
        'GAB':  'OBFEP_2016_F1_gabaritos.pdf',
    },
    '2015': {
        'A-F1': 'ProvaOBFEP_2015_Nível-A_2015.pdf',
        'B-F1': 'ProvaOBFEP_2015_Nível-B_2015.pdf',
        'C-F1': 'ProvaOBFEP_2015_Nível-C_2015.pdf',
    },
    '2013': {
        'A-F1': 'OBFEP2013_NivelA_F_PROVA_Ag.pdf',
        'B-F1': 'OBFEP2013_NivelB_F_PROVA_Ag.pdf',
        'C-F1': 'OBFEP2013_NivelC_F_PROVA_Ag.pdf',
        'GAB':  'gabaritos_ago_2013.pdf',
    },
}

arqs = ARQUIVOS.get(ANO, {})
if not arqs:
    print(f'Ano {ANO} nao configurado.')
    sys.exit(1)

MIN_IMG_AREA = 5000  # pixels^2 minimo para salvar imagem

for chave, nome_arq in arqs.items():
    path = BASE_PROVAS / nome_arq
    if not path.exists():
        print(f'[SKIP] {chave}: {path.name} nao encontrado')
        continue

    print(f'\n=== {ANO}-{chave}: {path.name} ===')

    # ── Extrair texto ──────────────────────────────────────────────────────
    txt_out = BASE_TXT / f'{chave}.txt'
    try:
        with pdfplumber.open(str(path)) as pdf:
            linhas = []
            for i, page in enumerate(pdf.pages):
                t = page.extract_text() or ''
                linhas.append(f'[PAG{i+1:02d}]')
                linhas.append(t)
            txt_out.write_text('\n'.join(linhas), encoding='utf-8')
        print(f'  Texto -> {txt_out.name}')
    except Exception as e:
        print(f'  Texto ERRO: {e}')

    # ── Extrair imagens (apenas provas, nao gabaritos) ─────────────────────
    if 'GAB' not in chave:
        img_dir = BASE_IMG / chave
        img_dir.mkdir(parents=True, exist_ok=True)
        try:
            doc = fitz.open(str(path))
            saved = 0
            for pnum, page in enumerate(doc):
                for img in page.get_images(full=True):
                    xref = img[0]
                    pix  = fitz.Pixmap(doc, xref)
                    if pix.width * pix.height < MIN_IMG_AREA:
                        pix = None
                        continue
                    if pix.n > 4:
                        pix = fitz.Pixmap(fitz.csRGB, pix)
                    ext  = 'png' if pix.n == 4 else 'jpg'
                    nome = f'pag{pnum+1:02d}_xref{xref}_{pix.width}x{pix.height}.{ext}'
                    pix.save(str(img_dir / nome))
                    saved += 1
                    pix = None
            doc.close()
            print(f'  Imagens -> {img_dir.name}/ ({saved} salvas)')
        except Exception as e:
            print(f'  Imagens ERRO: {e}')

print('\nExtracao concluida.')
