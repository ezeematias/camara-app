import React, { useState } from "react";
import { Camera } from "expo-camera";
import AwesomeButton from "../../atoms/AwesomeButton/Button.component";
import { useNavigation } from "@react-navigation/native";
import Spinner from "../../atoms/Spinner/Spinner.component";
import { StyledImage, StyledRow } from "./CameraScreen.styled";

const CameraScreen = ({}) => {
    const navigation = useNavigation();
    const [camera, setCamera] = useState<any>(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleClosePreview = () => {
        setImage(null);
    };

    const handleTakePicture = async () => {
        setLoading(true);
        const data = await camera.takePictureAsync(null);
        setImage(data.uri);
        setLoading(false);
    };

    return !image ? (
        <Camera
            ref={(ref) => setCamera(ref)}
            style={{ flex: 1, justifyContent: "flex-end" }}
            type="back"
        >
            <StyledRow>
                {loading && <Spinner />}
                <AwesomeButton
                    textSize={15}
                    type="secondary"
                    width={180}
                    height={45}
                    onPress={handleGoBack}
                >
                    Cancelar
                </AwesomeButton>
                <AwesomeButton
                    textSize={15}
                    width={180}
                    height={45}
                    onPress={handleTakePicture}
                >
                    Tomar foto
                </AwesomeButton>
            </StyledRow>
        </Camera>
    ) : (
        <StyledImage source={{ uri: image }}>
            <StyledRow>
                <AwesomeButton
                    textSize={15}
                    type="secondary"
                    width={180}
                    height={45}
                    onPress={handleClosePreview}
                >
                    Tomar otra
                </AwesomeButton>
                <AwesomeButton
                    textSize={15}
                    width={180}
                    height={45}
                    onPress={() => {}}
                >
                    Aceptar
                </AwesomeButton>
            </StyledRow>
        </StyledImage>
    );
};

export default CameraScreen;
