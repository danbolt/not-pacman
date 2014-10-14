/// <reference path='../Prefab/Ghost.ts'/>

module Pacman.Helper
{
  export class MonsterPenLogic extends Phaser.Sprite
  {
    private getDots:()=>number;

    private ghosts:Array<Prefab.Ghost>;
    private dotLimit:Array<number>;
    private currentGhost:string;

    private waitTimer:number = -1;

    constructor(game:Phaser.Game, numberOfDots:()=>number, ghostList:Array<Prefab.Ghost>)
    {
      super(game, -1, -1, null, 0);

      this.getDots = numberOfDots;

      this.ghosts = ghostList;
      this.dotLimit = new Array<number>();
      this.dotLimit["pinky"] = 0;
      this.dotLimit["inky"] = 30;
      this.dotLimit["clyde"] = 60;
      this.currentGhost = "pinky";

      game.add.existing(this);
    }

    private getNextGhost(currentGhost:string)
    {
      if (currentGhost == "pinky") { return "inky"; }
      else if (currentGhost == "inky") { return "clyde"; }
      else { return null; }
    }

    resetTimer()
    {
      this.waitTimer = this.game.time.now;
    }

    update()
    {
      var numberOfDotsLeft = this.getDots();

      if (this.waitTimer == -1)
      {
        this.waitTimer = this.game.time.now;
      }

      if (this.currentGhost != null)
      {
        if (246 - this.getDots() >= this.dotLimit[this.currentGhost] || (this.game.time.now - this.waitTimer > 4000))
        {
          this.ghosts[this.currentGhost].tileX = 14;
          this.ghosts[this.currentGhost].tileY = 11;
          this.ghosts[this.currentGhost].waiting = false;

          this.waitTimer = this.game.time.now;

          this.currentGhost = this.getNextGhost(this.currentGhost);
        }
      }
    }
  }
}
