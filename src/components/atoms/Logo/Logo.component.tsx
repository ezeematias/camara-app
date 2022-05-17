import React, { FC } from 'react'
import { View } from 'react-native';
import Image from '../Image/Image.component';
import { StyledSubtitle, StyledText, StyledView, StyledContainer } from './Logo.styled';

interface LogoProps{
  title:string;
  subtitle?:string;
}

const Logo:FC<LogoProps> = ({title,subtitle}) => {
  return (
    <StyledContainer>
      <StyledView>
        <StyledText>{title}</StyledText>
        {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
      </StyledView>
        <Image source={require('../../../../assets/shape.jpg')}/>
    </StyledContainer>
  )
}

export default Logo