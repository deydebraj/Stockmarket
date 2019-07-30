import React from 'react';
import Find from './components/Find';
import Titles from './components/Titles';
import StockComp from './components/StockComp';

class App extends React.Component {
  state = {
    loading: true,
    stock: null,
    current: null,
    time: false,
    srch: null,
    volume: null,
    error: undefined
  }

  async componentDidMount(){

    //DOW JONES SECTION

    const urlDow = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DOW&interval=5min&apikey=J4YRCRC8QOA33Q922"
    const response = await fetch(urlDow)
    var data = await response.json()
    var stockSymbol = data["Meta Data"]["2. Symbol"] 
    
    //converting the json data into array
    var t1 = data["Time Series (5min)"];
    var res= Object.keys(t1).map(function(_) { return t1[_]; })
    //fetching the current stock value
    var currentPrice = res[0]["1. open"]

    //Display TIme 
    var date = new Date();
    var lastUpdated = date.toLocaleTimeString();

    //console.log(data["Time Series (5min)"])
    this.setState({
      loading: false,
      stock: stockSymbol,
      current: currentPrice,
      time: lastUpdated
    })
  }
  
  
  
  
  //SEARCHING YOUR STOCK

  getStocks = async(e) => {
    e.preventDefault();
    const name = e.target.elements.stockname.value;
    console.log(name)
    const api_call = await fetch (`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${name}&interval=5min&apikey=J4YRCRC8QOA33Q92`);
    const searchData = await api_call.json();
    var searchDataConvert = searchData["Time Series (5min)"];
    console.log(searchDataConvert)
    var arrSearch = Object.keys(searchDataConvert).map(function(_) { return searchDataConvert[_]; })
    var currentPriceSearch = arrSearch[0]["1. open"]
    var volSearch = arrSearch[0]["5. volume"]
    var date = new Date();
    if(name){
      this.setState({
        srch: currentPriceSearch,
        volume: volSearch,
        error : ""
      })
    }
    else{
        this.setState({
          srch: null,
          volume: null,
          error : "Please enter the stock symbol"
        })
    }
  } 


  render(){
   return(
     <div>
        <div className="row no-gutters">
          <div className="col-md-6 no-gutters">
          <div className='leftside'>
              <Titles />
              <div className="dowjones">
                {this.state.loading || !this.state.stock ? <div>loading...</div> 
                  :
                  <div className="dowjonesinside">
                    <p>Stock Symbol: {this.state.stock}</p>
                    <p>Current Price: ${this.state.current}</p>
                    <p>Last Updated: {this.state.time}</p>                
                  </div>}
              </div>
              
          </div>
       </div>
      
        <div className="col-md-6 no-gutters">
            <div className='rightside'>
             <Find 
              getStocks = {this.getStocks}
             />
            <StockComp 
            srch = {this.state.srch}
            volume = {this.state.volume}
            error = {this.state.error}
            />
           
            </div>
        </div> 
      </div>
     </div>
     
   )
  }
} 

export default App;
