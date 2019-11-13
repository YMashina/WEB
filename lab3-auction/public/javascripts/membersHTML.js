"use strict";

var currMemberID = 0;

function openModalWindowToAdd() {
  var dialog = document.getElementById("modal-window-add");
  dialog.showModal();
}

function closeModalWindowToAdd() {
  var dialog = document.getElementById("modal-window-add");
  dialog.close();
}

function openSecretWindow() {
  $("div.div-srcref").css("display", "block");
}

function addMember() {
  // cобираем данные с форм
  var name = $("[name = name")[0].value;
  var surname = $("[name = surname")[0].value;
  var money = $("[name = money")[0].value; // если что-то не заполнено, не отправялем

  if (money == "" || name == "" || surname == "") {
    alert("Незаполенные данные!");
    return;
  } // создаем тело запроса


  var body = 'name=' + encodeURIComponent(name) + '&surname=' + encodeURIComponent(surname) + '&money=' + encodeURIComponent(money);
  console.log("Body:", body);
  $.post("/members", body, function (data) {
    console.log("Member is succesfully added!", data);
    addNewRowToTable(JSON.parse(data));
  });
}

(function () {
  closeModalWindowToAdd();
});

function addNewRowToTable(member) {
  var htmlRow = "<tr onClick=getMemberFromServer(" + member.id + ") id=member" + member.id + ">";
  htmlRow += "<td>" + ("" + member.name) + "</td>";
  htmlRow += "<td>" + ("" + member.surname) + "</td>";
  htmlRow += "<td>" + ("" + member.money) + "</td>";
  htmlRow += "</tr>";
  $(".table-pictures tr:last").after(htmlRow);
}

function getMemberFromServer(id) {
  console.log("ID of changing member:", id);
  $.get("/getmember", {
    id: id
  }, function (data) {
    openModalWindowToChange(JSON.parse(data));
  });
}

function openModalWindowToChange(member) {
  console.log("open Modal with member:", member);
  var dialog = document.getElementById("modal-window-change");
  currMemberID = member.id;
  $('#modal-window-change-form .div-name > input').val("" + member.name);
  $('#modal-window-change-form .div-surname > input').val("" + member.surname);
  $('#modal-window-change-form .div-money > input').val("" + member.money);
  dialog.showModal();
}

function closeModalWindowToChange() {
  var dialog = document.getElementById("modal-window-change");
  dialog.close();
}

function changeCurrentMember() {
  var memberFields = [];
  memberFields.push(currMemberID);
  memberFields.push($('#modal-window-change-form >.div-name > input').val());
  memberFields.push($('#modal-window-change-form >.div-surname > input').val());
  memberFields.push($('#modal-window-change-form >.div-money > input').val());
  console.log("To change member with ID", currMemberID);
  changeMember(memberFields);
}

(function () {
  closeModalWindowToChange();
});

function changeMember(memberFields) {
  var body = 'id=' + encodeURIComponent(memberFields[0]) + '&name=' + encodeURIComponent(memberFields[1]) + '&surname=' + encodeURIComponent(memberFields[2]) + '&money=' + encodeURIComponent(memberFields[3]);
  console.log("Body of put-request:", body);
  $.ajax({
    type: "PUT",
    url: "/members",
    contentType: 'application/x-www-form-urlencoded',
    data: body,
    success: function success(response) {
      var changedMember = JSON.parse(response);
      console.log(changedMember);
      $('#member' + currMemberID).children().first().text("" + changedMember.name).next().text("" + changedMember.surname).next().text("" + changedMember.money);
    }
  });
}

function deleteСurrentMember() {
  console.log("To delete member with ID", currMemberID);
  deleteMember(currMemberID);
}

(function () {
  closeModalWindowToChange();
});

function deleteMember(id) {
  var body = "id=" + encodeURIComponent(id);
  console.log("Final query: ", body);
  $.ajax({
    type: "DELETE",
    url: "/members",
    data: body,
    success: function success(response) {
      console.log("Deleted!");
      $('#member' + currMemberID).remove();
    }
  });
}