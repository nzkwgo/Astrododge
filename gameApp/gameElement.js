import React, { Component } from 'react';
import GameInit from './main.js';


//We couldnt figure out how to get our game to render inside of a selected element
//This class will manipulate the game element through react-router for display 
class GameElement extends Component {

    render() {

        var gameInstance = document.querySelector('canvas');
        if (gameInstance) {
            gameInstance.style.display = "block";
        }
        return (
            <div id="game-container">
                
            </div>
        )
        
    }
}

export default GameElement;