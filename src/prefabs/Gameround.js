
//main class that handles building generation 
//each round is an extension of this class 
class Gameround extends Phaser.Scene {
    constructor(sceneTag, numberOfFloors, numberOfEnemies) {
        super(sceneTag)
        this.numfloors = numberOfFloors + 1
        this.numEnemies = numberOfEnemies
    }

    create() {
        //add background
        this.sky = this.add.tileSprite(0,0,720,860, 'sky').setOrigin(0,0)
        this.wall = this.add.sprite(0,game.config.height / this.numfloors, 'wall').setOrigin(0,0)
        //add UI
        this.UI = this.add.sprite(0,0,'UI').setOrigin(0,0)

        //load players at the top of the building
        this.P1 = new Player(this, 50, (game.config.height / this.numfloors) - 85, 'P1', //elements used by base class constructor
                            Phaser.Input.Keyboard.KeyCodes.A, //player specific controls
                            Phaser.Input.Keyboard.KeyCodes.D,
                            Phaser.Input.Keyboard.KeyCodes.W,
                            Phaser.Input.Keyboard.KeyCodes.S,
                            Phaser.Input.Keyboard.KeyCodes.SPACE,
                            'P1_Score', //get current score at the start of each round
                            'P1_SHOOT',
                            'P1_RUN',
                            'P1_RUNSHOOT',
                            'P1_CROUCH',
                            'P1_IDLE'

        )

        this.P2 = new Player(this, game.config.width - 50, (game.config.height / this.numfloors) - 85, 'P2',
                            Phaser.Input.Keyboard.KeyCodes.OPEN_BRACKET, //player specific controls
                            Phaser.Input.Keyboard.KeyCodes.BACK_SLASH,
                            Phaser.Input.Keyboard.KeyCodes.PLUS,
                            Phaser.Input.Keyboard.KeyCodes.CLOSED_BRACKET,
                            Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH,
                            'P2_Score',
                            'P2_SHOOT',
                            'P2_RUN',
                            'P2_RUNSHOOT',
                            'P2_CROUCH',
                            'P2_IDLE'
        )
        this.P2.setFlipX(true) //makes p2 face the right way on spawn

        this.playerList = [this.P1, this.P2]
        this.registry.set('playerList', this.playerList)

        //randomly spawn enemies among floors
        this.enemyList = []
        this.registry.set('enemyList', this.enemyList)
        this.createEnemies()
        //add floors and randomize hole positions
        this.makeFloors()
        

        this.physics.add.collider(this.enemyList, this.floors)
        //add exit
        this.makeExit()

        //add floor signs
        for(let i = 1; i < this.numfloors; i++) {
            this.createFloorSign(i)
        }

        //add player score to UI
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#fff600',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.P1ScoreUI = this.add.text(game.config.width / 3.3, game.config.height / 500, this.registry.get(this.P1.score), scoreConfig)
        this.P2ScoreUI = this.add.text(game.config.width / 1.09 , game.config.height / 500, this.registry.get(this.P2.score), scoreConfig)

        console.log(this.registry.get(this.P1.score))
    }

    update() {
        this.P1.update()
        this.P2.update()
        this.enemyList.forEach(enemy => {
            if(!enemy.isShot) {
                enemy.update()
                this.detectPlayer(enemy)
            }
        })

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
            let leftFloor = this.add.rectangle(0, floor_Yvalue, hole_Xvalue, game.config.width / 50, 0xc1a646).setOrigin(0,0)

            //add physics to left floor
            this.physics.add.existing(leftFloor)
            leftFloor.body.setSize(leftFloor.width, leftFloor.height, true)
            leftFloor.body.setImmovable(true)
            leftFloor.body.allowGravity = false
            this.floors.push(leftFloor)

            //right side of floor
            let rightFloor = this.add.rectangle(hole_Xvalue + hole_Width, floor_Yvalue, game.config.width - hole_Xvalue - hole_Width, game.config.width / 50, 0xc1a646).setOrigin(0,0)

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
            this.physics.add.collider(player, this.exit, (collidingPlayer) => {
                if(!this.registry.get('ExitReached')) {
                
                    let currentScore = this.registry.get(collidingPlayer.score)
                    this.registry.set(collidingPlayer.score, currentScore + 1) //add one to round winner's score
                    this.registry.set('ExitReached', true)
                }
            })
        })
    }

    createEnemies() {

        for(let i = 1; i <= this.numEnemies; i++){

            //randomly pick a floor to spawn on
            let spawnFloor = Phaser.Math.Between(2, this.numfloors)
            //randomize x coord
            let aiXCoord = Phaser.Math.Between(0, game.config.width)

            let enemy = new Enemy(this, aiXCoord, game.config.height / spawnFloor, 'AI', 'AI_SHOOT', 'AI_RUN', 'AI_RUNSHOOT')
            enemy.setDepth(10)
            this.enemyList.push(enemy)

        }
    }

    detectPlayer(enemy) {
        let hitPlayer = false
        this.playerList.forEach(player => {
            if(Phaser.Geom.Intersects.LineToRectangle(new Phaser.Geom.Line(enemy.vectorStart.x, enemy.vectorStart.y, enemy.vectorEnd.x, enemy.vectorEnd.y), player.getBounds())) {
                hitPlayer = true
            }
        })

        if(hitPlayer && enemy.bullet === null) {
            enemy.gunShot(enemy.body.x, enemy.body.y)
        }
    }

    createFloorSign(floorLevel) {
        let signHeight = (game.config.height / this.numfloors) * floorLevel
        let signHeightOffset = game.config.height / 25
        let signTextConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#Ff6600',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.add.text(game.config.width / 2, signHeight + signHeightOffset, this.numfloors - floorLevel + 'F', signTextConfig).setDepth(0)
    }

    endGame(winnerData) {
       this.scene.start('endScene', winnerData)
    }
}
