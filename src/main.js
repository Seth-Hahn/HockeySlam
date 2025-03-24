// Name : Seth Hahn
// Title: Hockey Slam


let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 750,
    scene: [Menu, Play],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        }
    }
}

let game = new Phaser.Game(config)
