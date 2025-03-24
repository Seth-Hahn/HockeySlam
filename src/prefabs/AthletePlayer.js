class AthletePlayer extends Athlete {
    constructor(scene, x, y, texture, controlScheme) {
        super(scene, x, y, texture)

        this.setControls(scene, controlScheme)
    }

    update() {
        let playerAcceleration = 100
        let maxSpeed = 200
        this.checkMovement(playerAcceleration, maxSpeed)
    }

    checkMovement(acceleration, maxSpeed) {
        if(this.KEYLEFT.isDown) { //move left
            this.setAccelerationX(-acceleration)
            this.setVelocityX(Math.max(this.body.velocity.x, -maxSpeed))
        } else if (this.KEYRIGHT.isDown) { //move right
            this.setAccelerationX(acceleration)
            this.setVelocityX(Math.min(this.body.velocity.x, maxSpeed))

        } else {
            this.setAccelerationX(0)
            this.setDrag(200)
        }
    }

    setControls(scene, controlScheme) {
        this.KEYLEFT = scene.input.keyboard.addKey(controlScheme.left)
        this.KEYRIGHT = scene.input.keyboard.addKey(controlScheme.right)
        this.KEYUP = scene.input.keyboard.addKey(controlScheme.up)
        this.KEYDOWN = scene.input.keyboard.addKey(controlScheme.down)
        this.KEYSHOOT = scene.input.keyboard.addKey(controlScheme.shoot)
    }
}