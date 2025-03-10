
//main class that handles building generation 
//each round is an extension of this class 
class Gameround extends Phaser.Scene {
    constructor(sceneTag, numberOfFloors) {
        super(sceneTag)
        this.numfloors = numberOfFloors + 1
    }

    create() {
        this.sky = this.add.tileSprite(0,0,720,860, 'sky').setOrigin(0,0)
        
        //add floors (currently temp asset which will be replaced with building hallway)
        this.makeFloors()

        //load players at the top of the building
        this.P1 = this.physics.add.sprite(50, (game.config.height / this.numfloors) - 45, 'P1', 0)
        this.P2 = this.physics.add.sprite(game.config.width - 50, (game.config.height / this.numfloors) - 45, 'P2', 0)
    }

    makeFloors() {
        
        let hole_Width = 75 //holes in floor allow players to get closer to bottom of building

        for(let i = 1; i < this.numfloors; i++) {
            
            let floor_Yvalue = (game.config.height / this.numfloors) * i //evenly distribute floors

            //the hole which the players drop through should be randomly positioned
            //the first floor's hole should be in the middle so no player has a starting advantage
            let hole_Xvalue = (i === 1) ? ( game.config.width / 2) - (hole_Width / 2): Phaser.Math.Between(25, game.config.width - hole_Width)

            //left side of floor
            let leftFloor = this.add.rectangle(0, floor_Yvalue, hole_Xvalue, game.config.width / 50, 0x000000).setOrigin(0,0)
            
            //add physics to left floor
            this.physics.add.existing(leftFloor)
            leftFloor.body.setImmovable(true)
            leftFloor.body.allowGravity = false

            //right side of floor
            let rightFloor = this.add.rectangle(hole_Xvalue + hole_Width, floor_Yvalue, game.config.width - hole_Xvalue - hole_Width, game.config.width / 50, 0x000000).setOrigin(0,0)
            
            //add physics to floor
            this.physics.add.existing(rightFloor)
            rightFloor.body.setImmovable(true)
            rightFloor.body.allowGravity = false

        }
    }
}
