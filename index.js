const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillRect(0,0, canvas.width, canvas.height);


//global
const gravity = 0.7
let playerIsOnTheLeft = true

const background = new Sprite({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: './assets/background/background.png'
})

//creating characters
const player = new Fighter({
    position: {
        x: canvas.width/4,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: {
        x: 0,
        y: 0
    },
    imageSrc : './assets/fighters/wind_fighter/full_png/Right/idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 330,
        y: 167
    },
    attack: 20,
    sprites: {
        idle_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/idle.png',
            framesMax: 8 
        },
        idle_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/idle.png',
            framesMax: 8 
        },
        run_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/run.png',
            framesMax: 8 
        },
        run_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/run.png',
            framesMax: 8 
        },
        jump_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/jump.png',
            framesMax: 3 
        },
        jump_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/jump.png',
            framesMax: 3 
        },
        fall_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/fall.png',
            framesMax: 3 
        },
        fall_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/fall.png',
            framesMax: 3 
        },
        attack_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/attack.png',
            framesMax: 8 
        },
        attack_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/attack.png',
            framesMax: 8 
        },
        air_attack_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/air_attack.png',
            framesMax: 7 
        },
        air_attack_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/air_attack.png',
            framesMax: 7 
        },
        roll_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/roll.png',
            framesMax: 6
        },
        roll_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/roll.png',
            framesMax: 6
        },
        defend_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/defend.png',
            framesMax: 8
        },
        defend_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/defend.png',
            framesMax: 8
        },
        take_hit_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/take_hit.png',
            framesMax: 6
        },
        take_hit_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/take_hit.png',
            framesMax: 6
        },
        death_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Right/death.png',
            framesMax: 19
        },
        death_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_png/Left/death.png',
            framesMax: 19
        }

    },
    attackBox: {
        offset: {
            x: 65,
            y: 50
        },
        width: 60,
        height: 50
    },
    startLoopFrame: 1,
    endLoopFrame: 4

    
})



const enemy = new Fighter({
    position: {
        x: canvas.width*3/4,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    attack: 20,
    imageSrc : './assets/fighters/ground_fighter/full_png/Left/idle.png',
    framesMax: 6,
    scale: 2.6,
    offset: {
        x: 350,
        y: 160
    },
    sprites: {
        idle_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/idle.png',
            framesMax: 6 
        },
        idle_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/idle.png',
            framesMax: 6 
        },
        run_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/run.png',
            framesMax: 8 
        },
        run_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/run.png',
            framesMax: 8 
        },
        jump_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/jump.png',
            framesMax: 3 
        },
        jump_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/jump.png',
            framesMax: 3 
        },
        fall_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/fall.png',
            framesMax: 3 
        },
        fall_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/fall.png',
            framesMax: 3 
        },
        attack_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/attack.png',
            framesMax: 6 
        },
        attack_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/attack.png',
            framesMax: 6 
        },
        air_attack_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/air_attack.png',
            framesMax: 7 
        },
        air_attack_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/air_attack.png',
            framesMax: 7 
        },
        roll_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/roll.png',
            framesMax: 6
        },
        roll_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/roll.png',
            framesMax: 6
        },
        defend_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/defend.png',
            framesMax: 13
        },
        defend_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/defend.png',
            framesMax: 13
        },
        take_hit_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/take_hit.png',
            framesMax: 6
        },
        take_hit_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/take_hit.png',
            framesMax: 6
        },
        death_dx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Right/death.png',
            framesMax: 18
        },
        death_sx: {
            imageSrc: './assets/fighters/ground_fighter/full_png/Left/death.png',
            framesMax: 18
        }

    },
    attackBox: {
        offset: {
            x:50,
            y:50
        },
        width: 65 ,
        height: 50
    },
    startLoopFrame: 3,
    endLoopFrame: 9
})


//keys
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed:false
    },
    s: {
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    },
    ArrowDown: {
        pressed:false
    }
    
}


decreseTimer()


