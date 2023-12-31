

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
    
}


function determineWinner({player,enemy, timerID}) {
    clearTimeout(timerID)
    document.querySelector('#displayText').style.display = 'flex'
    if(player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie' 
        } else if (player.health > enemy.health){
            document.querySelector('#displayText').innerHTML = 'Player 1 wins'      
        } else if (player.health < enemy.health){
            document.querySelector('#displayText').innerHTML = 'Player 2 wins'
        }

}

let timer = 90
let timerID

function decreseTimer() {
    
    if(timer>0) {
        timerID = setTimeout(decreseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    } 

    if(timer === 0) {
        
        determineWinner({player,enemy, timerID})
    }

}


function fighterOnTheRight({fighter1, fighter2}){
    return fighter1.position.x < fighter2.position.x
}

function timerRunOut(){
    if(timer === 0)
        return true

    return false
}