#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
function calculate(leftOperand, operation, rightOperand) {
  if (!Number.isFinite(leftOperand) || !Number.isFinite(rightOperand)) {
    throw new Error('Both operands must be valid numbers.');
  }

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
    default:
      throw new Error('Operation must be one of: +, -, *, /.');
  }
}

function runCli(cliArguments) {
  if (cliArguments.length !== 3) {
    throw new Error('Usage: node src/calculator.js <number> <operation> <number>');
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

module.exports = { calculate, runCli };
