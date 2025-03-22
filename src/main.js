// Name : Seth Hahn
// Title: Xtreme Xcape
// Components Utilized:
// 1. physics system - used for player and Ai movement,
//    allows for walking on the floor, handles bullet 
//    movement, allows bullets to collide with players
//    and enemies 
// 2. Particle Effect - Used when a player or Ai shoots
//    to add graphical fidelity to the gunshot. Also
//    used on the winscreen to portray the building exploding
// 3. Text Objects - Various text objects are used to display the current round
//    as well as being used in the menu and winning screen to navigate to different
//    parts of the game
// 4. Animation Manager - Multiple animations are handled in real time for both the players
//    and Ai which allows for visible running with movement, stationary shooting, and running while
//    shooting
// 5. Timers - timer event used to create a stopwatch which counts up in seconds
//    to show time elapsed each round. Delayed calls are used to transition between
//    round number and stop watch as well as being used to properly handle the process 
//    of the gunshot (when to play animations, sound effects, etc.)



let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 860,
    scene: [Menu, Round1, Round2, Round3, End],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
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
