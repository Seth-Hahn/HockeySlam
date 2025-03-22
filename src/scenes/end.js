class End extends Phaser.Scene {
    constructor() {
        super("endScene")
    }

    init(data) {
        this.endTextConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#Ff6600',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.winner = data.winner
        this.winText = data.winText
    }
    create() {
        this.winningPlayer = this.add.sprite(game.config.width / 1.1 , game.config.height / 1.3, this.winner, 0).setDepth(999).setScale(2,2)
        this.background = this.add.sprite(0,0, 'endScreen').setOrigin(0,0)
        this.winTextDisplay = this.add.text(game.config.width / 2, game.config.height / 5, this.winText, this.endTextConfig)
        this.emitter = this.add.particles(game.config.width / 2.6 , game.config.height / 1.3 , 'particle', {
            speed: { min: -300, max: 300 },
            angle: {min: 0, max: 360 },
            scale: { start: 0.25, end: 0},
            lifespan: 300,
            quantity: 100,
            gravityY: 100,
            emitting: true,
        }).setScale(5,5)

        this.menuButton = this.add.text(game.config.width / 20, game.config.height / 3.5 , 'MENU', this.endTextConfig)
        this.restartButton = this.add.text(game.config.width / 20, game.config.height / 3, 'RESTART', this.endTextConfig)
    }
    
}