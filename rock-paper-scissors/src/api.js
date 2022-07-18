export default class GameAPI {
  API_URL = 'https://skypro-rock-scissors-paper.herokuapp.com/';

  showErrorMessage(){
    console.log('Server error');
  }

  checkServerStatus() {
    request({
      url: `${this.API_URL}ping`,
      onSuccess: (data) => {
        if (data.status !== 'ok') {
          this.showErrorMessage();
        }
      },
      onError: () => {
        this.showErrorMessage();
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
        this.showErrorMessage();
      },
    });
  }

  checkPlayerStatus(token, onSuccess) {
    request({
      url: `${this.API_URL}player-status`,
      params: {
        token,
      },
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        this.showErrorMessage();
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
        this.showErrorMessage();
      },
    });
  }

  checkGameStatus(token, id, onSuccess) {
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
        this.showErrorMessage();
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
        this.showErrorMessage();
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
        this.showErrorMessage();
      },
    });
  }
}
