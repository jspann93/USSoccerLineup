console.log('Version 12.0 deploying...');
/*
Records: http://127.0.0.1:8090/_/#/collections
Pocketbase JavaScript SDK: https://github.com/pocketbase/js-sdk/blob/master/README.md
Path to project: /Users/johnspann/Desktop/PB/pocketbase_0.13.4_darwin_amd64/pb_data

Instructions for deploying pocketbase with fly.io are here:
https://github.com/pocketbase/pocketbase/discussions/537 

Run this from the command line:
curl -L https://fly.io/install.sh | sh

Output:
flyctl was installed successfully to /Users/johnspann/.fly/bin/flyctl
Manually add the directory to your $HOME/.zshrc (or similar)
  export FLYCTL_INSTALL=/Users/johnspann/.fly"
  export PATH="$FLYCTL_INSTALL/bin:$PATH"

Run these from the command line:
flyctl auth signup
flyctl auth login
flyctl launch
flyctl volumes create pb_data --size=1
flyctl deploy

Navigate to https://us-soccer-lineup-builder.fly.dev/
*/


//Set up a connection to PocketBase
//import PocketBase from "https://github.com/pocketbase/js-sdk/tree/master/dist/pocketbase.umd.js";
//import PocketBase from '/js-sdk-master/dist/pocketbase.umd.js';
import PocketBase from 'pocketbase';
//import { PocketBase } from '/js-sdk-master/dist/pocketbase.umd.js';
//import PocketBase from 'https://cdnjs.cloudflare.com/ajax/libs/pocketbase/0.12.1/pocketbase.cjs.min.js';
//import { PocketBase } from 'https://cdnjs.cloudflare.com/ajax/libs/pocketbase/0.12.1/pocketbase.cjs.min.js';
//import * as PocketBase from '/js-sdk-master/dist/pocketbase.umd.js';

const pb = new PocketBase('http://127.0.0.1:8090');

//Function called from saveData() to update the database
async function updateDB(formationData) {

  //Case for the current team being the mens team
  if(currentTeam === 'mens'){
    //Loop through formationData, a list of names the user selected
    for (let player of Object.values(formationData)) {
      //Check if a record exists for a player with that name
      var record1 = await pb.collection('men_player_selections').getOne(player);
      //If a record for this player doesn't exist yet, create one and make the count = 1
      if(record1 === null)
      {
        //Create a record for this player
        record1 = await pb.collection('men_player_selections').create({
          name: player,
          count: 1,
      });
      }
      else{
        //Record already exists, just increment the count by 1
        record1 = await pb.collection('men_player_selections').update(player, {
          count: count+1,
      });
      }
    }
  }
  //Current team = womens
  else{

  }
} 


//Global variable to store which div represents the current formation (433, 442, 343, etc.)
let currentFormationDiv = '';

//Global variable to store which div represents the current formation (mens or womens)
let currentTeam = '';

