let screen=document.querySelector('#screen')
let ac = document.getElementById('ac');

let input = ''

let que = [];
let stack = [];
let stuntingYardAlgorithmExpression = []
let expressionArry = [];


function getNumber(num){
  input += num;
  screen.value = input;
  console.log(input);
}

function getOperator(operator){
  input += operator
  screen.value = input;
  console.log(input);
}

function clear(){
  console.log("should clear");
  input = '';
  screen.value = input;
  console.log("Cleared input:", input);
}

ac.addEventListener('click', () => clear());

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
    if( num2 === 0){
        return 0
    } else{
        return num1 / num2;
    }
  
}

function sinExecute(num1){
    let num = num1 *Math.PI/180
    return Math.sin(num);
}

function cosExecute(num1){
    let num = num1 *Math.PI/180
    return Math.cos(num);
}

function tanExecute(num1){
    let num = num1 *Math.PI/180
    return Math.tan(num);
}

function powFunction(num1, num2){
    return Math.pow(num1, num2);
}

function modeFunction(num1, num2){
    return num1 % num2;
}

const addObject = {
  string: "+",
  importance: 1,
  noOperands: 2,
  apply: add,
};

const subtractObject = {
  string: "-",
  importance: 0,
  noOperands: 2,
  apply: substract,
};

const multiplyObject = {
  string: "*",
  importance: 2,
  noOperands: 2,
  apply: multiply,
};

const divideObject = {
  string: "/",
  importance: 3,
  noOperands: 2,
  apply: divide,
};

const openBracket = {
  string: "(",
  importance: 5,
  noOperands: 0,
};

const endBracket = {
  string: ")",
  importance: 5,
  noOperands: 0,
};

const sinObject = {
    string: 'sin',
    importance: 4,
    noOperands: 1,
    apply: sinExecute,
}

const cosObject = {
    string: 'cos',
    importance: 4,
    noOperands: 1,
    apply: cosExecute,
}

const tanObject = {
    string: 'tan',
    importance: 4,
    noOperands: 1,
    apply: tanExecute,
}

const powObject = {
    string: '^',
    importance: 4,
    noOperands: 2,
    apply: powFunction
}

const modeObject = {
    string: '%',
    importance: 4,
    noOperands: 2,
    apply: modeFunction,
}

const operatorMap = new Map([
  ["+", addObject],
  ["-", subtractObject],
  ["*", multiplyObject],
  ["/", divideObject],
  ["(", openBracket],
  [")", endBracket],
  ["^", powObject],
  ["sin", sinObject],
  ["cos", cosObject],
  ["tan", tanObject],
  ["%", modeObject]
]);

function reset(){
    que = []
    stack = []
    expressionArry = []
    stuntingYardAlgorithmExpression = []
}

function checkEvenBrackets(sum){
    if(sum.split('(').length - 1 != sum.split(')'.length)){
      screen.value = '';
      return;
    }
}

