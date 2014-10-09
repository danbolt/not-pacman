/// <reference path='../Prefab/Pacman.ts'/>
/// <reference path='../Prefab/Dot.ts'/>
/// <reference path='../Prefab/Ghost.ts'/>

module Pacman.State
{
  export class Main extends Phaser.State
  {
    map:Phaser.Tilemap;

    player1:Prefab.Pacman;
    dots:Prefab.Dot;

    private mapSprite:any;

    ghosts:Array<Prefab.Ghost>;

    blinkyLogic()
    {
      return () => { return {x: this.player1.tileX, y: this.player1.tileY}; };
    }

    pinkyLogic()
    {
      return () =>
      {
        switch (this.player1.direction)
        {
          case Prefab.Direction.North:
            return {x: this.player1.tileX - 4, y: this.player1.tileY - 4};
          break;
          case Prefab.Direction.East:
            return {x: this.player1.tileX + 4, y: this.player1.tileY};
          break;
          case Prefab.Direction.South:
            return {x: this.player1.tileX, y: this.player1.tileY + 4};
          break;
          case Prefab.Direction.West:
            return {x: this.player1.tileX - 4, y: this.player1.tileY};
          break;
        }
      };
    }

    inkyLogic(player1:Prefab.Pacman, blinky:Prefab.Ghost)
    {
      return () =>
      {
        var pacmanBlinkyDeltaX:number;
        var pacmanBlinkyDeltaY:number;

        switch (player1.direction)
        {
          case Prefab.Direction.North:
            pacmanBlinkyDeltaX = (player1.tileX - 2) - blinky.tileX;
            pacmanBlinkyDeltaY = (player1.tileY - 2) - blinky.tileY;
          break;
          case Prefab.Direction.East:
            pacmanBlinkyDeltaX = (player1.tileX + 2) - blinky.tileX;
            pacmanBlinkyDeltaY = player1.tileY - blinky.tileY;
          break;
          case Prefab.Direction.South:
            pacmanBlinkyDeltaX = player1.tileX - blinky.tileX;
            pacmanBlinkyDeltaY = (player1.tileY + 2) - blinky.tileY;
          break;
          case Prefab.Direction.West:
            pacmanBlinkyDeltaX = (player1.tileX - 2) - blinky.tileX;
            pacmanBlinkyDeltaY = player1.tileY - blinky.tileY;
          break;
        }

        return {x: player1.tileX + pacmanBlinkyDeltaX, y: player1.tileY + pacmanBlinkyDeltaY};
      };
    }

    clydeLogic(player1:Prefab.Pacman)
    {
      var magicDistanceNumber:number = 8;

      return () =>
      {
        var clyde:Prefab.Ghost = this.ghosts["clyde"];

        var distanceToPlayer = Math.sqrt(Math.pow(clyde.tileX - player1.tileX, 2) + Math.pow(clyde.tileY - player1.tileY, 2));

        if (distanceToPlayer > magicDistanceNumber)
        {
          return {x: this.player1.tileX, y: this.player1.tileY};
        }
        else
        {
          return {x: 0, y: 32};
        }
      };
    }

    create()
    {
      this.stage.backgroundColor = 0xFF00FF;

      // add the internal map (for logic)
      this.map = this.game.add.tilemap('pacman-maze');

      // add a sprite overlay for the map
      this.mapSprite = this.game.add.sprite(0, 0, 'pacman-sheet');
      this.mapSprite.crop(new Phaser.Rectangle(0, 0, 224, 248));

      // add the dots
      for (var iy = 0; iy < this.map.layers[0].data.length; iy++)
      {
        for (var ix = 0; ix < this.map.layers[0].data[iy].length; ix++)
        {
          if ((ix > 8 && iy > 8 && ix < 20 && iy < 20) || (iy == 14 && (ix != 6 && ix != 21)))
          {
            continue;
          }

          if (this.map.layers[0].data[iy][ix].index == -1)
          {
            new Prefab.Dot(this.game, ix, iy, this);
          }
        }
      }

      // add player 1
      this.player1 = new Prefab.Pacman(this.game, 100, 100, 13, 17, this.map);

      // add a ghost
      this.ghosts = new Array<Prefab.Ghost>();
      this.ghosts["blinky"] = new Prefab.Ghost(this.game, 13, 11, this.map, this.blinkyLogic(), new Phaser.Rectangle(228, 64, 16, 16));
      this.ghosts["pinky"] = new Prefab.Ghost(this.game, 12, 11, this.map, this.pinkyLogic(), new Phaser.Rectangle(228, 80, 16, 16));
      this.ghosts["inky"] = new Prefab.Ghost(this.game, 11, 11, this.map, this.inkyLogic(this.player1, this.ghosts["blinky"]), new Phaser.Rectangle(228, 96, 16, 16));
      this.ghosts["clyde"] = new Prefab.Ghost(this.game, 10, 11, this.map, this.clydeLogic(this.player1), new Phaser.Rectangle(228, 112, 16, 16));
    }
  }
}
