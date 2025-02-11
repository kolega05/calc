window.onload = function () {
  let a = ''
  let b = ''
  let expressionResult = ''
  let selectedOperation = null
  const body = document.body;
  // окно вывода результата
  outputElement = document.getElementById("result")
  // список объектов кнопок циферблата (id которых начинается с btn_digit_)
  digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
        a += digit
      }
      outputElement.innerHTML = a
    } else {
      if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
        b += digit
        outputElement.innerHTML = b
      }
    }
  }
  // устанавка колбек-функций на кнопки циферблата по событию нажатия
  digitButtons.forEach(button => {
    button.onclick = function () {
      const digitValue = button.innerHTML
      onDigitButtonClicked(digitValue)
    }
  });
  // установка колбек-функций для кнопок операций
  document.getElementById("btn_op_mult").onclick = function () {
    if (a === '') return
    selectedOperation = 'x'
  }
  document.getElementById("btn_op_percent").onclick = function () {
    if (a === '') return
    selectedOperation = '%'
  }
  document.getElementById("btn_op_plus").onclick = function () {
    if (a === '') return
    selectedOperation = '+'
  }
  document.getElementById("btn_op_minus").onclick = function () {
    if (a === '') return
    selectedOperation = '-'
  }
  document.getElementById("btn_op_div").onclick = function () {
    if (a === '') return
    selectedOperation = '/'
  }
  document.getElementById("btn_pow").onclick = function () {
    if (selectedOperation === '') {
      if (a !== '') {
        a = (+a) * (+a);
      }
      outputElement.innerHTML = a
    } else {
      if (b !== '') {
        b = (+b) * (+b);
      }
      outputElement.innerHTML = b // Обновляем отображение, показывая a и b
    }
  };


  document.getElementById("btn_fac").onclick = function () {
    let result; // Объявление result вне блоков if/else
    if (selectedOperation === '') {
      if (a !== '' && (+a) >= 0) { // Проверка на неотрицательное число
        result = 1;
        for (let i = 2; i <= (+a); i++) {
          result *= i;
        }
        a = result.toString(); // Преобразуем результат обратно в строку
      }
      outputElement.innerHTML = a;
    } else {
      if (b !== '' && (+b) >= 0) { // Проверка на неотрицательное число
        result = 1;
        for (let i = 2; i <= (+b); i++) {
          result *= i;
        }
        b = result.toString(); // Преобразуем результат обратно в строку
      }
      outputElement.innerHTML = b;
    }
  };

  document.getElementById("btn_sqrt").onclick = function () {
    if (selectedOperation === '') {
      if (a !== '') {
        a = Math.sqrt(+a);
      }
      outputElement.innerHTML = a
    } else {
      if (b !== '') {
        b = Math.sqrt(+b);
      }
      outputElement.innerHTML = b // Обновляем отображение, показывая a и b
    }
  };

  document.getElementById("btn_digit_background").onclick = function () {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    body.style.backgroundColor = randomColor;
  };

  document.getElementById("btn_result").onclick = function () {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    result.style.backgroundColor = randomColor;
  };



  document.getElementById("btn_op_sign").onclick = function () {
    if (a === '') return; // Проверка на пустую переменную a
    a = -parseFloat(a); // Меняем знак числа a
    outputElement.innerHTML = a;     // Обновляем вывод
  };

  // кнопка очищения
  document.getElementById("btn_op_clear").onclick = function () {
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = 0
  };

  document.getElementById("btn_op_DEL").onclick = function () {
    if (selectedOperation === '') { //Если операция не выбрана, удаляем из 'a'
      if (a !== '') {
        a = a.slice(0, -1); // Удаляем последний символ из строки 'a'
      }
      outputElement.innerHTML = a
    } else { //Если операция выбрана, удаляем из 'b'
      if (b !== '') {
        b = b.slice(0, -1); // Удаляем последний символ из строки 'b'
      }
      outputElement.innerHTML = b // Обновляем отображение, показывая a и b
    }
  };



  // кнопка расчѐта результата
  document.getElementById("btn_op_equal").onclick = function () {
    if (a === '' || b === '' || !selectedOperation)
      return
    switch (selectedOperation) {
      case 'x':
        expressionResult = (+a) * (+b)
        break;
      case '+':
        expressionResult = (+a) + (+b)
        break;
      case '-':
        expressionResult = (+a) - (+b)
        break;
      case '/':
        expressionResult = (+a) / (+b)
        break;
      case '%':
        if ((+b) < 100) {
          expressionResult = (+a) * (+b) / 100
        }
        if ((+b) >= 100) {
          expressionResult = (+a) * (100 + (+b)) / 100
        }
        break;
    }
    a = expressionResult.toString()
    b = ''
    selectedOperation = null
    outputElement.innerHTML = a
  }
};