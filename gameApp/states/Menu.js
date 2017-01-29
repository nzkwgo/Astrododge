//Menu State
var MenuState =  {



  //Generates a page to prompt the user to start playing
  create: function () {
    var background = game.add.sprite(0, 0, 'background');
    background.height = game.height;
    background.width = game.width;

    var titleStyle = { font: "120px Futura", fill: "#ffffff", align: "center"};
    var option = { font: "65px Futura", fill: "#ffffff", align: "center"};

    var title = game.add.text(game.world.centerX, game.world.centerY - 400, "AstroDodge", titleStyle);
    title.anchor.set(0.5);

    var play = game.add.text(game.world.centerX, game.world.centerY, "Play", option);
    play.anchor.set(0.5);
    play.inputEnabled = true;
    play.events.onInputDown.add(goGame);

    var leaderboard = game.add.text(game.world.centerX, game.world.centerY + 80, "Leaderboard", option);
    leaderboard.anchor.set(0.5);

    var credits = game.add.text(game.world.centerX, game.world.centerY + 160, "Credits", option);
    credits.anchor.set(0.5);

    //Detect enter key and start game on press
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.ENTER ]);
    this.enterKey.onDown.add(goGame, this);


    function goGame() {
        game.state.start('Game');
    }

  }
};
