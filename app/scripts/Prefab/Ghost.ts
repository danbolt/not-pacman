module Pacman.Prefab
{
  enum Direction {North, East, South, West}

  export class Ghost extends Phaser.Sprite
  {
    private tileX:number;
    private tileY:number;

    private direction:Direction;

    private step:number;

    private target:any;
    private lastTileChangedDirectionAt:any;

    private map:Phaser.Tilemap;

    constructor(game: Phaser.Game, tileX: number, tileY: number, map:Phaser.Tilemap)
    {
      super(game, 0, 0, 'pacman-sheet', 0);

      this.tileX = tileX;
      this.tileY = tileY;

      this.step = 0;
      this.direction = Direction.East;

      this.target = {x: 21, y: 14};
      this.lastTileChangedDirectionAt = {x: tileX, y: tileY};

      this.map = map;

      this.crop(new Phaser.Rectangle(228, 64, 16, 16), false);

      game.add.existing(this);
    }

    private distance = (p1:any, p2:any) => { return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)); }

    private invertDirection(direction:Direction)
    {
      switch (direction)
      {
        case Direction.North:
          return Direction.South;
        case Direction.East:
          return Direction.West;
        case Direction.South:
          return Direction.North;
        case Direction.West:
          return Direction.East;
      }
    }

    private newDirection(oldDirection:Direction)
    {
      var result:Direction = oldDirection;

      if (this.tileX == this.lastTileChangedDirectionAt.x && this.tileY == this.lastTileChangedDirectionAt.y)
      {
        return oldDirection;
      }

      //choose a direction that is closet to the target
      var directionOptions:any = [];
      if (this.map.layers[0].data[this.tileY - 1][this.tileX].index == -1)
      {
        var distanceToTargetFromNorth:number = this.distance({x: this.tileX, y: this.tileY - 1}, this.target);

        directionOptions.push({direction: Direction.North, distance: distanceToTargetFromNorth});
      }
      if (this.map.layers[0].data[this.tileY][this.tileX - 1].index == -1)
      {
        var distanceToTargetFromWest:number = this.distance({x: this.tileX - 1, y: this.tileY}, this.target);

        directionOptions.push({direction: Direction.West, distance: distanceToTargetFromWest});
      }
      if (this.map.layers[0].data[this.tileY + 1][this.tileX].index == -1)
      {
        var distanceToTargetFromSouth:number = this.distance({x: this.tileX, y: this.tileY + 1}, this.target);

        directionOptions.push({direction: Direction.South, distance: distanceToTargetFromSouth});
      }
      if (this.map.layers[0].data[this.tileY][this.tileX + 1].index == -1)
      {
        var distanceToTargetFromEast:number = this.distance({x: this.tileX + 1, y: this.tileY}, this.target);

        directionOptions.push({direction: Direction.East, distance: distanceToTargetFromEast});
      }

      var resultDistance:number = 999;
      for (var i = 0; i < directionOptions.length; i++)
      {
        if (directionOptions[i].distance < resultDistance && directionOptions[i].direction != this.invertDirection(oldDirection))
        {
          //special exceptions for certain intersections
          if (directionOptions[i].direction == Direction.North)
          {
            if (this.tileX == 12 || this.tileX == 15)
            {
              if (this.tileY == 11 || this.tileY == 23)
              {
                continue;
              }
            }
          }

          resultDistance = directionOptions[i].distance;
          result = directionOptions[i].direction;
        }
      }

      this.lastTileChangedDirectionAt = {x: this.tileX, y: this.tileY};

      return result;
    }

    private numberOfTileExits(map:Phaser.Tilemap)
    {
      var result:number = 0;

      if (this.map.layers[0].data[this.tileY - 1][this.tileX].index == -1) { result++; }
      if (this.map.layers[0].data[this.tileY + 1][this.tileX].index == -1) { result++; }
      if (this.map.layers[0].data[this.tileY][this.tileX - 1].index == -1) { result++; }
      if (this.map.layers[0].data[this.tileY][this.tileX + 1].index == -1) { result++; }

      return result;
    }

    update()
    {
      this.step++;

      // compute target

      // compute closest tile to target
      this.direction = this.newDirection(this.direction);

      if (this.step >= 8)
      {
        this.step = 0;

        switch (this.direction)
        {
          case Direction.North:
            this.tileY--;
          break;
          case Direction.South:
            this.tileY++;
          break;
          case Direction.East:
            this.tileX++;
          break;
          case Direction.West:
            this.tileX--;
          break;
        }
      }

      // position sprite for rendering
      this.x = this.tileX * 8 - 4;
      this.y = this.tileY * 8 - 4;
    }
  }
}
