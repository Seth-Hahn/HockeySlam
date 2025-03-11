
//main class that handles building generation 
//each round is an extension of this class 
class Gameround extends Phaser.Scene {
    constructor(sceneTag, numberOfFloors) {
        super(sceneTag)
        this.numfloors = numberOfFloors + 1
    }

    create() {
        //add background
        this.sky = this.add.tileSprite(0,0,720,860, 'sky').setOrigin(0,0)
        
        //load players at the top of the building
        this.P1 = new Player(this, 50, (game.config.height / this.numfloors) - 85, 'P1', //elements used by base class constructor
                            Phaser.Input.Keyboard.KeyCodes.A, //player specific controls
                            Phaser.Input.Keyboard.KeyCodes.D,
                            Phaser.Input.Keyboard.KeyCodes.W,
                            Phaser.Input.Keyboard.KeyCodes.S,
                            Phaser.Input.Keyboard.KeyCodes.SPACE,
                            this.registry.get('P1_Score'), //get current score at the start of each round
                            'P1_SHOOT'

        )
        this.P2 = new Player(this, game.config.width - 50, (game.config.height / this.numfloors) - 85, 'P2',
                            Phaser.Input.Keyboard.KeyCodes.OPEN_BRACKET, //player specific controls
                            Phaser.Input.Keyboard.KeyCodes.BACK_SLASH,
                            Phaser.Input.Keyboard.KeyCodes.PLUS,
                            Phaser.Input.Keyboard.KeyCodes.CLOSED_BRACKET,
                            Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH,
                            this.registry.get('P2_Score'),
                            'P2_SHOOT'
        )
        this.P2.setFlipX(true) //makes p2 face the right way on spawn
        
        this.playerList = [this.P1, this.P2]

        //add floors and randomize hole positions
        this.makeFloors()

        //add exit
        this.makeExit()

    }

    update() {
        this.P1.update()
        this.P2.update()
    }


    makeFloors() {
        
        let hole_Width = 75 //holes in floor allow players to get closer to bottom of building
        this.floors = [] //holds the floors for collision checking

        for(let i = 1; i < this.numfloors; i++) {
            
            let floor_Yvalue = (game.config.height / this.numfloors) * i //evenly distribute floors

            //the hole which the players drop through should be randomly positioned
            //the first floor's hole should be in the middle so no player has a starting advantage
            let hole_Xvalue = (i === 1) ? ( game.config.width / 2) - (hole_Width / 2): Phaser.Math.Between(25, game.config.width - hole_Width)

            //left side of floor
            let leftFloor = this.add.rectangle(0, floor_Yvalue, hole_Xvalue, game.config.width / 50, 0x000000).setOrigin(0,0)

            //add physics to left floor
            this.physics.add.existing(leftFloor)
            leftFloor.body.setSize(leftFloor.width, leftFloor.height, true)
            leftFloor.body.setImmovable(true)
            leftFloor.body.allowGravity = false
            this.floors.push(leftFloor)

            //right side of floor
            let rightFloor = this.add.rectangle(hole_Xvalue + hole_Width, floor_Yvalue, game.config.width - hole_Xvalue - hole_Width, game.config.width / 50, 0x000000).setOrigin(0,0)

            //add physics to floor
            this.physics.add.existing(rightFloor)
            rightFloor.body.setSize(rightFloor.width, rightFloor.height, true)
            rightFloor.body.setImmovable(true)
            rightFloor.body.allowGravity = false
            this.floors.push(rightFloor)

        }

        //create collisions between players and floors
        this.floors.forEach(floor => {
            this.physics.add.collider(this.P1, floor)
            this.physics.add.collider(this.P2, floor)
        })
    }

    makeExit() {
        //randomize where the door spawns on bottom floor
        let exit_randomX = Phaser.Math.Between(50, game.config.width -50)
        this.exit = this.physics.add.sprite( exit_randomX, game.config.height / 1.05, 'exit')
        
        //resize hitbox to seperate from sprite
        this.exit.setSize(this.exit.width / 1.75, this.exit.height / 1.6)  

        //add collision between player and door for both players
        this.playerList.forEach(player => {
            this.physics.add.collider(player, this.exit, () => {

                this.registry.set('P1_Score', player.score + 1) //add one to round winner's score
                this.registry.set('ExitReached', true)
            })
        })
    }
}
