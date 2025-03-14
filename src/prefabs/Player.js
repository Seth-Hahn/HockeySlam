class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, left, right, up, down, shoot, score, shootAnim) {
        super(scene, x , y , texture)
        
        this.scene = scene
        //add sprite to the scene
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //enable physics properties
        this.setCollideWorldBounds(true)

        //properly size hitboxes
        this.setSize(this.width * .2, this.height * .6)
        this.setOffset(this.width / 2.75)
        this.setGravityY(200)
        //define player keys
        this.KEYLEFT = scene.input.keyboard.addKey(left)
        this.KEYRIGHT = scene.input.keyboard.addKey(right)
        this.KEYJUMP = scene.input.keyboard.addKey(up)
        this.KEYCROUCH = scene.input.keyboard.addKey(down)
        this.KEYSHOOT = scene.input.keyboard.addKey(shoot)

        //hold current score for game
        this.score = score

        //set proper player for animations
        this.shootAnim = shootAnim

    }

    update() {
        //check for movement
        let playerAcceleration = 100
        let maxSpeed = 120

        if(this.KEYLEFT.isDown) { //moving left
            this.setAccelerationX(-playerAcceleration)
            this.setVelocityX(Math.max(this.body.velocity.x, -maxSpeed)) //stops player exceeding speed cap
            this.setFlipX(true)
        } else if(this.KEYRIGHT.isDown) { //moving right
            this.setAccelerationX(playerAcceleration)
            this.setVelocityX(Math.min(this.body.velocity.x, maxSpeed))
            this.setFlipX(false)
        } else { //slow down
            this.setAccelerationX(0)
            this.setDragX(400)
        }

        if(Phaser.Input.Keyboard.JustDown(this.KEYJUMP) //jump 
           && this.body.velocity.y === 0) {
            
            this.setVelocityY(-300)
            this.scene.sound.play('jump')
        }

        if(Phaser.Input.Keyboard.JustDown(this.KEYSHOOT)) { //shoot gun
            this.anims.play(this.shootAnim)
            this.scene.sound.play('shoot')
            this.scene.time.delayedCall(10, () => {
                this.gunShot(this.body.x, this.body.y)
            })

        }
    }

    gunShot(xCoord, yCoord){
        //create the paricle effect of the gun being shot
        this.emitter = this.scene.add.particles(xCoord + 50, yCoord + 30, 'particle', {
            speed: { min: -300, max: 300 },
            angle: {min: 0, max: 360 },
            scale: { start: 0.25, end: 0},
            lifespan: 30,
            quantity: 10,
            gravityY: 100,
            emitting: true,
        })


        //stop the particle effect and add the bullet
        this.scene.time.delayedCall(10, () => {
            this.emitter.emitting = false;
            this.bullet = this.scene.physics.add.sprite( xCoord + 50, yCoord + 30, 'bullet').setScale(.3)
            this.bulletTravel(this.bullet)
        })
    }

    bulletTravel(bullet){
        let direction = this.flipX ? -1 : 1
        bullet.setVelocityX( direction * 300);
    }
}  