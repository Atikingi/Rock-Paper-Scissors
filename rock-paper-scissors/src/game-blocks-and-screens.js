export default class GameBlocksAndScreens {
  constructor() {
    this.gameWrapper = document.getElementById('game-wrapper');
  }

  // BLOCKS
  writeBlocks() {
    game.blocks['title'] = this.createTitle;
    game.blocks['login'] = this.createLoginField;

    game.blocks['lobby-list'] = this.createLobbyList;
    game.blocks['play-button'] = this.createPlayButton;
    game.blocks['exit-button'] = this.createExitButton;

    game.blocks['loader-title'] = this.createLoaderTitle;
    game.blocks['loader'] = this.createLoader;
    game.blocks['lobby-button'] = this.createLobbyButton;
    game.blocks['lobby-loader'] = this.createLobbyLoader;

    game.blocks['moves'] = this.crateMoves;
    game.blocks['play-title'] = this.createPlayTitle;
    game.blocks['win-title'] = this.createWinTitle;
    game.blocks['lose-title'] = this.createLoseTitle;
    game.blocks['draw-title'] = this.createDrawTitle;
    game.blocks['play-again'] = this.createPlayAgainButton;
    game.blocks['versus'] = this.createVersusField;
  }

  createTitle() {
    return templateEngine(GameBlocksAndScreens.titleTemplate);
  }

  createLobbyList() {
    return templateEngine(GameBlocksAndScreens.lobbyTemplate);
  }

  createPlayButton() {
    return templateEngine(GameBlocksAndScreens.playButtonTemplate);
  }

  createExitButton() {
    return templateEngine(GameBlocksAndScreens.exitButtonTemplate);
  }

  createLoginField() {
    return templateEngine(GameBlocksAndScreens.loginTemplate);
  }

  createLoaderTitle() {
    return templateEngine(GameBlocksAndScreens.titleLoaderTemplate);
  }

  createLoader() {
    return templateEngine(GameBlocksAndScreens.loaderTemplate);
  }

  createLobbyButton() {
    return templateEngine(GameBlocksAndScreens.lobbyButtonTemplate);
  }

  createLobbyLoader() {
    return templateEngine(GameBlocksAndScreens.lobbyLoaderTemplate);
  }

  createMoves() {
    return templateEngine(GameBlocksAndScreens.movesTemplate);
  }

  createPlayTitle() {
    return templateEngine(GameBlocksAndScreens.titlePlaysTemplate);
  }

  createWinTitle() {
    return templateEngine(GameBlocksAndScreens.winTitleTemplate);
  }

  createLoseTitle() {
    return templateEngine(GameBlocksAndScreens.loseTitleTemplate);
  }

  createDrawTitle() {
    return templateEngine(GameBlocksAndScreens.drawTemplate);
  }

  createPlayAgainButton() {
    return templateEngine(GameBlocksAndScreens.playAgainButtonTemplate);
  }

  createVersusField() {
    return templateEngine(GameBlocksAndScreens.versusTemplate);
  }

  // SCREENS

  writeScreens() {
    game.screens['login'] = this.createLoginScreen();

    game.screens['lobby'] = this.createLobbyScreen();

    game.screens['loader'] = this.createLoaderScreen();

    game.screens['moves'] = this.createMovesScreen();

    game.screens['win'] = this.createWinScreen();

    game.screens['lose'] = this.createLoseScreen();

    game.screens['draw'] = this.createDrawScreen();

    game.screens['versus'] = this.createVersusScreen();
  }

  createLoginScreen() {
    return [this.createTitle(), this.createLoginField()];
  }

  createLobbyScreen() {
    return [
      this.createTitle(),
      this.createLobbyList(),
      this.createPlayButton(),
      this.createExitButton(),
    ];
  }

  createLoaderScreen() {
    return [this.createLoaderTitle(), this.createLoader(), this.createLobbyButton()];
  }

  createMovesScreen() {
    return [this.createPlayTitle(), this.createMoves()];
  }

  createWinScreen() {
    return [
      this.createLobbyButton(),
      this.createWinTitle(),
      this.createPlayAgainButton(),
    ];
  }

  createLoseScreen() {
    return [
      this.createLobbyButton(),
      this.createLoseTitle(),
      this.createPlayAgainButton(),
    ];
  }

  createDrawScreen() {
    return [this.createDrawTitle()];
  }

  createVersusScreen() {
    return [this.createVersusField()];
  }

}

GameBlocksAndScreens.titleTemplate = {
  tag: 'h1',
  cls: 'game__title',
  text: 'Welcome to Rock-Paper-Scissors Game',
};

