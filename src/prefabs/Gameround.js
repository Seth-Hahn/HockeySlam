
//main class that handles building generation 
//each round is an extension of this class 
class Gameround extends Phaser.Scene {
    constructor(sceneTag, numberOfFloors) {
        super(sceneTag)
        this.numfloors = numberOfFloors
    }

    create() {
        this.sky = this.add.tileSprite(0,0,640,860, 'sky').setOrigin(0,0)

        //add floors (currently temp asset which will be replaced with building hallway)
        for(let i = 0; i < this.numfloors; i++){

        }
    }
}
