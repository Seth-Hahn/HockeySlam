class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {

        //load images and sprites
        this.load.image('sky', './assets/img/Xtreme_Xcape_Background.png')
        this.load.image('exit', './assets/img/Exit_Door.png')
        this.load.image('UI', './assets/img/Xtreme_Xcape_UI.png')
        this.load.image('wall', './assets/img/Xtreme_Xcape_Wall.png')
        this.load.image('endScreen', './assets/img/Xtreme_Xcape_EndScreen.png')
        this.load.image('titlescreen', './assets/img/Xtreme_Xcape_TitleScreen.png')
        this.load.image('controls', './assets/img/Xtreme_Xcape_Controls.png')

        this.load.spritesheet('P1', './assets/img/P1_SpriteSheet.png', {
            frameWidth:120,
            frameHeight:120,
        })
        this.load.spritesheet('P2', './assets/img/P2_SpriteSheet.png', {
            frameWidth:120,
            frameHeight:120,
        })

        this.load.spritesheet('AI', './assets/img/AI_SpriteSheet.png', {
            frameWidth: 120,
            frameHeight: 120
        })

        this.load.image('particle', './assets/img/Shoot_Particle.png')
        this.load.image('bullet', './assets/img/Shoot_Bullet.png')

        //load sounds
        this.load.audio('shoot', './assets/mp3/shoot.mp3')
        this.load.audio('jump', './assets/mp3/jump.mp3')
        this.load.audio('enemyShoot', './assets/mp3/enemyShoot.mp3')
        this.load.audio('explosion', './assets/mp3/explosion.mp3')
    

    }

    create() {
        //initialize each players score
        this.registry.set('P1_Score', 0)
        this.registry.set('P2_Score', 0)

        //initialize bool which allows one scene 
        //to switch to the next after player reaches exit
        this.registry.set('ExitReached', false)

        //create player animations
        this.anims.create( {
            key: 'P1_IDLE',
            frames: [{ key: 'P1', frame: 0}],
            repeat: 0
        })

        this.anims.create( {
            key: 'P2_IDLE',
            frames: [{ key: 'P2', frame: 0}],
            repeat: 0
        })

        this.anims.create( {
            key: 'P1_SHOOT',
            frames: this.anims.generateFrameNumbers('P1', {start: 16, end: 21}),
            frameRate: 24,
            repeat: 0
        })
        
        this.anims.create( {
            key: 'P2_SHOOT',
            frames: this.anims.generateFrameNumbers('P2', {start: 16, end: 21}),
            frameRate: 24,
            repeat: 0
        })
        
        this.anims.create( {
            key: 'AI_SHOOT',
            frames: this.anims.generateFrameNumbers('AI', {start: 16, end: 21}),
            frameRate: 24,
            repeat: 0
        })
        this.anims.create( {
            key: 'P1_RUN',
            frames: this.anims.generateFrameNumbers('P1', {start: 1, end: 5}),
            frameRate: 24,
            repeat: 0
        })
        
        this.anims.create( {
            key: 'P2_RUN',
            frames: this.anims.generateFrameNumbers('P2', {start: 1, end: 5}),
            frameRate: 24,
            repeat: 0
        })

        this.anims.create( {
            key: 'AI_RUN',
            frames: this.anims.generateFrameNumbers('AI', {start: 1, end: 5}),
            frameRate: 24,
            repeat: 0
        })

        this.anims.create( {
            key: 'P1_RUNSHOOT',
            frames: this.anims.generateFrameNumbers('P1', {start: 32, end: 38}),
            frameRate: 24,
            repeat: 0
        })

        this.anims.create( {
            key: 'P2_RUNSHOOT',
            frames: this.anims.generateFrameNumbers('P2', {start: 32, end: 38}),
            frameRate: 24,
            repeat: 0
        })

        this.anims.create( {
            key: 'AI_RUNSHOOT',
            frames: this.anims.generateFrameNumbers('AI', {start: 32, end: 38}),
            frameRate: 24,
            repeat: 0
        })

        this.anims.create( {
            key: 'P1_CROUCH',
            frames: [{ key: 'P1', frame: 48}],
            repeat: 0
        })

        this.anims.create( {
            key: 'P2_CROUCH',
            frames: [{ key: 'P2', frame: 48}],
            repeat: 0
        })

        //show title screen
        this.titlescreen = this.add.sprite(0,0,'titlescreen').setOrigin(0,0)

        //title screen button config
        let buttonTextConfig = {
            fontFamily: 'Phosphate',
            fontSize: '55px',
            backgroundColor: '#00ff3c',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
            },
        }
        this.playButton = this.add.text(game.config.width / 1.22, game.config.height / 2.5, 'Play', buttonTextConfig).setInteractive()
        this.controls = this.add.text(game.config.width / 1.6, game.config.height / 1.9, 'Controls', buttonTextConfig).setInteractive()
        this.credits = this.add.text(game.config.width / 1.4, game.config.height / 1.08, 'Credits', buttonTextConfig).setInteractive()
       
        this.playButton.on('pointerdown', () => {
            this.scene.start('round1Scene')
        })

        this.controls.on('pointerdown', () => {
            this.controlPage = this.add.sprite(0,0,'controls').setOrigin(0,0)
            this.backToMenu = this.add.text(game.config.width / 30, game.config.height / 1.15, 'menu', buttonTextConfig)
            this.backToMenu.setInteractive()
            this.backToMenu.on('pointerdown', () => {
                this.controlPage.setVisible(false)
                this.backToMenu.setVisible(false)
            })
        })

        let creditTextConfig = {
            fontFamily: 'courier',
            fontSize: '20px',
            backgroundColor: '#00ff3c',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
            },
        }
        let showCredit = true
        this.credits.on('pointerdown', () => {
            if(showCredit) {
                this.creditText = this.add.text(game.config.width / 5, game.config.height / 1.3,
                'Art - Seth Hahn \n' +
                'Sound Effects - Seth Hahn \n' +
                'Programming - Seth Hahn \n' + 
                'Original Idea - J.G. Quintel and Regular Show'
                , creditTextConfig)
                showCredit = false
            } else {
                this.creditText.setVisible(false)
                showCredit = true
            }
        })
    }




    update() {

    }
}