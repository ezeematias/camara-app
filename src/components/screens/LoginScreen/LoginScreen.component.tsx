import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginStackParamList } from '../../../navigation/stacks/LoginStack';
import {handleLogin} from "../../../redux/authReducer";
import Logo from "../../atoms/Logo/Logo.component";
import LoginController from '../../organisms/LoginController/LoginController.component';
import { StyledView } from "./LoginScreen.styled";
import Spinner from "../../atoms/Spinner/Spinner.component";
import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { showMessage } from 'react-native-flash-message';
import Image from "../../atoms/Image/Image.component";

type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

export type FormData={
    email:string;
    password:string;
    passwordRepeat?:string;
}

const LoginScreen:FC<LoginScreenProps> = ({navigation}) => {
    const {control, handleSubmit, getValues, setValue} = useForm<FormData>();
    const dispatch = useDispatch();
    const data:any = useSelector<any>(store => store.auth);

    const handleSignIn = (data:FormData) => {
        const values = getValues();
        if(!values.email || !values.password){
            showMessage({type:"danger", message:"Error", description:"Todos los campos son requeridos"});
            return;
        }
        dispatch(handleLogin(data));
    }

    const handleRegister = () => {
        navigation.push('Register');
    }

    const handleFastSignIn = (data:FormData) => {
        setValue("email", data.email);
        setValue("password", data.password);
    }

	return (
		<StyledView>
            {data.loading && <Spinner />}
            <Logo title="Camara" />
            <LoginController fastSignIn={handleFastSignIn} handleSubmit={handleSubmit(handleSignIn)} handleRegister={handleRegister} control={control} />
        </StyledView>
	);
};

export default LoginScreen;
