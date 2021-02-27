// var cards = document.getElementsByClassName('mainCard');
// //console.log(cards.length);
// for (var i = 0; i < cards.length ; i++) {
// var cards1 = document.getElementsByClassName('itemadd')[i];
// var cs = cards1.getAttribute("id");
// // console.log(cs);
// }
var clickedId;
var thismrp ; 
var thisdp ;
var thissp ;
function getId() {
  clickedId = parseInt(event.target.id);
  //  console.log(clickedId);
  thismrp = parseInt(document.getElementsByClassName('mrp-rate')[clickedId].innerText);
  thisdp = parseInt(document.getElementsByClassName('dp-rate')[clickedId].innerText);
  thissp = parseFloat(document.getElementsByClassName('sp-count')[clickedId].innerText);
  var thistitle = document.getElementsByClassName('card-title')[clickedId].innerText.toUpperCase();

  var content = `<div class="row px-1 ">
  <div class="col-6 bg-light border py-2">${thistitle}</div>
  <div class="col-2 mrpval bg-light border py-2">${thismrp}</div>
  <div class="col-2 dpval bg-light border py-2">${thisdp}</div>
  <div class="col-2 spval bg-light border py-2">${thissp}</div>
  </div>`;
  var appending = document.querySelector('.modal-dynamic').innerHTML = document.querySelector('.modal-dynamic').innerHTML + content;

  // var total = parseInt(document.getElementById('mrpcalc').innerText);
  // console.log(total);
  // total.innerText = parseInt(document.getElementById('mrpcalc').innerText) + thismrp;
  // console.log(content);
  // console.log(thistitle);
  // console.log(thismrp);
  // console.log(thisdp);
  // console.log(thissp);


// function genBill() {
//   var mrpres = parseInt(document.getElementsByClassName('mrpval').innerText);
  
 // console.log(mrpres);
  //for (var i = 0; i < mrpres.length; i++) {
  //  var mrpres1 = parseInt(document.getElementsByClassName('mrpval')[i].innerText); 
   // console.log(mrpres1);
   
   // console.log(tprice);
    // console.log(mrpres[i].innerText);

    // var totalmrp = parseInt(mrpres[i].innerText) + parseInt(totalmrp) ;
  //}

}

const searchBox = document.querySelector('.searchBox');
searchBox.addEventListener('input', ()=> {
  let searchVal = searchBox.value.toLowerCase();
  // console.log(searchVal);
  let card = document.getElementsByClassName('mainCard');
  Array.from(card).forEach((element)=> {
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

var allP = document.querySelector('#allProducts');
allP.addEventListener('click', function() {
  console.log("okay");
  document.querySelector('.wellnessProducts').style.display = "block";
  document.querySelector('.beautyProducts').style.display = "block";
  document.querySelector('.hairProducts').style.display = "block";
  document.querySelector('.oralProducts').style.display = "block";
  document.querySelector('.foodProducts').style.display = "block";
});

var wellnessP = document.querySelector('#wellnessP');
wellnessP.addEventListener('click', function() {
  console.log("okay");
  document.querySelector('.wellnessProducts').style.display = "block";
  document.querySelector('.beautyProducts').style.display = "none";
  document.querySelector('.hairProducts').style.display = "none";
  document.querySelector('.oralProducts').style.display = "none";
  document.querySelector('.foodProducts').style.display = "none";
});

var beautyP = document.querySelector('#beautyP');
beautyP.addEventListener('click', function() {
  console.log("okay");
  document.querySelector('.wellnessProducts').style.display = "none";
  document.querySelector('.beautyProducts').style.display = "block";
  document.querySelector('.hairProducts').style.display = "none";
  document.querySelector('.oralProducts').style.display = "none";
  document.querySelector('.foodProducts').style.display = "none";
});
var hairP = document.querySelector('#hairP');
hairP.addEventListener('click', function() {
  console.log("okay");
  document.querySelector('.wellnessProducts').style.display = "none";
  document.querySelector('.beautyProducts').style.display = "none";
  document.querySelector('.hairProducts').style.display = "block";
  document.querySelector('.oralProducts').style.display = "none";
  document.querySelector('.foodProducts').style.display = "none";
});

var oralP = document.querySelector('#oralP');
oralP.addEventListener('click', function() {
  console.log("okay");
  document.querySelector('.wellnessProducts').style.display = "none";
  document.querySelector('.beautyProducts').style.display = "none";
  document.querySelector('.hairProducts').style.display = "none";
  document.querySelector('.oralProducts').style.display = "block";
  document.querySelector('.foodProducts').style.display = "none";
});

var foodP = document.querySelector('#foodP');
foodP.addEventListener('click', function() {
  console.log("okay");
  document.querySelector('.wellnessProducts').style.display = "none";
  document.querySelector('.beautyProducts').style.display = "none";
  document.querySelector('.hairProducts').style.display = "none";
  document.querySelector('.oralProducts').style.display = "none";
  document.querySelector('.foodProducts').style.display = "block";
});