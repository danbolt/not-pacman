/// <reference path='../State/Main.ts'/>

module Pacman.Prefab
{
  export class Dot extends Phaser.Sprite
  {
    private tileX:number;
    private tileY:number;

    private parentState:State.Main;

    private decrementDot:()=>any;

    constructor(game: Phaser.Game, tileX:number, tileY:number, parent:State.Main, decrementDotFunction:()=>any)
    {
      super(game, 8 * tileX + 4, 8 * tileY + 4, 'pacman-sheet', 0);

      this.tileX = tileX;
      this.tileY = tileY;

      this.parentState = parent;

      this.crop(new Phaser.Rectangle(325, 139, 2, 2), false);

      this.decrementDot = decrementDotFunction;

      game.add.existing(this);
    }

    update()
    {
      if (this.parentState.player1.tileX == this.tileX && this.parentState.player1.tileY == this.tileY)
      {
        this.decrementDot();
        this.destroy();
      }
    }
  }
}
