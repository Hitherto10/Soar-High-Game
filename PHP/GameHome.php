<?php
//Include the files needed
include('Website.php');

//Output header and navigation
HeaderReplica("GameHome");
navigationBarReplica("GameHome");
?>
    <link rel="stylesheet" href="../CSS/styles.css?v=<?php echo time(); ?>">

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:500'); /* Font used for certain texts */
</style>

    <link rel="preload" href="../Images/LA.png" as="image"/> <!--Preloading the moving ground image-->
    <body>
    <div id="container">
        <canvas  id="StarterCanvas"></canvas>
        <div id="Title">
            <span class="soar"> SOAR HIGH</span>
        </div>

        <div id="ControlEz">
            <!--Preloading the moving ground image-->
            <a id="ezlevel" class="playgame"></a>
            <button id="eszlevel" class="playGameButton">PLAY</button>
        </div>

        <div id="LinkToLB">
            <!--Sends the user to the leaderboard to view rankings-->
            <a href="../PHP/Leaderboard.php"><button id="eszlevel" class="LeaderBoardtxt">LEADERBOARD</button></a>
        </div>

    </div>
    <script src='../JS/Gamefile.js' type="module"></script> <!--linking the script file-->
    </body>
<?php
//Output the footer
FooterReplica();
?>