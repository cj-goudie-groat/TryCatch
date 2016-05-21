

------------------------------------------------------------------
| ___________              _________         __         .__      |
| \__    ___/______ ___.__.\_   ___ \_____ _/  |_  ____ |  |__   |
|   |    |  \_  __ <   |  |/    \  \/\__  \\   __\/ ___\|  |  \  |
|   |    |   |  | \/\___  |\     \____/ __ \|  | \  \___|   Y  \ |
|   |____|   |__|   / ____| \______  (____  /__|  \___  >___|  / |
|                   \/             \/     \/          \/     \/  |
------------------------------------------------------------------

TryCatch is an interactive HTML5, Javascript, and CSS3 game marketed
towards elementary school students with the goal of helping them 
learn subjects in a fun and challenging manner. It accomplishes this
by making a game where you have to 'catch' the falling elements that
create the answer for the question or word at the top of the screen. 

/************************************************/
/*********** Written by: Team 28 ****************/
/************************************************/
/*												*/
/*			   Nathaniel Thomas                 */
/* 				Tyler Da Costa                  */
/*				 Sheldon Lynn                   */
/*				 Connor Goudie    				*/
/*				  Lucas Chan                    */
/*				  				                */
/************************************************/



/***************************/
/*   Technologies Used     */
/***************************/
For the creation of the game, we decided to use:
- HTML5
- CSS3
- Javascript
- PHP
- MySQL
- Git

Javascript Libraries:
- HowlerJS (Sound Library)
- JQuery

Supporting Software:
- GitKraken 
- Slack (For our communication)



/***************************/
/*   Description of Code   */
/***************************/

The way that we decided to structure our code was based on 
the functions that were written. All of the Javascript was organized 
into seperate files, allowing for easy access and alterations down 
the line. All of the objects and sprites in the game were also their
own file which created a 'class-like' structure for any changes. All 
types of files (Sounds, Javascript, Styles, PHP) are organized into their 
own folders for an easy to access file structure. Each game mode will also
be in its own folder inside the Javascript folder. 

--------
TryCatch
--------
|
├── README.txt
├── images
│   ├── background (Folder)
│   ├── heart.png
│   ├── leftarrow.png
│   ├── letters (Folder)
│   ├── menubar.png
│   ├── rightarrow.png
│   ├── scoreunderlay.png
│   ├── shipanim
│   │   ├── mobile (Folder)
│   ├── shipsprites.png
│   ├── special (Folder)
│   └── starbackground.png
|
├── index.html
|
├── js
│   ├── background.js
│   ├── bonusElement.js
│   ├── bonusLevel.js
│   ├── collision.js
│   ├── drawable.js
│   ├── element.js
│   ├── game.js
│   ├── gameOver.js
│   ├── globals.js
│   ├── howlerjs (Folder)
│   ├── lives.js
│   ├── loadGamemode.js
│   ├── menus.js
│   ├── pause.js
│   ├── player.js
│   ├── resizeCanvas.js
│   ├── selectGamemode.js
│   ├── setDifficulty.js
│   ├── sounds.js
│   ├── specialElement.js
│   └── spellingGame
│       ├── spellingGame.js
│       └── wordList.txt
|
├── leaderboard.html
|
├── php
│   ├── addScore.php
│   └── getScore.php
|
├── sounds
│   ├── bonuslevelsound.mp3
│   ├── button.mp3
│   ├── collectionsound.mp3
│   ├── endgamesound.mp3
│   ├── errorsound.mp3
│   ├── lifesound.mp3
│   ├── mainmenusound.mp3
│   ├── natesound1.mp3
│   ├── natesound2.mp3
│   ├── natesound3.mp3
│   ├── spacesound.mp3
│   └── wordsound.mp3
|
└── style
    ├── leaderboard-style.css
    └── style.css



/***************************/
/*   Issues and Problems   */
/***************************/

During development, there were numerous difficulties that were presented 
to the team. Some of the more challenging problems were: 
- Server Hosting
- Mobile Integration
- Organization of Code
- Collision Optimization
- Time Restraints
- Game Lag

As a team, we were able to support eachother when these challenges arose, 
and through strong communication and dedicated work we were able to
overcome them. The only issues that are currently still an issue as of the
beta launch are:

- Mobile Integration 

/**************************** END OF FILE ******************************/

