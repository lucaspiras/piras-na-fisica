#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Scan OBFEP gabaritos and fase2 structure."""
import pdfplumber

BASE = 'Provas_vestibulares/OBFEP/'

files = [
    ('GAB-2025-A', BASE + '2025/GABARITO-Nivel-A-9o-ano-2025.pdf'),
    ('GAB-2025-B', BASE + '2025/GABARITO-Nivel-B-1a-e-2a-series-2025.pdf'),
    ('GAB-2025-C', BASE + '2025/GABARITO-Nivel-C-3a-e-4a-series-2025.pdf'),
    ('GAB-2024-A', BASE + '2024/GABARITO-Nivel-A-9o-ano-2024.pdf'),
    ('GAB-2024-B', BASE + '2024/GABARITO-Nivel-B-1a-e-2a-serie-2024.pdf'),
    ('GAB-2024-C', BASE + '2024/GABARITO-Nivel-C-3a-e-4a-serie-2024.pdf'),
    ('GAB-2023',   BASE + '2023/GABARITO_1a-FASE_OBFEP-2023-c-B6modf.pdf'),
    ('F2-2021-B',  BASE + '2021/obfep2021_2fase_teorica_nivelb.pdf'),
    ('F2-2021-C',  BASE + '2021/obfep2021_2fase_teorica_nivelc.pdf'),
]

for nome, path in files:
    try:
        with pdfplumber.open(path) as pdf:
            texto_total = ''
            for page in pdf.pages:
                texto_total += (page.extract_text() or '') + '\n'
            print(f'\n=== {nome} ({len(pdf.pages)} pags) ===')
            for line in texto_total.split('\n')[:30]:
                if line.strip():
                    print('  ', line.strip()[:120])
    except Exception as e:
        print(f'{nome}: ERRO - {e}')
