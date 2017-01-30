var game = new Phaser.Game("100%", "100%", Phaser.Auto, 'game');


var config = {
    apiKey: "AIzaSyA39eaG9n2IuM9HPu9s4t5kDtXD-wRpkEo",
    authDomain: "running-challenge.firebaseapp.com",
    databaseURL: "https://running-challenge.firebaseio.com",
    storageBucket: "running-challenge.appspot.com",
    messagingSenderId: "809639999871"
};
firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function(error) {});
var database = firebase.database();
var scoresData = database.ref('Scores');

game.state.add("Load", LoadState);
game.state.add("Menu", MenuState);
game.state.add("Game", GameState);
//game.state.add("Loss", LossState);
game.state.add("Leaderboard", LeaderboardState);

game.state.start('Load');