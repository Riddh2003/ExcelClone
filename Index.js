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

  for(let i = 1; i < 100; i++){
    let row = $(`<div class="row"></div>`);
    for(let j = 1; j < 100; j++){
      let colcod = $(`#colcod-${j}`).attr("id").split("cod-")[1];
      let box = $(`<div class="box" contenteditable="true" id="rowId-${i}-colId-${j}" data="colcod-${colcod}"></div>`);
      row.append(box);
    }
    $(`.cell`).append(row);
  }
});
