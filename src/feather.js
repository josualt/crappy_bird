class Feather extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y,'feather')
      this.scene = scene
      this.scene.add.existing(this)
      this.scene.physics.add.existing(this)
      this.init()
    }


    init(){
        const rotation = Phaser.Math.Between(0,360) 
      this.scene.tweens.add({
        targets: this,
        scale: { from: 1, to: 0 },
        rotation: {from:rotation, to:rotation-180},
        duration: 1000,
        onComplete: () => { this.destroy() }
      })
    }
  }
  export default Feather