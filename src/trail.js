class Trail extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
      super(scene, x, y, 32, 32, 0x696969)
      this.scene = scene
      this.scene.add.existing(this)
      this.scene.physics.add.existing(this)
      this.body.collideWorldBounds = true
    }
  }
  export default Trail