window.onload = function() {

    Promise.all([
        fetch('http://localhost:3000/wz/gordo'),
        fetch('http://localhost:3000/wz/gdaddy')
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        console.log(data);
        insertValues(data[0])
        getLatestWin(data)
    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });

}

getLatestWin = (data) =>{
    data.forEach(player => {
        matches = player.data.matches
        matches.forEach(match => {
            console.log("match", match)
            //Find most recent win
        })
        // console.log("player", player.data)
        
    })
}


insertValues = async (res) => {
    document.getElementById("gTag").innerHTML = "Player: " + res.data.matches[0].segments[0].metadata.platformUserHandle
    document.getElementById("place").innerHTML = "Place: " + res.data.matches[0].segments[0].metadata.placement
    kd = res.data.matches[0].segments[0].stats.kdRatio
    document.getElementById("kd").innerHTML = kd.displayName + ": " + kd.displayValue 
    stats = res.data.matches[0].segments[0].stats
    kills = stats.kills
    dmgDone = stats.damageDone
    dmgTaken = stats.damageTaken
    document.getElementById("kills").innerHTML = kills.displayName + ": " + kills.displayValue 
    document.getElementById("dmgDone").innerHTML = dmgDone.displayName + " Done: " + dmgDone.displayValue 
    document.getElementById("dmgTaken").innerHTML = dmgTaken.displayName + ": " + dmgTaken.displayValue 
    team = res.data.matches[0].segments[0].metadata.teammates
    document.getElementById("team").innerHTML = team[0].platformUserHandle + ", " + team[1].platformUserHandle + ", " + team[2].platformUserHandle 

}

//Check to find out which was the last match:
//Make sure at least 2 of the boys were in the match
//Which guys were in the match 
//Display their stats