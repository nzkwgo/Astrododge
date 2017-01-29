import Phaser from 'phaser';


//Assets
import space from '../assets/space.png';
import spaceAlex from '../assets/spaceAlex.png';
import meteor from '../assets/meteor.png';

export default class extends Phaser.State {

  preload () {
    this.load.image('space', space);
    this.load.image('spaceAlex', spaceAlex);
    this.load.image('meteor', meteor);
  };

  //Generates game objects for play state
  create () {
    var background = this.game.add.sprite(0, 0, 'space');
    background.height = this.game.height;

    //Set the score to 0 and put it on the screen
    this.score = 0;
    this.scoreText = this.game.add.text(15, 15, 'score: 0', {fontsize: '32px', fill: '#ffffff'});

    this.cursors = this.game.input.keyboard.createCursorKeys();

    //Spawns the Player
    this.alex = this.game.add.sprite(350, 1000, 'spaceAlex');
    this.alex.height = 200;
    this.alex.width = 100;
    this.game.physics.arcade.enable(this.alex);
    this.alex.body.collideWorldBounds = true;
    this.game.add.existing(this.alex)
    
    //spawn a meteor every 500ms
    this.meteors = this.game.add.group();
    this.game.time.events.loop(500, shoot, this);
    
    
    //function that spawns a meteor
    function shoot() {
        var bullet = this.game.add.sprite(this.game.world.randomX, -50, 'meteor');
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        var size = this.game.rnd.integerInRange(30, 120);
        bullet.width = size;
        bullet.height = size;
        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;
        bullet.body.rotation = 180;
        bullet.body.velocity.y = 1000 - (size * 5);
        this.meteors.add(bullet);
        this.score++;
    };
  }

    //Score Update
  update () {
    this.scoreText.text = 'Score: ' + Math.round(this.score);

    //Meteor Spin
    this.meteors.forEachAlive(spin, this);
    function spin(item) {
      item.angle += 0.25;
    }

    //Movement Check
    this.alex.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
        this.alex.body.velocity.x = -600;
    } else if (this.cursors.right.isDown) {
        this.alex.body.velocity.x = 600;
    }
    
    //Death Check
    this.game.physics.arcade.overlap(this.meteors, this.alex, collision, null, this);

    //Death Action
    function collision(bullet, player) {
      bullet.kill();
      player.kill();
      this.state.start('Loss', true, false, this.score);
    }
  }
  
}
