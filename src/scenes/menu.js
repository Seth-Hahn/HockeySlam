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

        //load next scene
        console.log('menu scene loaded')
        this.scene.start('round1Scene')
    }




    update() {

    }
}