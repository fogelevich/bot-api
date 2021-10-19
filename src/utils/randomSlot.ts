/* eslint-disable */
// @ts-nocheck
function countRepeatElementsinArray(array) {
  const obj = [...array].reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
  return obj;
}

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function combinate(currentElement, n) {
  let array = [];
  let index = 0;
  function recursive(arr, curEl, count) {
    count--;
    for (let i = 0; i < arr.length; i++) {
      let cEl = [...curEl, arr[i]];
      if (count > 0) {
        recursive(arr, cEl, count);
      } else {
        if (cEl.length > 2) {
          array[index++] = cEl;
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    recursive(currentElement, [], i + 1);
  }
  return array;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sumOfWeights(weighted) {
  return Object.values(weighted).reduce((res, val) => res + val);
}

function randomWeighted(weighted: any) {
  const max = sumOfWeights(weighted);
  let target = randomInteger(1, max);

  for (const prop in weighted) {
    /*eslint no-prototype-builtins: "off"*/
    if (weighted.hasOwnProperty(prop)) {
      if (target <= weighted[prop]) {
        return prop;
      }
      target -= weighted[prop];
    }
  }
}

export function randomSlot() {
  const carsEmojiArr = shuffleArray(
    combinate(['\u{1f69c}', '\u{1f69a}', '\u{1f697}'], 3)
  );

  // 10% discount - probability 25% | 15% discount - probability 25%
  const discount = randomWeighted({
    '10percent': 4,
    '15percent': 1,
    noDiscount: 15
  });

  let slot = '';
  let win = false;
  switch (discount) {
    case '10percent':
      slot = carsEmojiArr.find((el) => {
        const objRepeats = countRepeatElementsinArray(el);
        return (
          objRepeats['\u{1f69c}'] === 2 ||
          objRepeats['\u{1f69a}'] === 2 ||
          objRepeats['\u{1f697}'] === 2
        );
      });
      win = true;
      break;
    case '15percent':
      slot = carsEmojiArr.find((el) => {
        const objRepeats = countRepeatElementsinArray(el);
        return (
          objRepeats['\u{1f69c}'] === 3 ||
          objRepeats['\u{1f69a}'] === 3 ||
          objRepeats['\u{1f697}'] === 3
        );
      });
      win = true;
      break;
    case 'noDiscount':
      slot = carsEmojiArr.find((el) => {
        const objRepeats = countRepeatElementsinArray(el);
        return (
          objRepeats['\u{1f69c}'] === 1 &&
          objRepeats['\u{1f69a}'] === 1 &&
          objRepeats['\u{1f697}'] === 1
        );
      });
      break;
    default:
      console.log(discount);
  }

  return {discount, slot, win};
}
