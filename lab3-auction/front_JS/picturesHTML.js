var currPictureID = 0;

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


function addPicture(){
    // cобираем данные с форм
    let title = $("[name = title")[0].value;
    let author = $("[name = author")[0].value;
    let dateCreate = $("[name = dateCreate")[0].value;
    let country = $("[name = country")[0].value;
    let beginPrice = $("[name = beginPrice")[0].value;
    let minStep = $("[name = minStep")[0].value;
    let maxStep = $("[name = maxStep")[0].value;
    let description = $("[name = description")[0].value;
    let srcref = $("[name = srcref")[0].value;

    // если что-то не заполнено, не отправялем
    if (dateCreate == "" || title == "" || author == "" || country == "" ||
        beginPrice == "" || maxStep == "" || maxStep == ""){
        alert("Незаполенные данные!");
        return; 
    }
    // создаем тело запроса
    let body = 'title=' + encodeURIComponent(title) 
             + '&author=' + encodeURIComponent(author)
             + '&dateCreate=' + encodeURIComponent(dateCreate)
             + '&country=' + encodeURIComponent(country)
             + '&beginPrice=' + encodeURIComponent(beginPrice)
             + '&minStep=' + encodeURIComponent(minStep)
             + '&maxStep=' + encodeURIComponent(maxStep)
             + '&description=' + encodeURIComponent(description)
             + '&srcref=' + encodeURIComponent(srcref);
             
    console.log("Body:", body);
    // console.log("Title of new book to server: ", title);
    // console.log("Author of new book to server:", author);
    // console.log("Date of new book to server of creating:", dateCreate);
    // console.log("Country of new book to server", country);
    // console.log("Begin of new book to server price:", beginPrice);
    // console.log("Min of new book to server step:", minStep);
    // console.log("Max of new book to server step:", maxStep);
    // console.log("Description of new book to server:", description);
    // console.log("srcref of new book to server:", srcref);
    
    $.post("/pictures", body, (data) => {
        console.log("Picture is succesfully added!", data);
        addNewNodePictureToTable(JSON.parse(data));
    });
} () => {
    closeModalWindowToAdd();
}

function addNewNodePictureToTable(picture){
    let htmlRow = `<tr onClick=getPictureFromServer(${picture.id}) id=picture${picture.id}>`;
    htmlRow += "<td>" + `${picture.title}` + "</td>";
    htmlRow += "<td>" + `${picture.author}` + "</td>";
    htmlRow += "<td>" + `${picture.dateCreate}` + "</td>";
    htmlRow += "<td>" + `${picture.country}` + "</td>";
    htmlRow += "<td>" + `${picture.beginPrice}` + "</td>";
    $(".table-pictures tr:last").after(htmlRow);
}

function getPictureFromServer(id){
    console.log("ID of changing picture:", id);
    $.get("/getpicture", {
        id : id
    },
    (data) => {
        openModalWindowToChange (JSON.parse(data));
    });
}

function openModalWindowToChange(picture){
    console.log("open Modal with picture:", picture);
    let dialog = document.getElementById("modal-window-change");
    // let currPicture = JSON.parse(picture);
    currPictureID = picture.id;
    
    // let titleInput = document.getElementById("title-change");
    // titleInput.value = `${JSON.parse(book).title}`;

    $('#modal-window-change-form .div-title > input').val(`${picture.title}`);
    $('#modal-window-change-form .div-author > input').val(`${picture.author}`);
    $('#modal-window-change-form .div-dateCreate > input').val(`${picture.dateCreate}`);
    $('#modal-window-change-form .div-country > input').val(`${picture.country}`);
    $('#modal-window-change-form .div-beginPrice > input').val(`${picture.beginPrice}`);
    $('#modal-window-change-form .div-minStep > input').val(`${picture.minStep}`);
    $('#modal-window-change-form .div-maxStep > input').val(`${picture.maxStep}`);
    $('#modal-window-change-form .div-description > textarea').val(`${picture.description}`);
    $('#modal-window-change-form .div-srcref > input').val(`${picture.srcref}`);

    dialog.showModal();
}

function closeModalWindowToChange(){
    var dialog = document.getElementById("modal-window-change");
    dialog.close();
}

function changeCurrentPicture(){
    let pictureFields = [];
    pictureFields.push(currPictureID);
    pictureFields.push($('#modal-window-change-form >.div-title > input').val());
    pictureFields.push($('#modal-window-change-form >.div-author > input').val());
    pictureFields.push($('#modal-window-change-form >.div-dateCreate > input').val());
    pictureFields.push($('#modal-window-change-form >.div-country > input').val());
    pictureFields.push($('#modal-window-change-form >.div-beginPrice > input').val());
    pictureFields.push($('#modal-window-change-form >.div-minStep > input').val());
    pictureFields.push($('#modal-window-change-form >.div-maxStep > input').val());
    pictureFields.push($('#modal-window-change-form >.div-description > textarea').val());
    pictureFields.push($('#modal-window-change-form >.div-srcref > input').val());

    console.log("To change picture with ID", currPictureID);
    changePicture(pictureFields);
} () => {
    closeModalWindowToChange();
}   

function changePicture(pictureFields){
    let body = 'id=' + encodeURIComponent(pictureFields[0])
            + '&title=' + encodeURIComponent(pictureFields[1])
            + '&author=' + encodeURIComponent(pictureFields[2])
            + '&dateCreate=' + encodeURIComponent(pictureFields[3])
            + '&country=' + encodeURIComponent(pictureFields[4])
            + '&beginPrice=' + encodeURIComponent(pictureFields[5])
            + '&minStep=' + encodeURIComponent(pictureFields[6])
            + '&maxStep=' + encodeURIComponent(pictureFields[7])
            + '&description=' + encodeURIComponent(pictureFields[8])
            + '&srcref=' + encodeURIComponent(pictureFields[9]);
    console.log("Body of put-request:", body);

    $.ajax({
        type: "PUT",
        url: "/pictures",
        contentType: 'application/x-www-form-urlencoded',
        data: body,
        success: function (response) {
            let changedPicture = JSON.parse(response);
            console.log(changedPicture);

            $('#picture' + currPictureID).children()
            .first().text(`${changedPicture.title}`)
            .next().text(`${changedPicture.author}`)
            .next().text(`${changedPicture.dateCreate}`)
            .next().text(`${changedPicture.country}`)
            .next().text(`${changedPicture.beginPrice}`)
        }
    });
}

function deleteСurrentPicture(){
    console.log("To delete picture with ID", currPictureID);
    deletePicture(currPictureID);
} () => {
    closeModalWindowToChange();
}

function deletePicture(id) {
    let body = "id=" + encodeURIComponent(id);
    console.log("Final query: ", body);
    $.ajax({
        type: "DELETE",
        url: "/pictures",
        data: body,
        success: (response) => {
            console.log("Deleted!");
            $('#picture' + currPictureID).remove();
        }
    });
}

function openImage(){
    var window = document.getElementById("image-window");
    let src = "images/" + $('#modal-window-change-form >.div-srcref > input').val();
    $("#image-window img").removeAttr("src").attr("src", `${src}`);
    window.showModal();
}

function closeImage(){
    var window = document.getElementById("image-window");
    window.close();
}

