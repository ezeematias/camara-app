import React, { FC } from 'react'
import { Image, ImageSourcePropType, View } from 'react-native';
import AwesomeButton from '../AwesomeButton/Button.component'
import { StyledImage, StyledImageView, StyledInsideImage, StyledViewColor } from './ImageButton.styled';

interface ImageButtonProps{
    onPress:()=>void;
    src?:ImageSourcePropType;
    color?:string;
    icon?:boolean;
    raise?:boolean;
    rounded?:boolean;
    dislike?:boolean;
}

const ImageButton:FC<ImageButtonProps> = ({onPress,src=1, color='white', icon=false, raise=false, dislike=false}) => {
  return (
    <AwesomeButton raiseLevel={raise?15:6} stretch backgroundActive='gray' backgroundDarker='#c0c0c0' onPress={onPress} width={!icon?300:100} height={!icon?200:100} rounded>
        {src!=1 ?<StyledImage blurRadius={1.5} resizeMode="cover" source={src}>
          <StyledImageView>
            <StyledInsideImage style={{transform: [{ rotate: !dislike?'0deg':'180deg'}]}} source={require('../../../../assets/like.png')} resizeMode="cover" />
          </StyledImageView>
        </StyledImage>:<StyledViewColor color={color}/>}
    </AwesomeButton>
  )
}

export default ImageButton