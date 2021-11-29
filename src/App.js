import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      status: "",
      countGame: 2,
      statusCount: "Идёт 1 игра",
      show: true,
      flag: false,

    }
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
        ]
      this.stats = {
        "X" : 0,
        "O" : 0,
      }

      this.flag = null;

      this.choose = <div onClick={this.showHide}>Первый ход<br /> <button>X</button><button onClick={this.change}>O</button></div>
  }

  showHide = () => this.setState((currentState) => ({show: !currentState.show}));

  change = () => {
    this.setState({ flag: true });
    this.setState({ count: 1 });
  }

  isWinner = () => {
    let s = (this.state.count % 2 === 0) ? "X" : "O";
    for (let i = 0; i < 8; i++){
      let line = this.winnerLine[i];
      if (this.state.squares[line[0]] === s && this.state.squares[line[1]] === s && this.state.squares[line[2]] === s) {
        this.setState({ status: `${(s === "X") ? "Первый" : "Второй"} игрок победил!`});
        this.stats[s]++;
        this.flag = true;
    }
      if ((this.state.flag === false && this.flag === null && this.state.count === 8) || (this.state.flag === true && this.flag === null && this.state.count === 9)){
          this.setState({status: "Ого, похоже, у вас ничья!"});
      }
    }
  }

  resetGame = () => {
    this.setState({ squares: Array(9).fill(null) });
    this.setState({ count: 0 });
    this.setState({ countGame: this.state.countGame + 1});
    this.setState({ statusCount: `Идёт ${this.state.countGame} игра`})
    this.flag = null;
    console.log(this.state.show);
    this.showHide();
    console.log(this.state.show);
  }

  clickHandler = e => {
    this.setState({ show: false})
    let data = e.target.getAttribute("data");
    let currenSquare = this.state.squares;
    if (currenSquare[data] === null) {
      currenSquare[data] = (this.state.count % 2 === 0) ? "X" : "O";
      this.setState({ count: this.state.count + 1 });
      this.setState({ squares: currenSquare});
    }
    this.isWinner();
    }

  render(){
    return (
      <div className="tic-tac-toe">
        <div className="ttt-grid" onClick={this.clickHandler} data="0">{this.state.squares[0]}</div>
        <div className="ttt-grid" onClick={this.clickHandler} data="1">{this.state.squares[1]}</div>
        <div className="ttt-grid" onClick={this.clickHandler} data="2">{this.state.squares[2]}</div>
        <div className="ttt-grid" onClick={this.clickHandler} data="3">{this.state.squares[3]}</div>
        <div className="ttt-grid" onClick={this.clickHandler} data="4">{this.state.squares[4]}</div>
        <div className="ttt-grid" onClick={this.clickHandler} data="5">{this.state.squares[5]}</div>
        <div className="ttt-grid" onClick={this.clickHandler} data="6">{this.state.squares[6]}</div>
        <div className="ttt-grid" onClick={this.clickHandler} data="7">{this.state.squares[7]}</div>
        <div className="ttt-grid" onClick={this.clickHandler} data="8">{this.state.squares[8]}</div>
        <br/>
        <button onClick={this.resetGame}>Начать новую игру</button>
        <p>Счёт:</p>
          <p>Первый игрок: {this.stats["X"]}</p>
          <p>Второй игрок: {this.stats["O"]}</p>
        <p>{this.state.statusCount}</p>
        <p>{this.state.status}</p>
        <div>{this.state.show && this.choose}</div>
      </div>
    );
  }
}
export default App;
