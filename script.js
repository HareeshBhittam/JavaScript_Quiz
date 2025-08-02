const facts = [
  {
    statement: 'JavaScript was invented in 1995',
    answer: 'true',
    explanation:
      'Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days.',
  },
  {
    statement: 'console.log(typeof true) = boolean',
    answer: 'true',
    explanation: 'typeof true/false is boolean',
  },
  {
    statement: ' console.log(typeof document.title) = boolean ',
    answer: 'fasle',
    explanation:
      'typeof document.title is String because it is title of the webpage',
  },
  {
    statement: ' console.log(typeof null) = object ',
    answer: 'true',
    explanation:
      'typeof null is object. because some historical accident they set as object but actually it is premetive datatype',
  },
  {
    statement: ' if (var v = 42n) then console.log(typeof v) = number ',
    answer: 'fasle',
    explanation:
      'if (var v = 42n) then console.log(typeof v) = bigint. because it is represent value is too large  ',
  },
  {
    statement: 'console.log(Math.random()) will give any number',
    answer: 'false',
    explanation:
      'console.log(Math.random()) It will give any number between 0 to 1',
  },
  {
    statement: 'Strings in JS are editable values',
    answer: 'false',
    explanation:
      'In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings.',
  },
  {
    statement: '1 + 1 === 2',
    answer: 'true',
    explanation: 'The plus operator gives the sum of two numbers.',
  },
  {
    statement: "'1' + '1' === '2'",
    answer: 'false',
    explanation:
      "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.",
  },
  {
    statement: "typeof ['J', 'S'] === 'array'",
    answer: 'false',
    explanation:
      "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties.  ",
  },
  {
    statement:
      'let b = null;\
        console.log(b); is null',
    answer: 'true',
    explanation:
      'null is a value that represents a deliberate non-value. It is often used to indicate the absence of an object or value that should exist. For example, if you have a variable that should hold an object but it is not yet defined, you can set it to null to indicate that it is intentionally empty. It is a primitive value.',
  },
];

facts.push(
  {
    statement: "typeof NaN === 'number'",
    answer: 'true',
    explanation: 'Despite being "Not a Number", NaN is of type number in JavaScript.',
  },
  {
    statement: "[] == ![]",
    answer: 'true',
    explanation:
      "[] is truthy, but when compared using `==`, coercion makes it `'' == false`, which is true due to type conversion rules.",
  },
  {
    statement: "'5' - 2 === 3",
    answer: 'true',
    explanation:
      "In JavaScript, the `-` operator triggers numeric coercion, so '5' becomes 5 and 5 - 2 equals 3.",
  },
  {
    statement: "'5' + 2 === 7",
    answer: 'false',
    explanation:
      "The `+` operator triggers string concatenation when one operand is a string, so '5' + 2 === '52'.",
  },
  {
    statement: "null == undefined",
    answer: 'true',
    explanation:
      "In loose equality (==), null and undefined are equal to each other and only each other.",
  },
  {
    statement: "let x = {}; let y = {}; x === y",
    answer: 'false',
    explanation:
      "Two distinct object literals are not equal by reference, even if they have identical contents.",
  },
  {
    statement: "typeof function(){} === 'object'",
    answer: 'false',
    explanation:
      "Functions are a special type in JavaScript. `typeof function() {}` returns 'function'.",
  },
  {
    statement: "isNaN('hello') === true",
    answer: 'true',
    explanation:
      "`isNaN('hello')` returns true because 'hello' cannot be coerced into a valid number.",
  },
  {
    statement: "!!null === false",
    answer: 'true',
    explanation:
      "`!!null` converts null to its boolean equivalent, which is false.",
  },
  {
    statement: "console.log(0.1 + 0.2 === 0.3)",
    answer: 'false',
    explanation:
      "Due to floating point precision issues, 0.1 + 0.2 is not exactly equal to 0.3 in JavaScript.",
  }
);


function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function disable(button) {
  button.setAttribute('disabled', '');
}

function enable(button) {
  button.removeAttribute('disabled');
}

let correct = 0;
let completed = 0;

let fact;

const explanation = document.getElementById('explanation');
const nextButton = document.getElementById('next-question');
const optionButtons = document.getElementById('options').children;

function getNextFact() {
  fact = facts.shift(); // get the first fact in our array (shortening the array)

  // set the question text to the current fact's statement
  document.getElementById('statement').textContent = fact.statement;

  // hide any previous explanation
  hide(explanation);

  for (let option of optionButtons) {
    // clear any previous classes
    option.classList.remove('correct');
    option.classList.remove('incorrect');
    // make sure buttons are enabled
    enable(option);
  }

  // disable next-question button
  disable(nextButton);
}

nextButton.addEventListener('click', getNextFact);

for (let option of optionButtons) {
  option.addEventListener('click', (e) => {
    // When this option is clicked...

    // disable all the option buttons
    for (let button of optionButtons) {
      disable(button);
    }

    // enable the 'next question' button, if we still have facts left
    if (facts.length > 0) {
      enable(nextButton);
    } else {
      nextButton.textContent = 'No more questions!';
    }

    const guess = e.target.value;
    if (guess === fact.answer) {
      // correct answer!
      e.target.classList.add('correct');
      correct += 1;
    } else {
      // wrong answer!
      e.target.classList.add('incorrect');
    }

    // display the explanation
    explanation.textContent = fact.explanation;
    show(explanation);

    // update the score
    completed += 1;
    document.getElementById('correct').textContent = correct;
    document.getElementById('completed').textContent = completed;
  });
}

getNextFact();
