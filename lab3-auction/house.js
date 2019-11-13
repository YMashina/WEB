class HouseManager {
	constructor(fileName){
		this.fileName = fileName;
		this.maxID = 0;
	}

	load() {
		try {
			this.members = require(`./`+this.fileName);
			console.log("Loaded members:");
			console.log(this.members);

			if (this.members.length != 0)
				this.maxID = this.members[this.members.length-1].id;
			console.log("maxID:", this.maxID);
		} 
		catch(e){
			console.log(e.name, e.message);
			console.log("No House-file on server.");
			this.members = [];
			let fs = require("fs");
			fs.writeFile(this.fileName, JSON.stringify(this.members), (err) => {
				if (err)
					console.log("Error in load(); when writing empty file: ", err);
				else 
					console.log("New House-File was created!");
			});
		}
	}

	save() {
		let fs = require("fs");
		fs.writeFile(this.fileName, JSON.stringify(this.members), (err) => {
			if (err)
				console.log("Error in save(); House-file was not saved!");
			else
				console.log(`House-file ${this.fileName} was saved!`);
		});	
	}

	findMemberIndex(id){
		for (let index = 0; index < this.members.length; index++)
			if (this.members[index].id == id)
				return index;
		return null;
	}

	getMember(id) {
		let index = this.findMemberIndex(id);
		console.log("Getted member with index = ", index, "id = ", id);
		return this.members[index];
	}

	addMember(name, surname, money){
		let newID = ++this.maxID;
		console.log("In function addMember:");
		console.log("	ID:", this.maxID);
		console.log("	name", name);
		console.log("	surname:", surname);
		console.log("	Date of creating:", money);
		this.members.push({
			id : newID,
			name : name,
			surname : surname,
			money : money,
		});
		this.save();
		console.log("Members Storage ", this.members[this.members.length-1], "was saved");
		return this.members[this.members.length-1];
	}

	changeMember(id, name, surname, money){
		let indexInArray = this.findMemberIndex(id);
		if (indexInArray != null){
			let member = this.members[indexInArray];
			member.name = name,
			member.surname = surname,
			member.money = money
			this.save();
			return member;
		}
		else {
			Console.log("Error: no member with id", id);
			return null;
		}
	}

	deleteMember(id) {
		let indexInArray = this.findMemberIndex(id);
		if (indexInArray != null){
			let member = this.members.splice(indexInArray, 1);
			console.log("Deleted member with id =", id);
			console.log("Index of deleting member:", indexInArray);
			console.log("member:", member);
			this.save();
		}
		else {
			console.log("No member with such id: ", id);
		}
		return id;
	}
}

const house = new HouseManager("memberStorage.json");

module.exports = house;