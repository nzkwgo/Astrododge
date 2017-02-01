//Leaderboard State
var LeaderboardState =  {



  //Generates a page to prompt the user to start playing
  create: function () {
    var background = game.add.sprite(0, 0, 'background');
    background.height = game.height;
    background.width = game.width;

    var titleStyle = { font: "120px Futura", fill: "#ffffff", align: "center"};
    var option = { font: "65px Futura", fill: "#ffffff", align: "center"};

    var title = game.add.text(game.world.centerX, game.world.centerY - 400, "Leaderboard", titleStyle);
    title.anchor.set(0.5);

    var scoresData = database.ref('Scores');
    var currentScores = [];
    var names = [];
    var scores = [];

    //Function for reading list of firebase data
    //There are two event listening functions, because we couldnt get either of them to work independently. 
    //Setting key id guarantees that there isnt duplicate information displayed, even though having two listeners puts duplicate data into our arrays
    scoresData.orderByChild("ScoreValue").limitToLast(50).once('value', function(snap) {
                    snap.forEach(function(snapshot) {

                    
                    
                        var highScore = {UserName: snapshot.val().UserName, ScoreValue: snapshot.val().ScoreValue, keyID: snapshot.key};
                        names.push(snapshot.val().UserName);
                        scores.push(snapshot.val().ScoreValue);
                        currentScores.push(highScore);
                    });
                });        


    function scoreCompare(p, q) {
        if (p < q) {
          return 1;
        }
        if (p > q) {
          return -1;
        }
        return 0;
    }
    console.log(currentScores);


    currentScores.reverse();
    console.log(currentScores);
    currentScores.sort(scoreCompare);
    console.log(currentScores[0]);
    function assignRanks(scoreList) {
        scoreList.sort(function(entry1, entry2) {
            if(entry1.ScoreValue != entry2.ScoreValue) {
                return entry2.ScoreValue - entry1.ScoreValue;
            } else {
                return entry1.UserName - entry2.UserName;
            }
        })
        var count = 1;
        scoreList.forEach(function(entry) {
            entry.rank = count;
            count++;
        })
    }
    assignRanks(currentScores);
    console.log(currentScores);
    console.log(names);
    console.log(scores);
    console.log(names.reverse());
    console.log(scores.reverse());
    console.log(names[0]);
    console.log(scores[0]);


    // var play = game.add.text(game.world.centerX, game.world.centerY, "Play", option);
    // play.anchor.set(0.5);
    // play.inputEnabled = true;
    // play.events.onInputDown.add(goGame);

    // var leaderboard = game.add.text(game.world.centerX, game.world.centerY + 80, "Leaderboard", option);
    // leaderboard.anchor.set(0.5);

    // var credits = game.add.text(game.world.centerX, game.world.centerY + 160, "Credits", option);
    // credits.anchor.set(0.5);

    // //Detect enter key and start game on press
    // this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    // game.input.keyboard.addKeyCapture([ Phaser.Keyboard.ENTER ]);
    // this.enterKey.onDown.add(goGame, this);


    function goGame() {
        game.state.start('Game');
    }

    function displayTen(index) {

    }

  }
};
