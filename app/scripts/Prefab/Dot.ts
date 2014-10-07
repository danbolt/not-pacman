module Pacman.Prefab
{
  export class Dot extends Phaser.Sprite
  {
    constructor(game: Phaser.Game, tileX:number, tileY:number)
    {
      super(game, 8 * tileX + 4, 8 * tileY + 4, 'pacman-sheet', 0);

      this.crop(new Phaser.Rectangle(328, 139, 2, 2), false);

      game.add.existing(this);
    }

    update()
    {
      // Update prefab here
    }
  }
}
