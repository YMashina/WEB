function Player() {
    this.name = localStorage.getItem("name");
    this.score = localStorage.getItem("score");
}

// Create new players
//player1 = new Player("Thomas", "01/23/18", 201);
Players = [];
Players = JSON.parse(localStorage.getItem("leaderboard"));
//alert(Players[0].name);
new_player = new Player();
//Players = [];
Players.push(new_player);

//alert(new_player.name+' '+new_player.score);
//alert(Players[0].name+' '+Players[0].score);







function displayLeaderboard() {
    let theExport = "";
    Players.sort((aPlayer, bPlayer) => bPlayer.score - aPlayer.score);
    function getUnique(arr, comp) {

        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;
    }

    Players = getUnique(Players,'name');

    localStorage.setItem("leaderboard", JSON.stringify(Players));

    Players.forEach((player) => theExport += '<tr><td>' + player.name + '</td><td>' + player.score + '</td></tr>');
    document.getElementById("thingy").innerHTML = theExport; //Why have good ID's when you can have bad ones? | Who needs children when we can use innerHTML?
}

displayLeaderboard();