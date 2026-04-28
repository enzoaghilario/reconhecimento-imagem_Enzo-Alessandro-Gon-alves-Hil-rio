# Explicação do Código: refatoracao.py

## Código

```python
def c(l):
    t=0
    for i in range(len(l)):
        t=t+l[i]
    m=t/len(l)
    mx=l[0]
    mn=l[0]
    for i in range(len(l)):
        if l[i]>mx:
            mx=l[i]
        if l[i]<mn:
            mn=l[i]
    return t,m,mx,mn

x=[23,7,45,2,67,12,89,34,56,11]
a,b,c2,d=c(x)
print("total:",a)
print("media:",b)
print("maior:",c2)
print("menor:",d)
```

## Explicação Linha a Linha

1. `def c(l):` - Define uma função chamada `c` que recebe um parâmetro `l` (uma lista de números).

2. `t=0` - Inicializa a variável `t` com 0, que será usada para armazenar a soma dos elementos da lista.

3. `for i in range(len(l)):` - Inicia um loop que itera sobre os índices da lista `l`, de 0 até o comprimento da lista menos 1.

4. `t=t+l[i]` - Adiciona o valor do elemento na posição `i` da lista à variável `t` (calculando a soma total).

5. `m=t/len(l)` - Calcula a média `m` dividindo a soma total `t` pelo número de elementos na lista `len(l)`.

6. `mx=l[0]` - Inicializa `mx` com o primeiro elemento da lista, assumindo que é o maior inicialmente.

7. `mn=l[0]` - Inicializa `mn` com o primeiro elemento da lista, assumindo que é o menor inicialmente.

8. `for i in range(len(l)):` - Inicia outro loop que itera sobre os índices da lista `l`.

9. `if l[i]>mx:` - Verifica se o elemento atual `l[i]` é maior que o valor atual de `mx`.

10. `mx=l[i]` - Se for, atualiza `mx` com o novo valor maior.

11. `if l[i]<mn:` - Verifica se o elemento atual `l[i]` é menor que o valor atual de `mn`.

12. `mn=l[i]` - Se for, atualiza `mn` com o novo valor menor.

13. `return t,m,mx,mn` - Retorna uma tupla com a soma total `t`, a média `m`, o maior valor `mx` e o menor valor `mn`.

14. (linha vazia)

15. `x=[23,7,45,2,67,12,89,34,56,11]` - Define uma lista `x` com 10 números inteiros.

16. `a,b,c2,d=c(x)` - Chama a função `c` com a lista `x` e desempacota o retorno em quatro variáveis: `a` (soma), `b` (média), `c2` (maior), `d` (menor). Nota: `c2` é usado para evitar conflito com o nome da função `c`.

17. `print("total:",a)` - Imprime a soma total.

18. `print("media:",b)` - Imprime a média.

19. `print("maior:",c2)` - Imprime o maior valor.

20. `print("menor:",d)` - Imprime o menor valor.