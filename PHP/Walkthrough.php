<?php
    //Include the PHP functions to be used on the page 
    include('Website.php'); 
	
    //Output header and navigation 
    HeaderReplica("Walkthrough");
    navigationBarReplica("Walkthrough");
?>

<div class="walkthroughbox">
    <h4>HOW TO PLAY SOAR-HIGH</h4>
    <ul>
        <li style="color: #252525;">PLACE>>>>>>HOLDER>>>>>>><br/></li>
        <li>Click anywhere on the game screen to start the game! <br/><br/></li>
        <li>The Faster you left-click the higher the player goes. <br/><br/></li>
        <li>Calculate each click to avoid the obstacles. <br/><br/></li>
        <li>For every obstacle passed, a point is awarded. <br/><br/></li>
        <li>When you stop clicking, the bird falls to the ground and the game ends! <br /><br /></li>
        <li>If you hit any of the obstacles the game ends! <br/><br/></li>
    </ul>
    <h5>GOOD LUCK!</h5>
    <a href="GameHome.php"><button class="playbutton" href="GameHome.php">Play Soar-High</button>
</div>


<?php
    //Output the footer
    FooterReplica();
?>