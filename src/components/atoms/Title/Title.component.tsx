import React, { FC } from 'react'
import { StyledHeading } from './Title.styled'
import { TextProps } from 'react-native';

interface HeadingProps extends TextProps{
  color?: 'primary' | 'secondary' | 'tertiary';
}

const Title:FC<HeadingProps> = ({children, color='primary',...props}) => {
  return (
      <StyledHeading color={color} {...props}>{children}</StyledHeading>
  )
}

export default Title