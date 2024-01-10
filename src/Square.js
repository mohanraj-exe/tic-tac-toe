import React from 'react';

export default function Square(props) {
  // console.log("button rendered", props.onClick, props.value);
  return (
    <button className="square" onClick={props.onClick}>{props.value}</button>
  )
}