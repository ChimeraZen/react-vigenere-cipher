import React from 'react'

export const Slider = (props) => {
  return (
    <div className="input-slider">
      <span className="input-on">{props.true ? props.true : "On"}</span>
      <span className="input-off">{props.false ? props.false : "Off"}</span>
      <div className={props.isOn ? "input-slider-bar on" : "input-slider-bar"}></div>
    </div>
  )
}

export default Slider
