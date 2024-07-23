<?php

// Function to replicate the header
function HeaderReplica($title){
    echo '<!DOCTYPE html>';
    echo '<html>';
    echo '<head>';
    echo '<title>' .$title . '</title>';
    echo '<link rel="stylesheet" href="../CSS/styles.css?v=<?php echo time(); ?>">';
    echo '</head class="HomePage">';
    echo '<body>';
}

// Function to replicate the Navigation bar and it's contents
function navigationBarReplica($pageName){
    echo '<header class="generalHeader">';
    echo '<h3>S O A R  H I G H</h3>';
    echo '<nav>';
    echo '<ul class="navbar">';
            
    $navbar_name = array("Walkthrough", "GameHome", "Leaderboard");
    $navbar_addresses = array("Walkthrough.php", "GameHome.php",  "Leaderboard.php");


    // Prints out the pages of the website on the navigation bar 
    for($i = 0; $i < count($navbar_name); $i++)
    {
        echo '<li> <a ';
        if($navbar_name[$i] == $pageName)
        {
            echo 'class="selected" ';
        } 
        echo 'href="' . $navbar_addresses[$i] . '">' . $navbar_name[$i] . '</a>';
        '</li>';
    }

    echo '</ul>';
    echo '</nav>';
    echo '<a href="../HTML/Signin.html"><button class="signoutbutton">Sign Out</button></a>';
    echo '</header>';
}



// Function to replicate the footer
function FooterReplica(){
    echo '<footer>';
    echo '<p class="leftsta">&copy;Copyright 2022 HITHERTO - SOAR HIGH</p>';
    echo '<p class="middlesta">Instagram: __hitherto | Whatsapp: +234 810 320 3934</p>';
    echo '<p class="rightsta">ALL RIGHTS RESERVED</p>';
    echo '</footer>';
    echo '</body>';
    echo '</html>';
}


