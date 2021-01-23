import React, { createContext, useReducer } from 'react';
import GameReducer from './GameReducer';
import { gameMape } from '../data/gameMap.json';

const initialState = {
  finish: false,
  auto: false,
  playerDirection: 's',
  gameMap: {
    map: [],
    finishCords: { x: 0, y: 0 },
    player: { x: 0, y: 0 },
  },
  level: 1,
};

export const GameContex = createContext<any>(initialState);

export function GameContexProvider(props: any) {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  const setAuto = (bool: any) => {
    dispatch({
      type: 'SET_AUTO',
      payload: bool,
    });
  };

  const initGame = async (level: number) => {
    dispatch({
      type: 'INIT_GAME',
      payload: gameMape[level - 1],
    });
    dispatch({
      type: 'CHECK_FINISH',
      payload: false,
    });
    dispatch({
      type: 'SET_LEVEL',
      payload: level,
    });
  };

  const checkFinish = (x: any, y: any) => {
    if (
      x === state.gameMap.finishCords.x &&
      y === state.gameMap.finishCords.y
    ) {
      return true;
    }
    return false;
  };

  const playerMove = (direction: any) => {
    switch (direction) {
      case 'w': {
        dispatch({
          type: 'SET_DIRECTION',
          payload: direction,
        });
        break;
      }
      case 's': {
        dispatch({
          type: 'SET_DIRECTION',
          payload: direction,
        });
        break;
      }
      case 'a': {
        dispatch({
          type: 'SET_DIRECTION',
          payload: direction,
        });
        break;
      }

      case 'd': {
        dispatch({
          type: 'SET_DIRECTION',
          payload: direction,
        });
        break;
      }

      case 'r': {
        switch (state.playerDirection) {
          case 'w': {
            const tempDirection = 'a';
            dispatch({
              type: 'SET_DIRECTION',
              payload: tempDirection,
            });
            break;
          }
          case 's': {
            const tempDirection = 'd';
            dispatch({
              type: 'SET_DIRECTION',
              payload: tempDirection,
            });
            break;
          }
          case 'a': {
            const tempDirection = 's';
            dispatch({
              type: 'SET_DIRECTION',
              payload: tempDirection,
            });
            break;
          }
          case 'd': {
            const tempDirection = 'w';
            dispatch({
              type: 'SET_DIRECTION',
              payload: tempDirection,
            });
            break;
          }
        }
        break;
      }

      case 'rrr': {
        switch (state.playerDirection) {
          case 'w': {
            const tempDirection = 'd';
            dispatch({
              type: 'SET_DIRECTION',
              payload: tempDirection,
            });
            break;
          }
          case 's': {
            const tempDirection = 'a';
            dispatch({
              type: 'SET_DIRECTION',
              payload: tempDirection,
            });
            break;
          }
          case 'a': {
            const tempDirection = 'w';
            dispatch({
              type: 'SET_DIRECTION',
              payload: tempDirection,
            });
            break;
          }
          case 'd': {
            const tempDirection = 's';
            dispatch({
              type: 'SET_DIRECTION',
              payload: tempDirection,
            });
            break;
          }
        }
        break;
      }

      case 'e': {
        switch (state.playerDirection) {
          case 'a': {
            if (
              state.gameMap.map[state.gameMap.player.y][
                state.gameMap.player.x - 1
              ] >= 1
            ) {
              if (
                checkFinish(state.gameMap.player.x - 1, state.gameMap.player.y)
              ) {
                dispatch({
                  type: 'CHECK_FINISH',
                  payload: true,
                });
              }
              return false;
            }
            const tempGameMap = state.gameMap.map;
            const tempPlayer = state.gameMap.player;
            tempGameMap[tempPlayer.y][tempPlayer.x] = -1;
            tempGameMap[tempPlayer.y][tempPlayer.x - 1] = 'a';
            tempPlayer.x -= 1;
            dispatch({
              type: 'PLAYER_MOVE',
              payload: { tempGameMap, tempPlayer },
            });
            break;
          }
          case 'd': {
            if (
              state.gameMap.map[state.gameMap.player.y][
                state.gameMap.player.x + 1
              ] >= 1
            ) {
              if (
                checkFinish(state.gameMap.player.x + 1, state.gameMap.player.y)
              ) {
                dispatch({
                  type: 'CHECK_FINISH',
                  payload: true,
                });
              }
              return false;
            }
            const tempGameMap = state.gameMap.map;
            const tempPlayer = state.gameMap.player;
            tempGameMap[tempPlayer.y][tempPlayer.x] = -1;
            tempGameMap[tempPlayer.y][tempPlayer.x + 1] = 'd';
            tempPlayer.x += 1;
            dispatch({
              type: 'PLAYER_MOVE',
              payload: { tempGameMap, tempPlayer },
            });
            break;
          }
          case 'w': {
            if (
              state.gameMap.player.y - 1 < 0 ||
              state.gameMap.map[state.gameMap.player.y - 1][
                state.gameMap.player.x
              ] >= 1
            ) {
              if (
                checkFinish(state.gameMap.player.x, state.gameMap.player.y - 1)
              ) {
                dispatch({
                  type: 'CHECK_FINISH',
                  payload: true,
                });
              }
              return false;
            }
            const tempGameMap = state.gameMap.map;
            const tempPlayer = state.gameMap.player;
            tempGameMap[tempPlayer.y][tempPlayer.x] = -1;
            tempGameMap[tempPlayer.y - 1][tempPlayer.x] = 'w';
            tempPlayer.y -= 1;
            dispatch({
              type: 'PLAYER_MOVE',
              payload: { tempGameMap, tempPlayer },
            });
            break;
          }
          case 's': {
            if (
              state.gameMap.map.length <= state.gameMap.player.y + 1 ||
              state.gameMap.map[state.gameMap.player.y + 1][
                state.gameMap.player.x
              ] >= 1
            ) {
              if (
                checkFinish(state.gameMap.player.x, state.gameMap.player.y + 1)
              ) {
                dispatch({
                  type: 'CHECK_FINISH',
                  payload: true,
                });
              }
              return false;
            }
            const tempGameMap = state.gameMap.map;
            const tempPlayer = state.gameMap.player;
            tempGameMap[tempPlayer.y][tempPlayer.x] = -1;
            tempGameMap[tempPlayer.y + 1][tempPlayer.x] = 's';
            tempPlayer.y += 1;
            dispatch({
              type: 'PLAYER_MOVE',
              payload: { tempGameMap, tempPlayer },
            });
            break;
          }
        }
        break;
      }
      default:
        break;
    }
    return true;
  };

  return (
    <GameContex.Provider
      value={{
        player: state.player,
        playerMove,
        playerDirection: state.playerDirection,
        gameMap: state.gameMap,
        finish: state.finish,
        level: state.level,
        initGame,
        auto: state.auto,
        setAuto,
      }}
    >
      {props.children}
    </GameContex.Provider>
  );
}
