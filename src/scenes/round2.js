class Round2 extends Gameround {
    constructor() {
        super("round2Scene", 6)
    }

    create() {
        console.log('Round 2 loaded')
        super.create()
        
    }  

    update() {
        super.update()
        if(this.registry.get('ExitReached')) {
            this.registry.set('ExitReached', false)
            this.scene.start('round3Scene')
        }
    }
}