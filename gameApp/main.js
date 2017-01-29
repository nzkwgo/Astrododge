
//Boilerplate framework from https://github.com/lean/phaser-es6-webpack

import 'pixi';
import 'p2';
import Phaser from 'phaser';

import StartState from './states/Start';
import GameState from './states/Game';
import LossState from './states/Loss';

//Generates game 
class Game extends Phaser.Game {

  constructor () {

    super(800, 1200, Phaser.AUTO, "root", null);

    this.state.add('Start', StartState, false);
    this.state.add('Game', GameState, false);
    this.state.add('Loss', LossState, false);

    this.state.start('Start');
  }
}

var game = new Game();