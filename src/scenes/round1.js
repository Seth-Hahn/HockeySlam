class Round1 extends Gameround {
    constructor() {
        super("round1Scene", 3)
    }

    create() {
        console.log('Round 1 loaded')
        super.create()
        this.scene.start('round2Scene')
        
    }  

    update() {
      super.update()  
    }
}
