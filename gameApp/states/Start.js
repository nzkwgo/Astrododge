import Phaser from 'phaser';


//Assets
import background from '../assets/start.png';
import alex from '../assets/alex.png';


export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000';

  };

  preload () {
    this.load.image('startBackground', background);
    this.load.image('start', alex);
  };

  //Generates a page to prompt the user to start playing
  create () {
    var background = this.game.add.sprite(0, 0, 'startBackground');
    background.height = this.game.height;
    this.game.add.button(this.game.world.centerX - 100, 500, 'start', start,this);

    //Detect enter key and start game on press
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.ENTER ]);
    this.enterKey.onDown.add(start, this);


    function start() {
        this.state.start('Game');
    }
  }
  
  render () {}
}
