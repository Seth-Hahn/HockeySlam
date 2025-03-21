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
        this.background = this.add.sprite(0,0, 'endScreen').setOrigin(0,0)
        this.winTextDisplay = this.add.text(game.config.height / 2, game.config.width / 2, this.winText, this.endTextConfig)
    }
    
}