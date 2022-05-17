import React, { FC } from 'react'
import { StyledRoundedButtonContainer, StyledView } from './LoginController.styled'
import Heading from '../../atoms/Heading/Heading.component';
import Button from '../../atoms/Button/Button.component';
import { Control } from 'react-hook-form';
import { FormData } from '../../screens/LoginScreen/LoginScreen.component';
import ControlledInput from '../../molecules/ControlledInput/ControlledInput.component';
import ControlledPasswordInput from '../../molecules/ControlledPasswordInput/ControlledPasswordInput.component';
import AwesomeButton from '../../atoms/AwesomeButton/Button.component';
import { View } from 'react-native';

interface LoginControllerProps{
  control:Control<FormData, any>;
  handleSubmit:()=>void;
  handleRegister:()=>void;
  fastSignIn:(data:FormData)=>void;
}

const LoginController:FC<LoginControllerProps> = ({control,handleSubmit, handleRegister, fastSignIn}) => {
  return (
    <StyledView >
      <View>
        <ControlledInput autoCapitalize='sentences' name="email" placeholder='Email' control={control} />
        <ControlledPasswordInput autoCapitalize='none' name="password" placeholder='Password' control={control} />
        <Button size='full' rounded onPress={handleSubmit}>Ingresar</Button>
        <Button variant='tertiary' size='xl' onPress={handleRegister}>Crear cuenta</Button>
      </View>
      <StyledRoundedButtonContainer>
        <AwesomeButton backgroundDarker="#1345cb" textSize={15} textColor="#1345cb" backgroundColor="white" type="primary" width={90} height={60} onPress={()=>fastSignIn({email:"admin@gmail.com", password:"Admin1234"})}>Admin</AwesomeButton>
        <AwesomeButton backgroundDarker="#1345cb" textSize={15} textColor="#1345cb" backgroundColor="white" type="primary" width={90} height={60} onPress={()=>fastSignIn({email:"tecnico@gmail.com", password:"Tecnico1234"})}>Tecnico</AwesomeButton>
        <AwesomeButton backgroundDarker="#1345cb" textSize={15} textColor="#1345cb" backgroundColor="white" type="primary" width={90} height={60} onPress={()=>fastSignIn({email:"cliente@gmail.com", password:"Cliente1234"})}>Cliente</AwesomeButton>
      </StyledRoundedButtonContainer>
    </StyledView>
  )
}

export default LoginController