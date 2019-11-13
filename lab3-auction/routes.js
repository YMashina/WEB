const express = require("express");
const router = express.Router();
const fs = require("fs");
router.use(express.static('public'));
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var serverGallary = require('./gallery');
serverGallary.load();

var serverHouse = require('./house');
serverHouse.load();

var currentAuction = require('./settings');
currentAuction.load();

router.get("/", (req, res) => {
	res.render("welcome_page", {port : 3000});
});

router.get("/pictures", (req, res) => {
	res.render("pictures", {
		title : "Pictures",
		pictures : serverGallary.pictures,
	});
});

router.get('/getpicture', (req, res, next) => {
	// http://127.0.0.1:3000/getbook?id=1
	console.log('\nUser requested picture with id: ', req.query.id);
	let requestedPictureID = req.query.id; 
	let picture = serverGallary.getPicture(requestedPictureID);
	if (picture == null){
		console.log("Error: No picture with such id!");
		res.status(404);
		res.end("Error");
	}
	else {
		console.log("Send picture:", picture);
		res.end(JSON.stringify(picture));
	}
});

router.post("/pictures", (req, res) => {
	console.log("Server requested to add new picture!");

	let body = req.body;
    console.log("Title of new picture to server: ", body.title);
    console.log("Author of new picture to server:", body.author);
    console.log("Date of new picture to server of creating:", body.dateCreate);
    console.log("Country of new picture to server", body.country);
    console.log("Begin of new picture to server price:", body.beginPrice);
    console.log("Min of new picture to server step:", body.minStep);
    console.log("Max of new picture to server step:", body.maxStep);
    console.log("Description of new picture to server:", body.description);
    console.log("srcref of new picture to server:", body.srcref);

	newPicture = serverGallary.addPicture(body.title, body.author, body.dateCreate, body.country, body.beginPrice, body.minStep, body.maxStep, body.description, body.srcref);
	res.end(JSON.stringify(newPicture));
});

router.put("/pictures", (req, res) => {
	console.log("Server requested to change picture!");

	let body = req.body;
	console.log("Id of changing picture: ", body.id);
    console.log("Title of changing picture to server: ", body.title);
    console.log("Author of changing picture to server:", body.author);
    console.log("Date of changing picture to server of creating:", body.dateCreate);
    console.log("Country of changing picture to server", body.country);
    console.log("Begin of changing picture to server price:", body.beginPrice);
    console.log("Min of changing picture to server step:", body.minStep);
    console.log("Max of changing picture to server step:", body.maxStep);
    console.log("Description of changing picture to server:", body.description);
    console.log("srcref of changing picture to server:", body.srcref);

	changedPicture = serverGallary.changePicture(body.id, body.title, body.author, body.dateCreate, body.country, body.beginPrice, body.minStep, body.maxStep, body.description, body.srcref);
	if (changedPicture == null){
		console.log("Error: No picture with such id!");
		res.status(404);
		res.end("Error");
	}
	else {
		console.log("Send picture:", changedPicture);
		res.end(JSON.stringify(changedPicture));
	}
});

router.delete("/pictures", (req, res) => {
	console.log("User requested to delete picture with id = ", req.body.id);
	let result  = serverGallary.deletePicture(req.body.id);
	if (result != null)
		currentAuction.removePicture(result);
	res.end();
});










router.get("/members", (req, res) => {
	res.render("members", {
		title : "Members",
		members : serverHouse.members,
	});
});


router.get('/getmember', (req, res, next) => {
	// http://127.0.0.1:3000/getbook?id=1
	console.log('\nUser requested member with id: ', req.query.id);
	let requestedMemberID = req.query.id; 
	let member = serverHouse.getMember(requestedMemberID);
	if (member == null){
		console.log("Error: No member with such id!");
		res.status(404);
		res.end("Error");
	}
	else {
		console.log("Send member:", member);
		res.end(JSON.stringify(member));
	}
});

router.post("/members", (req, res) => {
	console.log("Server requested to add new member!");

	let body = req.body;
    console.log("Title of new member to server: ", body.name);
    console.log("Author of new member to server:", body.surname);
    console.log("Date of new member to server of creating:", body.money);

	newMember = serverHouse.addMember(body.name, body.surname, body.money);
	res.end(JSON.stringify(newMember));
});

