import React from 'react'
import glamorous from 'glamorous'

const StyledFile = glamorous('div')({
  padding: '0.25rem 1rem',
  color: '#fff',
  borderBottom: '0.05rem solid #fff',
  cursor: 'pointer',
  ':hover': {
    background: '#373a49'
  }
})

export default ({ name }) => {
  return (
    <StyledFile>
      {name}
    </StyledFile>
  )
}