//Global variable to hold players in the mens player pool
let menPlayers = {
  goalkeeper: [
    "Drake Callender",
    "Ethan Horvath",
    "Gabriel Slonina",
    "JT Marcinkowski",
    "Matt Turner",
    "Roman Celentano",
    "Sean Johnson",
    "Zack Steffen"
  ],
  centerback: [
    "Aaron Long",
    "Auston Trusty",
    "Cameron Carter-Vickers",
    "Chris Richards",
    "Erik Palmer-Brown",
    "Jalen Neal",
    "James Sands",
    "John Brooks",
    "Mark McKenzie",
    "Matt Miazga",
    "Miles Robinson",
    "Reggie Cannon",
    "Sam Rogers",
    "Tim Ream",
    "Walker Zimmerman"
  ],
  leftback: [
    "Antonee Robinson",
    "DeJuan Jones",
    "George Bello",
    "Joe Scally",
    "John Tolkin",
    "Jonathan Gomez",
    "Kevin Paredes",
    "Sam Vines",
    "Sergino Dest",
    "Tim Ream"
  ],
  rightback: [
    "Bryan Reynolds",
    "Chris Richards",
    "DeAndre Yedlin",
    "DeJuan Jones",
    "Joe Scally",
    "Julian Gressel",
    "Reggie Cannon",
    "Sergino Dest",
    "Shaq Moore"
  ],
  midfield: [
    "Aidan Morris",
    "Alan Sonora",
    "Alex Mendez",
    "Brenden Aaronson",
    "Cristian Roldan",
    "Djordje Mihailovic",
    "Eryk Williamson",
    "Gianluca Busio",
    "Giovanni Reyna",
    "Jack McGlynn",
    "Jackson Yueill",
    "James Sands",
    "Jesus Ferreira",
    "Johnny Cardoso",
    "Keaton Parks",
    "Kellyn Acosta",
    "Luca de la Torre",
    "Malik Tillman",
    "Paxten Aaronson",
    "Paxton Pomykal",
    "Sebastian Lletget",
    "Taylor Booth",
    "Tyler Adams",
    "Weston McKennie",
    "Yunus Musah"
  ],
  winger: [
    "Alejandro Zendejas",
    "Brenden Aaronson",
    "Cade Cowell",
    "Christian Pulisic",
    "Cristian Roldan",
    "Djordje Mihailovic",
    "Emmanuel Sabbi",
    "Giovanni Reyna",
    "Jesus Ferreira",
    "Jordan Morris",
    "Kevin Paredes",
    "Konrad de la Fuente",
    "Malik Tillman",
    "Matthew Hoppe",
    "Paul Arriola",
    "Paxten Aaronson",
    "Sergino Dest",
    "Tim Weah"
  ],
  centerforward: [
    "Brandon Vazquez",
    "Daryl Dike",
    "Gyasi Zardes",
    "Haji Wright",
    "Jeremy Ebobisse",
    "Jesus Ferreira",
    "Jordan Morris",
    "Jordan Pefok",
    "Josh Sargent",
    "Matthew Hoppe",
    "Ricardo Pepi",
    "Tim Weah"
  ],
  leftwingback: [
    "Antonee Robinson",
    "Christian Pulisic",
    "Cristian Roldan",
    "DeJuan Jones",
    "George Bello",
    "Joe Scally",
    "John Tolkin",
    "Jonathan Gomez",
    "Kellyn Acosta",
    "Kevin Paredes",
    "Paul Arriola",
    "Sam Vines",
    "Sergino Dest",
    "Tim Weah",
    "Weston McKennie",
    "Yunus Musah"
  ],
  rightwingback: [
    "Bryan Reynolds",
    "Cade Cowell",
    "Chris Richards",
    "Christian Pulisic",
    "Cristian Roldan",
    "DeAndre Yedlin",
    "DeJuan Jones",
    "Joe Scally",
    "Julian Gressel",
    "Kellyn Acosta",
    "Kevin Paredes",
    "Paul Arriola",
    "Reggie Cannon",
    "Sergino Dest",
    "Shaq Moore",
    "Tim Weah",
    "Tyler Adams",
    "Weston McKennie",
    "Yunus Musah"
  ],
  forward: [
    "Alejandro Zendejas",
    "Brandon Vazquez",
    "Brenden Aaronson",
    "Cade Cowell",
    "Christian Pulisic",
    "Cristian Roldan",
    "Daryl Dike",
    "Djordje Mihailovic",
    "Emmanuel Sabbi",
    "Giovanni Reyna",
    "Gyasi Zardes",
    "Haji Wright",
    "Jeremy Ebobisse",
    "Jesus Ferreira",
    "Jordan Morris",
    "Jordan Pefok",
    "Josh Sargent",
    "Kevin Paredes",
    "Konrad de la Fuente",
    "Malik Tillman",
    "Matthew Hoppe",
    "Paul Arriola",
    "Paxten Aaronson",
    "Ricardo Pepi",
    "Tim Weah",
    "Weston McKennie"
  ]
};

