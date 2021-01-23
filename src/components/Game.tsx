import React, { useContext, useEffect } from 'react';
import { GameContex } from '../contex/GameContex';
import boxArrow from '../assets/boxArrow.png';

export default function Game() {
  const {
    finish,
    gameMap,
    playerMove,
    initGame,
    level,
    auto,
    setAuto,
    playerDirection,
  } = useContext(GameContex);

  const displayMap =
    gameMap &&
    gameMap.map.map((row: any, index: number) => {
      return (
        <div className="flex " key={index}>
          {row.map((rowElement: any, index: number) => {
            switch (rowElement) {
              case 0:
                return <div key={index} className="labirynthBlock" />;
              case 1:
                return <div key={index} className="labirynthBlock bg-black" />;
              case -1:
                return (
                  <div key={index} className="labirynthBlock bg-red-500" />
                );
              case 2:
                return (
                  <div
                    key={index}
                    className="labirynthBlock text-3xl text-center bg-green-400"
                  />
                );
            }
            switch (playerDirection) {
              case 'w':
                return (
                  <div
                    key={index}
                    className="labirynthBlock flex justify-center items-center bg-purple-600 "
                  >
                    <img
                      src={boxArrow}
                      alt="boxArrow"
                      className="transform -rotate-90"
                    />
                  </div>
                );
              case 's':
                return (
                  <div
                    key={index}
                    className="labirynthBlock flex justify-center items-center bg-purple-600 "
                  >
                    <img
                      src={boxArrow}
                      alt="boxArrow"
                      className="transform rotate-90"
                    />
                  </div>
                );
              case 'a':
                return (
                  <div
                    key={index}
                    className="labirynthBlock flex justify-center items-center bg-purple-600 "
                  >
                    <img
                      src={boxArrow}
                      alt="boxArrow"
                      className="transform -rotate-180"
                    />
                  </div>
                );
              case 'd':
                return (
                  <div
                    key={index}
                    className="labirynthBlock flex justify-center items-center bg-purple-600 "
                  >
                    <img src={boxArrow} alt="boxArrow" className="transform " />
                  </div>
                );
            }
            return <div key={index}>{rowElement}</div>;
          })}
        </div>
      );
    });

  useEffect(() => {
    const interval = setInterval(() => {
      if (auto) {
        if (finish) {
          setAuto(!auto);
        }
        playerMove('r');
        if (playerMove('e') === false) {
          playerMove('rrr');
        }
      }
    }, 20);
    gameMap.map.length === 0 && initGame(level);
    const handleMove = (e: any) => {
      playerMove(e.key);
    };
    document.addEventListener('keydown', handleMove);
    return () => {
      document.removeEventListener('keydown', handleMove);
      clearInterval(interval);
    };
  }, [
    gameMap,
    initGame,
    level,
    playerMove,
    auto,
    gameMap.player.x,
    gameMap.player.y,
    finish,
    setAuto,
  ]);

  return (
    <div className="flex-grow flex justify-center items-center flex-col ">
      <h1 className="w-full text-center text-4xl">Level: {level}</h1>
      <div className="border-4 border-blue-600">
        {finish ? (
          <div
            onClick={() => {
              initGame(level);
            }}
            className="text-5xl cursor-pointer transform duration-700 hover:scale-150 m-5 rounded-lg p-4 text-green-600 font-bold bg-orange-300 text-shadow italic "
          >
            Finish!
          </div>
        ) : (
          <div> {displayMap}</div>
        )}
      </div>
    </div>
  );
}
