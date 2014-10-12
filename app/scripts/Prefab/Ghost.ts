module Pacman.Prefab
{
  enum Direction {North, East, South, West}

  export class Ghost extends Phaser.Sprite
  {
    tileX:number;
    tileY:number;

    private direction:Direction;

    private step:number;

    private target:any;
    private lastTileChangedDirectionAt:any;

    private map:Phaser.Tilemap;

    computeTarget:()=>any;

    constructor(game: Phaser.Game, tileX: number, tileY: number, map:Phaser.Tilemap, computeTarget:()=>any, debugSpriteFrame:Phaser.Rectangle, startingTile:number)
    {
      super(game, 0, 0, 'pacman-spritesheet', 0);

      this.tileX = tileX;
      this.tileY = tileY;

      this.step = 0;
      this.direction = Direction.East;

      this.target = {x: 21, y: 14};
      this.lastTileChangedDirectionAt = {x: tileX, y: tileY};

      this.computeTarget = computeTarget;

      this.map = map;

      this.animations.add('right', [startingTile, startingTile + 1], 12, true, true);
      this.animations.add('down', [startingTile + 6, startingTile + 7], 12, true, true);
      this.animations.add('left', [startingTile + 2, startingTile + 3], 12, true, true);
      this.animations.add('up', [startingTile + 4, startingTile + 5], 12, true, true);

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
      if (this.map.layers[0].data[this.tileY][(this.tileX - 1 + 28) % 28].index == -1)
      {
        var distanceToTargetFromWest:number = this.distance({x: this.tileX - 1, y: this.tileY}, this.target);

        directionOptions.push({direction: Direction.West, distance: distanceToTargetFromWest});
      }
      if (this.map.layers[0].data[this.tileY + 1][this.tileX].index == -1)
      {
        var distanceToTargetFromSouth:number = this.distance({x: this.tileX, y: this.tileY + 1}, this.target);

        directionOptions.push({direction: Direction.South, distance: distanceToTargetFromSouth});
      }
      if (this.map.layers[0].data[this.tileY][(this.tileX + 1) % 28].index == -1)
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
      this.target = this.computeTarget();

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

      switch (this.direction)
      {
        case Direction.North:
          this.animations.play('up', null, true, false);
        break;
        case Direction.South:
          this.animations.play('down', null, true, false);
        break;
        case Direction.East:
          this.animations.play('right', null, true, false);
        break;
        case Direction.West:
          this.animations.play('left', null, true, false);
        break;
      }

      // if a ghost goes through the tunnel on the left or right side of the
      // screen, move it to the other side
      if (this.tileX >= this.map.layers[0].data[0].length)
      {
        this.tileX = 0;
      }
      else if (this.tileX < 0)
      {
        this.tileX = this.map.layers[0].data[0].length - 1;
      }

      // position sprite for rendering
      this.x = this.tileX * 8 - 4;
      this.y = this.tileY * 8 - 4;
    }
  }
}
