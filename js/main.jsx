import React from 'react';
import ReactDOM from 'react-dom';
import { Router,
    Route,
    Link,
    IndexRoute,
    hashHistory } from 'react-router';

var date = new Date();

class Calculator extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      amount: 100,
      fromWhat: 1,
      toWhat: 1,
      result: 0,
      currentRates: []
    }
  }

  componentDidMount() {
      fetch('http://api.nbp.pl/api/exchangerates/tables/a/?format=json').then(	resp	=>	{
        if(resp.ok)
          return	resp.json();
           else
                throw	new	Error('Błąd	sieci!');
              }).then(	avarage	=>	{
                  this.setState({currentRates: [
                      1,
                      avarage[0].rates[7].mid.toFixed(2),
                      avarage[0].rates[1].mid.toFixed(2),
                      avarage[0].rates[10].mid.toFixed(2),
                      avarage[0].rates[9].mid.toFixed(2),
                      avarage[0].rates[17].mid.toFixed(2),
                      avarage[0].rates[2].mid.toFixed(2),
                      avarage[0].rates[4].mid.toFixed(2),
                      avarage[0].rates[13].mid.toFixed(2),
                      avarage[0].rates[12].mid.toFixed(2),
                      avarage[0].rates[29].mid.toFixed(2)
                    ]});
                  console.log(avarage)
              }).catch(	err	=>	{
                  console.log('Błąd!',	err);
              });
  }


  handleAmountChange = (event) => {
    this.setState({amount: event.target.value})
  };

  handleFromWhatChange = (event) => {
    this.setState({fromWhat: event.target.value})
  };

  handleToWhatChange = (event) => {
    this.setState({toWhat: event.target.value})
  }

  buttonClick = (event) => {
    event.preventDefault();

  var rate = this.state.fromWhat/this.state.toWhat;
  this.setState({result: this.state.amount*rate})

  }

  render() {
    return <div>
    <div>
      <h1>Kursy średnie NBP z dnia: {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</h1>
      <table>
        <tbody>
        <tr>
          <th>Waluta</th>
          <td>EUR</td>
          <td>USD</td>
          <td>GBP</td>
          <td>CHF</td>
          <td>SEK</td>
          <td>AUD</td>
          <td>CAD</td>
          <td>CZK</td>
          <td>JPY</td>
          <td>RUB</td>
        </tr>
        <tr>
          <th>Średni kurs</th>
          <td>{this.state.currentRates[1]}</td>
          <td>{this.state.currentRates[2]}</td>
          <td>{this.state.currentRates[3]}</td>
          <td>{this.state.currentRates[4]}</td>
          <td>{this.state.currentRates[5]}</td>
          <td>{this.state.currentRates[6]}</td>
          <td>{this.state.currentRates[7]}</td>
          <td>{this.state.currentRates[8]}</td>
          <td>{this.state.currentRates[9]}</td>
          <td>{this.state.currentRates[10]}</td>

        </tr>
        </tbody>
      </table>
    </div>
    <h1>Kalkulator walutowy</h1>
      <form>
        <label>Waluta wyjściowa:
          <select name={this.state.fromWhat} onChange={this.handleFromWhatChange}>
           <option value={this.state.currentRates[0]}>PLN (złoty)</option>
           <option value={this.state.currentRates[1]}>EUR (euro)</option>
           <option value={this.state.currentRates[2]}>USD (dolar amerykański)</option>
           <option value={this.state.currentRates[3]}>GBP (funt szterling)</option>
           <option value={this.state.currentRates[4]}>CHF (frank szwajcarski)</option>
           <option value={this.state.currentRates[5]}>SEK (korona szwedzka)</option>
           <option value={this.state.currentRates[6]}>AUD (dolar australijski)</option>
           <option value={this.state.currentRates[7]}>CAD (dolar kanadyjski)</option>
           <option value={this.state.currentRates[8]}>CZK (korona czeska)</option>
           <option value={this.state.currentRates[9]}>JPY (jen)</option>
           <option value={this.state.currentRates[10]}>RUB (rubel rosyjski)</option>
          </select>
        </label>
        <label>Waluta docelowa:
          <select name={this.state.toWhat} onChange={this.handleToWhatChange}>
          <option value={this.state.currentRates[0]}>PLN (złoty)</option>
          <option value={this.state.currentRates[1]}>EUR (euro)</option>
          <option value={this.state.currentRates[2]}>USD (dolar amerykański)</option>
          <option value={this.state.currentRates[3]}>GBP (funt szterling)</option>
          <option value={this.state.currentRates[4]}>CHF (frank szwajcarski)</option>
          <option value={this.state.currentRates[5]}>SEK (korona szwedzka)</option>
          <option value={this.state.currentRates[6]}>AUD (dolar australijski)</option>
          <option value={this.state.currentRates[7]}>CAD (dolar kanadyjski)</option>
          <option value={this.state.currentRates[8]}>CZK (korona czeska)</option>
          <option value={this.state.currentRates[9]}>JPY (jen)</option>
          <option value={this.state.currentRates[10]}>RUB (rubel rosyjski)</option>
          </select>
        </label>
        <label>Jaką kwotę chcesz przeliczyć?
          <input type="text" value={this.state.amount} onChange={this.handleAmountChange} />
          <button onClick={this.buttonClick}>Przelicz</button>
        </label>
      </form>
      <p>Rezultat: {this.state.result.toFixed(2)} </p>
      </div>
  }
}

class App extends React.Component {
    render() {
        return <div>
          <Calculator />
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