router.put("/members", (req, res) => {
	console.log("Server requested to change member!");

	let body = req.body;
	console.log("ID of changing member to server: ", body.id);
    console.log("Title of changing member to server: ", body.name);
    console.log("Author of changing member to server:", body.surname);
    console.log("Date of changing member to server of creating:", body.money);

	changedMember = serverHouse.changeMember(body.id, body.name, body.surname, body.money);
	if (changedMember == null){
		console.log("Error: No member with such id!");
		res.status(404);
		res.end("Error");
	}
	else {
		console.log("Send member:", changedMember);
		res.end(JSON.stringify(changedMember));
	}
});

router.delete("/members", (req, res) => {
	console.log("User requested to delete member with id = ", req.body.id);
	let result = serverHouse.deleteMember(req.body.id);
	if (result != null) // если элемент найден, то удаляем зависимые данные в аукционе
		currentAuction.removeMember(result);
	res.end();
});











router.get("/auction", (req, res, next) => {
	if (typeof currentAuction.settings['date'] === "undefined"){
		console.log("Auction is not created! Post empty page");
		res.render("auction-empty", {
			title : "Auction"
		});
	}
	else {
		console.log("Auction exists! Post full page");

		let activeMembers = [];
		if (typeof currentAuction.settings['members'] !== "undefined"){
			for (let j = 0; j < currentAuction.settings.members.length; j++)
				for (let i = 0; i < serverHouse.members.length; i++)
					if (serverHouse.members[i].id == currentAuction.settings.members[j])
						activeMembers.push(serverHouse.members[i]);
		}

		let activePictures = [];
		if (typeof currentAuction.settings['pictures'] !== "undefined"){
			for (let j = 0; j < currentAuction.settings.pictures.length; j++)
				for (let i = 0; i < serverGallary.pictures.length; i++)
					if (serverGallary.pictures[i].id == currentAuction.settings.pictures[j])
						activePictures.push(serverGallary.pictures[i]);
		}
		
		console.log("Active members:", activeMembers);
		console.log("Active picures:", activePictures);
		// console.log("All members:", serverHouse.members);
		// console.log("All pictures:", serverGallary.pictures);
		res.render("auction-full", {
			title : "Auction",
			auction : currentAuction,
			allPictures : serverGallary.pictures,
			activePictures : activePictures,
			allMembers : serverHouse.members,
			activeMembers : activeMembers
		});
	}
});

router.post("/auction", (req, res) => {
	let body = req.body;
	console.log(`Server is requested to refresh auction-settings`);
	console.log("Pause from client:", body.pause);
	newSettings = currentAuction.changeSettings(body.date, body.time, body.timeout, body.interval, body.pause);
	res.end(JSON.stringify(newSettings));
});

router.delete("/auction", (req, res) => {
	console.log("Server is requestd to delete auction-settings");
	currentAuction.clearAll();
	res.end();
});

router.post("/auction/pictures", (req, res) => {
	let body = req.body;
	console.log(`Server is requested to add new picture with id = ${body.id} to auction!`);
	let result = currentAuction.addPicture(body.id)
	if (result === null)
		res.end(JSON.stringify("error"));
	else {
		let picture = serverGallary.getPicture(result);
		res.end(JSON.stringify(picture));
	}
});

router.delete("/auction/pictures", (req, res) =>{
	let body = req.body;
	console.log(`Server is requseted to delete picture with ${body.id} from auction`);
	let ans = currentAuction.removePicture(JSON.parse(body.id));
	res.end(JSON.stringify(ans));
});

router.post("/auction/members", (req, res) => {
	let body = req.body;
	console.log(`Server is requested to add new member with id = ${body.id} to auction!`);
	let result = currentAuction.addMember(body.id)
	if (result === null)
		res.end(JSON.stringify("error"));
	else {
		let member = serverHouse.getMember(result);
		res.end(JSON.stringify(member));
	}
});

router.delete("/auction/members", (req, res) =>{
	let body = req.body;
	console.log(`Server is requseted to delete member with ${body.id} from auction`);
	let ans = currentAuction.removeMember(JSON.parse(body.id));
	res.end(JSON.stringify(ans));
});



router.get('*', (req, res, next) => {
	console.log(req.path);
	res.status(404);
	res.end("<h1>Page not found</h1>");
	next();
});


module.exports = router;