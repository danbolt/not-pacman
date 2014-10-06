module Pacman.Prefab
{
  enum Direction {North, East, South, West}

  export class Pacman extends Phaser.Sprite
  {

    private tileX:number;
    private tileY:number;

    private tileStepCount:number;

    private direction:Direction;

    private map:Phaser.Tilemap;

    constructor(game:Phaser.Game, x:number, y:number, tileX:number, tileY:number, map:Phaser.Tilemap)
    {
      super(game, x, y, 'pacman-sheet', 0);

      this.tileX = tileX;
      this.tileY = tileY;
      this.tileStepCount = 0;
      this.direction = Direction.East;

      this.map = map;

      game.add.existing(this);
    }

    update()
    {
      this.tileStepCount++;

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
      {
        this.direction = Direction.East;
        //this.tileStepCount = 0;
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
      {
        this.direction = Direction.South;
        //this.tileStepCount = 0;
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
      {
        this.direction = Direction.West;
        //this.tileStepCount = 0;
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
      {
        this.direction = Direction.North;
        //this.tileStepCount = 0;
      }

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

      // setting offsets
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

      //reset crop
      switch (this.direction)
      {
        case Direction.North:
          this.crop(new Phaser.Rectangle(243, 32, 16, 16), false);
        break;
        case Direction.East:
          this.crop(new Phaser.Rectangle(243, 0, 16, 16), false);
        break;
        case Direction.South:
          this.crop(new Phaser.Rectangle(243, 48, 16, 16), false);
        break;
        case Direction.West:
          this.crop(new Phaser.Rectangle(243, 16, 16, 16), false);
        break;
      }

      this.x = this.tileX * 8 - 4 + xOffset; // the -4 is crude centering for the 16x16 sprite
      this.y = this.tileY * 8 - 4 + yOffset;
    }
  }
}
