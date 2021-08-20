//TODO
// Account for bug where we get lumped in with another team


window.onload = function() {
    matchIds = []
    TEAM = ["ACokes10", "Flawless", "Flawless#3400635", "Glorbis", "Spirit Boot", "Coach", "CB"]
    wins = []
    today = new Date()
    todayCutOff = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6)
    yesterdayCutOff = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 6)
    let squadData = []
    console.log("TODAY CUTOFF: " + todayCutOff + ", YESTERDAY CUTOFF: " + yesterdayCutOff)
    //Get games between 6am Today and 6am the previous day

    Promise.all([
        fetch('http://localhost:3000/wz/gordo'),
        fetch('http://localhost:3000/wz/gdaddy')
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        squadData = data
        getLatestWins(data)
    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });

}



let addWin = (match) => {
    let id = match.attributes.id
    matchExists = wins.some(e => e.attributes.id === id)
    teamCount = 0
    squad = match.segments[0].metadata.teammates
    numOfTeammates = squad.length
    teammates = []
    
    // console.log("NUMBER OF TEAMMATES: " + numOfTeammates)
    if(!matchExists && numOfTeammates <= 4){
        squad.forEach( m => {
            if (TEAM.includes(m.platformUserHandle)) {
                teamCount++;
                teammates.push(m.platformUserHandle)
            }
            
        })
        teammates.push(match.segments[0].metadata.platformUserHandle)
        //Get stats for each player
        getSquadStats(teammates);
        //If more than one member of the squad was playing add it to the wins list
        if (teamCount >= 1){
            wins.push(match)
        }
    }
    else{
        console.log("Win not added")
    }
}

//Put all the stats for each squad member with the match data
let addSquadStats = (teammates) => {
    


}



let insertValues = async (res) => {
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

let getLatestWins = (data) => {
    data.forEach(player => {
        matches = player.data.matches
        matches.forEach(match => {
            let playerName = match.segments[0].metadata.platformUserHandle
            let matchId = match.attributes.id
            let place = parseInt(match.segments[0].metadata.placement)
            let date = match.metadata.timestamp
            date = new Date(date);
            //Make sure data is from yesterday's games
            if (date > yesterdayCutOff && date < todayCutOff) {
                if (place == 1) {
                    addWin(match)
                }
            } 
            
        })

    })
}
