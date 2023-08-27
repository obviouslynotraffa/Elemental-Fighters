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
    imageSrc : './assets/fighters/wind_fighter/full_PNG/idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 330,
        y: 167
    },
    sprites: {
        idle_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_PNG/Right/idle.png',
            framesMax: 8 
        },
        idle_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_PNG/Left/idle.png',
            framesMax: 8 
        },
        run_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_PNG/Right/run.png',
            framesMax: 8 
        },
        run_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_PNG/Left/run.png',
            framesMax: 8 
        },
        jump_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_PNG/Right/jump.png',
            framesMax: 3 
        },
        jump_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_PNG/Left/jump.png',
            framesMax: 3 
        },
        fall_dx: {
            imageSrc: './assets/fighters/wind_fighter/full_PNG/Right/fall.png',
            framesMax: 3 
        },
        fall_sx: {
            imageSrc: './assets/fighters/wind_fighter/full_PNG/Left/fall.png',
            framesMax: 3 
        }

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
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowUp:{
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
    //enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    
    //player movement
    if(keys.a.pressed && player.lastKey === 'a')
    {
        player.velocity.x = -5
        player.switchSprite('run_sx')
    }
    else if (keys.d.pressed && player.lastKey === 'd')
    {
        player.velocity.x = 5
        player.switchSprite('run_dx')
    } else {
        //to do: switch based on enemy postion
        player.switchSprite('idle_dx')
    }


    //jumping
    if(player.velocity.y < 0 && player.lastKey === "d")
    {
        player.switchSprite('jump_dx')
    } else if (player.velocity.y < 0 && player.lastKey === "a") {
        player.switchSprite('jump_sx')
    } else if(player.velocity.y > 0 && player.lastKey === "d"){
        player.switchSprite('fall_dx')
    } else if (player.velocity.y > 0 && player.lastKey === "a"){
        player.switchSprite('fall_sx')
    }



    //enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft')
    {
        enemy.velocity.x = -5
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight')
    {
        enemy.velocity.x = 5
    }


    //collision
    if(rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking){
        player.isAttacking = false 
        if(enemy.health>0)enemy.health -= 20   
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if(rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking){
        enemy.isAttacking = false    
        if(player.health>0)player.health -= 20   
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }


    //game over
    if (enemy.health <= 0 || player.health <= 0){
        determineWinner({player,enemy, timerID})
    }

}


animate()


//events
window.addEventListener('keydown', (event) => {
    switch (event.key) {

        //player
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
            player.attack()
            break

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
            enemy.velocity.y = -18
            break
        case 'ArrowDown':
            enemy.attack()
            break       
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

        case 'ArrowRight': 
            keys.ArrowRight.pressed=false
            break
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed=false
            break        
    }
    console.log(event.key)
})


