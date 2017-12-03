import React from 'react';
import ReactDOM from 'react-dom';

import eu from '../images/eu.png';
import us from '../images/us.png';
import gb from '../images/gb.png';
import ch from '../images/ch.png';
import se from '../images/se.png';
import au from '../images/au.png';
import ca from '../images/ca.png';
import cz from '../images/cz.png';
import jp from '../images/jp.png';
import ru from '../images/ru.png';

class Header extends React.Component {
  render(){
    return <header>
        <div className="mainContainer">
        <div className ="centerHeader">
          <div className="logo">
          <h1 className="mainHeader">Walutomat</h1>
          </div>
        </div>
        </div>
      </header>
  }
}

var date = new Date();

class Calculator extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      amount: 100,
      fromWhat: 1,
      toWhat: 1,
      result: 0,
      currentRates: [],
      code: "",
      style: {
        display: "none"
      }
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
                      avarage[0].rates[29].mid.toFixed(2),
                      avarage[0].rates[7].code,
                      avarage[0].rates[1].code,
                      avarage[0].rates[10].code,
                      avarage[0].rates[9].code,
                      avarage[0].rates[17].code,
                      avarage[0].rates[2].code,
                      avarage[0].rates[4].code,
                      avarage[0].rates[13].code,
                      avarage[0].rates[12].code,
                      avarage[0].rates[29].code,

                    ]}
                  );
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

    this.setState({result: this.state.amount*rate,
      style: {display: "block"}
    })

    if(this.state.toWhat === 1) {
      this.setState({code: "PLN"})
    } else if(this.state.toWhat === this.state.currentRates[1]) {
      this.setState({code: "EUR"})
    } else if (this.state.toWhat === this.state.currentRates[2]) {
      this.setState({code: "USD"})
    } else if (this.state.toWhat === this.state.currentRates[3]) {
      this.setState({code: "GBP"})
    } else if (this.state.toWhat === this.state.currentRates[4]) {
      this.setState({code: "CHF"})
    } else if (this.state.toWhat === this.state.currentRates[5]) {
      this.setState({code: "SEK"})
    } else if (this.state.toWhat === this.state.currentRates[6]) {
      this.setState({code: "AUD"})
    } else if (this.state.toWhat === this.state.currentRates[7]) {
      this.setState({code: "CAD"})
    } else if (this.state.toWhat === this.state.currentRates[8]) {
      this.setState({code: "CZK"})
    } else if (this.state.toWhat === this.state.currentRates[9]) {
      this.setState({code: "JPY"})
    } else if (this.state.toWhat === this.state.currentRates[10]) {
      this.setState({code: "RUB"})
    } else { this.setState({code: "PLN"})
    }




  console.log(this.state.fromWhat);
  console.log(his.state.currentRates);
  console.log(this.state.currentRates[7])
  }

  render() {
    return <div>
    <div className="mainContainer avarageRates">
      <h1 className="headerAvarageRates">Kursy średnie NBP z dnia: {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</h1>
      <table>
        <tbody>
        <tr>
          <th>Waluta</th>
          <td><img src={eu}/>{this.state.currentRates[11]}</td>
          <td><img src={us}/>{this.state.currentRates[12]}</td>
          <td><img src={gb}/>{this.state.currentRates[13]}</td>
          <td><img src={ch}/>{this.state.currentRates[14]}</td>
          <td><img src={se}/>{this.state.currentRates[15]}</td>
          <td><img src={au}/>{this.state.currentRates[16]}</td>
          <td><img src={ca}/>{this.state.currentRates[17]}</td>
          <td><img src={cz}/>{this.state.currentRates[18]}</td>
          <td><img src={jp}/>{this.state.currentRates[19]}</td>
          <td><img src={ru}/>{this.state.currentRates[20]}</td>
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
    <div className="mainContainer">
    <h1 className="headerCalculator">Kalkulator walutowy</h1>
      <form>
        <label className="currency"><span>Waluta wyjściowa:</span>
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
        <label className="currency"><span>Waluta docelowa:</span>
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
        <label className="amount"><span>Jaką kwotę chcesz przeliczyć?</span>
          <input type="text" value={this.state.amount} onChange={this.handleAmountChange} />
          <button onClick={this.buttonClick}>Przelicz</button>
        </label>
      </form>
      <p style={this.state.style} className="result">Rezultat: <span className="resultNumber">{this.state.result.toFixed(2)}</span> {this.state.code}</p>
      </div>
      </div>
  }
}

class Footer extends React.Component {
  render(){
    return <div className="mainContainer">
    <p className="footer">Copyright &copy; 2017 Walutomat</p>
    </div>
  }
}

class App extends React.Component {
    render() {
        return <div>
          <Header />
          <Calculator />
          <Footer />
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
