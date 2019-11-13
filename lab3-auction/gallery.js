class GalleryManager {
	constructor(fileName){
		this.fileName = fileName;
		this.maxID = 0;
	}

	load() {
		try {
			this.pictures = require(`./`+this.fileName);
			console.log("Loaded pictures:");
			console.log(this.pictures);

			if (this.pictures.length != 0)
				this.maxID = this.pictures[this.pictures.length-1].id;
			console.log("maxID:", this.maxID);
		} 
		catch(e){
			console.log(e.name, e.message);
			console.log("No Gallery file on server.");
			this.pictures = [];
			let fs = require("fs");
			fs.writeFile(this.fileName, JSON.stringify(this.pictures), (err) => {
				if (err)
					console.log("Error in load(); when writing empty file: ", err);
				else 
					console.log("New Gallery File was created!");
			});
		}
	}

	save() {
		let fs = require("fs");
		fs.writeFile(this.fileName, JSON.stringify(this.pictures), (err) => {
			if (err)
				console.log("Error in save(); Gallery-file was not saved!");
			else
				console.log(`Gallery-file ${this.fileName} was saved!`);
		});	
	}

	findPictureIndex(id){
		for (let index = 0; index < this.pictures.length; index++)
			if (this.pictures[index].id == id)
				return index;
		return null;
	}

	getPicture(id) {
		let index = this.findPictureIndex(id);
		console.log("Getted book with index = ", index, "id = ", id);
		return this.pictures[index];
	}

	addPicture(title, author, dateCreate, country, beginPrice, minStep, maxStep, description, srcref) {
		let newID = ++this.maxID;
		console.log("In function addPicture:");
		console.log("	ID:", this.maxID);
		console.log("	Title", title);
		console.log("	Author:", author);
		console.log("	Date of creating:", dateCreate);
		console.log("	Country", country);
		console.log("	Begin price:", beginPrice);
        console.log("	Min step:", minStep);
        console.log("	Max step:", maxStep);
        console.log("	Description:", description);
        console.log("	srcref:", srcref);
		this.pictures.push({
			id : newID,
			title : title,
			author : author,
			dateCreate : dateCreate,
			country : country,
            beginPrice : beginPrice,
            minStep : minStep,
            maxStep : maxStep,
            description : description,
            srcref : srcref
		});
		this.save();
		console.log("Pictures Storage ", this.pictures[this.pictures.length-1], "was saved");
		return this.pictures[this.pictures.length-1];
	}

	changePicture(id, title, author, dateCreate, country, beginPrice, minStep, maxStep, description, srcref){
		let indexInArray = this.findPictureIndex(id);
		if (indexInArray != null){
			let picture = this.pictures[indexInArray];
			picture.title = title,
			picture.author = author,
			picture.dateCreate = dateCreate,
			picture.country = country,
            picture.beginPrice = beginPrice,
            picture.minStep = minStep,
            picture.maxStep = maxStep,
            picture.description = description,
            picture.srcref = srcref
			this.save();
			return picture;
		}
		else {
			Console.log("Error: no book with id", id);
			return null;
		}

	}

	deletePicture(id) {
		let indexInArray = this.findPictureIndex(id);
		if (indexInArray != null){
			let picture = this.pictures.splice(indexInArray, 1);
			console.log("Deleted picture with id =", id);
			console.log("Index of deleting picture:", indexInArray);
			console.log("picture:", picture);
			this.save();
		}
		else {
			console.log("No picture with such id: ", id);
		}
		return id;
	}
}

const gallery = new GalleryManager("pictureStorage.json");


module.exports = gallery;