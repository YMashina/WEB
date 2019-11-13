"use strict";

function saveAuctionSettings() {
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
    console.log("Settings is succesfully refreshed!", newSettings); // location.href = location.href;
  });
}

function deleteAuction() {
  $.ajax({
    type: "DELETE",
    url: "/auction",
    success: function success(response) {
      console.log("Deleted!");
      location.href = location.href;
    }
  });
}

function addMemberToAuction() {
  var newMemberID = $("#memberList option:selected").val();
  console.log(newMemberID);
  $.post("/auction/members", {
    id: newMemberID
  }, function (data) {
    var serverAns = JSON.parse(data);

    if (serverAns != "error") {
      console.log("Member is succesfully added to auction!", serverAns);
      addNewLiMember(serverAns);
    } else if (serverAns == "error") {
      console.log("Error: server");
      alert("Member with such id is existed!");
    } else console.log("Smth go wrong. Response: ", serverAns);
  });
}

function addNewLiMember(member) {
  var htmlLi = "<li><a onClick=deleteMemberFromAuction(" + member.id + ") id=member" + member.id + ">";
  htmlLi += member.surname + " " + member.name;
  htmlLi += "</a></li>";
  $("#auctionMembers ol").append(htmlLi);
}

function deleteMemberFromAuction(id) {
  console.log("Delete id:", id);
  var body = "id=" + encodeURIComponent(id);
  console.log("Final query: ", body);
  $.ajax({
    type: "DELETE",
    url: "/auction/members",
    data: body,
    success: function success(response) {
      console.log("Response from server:", JSON.parse(response));
      $('#member' + id).remove();
    }
  });
}

;

function addPictureToAuction() {
  var newPictureID = $("#pictureList option:selected").val();
  console.log(newPictureID);
  $.post("/auction/pictures", {
    id: newPictureID
  }, function (data) {
    var serverAns = JSON.parse(data);

    if (serverAns != "error") {
      console.log("Picture is succesfully added to auction!", serverAns);
      addNewLiPicture(serverAns);
    } else if (serverAns == "error") {
      console.log("Error: server");
      alert("Member with such id is existed!");
    } else console.log("Smth go wrong. Response: ", serverAns);
  });
}

;

function addNewLiPicture(picture) {
  var htmlLi = "<li><a onClick=deletePictureFromAuction(" + picture.id + ") id=picture" + picture.id + ">";
  htmlLi += "&quot;" + picture.title + "&quot; " + picture.author;
  htmlLi += "</a></li>";
  $("#auctionPictures ol").append(htmlLi);
}

function deletePictureFromAuction(id) {
  console.log("Delete id:", id);
  var body = "id=" + encodeURIComponent(id);
  console.log("Final query: ", body);
  $.ajax({
    type: "DELETE",
    url: "/auction/pictures",
    data: body,
    success: function success(response) {
      console.log("Response from server:", JSON.parse(response));
      $('#picture' + id).remove();
    }
  });
}