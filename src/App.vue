<script setup>
import {ref} from 'vue';

var value = 0;
var buffer = '';
const screenValue = ref(value);
const limitNumberOfDigits = 12;
const operator = ref('');
const isError = ref(false);
const isPointed = ref(false);

const inputNumber = (n) => {
  if (buffer.length < limitNumberOfDigits) {
    appendBuffer(n);
  } else {
    isError.value = true;
    setTimeout(() => { isError.value = false }, 200);
  }
  screenValue.value = buffer;
};

const appendBuffer = (n) => {
  if ((n === '0' || n === '00') && (buffer === '' ||  buffer === '0')) {
    buffer = '0';
  } else if (buffer === '0') {
    buffer = n;
  } else {
    buffer += n;
  }
};

const switchSign = () => {
  if (buffer === '') {
    value *= (-1);
    screenValue.value = value.toString();
  } else {
    buffer = (parseFloat(buffer) * (-1)).toString();
    screenValue.value = buffer;
  }
};

const calculate = () => {
  switch (operator.value) {
    case '＋':
      value += parseFloat(buffer);
      break;
    case '－':
      value -= parseFloat(buffer);
      break;
    case '×':
      value *= parseFloat(buffer);
      break;
    case '÷':
      value /= parseFloat(buffer);
      break;
    case '％':
      value %= parseFloat(buffer);
      break;
    default:
  }
  screenValue.value = value.toString().length > limitNumberOfDigits
    ? value.toPrecision(limitNumberOfDigits - 4)
    : value.toString();
};

const setOperator = (o) => {
  if (operator.value.length > 0 && buffer.length > 0) {
    calculate();
  } else if (buffer.length > 0) {
    value = parseFloat(buffer);
  }
  operator.value = o;
  buffer = '';
  isPointed.value = false;
};

const appendPoint = () => {
  buffer += (buffer.length === 0 ? '0' : '')
         + (isPointed.value ? '' : '.');
  screenValue.value = buffer;
  isPointed.value = true;
};

const clearAll = () => {
  value = 0;
  buffer = '';
  screenValue.value = '0';
  operator.value = '';
  isPointed.value = false;
};

const equals = () => {
  calculate();
  operator.value = '';
  buffer = '';
  isPointed.value = false;
};

const copyMessage = ref('');
const copyScreen = () => {
  navigator.clipboard.writeText(screenValue.value)
  .then(
    () => {
      copyMessage.value = 'C O P I E D ❤';
      setTimeout(() => { copyMessage.value = ''; }, 500);
    },
    () => {
      copyMessage.value = 'C O P Y - F A I L E D 🚫';
      setTimeout(() => { copyMessage.value = ''; }, 500);
    }
  );
};
</script>

<template>
  <div id="calculator">
    <div id="screen" :class="{'error': isError}">
      <div class="subscreen">
        <p class="copy-message">{{ copyMessage }}</p>
        <p class="operator">{{ operator }}</p>
      </div>
      <p class="digits" @click="copyScreen">{{ screenValue }}</p>
    </div>
    <button class="function" @click="clearAll">AC</button>
    <button class="operator" @click="switchSign()">+/-</button>
    <button class="operator" @click="setOperator('％')">%</button>
    <button class="operator" @click="setOperator('÷')">÷</button><br>
    <button class="number" @click="inputNumber('7')">7</button>
    <button class="number" @click="inputNumber('8')">8</button>
    <button class="number" @click="inputNumber('9')">9</button>
    <button class="operator" @click="setOperator('×')">×</button><br>
    <button class="number" @click="inputNumber('4')">4</button>
    <button class="number" @click="inputNumber('5')">5</button>
    <button class="number" @click="inputNumber('6')">6</button>
    <button class="operator" @click="setOperator('－')">－</button><br>
    <button class="number" @click="inputNumber('1')">1</button>
    <button class="number" @click="inputNumber('2')">2</button>
    <button class="number" @click="inputNumber('3')">3</button>
    <button class="operator" @click="setOperator('＋')">＋</button><br>
    <button class="number" @click="inputNumber('0')">0</button>
    <button class="number" @click="inputNumber('00')">00</button> 
    <button class="number" @click="appendPoint()">.</button>
    <button class="operator" @click="equals()">＝</button>
  </div>
</template>

<style>
#calculator {
  border: 1px #000000 solid;
  border-radius: 6px 6px 6px 6px;
  width: 252px;
  height: 380px;
  background-color: #444444;
}

#screen {
  border: 1px #000000 solid;
  border-radius: 6px 6px 6px 6px;
  background-color: #cceeff;
  width: 206px;
  height: 64px;
  margin-left: 20px;
  margin-top: 20px;
  padding: 0px;
}

#screen.error {
  background-color: #ff6666;
}

#screen p.operator {
  display: flex;
  width: 50px;
  height: 16px;
  margin-left: 0px;
  margin-top: 4px;
  padding-left: 12px;
  padding-right: 12px;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  font-size: 16px;
  color: #000000;
}

#screen p.digits {
  display: flex;
  width: 100%;
  height: 48px;
  margin-left: 0px;
  margin-top: 0px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 0px;
  padding-bottom: 0px;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  font-size: 30px;
  color: #000000;
  font-family: 'Ds-Digit';
}

.subscreen {
  display: flex;
  flex-shrink: 0;
  overflow: clip;
  justify-content: flex-end;
}

.copy-message {
  font-family: 'Ds-Digit';
  font-size: 12px;
  color: #000000;
}

button {
  border: 1px #000000 solid;
  border-radius: 4px 4px 4px 4px;
  width:36px;
  height: 36px;
  margin-left: 20px;
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
}

button.number {
  background-color: #666666;
  color: #ffffff;
}

button.number:hover {
  background-color: #999999;
}

button.number:active {
  background-color: #ff9999;
}

button.operator {
  background-color: #ffcc00;
  color: #000000;
}

button.operator:hover {
  background-color: #ffee00;
}

button.operator:active {
  background-color: #ff9900;
}

button.function {
  background-color: #ff6666;
  color: #ffffff;
}

button.function:hover {
  background-color: #ff9999;
}
</style>
