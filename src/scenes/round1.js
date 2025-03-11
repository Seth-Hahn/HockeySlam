class Round1 extends Gameround {
    constructor() {
        super("round1Scene", 3)
    }

    create() {
        console.log('Round 1 loaded')
        super.create()
        
    }  

    update() {
      super.update()
      if(this.registry.get('ExitReached')) {
        this.registry.set('ExitReached', false)
        this.scene.start('round2Scene')
    }  
    }
}
