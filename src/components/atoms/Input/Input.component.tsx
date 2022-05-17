import React, { FC } from 'react'
import { StyledInput } from './Input.styled';

const Input = ({...props}) => {
  return (
    <StyledInput mode="outlined" style={{borderTopLeftRadius:200}}
      outlineColor="#1345cb"
      activeOutlineColor="#0041ef"
      {...props}
    />
  )
}

export default Input