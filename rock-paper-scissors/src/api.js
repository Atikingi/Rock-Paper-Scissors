export default class GameAPI {
  API_URL = 'https://skypro-rock-scissors-paper.herokuapp.com/';

  checkServerStatus() {
    request({
      url: `${this.API_URL}ping`,
      onSuccess: (data) => {
        if (data.status !== 'ok') {
          console.log('Server error');
        }
      },
      onError: () => {
        console.log('Server error');
      },
    });
  }

  userLogin(username, onSuccess) {
    request({
      url: `${this.API_URL}login`,
      params: {
        login: username,
      },
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        console.log('Server error');
      },
    });
  }

  playerStatus(token, onSuccess) {
    request({
      url: `${this.API_URL}player-status`,
      params: {
        token,
      },
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        console.log('Server error');
      },
    });
  }

  startGame(token, onSuccess) {
    request({
      url: `${this.API_URL}start`,
      params: {
        token,
      },
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        console.log('Server error');
      },
    });
  }

  gameStatus(token, id, onSuccess) {
    request({
      url: `${this.API_URL}game-status`,
      params: {
        token,
        id,
      },
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        console.log('Server error');
      },
    });
  }

  playerMove(token, id, move) {
    request({
      url: `${this.API_URL}play`,
      params: {
        token,
        id,
        move,
      },
      onError: () => {
        console.log('Server error');
      },
    });
  }

  playerList(token, onSuccess) {
    request({
      url: `${this.API_URL}player-list`,
      params: {
        token,
      },
      onSuccess: (data) => {
        if (!data.list.length) {
          console.log('список игроков пуст');
          return;
        }

        onSuccess(data);
      },
      onError: () => {
        console.log('Server error');
      },
    });
  }
}

// const gameAPI = new GameAPI();
