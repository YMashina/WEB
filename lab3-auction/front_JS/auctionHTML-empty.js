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
    let date = $("[name = date")[0].value;
    let time = $("[name = time")[0].value;
    let timeout = $("[name = timeout")[0].value;
    let interval = $("[name = interval")[0].value;
    let pause = $("[name = pause")[0].value; 
    
    // если что-то не заполнено, не отправялем
    if (date == "" || time == "" || timeout == "" || interval == "" || pause == "") {
        alert("Незаполенные поля!");
        return;
    }

    // отправляем запрос, собственно
    $.post("/auction", {
        date : date,
        time : time,
        timeout : timeout,
        interval : interval,
        pause : pause
    }, function (answer) {
        let newSettings = JSON.parse(answer); 
        console.log("Settings are succesfully added!", newSettings);
        location.href = location.href;
    });
}