function convertExpressionToArry() {
    
    let expression = input;
    checkEvenBrackets(expression);

    let currentToken = "";

    for (let i = 0; i < expression.length; i++) {
        const currentChar = expression[i];

        if (/\d/.test(currentChar) || (currentChar === "." && /\d/.test(expression[i - 1]))) {
            // If the character is a digit or a dot following a digit, add it to the currentToken
            currentToken += currentChar;
        } else if (currentChar === "-" && (i === 0 || /[\+\-\*\/\^\(]/.test(expression[i - 1]))) {
            // If the character is a minus sign and it's the first character or follows an operator or an opening parenthesis, treat it as a negative sign
            currentToken += currentChar;
        } else if (/[\w]/.test(currentChar)) {
            // If the character is a letter (word character), assume it's part of a function like cos, sin, tan
            currentToken += currentChar;
        } else {
            // If the character is not a digit, a dot following a digit, or a letter, push the currentToken (if not empty) and the current character
            if (currentToken !== "") {
                if (currentToken === 'cos' || currentToken === 'sin' || currentToken === 'tan') {
                    expressionArry.push(currentToken);
                } else {
                    expressionArry.push(parseFloat(currentToken)); // Convert the string to a number
                }
                currentToken = "";
            }
            if (currentChar !== " ") {
                expressionArry.push(currentChar);
            }
        }
    }

    // Check if there's a remaining currentToken after the loop
    if (currentToken !== "") {
        if (currentToken === 'cos' || currentToken === 'sin' || currentToken === 'tan') {
            expressionArry.push(currentToken);
        } else {
            expressionArry.push(parseFloat(currentToken)); // Convert the string to a number
        }
    }

    console.log("EXPRESSION ARRAY IS: ", expressionArry);
    convertShuntingYard(expressionArry);
    let answer = RPNEvaluator(stuntingYardAlgorithmExpression);
    console.log(answer);
    screen.value = RPNEvaluator(stuntingYardAlgorithmExpression);
    reset();
}

function convertShuntingYard(expression) {
  expression.map((x) => {
    if (typeof x === "number") {
      que.push(x);
    } else if(x != "number"){

        if (stack.length === 0) {
            stack.push(x);
        } else if (stack.length != 0) {
              
              if(x === '(' || x === ')'){
                  addBracketToStack(x);
              } else if(x != "number" ){
                  checkForHigherImportance(x);
              }
              
        }
    }});

  console.log("que is: ", que);
  console.log("stack is: ", stack);
  concatenateArraysInReverseOrder();
    
}

function addBracketToStack(expression) {
    if (expression === "(") {
      stack.push(expression);
      console.log("stack: ", stack);
    } else if (expression === ")") {
        let reverseStack =  Array.from(stack).reverse();
        console.log("reverse stack: ", reverseStack);
        reverseStack.map( x=> {
          if(x != '('){
              que.push(stack.pop());
              console.log("poping: ", x);
          }else {
              console.log(stack.pop());
              console.log("new stack is: ", stack);
          }
    })}
}

function checkForHigherImportance(expression) {
    console.log("CHECKING IMPORTANT OF: ", expression);
  if (
        operatorMap.get(expression)?.importance >
        operatorMap.get(stack[stack.length - 1])?.importance || stack[stack.length-1] === '('
  ) {
    stack.push(expression);
    console.log("is higher: ", expression);
    return;
  } else {
    shuntingalgorthimThirdCase(que, stack, expression);
  }
}

function shuntingalgorthimThirdCase(que, stack, operator) {
    stack.map(x => {
        que.push(stack.pop());
    });

    stack.push(operator);
}

function concatenateArraysInReverseOrder() {
    const reversedStack = stack.slice().reverse(); // Create a reversed copy of array2
    stuntingYardAlgorithmExpression = que.concat(reversedStack);
    console.log(stuntingYardAlgorithmExpression);
}


const RPNEvaluator = (input) => {
    const stack = [];
   
    const handleToken = (token) => {
      if (!isNaN(parseFloat(token))) {
        stack.push(token);
        return;
      } 

      let right = 0;
      let left = 0;

      if(token === 'sin' || token === 'cos' || token === 'tan' || token === '√' || token === 'log'){
            right = parseFloat(stack.pop());
      }else{
         right = parseFloat(stack.pop());
         left = parseFloat(stack.pop());
      }
   
      switch (token) {
        case '+': // Addition
          stack.push(left + right);
          return;
        case '-': // Subtraction
          stack.push(left - right);
          return;
        case '*': // Multiplication
          stack.push(left * right);
          return;
        case '/': // Division
            stack.push(left / right);
          return;
        case '^': // Exponentiation
          stack.push(left ** right);
          return;
        case 'sin':
            stack.push(sinExecute(right))
            return;
        case 'cos':
            stack.push(cosExecute(right))
            return;
        case 'tan': 
            stack.push(tanExecute(right))
            return
        case '%':
            stack.push(right % left)
            return
        default:
          throw new Error(`Invalid token: ${token}`);
      }
    };
   
    for (let i of input) {
      if (i === ' ') continue;
   
      handleToken(i);
    }

    return stack.pop();
};

convertExpressionToArry('1-2/3');
console.log(RPNEvaluator(stuntingYardAlgorithmExpression));

