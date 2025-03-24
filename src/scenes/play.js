class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        
        this.loadRink() //load hockey rink background and create associated variables
        //load in dummy player
        this.player = this.add.rectangle(300, 400, 25, 80, 0x000000)
        this.keyLeft = this.input.keyboard.addKey('A')
        this.keyRight = this.input.keyboard.addKey('D')

        //load game camera
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, this.rinkWidth, this.rinkHeight);
        this.physics.world.setBounds(0, 0, this.rinkWidth, this.rinkHeight);
    }

    update() {
        if(this.keyLeft.isDown) {
            this.player.x -= 3
        }

        if(this.keyRight.isDown) {
            this.player.x += 3
        }
    }

    loadRink() {
        //load hockey rink
        this.rink = this.add.image(0,0,'rink').setOrigin(0,0)
        this.rinkWidth = 1500
        this.rinkHeight = 750
    }
}