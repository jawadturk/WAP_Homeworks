window.onload = pageLoaded;

const { Observable, from } = Rx;

const url = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";
let response = fetch(url).then(response => {
    return response.json();
});
var countriesTeams = Rx.Observable.fromPromise(response)
    .map(data => data.teams);

let groupsStream = Rx.Observable.fromPromise(response)
    .map(data => data.groups);

function sendValues(x) {


    countriesTeams.map((team) => team.filter((team) => team.name === x)).map(team => team[0]).subscribe(
        team => teamSelected(team),
        err => console.error(err));


    var pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(x);
    document.getElementById('results').appendChild(pre);
}

function teamSelected(team) {
    console.log(team);
    if (team != null) {
        // console.log(team.id);
        groupsStream.map((groups) => {
            for (let groupId in groups) {
                let team_found_in_group = false;
                groups[groupId].matches.map((matchObject) => {
                    // console.log('home_team', matchObject.home_team)
                    // console.log('away_team', matchObject.away_team)
                    if (matchObject.home_team === team.id || matchObject.away_team === team.id) team_found_in_group = true;
                    // else groups[groupId].wanted = false;
                    return matchObject
                })
                groups[groupId].wanted = team_found_in_group
                return groups;
            }

        }).subscribe(
            group => {
                // console.log('group', group)
                groupSelected(group)
            },
            err => console.error(err))
    }

}

function groupSelected(group) {
    console.log(group);




}
function pageLoaded() {
    var input = document.getElementById('textInput');


    var input$ = Observable
        .fromEvent(input, 'keyup')
        .map(x => x.currentTarget.value)
        .debounceTime(500) // with delay of 0.5 secs

    input$.subscribe(x => sendValues(x));
}