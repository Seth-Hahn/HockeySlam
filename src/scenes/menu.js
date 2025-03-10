class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {

        //load images and sprites
        this.load.image('sky', './assets/img/Xtreme_Xcape_Background.png')
        this.load.spritesheet('P1', './assets/img/P1_SpriteSheet.png', {
            frameWidth:90,
            frameHeight:90,
        })
        this.load.spritesheet('P2', './assets/img/P2_SpriteSheet.png', {
            frameWidth:90,
            frameHeight:90,
        })

    }

    create() {
        
        console.log('menu scene loaded')
        this.scene.start('round1Scene')
    }




    update() {

    }
}