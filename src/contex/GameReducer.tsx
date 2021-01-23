export default (state: any, { type, payload }: any) => {
  switch (type) {
    case 'PLAYER_MOVE': {
      return {
        ...state,
        gameMap: {
          ...state.gameMap,
          map: payload.tempGameMap,
          player: payload.tempPlayer,
        },
      };
    }
    case 'CHECK_FINISH': {
      return {
        ...state,
        finish: payload,
      };
    }

    case 'INIT_GAME': {
      return {
        ...state,
        gameMap: payload,
      };
    }

    case 'SET_CONTROL': {
      return {
        ...state,
        control: payload,
      };
    }

    case 'SET_LEVEL': {
      return {
        ...state,
        level: payload,
      };
    }

    case 'SET_AUTO': {
      return {
        ...state,
        auto: payload,
      };
    }

    case 'SET_DIRECTION': {
      return {
        ...state,
        playerDirection: payload,
      };
    }
    default:
      return state;
  }
};
