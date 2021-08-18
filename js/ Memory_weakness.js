var cards = [];
var startTime;
var timer;
var backTimer;
var flagFirst = true;
var cardFirst;
var countUnit = 0;


window.onload = function(){
    var arr = ['A', 'J', 'Q', 'K', 'A', 'J', 'Q', 'K'];
    for(var i = 2; i<11; i++){
        arr.push(i);
        arr.push(i);
    }

    shuffle(arr);

    var panel = document.getElementById('panel');

    for(i=0; i<26; i++){
        var div = document.createElement('div')
        div.className = 'card back';
        div.index = i;
        div.number = arr[i];
        div.innerHTML = '';
        div.onclick = turn;
        panel.appendChild(div);
        cards.push(div);
    }

    startTime = new Date();

    startTimer();
}


function shuffle(arr){
    var n = arr.length;
    var temp, i;

    while(n){
        i = Math.floor(Math.random()*n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function turn(e){
    var div = e.target;
    if(backTimer)return;

    if(div.innerHTML==''){
        div.className = 'card';
        div.innerHTML = div.number;
    }else{
        return;
    }

    if(flagFirst){
        cardFirst = div;
        flagFirst = false;
    }else{
        if(cardFirst.number == div.number){
            countUnit++;
            backTimer = setTimeout(function(){
                div.className = 'card finish';
                cardFirst.className = 'card finish';
                backTimer = NaN;

                if(countUnit == 10){
                    clearInterval(timer);
                }
            },500);
        }else{
            backTimer = setTimeout(function(){
                div.className = 'card back';
                div.innerHTML = '';
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
        flagFirst = true;
    }
}


function startTimer(){
    timer = setInterval(showSecond, 1000);
}

function showSecond(){
    var nowTime = new Date();
    var elapsedTime = Math.floor((nowTime - startTime)/1000);
    var str ='経過秒数：' + elapsedTime + '秒';

    var re = document.getElementById('result');
    re.innerHTML = str;
}