GameBlocksAndScreens.loginTemplate = {
  tag: 'div',
  cls: 'game__sign-up',
  content: [
    {
      tag: 'h4',
      cls: 'game__sign-up-title',
      id: 'sign-up-title',
      text: 'Enter your username',
    },
    {
      tag: 'div',
      cls: 'game__sign-up-username-wrapper',
      content: [
        {
          tag: 'form',
          cls: 'game__sign-up-form',
          attrs: {
            method: 'GET',
          },
          content: [
            {
              tag: 'input',
              cls: 'game__sign-up-username',
              attrs: {
                type: 'text',
                name: 'username',
                id: 'username',
                autocomplete: 'off',
                maxlength: '17',
                required: '',
              },
            },
            {
              tag: 'button',
              cls: ['game__menu-button', 'game__menu-button-sign-up'],
              id: 'button-sign-up',
              text: 'LOG IN',
            },
          ],
        },
      ],
    },
  ],
};

GameBlocksAndScreens.lobbyTemplate = {
  tag: 'div',
  cls: 'game__lobby',
  content: [
    {
      tag: 'p',
      cls: 'game__lobby-title',
      id: 'lobby',
      text: 'Players:',
    },
    {
      tag: 'div',
      cls: 'game__lobby-wrapper',
      id: 'players-list',
    },
  ],
};

GameBlocksAndScreens.lobbyLoaderTemplate = {
  tag: 'div',
  cls: 'game__lobby-loader',
  id: 'lobby-loader',
  content:[{
    tag: 'i',
    cls: ['fa-solid', 'fa-spinner', 'fa-spin-pulse'],
  },]
};

GameBlocksAndScreens.playButtonTemplate = {
  tag: 'button',
  cls: 'game__menu-button',
  id: 'button-play',
  text: 'PLAY',
};

GameBlocksAndScreens.exitButtonTemplate = {
  tag: 'button',
  cls: 'game__menu-button',
  id: 'button-exit',
  text: 'EXIT',
};

GameBlocksAndScreens.lobbyButtonTemplate = {
  tag: 'button',
  cls: 'game__menu-button__small',
  id: 'button-lobby',
  text: 'BACK TO LOBBY',
};

GameBlocksAndScreens.playAgainButtonTemplate = {
  tag: 'button',
  cls: 'game__menu-button__small',
  id: 'button-play-again',
  text: 'Play again',
};

GameBlocksAndScreens.titleLoaderTemplate = {
  tag: 'h1',
  cls: 'game__loader-title',
  id: 'loader-title',
  text: 'Waiting for an opponent',
};

GameBlocksAndScreens.loaderTemplate = {
  tag: 'div',
  cls: 'game__loader',
};

GameBlocksAndScreens.movesTemplate = {
  tag: 'div',
  cls: 'game__moves',
  id: 'game-moves',
  content: [
    {
      tag: 'img',
      cls: 'game__moves-item',
      id: 'paper',
      attrs: {
        alt: 'paper',
        width: '100',
        src: './public/img/paper.jpg',
      },
    },
    {
      tag: 'img',
      cls: 'game__moves-item',
      id: 'rock',
      attrs: {
        alt: 'rock',
        width: '100',
        src: './public/img/rock.jpg',
      },
    },
    {
      tag: 'img',
      cls: 'game__moves-item',
      id: 'scissors',
      attrs: {
        alt: 'scissors',
        width: '100',
        src: './public/img/scissors.jpg',
      },
    },
  ],
};

GameBlocksAndScreens.titlePlaysTemplate = {
  tag: 'h1',
  cls: 'game__loader-title',
  id: 'play-title',
  text: 'Your move',
};

GameBlocksAndScreens.winTitleTemplate = {
  tag: 'h1',
  cls: ['game__finish-title', 'game__finish-title__win'],
  text: 'YOU WIN!!!',
};

GameBlocksAndScreens.loseTitleTemplate = {
  tag: 'h1',
  cls: ['game__finish-title', 'game__finish-title__lose'],
  text: 'Sorry, you lose...',
};

GameBlocksAndScreens.versusTemplate = {
  tag: 'h1',
  cls: ['game__finish-title', 'game__finish-title__lose'],
  text: 'Sorry, you lose...',
};

GameBlocksAndScreens.versusTemplate = {
  tag: 'div',
  cls: 'game__versus',
  content: [
    {
      tag: 'p',
      cls: ['game__versus-player'],
      id: 'player1',
      text: 'Player 1',
    },
    {
      tag: 'p',
      cls: 'game__versus-text',
      text: 'VS',
    },
    {
      tag: 'p',
      cls: ['game__versus-player'],
      id: 'player2',
      text: 'Player 2',
    },
  ],
};

GameBlocksAndScreens.drawTemplate = {
    tag: 'p',
    cls: 'game__draw',
    text: 'DRAW!',
}