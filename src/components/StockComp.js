import React from 'react'


const StockComp = (props) => {    
        return(
            <div className="stock-display">
                {props.srch && <p>Stock Price: ${props.srch}</p>}
                {props.volume && <p>Stock Volume: ${props.volume}</p>}
                {props.error && <p>{props.error}</p>}
            </div>
        )    
}
export default StockComp