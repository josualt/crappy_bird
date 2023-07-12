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

export default Player;
  