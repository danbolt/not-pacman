module Pacman.State
{
  export class Main extends Phaser.State
  {
    private map:Phaser.Tilemap;
    private layer:Phaser.TilemapLayer;

    create()
    {
      this.stage.backgroundColor = 0xFF00FF;

      this.map = this.game.add.tilemap('pacman-maze');

      this.map.addTilesetImage('maze', 'pacman-sheet');
      this.layer = this.map.createLayer('background');
      this.layer = this.map.createLayer('maze');
      this.layer.resizeWorld();
    }
  }
}
