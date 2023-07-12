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

  export default Enemy