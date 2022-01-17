
document.getElementById('printimg').addEventListener('click', () => {
  var node = document.getElementById('modal-content');
  domtoimage.toPng(node).then((dataUrl) => {
    var image = new Image();
    image.src = dataUrl;
    downloadImg(dataUrl, "bill.png");
  }).then((error) => {
    alertModal("success", "Your bill is downloaded !");
  }).catch((error) => {
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
  // console.log(searchVal);
  let card = document.getElementsByClassName('mainCard');
  Array.from(card).forEach((element) => {
    let cardHead = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
    // console.log(cardHead.innerText);
    const check = cardHead.includes(searchVal);
    if (check) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});


// firebawe starts here


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, doc, deleteDoc, Timestamp, updateDoc, getDoc, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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
const auth = getAuth();
const database = getFirestore(app);
const provider = new GoogleAuthProvider();

function signinUser() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
var ProcductContainer = document.getElementById('productsCard');

// // observing if user logged in or not
onAuthStateChanged(auth, (user) => {
  window.user = user;
  //changing navigation ui wrt login state state
  if (user) {
    changeNavOnUserSignIn(user);
    // changeBodyContentOnUserSignIn();
    addProductsToBody();
    document.getElementById('notSignedIn').style.display = 'none';
    document.getElementById('printBill').classList.remove('d-hid');
  }
});



function changeNavOnUserSignIn(user) {
  document.getElementById('loggedinstate').innerHTML += ` 
  <div class="btn-group dropstart">
      <a style="outline: none;" type="button" class="dropdown-toggle dropdown-toggle" data-bs-toggle="dropdown"
       aria-expanded="false"><img src="${user.photoURL}" style="width:35px;height:35px;border-radius:50%;border:1px solid green;box-shadow: 0 0 5px rgba(0, 128,   0, 0.658);"
       alt=""></a>

      <ul style="z-index:9999;" class="dropdown-menu shadow rounded-3">
      <div class="d-flex flex-column align-items-center">
      <li><img style="border-radius:50%;border:1px solid green;box-shadow: 0 0 5px rgba(0, 128, 0, 0.658);"
          class="mt-4 mb-2 mx-5"
          src="${user.photoURL}"
          alt=""></li>
      <li class=" mx-3 mt-2 fw-bold">${user.displayName}</li>
      <li class="mx-3 mb-2">${user.email}</li>
      <div class="mt-3" style="border-bottom:2px solid WhiteSmoke;width:100%"></div>
      <button style="border-top:1px solid gray;" type="button" id="signoutbtn" class="btn mx-2 my-3 btn-success" onClick="signOutUser()">Sign
      Out</button>
      <div class="mb-2" style="border-bottom:2px solid WhiteSmoke;width:100%"></div>
      <li class="mx-3 my-0 py-0 fw-light text-muted">App by <em><a class="text-dark" href="https://github.com/AyushBawane">Ayush Bawane</a></em>.</li>
    </div>
  </ul>
</div>`;
  document.getElementById('signinBtn').style.display = 'none';
}

async function addProductsToBody() {
  if (user) {
    const querySnapshot = await getDocs(collection(database, `/products`));
    var i = 0;
    querySnapshot.forEach((doc) => {
      var transId = doc.id;
      var data = doc.data();

      var name = data.name;
      var image = data.imageURL;
      var mrp = data.mrp;
      var dp = data.dp;
      var sp = data.sp;
      var cat = data.category;
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
}

var billSet = new Set();
function getId(clickedId) {

  billSet.add(clickedId);
  var thiscard = document.getElementsByClassName('mainCard')[clickedId].classList.add('border-primary');
  var Countbtn = document.getElementsByClassName('countFunc')[clickedId].classList.remove('d-none');

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
    // console.log(value);
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



// // signing out user
function signOutUser() {
  signOut(auth).then(() => {
    document.getElementById('signinBtn').style.display = 'block';
    document.getElementById('loggedinstate').style.display = 'none';
    alertModal('success', 'Logged Out.');
    // document.getElementById('loggedinstate').innerHTML = "";
    setTimeout(() => {
      location.reload();
    }, 2500);
  }).catch((error) => {
    alertModal('danger', 'could not logout, try again.');
  });
}

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
window.signinUser = signinUser;
window.alertModal = alertModal;
window.signOutUser = signOutUser;
window.changeNavOnUserSignIn = changeNavOnUserSignIn;


