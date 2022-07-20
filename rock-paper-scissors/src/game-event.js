import GameAPI from '/rock-paper-scissors/src/api.js';
import GameData from '/rock-paper-scissors/src/game-data.js';

export default class GameEvent {

  API = new GameAPI();
  GAME_DATA = new GameData();

  USER_TOKEN = this.GAME_DATA.get('token');
  GAME_ID = this.GAME_DATA.get('id');
  PLAYER_NAME = this.GAME_DATA.get('username');

  PLAYER_ID = 1;
  FIRST_MOVE = true;

  constructor() {
    this.container = document.getElementById('game-wrapper');

    this.API.checkServerStatus();
  }

  // login screen
  loginScreenEvent() {
    this.signInButton = document.getElementById('button-sign-up');
    this.username = document.getElementById('username');

    this.username.addEventListener('keypress', (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
      }
    });

    this.signInButton.addEventListener('click', (event) => {
      event.preventDefault();

      document
        .getElementById('sign-up-title')
        .classList.remove('game__sign-up-username__error');

      if (this.username.value === '') {
        document
          .getElementById('sign-up-title')
          .classList.add('game__sign-up-username__error');
        setTimeout(() => {
          document
            .getElementById('sign-up-title')
            .classList.remove('game__sign-up-username__error');
        }, 2000);
        return;
      }

      this.API.userLogin(this.username.value, (response) => {
        this.USER_TOKEN = response.token;
        this.PLAYER_NAME = this.username.value;

        this.GAME_DATA.add('username', this.username.value);
        this.GAME_DATA.add('token', response.token);

        this.checkPlayerStatus();
      });
    });
  }

  // Click handlers
  exitFromTheGame() {
    document.getElementById('button-exit').addEventListener('click', (event) => {
      event.preventDefault();

      this.GAME_DATA.remove('token');
      this.GAME_DATA.remove('id');
      this.GAME_DATA.remove('username');

      this.FIRST_MOVE = true;

      game.renderScreen('login');
    });
  }

  startGame(buttonId) {
    document.getElementById(buttonId).addEventListener('click', () => {
      this.API.startGame(this.USER_TOKEN, (response) => {

        if (response.status === 'error') {
          return;
        }

        game['id'] = response['player-status'].game.id;
        this.GAME_DATA.add('id', response['player-status'].game.id);
      });

      game.renderScreen('loader');
      this.backToLobby();
      this.FIRST_MOVE = true;

      this.gameStatusSetInterval();
    });
  }

  backToLobby() {
    document.getElementById('button-lobby').addEventListener('click', () => {
      game.renderScreen('lobby');

      this.GAME_DATA.remove('id');

      this.exitFromTheGame();
      this.startGame('button-play');
      this.FIRST_MOVE = true;

      this.getPlayerList();
    });
  }

  playerMoveHandler() {
    document.getElementById('game-moves').addEventListener(
      'click',
      (event) => {
        const { target } = event;

        if (target.id !== 'rock' && target.id !== 'paper' && target.id !== 'scissors') {
          return;
        }

        this.API.playerMove(
          this.USER_TOKEN,
          game.id === '' ? this.GAME_DATA.getValue('id') : game.id,
          target.id
        );

        game.renderScreen('loader');

        document.getElementById('loader-title').textContent = 'Waiting opponent move';
        this.backToLobby();

        this.gameStatusSetInterval();
      },
      { once: true }
    );
  }

  //Game and player status checkers

  checkPlayerStatus() {
    this.API.checkPlayerStatus(this.USER_TOKEN, (response) => {

      if (response.status === 'error') {
        game.renderScreen('login');
        this.loginScreenEvent();
        console.log('Игрока с таким токеном не существует');
        return;
      }

      if (
        this.GAME_DATA.getValue('token') &&
        response['player-status'].status === 'lobby'
      ) {
        game.renderScreen('lobby');

        this.getPlayerList();

        this.exitFromTheGame();
        this.startGame('button-play');
      }

      if (
        this.GAME_DATA.getValue('token') &&
        response['player-status'].status === 'game'
      ) {
        game.renderScreen('loader');

        document.getElementById('loader-title').textContent = 'Waiting opponent move';
        this.backToLobby();

        if (document.getElementById('button.exit')) {
          this.exitFromTheGame();
        }

        this.gameStatusSetInterval();
      }
    });
  }

  checkGameStatus() {
    this.API.checkGameStatus(
      this.USER_TOKEN,
      game.id === '' ? this.GAME_DATA.getValue('id') : game.id,
      (response) => {

        if (response.status === game.status.error) {
          game.renderScreen('lobby');
          return;
        }

        if (response['game-status'].status === game.status.waitingPlayer) {
          if (this.FIRST_MOVE){
            this.showVersusScreen(response);

            setTimeout(() => {
              game.renderScreen('moves');

              this.FIRST_MOVE = false;
              this.playerMoveHandler();
            }, 2500);
          }else{
            game.renderScreen('draw');
            setTimeout(() => {
              game.renderScreen('moves');
              this.playerMoveHandler();
            }, 2500);
          }
        }

        if (response['game-status'].status === game.status.lose) {
          game.renderScreen('lose');

          this.FIRST_MOVE = true;

          this.backToLobby();
          this.startGame('button-play-again');
        }

        if (response['game-status'].status === game.status.win) {
          game.renderScreen('win');

          this.FIRST_MOVE = true;

          this.backToLobby();
          this.startGame('button-play-again');
        }
      }
    );
  }

  gameStatusSetInterval() {
    game.timers.push(
      setInterval(() => {
        this.checkGameStatus();
      }, 600)
    );
  }

  getPlayerList() {
    game.renderBlock('lobby-loader', document.getElementById('lobby'));
    game.timers.push(
      setInterval(() => {
        this.API.playerList(this.USER_TOKEN, (response) => {
          this.playersList = document.getElementById('players-list');
          this.lobbyLoader = document.getElementById('lobby-loader');

          if(this.lobbyLoader){
            this.lobbyLoader.remove();
            this.lobbyLoader = undefined;
          }

          this.playersList.innerHTML = '';

          response.list.forEach((element) => {
            const { login, wins, loses, you } = element;

            this.playersList.appendChild(
              templateEngine(
                GameEvent.playersListTemplate(login, wins, loses, this.PLAYER_ID)
              )
            );

            if (you) {
              document
                .getElementById(`player${this.PLAYER_ID}`)
                .classList.add('game__lobby-current-player');
            }

            this.PLAYER_ID += 1;
          });
        });
      }, 2000)
    );
  }

// versus screen

  showVersusScreen(response) {
    game.renderScreen('versus');
    
    this.player1 = document.getElementById('player1');
    this.player2 = document.getElementById('player2');

    this.player1.textContent = this.PLAYER_NAME;
    this.player2.textContent = response['game-status'].enemy.login;

    setTimeout(() => {
      this.player1.style.left = '0px';
      this.player2.style.left = '0px';
    }, 100);

    this.player1.style.left = '-5555px';
    this.player2.style.left = '5555px';
  }
}

GameEvent.playersListTemplate = (username, wins, loses, id) => [
  {
    tag: 'span',
    cls: 'game__lobby-player',
    text: `${username} (W:${wins} / L:${loses})`,
    id: `player${id}`,
  },
];
