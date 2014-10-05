module Pacman.Prefab
{
  enum Direction {North, East, South, West}

  export class Pacman extends Phaser.Sprite
  {

    private tileX:number;
    private tileY:number;

    private tileStepCount:number;

    private direction:Direction;

    constructor(game:Phaser.Game, x:number, y:number, tileX:number, tileY:number)
    {
      super(game, x, y, 'pacman-sheet', 0);

      this.tileX = tileX;
      this.tileY = tileY;
      this.tileStepCount = 0;

      this.crop(new Phaser.Rectangle(229, 0, 16, 16), false);

      this.direction = Direction.East;

      game.add.existing(this);
    }

    update()
    {
      this.tileStepCount++;

      if (this.tileStepCount >= 8)
      {
        this.tileStepCount = 0;

        switch (this.direction)
        {
          case Direction.North:
            this.tileY--;
          break;
          case Direction.East:
            this.tileX++;
          break;
          case Direction.South:
            this.tileY++;
          break;
          case Direction.West:
            this.tileX--;
          break;
        }
      }

      var xOffset:number = 0;
      var yOffset:number = 0;

      switch (this.direction)
      {
        case Direction.North:
          yOffset = -(this.tileStepCount);
        break;
        case Direction.East:
          xOffset = (this.tileStepCount);
        break;
        case Direction.South:
          yOffset = (this.tileStepCount);
        break;
        case Direction.West:
          xOffset = -(this.tileStepCount);
        break;
      }

      this.x = this.tileX * 8 - 4 + xOffset; // the -4 is crude centering for the 16x16 sprite
      this.y = this.tileY * 8 - 4 + yOffset;
    }
  }
}
