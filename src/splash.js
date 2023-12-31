export default class Splash extends Phaser.Scene{
    constructor() {
        super({ key: "splash" });
      }

      preload(){
        this.load.bitmapFont("splash", "assets/fonts/daydream.png", "assets/fonts/daydream.xml");
        this.load.bitmapFont("arcade", "assets/fonts/arcade.png", "assets/fonts/arcade.xml");
        this.load.image('background', 'assets/images/background.jpg');
        this.load.audio('splash', 'assets/sounds/splash.mp3');



      }

      create(){
        this.background = this.add.image(0,0,'background').setOrigin(0)
        this.startText = this.add.bitmapText(200,250, "arcade", "Insert coin", 20).setOrigin(0.5)
        this.playMusic()
        this.tweens.add({
          targets: this.startText,
          alpha: { from: 0, to: 1 },
          duration: 500,
          repeat: -1,
          yoyo: true
        })
        this.startText = this.add.bitmapText(330,280, "arcade", "Josu Altadill", 12).setOrigin(0.5)
        this.titleText1 = this.add.bitmapText(200,20, "splash", "Crappy", 40).setOrigin(0.5)
        this.titleText2 = this.add.bitmapText(200,70, "splash", "Bird", 40).setOrigin(0.5)
        this.input.on('pointerdown', function(pointer) {
            this.startGame();
          }, this)
    }

    playMusic() {
      this.music = this.sound.add('splash')
      this.music.play({
        volume: 0.5,
        loop: true
      })
    }

    startGame(){
        this.scene.start("game");
        this.music.stop()

    }
}
