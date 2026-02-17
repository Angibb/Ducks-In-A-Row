console.log("js file working");
const welcomeMessage = document.getElementById("welcome-msg");
//pop up for on load page that prompts user for name and displays it in a welcome message on home page
document.addEventListener("DOMContentLoaded",() =>{
    const popupOverlay = document.getElementById("popup-overlay");
    const welcomePopup = document.getElementById("welcome-popup");
    const submitName = document.getElementById("submit-username");
    const userNameInput = document.getElementById("username");
    //clear input feild on pageload
    userNameInput.value ="";
    //display overlay and popup on page load
    popupOverlay.style.display = "block";
    welcomePopup.style.display = "block";

    submitName.addEventListener("click",() => {
     const userName = userNameInput.value.trim();    
        if(userName.length >= 1){
            popupOverlay.style.display = "none";
            welcomePopup.style.display = "none";
            console.log(userName);
            console.log(userName.length)
            welcomeMessage.textContent = "You got this " + userName + "!";
        }
        else{
            alert("Please enter a valid name")
            console.log("username input is not valid");
        }
    });
})


//Timer display and buttons variables
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const hoursInput = document.getElementById("sethrs");
const minInput = document.getElementById("setmins");
const secInput = document.getElementById("setsecs");

const setButton = document.getElementById("setbtn");
const startButton = document.getElementById("startbtn");
const resetButton = document.getElementById("resetbtn");
const alarmSound = document.getElementById("alarmSound");
alarmSound.loop = true;

let time = null;
let timer =null;
let countdown = null;


//function for set timer button that assigns input values to timer display and checks for valid input from user
function setTimer(){
    console.log("set timer button clicked");
    //if hours/mins/secs/ not valid value alert user
    if(hoursInput.value > 24 || minInput.value > 60 || secInput.value > 60 || 
        hoursInput.value < 0 || minInput.value < 0 || secInput.value < 0) {
        alert("Please Enter Valid Time");
        return;
        }
    //if hours value is empty assign vale of 00    
    if(hoursInput.value === ""){
        hoursInput.value ="00";
    }
    //if hours value is less than ten assign value as user input with leading 0
    else if(hoursInput.value < 10){
        hoursInput.value = "0" + hoursInput.value;
    }

    //minutes value
    if(minInput.value === ""){
        minInput.value ="00";
    }
    else if(minInput.value < 10){
        minInput.value = "0" + minInput.value;
    }

    //seconds value
    if(secInput.value === ""){
        secInput.value ="00";
    }
    else if(secInput.value < 10){
        secInput.value = "0" + secInput.value;
    }

    // assigns time elements input values
    hours.innerHTML = hoursInput.value;
    minutes.innerHTML = minInput.value;
    seconds.innerHTML =  secInput.value;

    //reset input fields to empty value after button is clicked
    hoursInput.value = "";
    minInput.value = "";
    secInput.value = "";

};

function startTimer() {
    console.log("start button clicked");
    //assigns variables of values of the corrosponding  time display element
    let hrs = hours.innerHTML;
    let mins = minutes.innerHTML;
    let secs = seconds.innerHTML;

    //checks for valid time set if all time elements are empty values alerts user
    if(hrs === "00" && mins === "00" && secs === "00"){
        alert("Enter a time value to start timer!")
        return;
    }
    //get the current time in milliseconds and add the input time (countdown time) converted into milliseconds
    time = new Date().getTime() + hrs * 60 * 60 * 1000 + mins * 60 * 1000 + secs * 1000;

    //timer variable set to value of a function that sets timer to countdown time set minus current time
    timer = setInterval(() => {
        //assigns current time to variable
        const currentTime = new Date().getTime();
        //countdown value is the time variable minus the current time 
        countdown = time - currentTime;
        //when remaining time is less than 1000 milliseconds(less than one second) clear the timer display
        if(countdown < 1000){
            clearInterval(timer);
        }

        //flash red in final 10 seconds
        const display = document.querySelector(".timerdisplay");
        let timeLeft = Math.floor((time - Date.now()) / 1000);
        if(timeLeft < 11 && timeLeft > 0){
            display.classList.toggle("flash");
        }
        else{
            display.classList.remove("flash");
        }

        //alarm sound when time is up
        if(timeLeft === 0){
            alarmSound.play();
            alert("TIME IS UP! Click okay to stop alarm.");
            alarmSound.pause();
            resetTimer();
        }

        //
        hrs = Math.floor((countdown % (1000*60*60*24))/(1000*60*60))
        mins = Math.floor((countdown % (1000*60*60))/(1000*60))
        secs = Math.floor((countdown % (1000*60))/(1000))

        //ensures proper display of numbers if less than two digits adds leading zero
        if(hrs <10){
            hrs = "0" + hrs;
        }

        if(mins <10){
            mins = "0" + mins;
        }

        if(secs <10){
            secs = "0" + secs;
        }
        console.log(hrs + mins + secs)

        //sets values of time display elements
        hours.innerHTML = hrs;
        minutes.innerHTML = mins;
        seconds.innerHTML = secs;


    },1000)//set control to 1000 milliseconds
};


function resetTimer(){
    console.log("TIMER HAS BEEN RESET");
    //clears timer display 
    clearInterval(timer);

    //resets values of time display elements to 00
    hours.innerHTML = "00";
    minutes.innerHTML = "00";
    seconds.innerHTML = "00";
    countdown = 0;
};

//calls function when button is clicked
setButton.addEventListener("click", setTimer);
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

/*PAGE CUSTOMIZATIONS*/

//change container color
const submitColor = document.getElementById("submitcolor");
function customColor() {
    const colorSelection = document.getElementById("colorchoice").value;
    const container = document.querySelector(".container");
    container.style.backgroundColor = colorSelection;
}
submitColor.addEventListener("click",customColor);


//change background 
const selector = document.getElementById("selection");
function changeBackground() {
    const imageSelection = selector.value;
    const background = document.getElementById("background");
    background.style.backgroundImage = "url(\""+imageSelection+"\")";
}
selector.addEventListener("change",changeBackground);








