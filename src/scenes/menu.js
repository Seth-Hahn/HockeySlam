class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load images and sprites
        this.load.image('rink', './assets/img/HockeySlamRink.png')
    }

    create() {
        console.log('success')
        this.scene.start('playScene')
    }




    update() {

    }
}