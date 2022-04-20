enum Direction
{
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    UP = "UP",
    DOWN = "DOWN"
}

class LabyrinthMap{
    map : string[][];
    nbRows : number;
    nbColumns : number;

    constructor(nbRows :number, nbColumns :number)
    {
        this.nbRows = nbRows;
        this.nbColumns = nbColumns;
        this.map = Array(nbRows);
        for(let i = 0 ; i < nbRows ; i++)
        {
            this.map[i] = Array(nbColumns).fill("o");
        }
    }

    load(rowNumber :number, rowContent : string)
    {
        this.map[rowNumber] = rowContent.split('');
    }

    getCell(position : Point2D)
    {
        return this.map[position.x][position.y];
    }

    isCellValid(position: Point2D)
    {
        if(position.x > this.nbRows-1 || position.x < 0 || position.y > this.nbColumns-1 || position.y < 0)
            return false;
        return true;
    }

    setCell(x:number, y:number, value:string)
    {
        this.map[x][y] = value;
    }

    getCellOfInDirection(position : Point2D, direction: Direction) : string
    {
        let coordinates;
        switch(direction)
        {
            case Direction.LEFT:
                coordinates = new Point2D(position.x, position.y-1); 
                if(!this.isCellValid(coordinates))
                    return "!"
                return this.getCell(coordinates);
            case Direction.RIGHT:
                coordinates = new Point2D(position.x, position.y+1); 
                if(!this.isCellValid(coordinates))
                    return "!"
                return this.getCell(coordinates);
            case Direction.UP:
                coordinates = new Point2D(position.x-1, position.y); 
                if(!this.isCellValid(coordinates))
                    return "!"
                return this.getCell(coordinates);
            case Direction.DOWN:
                coordinates = new Point2D(position.x+1, position.y); 
                if(!this.isCellValid(coordinates))
                    return "!"
                return this.getCell(coordinates);
        }
    }


    display()
    {
        for(let rowIdx in this.map)
        {
            let row = this.map[rowIdx];
            Log.medium(row.join(''));
        }
    }
}