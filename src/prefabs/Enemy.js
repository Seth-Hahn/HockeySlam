class Enemy extends Player {
    constructor(scene, x, y, texture,
                shootAnim, runAnim, runShootAnim) {
                    super(scene, x, y, texture)
                    this.shootAnim = shootAnim
                    this.runAnim = runAnim
                    this.runShootAnim = runShootAnim

                    this.direction = Phaser.Math.Between(0, 1) ? -1 : 1
                }
    
    update(){
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
    }

    directionSwitch() {
        let randInt = Phaser.Math.Between(0, 100)

        if(randInt === 100) { //successful direction switch check
            this.direction = -this.direction
        } 
    }
}