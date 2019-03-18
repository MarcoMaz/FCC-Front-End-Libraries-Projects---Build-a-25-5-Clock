//General Variables
var countdownId,
    min = document.getElementById('minutes'),
    sec = document.getElementById('seconds'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    reset = document.getElementById('reset'),
    dots = document.getElementById('dots'),
    buttons = document.getElementById('buttons');

//Session Variables
var lessS = document.getElementById('sessionMinus'),
    moreS = document.getElementById('sessionPlus'),
    valS = document.getElementById('sessionValue');

//Break Variables
var lessB = document.getElementById('breakMinus'),
    moreB = document.getElementById('breakPlus'),
    valB = document.getElementById('breakValue');

//Styling Variables
var sessionBox = document.getElementById('session'),
    breakBox = document.getElementById('break'),
    containerBox = document.getElementById('container');

//Default Values Variables
var minDef = 25,
    seconds = '00',
    minDefBreak = 5,
    i = 0,
    audio = new Audio('http://soundbible.com/grab.php?id=1252&type=mp3');

//Basic Setup
min.innerHTML = minDef;
dots.innerHTML = ' : ';
sec.innerHTML = seconds;
valS.innerHTML = min.innerHTML;
valB.innerHTML = minDefBreak;

//Event Listener
moreS.addEventListener('click', function(){ 
  minDef++;
  valS.innerHTML++;
  if (minDef > 60){
    minDef = 60;
    valS.innerHTML = 60;
  }
  min.innerHTML = ('0' + minDef).slice(-2);
}, false);

lessS.addEventListener('click', function(){ 
  minDef--;
  valS.innerHTML--;
  if (minDef < 1){
    minDef = 1;
    valS.innerHTML = 1;
  }
  min.innerHTML = ('0' + minDef).slice(-2);
}, false);

moreB.addEventListener('click', function(){ 
  minDefBreak++;
  valB.innerHTML++;
  if (minDefBreak > 60){
    minDefBreak = 60;
    valB.innerHTML = 60;
  }
}, false);

lessB.addEventListener('click', function(){ 
  minDefBreak--;
  valB.innerHTML--;
  if (minDefBreak < 1){
    minDefBreak = 1;
    valB.innerHTML = 1;
  }  
}, false);

reset.addEventListener('click', function(){
  i = 0;
  clearInterval(countdownId);
  minDef = 25;
  min.innerHTML = minDef;
  minDefBreak = 5;
  sec.innerHTML = seconds;
  valS.innerHTML = min.innerHTML;
  valB.innerHTML = minDefBreak;
  containerBox.classList.remove('orangeStyle');
  containerBox.classList.remove('blueStyle');
  containerBox.classList.add('redStyle');
  reset.classList.add('resetHide');
  buttons.classList.remove('buttonsHide');
  reset.classList.remove('whiteBorder');
  reset.classList.remove('yellowBorder');
  toggle.removeEventListener('click', stopTimer, false);
  toggle.addEventListener('click', startTimer, false);
  toggle.classList.remove('whiteBorder');
  toggle.classList.add('yellowBorder');
}, false);

toggle.addEventListener('click', startTimer, false);

//Functions
function countdown(){
  countdownId = setInterval(function(){
    var total = (min.innerHTML + sec.innerHTML) * 1;
    if (sec.innerHTML == 0){
      sec.innerHTML = 60;
      min.innerHTML--;    
      min.innerHTML = ('0' + min.innerHTML).slice(-2);
      }
    sec.innerHTML--;
    sec.innerHTML = ('0' + sec.innerHTML).slice(-2);
    if (total <= 0){
      clearInterval(countdownId);
      if (i === 0){
        myBreak();
        } else if (i == 1){
          mySession();
          }
      }
    }, 1000);
  }

function myBreak(){
  min.innerHTML = ('0' + minDefBreak).slice(-2);
  sec.innerHTML = seconds;
  countdown();
  beep();
  i = 1;
  containerBox.classList.remove('orangeStyle');
  containerBox.classList.add('blueStyle');
  reset.classList.remove('resetHide');
  buttons.classList.add('buttonsHide');
  reset.classList.remove('yellowBorder');
  reset.classList.add('whiteBorder');
  toggle.classList.remove('yellowBorder');
  toggle.classList.add('whiteBorder');
}

function mySession(){
  min.innerHTML = ('0' + minDef).slice(-2);
  sec.innerHTML = seconds;
  countdown();
  i = 0;
  containerBox.classList.remove('blueStyle');
  containerBox.classList.add('orangeStyle');
  reset.classList.remove('resetHide');
  buttons.classList.add('buttonsHide');  
  reset.classList.remove('whiteBorder');
  reset.classList.add('yellowBorder');
  toggle.classList.remove('whiteBorder');
  toggle.classList.add('yellowBorder');
}

function startTimer(){
  toggle.removeEventListener('click', startTimer, false);
  toggle.addEventListener('click', stopTimer, false);
  countdown();  
  reset.classList.remove('resetHide');
  buttons.classList.add('buttonsHide');
  containerBox.classList.add('orangeStyle');
  reset.classList.add('yellowBorder');
}

function stopTimer(){
  clearInterval(countdownId);
  toggle.removeEventListener('click', stopTimer, false);
  toggle.addEventListener('click', startTimer, false);
  reset.classList.remove('resetHide');
  buttons.classList.add('buttonsHide');  
}

function beep(){
  audio.play();
}