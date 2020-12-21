
document.addEventListener('DOMContentLoaded', () => {

    var gridSize=6;
    var timeForAppearing=800;

    var currentScore=0;
    var canPlay=true;
    var timeToPlay=60;

    var ouchAudio = document.getElementById("hitAudio"); 
    var popOutAudio=document.getElementById('popOut');
    

    let elem = document.createElement("img");
    elem.src = 'hamster.jpg';
    elem.addEventListener('click', HamsterClicked)

    var grid= document.getElementById('grid') 
    grid.style.maxWidth='500px';

    var score=document.getElementById('_score')

    //create the GRIDs will turn it into a function LATer
    for(var i=0; i<gridSize*gridSize;i++){
        var innerGrid=document.createElement('div')
        innerGrid.classList.add('hamster')
        innerGrid.tagName='innerGrid'
        //innerGrid.setAttribute('tag', 'innerHamster')
        // innerGrid.addEventListener('click', HamsterClicked)
        grid.appendChild(innerGrid)
    }

    var currentHamsterBox=document.getElementsByClassName('hamster');

    function HamsterAppearing(){
        var randomNum=Math.floor(Math.random()*currentHamsterBox.length)

        currentHamsterBox[randomNum].appendChild(elem)

        popOutAudio.play();
    }

    function HamsterPlayGame(){
        if(canPlay){
            HamsterAppearing();

            if(canPlay){
                this.setTimeout(() => {
                    HamsterPlayGame();
                }, timeForAppearing);
            }
        }
    }

    function HamsterClicked(){
        ouchAudio.play();
        currentScore++;
        elem.parentNode.removeChild(elem);
        score.innerText='Current Score: '+currentScore;
    }

    function PlayGame(){

        HamsterPlayGame()

        this.setTimeout(() => {
            canPlay=false
            showEndGameScreen()
            score.innerText="."
        }, timeToPlay*1000);
    }

    PlayGame();

    function showEndGameScreen(){
        elem.parentNode.removeChild(elem);
        let  finalScoreDisplay=document.createElement('div')

        finalScoreDisplay.classList.add('finalScore')

        finalScoreDisplay.innerText = 'TIMES UP! Your Final Score is: '+ currentScore;

        document.body.appendChild(finalScoreDisplay)
    }
})