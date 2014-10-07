/// <reference path='../State/Main.ts'/>

module Pacman.Prefab
{
  export class Dot extends Phaser.Sprite
  {
    private tileX:number;
    private tileY:number;

    private parentState:State.Main;

    constructor(game: Phaser.Game, tileX:number, tileY:number, parent:State.Main)
    {
      super(game, 8 * tileX + 4, 8 * tileY + 4, 'pacman-sheet', 0);

      this.tileX = tileX;
      this.tileY = tileY;

      this.parentState = parent;

      this.crop(new Phaser.Rectangle(328, 139, 2, 2), false);

      game.add.existing(this);
    }

    update()
    {
      if (this.parentState.player1.tileX == this.tileX && this.parentState.player1.tileY == this.tileY)
      {
        this.kill();
      }
    }
  }
}
