module Pacman.Prefab
{
  enum Direction {North, East, South, West}

  export class Pacman extends Phaser.Sprite
  {
    tileX:number;
    tileY:number;

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
      // set the direction of pacman based on the keyboard
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && (this.map.layers[0].data[this.tileY][this.tileX + 1].index == -1))
      {
        this.direction = Direction.East;
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && (this.map.layers[0].data[this.tileY + 1][this.tileX].index == -1))
      {
        this.direction = Direction.South;
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && (this.map.layers[0].data[this.tileY][this.tileX - 1].index == -1))
      {
        this.direction = Direction.West;
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && (this.map.layers[0].data[this.tileY - 1][this.tileX].index == -1))
      {
        this.direction = Direction.North;
      }

      // perform collision logic
      if (this.tileY >= 0 && this.tileY < this.map.layers[0].data.length && this.tileX >= 0 && this.tileX < this.map.layers[0].data[this.tileY].length)
      {
        switch (this.direction)
        {
          case Direction.North:
            if (this.map.layers[0].data[this.tileY - 1][this.tileX].index == -1)
            {
              this.tileStepCount++;
            }
          break;
          case Direction.East:
            if (this.map.layers[0].data[this.tileY][this.tileX + 1].index == -1)
            {
              this.tileStepCount++;
            }
          break;
          case Direction.South:
            if (this.map.layers[0].data[this.tileY + 1][this.tileX].index == -1)
            {
              this.tileStepCount++;
            }
          break;
          case Direction.West:
            if (this.map.layers[0].data[this.tileY][this.tileX - 1].index == -1)
            {
              this.tileStepCount++;
            }
          break;
        }
      }
      else
      {
        //console.log('watch yer index!');
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

      //reset crop for sprite purposes
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

      this.x = this.tileX * 8 - 4; // the -4 is crude centering for the 16x16 sprite
      this.y = this.tileY * 8 - 4;
    }
  }
}
