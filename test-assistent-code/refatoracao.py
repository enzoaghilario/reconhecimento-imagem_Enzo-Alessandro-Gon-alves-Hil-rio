def calculate_statistics(numbers):
    total = sum(numbers)
    mean = total / len(numbers)
    maximum = max(numbers)
    minimum = min(numbers)
    return total, mean, maximum, minimum

numbers = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
total, mean, max_val, min_val = calculate_statistics(numbers)
print("total:", total)
print("media:", mean)
print("maior:", max_val)
print("menor:", min_val)