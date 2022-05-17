import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginStackParamList } from '../../../navigation/stacks/LoginStack';
import { Screens } from "../../../navigation/Screens";
import { handleRegister} from "../../../redux/authReducer";
import Logo from "../../atoms/Logo/Logo.component";
import { StyledContainer, StyledView } from "./RegisterScreen.styled";
import Spinner from "../../atoms/Spinner/Spinner.component";
import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RegisterController from '../../organisms/RegisterController/RegisterController.component';
import { showMessage } from "react-native-flash-message";
import Heading from "../../atoms/Heading/Heading.component";
import Title from "../../atoms/Title/Title.component";

type RegisterScreenProps = NativeStackScreenProps<LoginStackParamList, Screens.LOGIN>;

export type FormData={
    email:string;
    password:string;
    passwordRepeat?:string;
}

const RegisterScreen:FC<RegisterScreenProps> = ({navigation}) => {
    const {control, handleSubmit, getValues} = useForm<FormData>();
    const dispatch = useDispatch();
    const data:any = useSelector<any>(store => store.auth);

    const handleSignUp = () => {
        const values = getValues();
        if(!values.email || !values.password || !values.passwordRepeat){
            showMessage({type:"danger", message:"Error", description:"Todos los campos son requeridos"});
            return;
        }
        if(values.password !== values.passwordRepeat){
            showMessage({type:"danger", message:"Error", description:"Las contraseñas no coinciden"});
            return;
        }
        dispatch(handleRegister(values))
    }


	return (
        <StyledContainer>
            <StyledView>
                {data.loading && <Spinner />}
                <Title>Registro</Title>
                <RegisterController handleSubmit={handleSubmit(handleSignUp)} control={control} />
            </StyledView>
        </StyledContainer>
	);
};

export default RegisterScreen;
