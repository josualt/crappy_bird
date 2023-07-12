import Pipe from "./pipe";
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
      const waitTime = Phaser.Math.Between(1000, 2000);
      this.scene.time.delayedCall(waitTime, () => this.generate(), null, this)
    }
  }
  export default PipeGenerator