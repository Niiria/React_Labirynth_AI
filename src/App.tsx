import React from 'react';
import './App.css';
import './assets/main.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { GameContexProvider } from './contex/GameContex';
import Game from './components/Game';
import Menu from './components/Menu';
import Footer from './components/Footer';

function App() {
  return (
    <HashRouter>
      <GameContexProvider>
        <Menu />
        <Switch>
          <Route path="/" component={Game} />
        </Switch>
        <Footer />
      </GameContexProvider>
    </HashRouter>
  );
}

export default App;
