
// // start of new file
// wellnessName = ["Free You ANION SANITARY PAD","Genodoc Wash","Veindoc Oil","H Doc Hand Sanitizer","Ayush Kwath","Joint Curator Oil","EXE PANCH TULSI OIL","EXE JC OINT","Herbal Green Tea","ADIDOC Drop","Triphala Ras","Coughdoc Ras","EXE Herbal Mehandi","Exe Wheat Grass Powder","EXE B-TON OINT","VIRALDOC","Kidgdoc","Prassdoc","Alrgydoc Ras","Braindoc Ras","GYNEDOC","Daibodoc Ras","Livodoc","IMMUNODOC","FEVODOC PRAVAHI KWATH","ORTHODOC PRAVAHI KWATH","Cardiodoc","Thunder Blast","Pilodoc Ras","Stondoc","THYDOC PRAVAHI KWATH","Chlorodoc Ras","Obeodoc"];

// FaceName = ["EXE ALOEVERA CUCUMBER CREAM","EXE HERBAL FACE WASH","EXE HERBAL FACE PACK CREAM","EXE HERBAL FACE SCRUB CREAM","EXE ALOEVERA SAFFRON OINT","EXE HEAL DOC CREAM"];
// FaceImage = ["EXE ALOEVERA CUCUMBER CREAM","EXE HERBAL FACE WASH","EXE HERBAL FACE PACK CREAM","EXE HERBAL FACE SCRUB CREAM","EXE ALOEVERA SAFFRON OINT","EXE HEAL DOC CREAM"];
// HairName = ["EXE HAIR CLEANSER","HAIR DOC","EXE HAIR SHINE OINT"];
// HairName = ["DENTODOC Dental Cream"];
// FoodName = ["FENNELDOC Drop","Immunity Drop","DIGIDOC Powder","Giloy Capsule","STEVIADOC Drop","Giloy Juice","FITDOC Powder","CURCIDOC Drop","G-COFFEEDOC","BERRYDOC Capsule","CURCIDOC Capsule","MORIDOC Capsule","OMEGADOC Capsule","COW-C-DOC Capsule","SPIRADOC Capsule","Noni Juice","SEABUCKDOC Juice","VITADOC Capsule","SLIMDOC Powder","BERRYDOC Juice","HEIGHTDOC Powder","MASSDOC Powder","MUSCLEDOC powder"];


//   var temp = "";
//   var face = document.getElementById('wellnessProducts');
// FaceName.forEach((element)=>{
//   var faceinner = document.getElementById('wellnessProducts').innerHTML;
//   // console.log(faceinner);
//   face.innerHTML = faceinner + `<div class="card m-2 mainCard" style="width: 18rem;">
//         <img src="beauty/EXE_ALOEVERA_CUCUMBER_CREAM.jpg" class="card-img-top" alt="...">
//         <div class="card-body text-center">
//         <h5 class="card-title">${element}</h5>
//           <div class="card-text m-0 ">
//             <p class="m-0 ">
//               MRP-rate : <span class="mrp-rate">138</span>
//             </p>
//             <p class="m-0 ">
//               DP-rate : <span class="dp-rate">115</span>
//             </p>
//             <p class="m-0 ">
//               SP : <span class="sp-count">0.50</span>
//             </p>
//             <p class="m-0 ">
//               id : ${id}
//             </p>

//             <p class="qty">
//               Qty. : 10 pc.
//             </p>
//           </div>
//           <button type="button" id="0 " onClick="getId()" class="btn itemadd btn-primary">Add Item</button>
//         </div>
//       </div>`;
      
// });

// end of new file

var clickedId;
var thismrp;
var thisdp;
var thissp;
var thistitle;
var thiscard;
function getId() {
  clickedId = parseInt(event.target.id);
  //  console.log(clickedId);
  thiscard = document.getElementsByClassName('mainCard')[clickedId].classList.add('border-primary');
  thismrp = parseInt(document.getElementsByClassName('mrp-rate')[clickedId].innerText);
  thisdp = parseInt(document.getElementsByClassName('dp-rate')[clickedId].innerText);
  thissp = parseFloat(document.getElementsByClassName('sp-count')[clickedId].innerText);
  thistitle = document.getElementsByClassName('card-title')[clickedId].innerText.toUpperCase();

  var content = `<div class="row px-1 ">
  <div class="col-6 bg-light border py-2">${thistitle}</div>
  <div class="col-2 mrpval bg-light border py-2">${thismrp}</div>
  <div class="col-2 dpval bg-light border py-2">${thisdp}</div>
  <div class="col-2 spval bg-light border py-2">${thissp}</div>
  </div>`;
  var appending = document.querySelector('.modal-dynamic').innerHTML = document.querySelector('.modal-dynamic').innerHTML + content;


}

var mrparr = [];
var dparr = [];
var sparr = [];
var gettotal = document.getElementById('printBill');
gettotal.addEventListener('click', ()=> {
  var getmrp = document.getElementsByClassName('mrpval');
  var getdp = document.getElementsByClassName('dpval');
  var getsp = document.getElementsByClassName('spval');
  for (var i = 0; i < getmrp.length; i++) {
    var mrppush = parseInt(getmrp[i].innerText);
    var dppush = parseInt(getdp[i].innerText);
    var sppush = parseFloat(getsp[i].innerText);
    // console.log(mrppush);
    mrparr.push(mrppush);
    dparr.push(dppush);
    sparr.push(sppush);
  }
  var totalmrp = mrparr.reduce((a, b)=> {
    return a + b;
  }, 0);
  var totaldp = dparr.reduce((a, b)=> {
    return a + b;
  }, 0);
  var totalsp = sparr.reduce((a, b)=> {
    return a + b;
  }, 0);
  // console.log(totalmrp);
  document.getElementById('mrpcalc').innerText = totalmrp;
  document.getElementById('dpcalc').innerText = totaldp;
  document.getElementById('spcalc').innerText = totalsp;
  mrparr = [];
  dparr = [];
  sparr = []; 
  
  var n = new Date();
  var y = n.getFullYear();
  var m = n.getMonth() + 1 ;
  var d = n.getDate(); 
  document.getElementById('date').innerHTML = d + "-" + m + "-" + y;
});

document.getElementById('printimg').addEventListener('click', ()=> {
  var node = document.getElementById('modal-content');
  domtoimage.toPng(node).then((dataUrl)=> {
    var image = new Image(); 
    image.src = dataUrl;
    downloadImg(dataUrl, "bill.png");
  }).catch((error)=> {
    alert("cannot print bill..! take screenshot!!");
  });
});
function downloadImg(url , name) {
  var a = document.createElement('a');
  a.download = name;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  delete a;
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

 