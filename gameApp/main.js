var game = new Phaser.Game("100%", "100%", Phaser.Auto, 'game');

game.state.add("Load", LoadState)
game.state.add("Menu", MenuState);
game.state.add("Game", GameState);
//game.state.add("Loss", LossState);

game.state.start('Load');