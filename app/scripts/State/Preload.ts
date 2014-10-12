module Pacman.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.tilemap('pacman-maze', 'assets/maps/maze.json', null, Phaser.Tilemap.TILED_JSON);

      this.load.image('menu-background', 'assets/images/menu-background.png');
      this.load.image('pacman-sheet', 'assets/images/pacman.png');

      this.load.spritesheet('pacman-spritesheet', 'assets/images/pacman.png', 16, 16, -1, 0, 0);

      // Load remaining assets here
    }

    create() {
      this.game.state.start('main');
    }
  }
}
