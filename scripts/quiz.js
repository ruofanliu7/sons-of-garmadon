
/* LIST OF VARIABLES */	

var questionState = 0;	//Keeps track of users place in quiz
var quizActive = true;	//True until last question is answered
    
var userStats =	[
                    0,	//Kai
                    0, 	//Jay
                    0, 	//Cole 
                    0, 	//Zane 
                    0, 	//Lloyd 
                    0 	//Nya 
                ];

var tempStats = userStats; //Holds stat increases relating to user selection

/* QUIZ BUILDING VARIABLES */

//The following array contains all question text elements

var questionText =	[															
                        "What's Your Preferred Element?", 	//q1
                        "How Would You Describe Your Leadership Style?", 					//q2
                        "Choose Your Ideal Weapon:", 	//q3
                        "What Motivates You in a Challenge?", 				//q4
                        "How Do You Handle Stressful Situations?", 			//q5
                        "Pick a Color:" 			//q6
                    ];

//The following array contains all answer text elements for each question

var answerText =	[		//question 1 answers													
                        [	"a) Fire",
                        "b) Ice",
                        "c) Lightning",
                        "d) Earth",
                        "e) Energy",
                        "f) Water"],							
                            
                            //question 2 answers
                        [	"a) Bold and assertive",
                        "b) Calm and calculated",
                        "c) Energetic and spontaneous",
                        "d) Grounded and reliable",
                        "e) Innovative and strategic",
                        "f) Adaptable and intuitive"],
                            
                            //question 3 answers
                        [	"a) Sword",
                        "b) Shurikens",
                        "c) Nunchucks",
                        "d) Scythe",
                        "e) Techno Blades",
                        "f) Spear"],
                            
                            //question 4 answers
                        [	"a) A desire to be the best",
                        "b) Intelligent problem solving",
                        "c) Adventure and excitement",
                        "d) Proving your reliability",
                        "e) Pushing boundaries",
                        "f) Balance and harmony"],
                            
                            //question 5 answers
                        [	"a) Face it with confidence",
                        "b) Analyze and strategize",
                        "c) Crack a joke",
                        "d) Stay calm and focused",
                        "e) Invent something",
                        "f) Find inner peace"],		

                            //question 6 answers								
                        [	"a) Red",
                        "b) White",
                        "c) Blue",
                        "d) Black",
                        "e) Neon green and purple",
                        "f) Silver"]
                    ]

//The following array contains all personality stat increments for each answer of every question

var answerValues =	[		//question 1 answer values
                        [	[2,1,1,0,0,0], 		
                            [0,2,1,1,0,0],		
                            [0,0,2,1,1,0],
                            [0,0,0,2,1,0],
                            [0,0,0,0,2,1],
                            [1,0,0,0,0,2] 
                        ],	
                    
                            //question 2 answer values
                        [	[2,1,1,0,0,0], 		
                            [0,2,1,1,0,0],		
                            [0,0,2,1,1,0],
                            [0,0,0,2,1,0],
                            [0,0,0,0,2,1],
                            [1,0,0,0,0,2] 
                        ],	

                            //question 3 answer values
                        [	[2,1,1,0,0,0], 		
                            [0,2,1,1,0,0],		
                            [0,0,2,1,1,0],
                            [0,0,0,2,1,0],
                            [0,0,0,0,2,1],
                            [1,0,0,0,0,2] 
                        ],	
                            
                            //question 4 answer values
                        [	[2,1,1,0,0,0], 		
                            [0,2,1,1,0,0],		
                            [0,0,2,1,1,0],
                            [0,0,0,2,1,0],
                            [0,0,0,0,2,1],
                            [1,0,0,0,0,2] 
                        ],	
                            
                            //question 5 answer values
                        [	[2,1,1,0,0,0], 		
                            [0,2,1,1,0,0],		
                            [0,0,2,1,1,0],
                            [0,0,0,2,1,0],
                            [0,0,0,0,2,1],
                            [1,0,0,0,0,2] 
                        ],	
                            
                            //question 6 answer values
                        [	[2,1,1,0,0,0], 		
                            [0,2,1,1,0,0],		
                            [0,0,2,1,1,0],
                            [0,0,0,2,1,0],
                            [0,0,0,0,2,1],
                            [1,0,0,0,0,2] 
                        ],	
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
    var dict = {};
    dict[0] = "Kai";
    dict[1] = "Zane";
    dict[2] = "Jay";
    dict[3] = "Cole";
    dict[4] = "Nya";
    dict[5] = "Lloyd";
    printResult.innerHTML = dict[personality];
    switch (personality) {
        
        case 0:	//cute code
            results.style.display = "inline-block";
            results.classList.add("cute");
            body.background = "none";
            body.backgroundImage = "url('../images/quiz_images/kai.gif')";
            body.backgroundRepeat = "repeat";
            break;
            
        case 1:		//spooky
            results.style.display = "inline-block";
            results.classList.add("spooky");
            body.background = "none";
            body.backgroundImage = "url('../images/quiz_images/zane.gif')";
            body.backgroundRepeat = "repeat";
            break;
            
        case 2:		//lame
            results.style.display = "inline-block";
            results.classList.add("lame");
            body.background = "none";
            body.backgroundImage = "url('../images/quiz_images/jay.gif')";
            break;
            
        case 3:		//nerdy
            results.style.display = "inline-block";
            results.classList.add("nerdy");
            body.background = "none";
            body.backgroundImage = "url('../images/quiz_images/cole.gif')";
            body.backgroundSize = "100% auto";
            break;
            
        case 4:		//silly
            results.style.display = "inline-block";
            results.classList.add("silly");
            body.background = "none";
            body.backgroundImage = "url('../images/quiz_images/nya.gif')";
            body.backgroundRepeat = "repeat";
            break;
            
        case 5:		//cool
            results.style.display = "inline-block";
            results.classList.add("cool");
            body.background = "none";
            body.backgroundImage = "url('../images/quiz_images/lloyd.gif')";
            body.backgroundRepeat = "repeat";
            break;
            
        default: 
            document.getElementById("error").style.display = "inline-block";

    }
}