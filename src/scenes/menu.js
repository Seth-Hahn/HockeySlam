class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {

        //load images and sprites
        this.load.image('sky', './assets/img/Xtreme_Xcape_Background.png')
        this.load.image('exit', './assets/img/Exit_Door.png')
        this.load.spritesheet('P1', './assets/img/P1_SpriteSheet.png', {
            frameWidth:120,
            frameHeight:120,
        })
        this.load.spritesheet('P2', './assets/img/P2_SpriteSheet.png', {
            frameWidth:120,
            frameHeight:120,
        })

    

    }

    create() {
        //initialize each players score
        this.registry.set('P1_Score', 0)
        this.registry.set('P2_Score', 0)

        //initialize bool which allows one scene 
        //to switch to the next after player reaches exit
        this.registry.set('ExitReached', false)

        console.log('menu scene loaded')
        this.scene.start('round1Scene')
    }




    update() {

    }
}