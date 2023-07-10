import Phaser from "phaser";
import Game from "./game";
import GameOver from "./gameover"
import Splash from "./splash";

/*
const config = {
  width: 400,
  height: 300,
  backgroundColor: 0x000000,
  scene: [Game],
  physics:{
    default:'arcade',
    arcade:{
      gravity:{
        y:300
      },
      debug:true
    }
  }
};

const game = new Phaser.Game(config);


This is the main configuration file for the game.*/

const config = {
    width: 400,
    height: 300,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    parent: "contenedor",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 350 },
            debug: false
        }
    },
    scene: [
        Splash,
        Game,
        GameOver,
    ]
};

const game = new Phaser.Game(config);

