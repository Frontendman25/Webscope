import React from 'react'

export default function FirstToUpper(props) {
  const { text } = props
  return (
    <h3>{text.charAt(0).toUpperCase() + text.slice(1)}</h3>
  )
}