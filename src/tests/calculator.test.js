const { calculate } = require('../calculator');

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
    expect(() => calculate(2, '%', 3)).toThrow('Operation must be one of: +, -, *, /.');
  });

  test('rejects invalid operands', () => {
    expect(() => calculate(Number.NaN, '+', 3)).toThrow('Both operands must be valid numbers.');
  });
});
