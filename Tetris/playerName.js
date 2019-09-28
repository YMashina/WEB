
var player_name_html;
var player_name = "hjgf";
if(localStorage.getItem("recording_data_enabled")===null)//&&!(localStorage.getItem("recording_data_enabled").value = "1")
{
    //alert("key doesn't exist");
//localStorage.setItem("recording_data_enabled","0");
    Players = [];
}

function submit_name() {
    player_name_html = document.getElementById("player_name");
    // alert(player_name.value);
    player_name = player_name_html.value;
    //alert(typeof (player_name) );
    //playerName.innerHTML = player_name.value;
    // playerName.innerHTML = player_name;
    //alert("aaa");
    localStorage.setItem("name",player_name);

}
/*Players = [];
function Player() {
    this.name = "Name";
    this.score = "Score";
}
Players.push(new Player());*/
//if(localStorage.getItem("recording_data_enabled").value="0")
//{
 //   alert("aaaa");

//}

localStorage.setItem("leaderboard", JSON.stringify(Players));
//alert(Players[0].name);
//while(true)