function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0


    //check sprite facing
    if(player.position.x < enemy.position.x){
        playerIsOnTheLeft = true
    }
    else playerIsOnTheLeft = false
    


    //player movement
    if(keys.a.pressed && (player.canMove() || player.isFalling()))
    {
        //go left
        if(player.checkLeftBorder())
        {
            player.velocity.x = -5
            player.switchSprite('run_sx')
        }
    }
    else if (keys.d.pressed && (player.canMove() || player.isFalling())){

        //go right
        if(player.checkRightBorder())
        {
            player.velocity.x = 5
            player.switchSprite('run_dx')
        }
        
    } else if(keys.s.pressed && player.isOnTheGround() && !player.isRolling){

        player.isParrying = true

        if(playerIsOnTheLeft)
            player.switchSprite('defend_dx')
        else
            player.switchSprite('defend_sx')

    } else {

        if(playerIsOnTheLeft)
            player.switchSprite('idle_dx')
        else
            player.switchSprite('idle_sx')
    }


    //jumping
    if(player.isJumping())
    {
        if(player.lastKey === "a")
            player.switchSprite('jump_sx')
        else
            player.switchSprite('jump_dx')
    }

    //falling
    if(player.isFalling())
    {
        if(player.lastKey === "a"){
            player.switchSprite('fall_sx')
        }
        else{
            player.switchSprite('fall_dx')
        }
    }

    //rolling
    
    if(player.isRolling){

        if(player.lastKey === "d"){
            if(player.checkRightBorder())
                player.velocity.x = 10
        }
        
        if(player.lastKey === "a"){
            if(player.checkLeftBorder())
                player.velocity.x = -10
        }   
    }

    //enemy movement
    if(keys.ArrowRight.pressed && (enemy.canMove() || enemy.isFalling() ))
    {
        //go right
        if(enemy.checkRightBorder())
        {
            enemy.velocity.x = 5
            enemy.switchSprite('run_dx')
        }
    }
    else if (keys.ArrowLeft.pressed && (enemy.canMove() || enemy.isFalling() ))
    {
        if(enemy.checkLeftBorder()){
            enemy.velocity.x = -5
            enemy.switchSprite('run_sx')
        }
        
    } else if(keys.ArrowDown.pressed && enemy.isOnTheGround() && !enemy.isRolling){

        enemy.isParrying = true
        
        if(!playerIsOnTheLeft)
            enemy.switchSprite('defend_dx')
        else    
            enemy.switchSprite('defend_sx')
    
    } else {

        if(!playerIsOnTheLeft)
            enemy.switchSprite('idle_dx')
        else    
            enemy.switchSprite('idle_sx')
    }

    //jumping
    if(enemy.isJumping())
    {
        if(enemy.lastKey === "ArrowLeft")
            enemy.switchSprite('jump_sx')
        else
            enemy.switchSprite('jump_dx')
    }

    //falling
    if(enemy.isFalling())
    {
        if(enemy.lastKey === "ArrowLeft"){
            enemy.switchSprite('fall_sx')
        }
        else{
            enemy.switchSprite('fall_dx')
        }
    }

    //rolling
    if(enemy.isRolling){
        if(enemy.lastKey === "ArrowRight"){
            if(enemy.checkRightBorder())
                enemy.velocity.x = 8
        }
        else{
            if(enemy.checkLeftBorder())
                enemy.velocity.x = -8
        }   
    }



    //player attack
    if(rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking && player.framesCurrent === 2
        ){
        player.isAttacking = false 
        if(enemy.health>0){

            enemy.gotHit = true

            if(!playerIsOnTheLeft)
            {   
                if(enemy.isParrying)
                    enemy.health -= player.attack/5
                else    
                    enemy.health -= player.attack

                enemy.takeDamageRight()
            }
            else{
                
                if(enemy.isParrying)
                    enemy.health -= player.attack/5
                else    
                    enemy.health -= player.attack
                
                enemy.takeDamageLeft()
            }

            
        }
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        }) 
    }


    //enemy attack
    if(rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking && enemy.framesCurrent == 2){
        enemy.isAttacking = false    
        if(player.health>0){

            player.gotHit = true

            if(playerIsOnTheLeft)
            {
                if(player.isParrying)
                    player.health -= enemy.attack/5
                else    
                    player.health -= enemy.attack

                player.takeDamageRight()
            }
            else{
                if(player.isParrying)
                    player.health -= enemy.attack/5
                else    
                    player.health -= enemy.attack

                player.takeDamageLeft()
            }
        }

        gsap.to('#playerHealth', {
            width: player.health + '%'
        }) 
    }


    //move attackBox based on facing
    if(playerIsOnTheLeft){
        player.resetAttackBox()
        enemy.invertAttackBox()
    }
    else{
        enemy.resetAttackBox()
        player.invertAttackBox()
    }


    if(player.isAttacking && player.framesCurrent === 2){
        player.isAttacking = false
    }

    if(enemy.isAttacking && enemy.framesCurrent === 2){
        enemy.isAttacking = false
    }

    if(player.gotHit && player.framesCurrent === 4){
        player.gotHit = false
    }

    if(enemy.gotHit && enemy.framesCurrent === 4){
        enemy.gotHit = false
    }

    if(!keys.s.pressed)
        player.isParrying = false

    if(!keys.ArrowDown.pressed)
        enemy.isParrying = false

    if(player.isRolling && player.framesCurrent === 5)
        player.isRolling = false

    if(enemy.isRolling && enemy.framesCurrent === 5)
        enemy.isRolling = false

    
    //game over
    if (enemy.health <= 0 || player.health <= 0){
        determineWinner({player,enemy, timerID})
    }

    if(enemy.health <= 0){
        enemy.deathAnimation = true
    }

    if(player.health <= 0){
        player.deathAnimation = true
    }

}


