export default class Splash extends Phaser.Scene{
    constructor() {
        super({ key: "splash" });
      }

      preload(){
        this.load.bitmapFont("splash", "assets/fonts/daydream.png", "assets/fonts/daydream.xml");

      }

      create(){
        this.titleText = this.add.bitmapText(100,10, "splash", "Crappy Bird", 40)
        this.input.on('pointerdown', function(pointer) {
            this.startGame();
          }, this)
    }

    startGame(){
        this.scene.start("game");

    }
}
