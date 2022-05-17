import { ImageBackgroundProps, ImageProps } from 'react-native';
import styled from "styled-components/native";

interface StyledViewColorProps{
    color:string
}

export const StyledImage = styled.ImageBackground<ImageBackgroundProps>`
    flex:1;
    align-items:center;
    justify-content:center;
    height:100%;
    width:100%;
`

export const StyledViewColor = styled.View<StyledViewColorProps>`
    border-radius:200px;
    height:50%;
    width:50%;
    background-color:${({color})=>color};
`

export const StyledInsideImage = styled.Image<ImageProps>`
    height:100px;
    width:100px;
`

export const StyledImageView = styled.View`
    background-color:white;
    border-radius:100px; 
    width:150px;
    justify-content:center;
    align-items:center; 
    height:150px;
`