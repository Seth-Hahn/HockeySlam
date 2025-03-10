// Name : Seth Hahn
// Title: Xtreme Xcape
// Hours Working: 



let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 860,
    scene: [Menu, Round1, Round2, Round3],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        }
    }
}

//Define player one keys
let P1_KEYLEFT, P1_KEYRIGHT, P1_KEYCROUCH, P1_KEYJUMP, // movement keys (A, D, S, W)
P1_KEYSHOOT // shoot key (spacebar)

//define player two keys
let P2_KEYLEFT, P2_KEYRIGHT, P2_KEYCROUCH, P2_KEYJUMP, // movement keys ({ , | , }, +)
P2_KEYSHOOT // shoot key ( ? )

let game = new Phaser.Game(config)
