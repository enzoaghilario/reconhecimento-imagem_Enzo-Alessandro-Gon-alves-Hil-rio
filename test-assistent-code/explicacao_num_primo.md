# Explicação do Código: Verificação de Número Primo

## Código

```python
def is_prime(n):
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

# Testes
print(is_prime(2))  # True
print(is_prime(3))  # True
print(is_prime(4))  # False
print(is_prime(17)) # True
print(is_prime(18)) # False
```

## Explicação Linha a Linha

1. `def is_prime(n):` - Define a função `is_prime` que recebe um parâmetro `n` (o número a ser verificado).

2. `if n <= 1:` - Verifica se o número `n` é menor ou igual a 1.

3. `return False` - Se a condição acima for verdadeira, retorna `False`, pois números menores ou iguais a 1 não são considerados primos.

4. `if n == 2:` - Verifica se `n` é exatamente 2.

5. `return True` - Se for 2, retorna `True`, pois 2 é o único número primo par.

6. `if n % 2 == 0:` - Verifica se `n` é divisível por 2 (ou seja, se é par).

7. `return False` - Se for par e maior que 2, retorna `False`, pois números pares maiores que 2 não são primos.

8. `for i in range(3, int(n**0.5) + 1, 2):` - Inicia um loop que itera sobre números ímpares de 3 até a raiz quadrada de `n` (arredondada para baixo), inclusive.

9. `if n % i == 0:` - Dentro do loop, verifica se `n` é divisível por `i`.

10. `return False` - Se for divisível, retorna `False`, indicando que `n` não é primo.

11. `return True` - Se o loop terminar sem encontrar divisores, retorna `True`, confirmando que `n` é primo.

12. `# Testes` - Comentário indicando o início dos testes da função.

13. `print(is_prime(2))  # True` - Testa a função com 2 e imprime o resultado (esperado: True).

14. `print(is_prime(3))  # True` - Testa com 3 (esperado: True).

15. `print(is_prime(4))  # False` - Testa com 4 (esperado: False).

16. `print(is_prime(17)) # True` - Testa com 17 (esperado: True).

17. `print(is_prime(18)) # False` - Testa com 18 (esperado: False).