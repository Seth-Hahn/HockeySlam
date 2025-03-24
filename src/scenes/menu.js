class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load images
        this.load.image('rink', './assets/img/HockeySlamRink.png')


        //load sprites
        this.load.spritesheet('P1', './assets/img/P1_SpriteSheet.png' , {
            frameWidth: 120,
            frameHeight: 120
        })
    }

    create() {
        console.log('success')
        this.scene.start('playScene')
    }




    update() {

    }
}