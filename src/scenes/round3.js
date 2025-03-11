class Round3 extends Gameround {
    constructor() {
        super("round3Scene", 6)
    }

    create() {
        console.log('Round 3 loaded')
        super.create()
        
    }  

    update() {
        super.update()

        //once exit is reached in 3rd round the game is over
        if(this.registry.get('ExitReached')) {
            this.registry.set('ExitReached', false)
            this.scene.start('menuScene')
        }
    }
}