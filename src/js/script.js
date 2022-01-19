
document.getElementById('printimg').addEventListener('click', () => {
  var node = document.getElementById('modal-content');
  domtoimage.toPng(node).then((dataUrl) => {
    var image = new Image();
    image.src = dataUrl;
    downloadImg(dataUrl, "bill.png");
  }).then(() => {
    alertModal("success", "Your bill is downloaded !");
  }).catch(() => {
    alertModal("danger", "cannot print bill..! take screenshot!!");
  });
});
function downloadImg(url, name) {
  var a = document.createElement('a');
  a.download = name;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const searchBox = document.querySelector('.searchBox');
searchBox.addEventListener('input', () => {
  let searchVal = searchBox.value.toLowerCase();
  let card = document.getElementsByClassName('mainCard');
  Array.from(card).forEach((element) => {
    let cardHead = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
    const check = cardHead.includes(searchVal);
    if (check) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});


// firebawe starts here
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNteqoJgdIVNrD2SPQwSn0wWKCCDEoDEA",
  authDomain: "awplbillmaker.firebaseapp.com",
  projectId: "awplbillmaker",
  storageBucket: "awplbillmaker.appspot.com",
  messagingSenderId: "155160500516",
  appId: "1:155160500516:web:84bf63a0543c6c76763bb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

var ProcductContainer = document.getElementById('productsCard');

addProductsToBody();


async function addProductsToBody() {
  const querySnapshot = await getDocs(collection(database, `/products`));
  var i = 0;
  querySnapshot.forEach((doc) => {
    var data = doc.data();
    var name = data.name;
    var image = data.imageURL;
    var mrp = data.mrp;
    var dp = data.dp;
    var sp = data.sp;
    ProcductContainer.innerHTML += `
      <div class="card m-2 mainCard" style="width: 18rem;">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body text-center">
      <h5 class="card-title">${name}</h5>
      <div class="card-text m-0 ">
      <p class="m-0 ">
      MRP-rate : <span class="mrp-rate">${mrp}</span>
      </p>
      <p class="m-0 ">
      DP-rate : <span class="dp-rate">${dp}</span>
      </p>
      <p class="m-0 mb-2 ">
      SP : <span class="sp-count">${sp}</span>
      </p>
      </div>
      <button type="button" id="${i}" onclick="getId(this.id)" class="btn itemadd btn-primary">Add Item </button>
      <div class="countFunc d-none d-inline">
      <button type="button" id="${i}" onclick="manipulateVal(this)" class="btn itemadd m-0 p-1">+</button>
      <div class="itemCount d-inline p-1 m-0 ">0</div>
      <button type="button" id="${i}" onclick="manipulateVal(this)"
      class="btn itemsubs m-0 p-1">-</button>
      </div>
      </div>
      </div>`;
    i++;
  });
}

var billSet = new Set();
function getId(clickedId) {

  billSet.add(clickedId);
  document.getElementsByClassName('mainCard')[clickedId].classList.add('border-primary');
  document.getElementsByClassName('countFunc')[clickedId].classList.remove('d-none');

}

function manipulateVal(params) {
  let sign = params.innerText;
  let id = params.id;
  let countTxt = parseInt(document.getElementsByClassName('itemCount')[id].innerText);
  var count;
  if (sign == '+') {
    count = countTxt + 1;
    document.getElementsByClassName('itemCount')[id].innerText = count;
  } else if (sign == '-') {
    if (countTxt != 0) {
      count = countTxt - 1;
      document.getElementsByClassName('itemCount')[id].innerText = count;
    }
  }
}

var showBill = document.getElementById('printBill');
showBill.addEventListener('click', () => {
  document.querySelector('.modal-dynamic').innerHTML = '';
  var arrmrp = [];
  var arrdp = [];
  var arrsp = [];
  billSet.forEach(value => {
    var thismrp = parseInt(document.getElementsByClassName('mrp-rate')[value].innerText);
    var thisdp = parseInt(document.getElementsByClassName('dp-rate')[value].innerText);
    var thissp = parseFloat(document.getElementsByClassName('sp-count')[value].innerText);
    var thistitle = document.getElementsByClassName('card-title')[value].innerText.toUpperCase();
    var thisItemCount = parseInt(document.getElementsByClassName('itemCount')[value].innerText);
    console.log(thismrp, thisdp, thissp, thistitle, thisItemCount);

    if (thisItemCount != 0) {
      var content = `<div class="row px-1 ">
      <div class="col-6 bg-light border py-2">${thistitle} (${thisItemCount})</div>
      <div class="col-2 mrpval bg-light border py-2">${thismrp}</div>
      <div class="col-2 dpval bg-light border py-2">${thisdp}</div>
      <div class="col-2 spval bg-light border py-2">${thissp}</div>
      </div>`;
      document.querySelector('.modal-dynamic').innerHTML += content;

      arrmrp.push(thismrp * thisItemCount);
      arrdp.push(thisdp * thisItemCount);
      arrsp.push(thissp * thisItemCount);
    }
  });

  var totalmrp = arrmrp.reduce((a, b) => {
    return a + b;
  }, 0);
  var totaldp = arrdp.reduce((a, b) => {
    return a + b;
  }, 0);
  var totalsp = arrsp.reduce((a, b) => {
    return a + b;
  }, 0);
  document.getElementById('mrpcalc').innerText = totalmrp;
  document.getElementById('dpcalc').innerText = totaldp;
  document.getElementById('spcalc').innerText = totalsp;

  var n = new Date().toDateString();
  document.getElementById('date').innerHTML = n;
});

function alertModal(type, messege) {
  var alertBody = document.getElementById('alertContainer');
  var mode;
  switch (type) {
    case 'success':
      mode = 'Success ! ';
      break;
    case 'warning':
      mode = 'Alert ! ';
      break;
    case 'danger':
      mode = 'Alert ! ';
      break;
    default:
      mode = '';
      break;
  }
  alertBody.innerHTML = `
  <div id="alertContent" class="alert alert-${type} fade show shadow" role="alert">
      <strong>${mode}</strong>${messege}
      </div>`;
  setTimeout(() => {
    document.getElementById('alertContent').style.display = 'none';
  }, 2500);
}

window.getId = getId;
window.manipulateVal = manipulateVal;
window.alertModal = alertModal;


