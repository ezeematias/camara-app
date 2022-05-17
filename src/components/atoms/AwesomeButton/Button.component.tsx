import React, { FC } from 'react'
import { AwesomeButtonProps } from 'react-native-really-awesome-button';
import { StyledButton } from './Button.styled';

interface ButtonProps extends AwesomeButtonProps{
    onPress:()=>void;
    rounded?:boolean;
    type?: 'primary' | 'secondary';
    children: React.ReactNode;
}

const AwesomeButton:FC<ButtonProps> = (props) => {
  return (
      <StyledButton type={props.type} {...props}
        width={props.width} borderRadius={props.rounded?40:0}
        textSize={props.textSize} height={props.height} progress={props.progress}
        onPress={next => {
          setTimeout(() => {
            props.onPress()
            next();
          }, props.progress ? 1000 : 0);
        }}
      >
        {props.children}
      </StyledButton>
  )
}

AwesomeButton.defaultProps={
  width:300,
  height:80,
  textSize:23,
  rounded:false,
  progress:false
}

export default AwesomeButton