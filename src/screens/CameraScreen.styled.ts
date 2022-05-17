import styled from "styled-components/native";
import { ImageBackgroundProps } from 'react-native';

export const StyledRow = styled.View`
    flex-direction:row;
    justify-content:space-around;
`

export const StyledImage = styled.ImageBackground<ImageBackgroundProps>`
    height:100%;
    width:100%;
    justify-content:flex-end;
`