import React, { FC } from 'react'
import { View } from 'react-native';
import Image from '../Image/Image.component';
import { StyledSubtitle, StyledText, StyledView, StyledContainer } from './Logo.styled';

interface LogoProps{
  title:string;
  subtitle?:string;
}

const Logo:FC<LogoProps> = () => {
  return (
    <StyledContainer>
        <Image source={require('../../../assets/lente.png')}/>
    </StyledContainer>
  )
}
export default Logo