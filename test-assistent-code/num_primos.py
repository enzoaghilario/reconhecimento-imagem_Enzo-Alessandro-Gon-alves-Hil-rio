def is_prime(n):
    """Verifica se um número inteiro é primo.

    Args:
        n (int): Número inteiro que será verificado.

    Returns:
        bool: True se o número for primo, False caso contrário.

    Notes:
        Números menores ou iguais a 1 não são considerados primos.
        A função trata 2 como primo e elimina números pares maiores que 2.
    """
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