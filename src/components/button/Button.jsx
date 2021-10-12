import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'
const Button = props => {
  return (
    <button
      className={`btn ${props.className}`}
      onCLick={props.onCLick ? () => props.onCLick() : null}
    >
      {props.children}
    </button>
  )
}
const OutlineButton = props => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      onCLick={props.onCLick ? () => props.onCLick() : null}
    >
      {props.children}
    </Button>
  )
}
Button.propTypes = {
  onCLick: PropTypes.func
}

export default Button
