class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }
  preload() {
    this.load.spritesheet('player', 'assets/images/player.png', { frameWidth: 32, frameHight: 32 })
    
    this.load.spritesheet('enemy', 'assets/images/bat.png', { frameWidth: 32, frameHight: 32 })
    this.load.audio('jump', 'assets/sounds/jump.mp3')
    this.load.audio('muzik', 'assets/sounds/muzik.mp3')
    this.load.image('cloud',
      'assets/images/cloud.png');
    this.load.image("background", "assets/images/background.jpg");
    this.load.image("bobblin", "assets/images/bobblin.png");
    this.load.image("bubblin", "assets/images/bubblin.png");
    this.load.image("enemy", "assets/images/enemy.png");
    this.load.image("tube", "assets/images/TUBE.png");
    this.load.bitmapFont("daydream", "assets/fonts/daydream.png", "assets/fonts/daydream.xml");

  }

  create() {
    this.add.text(80, 80, "Game started");
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.cloud = this.add.image(260, 50, "cloud");
    this.tube = this.add.image(250, 285, "tube");
    this.cloud.setScale(3);
    this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.player = new Player(this, 200, 100)
    this.pipes = this.add.group()
    this.score = 0
    this.scoreText = this.add.bitmapText(100,10, "daydream", "0", 20)
    this.pipeGenerator = new PipeGenerator(this)
    this.enemyGenerator = new EnemyGenerator(this)


    this.physics.add.collider(this.player, this.pipes, this.hitPipe, () => {
      return true;
    }, this)


    this.input.on('pointerdown', function(pointer) {
      this.jump();
    }, this)
    this.playMusic()
  }


  jump() {
    this.jumpSound = this.sound.add('jump')
    this.jumpSound.play()
    this.player.body.setVelocityY(-100)
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
      this.jump();
    }
  }
  hitPipe(player, pipe) {
    console.log('🤓')
    player.destroy()
    this.music.stop()
  }
  hitEnemy(player, pipe) {
    console.log('🤓')
    player.destroy()
    this.music.stop()
  }

  playMusic() {
    this.music = this.sound.add('muzik')
    this.music.play({
      volume: 0.5,
      loop: true
    })
  }
}

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player')
    this.flipX = false
    this.scene = scene
    this.scale = 2
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.collideWorldBounds = true
    this.body.setSize(25, 16)
    this.init()
  }
  init() {
    this.scene.anims.create({
      key: 'player',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.play('player')
  }
}

class Trail extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 32, 32, 0x696969)
    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.collideWorldBounds = true
  }
}


class Pipe extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 32, 150, 0x00ff00)
    this.setOrigin(0)
    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.allowGravity = false
    this.body.immovable = true
    //this.body.collideWorldBounds = true
    this.move()
  }
  move() {
    this.scene.tweens.add({
      targets: this,
      x: { from: 800, to: -100 },
      duration: 8000,
      onComplete: () => { this.destroy() }
    })


  }
}
class PipeGenerator {
  constructor(scene) {
    this.scene = scene;
    this.generate()
  }

  generate() {
    const yTopPipe = Phaser.Math.Between(-20, -100);
    const yBottomPipe = 260 + yTopPipe;

    this.scene.pipes.add(new Pipe(this.scene, 800, yTopPipe))
    this.scene.pipes.add(new Pipe(this.scene, 800, yBottomPipe))
    const waitTime = Phaser.Math.Between(500, 2000);
    this.scene.time.delayedCall(waitTime, () => this.generate(), null, this)
  }
}


class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y,'enemy')
    this.setOrigin(0)
    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.allowGravity = false
    this.body.immovable = true
    //this.body.collideWorldBounds = true
    this.moveEnemy()
    this.init()
  }
    init() {
    this.scene.anims.create({
      key: 'enemy',
      frames: this.scene.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.play('enemy')
  }

  moveEnemy() {
    this.scene.tweens.add({
      targets: this,
      x: { from: 800, to: -100 },
      duration: 6000,
      onComplete: () => { this.destroy() }
    })
  }
}


class EnemyGenerator {
  constructor(scene) {
    this.scene = scene;
    this.generate()
  }

  generate() {
    const yEnemy = Phaser.Math.Between(0, 200);

    this.scene.pipes.add(new Enemy(this.scene, 800, yEnemy))
    const waitTime = Phaser.Math.Between(4000, 7000);
    this.scene.time.delayedCall(waitTime, () => this.generate(), null, this)
  }
}

