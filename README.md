# Projeto de Reconhecimento de Imagem e Códigos Auxiliares

Este projeto reúne um protótipo de aplicação web para classificação de imagens em tempo real usando um modelo do Teachable Machine e alguns scripts Python de apoio para demonstrações de lógica e cálculos.

## Estrutura do projeto

- `index.html` - Interface web que carrega um modelo de classificação de imagem do Teachable Machine e usa a câmera do navegador para exibir previsões em tempo real.
- `test-assistent-code/` - Pasta com exemplos de scripts e explicações em Python.
  - `debug.py` - Script interativo que calcula preços, aplica imposto e desconto e exibe um resumo formatado.
  - `num_primos.py` - Função de verificação de número primo com exemplos de teste.
  - `refatoracao.py` - Exemplo de função que calcula estatísticas básicas (total, média, maior e menor) em uma lista de números.
  - `explicacao_num_primo.md` - Explicação em português sobre a função de número primo.
  - `explicacao_refatoracao.md` - Explicação em português sobre a refatoração.
  - `explicacao-debug.md` - Explicação em português sobre o script de debug.

## Sobre `index.html`

O `index.html` implementa uma página de classificação em tempo real com as seguintes características:

- Uso de `@tensorflow/tfjs` e `@teachablemachine/image` para carregar e inferir um modelo remoto.
- Acesso à webcam do usuário para capturar imagens ao vivo.
- Painel de status que indica o estado da câmera e do modelo.
- Exibição de probabilidades por classe em barras de progresso.

### Como usar

1. Abra o arquivo `index.html` em um servidor local ou publique em HTTPS.
2. Clique no botão "Permitir câmera e iniciar".
3. Autorize o acesso à câmera no navegador.
4. Observe as previsões atualizando em tempo real.

> Observação: a página pode não funcionar corretamente se carregada diretamente pelo protocolo `file://`. Use um servidor HTTP/HTTPS para garantir o acesso à câmera.

## Como executar os scripts Python

Os scripts Python podem ser executados em qualquer ambiente que tenha Python instalado.

### Executar `debug.py`

```bash
python test-assistent-code/debug.py
```

O script solicita o nome do cliente, quantidades e preços de três itens, aplica imposto de 10% e calcula um desconto percentual se fornecido.

### Executar `num_primos.py`

```bash
python test-assistent-code/num_primos.py
```

Este arquivo contém a função `is_prime(n)` que verifica se um número inteiro é primo e testa alguns valores.

### Executar `refatoracao.py`

```bash
python test-assistent-code/refatoracao.py
```

Este arquivo demonstra o cálculo de estatísticas básicas em uma lista de números.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- TensorFlow.js
- Teachable Machine
- Python

## Observações

- O modelo do Teachable Machine está hospedado externamente e carregado a partir de uma URL no `index.html`.
- Os arquivos de explicação em `test-assistent-code/` fornecem documentação adicional em português para os exemplos de código.
