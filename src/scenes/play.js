class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        
        this.loadRink() //load hockey rink background and create associated variables
        //load in dummy player
        let p1ControlScheme = {
            left: 'A',
            right: 'D',
            up: 'W',
            down: 'S',
            shoot: 'SPACE',
        }
        this.p1 = new AthletePlayer(this, 400, 300, 'P1', p1ControlScheme).setCollideWorldBounds(true)
        
        //load game camera
        this.cameras.main.startFollow(this.p1)
        this.cameras.main.setBounds(0, 0, this.rinkWidth, this.rinkHeight);
        this.physics.world.setBounds(0, 0, this.rinkWidth, this.rinkHeight);
    }

    update() {
        this.p1.update()
    }

    loadRink() {
        //load hockey rink
        this.rink = this.add.image(0,0,'rink').setOrigin(0,0)
        this.rinkWidth = 1500
        this.rinkHeight = 750
    }


}