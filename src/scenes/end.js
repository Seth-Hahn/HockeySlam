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
        //display winner on end screen
        this.winningPlayer = this.add.sprite(game.config.width / 1.1 , game.config.height / 1.3, this.winner, 0).setDepth(999).setScale(2,2)
        
        this.sound.play('explosion')
        //add background and win text
        this.background = this.add.sprite(0,0, 'endScreen').setOrigin(0,0)
        this.winTextDisplay = this.add.text(game.config.width / 2, game.config.height / 5, this.winText, this.endTextConfig)
        
        //building explosion
        this.emitter = this.add.particles(game.config.width / 2.6 , game.config.height / 1.3 , 'particle', {
            speed: { min: -300, max: 300 },
            angle: {min: 0, max: 360 },
            scale: { start: 0.25, end: 0},
            lifespan: 300,
            quantity: 100,
            gravityY: 100,
            emitting: true,
        }).setScale(5,5)

        //navigation buttons
        this.menuButton = this.add.text(game.config.width / 20, game.config.height / 3.5 , 'MENU', this.endTextConfig)
        this.restartButton = this.add.text(game.config.width / 20, game.config.height / 3, 'RESTART', this.endTextConfig)

        this.menuButton.setInteractive()
        this.restartButton.setInteractive()

        this.menuButton.on('pointerdown', () => {
            this.scene.start('menuScene')
        })

        this.restartButton.on('pointerdown', () => {
        //reinitialize values which are initialized in menu
            //initialize each players score
            this.registry.set('P1_Score', 0)
            this.registry.set('P2_Score', 0)
            //initialize bool which allows one scene 
            //to switch to the next after player reaches exit
            this.registry.set('ExitReached', false)
            this.scene.start('round1Scene')
        })

    }
    
}