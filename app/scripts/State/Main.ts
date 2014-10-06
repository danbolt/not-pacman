/// <reference path='../Prefab/Pacman.ts'/>

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

      this.player1 = new Prefab.Pacman(this.game, 100, 100, 1, 1, this.map);
    }
  }
}
