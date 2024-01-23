let screen=document.querySelector('#screen')
let input = ''

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

let operators = {
  startBracket: '(',
  endBracket: ')',
  add: '+',
  sub: '-',
  div: '/',
  mlt: '*',
  mod: '%',
  exp: '^'
};

operators.order = [
  [
    [operators.startBracket],
    [operators.mlt],
    [operators.div],
    [operators.mod],
    [operators.exp]
  ],
  [
    [operators.add],
    [operators.sub]
  ]
];

function _calculate(a, op, b) {
  a = a * 1;
  b = b * 1;
  switch (op) {
    case operators.add:
      return a + b;
    case operators.sub:
      return a - b;
    case operators.div:
      return a / b;
    case operators.mlt:
      return a * b;
    case operators.mod:
      return a % b;
    case operators.exp:
      return Math.pow(a, b);
    default:
      return null;
  }
}

function calculate(input) {
  input = input.replace(/[^0-9%^*\/()\-+.]/g, ''); // Clean up unnecessary characters
  let output;

  while (input.includes(operators.startBracket)) {
    const openBracketIndex = input.lastIndexOf(operators.startBracket);
    const closeBracketIndex = input.indexOf(operators.endBracket, openBracketIndex);

    if (closeBracketIndex === -1) {
      console.error('Unmatched opening bracket');
      return undefined;
    }

    const bracketContent = input.slice(openBracketIndex + 1, closeBracketIndex);
    const bracketResult = calculate(bracketContent);

    if (isNaN(bracketResult) || !isFinite(bracketResult)) {
      console.error('Error evaluating bracket content');
      return undefined;
    }

    input =
      input.slice(0, openBracketIndex) +
      bracketResult +
      input.slice(closeBracketIndex + 1);
  }

  for (let i = 0, n = operators.order.length; i < n; i++) {
    let re = new RegExp('(\\d+\\.?\\d*)([\\' + operators.order[i].join('\\') + '])(\\d+\\.?\\d*)');
    re.lastIndex = 0;

    while (re.test(input)) {
      output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
      if (isNaN(output) || !isFinite(output)) {
        return output;
      }
      input = input.replace(re, output);
    }
  }

  screen.value= output;
  return output;
}




// Example usage




// let screen=document.querySelector('#screen');
// let btn=document.querySelectorAll('.btn');

//     for(let item of btn)
//     {
//             item.addEventListener('click',(e)=>{
//                 let btntext = e.target.innerText;

//                 if(btntext =='×')
//                 {
//                     btntext= '*';
//                 }

//                 if(btntext=='÷')
//                 {
//                     btntext='/';
//                 }
//                 screen.value+=btntext;
//             });
//     }

//     function sin()
//     {
//         screen.value=Math.sin(screen.value);
//     }

//     function cos()
//     {
//         screen.value=Math.cos(screen.value);
//     }

//     function tan()
//     {
//         screen.value=Math.tan(screen.value);
//     }

//     function pow()
//     {
//         screen.value=Math.pow(screen.value,2);
//     }

//     function sqrt()
//     {
//         screen.value=Math.sqrt(screen.value,2);
//     }

//     function log()
//     {
//         screen.value=Math.log(screen.value);
//     }

//     function pi()
//     {
//         screen.value= 3.14159265359;
//     }

//     function e()
//     {
//         screen.value=2.71828182846;
//     }

//     function fact()
//     {
//         let  i, num, f;
//         f=1
//         num=screen.value;
//         for(i=1; i<=num; i++)
//         {
//             f=f*i;
//         }

//         i= i-1;

//         screen.value=f;
//     }

//     function backspc()
//     {
//         screen.value=screen.value.substr(0,screen.value.length-1);
//     }


//     function check(){
//         let a = 5(5*6)+1;
//         console.log(a);
//     }

//     check();
