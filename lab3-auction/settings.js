class AuctionManager {
	constructor(fileName){
		this.fileName = fileName;
	}

	load() {
		try {
			this.settings = require(`./`+this.fileName);
			console.log("Loaded settings:");
			console.log(this.settings);
		} 
		catch(e){
			console.log(e.name, e.message);
			console.log("No Auction file on server.");
			this.settings = {};
			let fs = require("fs");
			fs.writeFile(this.fileName, JSON.stringify(this.settings), (err) => {
				if (err)
					console.log("Error in load(); when writing empty file: ", err);
				else 
					console.log("New Auction File was created!");
			});
		}
	}

	save() {
		let fs = require("fs");
		fs.writeFile(this.fileName, JSON.stringify(this.settings), (err) => {
			if (err)
				console.log("Error in save(); Auction-file was not saved!");
			else
				console.log(`Auction-file ${this.fileName} was saved!`);
		});	
	};

	clearAll(){
		this.clearSettings();
		this.clearPictures();
		this.clearMembers();
		this.save();
	}

	changeSettings(date, time, timeout, interval, pause){
		this.settings.date = date;
		this.settings.time = time;
		this.settings.timeout = timeout;
		this.settings.interval = interval;
		this.settings.pause = pause;
		this.save();

		console.log("Settings changed!");
		return this.settings;
	}

	clearSettings() {
		let clearSettings = {};
		this.settings = clearSettings;
	}

	addPicture(id){
		if (typeof this.settings['pictures'] === "undefined")
			this.settings.pictures = [];
		for (let i = 0; i < this.settings.pictures.length; i++){
			if (this.settings.pictures[i] === id){
				console.log(`ERROR: ID-picture ${id} is already exist!`);
				return null;
			}
		}
		this.settings.pictures.push(id);
		this.save();
		console.log("Picture on auction storage (id ", this.settings.pictures[this.settings.pictures.length-1], ") was saved");
		return this.settings.pictures[this.settings.pictures.length-1]
	}

	removePicture(id){
		for (let i = 0; i < this.settings.pictures.length; i++){
			if (this.settings.pictures[i] == id){
				console.log(`Deleting ID-picture ${id} is exist!`);
				this.settings.pictures.splice(i, 1);
				this.save();
				console.log("Picture on auction storage was saved", this.settings.pictures);
				return "ok";
			}
		}
		console.log("ERROR: Deleting ID-picture is not exist!");
		return "error";
	}

	clearPictures(){
		let clearPictures = [];
		this.settings.pictures = clearPictures;
	}

	addMember(id){
		if (typeof this.settings['members'] === "undefined")
			this.settings.members = [];
		for (let i = 0; i < this.settings.members.length; i++){
			if (this.settings.members[i] === id){
				console.log(`ERROR: ID-member ${id} is already exist!`);
				return null;
			}
		}
		this.settings.members.push(id);
		this.save();
		console.log("Picture on auction storage (id", this.settings.members[this.settings.members.length-1], ") was saved");
		return this.settings.members[this.settings.members.length-1];
	}

	removeMember(id){
		for (let i = 0; i < this.settings.members.length; i++){
			if (this.settings.members[i] == id){
				console.log(`Deleting ID-Member ${id} is exist!`);
				this.settings.members.splice(i, 1);
				this.save();
				console.log("Member on auction storage was saved", this.settings.members);
				return "ok";
			}
		}
		console.log("ERROR: Deleting ID-Member is not exist!");
		return "error";
	}

	clearMembers(){
		let clearMembers = [];
		this.settings.members = clearMembers;
	}
}

const settingsStor = new AuctionManager("settingStorage.json");


module.exports = settingsStor;