import Phaser from 'phaser';

import Game from './Game.js';

import firebase from 'firebase';

var database = firebase.database();
var scoresData = database.ref('Scores');

//Assets

export default class extends Phaser.State {
    init (score) {
        this.scoreValue = score;
    }

    //Generates a page for the user to upload a new highscore
    create () {
        var background = this.game.add.sprite(0, 0, 'space');
        background.height = this.game.height;
        var button = this.game.add.button(this.game.world.centerX - 100, 100, 'start', start,this);
        button.angle = -30;

        this.userName = ''; //Initializes name
        
        
        var scoreText = this.game.add.text(0, 500, 'You Lost!', {fontsize: '32px', fill: '#ffffff', boundsAlignH: "center"});
        scoreText.text = "You Lost! Score: " + this.scoreValue + "\n(Click Alex's face or \npress enter to play again)";
        scoreText.setTextBounds(0, 100, 800);

        this.nameText = this.game.add.text(200, 800, 'Submit Name to Leaderboard: \n(Enter to Submit)', {fontsize: '32px', fill: '#ffffff'});
        //Retrieve keyboard presses from the player
        this.game.input.keyboard.addCallbacks(this, null, null, keyPress);
        this.textInput = this.game.add.text(this.game.world.centerX + 5, 575, "", {
            font: "28px Arial",
            fill: "#000",
            align: "center"
        });
        this.textInput.setText(this.textInput.text);
        this.textInput.anchor.setTo(0.5, 0.5);

        function keyPress(char) {
            this.userName += char;
        }

        //Keys for backspace and enter
        this.deleteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.ENTER ]);

        //Detect backspaces when typing the name
        this.deleteKey.onDown.add(deleteText, this);

        //allows user to delete characters
        function deleteText() {
            if (this.userName !== '') {
                this.userName = this.userName.slice(0, this.userName.length - 1);
            }
        }

        //Detect Enter when typing the name
        this.enterKey.onDown.add(start, this);


        //Send to Firebase Here
        function start() {
            if (this.userName === '') {
                this.userName = 'Alex';
            }
            var newScore = {ScoreValue: this.scoreValue, UserName: this.userName};
            scoresData.push(newScore);

            this.userName = '';
            this.state.start('Game');
        }
    }

    // user name displays in real time
    update() {
        this.nameText.text = 'Submit Name to Leaderboard:\n ' + this.userName + '\n(Submits on New Game)';

    }

    render () {}
    }
