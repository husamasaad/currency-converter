const input = document.getElementById('amount-from');
const types = [...document.querySelectorAll('.input > span')];
const switchBtn = document.querySelector('.exchange-i');
const date = document.getElementById('date');



window.addEventListener("DOMContentLoaded", updateAmount);

input.addEventListener('input', updateAmount);

switchBtn.addEventListener("click", () => {
  let curFrom = document.getElementById('currency-from').innerText;
  let curTO = document.getElementById('currency-to').innerText;

  document.getElementById('currency-from').innerText = curTO;
  document.getElementById('currency-to').innerText = curFrom;

  updateAmount();
})


function updateAmount() {
  fetch("https://api.currencyfreaks.com/latest?apikey=1c6df18c260c419b83ea89ab0916fa52")
  .then((result) => {
    let myData = result.json();
    return myData;
  }).then((cur) => {
    bulidCurLists(cur);
    date.textContent = cur.date.split(' ')[0];
    let curFrom = document.getElementById('currency-from').innerText;
    let curTO = document.getElementById('currency-to').innerText;
    let amountF = document.getElementById("amount-from");
    let amountT = document.getElementById("amount-to");

    if (curFrom === "USD") {
      amountT.value = (amountF.value * cur.rates[`${curTO}`]).toFixed(4);
    } else {
      let inUSD = amountF.value / cur.rates[`${curFrom}`];
      amountT.value = (inUSD * cur.rates[`${curTO}`]).toFixed(4);
    }
  })
}

function bulidCurLists(cur) {
  let list = Object.keys(cur.rates);
  let curLists = [...document.querySelectorAll(".cur-list")];
  curLists.forEach((lis) => {
    list.forEach((type) => {
      let li = document.createElement('li');
      li.innerText = `${type}`;
      lis.appendChild(li);
      switchCur(lis, li , type);
    })
  })
  showCurEvent();
}


function showCurEvent() {
  let arrows = [...document.querySelectorAll(".input > span i")];

  arrows.forEach((ar) => {
    ar.onclick = () => {
      ar.parentElement.classList.toggle('show');
    }
  })
}


function switchCur(lis, li, type) {

  li.onclick = () => {
    let currFrom = document.getElementById('currency-from');
    let currTo = document.getElementById('currency-to');
    if (lis.previousElementSibling == currFrom) {
      currFrom.textContent = type;
      currFrom.parentElement.parentElement.classList.toggle('show');
    }
    if (lis.previousElementSibling.id == currTo.id) {
      currTo.textContent = type;
      currTo.parentElement.parentElement.classList.toggle('show');
    }
    updateAmount();
  }
}