#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (**), and square root (sqrt).
function validateOperands(leftOperand, rightOperand) {
  if (!Number.isFinite(leftOperand) || !Number.isFinite(rightOperand)) {
    throw new Error('Both operands must be valid numbers.');
  }
}

function calculate(leftOperand, operation, rightOperand) {
  validateOperands(leftOperand, rightOperand);

  switch (operation) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    case '/':
      if (rightOperand === 0) {
        throw new Error('Cannot divide by zero.');
      }

      return leftOperand / rightOperand;
    case '%':
      return modulo(leftOperand, rightOperand);
    case '**':
      return power(leftOperand, rightOperand);
    default:
      throw new Error('Operation must be one of: +, -, *, /, %, **.');
  }
}

function modulo(leftOperand, rightOperand) {
  validateOperands(leftOperand, rightOperand);

  if (rightOperand === 0) {
    throw new Error('Cannot calculate modulo by zero.');
  }

  return leftOperand % rightOperand;
}

function power(base, exponent) {
  validateOperands(base, exponent);
  return base ** exponent;
}

function squareRoot(number) {
  if (!Number.isFinite(number)) {
    throw new Error('Operand must be a valid number.');
  }

  if (number < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }

  return Math.sqrt(number);
}

function runCli(cliArguments) {
  if (cliArguments.length === 2 && cliArguments[1] === 'sqrt') {
    return squareRoot(Number(cliArguments[0]));
  }

  if (cliArguments.length !== 3) {
    throw new Error('Usage: node src/calculator.js <number> <operation> <number> or node src/calculator.js <number> sqrt');
  }

  const [leftArgument, operation, rightArgument] = cliArguments;
  return calculate(Number(leftArgument), operation, Number(rightArgument));
}

if (require.main === module) {
  try {
    process.stdout.write(`${runCli(process.argv.slice(2))}\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, runCli, squareRoot };
