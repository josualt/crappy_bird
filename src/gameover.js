export default class GameOver extends Phaser.Scene {
    constructor () {
        super({ key: "gameover" });
    }

    preload () {
    }

    create () {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        this.score = this.registry.get('score')
        this.cameras.main.setBackgroundColor(0x87ceeb);

        this.add.bitmapText(this.center_width, 50, "daydream", 'GAME OVER', 25).setOrigin(0.5)
        this.add.bitmapText(this.center_width, this.center_height, "daydream",this.score, 40).setOrigin(0.5)
        this.add.bitmapText(this.center_width, 250, "daydream", "Press SPACE or Click to restart!", 12).setOrigin(0.5)
        this.input.keyboard.on("keydown-SPACE", this.startGame, this);
        this.input.on('pointerdown', (pointer) => this.startGame(), this);
    }

    showLine(text, y) {
        let line = this.introLayer.add(this.add.bitmapText(this.center_width, y, "daydream", text, 25).setOrigin(0.5).setAlpha(0));
        this.tweens.add({
            targets: line,
            duration: 2000,
            alpha: 1
        })
    }

    startGame () {
        this.scene.start("game");
    }
}
