# Depuração do Código: debug.py

## Erros Identificados e Correções

### 1. Erro de Sintaxe na Entrada de Dados (Linha 6)
- **Descrição**: Falta de aspas na string do `input`: `item1 = float(input(Preço do item 1? ))`. Isso causa um erro de sintaxe porque `Preço` é tratado como uma variável indefinida.
- **Correção**: Adicionar aspas: `item1 = float(input("Preço do item 1? "))`.

### 2. Tipo de Dados Incorreto para Desconto (Linha 21)
- **Descrição**: `desconto_cupom` é capturado como string via `input`, mas usado em operações matemáticas (`desconto_cupom / 100`), causando `TypeError`.
- **Correção**: Converter para `float`: `desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))`.

### 3. F-String Incompleta (Linha 32)
- **Descrição**: O `print` para "Item 2" não tem o prefixo `f`, então `{total_item2:.2f}` não é interpolado, resultando em saída literal.
- **Correção**: Adicionar `f`: `print(f" Item 2:        R$ {total_item2:.2f}")`.

### 4. Indentação Incorreta no Bloco `if` (Linha 39)
- **Descrição**: O `print` dentro do `if` não está indentado, causando `IndentationError`.
- **Correção**: Indentar a linha: adicionar 4 espaços antes do `print`.

### 5. Comparação de Tipos Incompatíveis (Linha 38)
- **Descrição**: `if desconto_cupom > 0:` compara string com int, o que pode causar `TypeError` ou comportamento inesperado.
- **Correção**: Após converter `desconto_cupom` para `float`, a comparação funciona corretamente.

## Código Corrigido
O código foi corrigido conforme acima e agora executa sem erros. Ele calcula o total de compras com imposto e desconto opcional, exibindo um recibo formatado.