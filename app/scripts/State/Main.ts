/// <reference path='../Prefab/Pacman.ts'/>
/// <reference path='../Prefab/Dot.ts'/>

module Pacman.State
{
  export class Main extends Phaser.State
  {
    map:Phaser.Tilemap;

    player1:Prefab.Pacman;
    dots:Prefab.Dot;

    private mapSprite:any;

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
    }
  }
}
