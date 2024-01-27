
/* LIST OF VARIABLES */	

var questionState = 0;	//Keeps track of users place in quiz
var quizActive = true;	//True until last question is answered
    
var userStats =	[
                    0,	//cute
                    0, 	//spooky
                    0, 	//lame 
                    0, 	//nerdy 
                    0, 	//silly 
                    0 	//cool 
                ];

var tempStats = userStats; //Holds stat increases relating to user selection

/* QUIZ BUILDING VARIABLES */

//The following array contains all question text elements

var questionText =	[															
                        "How did you spend your time in the late 90s/early 00s?", 	//q1
                        "It's snack time. What are you eating?", 					//q2
                        "What TV show did you most look forward to after school?", 	//q3
                        "What toy could you not put down growing up?", 				//q4
                        "What did you listen to in the 90s/early 00s?", 			//q5
                        "What was your go to computer program at school?" 			//q6
                    ];

//The following array contains all answer text elements for each question

var answerText =	[		//question 1 answers													
                        [	"Playing Neopets", 				
                            "Playing Kingdom of Loathing", 
                            "Trolling chatrooms",
                            "Playing Quake or Doom",
                            "I didn't have the internet",
                            "Watching flash videos"],							
                            
                            //question 2 answers
                        [	"Yowie", 							
                            "Curly Wurlys and Chomps",
                            "Mamee Noodles",
                            "Fruit",
                            "Sunnyboys",
                            "Fruit rollups"],
                            
                            //question 3 answers
                        [	"Round the Twist", 
                            "Rugrats",
                            "Neighbours",
                            "Are You Afraid of the Dark?",
                            "Rocko's Modern Life",
                            "Art Attack"],
                            
                            //question 4 answers
                        [	"Cabbage Patch Doll", 
                            "Rubix Cube",
                            "Slime",
                            "Hot Wheels",
                            "Mighty Max/Polly Pocket",
                            "Tamagotchi"],
                            
                            //question 5 answers
                        [	"Spice Girls",
                            "I didn't listen to music", 
                            "rage",
                            "Backstreet Boys",
                            "The sweet sound of dial up",
                            "So Fresh CDs"],		

                            //question 6 answers								
                        [	"Kid Pix", 
                            "Minesweeper",
                            "Lemmings",
                            "Zoombinis",
                            "Microsoft Paint",
                            "Pinball"]
                    ]

//The following array contains all personality stat increments for each answer of every question

var answerValues =	[		//question 1 answer values
                        [	[3,0,1,0,2,0], 		
                            [0,0,0,1,2,3],		
                            [0,3,0,2,1,0],
                            [0,2,0,3,0,1],
                            [2,1,3,0,0,0],
                            [1,0,2,0,3,0] 
                        ],	
                    
                            //question 2 answer values
                        [	[0,3,0,2,0,1], 
                            [2,0,0,0,3,1],
                            [0,2,0,0,1,3],
                            [2,0,3,1,0,0],
                            [1,0,0,3,2,0],
                            [3,0,1,0,2,0] 
                        ],

                            //question 3 answer values
                        [	[0,1,0,0,3,2], 
                            [3,0,2,0,1,0],
                            [1,0,3,0,2,0],
                            [0,3,0,1,2,0],
                            [0,0,0,2,1,3],
                            [0,0,0,3,1,2] 
                        ],
                            
                            //question 4 answer values
                        [	[2,0,3,0,1,0], 
                            [0,1,0,3,0,2],
                            [0,3,2,0,0,1],
                            [0,0,0,2,1,3],
                            [2,0,0,0,3,1],
                            [3,0,0,2,1,0] 
                        ],
                            
                            //question 5 answer values
                        [	[3,0,0,0,2,1], 
                            [0,2,3,1,0,0],
                            [0,0,0,2,1,3],
                            [1,3,0,0,0,2],
                            [0,0,0,3,2,1],
                            [1,0,2,0,3,0] 
                        ],
                            
                            //question 6 answer values
                        [	[1,0,0,3,2,0], 
                            [0,3,0,2,0,1],
                            [3,1,0,0,0,2],
                            [1,0,0,2,3,0],
                            [0,0,3,2,1,0],
                            [0,0,1,2,0,3] 
                        ]
                    ]

/* SHORTCUT VARIABLES */
//so I don't have to keep typing

var results = document.getElementById("results");
var quiz = document.getElementById("quiz");
var body = document.body.style;
var printResult = document.getElementById("topScore");
var buttonElement = document.getElementById("button");

/* QUIZ FUNCTIONALITY */

buttonElement.addEventListener("click", changeState);	//Add click event listener to main button

/* This function progresses the user through the quiz */

function startQuiz() {
    updatePersonality(); 	//Adds the values of the tempStats to the userStats										
    initText(0);
    questionState = 1;

    buttonElement.disabled = true; //disables button until user chooses next answer
    buttonElement.innerHTML = "Please select an answer";			
    buttonElement.style.opacity = 0.7;
}

function changeState() {								
    
    updatePersonality(); 	//Adds the values of the tempStats to the userStats										
    
    if (quizActive) {	
        
        /*True while the user has not reached the end of the quiz */
        
        initText(questionState);	//sets up next question based on user's progress through quiz
        questionState++;			//advances progress through quiz
        
        buttonElement.disabled = true; //disables button until user chooses next answer
        buttonElement.innerHTML = "Please select an answer";			
        buttonElement.style.opacity = 0.7;
        
    } else {
        
        /*All questions answered*/
        
        setCustomPage(); //runs set up for result page
    }
}

/* This function determines the question and answer content based on user progress through the quiz */

