//Asset Declarations
var background = 'gameApp/assets/space.png';
var alex = 'gameApp/assets/alex.png';
var AstroAlex = 'gameApp/assets/spaceAlex.png';
var meteor = 'gameApp/assets/meteor.png';


var LoadState = {
    preload: function() {
        this.load.image('background', background);
        this.load.image('start', alex);
        this.load.image('spaceAlex', AstroAlex);
        this.load.image('meteor', meteor);
    },

    create: function() {
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.pageAlignHorizontally = true;
        game.state.start('Menu');
    }
};