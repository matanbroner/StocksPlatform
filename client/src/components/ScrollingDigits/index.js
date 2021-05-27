import React, { useState } from "react";

class ScrollingDigits extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      previousSum: props.sum,
      sum: props.sum,
      truesDigits: [],
    };
  }

  componentDidMount(){
      this.calculateSum(32.254, '-')
  }

  calculateSum(addValue, op) {
    let newSum;
    const { sum } = this.state;
    if (op === "-") {
      newSum = sum - addValue;
    } else {
      newSum = sum + addValue;
    }
    if (newSum <= 0) {
      this.setState({
        previousSum: this.state.sum,
        sum: 0,
      });
    } else {
      let digits = this.checkDigits(
        newSum.toString().split("").reverse(),
        sum.toString().split("").reverse()
      );
      this.setState(
        {
          previousSum: sum,
          sum: newSum,
          truesDigits: digits,
        },
        () => console.log(this.state.truesDigits)
      );
      setTimeout(() => {
        this.setState(
          {
            truesDigits: [],
          }
        );
      }, 500);
    }
  }

  checkDigits(newDigits, oldDigits) {
    let newNum = parseFloat(newDigits.reverse().join(""));
    let oldNum = parseFloat(oldDigits.reverse().join(""));
    let truesDigits = newDigits.map((digit, i) => {
      if (digit === ".") {
        return ".";
      }
      if (newDigits.length === oldDigits.length) {
        if (
          newNum < oldNum &&
          parseInt(newDigits[i]) < parseInt(oldDigits[i])
        ) {
          return { color: "red", bool: false };
        } else if (
          newNum > oldNum &&
          parseInt(newDigits[i]) > parseInt(oldDigits[i])
        ) {
          return { color: "green", bool: true };
        } else if (
          (newNum < oldNum &&
            parseInt(newDigits[i]) === parseInt(oldDigits[i])) ||
          (newNum > oldNum && parseInt(newDigits[i]) === parseInt(oldDigits[i]))
        ) {
          return null;
        } else {
            return null;
        }
      } else if(newDigits.length > oldDigits.length){
          return true;
      } else {
          return false;
      }
    });
    return truesDigits;
  }

  render(){
       return(
           <React.Fragment>
               Scrolling Digits
           </React.Fragment>
       )
  }
}

export default ScrollingDigits
