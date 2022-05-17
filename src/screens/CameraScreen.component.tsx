import React, { useState } from "react";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { StyledImage, StyledRow } from "./CameraScreen.styled";
import { TouchableOpacity } from "react-native";

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
                <TouchableOpacity

                    onPress={handleGoBack}
                >
                    Cancelar
                </TouchableOpacity>
                <TouchableOpacity

                    onPress={handleTakePicture}
                >
                    Tomar foto
                </TouchableOpacity>
            </StyledRow>
        </Camera>
    ) : (
        <StyledImage source={{ uri: image }}>
            <StyledRow>
                <TouchableOpacity

                    onPress={handleClosePreview}
                >
                    Tomar otra
                </TouchableOpacity>
                <TouchableOpacity

                    onPress={() => {}}
                >
                    Aceptar
                </TouchableOpacity>
            </StyledRow>
        </StyledImage>
    );
};

export default CameraScreen;