animate()


//events
window.addEventListener('keydown', (event) => {

    let timeIsUp = timerRunOut()

    //player
    if(!player.deathAnimation && !player.isRolling && !timeIsUp){
        switch (event.key) {

            case 'd': 
                keys.d.pressed=true
                player.lastKey = 'd'
                break

            case 'a': 
                keys.a.pressed=true;
                player.lastKey = 'a'
                break

            case 'w':
                keys.w.pressed=true;
                if(player.isOnTheGround() && player.canMove())
                    player.velocity.y = -18
                break

            case ' ':
                if(player.canAttack())
                {
                    if(playerIsOnTheLeft)
                        player.attack_right()
                    else    
                        player.attack_left()
                }
                break

            case 's': 
                keys.s.pressed=true;
                break
        }
    }
    

    if(!enemy.deathAnimation && !enemy.isRolling && !timeIsUp){
        switch(event.key) {
            
            //enemy
            case 'ArrowRight': 
                keys.ArrowRight.pressed=true
                enemy.lastKey = 'ArrowRight'
                break

            case 'ArrowLeft': 
                keys.ArrowLeft.pressed=true;
                enemy.lastKey = 'ArrowLeft'
                break

            case 'ArrowUp':
                keys.ArrowUp.pressed=true;
                if(enemy.isOnTheGround() && enemy.canMove())
                    enemy.velocity.y = -18
                break

            case 'ArrowDown':
                keys.ArrowDown.pressed = true
                break  

            case '0':
                if(enemy.canAttack())
                {
                    if(!playerIsOnTheLeft)
                        enemy.attack_right()
                    else                
                        enemy.attack_left()
                }
                break
        }
    }
    
    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {

        case 'd': 
            keys.d.pressed=false
            break

        case 'a': 
            keys.a.pressed=false
            break

        case 's': 
            keys.s.pressed=false
            break

        case 'ArrowRight': 
            keys.ArrowRight.pressed=false
            break

        case 'ArrowLeft': 
            keys.ArrowLeft.pressed=false
            break 
            
        case 'ArrowDown': 
            keys.ArrowDown.pressed=false
            break 
    }
    console.log(event.key)
})


//double tap for rolling/dashing
let ispressedPlayer
let lastPressedPlayer
let isDoublePressPlayer

let ispressedEnemy
let lastPressedEnemy
let isDoublePressEnemy

let enemyCanRoll = true
let playerCanRoll = true

    
const timeOutPlayer = () => setTimeout(() => isDoublePressPlayer = false, 300)
const timeOutEnemy = () => setTimeout(() => isDoublePressEnemy = false, 300)

const timeRollPlayer = () => setTimeout(() => playerCanRoll = true, 1000)
const timeRollEnemy = () => setTimeout(() => enemyCanRoll = true, 1000)

const keyPress = key => {
    ispressedPlayer = key.keyCode
    ispressedEnemy = key.keyCode

    //player double touch detection
    if((ispressedPlayer === 68 || ispressedPlayer === 65) && player.canMove() && playerCanRoll){
        if (isDoublePressPlayer && ispressedPlayer === player.lastPressedPlayer) {

            isDoublePressPlayer = false
            playerCanRoll = false
    
            if(player.isOnTheGround()){
                player.isRolling = true
    
                if(player.lastPressedPlayer === 68){
                    player.switchSprite('roll_dx')
                }  
                else if(player.lastPressedPlayer === 65){
                    player.switchSprite('roll_sx')
                }         
            }
            timeRollPlayer()
            
            
        } else {
            isDoublePressPlayer = true
            timeOutPlayer()
        }
    
        player.lastPressedPlayer = ispressedPlayer
    }

    //player double touch detection
    if((ispressedEnemy === 37 || ispressedEnemy === 39) && enemy.canMove() && enemyCanRoll){
        if (isDoublePressEnemy && ispressedEnemy === enemy.lastPressedEnemy) {

            isDoublePressEnemy = false;
            enemyCanRoll = false;
    
            if(enemy.isOnTheGround()){
                enemy.isRolling = true
    
                if(enemy.lastPressedEnemy === 39){
                    enemy.switchSprite('roll_dx')
                }  
                else if(enemy.lastPressedEnemy === 37){
                    enemy.switchSprite('roll_sx')
                }         
            }
            timeRollEnemy()
            
        } else {
            isDoublePressEnemy = true;
            timeOutEnemy();
        }
    
        enemy.lastPressedEnemy = ispressedEnemy;
    }

}

window.onkeyup = key => keyPress(key)