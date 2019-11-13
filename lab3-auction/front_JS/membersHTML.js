var currMemberID = 0;

function openModalWindowToAdd(){
    var dialog = document.getElementById("modal-window-add");
    dialog.showModal();
}

function closeModalWindowToAdd(){
    var dialog = document.getElementById("modal-window-add");
    dialog.close();
}

function openSecretWindow(){
    $("div.div-srcref").css("display", "block");
}

function addMember(){
    // cобираем данные с форм
    let name = $("[name = name")[0].value;
    let surname = $("[name = surname")[0].value;
    let money = $("[name = money")[0].value;

    // если что-то не заполнено, не отправялем
    if (money == "" || name == "" || surname == ""){
        alert("Незаполенные данные!");
        return; 
    }
    // создаем тело запроса
    let body = 'name=' + encodeURIComponent(name) 
             + '&surname=' + encodeURIComponent(surname)
             + '&money=' + encodeURIComponent(money);
             
    console.log("Body:", body);
    
    $.post("/members", body, (data) => {
        console.log("Member is succesfully added!", data);
        addNewRowToTable(JSON.parse(data));
    });
} () => {
    closeModalWindowToAdd();
}

function addNewRowToTable(member){
    let htmlRow = `<tr onClick=getMemberFromServer(${member.id}) id=member${member.id}>`;
    htmlRow += "<td>" + `${member.name}` + "</td>";
    htmlRow += "<td>" + `${member.surname}` + "</td>";
    htmlRow += "<td>" + `${member.money}` + "</td>";
    htmlRow += "</tr>";
    $(".table-pictures tr:last").after(htmlRow);
}

function getMemberFromServer(id){
    console.log("ID of changing member:", id);
    $.get("/getmember", {
        id : id
    },
    (data) => {
        openModalWindowToChange (JSON.parse(data));
    });
}

function openModalWindowToChange(member){
    console.log("open Modal with member:", member);
    let dialog = document.getElementById("modal-window-change");
    currMemberID = member.id;

    $('#modal-window-change-form .div-name > input').val(`${member.name}`);
    $('#modal-window-change-form .div-surname > input').val(`${member.surname}`);
    $('#modal-window-change-form .div-money > input').val(`${member.money}`);

    dialog.showModal();
}

function closeModalWindowToChange(){
    var dialog = document.getElementById("modal-window-change");
    dialog.close();
}

function changeCurrentMember(){
    let memberFields = [];
    memberFields.push(currMemberID);
    memberFields.push($('#modal-window-change-form >.div-name > input').val());
    memberFields.push($('#modal-window-change-form >.div-surname > input').val());
    memberFields.push($('#modal-window-change-form >.div-money > input').val());

    console.log("To change member with ID", currMemberID);
    changeMember(memberFields);
} () => {
    closeModalWindowToChange();
}   

function changeMember(memberFields){
    let body = 'id=' + encodeURIComponent(memberFields[0])
            + '&name=' + encodeURIComponent(memberFields[1])
            + '&surname=' + encodeURIComponent(memberFields[2])
            + '&money=' + encodeURIComponent(memberFields[3]);
    console.log("Body of put-request:", body);

    $.ajax({
        type: "PUT",
        url: "/members",
        contentType: 'application/x-www-form-urlencoded',
        data: body,
        success: function (response) {
            let changedMember = JSON.parse(response);
            console.log(changedMember);

            $('#member' + currMemberID).children()
            .first().text(`${changedMember.name}`)
            .next().text(`${changedMember.surname}`)
            .next().text(`${changedMember.money}`);
        }
    });
}

function deleteСurrentMember(){
    console.log("To delete member with ID", currMemberID);
    deleteMember(currMemberID);
} () => {
    closeModalWindowToChange();
}

function deleteMember(id) {
    let body = "id=" + encodeURIComponent(id);
    console.log("Final query: ", body);
    $.ajax({
        type: "DELETE",
        url: "/members",
        data: body,
        success: (response) => {
            console.log("Deleted!");
            $('#member' + currMemberID).remove();
        }
    });
}
