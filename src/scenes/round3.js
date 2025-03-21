class Round3 extends Gameround {
    constructor() {
        super("round3Scene", 8, 8)
    }

    create() {
        console.log('Round 3 loaded')
        let p1Score = this.registry.get('P1_Score')
        let p2Score = this.registry.get('P2_Score')
            if(p1Score >= 2) {
                this.endGame(this.P1, 'Player 1 Wins')
            } else if (p2Score >= 2) {
                this.endGame(this.P2, 'Player 2 Wins')
            }
        super.create()
        
    }  

    update() {
        super.update()

        //once exit is reached in 3rd round the game is over
        if(this.registry.get('ExitReached')) {
            this.registry.set('ExitReached', false)
            //determine if someone won at the end of the round
            let p1Score = this.registry.get('P1_Score')
            let p2Score = this.registry.get('P2_Score')
            if(p1Score >= 2) {
                this.endGame({ winner:this.P1, winText:'Player 1 Wins'} )
            } else if (p2Score >= 2) {
                this.endGame({winner: this.P2, winText: 'Player 2 Wins'} )
            }
        }
    }
}