/* Cell Counter JS v0.2 - By Francis Guinto www.francisguinto.com */
// dilution factor
var df = 2;
// number of squares
var n = 0;
// total cells counted
var s = 0;
// active cell
var act = 'none';
// formula hinding
var formulaShown = false;
// export hinding
var exportShown = false;
// cell constructor
function Cell(id, count, picked){
  this.id = id;
  this.count = count;
  this.picked = picked;
  this.pick = function(){
    this.picked = true;
  }
  this.increment = function(){
    this.count++;
  }
  this.clearCell = function(){
    this.count = 0;
    this.picked = false;
  }
}
var a = new Cell('#a', 0, false);
var b = new Cell('#b', 0, false);
var c = new Cell('#c', 0, false);
var d = new Cell('#d', 0, false);
var e = new Cell('#e', 0, false);
var f = new Cell('#f', 0, false);
var g = new Cell('#g', 0, false);
var h = new Cell('#h', 0, false);
var i = new Cell('#i', 0, false);

function compute(){
  if(n!=0){
    var tot = s*(df/n)*10000+'';
    var totx = tot.split('.')[0];
    $('#tally').html(numberWithCommas(totx)+' cells/ml');
  } else {
    $('#tally').html('Tap on a square to start counting');
  }
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function clearCell(p){
  if(window[p].picked == true){
    n--;
    s = s-window[p].count;
    window[p].clearCell();
    $('#'+p).html('&zwnj;');
  }
}
function startHandlers(){
  // cells
  $('.square').click(function() {
    var x = event.target.id;
    if (x != act || act == 'none'){
      $('#'+act).removeClass('selected');
      $('#'+x).addClass('selected');
      act = x;
    } else if (act == x) {
      if (window[x].picked == false){
        window[x].pick();
        n++;
      }
      window[x].increment();
      $('#'+x).html(window[x].count);
      s++;
      compute();
    }
  });
  // clear
  $('#clear').click(function() {
    if(n > 0){
      clearCell(act);
      compute();
    }
  });
  // clear all
  $('#clearAll').click(function() {
    if(n > 0){
      var clearConfirm = window.confirm('Clear all?');
      if (clearConfirm === true){
        var j = ['a','b','c','d','e','f','g','h','i'];
        for(k = 0; k < j.length; k++){
          clearCell(j[k]);
        }
        compute();
      }
    }
  });
  // formulaView
  $('#formula').click(function() {
    if (formulaShown == false){
      $("#formulaView").css("display", "block");
      formulaShown = true;
    } else {
      $("#formulaView").css("display", "none");
      formulaShown = false;
    }
  });
  // dilution factor
  $("#dilution").keyup(function() {
    df = $(this).val();
    compute();
  });
  $("#dilution").blur(function() {
    if (df == ''){
      alert('Please set a dilution factor');
    }
  });
  // export view
  $('#export').click(function() {
    if (exportShown == false){
      $("#exportView").css("display", "block");
      exportShown = true;
    } else {
      $("#exportView").css("display", "none");
      exportShown = false;
    }
  });
  // send result
  // $('#sendResult').click(function() {
  //   console.log('click');
  //     var email = $('#email').val();
  //     console.log(email);
  //   var title = $('#title').val();
  //   var message = ;
  //   $.ajax({
  //       url: "export.php",
  //       type: "POST",
  //       data: {
  //           name: name,
  //           phone: phone,
  //           email: email,
  //           message: message
  //       },
  //       cache: false,
  //   });
  // });
}
(function(){
    window.onload = startHandlers;


})();
