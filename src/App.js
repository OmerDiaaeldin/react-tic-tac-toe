import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Patch({number, handle}){
  return(<button className='square' onClick={handle}>{number}</button>)
}

function Board({patches, xIsNext, onPlay}) {

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i){
    if(patches[i] || calculateWinner(patches))
      return;
    const nextPatches = patches.slice();
    if(xIsNext){
      nextPatches[i] = 'X';
    }else{
      nextPatches[i] = "O";
    }

    onPlay(nextPatches);
  }

  const winner = calculateWinner(patches);
  let status;
  if(winner){
    status = "Winner: " + winner;
  }else{
    status = `${xIsNext?"X":"O"}'s turn`;
  }

  return (
    <div>
    <h2>{status}</h2>
    <div className='board'>
        <Patch number = {patches[0]} handle={() => handleClick(0)}/>
        <Patch number = {patches[1]} handle={() => handleClick(1)}/>
        <Patch number = {patches[2]} handle={() => handleClick(2)}/>
        <Patch number = {patches[3]} handle={() => handleClick(3)}/>
        <Patch number = {patches[4]} handle={() => handleClick(4)}/>
        <Patch number = {patches[5]} handle={() => handleClick(5)}/>
        <Patch number = {patches[6]} handle={() => handleClick(6)}/>
        <Patch number = {patches[7]} handle={() => handleClick(7)}/>
        <Patch number = {patches[8]} handle={() => handleClick(8)}/>
    </div>
    </div>
    )
}



export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = (currentMove%2===0);
  let currentPatches = history[currentMove];

  function onPlay(nextPatches){
    const nextHistory = [...history.slice(0, currentMove + 1), nextPatches];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove)

  }

  return(
    <div className = "game">
      <Board xIsNext = {xIsNext} patches = {currentPatches} onPlay = {onPlay}/>
      <ol>
        {history.map((squares, move) => {
          let description;
          if(move>0){
            description = "Go to move #" + move
          }else{
            description = "Go to game start"
          }
          return(
            <li>
              <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
