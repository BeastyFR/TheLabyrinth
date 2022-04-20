/// <reference path="../util/Util.ts" />
/// <reference path="../util/Log.ts" />
/// <reference path="./labyrinthmap.ts" />
/// <reference path="./game.ts" />

declare var readline: any

Log.debugEnable = true;
Log.debugLevel = LogLevel.Verbose;


var inputs = readline().split(' ');
const R = parseInt(inputs[0]); // number of rows.
const C = parseInt(inputs[1]); // number of columns.
const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.

let data = {rows : R, columns : C, countdown : A};
let game = new Game(R,C);

 // game loop
 while (true) {
     var inputs = readline().split(' ');
     const KR = parseInt(inputs[0]); // row where Rick is located.
     const KC = parseInt(inputs[1]); // column where Rick is located.
     
    for (let i = 0; i < R; i++) {
        const ROW = readline(); // C of the characters in '#.TC?' (i.e. one line of the ASCII maze).
        game.loadMapData(i,ROW);
    }

    game.setPlayerPosition(KR,KC);
    game.display();
     // Write an action using console.log()
     // To debug: console.error('Debug messages...');
 
    console.log(game.getNextMove());     // Rick's next move (UP DOWN LEFT or RIGHT).
 
 }

 