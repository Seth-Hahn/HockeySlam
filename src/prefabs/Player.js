class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, left, right, up, down, shoot) {
        super(scene, x , y , texture)

        //add sprite to the scene
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //enable physics properties
        this.setCollideWorldBounds(true)
        //this.setGravity(true)

        //define player keys
        this.KEYLEFT = scene.input.keyboard.addKey(left)
        this.KEYRIGHT = scene.input.keyboard.addKey(right)
        this.KEYJUMP = scene.input.keyboard.addKey(up)
        this.KEYCROUCH = scene.input.keyboard.addKey(down)
        this.KEYSHOOT = scene.input.keyboard.addKey(shoot)
    }

    update() {
        //check for movement
        let playerAcceleration = 100
        if(this.KEYLEFT.isDown) {
            this.setAccelerationX(-playerAcceleration)
        } else if(this.KEYRIGHT.isDown) {
            this.setAccelerationX(playerAcceleration)
        } else {
            this.setAccelerationX(0)
        }
    }
}  