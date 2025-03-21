class Enemy extends Player {
    constructor(scene, x, y, texture,
                shootAnim, runAnim, runShootAnim) {
                    super(scene, x, y, texture)
                    this.shootAnim = shootAnim
                    this.runAnim = runAnim
                    this.runShootAnim = runShootAnim

                    this.direction = Phaser.Math.Between(0, 1) ? -1 : 1
                    
                    //vector variables for player detection
                    this.vectorDirecion = new Phaser.Math.Vector2(this.direction, 0)
                    this.vectorStart = new Phaser.Math.Vector2(x, y)
                    this.vectorEnd = this.vectorStart.clone().add(this.vectorDirecion.scale(100))

                    this.isAI = true
                    this.isShot = false

                }
    
    update(){
        //destroy any offscreen bullets
        if( this.bullet != null &&
            (this.bullet.x < 0 || 
             this.bullet.x > game.config.width) ) {
                this.bullet.destroy()
                this.bullet = null
             }
        if(this && this.body //Ai must exist and must not have been shot
            && !this.isShot) {
        
            let AiAcceleration = 300
            let maxSpeed = 100
            
            this.directionSwitch() //enemy has a 5% chance to turn around each update call
            if(this.direction < 0){
                this.setFlipX(true)
            } else {
                this.setFlipX(false)
            }
            this.setAccelerationX(AiAcceleration * this.direction)
            this.setVelocityX(Phaser.Math.Clamp(this.body.velocity.x,  -maxSpeed, maxSpeed)) //stops player exceeding speed cap
            this.anims.play(this.runAnim, true)

            //detection vector for when AI should shoot at player
            this.vectorDirecion = new Phaser.Math.Vector2(this.direction, 0)
            this.vectorStart = new Phaser.Math.Vector2(this.body.x, this.body.y)
            this.vectorEnd = this.vectorStart.clone().add(this.vectorDirecion.scale(1000))

        } else {
            if(this.bullet != null) {
                this.bullet.destroy()
            }
        }
    }

    directionSwitch() {
        if(this && this.body) { 
            let randInt = Phaser.Math.Between(0, 50)

            if(randInt === 50) { //successful direction switch check
                this.direction = -this.direction
            } 
        }
    }


}