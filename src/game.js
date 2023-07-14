import Player from "./player";
import Pipe from "./pipe";
import PipeGenerator from "./pipe_generator";
import Enemy from "./enemy";
import EnemyGenerator from "./enemy_generator";
import Trail from "./trail";
import Feather from "./feather";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.spritesheet('player', 'assets/images/player.png', { frameWidth: 32, frameHight: 32 })
    
    this.load.spritesheet('enemy', 'assets/images/bat.png', { frameWidth: 32, frameHight: 32 })
    this.load.audio('jump', 'assets/sounds/jump.mp3')
    this.load.audio('muzik', 'assets/sounds/muzik.mp3')
    this.load.audio('death', 'assets/sounds/death.mp3')
    this.load.image('cloud',
      'assets/images/cloud.png');
    this.load.image("background", "assets/images/background.jpg");
    this.load.image("feather", "assets/images/feather.png");

   // this.load.image("enemy", "assets/images/enemy.png");

    this.load.bitmapFont("daydream", "assets/fonts/daydream.png", "assets/fonts/daydream.xml");

  }

  create() {
    this.add.text(80, 80, "Game started");
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.cloud = this.add.image(260, 50, "cloud");
    this.cloud.setScale(3);
    this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.player = new Player(this, 200, 100)
    this.pipes = this.add.group()
    this.score = 0
    this.scoreText = this.add.bitmapText(100,10, "daydream", "0", 20)
    this.pipeGenerator = new PipeGenerator(this)
    this.enemyGenerator = new EnemyGenerator(this)
    this.deathSound = this.sound.add('death')


    this.physics.add.collider(this.player, this.pipes, this.hitPipe, () => {
      return true;
    }, this)


    this.input.on('pointerdown', function(pointer) {
      this.jump();
     //this.gameOver()
    }, this)

    this.playMusic()

    this.updateScoreEvent = this.time.addEvent({ delay: 1000, callback: () => this.updateScore(), callbackScope: this, loop: true });

  }

updateScore(){
this.score++
this.scoreText.setText(this.score)
}

  jump() {
    if(this.player.active){
      this.jumpSound = this.sound.add('jump')
      this.jumpSound.play()
      this.player.body.setVelocityY(-100)
     }
  
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
      this.jump();
    }
  }
  hitPipe(player, pipe) {
    this.playerDeath()

  }
  hitEnemy(player, pipe) {
  this.playerDeath()
  }

  playerDeath(){
    console.log('🤓')
    this.player.destroy()
    this.updateScoreEvent.destroy()
    this.music.stop()
    this.deathSound.play()
    this.time.delayedCall(3000, () => this.gameOver(), null, this)
    this.explosion()
  }

  explosion(){
    const featherAmount = Phaser.Math.Between(6,15)
    for (let index = 0; index < featherAmount; index++) {
      const offsetX = Phaser.Math.Between(-30,30)
      const offsetY = Phaser.Math.Between(-30,30)
      new Feather(this, this.player.x + offsetX, this.player.y + offsetY)      
    }
  }

  gameOver(){
    this.music.stop()
    this.scene.start("gameover")
    this.registry.set('score', this.score)
  }

  playMusic() {
    this.music = this.sound.add('muzik')
    this.music.play({
      volume: 0.5,
      loop: true
    })
  }
}




