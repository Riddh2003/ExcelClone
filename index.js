$(document).ready(function() {
  for (let i = 1; i < 100; i++) {
    let ans = "";
    let n = i;
    while (n > 0) {
      let rem = n % 26;
      if (rem == 0) {
        ans = "Z" + ans;
        n = Math.floor(n / 26) - 1;
      } else {
        ans = String.fromCharCode(rem + 64) + ans;
        n = Math.floor(n / 26);
      }
    }
    let column = $(
      `<div class="column-name colId-${ans}" id="colcod-${i}">${ans}</div>`
    );
    $(`.cell-col`).append(column);
    let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
    $(`.cell-row`).append(row);
  }

  for (let i = 1; i < 100; i++) {
    let row = $(`<div class="row"></div>`);
    for (let j = 1; j < 100; j++) {
      let colcod = $(`#colcod-${j}`)
        .attr("id")
        .split("cod-")[1];
      let box = $(
        `<div class="box" contenteditable="false" id="rowId-${i}-colId-${j}" data="colcod-${colcod}"></div>`
      );
      row.append(box);
    }
    $(`.cell`).append(row);
  }

  $(".align-icon").click(function() {
    $(".align-icon.selected").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".style-icon").click(function() {
    $(this).toggleClass("selected");
  });

  $(".cell .row .box").click(function(e) {
    if(e.ctrlKey){
      let [rowId,colId] = getRowCol(this);
      if(rowId > 1){
        let topboxselected = $(`#rowId-${rowId-1}-colId-${colId}`).hasClass("selected");
        if(topboxselected){
          $(this).addClass("box-top-selected");
          $(`#rowId-${rowId-1}-colId-${colId}`).addClass("box-bottom-selected");
        }
      }
      if(rowId < 100){
        let bottomboxselected = $(`#rowId-${rowId+1}-colId-${colId}`).hasClass("selected");
        if(bottomboxselected){
          $(this).addClass("box-bottom-selected");
          $(`#rowId-${rowId+1}-colId-${colId}`).addClass("box-top-selected");
        }
      }
      if(colId > 1){
        let leftboxselected = $(`#rowId-${rowId}-colId-${colId-1}`).hasClass("selected");
        if(leftboxselected){
          $(this).addClass("box-left-selected");
          $(`#rowId-${rowId}-colId-${colId-1}`).addClass("box-right-selected");
        }
      }
      if(colId < 100){
        let rightboxselected = $(`#rowId-${rowId}-colId-${colId+1}`).hasClass("selected");
        if(rightboxselected){
          $(this).addClass("box-right-selected");
          $(`#rowId-${rowId}-colId-${colId+1}`).addClass("box-left-selected");
        }
      }
      $(this).addClass("selected");
    }
    else{
      $(".box.selected").removeClass("selected");
      $(this).addClass("selected");
    }
  });

  $(".cell .row .box").dblclick(function() {
    $(".box.selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).attr("contenteditable", "true");
    $(this).focus();
  });

  $(".cell").scroll(function (){
    $(".cell-col").scrollLeft($(this).scrollLeft());
    $(".cell-row").scrollTop($(this).scrollTop());
  });

});

function getRowCol(e) {
  let idArr = $(e).attr("id").split("-");
  let rowId = parseInt(idArr[1]);
  let colId = parseInt(idArr[3]);
  return [rowId, colId];  
}