class Round2 extends Gameround {
    constructor() {
        super("round2Scene",2, 6, 5)
    }

    create() {   
        super.create()       
    }  

    update() {
        super.update()
        if(this.registry.get('ExitReached')) {
            this.registry.set('ExitReached', false)
            
            //determine if someone won at the end of the round
            let p1Score = this.registry.get('P1_Score')
            let p2Score = this.registry.get('P2_Score')
            if(p1Score >= 2) {
                this.endGame({winner: 'P1', winText: "Player 1 Wins"})
            } else if (p2Score >= 2) {
                this.endGame({winner: 'P2', winText: "Player 2 Wins"})
            } else {
                this.scene.start('round3Scene')
            }
        }
    }
}