//Global variable to hold players in the womens player pool
let womenPlayers = {
  goalkeeper: [
    "Adrianna Franch",
    "Alyssa Naeher",
    "Aubrey Kingsbury",
    "Bella Bixby",
    "Casey Murphy",
    "Jane Campbell"
  ],
  centerback: [
    "Abby Dahlkemper",
    "Alana Cook",
    "Becky Sauerbrunn",
    "Emily Sonnett",
    "Naomi Girma",
    "Sarah Gorden",
    "Tierna Davidson"
  ],
  leftback: [
    "Carson Pickett",
    "Casey Krueger",
    "Crystal Dunn",
    "Emily Fox",
    "Emily Sonnett",
    "Hailie Mace",
    "Imani Dorsey",
    "Kelly O'Hara",
    "Sofia Huerta",
    "Tierna Davidson"
  ],
  rightback: [
    "Carson Pickett",
    "Casey Krueger",
    "Crystal Dunn",
    "Emily Fox",
    "Emily Sonnett",
    "Hailie Mace",
    "Imani Dorsey",
    "Kelly O'Hara",
    "Sofia Huerta",
    "Tierna Davidson"
  ],
  midfield: [
    "Andi Sullivan",
    "Ashley Sanchez",
    "Catarina Macario",
    "Crystal Dunn",
    "Jaelin Howell",
    "Julie Ertz",
    "Kristie Mewis",
    "Lindsey Horan",
    "Morgan Gautrat",
    "Olivia Moultrie",
    "Rose Lavelle",
    "Sam Coffey",
    "Sam Mewis",
    "Savanna DeMelo",
    "Taylor Kornieck"
  ],
  winger: [
    "Alex Morgan",
    "Alyssa Thompson",
    "Ashley Hatch",
    "Catarina Macario",
    "Christen Press",
    "Crystal Dunn",
    "Imani Dorsey",
    "Jaedyn Shaw",
    "Lynn Williams",
    "Mallory Swanson",
    "Megan Rapinoe",
    "Mia Fishel",
    "Michelle Cooper",
    "Midge Purce",
    "Morgan Weaver",
    "Sophia Smith",
    "Tobin Heath",
    "Trinity Rodman"
  ],
  centerforward: [
    "Alex Morgan",
    "Alyssa Thompson",
    "Ashley Hatch",
    "Catarina Macario",
    "Christen Press",
    "Crystal Dunn",
    "Imani Dorsey",
    "Jaedyn Shaw",
    "Lynn Williams",
    "Mallory Swanson",
    "Megan Rapinoe",
    "Mia Fishel",
    "Michelle Cooper",
    "Midge Purce",
    "Morgan Weaver",
    "Sophia Smith",
    "Tobin Heath",
    "Trinity Rodman"
  ],
  leftwingback: [
    "Carson Pickett",
    "Casey Krueger",
    "Catarina Macario",
    "Crystal Dunn",
    "Emily Fox",
    "Emily Sonnett",
    "Hailie Mace",
    "Imani Dorsey",
    "Kelly O'Hara",
    "Mallory Swanson",
    "Midge Purce",
    "Sofia Huerta",
    "Sophia Smith",
    "Tierna Davidson",
    "Tobin Heath",
    "Trinity Rodman"
  ],
  rightwingback: [
    "Carson Pickett",
    "Casey Krueger",
    "Catarina Macario",
    "Crystal Dunn",
    "Emily Fox",
    "Emily Sonnett",
    "Hailie Mace",
    "Imani Dorsey",
    "Kelly O'Hara",
    "Mallory Swanson",
    "Midge Purce",
    "Sofia Huerta",
    "Sophia Smith",
    "Tierna Davidson",
    "Tobin Heath",
    "Trinity Rodman"
  ],
  forward: [
    "Alex Morgan",
    "Alyssa Thompson",
    "Ashley Hatch",
    "Catarina Macario",
    "Christen Press",
    "Crystal Dunn",
    "Imani Dorsey",
    "Jaedyn Shaw",
    "Lynn Williams",
    "Mallory Swanson",
    "Megan Rapinoe",
    "Mia Fishel",
    "Michelle Cooper",
    "Midge Purce",
    "Morgan Weaver",
    "Sophia Smith",
    "Tobin Heath",
    "Trinity Rodman"
  ]
};

