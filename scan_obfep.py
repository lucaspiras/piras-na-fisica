#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Scan OBFEP provas to understand structure."""
import pdfplumber

BASE = 'Provas_vestibulares/OBFEP/'

provas = [
    ('2025-A', BASE + '2025/Nível-A_2025_rev.pdf'),
    ('2025-B', BASE + '2025/Nível-B_2025_rev.pdf'),
    ('2025-C', BASE + '2025/Nível-C_2025_rev.pdf'),
    ('2024-A', BASE + '2024/Nível-A_2024-01.pdf'),
    ('2024-B', BASE + '2024/Nível-B_2024-01.pdf'),
    ('2024-C', BASE + '2024/Nivel-C__2024-01.pdf'),
    ('2023-A', BASE + '2023/OBFEP_2023_fase1_nivel-A.pdf'),
    ('2023-B', BASE + '2023/OBFEP_2023_fase1_nivel-B.pdf'),
    ('2023-C', BASE + '2023/OBFEP_2023_fase1_nivel-C.pdf'),
]

for nome, path in provas:
    try:
        with pdfplumber.open(path) as pdf:
            n = len(pdf.pages)
            # extract first 5 pages to understand layout
            texto = ''
            for page in pdf.pages:
                t = page.extract_text() or ''
                texto += t + '\n'

            # count questions by looking for Q1), 1), QUESTAO 1, etc.
            import re
            # try different patterns
            q_nums = re.findall(r'(?:^|\n)\s*(?:QUESTAO|Questao|Questão|QUESTÃO)?\s*(\d{1,2})[\.)\-]', texto)
            # unique question numbers
            unique_q = sorted(set(int(x) for x in q_nums if 1 <= int(x) <= 50))

            print(f'\n=== {nome} ({n} pags) ===')
            print(f'  Questoes detectadas: {unique_q}')
            # show first 600 chars
            print('  INICIO:')
            for line in texto.split('\n')[:20]:
                if line.strip():
                    print('   ', line.strip()[:100])
    except Exception as e:
        print(f'{nome}: ERRO - {e}')
