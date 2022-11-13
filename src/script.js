import GameBlocksAndScreens from '/Rock-Paper-Scissors/src/game-blocks-and-screens.js';
import GameEvent from '/Rock-Paper-Scissors/src/game-event.js';

const gameWrapper = document.getElementById('game-wrapper');

window.game = {
  blocks: {},
  screens: {},
  renderScreen: function (screenName) {
    const screen = this.screens[screenName];
    gameWrapper.innerHTML = '';

    for (const block of screen) {
      gameWrapper.appendChild(block);
    }

    this.timers.map((e) => clearInterval(e));
    this.timers = [];
  },
  renderBlock: function (blockName, container) {
    if (!blockName) {
      console.log('Такого блока не существует');
      return;
    }

    const block = this.blocks[blockName]();
    container.appendChild(block);
  },
  timers: [],
  id: '',
};

const gameBlocksAndScreens = new GameBlocksAndScreens();

gameBlocksAndScreens.writeBlocks();
gameBlocksAndScreens.writeScreens();

const gameEvent = new GameEvent();

gameEvent.checkPlayerStatus();
