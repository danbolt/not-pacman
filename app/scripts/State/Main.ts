/// <reference path='../Prefab/Pacman.ts'/>
/// <reference path='../Prefab/Dot.ts'/>

module Pacman.State
{
  export class Main extends Phaser.State
  {
    private map:Phaser.Tilemap;
    private layer:Phaser.TilemapLayer;

    private player1:Prefab.Pacman;

    private mapSprite:any;

    create()
    {
      this.stage.backgroundColor = 0xFF00FF;

      this.map = this.game.add.tilemap('pacman-maze');

      this.mapSprite = this.game.add.sprite(0, 0, 'pacman-sheet');
      this.mapSprite.crop(new Phaser.Rectangle(0, 0, 224, 248));

      //this.map.layers[0].data[this.tileY][this.tileX + 1]

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
            new Prefab.Dot(this.game, ix, iy);
          }
        }
      }

      this.player1 = new Prefab.Pacman(this.game, 100, 100, 13, 17, this.map);
    }
  }
}
