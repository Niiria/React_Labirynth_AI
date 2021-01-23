import React, { useContext, useState } from 'react';
import { GameContex } from '../contex/GameContex';

export default function Menu() {
  const { initGame, level, setAuto, auto } = useContext(GameContex);
  const [levelMenu, setLevelMenu] = useState(false);

  return (
    <header>
      <ul className="p-2 flex justify-evenly text-3xl font bg-indigo-400 rounded-b-lg border-b-4 border-black">
        <li
          onMouseOver={() => setLevelMenu(true)}
          onFocus={() => {}}
          onMouseLeave={() => setLevelMenu(false)}
          className="relative z-30 p-2 bg-blue-400 transform duration-200 ease-out active:scale-110  cursor-pointer border-4 border-indigo-800 rounded-lg "
        >
          Select Level
          {levelMenu ? (
            <ul
              onMouseLeave={() => setLevelMenu(false)}
              className="absolute text-center rounded-b-md z-0 bg-blue-400 w-full left-0 "
            >
              <li className="hover:underline" onClick={() => initGame(1)}>
                1
              </li>
              <li className="hover:underline" onClick={() => initGame(2)}>
                2
              </li>
            </ul>
          ) : (
            <div />
          )}
        </li>

        <li
          onClick={() => initGame(level)}
          className="p-2 bg-blue-400 transform duration-200 ease-out active:scale-110  cursor-pointer border-4 border-indigo-800 rounded-lg "
        >
          Reset
        </li>
        <li
          onClick={() => {
            setAuto(!auto);
          }}
          className={`p-2 transform duration-200 ease-out active:scale-110  cursor-pointer border-4 border-indigo-800 rounded-lg ${
            auto ? 'bg-red-600' : 'bg-blue-400'
          }`}
        >
          Auto
        </li>
      </ul>
    </header>
  );
}
