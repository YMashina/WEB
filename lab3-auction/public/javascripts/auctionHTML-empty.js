"use strict";

function openModalWindowToAdd() {
  var dialog = document.getElementById("modal-window-add");
  dialog.showModal();
}

function closeModalWindowToAdd() {
  var dialog = document.getElementById("modal-window-add");
  dialog.close();
}

function createAuction() {
  // cобираем данные с форм
  var date = $("[name = date")[0].value;
  var time = $("[name = time")[0].value;
  var timeout = $("[name = timeout")[0].value;
  var interval = $("[name = interval")[0].value;
  var pause = $("[name = pause")[0].value; // если что-то не заполнено, не отправялем

  if (date == "" || time == "" || timeout == "" || interval == "" || pause == "") {
    alert("Незаполенные поля!");
    return;
  } // отправляем запрос, собственно


  $.post("/auction", {
    date: date,
    time: time,
    timeout: timeout,
    interval: interval,
    pause: pause
  }, function (answer) {
    var newSettings = JSON.parse(answer);
    console.log("Settings are succesfully added!", newSettings);
    location.href = location.href;
  });
}