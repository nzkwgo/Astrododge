//Asset Declarations

//Game State
var GameState = {
  //Generates game objects for play state
  create: function () {
    var background = this.game.add.sprite(0, 0, 'background');
    background.height = this.game.height;
    background.width = this.game.width;

    //Set the score to 0 and put it on the screen
    this.score = 0;
    var scoreStyle = {font: "50px Futura", fill: "#ffffff"};
    this.scoreText = this.game.add.text(15, 15, 'score: 0', scoreStyle);
    
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //Spawns the Player
    this.alex = this.game.add.sprite(game.world.centerX, game.world.height, 'spaceAlex');
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
  },

    //Score Update
  update: function () {
    this.scoreText.text = 'Score: ' + Math.round(this.score);

    //Meteor Spin
    this.meteors.forEachAlive(spin, this);
    function spin(item) {
      item.angle += 0.25;
    }

    //Movement Check
    this.alex.body.velocity.x = 0;
    //TODO: Add dynamic speed relative to screen size
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
      // this.state.start('Loss', true, false, this.score);
    }
  }
  
};
