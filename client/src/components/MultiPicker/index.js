import React from "react"
import { Button } from "semantic-ui-react"

const MultiPicker = (props) => {
    return (
      <div>
        {props.items.map((item) => {
          const active = props.activeItems.indexOf(item) !== -1;
          return (
            <Button
              key={item}
              onClick={() => props.onChange(item)}
              color={active ? "teal" : null}
            >
              {item}
            </Button>
          );
        })}
      </div>
    )
}

export default MultiPicker