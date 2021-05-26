import React from "react"
import { Button } from "semantic-ui-react"

const IntervalPicker = (props) => {
    const intervals = ["1m", "5m", "15m", "30m", "1h", "4h"];
    
    return (
      <div>
        {intervals.map((interval) => {
          const active = props.interval === interval;
          return (
            <Button
              onClick={() => props.onChange(interval)}
              color={active ? "teal" : null}
            >
              {interval}
            </Button>
          );
        })}
      </div>
    )
}

export default IntervalPicker