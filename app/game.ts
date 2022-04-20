enum ObjectiveState
{
    GoingToControlCenter,
    LeavingTheLabyrinth
}

class Game
{
    map : LabyrinthMap;
    history: LabyrinthMap;

    playerPosition : Point2D;
    state : ObjectiveState;

    constructor(nbRows : number, nbColumns : number)
    {
        this.map = new LabyrinthMap(nbRows, nbColumns);
        this.history = new LabyrinthMap(nbRows, nbColumns);
        this.state = ObjectiveState.GoingToControlCenter;
    }

    setPlayerPosition(x:number, y :number)
    {
        this.playerPosition = new Point2D(x,y);

        if(this.map.getCell(new Point2D(x,y)) == "C")
            this.state = ObjectiveState.LeavingTheLabyrinth;
    
        if(this.state == ObjectiveState.GoingToControlCenter)
            this.history.setCell(x,y,"x");
        else if(this.state == ObjectiveState.LeavingTheLabyrinth)
            this.history.setCell(x,y,"o");
        this.map.setCell(x,y,"K");

    }

    loadMapData(rowNumber :number, rowContent : string)
    {
        this.map.load(rowNumber, rowContent);
    }

    getValidMoves()
    {
        let moves = [];
        let probableDirection = [Direction.LEFT, Direction.RIGHT, Direction.UP, Direction.DOWN];
        

        if(this.state == ObjectiveState.GoingToControlCenter)
        {

            for(let direction in probableDirection)
            {
                let currentDirection = probableDirection[direction];

                Log.verbose(currentDirection.toString());
                Log.verbose(this.map.getCellOfInDirection(this.playerPosition,currentDirection));
                
                if( (  this.map.getCellOfInDirection(this.playerPosition,currentDirection) == "." 
                    || this.map.getCellOfInDirection(this.playerPosition,currentDirection) == "C" ) &&
                    this.history.getCellOfInDirection(this.playerPosition,currentDirection) == "o")
                    moves.push(currentDirection);
            }
        }
        else if (this.state == ObjectiveState.LeavingTheLabyrinth)
        {
            for(let direction in probableDirection)
            {
                let currentDirection = probableDirection[direction];
                if( (  this.map.getCellOfInDirection(this.playerPosition,currentDirection) == "." 
                    || this.map.getCellOfInDirection(this.playerPosition,currentDirection) == "T" ) &&
                    this.history.getCellOfInDirection(this.playerPosition,currentDirection) == "x")

                moves.push(currentDirection);
            }
        }
        return moves;

    }

    getNextMove()
    {
        Log.verbose("Objective is "+this.state.toString());
        let validMoves = this.getValidMoves();
        Log.verbose("Valid moves are : "+validMoves);
        return validMoves[0];
    }

    display()
    {
        this.map.display();
        console.error("----------------------------");
        this.history.display();
    }


}