function initText(question) {							
    
    var answerSelection = ""; //text varialbe containting HTML code for the radio buttons' content
    
    /* Creates radio buttons based on user progress through the quiz - current 'id' generation is not w3c compliant*/
    
    for (i = 0; i < answerText[question].length; i++) {		
        
        answerSelection += "<li><input type='radio' name='question" +
        (question+1) + "' onClick='setAnswer("+i+")' id='" + answerText[question][i] + "'><label for='" + answerText[question][i] + "'>" + answerText[question][i] + "</label></li>";
    }
    
    document.getElementById("questions").innerHTML = questionText[question];	//set question text
    document.getElementById("answers").innerHTML = answerSelection;				//set answer text
}

/* This function is called when a user selects an answer, NOT when answer is submitted */

function setAnswer(input) {
            
    clearTempStats();									//clear tempStats in case user reselects their answer
    
    tempStats = answerValues[questionState-1][input];	//selects personality values based on user selection 
            
    if (questionState < questionText.length) {
        
        /*True while the user has not reached the end of the quiz */
        
        buttonElement.innerHTML = "Continue";
        buttonElement.disabled = false;
        buttonElement.style.opacity = 1;
                
    } else {
        
        /*All questions answered - QUESTION TIME IS OVER!*/
        
        quizActive = false;
        buttonElement.innerHTML = "Display your custom website"
        buttonElement.disabled = false;
        buttonElement.style.opacity = 1;
    }
}

/* This function sets tempStats to 0 */

function clearTempStats() {
    
    tempStats = [0,0,0,0,0,0];	
}

/*This function adds the values of the tempStats to the userStats based on user selection */

function updatePersonality() {
    
    for (i = 0; i < userStats.length ; i++) {
        userStats[i] += tempStats[i];
    }
}

/* This function determines the highest personality value */

function setCustomPage() {
    
    var highestStatPosition = 0;	//highest stat defaults as 'cute'
    
    /* This statement loops through all personality stats and updates highestStatPosition based on a highest stat */
    
    for (i = 1 ; i < userStats.length; i++) {
        
        if (userStats[i] > userStats[highestStatPosition]) {
            highestStatPosition = i;
        }
    }
    
    displayCustomPage(highestStatPosition); //passes the index value of the highest stat discovered
    
    /* Hides the quiz content, shows results content */
    quiz.style.display = "none";		
}

/* BUILDS WEB PAGE AS PER RESULTS OF THE QUIZ */

/* The following code manipulates the CSS based on the personality results */
        
function displayCustomPage(personality) {
    switch (personality) {
        
        case 0:	//cute code
            results.style.display = "inline-block";
            results.classList.add("cute");
            body.background = "none";
            body.backgroundImage = "url('http://www.geocities.ws/dopeycodes/backgrounds/stars-pi.gif')";
            body.backgroundRepeat = "repeat";
            body.cursor = "url(https://web.archive.org/web/20090830074921/http://www.geocities.com/anneli1970/hkanicursor.gif), auto";
            printResult.innerText = "cute";
            break;
            
        case 1:		//spooky
            results.style.display = "inline-block";
            results.classList.add("spooky");
            body.background = "none";
            body.backgroundImage = "url('https://web.archive.org/web/20090805212330/http://www.geocities.com/alecbay/evilbackground.gif')";
            body.backgroundRepeat = "repeat";
            body.cursor = "url(https://web.archive.org/web/20091026222418/http://www.geocities.com/evil_empire_uo/demon.gif), auto";
            printResult.innerText = "spooky";
            break;
            
        case 2:		//lame
            results.style.display = "inline-block";
            results.classList.add("lame");
            body.background = "none";
            body.backgroundColor = "#008080";
            body.cursor = "url(https://web.archive.org/web/20091027003810/http://ca.geocities.com/EverlastingIllusions/Miscellanous/Cursor9.gif), auto";
            printResult.innerText = "lame";
            break;
            
        case 3:		//nerdy
            results.style.display = "inline-block";
            results.classList.add("nerdy");
            body.background = "none";
            body.backgroundImage = "url('https://www.dailydot.com/wp-content/uploads/fb5/e4/0ee32ed1e94e79d7d53d7be26bec7aa1.jpg')";
            body.backgroundSize = "100% auto";
            body.cursor = "url(https://web.archive.org/web/20090820061156/http://geocities.com/Tokyo/Club/8802/pikacursor.gif), auto";
            printResult.innerText = "nerdy";
            break;
            
        case 4:		//silly
            results.style.display = "inline-block";
            results.classList.add("silly");
            body.background = "none";
            body.backgroundImage = "url('https://web.archive.org/web/20091026075928/http://geocities.com/MotorCity/Pit/2600/pic/rainbow.gif')";
            body.backgroundRepeat = "repeat";
            body.cursor = "url(https://web.archive.org/web/20090731114836/http://hk.geocities.com/godofcat/mcmug/cursor1p2.gif), auto";
            printResult.innerText = "silly";
            break;
            
        case 5:		//cool
            results.style.display = "inline-block";
            results.classList.add("cool");
            body.background = "none";
            body.backgroundImage = "url('https://web.archive.org/web/20091027004451/http://hk.geocities.com/cs_unknowman/Background/background.gif')";
            body.backgroundRepeat = "repeat";
            body.cursor = "url(https://web.archive.org/web/20091026232535/http://www.geocities.com/john_miles_the_cucumber/arnoldcursorpreview.gif), auto";
            printResult.innerText = "cool";
            break;
            
        default: 
            document.getElementById("error").style.display = "inline-block";

    }
}