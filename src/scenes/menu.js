class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {

        //load images and sprites
        this.load.image('sky', './assets/img/Xtreme_Xcape_Background.png')

    }

    create() {
        
        console.log('menu scene loaded')
        this.scene.start('round1Scene')
    }




    update() {

    }
}