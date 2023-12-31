
class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0, 
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        )
    }


    animateFrames(){
        this.framesElapsed++

        if(this.framesElapsed % this.framesHold === 0){
            
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            } else{
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
    
        this.animateFrames()

    }
}



class Fighter extends Sprite {
    constructor({
        position, 
        velocity, 
        color, 
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = {x:0, y:0}, 
        sprites, 
        attackBox = { offset: {}, width: undefined, height: undefined},
        attack,
        startLoopFrame,
        endLoopFrame
    }) {

        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity 
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x ,
                y: this.position.y
            } ,
            offset: attackBox.offset,
            width: attackBox.width ,
            height: attackBox.height 
        }
        this.color = color
        this.isAttacking
        this.health= 100

        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 7

        this.sprites = sprites

        this.ATboxChanged = false
        this.attack = attack
        this.isRolling = false
        this.gotHit = false
        this.dead = false
        this.deathAnimation = false
        this.attackAnimationElapsed = true
        this.isParrying = false

        this.startLoopFrame = startLoopFrame
        this.endLoopFrame = endLoopFrame

        for(const sprite in this.sprites ){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        
    }

    animateFrames(){
        this.framesElapsed++

        if(!this.isParrying){
            if(this.framesElapsed % this.framesHold === 0){
            
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            } else{
                this.framesCurrent = 0
            }
            }
        }
        else{
            
            if(this.framesElapsed % this.framesHold === 0){
            
                if(this.framesCurrent < this.framesMax - this.endLoopFrame ){
                    this.framesCurrent++
                } else{
                    this.framesCurrent = this.startLoopFrame
                }
            }
        }

    }


    invertAttackBox(){
        if(!this.ATboxChanged){
            this.attackBox.offset.x = -(this.attackBox.width + this.attackBox.offset.x) + this.width
            this.ATboxChanged = true
        }
        
    }

    resetAttackBox(){
        
        this.attackBox.offset.x = this.width - 1
        this.ATboxChanged = false

    }

    takeDamageLeft(){
        
        if(this.health <= 0){
            this.switchSprite('death_sx')
            this.deathAnimation = true
        }
            

        if(!this.isParrying)
            this.switchSprite('take_hit_sx')
    }

    takeDamageRight(){
        
        if(this.health <= 0){
            this.switchSprite('death_dx')
            this.deathAnimation = true
        }
            

        if(!this.isParrying)
            this.switchSprite('take_hit_dx')
    }

      

    attack_right(){

        this.isAttacking = true  
        this.attackAnimationElapsed = false

        if(this.velocity.y === 0)
            this.switchSprite('attack_dx')

        if(this.velocity.y < 0)
            this.switchSprite('air_attack_dx')

        
    }

    attack_left(){

        this.isAttacking = true   
        this.attackAnimationElapsed = false

        if(this.velocity.y === 0)
            this.switchSprite('attack_sx')

        if(this.velocity.y < 0)
            this.switchSprite('air_attack_sx')

        
    }


    isMidAir(){
        return this.velocity.y != 0
    }

    isJumping(){
        return this.velocity.y < 0
    }

    isFalling(){ 
        return this.velocity.y > 0
    }

    isOnTheGround(){
        return this.velocity.y === 0
    }

    canAttack(){
        return !this.isRolling
            && this.attackAnimationElapsed
            && !this.gotHit
            && !this.isFalling()
            && !this.isParrying
    }

    canMove(){
        return !this.gotHit
            && this.attackAnimationElapsed
            && !this.deathAnimation
    }

    checkLeftBorder(){
        return this.position.x >= 10
    }

    checkRightBorder(){
        return this.position.x + this.width <= canvas.width-10
    }

    canParry(){
        return this.isOnTheGround
            && !this.isRolling
            && !this.isAttacking
    }


    update() {
        this.draw()

        if(!this.dead)
            this.animateFrames()
        
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        //hitbox and attackbox
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height )
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x


        if(this.position.y + this.height + this.velocity.y >= 525 ){
            this.velocity.y = 0
            this.position.y = 375.69
        } else {
            this.velocity.y += gravity
        }

    }


    switchSprite(sprite){

        if(this.image === this.sprites.death_dx.image){
            if (this.framesCurrent === this.sprites.death_dx.framesMax -1)
                this.dead = true
            return
        }

        if(this.image === this.sprites.death_sx.image){
            if (this.framesCurrent === this.sprites.death_sx.framesMax -1)
                this.dead = true
            return
        }

        if(this.image === this.sprites.attack_dx.image
            && this.framesCurrent  < this.sprites.attack_dx.framesMax -1) return

        if(this.image === this.sprites.attack_sx.image
            && this.framesCurrent  < this.sprites.attack_sx.framesMax -1) return  
            
        if(this.image === this.sprites.air_attack_dx.image
            && this.framesCurrent  < this.sprites.air_attack_dx.framesMax -1) return
    
        if(this.image === this.sprites.air_attack_sx.image
            && this.framesCurrent  < this.sprites.air_attack_sx.framesMax -1) return  
                
        if(this.image === this.sprites.roll_dx.image
            && this.framesCurrent  < this.sprites.roll_dx.framesMax -1) return 

        if(this.image === this.sprites.roll_sx.image
            && this.framesCurrent  < this.sprites.roll_sx.framesMax -1) return

        if(this.image === this.sprites.take_hit_dx.image
            && this.framesCurrent  < this.sprites.take_hit_dx.framesMax -1) return    

        if(this.image === this.sprites.take_hit_sx.image
            && this.framesCurrent  < this.sprites.take_hit_sx.framesMax -1) return

        switch(sprite){

            case "idle_dx": 
                if(this.image !== this.sprites.idle_dx.image){
                    this.image = this.sprites.idle_dx.image
                    this.framesMax = this.sprites.idle_dx.framesMax
                    this.framesCurrent = 0
                    this.attackAnimationElapsed = true
                    this.isRolling = false
                }
                break


            case "idle_sx": 
                if(this.image !== this.sprites.idle_sx.image){
                    this.image = this.sprites.idle_sx.image
                    this.framesMax = this.sprites.idle_sx.framesMax
                    this.framesCurrent = 0
                    this.attackAnimationElapsed = true
                    this.isRolling = false
                }
                break


            case "run_dx":
                if(this.image !== this.sprites.run_dx.image){
                    this.image = this.sprites.run_dx.image
                    this.framesMax = this.sprites.run_dx.framesMax
                    this.framesCurrent = 0
                    this.isRolling = false
                }
                break


            case "run_sx":
                if(this.image !== this.sprites.run_sx.image){
                    this.image = this.sprites.run_sx.image
                    this.framesMax = this.sprites.run_sx.framesMax
                    this.framesCurrent = 0
                    this.isRolling = false
                }
                break


            case "jump_dx":
                if(this.image !== this.sprites.jump_dx.image){
                    this.image = this.sprites.jump_dx.image
                    this.framesMax = this.sprites.jump_dx.framesMax
                    this.framesCurrent = 0
                }
                break
            
                
            case "jump_sx":
                if(this.image !== this.sprites.jump_sx.image){
                    this.image = this.sprites.jump_sx.image
                    this.framesMax = this.sprites.jump_sx.framesMax
                    this.framesCurrent = 0
                }
                break    


            case "fall_dx":
                if(this.image !== this.sprites.fall_dx.image){
                    this.image = this.sprites.fall_dx.image
                    this.framesMax = this.sprites.fall_dx.framesMax
                    this.framesCurrent = 0
                }
                break    


             case "fall_sx":
                if(this.image !== this.sprites.fall_sx.image){
                    this.image = this.sprites.fall_sx.image
                    this.framesMax = this.sprites.fall_sx.framesMax
                    this.framesCurrent = 0
                }
                break   



            case "attack_dx":
                if(this.image !== this.sprites.attack_dx.image){
                    this.image = this.sprites.attack_dx.image
                    this.framesMax = this.sprites.attack_dx.framesMax
                    this.framesCurrent = 0
                }
                break 



            case "attack_sx":
                if(this.image !== this.sprites.attack_sx.image){
                    this.image = this.sprites.attack_sx.image
                    this.framesMax = this.sprites.attack_sx.framesMax
                    this.framesCurrent = 0
                }
                break 


            case "air_attack_dx":
                if(this.image !== this.sprites.air_attack_dx.image){
                    this.image = this.sprites.air_attack_dx.image
                    this.framesMax = this.sprites.air_attack_dx.framesMax
                    this.framesCurrent = 0
                    this.attackAnimationElapsed = true
                }
                break 

            case "air_attack_sx":
                if(this.image !== this.sprites.air_attack_sx.image){
                    this.image = this.sprites.air_attack_sx.image
                    this.framesMax = this.sprites.air_attack_sx.framesMax
                    this.framesCurrent = 0
                    this.attackAnimationElapsed = true
                }
                break 


            case "roll_dx":
                if(this.image !== this.sprites.roll_dx.image){
                    this.image = this.sprites.roll_dx.image
                    this.framesMax = this.sprites.roll_dx.framesMax
                    this.framesCurrent = 0
                }
                break 

            case "roll_sx":
                if(this.image !== this.sprites.roll_sx.image){
                    this.image = this.sprites.roll_sx.image
                    this.framesMax = this.sprites.roll_sx.framesMax
                    this.framesCurrent = 0
                }
                break 

            case "defend_dx":
                if(this.image !== this.sprites.defend_dx.image){
                    this.image = this.sprites.defend_dx.image
                    this.framesMax = this.sprites.defend_dx.framesMax
                    this.framesCurrent = 0
                }
                break

            case "defend_sx":
                if(this.image !== this.sprites.defend_sx.image){
                    this.image = this.sprites.defend_sx.image
                    this.framesMax = this.sprites.defend_sx.framesMax
                    this.framesCurrent = 0
                }
                break

            case "take_hit_dx":
                if(this.image !== this.sprites.take_hit_dx.image){
                    this.image = this.sprites.take_hit_dx.image
                    this.framesMax = this.sprites.take_hit_dx.framesMax
                    this.framesCurrent = 0
                }
                break

            case "take_hit_sx":
                if(this.image !== this.sprites.take_hit_sx.image){
                    this.image = this.sprites.take_hit_sx.image
                    this.framesMax = this.sprites.take_hit_sx.framesMax
                    this.framesCurrent = 0
                }
                break

            case "death_dx":
                if(this.image !== this.sprites.death_dx.image){
                    this.image = this.sprites.death_dx.image
                    this.framesMax = this.sprites.death_dx.framesMax
                    this.framesCurrent = 0
                }
                break


            case "death_sx":
                if(this.image !== this.sprites.death_sx.image){
                    this.image = this.sprites.death_sx.image
                    this.framesMax = this.sprites.death_sx.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }

    

}