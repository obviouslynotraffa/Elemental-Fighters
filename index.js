const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillRect(0,0, canvas.width, canvas.height);


//global
const gravity = 0.7

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
    }

    
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
        y: 165
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
    }
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
    
    //player movement
    if(keys.a.pressed)
    {
  
        if(player.position.x >=10){
            player.velocity.x = -5
            
            if(keys.s.pressed && player.velocity.y === 0)
            {

                player.isRolling = true

                if(fighterOnTheRight({fighter1: player, fighter2: enemy}))
                    player.switchSprite('roll_dx')
                else    
                    player.switchSprite('roll_sx')
            } 
            else player.switchSprite('run_sx')
        }
        
    }
    else if (keys.d.pressed)
    {
        if(player.position.x + player.width <=canvas.width-10){
            player.velocity.x = 5
            
            if(keys.s.pressed && player.velocity.y === 0){

                player.isRolling = true

                if(fighterOnTheRight({fighter1: player, fighter2: enemy}))
                    player.switchSprite('roll_dx')
                else    
                    player.switchSprite('roll_sx')
            }
            else player.switchSprite('run_dx')
        }
        
    } else if(keys.s.pressed){

        if(fighterOnTheRight({fighter1: player, fighter2: enemy}))
            player.switchSprite('defend_dx')
        else
            player.switchSprite('defend_sx')

    } else {

        if(fighterOnTheRight({fighter1: player, fighter2: enemy}))
            player.switchSprite('idle_dx')
        else
            player.switchSprite('idle_sx')
    }


    //jumping
    if(player.velocity.y < 0 && player.lastKey === "a"){
        player.switchSprite('jump_sx')
    } else if (player.velocity.y < 0 && player.lastKey === "d") {
        player.switchSprite('jump_dx')
    } else if (player.velocity.y < 0) {
        player.switchSprite('jump_dx')
    }

    //falling
    if(player.velocity.y > 0 && player.lastKey === "a"){
        player.switchSprite('fall_sx')
    } else if (player.velocity.y > 0 && player.lastKey === "d") {
        player.switchSprite('fall_dx')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall_dx')
    }



    //swap attackBox
    if(!fighterOnTheRight({
        fighter1: player,
        fighter2: enemy
    })){
        player.invertAttackBox()
    } else{
        player.resetAttackBox()
    }

    if(fighterOnTheRight({
        fighter1: enemy,
        fighter2: player
    })){
        enemy.resetAttackBox()
    } else{
        enemy.invertAttackBox()
    }


    //enemy movement
    if(keys.ArrowRight.pressed)
    {
        if(enemy.position.x + enemy.width <=canvas.width-10){
            enemy.velocity.x = 5
            
            if(keys.ArrowDown.pressed && enemy.velocity.y === 0)
            {
                enemy.isRolling = true

                if(fighterOnTheRight({fighter1: enemy, fighter2: player}))
                    enemy.switchSprite('roll_dx')
                else    
                    enemy.switchSprite('roll_sx')
            }
            else enemy.switchSprite('run_dx')
        }
    }
    else if (keys.ArrowLeft.pressed)
    {
        if(enemy.position.x >= 10){
            enemy.velocity.x = -5
            
            if(keys.ArrowDown.pressed && enemy.velocity.y === 0){

                enemy.isRolling = true

                if(fighterOnTheRight({fighter1: enemy, fighter2: player}))
                    enemy.switchSprite('roll_dx')
                else    
                    enemy.switchSprite('roll_sx')
            }
            else enemy.switchSprite('run_sx')
        }
        
    } else if(keys.ArrowDown.pressed){
        
        if(fighterOnTheRight({fighter1: enemy, fighter2: player}))
            enemy.switchSprite('defend_dx')
        else    
            enemy.switchSprite('defend_sx')
    
    } else {

        if(fighterOnTheRight({fighter1: enemy, fighter2: player}))
            enemy.switchSprite('idle_dx')
        else    
            enemy.switchSprite('idle_sx')
       
    }

    //jumping
    if(enemy.velocity.y < 0 && enemy.lastKey === "ArrowLeft"){
        enemy.switchSprite('jump_sx')
    } else if (enemy.velocity.y < 0 && enemy.lastKey === "ArrowRight") {
        enemy.switchSprite('jump_dx')
    } else if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump_sx')
    }

    //falling
    if(enemy.velocity.y > 0 && enemy.lastKey === "ArrowLeft"){
        enemy.switchSprite('fall_sx')
    } else if (enemy.velocity.y > 0 && enemy.lastKey === "ArrowRight") {
        enemy.switchSprite('fall_dx')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall_sx')
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

            if(!fighterOnTheRight({
                fighter1: player,
                fighter2: enemy
            })){
                
                if(keys.ArrowDown.pressed)
                    enemy.health -= player.attack/5
                else    
                    enemy.health -= player.attack

                enemy.takeDamageRight()
            }
            else{
                
                if(keys.ArrowDown.pressed)
                    enemy.health -= player.attack/5
                else    
                    enemy.health -= player.attack
                
                enemy.takeDamageLeft()
            }

            
        }
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }


    //enemy attack
    if(rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking && enemy.framesCurrent == 2){
        enemy.isAttacking = false    
        if(player.health>0){
            
            if(!fighterOnTheRight({
                fighter1: enemy,
                fighter2: player
            })){
                if(keys.s.pressed)
                    player.health -= enemy.attack/5
                else    
                    player.health -= enemy.attack

                player.takeDamageRight()
            }
            else{
                if(keys.s.pressed)
                    player.health -= enemy.attack/5
                else    
                    player.health -= enemy.attack

                player.takeDamageLeft()
            }
        }
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }


    if(player.isAttacking && player.framesCurrent === 2){
        player.isAttacking = false
    }

    if(enemy.isAttacking && enemy.framesCurrent === 2){
        enemy.isAttacking = false
    }

    if(player.isRolling && player.framesCurrent === 4){
        player.isRolling = false
    }

    if(enemy.isRolling && enemy.framesCurrent === 4){
        enemy.isRolling = false
    }
        
    //game over
    if (enemy.health <= 0 || player.health <= 0){
        determineWinner({player,enemy, timerID})
    }

}


animate()


//events
window.addEventListener('keydown', (event) => {

    //player
    if(!player.dead)
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
            if(player.velocity.y === 0)
                player.velocity.y = -18
            break

        case ' ':
            if(!player.isRolling){
                if(fighterOnTheRight({fighter1: player, fighter2: enemy}))
                    player.attack_right()
                else    
                    player.attack_left()
            }
            break

        case 's': 
            keys.s.pressed=true;
            break
    }


    if(!enemy.dead){
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
            if(enemy.velocity.y === 0)
                enemy.velocity.y = -18
            break

        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            break  

        case '0':
            if(!enemy.isRolling){
                if(fighterOnTheRight({fighter1: enemy, fighter2: player}))
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


