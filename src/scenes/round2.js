class Round2 extends Gameround {
    constructor() {
        super("round2Scene", 5)
    }

    create() {
        console.log('Round 2 loaded')
        super.create()
        this.scene.start('round3Scene')
        
    }  

    update() {
        super.update()
    }
}