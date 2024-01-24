function shuntingYard(expression) {
    const queue = [];
    const stack = [];
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '^': 3, // Add exponentiation if needed
      '(': 0,
    };
 
    for (let token of expression.split(' ')) {
      if (!isNaN(token)) {
        queue.push(token);
      } else if (token === '(') {
        stack.push(token);
      } else if (token === ')') {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          queue.push(stack.pop());
        }
        stack.pop(); // Remove the '('
      } else {
        while (
          stack.length > 0 &&
          stack[stack.length - 1] !== '(' &&
          precedence[stack[stack.length - 1]] >= precedence[token]
        ) {
          queue.push(stack.pop());
        }
        stack.push(token);
      }
    }
 
    while (stack.length > 0) {
      queue.push(stack.pop());
    }
 
    return queue.join(' ');
  }
 
  function evaluatePostfix(postfix) {
    const stack = [];
 
    for (let token of postfix.split(' ')) {
      if (!isNaN(token)) {
        stack.push(Number(token));
      } else {
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        const result = applyOperator(token, operand1, operand2);
        stack.push(result);
      }
    }
 
    return stack.pop();
  }
 
  function applyOperator(operator, operand1, operand2) {
    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        if (operand2 === 0) {
          throw new Error("Division by zero");
        }
        return operand1 / operand2;
      // Add more operators as needed
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }
 
 
const postfix = shuntingYard("- 4 + 3 * ( 7 - 1 ) * 2 - 1");
console.log(postfix); // Output: 3 4 2 * 1 5 - / +
const result = evaluatePostfix(postfix);
console.log("Result:", result); // Output: 1