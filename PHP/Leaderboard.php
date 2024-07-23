<?php
    //Include the PHP functions to be used on the page 
    include('Website.php'); 
	
    //Output header and navigation 
    HeaderReplica("Leaderboard");
    navigationBarReplica("Leaderboard");
?>



<div class="leaderboardbox" id="Leaderboard"></div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

<script>
    window.onload = displayleaderboard();

    // this function updates and displays the functions automatically
    function displayleaderboard() {
        let lBname = [] // array to hold leaderboard names
        let LBscore = [] // array to hold leaderboard scores
        let Scores = []  // array to hold scores

        let ranks = document.getElementById("Leaderboard");
        let string = ""; // initialize the string to be appended to the leaderboard

        let i = 0;
        let UserScores = sessionStorage.getItem('User_logged_in')
        let newScore_ = JSON.parse(UserScores);

        for(let i = 0; i < localStorage.length; i++) {

            // Variable "key" gets all the keys that has been stored in the local storage
            let key = localStorage.key( i );

            // Parsing all the keys to convert them back to JS objects, then storing them in an array(Scores)
            let keyObject = JSON.parse( localStorage.getItem( key ) );
            Scores.push(keyObject);

            // Pushing usernames from the local storage to the array lBname
            lBname.push(keyObject[0].Username)

            // Pushing scores from the local storage to the array LBscore
            LBscore.push(keyObject[0].Score)
        }

        string += "<table class='content-table'>" // appending table tag to the leaderboard

        // Creating the header for the leaderboard by simply appending to the string
        string += "<thead>"
        string += "<tr>"
        string += "<th>User</th>";
        string += "<th>Username</th>";
        string += "<th>Score</th>";
        string += "</tr>"
        string += "</thead>"

        string += "<tbody>";

        // Use a for loop to get all the users from the local storage
        for (let temp = 0; temp < lBname.length; temp++) {
          // Only display users whose score is above 0
          if (LBscore[temp] >= 1){
              string += "<tr>";
              string += "<td>" + ++i + "</td>";
              string += "<td>" + lBname[temp] + "</td>";
              string += "<td>" + LBscore[temp] + "</td>";
              string += "</tr>";
          }
        }

        string += "</tbody>";

        string += "</table>"

        ranks.innerHTML = string;
    }
               
</script>


<?php
    //Output the footer
    FooterReplica();
?>