// There are 3 steps in this game , the first is when you press any key then the game start and in the 2nd step , one button will flash and the level increases and in 3rd step all the button blinking sequence is recorded by the eventlistners on the buttons and then the user starts enter its own pattern and then it will check that if the recorded sequence and the sequence enter by user is same or not , if it is same the game will continue else you will loose the game 
let gamesequence = [];  // they are the user and game sequence , intially empty 
let usersequence = [];   // we will won the game if they both are equal and go to the next level
let btns = ["yellow","red","purple","green"];    // this array have all 4 buttons of the game
let started = false;    // it tell us is the game started , intially it is false means the game is not started yet .
let level = 0 ;  // initially the level of the game is 0 since the game is not started yet 
// when you press any key on the document then the game will start .

let h2 = document.querySelector("h2");
document.addEventListener("keypress",function(){   
    if(started == false){  // if the game is not started then start the game 
        console.log("Game is started");
        started = true;   // set the value true since we only want to start our game only one time 
        levelup();
    }
});
function gameflash(btn){     // flashing the button which is randomly clicked by the code
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 500);
}
function userflash(btn){     // flashing the button which is clicked by the user 
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}
function levelup(){ // it increases the level of the game and also update it in our h2 heading
    // when the level increases , reset the user sequence so that user has to enter all the sequence reversely in the same order as present in the game sequence  , for level 2 user has to enter 2 buttons and same goes for level 3 and so on , user have to memorize the sequcence . 
    usersequence = []; 

    level++;           // increasing the level 
    h2.innerText = `Level ${level}`;   // updating the h2 heading to show the level

    let randidx = Math.floor(Math.random() *3);   // picking the random number from 0 to 3 so that we can randomly get any button index
    let randcolor = btns[randidx];   // getting random color form btns array
    let randbtn = document.querySelector(`.${randcolor}`); // choosing the button of random color from the given 4 buttons
    gamesequence.push(randcolor); // adding the random generated color to our game sequence
    console.log(gamesequence);
    gameflash(randbtn);  // flash the button when the level increses 
}

function checkAns(idx){   // checking the answer
     // if we are at the last index , increase the level of the game , but if we are at the middle then continue to check until we have not reach the last index
    if(usersequence[idx] === gamesequence[idx]){  
        // if the length is equal it means i have checked all the sequence and upto the last sequence so , the level will increse and a new color will generated by the code 
        if(usersequence.length == gamesequence.length){   
            setTimeout(levelup(),1000);
        }
    }
    else{    // when you entered the wrong sequence

        // display the score and saying that the game is now over 
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        // when the game overs , set the background screen color to red for about 1/4 sec and then again the background color is white 
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){   
            document.querySelector("body").style.backgroundColor = "white";
        },250)
        
        reset();  // reseting the game 
    }
}

function btnpress(){
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");  // getting the id of the button which is clicked by the user 
    usersequence.push(userColor);  // storing the user clicked button color in user sequence

    checkAns(usersequence.length - 1);  // the index of the last clicked color
}
let allbtns = document.querySelectorAll(".btn");   // selecting all buttons
for(btn of allbtns){
    btn.addEventListener("click",btnpress);    // when a button will click , the btnpress function will apply
}

// when the user entered the wrong sequecne then we have to reset the game by using the reset function
function reset(){    
    started = false;
    gamesequence = [];
    usersequence = [];
    level = 0 ;
}