//Function to populate the drop-down menus
//Takes in the id of the select element and a list of players
function populateOptions(id, players) {
  var select = document.getElementById(id);
  select.innerHTML = "";
  //Include a blank option to allow users to "clear" their choice
  var blankOption = document.createElement("option");
  blankOption.value = "";
  blankOption.text = " ";
  select.add(blankOption);
  //Use the players array to populate the various options of this select item
  for (var i = 0; i < players.length; i++) {
    var option = document.createElement("option");
    option.value = players[i];
    option.text = players[i];
    select.add(option);
  }
}

//Function to populate the dropdown menus on the page based on the current team (men/women) and formation
function populateDropdowns(currentTeam, currentFormationDiv) {
  //Determine whether we're working with the mens team or womens team
  let currentTeamPlayerPool = currentTeam === "mens" ? menPlayers : womenPlayers;

  //Cases to populate the formation divs based on the formation selected
  switch (currentFormationDiv) {
    case '433':
      // code to populate dropdowns for 433 formation
      populateOptions("433goalkeeper1_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("433goalkeeper2_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("433goalkeeper3_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("433leftback1_options", currentTeamPlayerPool['leftback']);
      populateOptions("433leftback2_options", currentTeamPlayerPool['leftback']);
      populateOptions("433leftcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("433leftcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("433rightcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("433rightcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("433rightback1_options", currentTeamPlayerPool['rightback']);
      populateOptions("433rightback2_options", currentTeamPlayerPool['rightback']);
      populateOptions("433leftmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("433leftmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("433centermid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("433centermid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("433rightmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("433rightmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("433leftwing1_options", currentTeamPlayerPool['winger']);
      populateOptions("433leftwing2_options", currentTeamPlayerPool['winger']);
      populateOptions("433rightwing1_options", currentTeamPlayerPool['winger']);
      populateOptions("433rightwing2_options", currentTeamPlayerPool['winger']);
      populateOptions("433centerforward1_options", currentTeamPlayerPool['centerforward']);
      populateOptions("433centerforward2_options", currentTeamPlayerPool['centerforward']);
      populateOptions("433centerforward2_options", currentTeamPlayerPool['centerforward']);
      populateOptions("alt1_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt2_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt3_options", currentTeamPlayerPool['allplayers']);
      break;
    case '442':
      // code to populate dropdowns for 442 formation
      populateOptions("442goalkeeper1_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("442goalkeeper2_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("442goalkeeper3_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("442leftback1_options", currentTeamPlayerPool['leftback']);
      populateOptions("442leftback2_options", currentTeamPlayerPool['leftback']);
      populateOptions("442leftcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("442leftcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("442rightcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("442rightcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("442rightback1_options", currentTeamPlayerPool['rightback']);
      populateOptions("442rightback2_options", currentTeamPlayerPool['rightback']);
      populateOptions("442leftmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("442leftmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("442rightmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("442rightmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("442leftwing1_options", currentTeamPlayerPool['winger']);
      populateOptions("442leftwing2_options", currentTeamPlayerPool['winger']);
      populateOptions("442rightwing1_options", currentTeamPlayerPool['winger']);
      populateOptions("442rightwing2_options", currentTeamPlayerPool['winger']);
      populateOptions("442leftforward1_options", currentTeamPlayerPool['forward']);
      populateOptions("442leftforward2_options", currentTeamPlayerPool['forward']);
      populateOptions("442rightforward1_options", currentTeamPlayerPool['forward']);
      populateOptions("442rightforward2_options", currentTeamPlayerPool['forward']);
      populateOptions("alt1_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt2_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt3_options", currentTeamPlayerPool['allplayers']);
      break;
    case '4231':
      // code to populate dropdowns for 4231 formation
      populateOptions("4231goalkeeper1_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("4231goalkeeper2_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("4231goalkeeper3_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("4231leftback1_options", currentTeamPlayerPool['leftback']);
      populateOptions("4231leftback2_options", currentTeamPlayerPool['leftback']);
      populateOptions("4231leftcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("4231leftcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("4231rightcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("4231rightcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("4231rightback1_options", currentTeamPlayerPool['rightback']);
      populateOptions("4231rightback2_options", currentTeamPlayerPool['rightback']);
      populateOptions("4231leftmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("4231leftmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("4231cam1_options", currentTeamPlayerPool['midfield']);
      populateOptions("4231cam2_options", currentTeamPlayerPool['midfield']);
      populateOptions("4231rightmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("4231rightmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("4231leftwing1_options", currentTeamPlayerPool['winger']);
      populateOptions("4231leftwing2_options", currentTeamPlayerPool['winger']);
      populateOptions("4231rightwing1_options", currentTeamPlayerPool['winger']);
      populateOptions("4231rightwing2_options", currentTeamPlayerPool['winger']);
      populateOptions("4231centerforward1_options", currentTeamPlayerPool['centerforward']);
      populateOptions("4231centerforward2_options", currentTeamPlayerPool['centerforward']);
      populateOptions("4231centerforward2_options", currentTeamPlayerPool['centerforward']);
      populateOptions("alt1_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt2_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt3_options", currentTeamPlayerPool['allplayers']);
      break;
    case '343':
      // code to populate dropdowns for 343 formation
      populateOptions("343goalkeeper1_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("343goalkeeper2_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("343goalkeeper3_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("343leftwingback1_options", currentTeamPlayerPool['leftwingback']);
      populateOptions("343leftwingback2_options", currentTeamPlayerPool['leftwingback']);
      populateOptions("343leftcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("343leftcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("343centercenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("343centercenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("343rightcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("343rightcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("343rightwingback1_options", currentTeamPlayerPool['rightwingback']);
      populateOptions("343rightwingback2_options", currentTeamPlayerPool['rightwingback']);
      populateOptions("343leftmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("343leftmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("343rightmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("343rightmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("343leftwing1_options", currentTeamPlayerPool['winger']);
      populateOptions("343leftwing2_options", currentTeamPlayerPool['winger']);
      populateOptions("343rightwing1_options", currentTeamPlayerPool['winger']);
      populateOptions("343rightwing2_options", currentTeamPlayerPool['winger']);
      populateOptions("343centerforward1_options", currentTeamPlayerPool['forward']);
      populateOptions("343centerforward2_options", currentTeamPlayerPool['forward']);
      populateOptions("alt1_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt2_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt3_options", currentTeamPlayerPool['allplayers']);
      break;
    case '352':
      // code to populate dropdowns for 352 formation
      populateOptions("352goalkeeper1_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("352goalkeeper2_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("352goalkeeper3_options", currentTeamPlayerPool['goalkeeper']);
      populateOptions("352leftwingback1_options", currentTeamPlayerPool['leftwingback']);
      populateOptions("352leftwingback2_options", currentTeamPlayerPool['leftwingback']);
      populateOptions("352leftcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("352leftcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("352centercenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("352centercenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("352rightcenterback1_options", currentTeamPlayerPool['centerback']);
      populateOptions("352rightcenterback2_options", currentTeamPlayerPool['centerback']);
      populateOptions("352rightwingback1_options", currentTeamPlayerPool['rightwingback']);
      populateOptions("352rightwingback2_options", currentTeamPlayerPool['rightwingback']);
      populateOptions("352leftmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("352leftmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("352centermid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("352centermid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("352rightmid1_options", currentTeamPlayerPool['midfield']);
      populateOptions("352rightmid2_options", currentTeamPlayerPool['midfield']);
      populateOptions("352leftforward1_options", currentTeamPlayerPool['forward']);
      populateOptions("352leftforward2_options", currentTeamPlayerPool['forward']);
      populateOptions("352rightforward1_options", currentTeamPlayerPool['forward']);
      populateOptions("352rightforward2_options", currentTeamPlayerPool['forward']);
      populateOptions("alt1_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt2_options", currentTeamPlayerPool['allplayers']);
      populateOptions("alt3_options", currentTeamPlayerPool['allplayers']);
      break;
    default:
      console.error("Invalid formation.");
      return;
  }
}

//If a user changes the player selected in a drop-down menu, the text box will populate with that player
function handleChange(selectId) {
  let select = document.getElementById(selectId);
  var textBoxId = selectId.replace("_options", "");
  var textBox = document.getElementById(textBoxId);
  if (select.value === "") {
    textBox.value = "";
  }
  else {
    //Have the textbox value match the player selected
    var selectedPlayer = select.value;
    if (selectedPlayer) {
      textBox.value = selectedPlayer;
    }
  }
}



//Function to save all the user-entered data into localStorage
function saveData() {
  let currentFormation = document.getElementById(currentFormationDiv);
  let textBoxes = currentFormation.querySelectorAll("input[type='text']");

  // Check if all the text boxes have a value
  let isDataValid = true;
  let formationData = {};
  textBoxes.forEach(textBox => {
    if (!textBox.value) {
      isDataValid = false;
      return;
    }
    formationData[textBox.id] = textBox.value;
  });
  //Print an error message if any of the text boxes are blank
  if (!isDataValid) {
    alert('Not all player names have been filled out');
    return;
  }

  // Check for repeats among the values of the text boxes
  let playerNames = new Set();
  for (let player of Object.values(formationData)) {
    if (playerNames.has(player)) {
      alert(`Player name "${player}" has been repeated`);
      return;
    }
    playerNames.add(player);
  }

  //Call updateDB to update the PocketBase database will the user-entered information
  //updateDB(formationData);

  // If there are no issues, append the data to the lineupData object in localStorage
  if (currentTeam === 'mens') {
    //Keep track of every submission
    var lineupData = JSON.parse(localStorage.getItem('menslineupData')) || [];
    lineupData.push(formationData);
    localStorage.setItem('menslineupData', JSON.stringify(lineupData));

    //Keep track of player selections
    var playerSelections = JSON.parse(localStorage.getItem('mensPlayerSelections')) || {};

  }
  if (currentTeam === 'womens') {
    var lineupData = JSON.parse(localStorage.getItem('womenslineupData')) || [];
    lineupData.push(formationData);
    localStorage.setItem('womenslineupData', JSON.stringify(lineupData));

    //Keep track of player selections
    var playerSelections = JSON.parse(localStorage.getItem('womensPlayerSelections')) || {};
  }
  
  //For the objects storing how many times each player was selected, increment those the user selected
  for (let player of Object.values(formationData)) {
    if (playerSelections[player]) {
      playerSelections[player]++;
    } else {
      playerSelections[player] = 1;
    }
  }

  //Store those back in localStorage
  if (currentTeam === 'mens') {
    localStorage.setItem('mensPlayerSelections', JSON.stringify(playerSelections));
  }
  if (currentTeam === 'womens') {
    localStorage.setItem('womensPlayerSelections', JSON.stringify(playerSelections));
  }
  

  // Keep track of formation selections
  if (currentTeam === 'mens') {
    var formationSelections = JSON.parse(localStorage.getItem('mensformationSelections')) || {};
  }
  if (currentTeam === 'womens') {
    var formationSelections = JSON.parse(localStorage.getItem('womensformationSelections')) || {};
  }

  //For the objects that store how often each formation was chosen, increment the one the user chose
  if (formationSelections[currentFormationDiv]) {
    formationSelections[currentFormationDiv]++;
  } else {
    formationSelections[currentFormationDiv] = 1;
  }

  //Store that data back in localStorage
  if (currentTeam === 'mens') {
    localStorage.setItem('mensformationSelections', JSON.stringify(formationSelections));
  }
  if (currentTeam === 'womens') {
    localStorage.setItem('womensformationSelections', JSON.stringify(formationSelections));
  }

  //Print a success message back to the user
  alert("Data has been successfully saved!");

  // Clear the formation switch
  clearFormationSwitch();
}

//Function to clear all user-input data when the Clear button is pressed
function clearAll() {
  //Prompt the user to account for accidental clicks
  if (confirm("Are you sure you want to clear all the data?")) {
    var textboxes = document.querySelectorAll("input[type='text']");
    //Sets all the textboxes to bee empty strings
    for (let textbox of textboxes) {
      textbox.value = "";
    }
    var selects = document.querySelectorAll("select");
    //Sets all the drop-down menus to be option 0, which is ""
    for (let select of selects) {
      select.selectedIndex = 0;
    }
  }
}

//Function to clear all user-input data when the formation is changed or the team is changed men <--> women
function clearFormationSwitch() {
  var textboxes = document.querySelectorAll("input[type='text']");
  for (let textbox of textboxes) {
    textbox.value = "";
  }
  var selects = document.querySelectorAll("select");
  for (let select of selects) {
    select.selectedIndex = 0;
  }
}

//Function to populate each textbox with a random player to make it easy to test. 
function test() {
  let selectedNames = [];
  //Starts with the textBoxes in the currentFormation div
  let currentFormation = document.getElementById(currentFormationDiv);
  let textBoxes = currentFormation.querySelectorAll("input[type='text']");
  //For each textbox in the currentFormation div
  textBoxes.forEach(textBox => {
    //Get the id of the select element that matches this text box
    let selectId = textBox.id + "_options";
    let select = document.getElementById(selectId);
    let options = select.options;
    let optionCount = options.length;
    //Generate a random index that will select the player
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1;
    }
    //This while loop will repeat if the player name is already in selectedNames
    while (selectedNames.includes(options[randomIndex].text));
    //Add the player chosen to selectedNames
    selectedNames.push(options[randomIndex].text);
    options[randomIndex].selected = true;
    //Call handleChange to populate the textbox with a value that matches the current select option chosen
    handleChange(selectId);
  });

  //Repeat the above procedure for the lastthreeplayers div
  let lastThreePlayers = document.getElementById("lastthreeplayers");
  let lastThreeTextBoxes = lastThreePlayers.querySelectorAll("input[type='text']");
  lastThreeTextBoxes.forEach(textBox => {
    let selectId = textBox.id + "_options";
    let select = document.getElementById(selectId);
    let options = select.options;
    let optionCount = options.length;
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1;
    } while (options[randomIndex] && selectedNames.includes(options[randomIndex].text));
    selectedNames.push(options[randomIndex].text);
    options[randomIndex].selected = true;
    handleChange(selectId);
  });
}

//Functions that are called when the page is loaded
$(document).ready(function () {

  //Set 433 as the default formation and the mens team as the default team
  currentFormationDiv = '433';
  currentTeam = 'mens';

  // get the current formation button
  let currentFormationButton = document.getElementById(currentFormationDiv + "_button");
  // add the highlight class to the current formation button
  currentFormationButton.classList.add("highlight");

  // get the current team button (men/women)
  let currentTeamButton = document.getElementById(currentTeam + "Button");
  // add the highlight class to the current team button
  currentTeamButton.classList.add("highlight");


  //Make sure the 433 formation is displayed by default and all others are hidden
  let parent = document.querySelector('.display');
  let parentID = parent.id;

  //Dynamically dd to the men/women player pools a set of all the players contained by the other position lists
  let allmenplayers = new Set();
  let allwomenplayers = new Set();

  for (const [position, players] of Object.entries(menPlayers)) {
    for (const player in players) {
      allmenplayers.add(players[player]);
    }
  }

  for (const [position, players] of Object.entries(womenPlayers)) {
    for (const player in players) {
      allwomenplayers.add(players[player]);
    }
  }

  //Convert from sets to arrays
  let allmenplayersarray = Array.from(allmenplayers);
  let allwomenplayersarray = Array.from(allwomenplayers);

  //Alphabetize the two arrays of player
  allmenplayersarray.sort();
  allwomenplayersarray.sort();

  //Store the arrays in the menPlayers and womenPlayers objects
  menPlayers["allplayers"] = allmenplayersarray;
  womenPlayers["allplayers"] = allwomenplayersarray;

  //Populate the 433 formation by default
  if (parentID === '433') {
    populateDropdowns(currentTeam, currentFormationDiv);
  }

  //Add the "change" event listener to all the select elements to handle changes
  var selects = document.querySelectorAll("select");
  for (let select of selects) {
    select.addEventListener("change", function () { handleChange(select.id); });
  }

  const formationButtons = document.querySelectorAll('.formationButton');
  const allFormations = document.querySelectorAll('.formation');

  //This will display 433 by default and hide the other divs
  allFormations.forEach(formation => {
    if (formation.id === "433") {
      formation.style.display = "block";
    } else {
      formation.style.display = "none";
    }
  });

  const teamButtons = document.querySelectorAll('.teamButton');

  //Adds the click event listener to the Men's/Women's buttons so that player pools that the drop-downs
  //draw from can dynamically change
  teamButtons.forEach(button => {
    button.addEventListener('click', function () {
      //If the mens button is clicked, highlight it blue
      if (button.id === 'mensButton') {
        if (currentTeam === 'womens') {
          currentTeam = 'mens';
          clearFormationSwitch();
          let teamButton = document.getElementById("mensButton");
          teamButton.classList.add("highlight");
          let oldTeamButton = document.getElementById("womensButton");
          oldTeamButton.classList.remove("highlight");
        }
      }
      //If the womens button is clicked, highlight it blue
      if (button.id === 'womensButton') {
        if (currentTeam === 'mens') {
          currentTeam = 'womens';
          clearFormationSwitch();
          let teamButton = document.getElementById("womensButton");
          teamButton.classList.add("highlight");
          let oldTeamButton = document.getElementById("mensButton");
          oldTeamButton.classList.remove("highlight");
        }
      }
      //Populates the drop-downs when the team is changed
      populateDropdowns(currentTeam, currentFormationDiv);
    });
  });

  //Adds the click event listener so that the formation div can dynamically change
  formationButtons.forEach(button => {
    button.addEventListener('click', function () {
      clearFormationSwitch();
      let newFormationDiv = document.getElementById(button.innerHTML);
      allFormations.forEach(formation => {
        let formationButton = document.getElementById(formation.id + "_button");
        if (formation.id === newFormationDiv.id) {
          formation.style.display = "block";
          currentFormationDiv = formation.id;
          // get the current formation button
          // add the highlight class to the current formation button
          formationButton.classList.add("highlight");
        } else {
          formation.style.display = "none";
          formationButton.classList.remove("highlight");
        }
      });
      //Populates the drop-downs when the formation is changed
      populateDropdowns(currentTeam, currentFormationDiv);
    });
  });
});


/**
 * To get the results:
 * 1. Open the browser developer tools: right-click anywhere on the page and select "Inspect"
 * 2. Access the localStorage: In the developer tools, navigate to the "Application" or "Storage" tab.
 * 3. Copy the JSON data: Select the localStorage data and right-click to copy it.
 * 4. Create a new text file: Open a text editor such as Notepad and paste the copied JSON data into it.
 * 5. Convert the JSON data to a CSV file:  use a online JSON to CSV converter like https://www.convertcsv.com/json-to-csv.htm 
 * 6. Save the CSV file: Once you have the CSV file, save it to your computer.
 * 7. Open the CSV file in a spreadsheet program like Microsoft Excel or Google Sheets to view to manipulate the data.
 */



