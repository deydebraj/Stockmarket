import React from 'react'
import Right from './right.jpg'
const Find = (props) => {
        return(
            <form onSubmit = {props.getStocks}>    
                    <img src={Right} alt="rightimage"></img>
                    <div className="text-right">
                        <h1>Search Stock by Stock Symbol</h1>
                        <input type="text" name="stockname" placeholder="enter stock-symbol (e.g. MSFT, AAPL, GOOGL etc...)" required></input>
                        <br/>
                        <button id="btn">GET STOCK</button>
                    </div>
            </form>
    )
}
export default Find