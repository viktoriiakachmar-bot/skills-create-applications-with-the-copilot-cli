const { calculate, modulo, power, squareRoot } = require('../calculator');

describe('calculate', () => {
  test.each([
    ['addition', 2, '+', 3, 5],
    ['subtraction', 10, '-', 4, 6],
    ['multiplication', 45, '*', 2, 90],
    ['division', 20, '/', 5, 4],
    ['addition with negative operands', -2, '+', 3, 1],
    ['division with decimal results', 5, '/', 2, 2.5],
  ])('performs %s', (_name, leftOperand, operation, rightOperand, expected) => {
    expect(calculate(leftOperand, operation, rightOperand)).toBe(expected);
  });

  test('rejects division by zero', () => {
    expect(() => calculate(20, '/', 0)).toThrow('Cannot divide by zero.');
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate(2, 'sqrt', 3)).toThrow('Operation must be one of: +, -, *, /, %, **.');
  });

  test('rejects invalid operands', () => {
    expect(() => calculate(Number.NaN, '+', 3)).toThrow('Both operands must be valid numbers.');
  });
});

describe('modulo', () => {
  test('returns the remainder for 5 % 2', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('returns the remainder after division', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('rejects zero as the divisor', () => {
    expect(() => modulo(10, 0)).toThrow('Cannot calculate modulo by zero.');
  });
});

describe('power', () => {
  test('raises 2 to the power of 3', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('supports negative exponents', () => {
    expect(power(2, -2)).toBe(0.25);
  });
});

describe('squareRoot', () => {
  test('returns the square root of 16', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('returns the square root of a non-negative number', () => {
    expect(squareRoot(81)).toBe(9);
  });

  test('rejects negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow('Cannot calculate the square root of a negative number.');
  });
});
