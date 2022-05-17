import React, { FC } from 'react'
import { StyledView } from './RegisterController.styled'
import { Control } from 'react-hook-form';
import { FormData } from '../../screens/LoginScreen/LoginScreen.component';
import ControlledInput from '../../molecules/ControlledInput/ControlledInput.component';
import ControlledPasswordInput from '../../molecules/ControlledPasswordInput/ControlledPasswordInput.component';
import FlashMessage from 'react-native-flash-message';
import AwesomeButton from '../../atoms/AwesomeButton/Button.component';
import Button from '../../atoms/Button/Button.component';

interface LoginControllerProps{
  control:Control<FormData, any>;
  handleSubmit:()=>void;
}

const RegisterController:FC<LoginControllerProps> = ({ control,handleSubmit}) => {
  return (
    <StyledView> 
      <ControlledInput autoCapitalize='none' name="email" placeholder='Email' control={control} />
      <ControlledPasswordInput autoCapitalize='none' name="password" placeholder='Contraseña' control={control} />
      <ControlledPasswordInput autoCapitalize='none' name="passwordRepeat" placeholder='Repetir contraseña' control={control} />
      <Button size='full' rounded onPress={handleSubmit} >Registrar cuenta</Button>
      {/* <AwesomeButton backgroundDarker="#b40000" textSize={22} textColor="white" backgroundColor="#f41d1d" type="primary" rounded height={60} onPress={handleSubmit}>Registrar</AwesomeButton> */}
    </StyledView>
  )
}

export default RegisterController