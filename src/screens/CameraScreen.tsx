import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Alert,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Camera } from "expo-camera";
import { auth } from "../database/firebase";
let camera: Camera;

const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [lottieLoad, setLottieLoad] = React.useState(false);
    const [startCamera, setStartCamera] = React.useState(false);
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [capturedImage, setCapturedImage] = React.useState<any>(null);

    const [cameraType, setCameraType] = React.useState(
        Camera.Constants.Type.back
    );

    const [flashMode, setFlashMode] = React.useState("off");

    const __startCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        console.log(status);
        if (status === "granted") {
            setStartCamera(true);
        } else {
            Alert.alert("Access denied");
        }
    };

    const __takePicture = async () => {
        const photo: any = await camera.takePictureAsync();
        //console.log(photo);
        setPreviewVisible(true);
        //setStartCamera(false)
        setCapturedImage(photo);
    };
    const __savePhoto = () => {
        console.log("Saved photo");
     };

    const __retakePicture = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
        __startCamera();
    };

    const __handleFlashMode = () => {
        if (flashMode === "on") {
            setFlashMode("off");
        } else if (flashMode === "off") {
            setFlashMode("on");
        } else {
            setFlashMode("auto");
        }
    };

    const __switchCamera = () => {
        if (cameraType === "back") {
            setCameraType("front");
        } else {
            setCameraType("back");
        }
    };

    const turnoffcamera = () => {
        setStartCamera(false);
    };

    /// This funciotn is used to logout the user
    function handlerSingOut() {
        auth
            .signOut()
            .then(() => {
                setLottieLoad(true);
            })
            .then(() => {
                setTimeout(() => {
                    navigation.replace("Login");
                }, 1500);
            })
            .catch((error: any) => alert(error.message));
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff",
        }}>
            {startCamera ? (
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                    }}
                >
                    {previewVisible && capturedImage ? (
                        <CameraPreview
                            
                            photo={capturedImage}
                            savePhoto={__savePhoto}
                            retakePicture={__retakePicture}
                        />
                    ) : (
                        <Camera
                            type={cameraType}
                            flashMode={flashMode}
                            style={{ flex: 1 }}
                            ref={(r) => {
                                camera = r;
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    width: "100%",
                                    backgroundColor: "transparent",
                                    flexDirection: "row",
                                }}
                            >
                                <View
                                    style={{
                                        position: "absolute",
                                        left: "5%",
                                        top: "10%",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={__handleFlashMode}
                                        style={{
                                            backgroundColor: flashMode === "off" ? "#000" : "#fff",
                                            borderRadius:50,
                                            height: 25,
                                            width: 25,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20,
                                            }}
                                        >
                                            ⚡️
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={__switchCamera}
                                        style={{
                                            marginTop: 20,
                                            borderRadius: 50,
                                            height: 25,
                                            width: 25,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20,
                                            }}
                                        >
                                            {cameraType === "front" ? "🤳" : "📷"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        flexDirection: "row",
                                        flex: 1,
                                        width: "100%",
                                        padding: 20,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View
                                        style={{
                                            alignSelf: "center",
                                            flex: 1,
                                            alignItems: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={__takePicture}
                                            style={{
                                                width: 70,
                                                height: 70,
                                                bottom: 0,
                                                borderRadius: 50,
                                                backgroundColor: "#fff",
                                            }}
                                            />
                                            
                                            <TouchableOpacity
                                                onPress={turnoffcamera}
                                                style={{
                                                    flex: 1,
                                                    position: "absolute",
                                                    bottom: 0,
                                                    left: 10,
                                                    width: 50,
                                                    height: 50,
                                                }}
                                                activeOpacity={0.5}
                                            >
                                                <View>
                                                    <Text style={{ fontSize: 40, }}
                                                    >
                                                        ←
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Camera>
                    )}
                </View>
            ) : (
                    <View style={{ flexWrap: "wrap" }}>
                        
                    <TouchableOpacity
                        onPress={__startCamera}
                        style={{
                            right: 0,
                            width: "50%",
                            height: "100%",
                            justifyContent: "center",
                            backgroundColor: "#300c6b",
                        }}
                    >
                        <ImageBackground
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={require("../img/image.jpg")}
                        ></ImageBackground>

                        <Text
                            style={{
                                position: "absolute",
                                alignSelf: "center",
                                fontSize: 20,
                                color: "#ffffff",
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                backgroundColor: "rgba(0,0,0,0.7)",
                            }}
                        >
                            COSAS LINDAS
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={__startCamera}
                        style={{
                            left: 192,
                            width: "50%",
                            height: "100%",
                            justifyContent: "center",
                            backgroundColor: "#2e1818",
                        }}
                    >
                        <ImageBackground
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={require("../img/cosas_feas.jpg")}
                        ></ImageBackground>

                        <Text
                            style={{
                                position: "absolute",
                                alignSelf: "center",
                                fontSize: 20,
                                color: "#ffffff",
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                backgroundColor: "rgba(0,0,0,0.7)",
                            }}
                        >
                            COSAS FEAS
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                            style={{
                                position: "absolute",
                                alignSelf: "center",
                                bottom: 80,
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 16.0,
                                elevation: 24,
                        }}
                        onPress={handlerSingOut}
                        activeOpacity={0.5}
                    >
                            <Text
                                style={{
                                color: "white",
                                backgroundColor: "rgba(0,0,0,0.7)",
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                alignItems: "center",
                                height: 40,
                                marginBottom: 10,
                            }}>
                                Desloguear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            alignSelf: "center",
                            bottom: 20,
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.0,
                            elevation: 24,
                        }}
                        onPress={() => navigation.replace("Index")}
                        activeOpacity={0.5}
                    >
                            <Text
                                style={{
                                color: "white",
                                backgroundColor: "rgba(0,0,0,0.7)",
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                alignItems: "center",
                                height: 40,
                                marginBottom: 10,
                            }}>
                                Ver Fotos</Text>
                    </TouchableOpacity>
                </View>
            )}
            <StatusBar style="auto" />
        </View>
    );
};

export default HomeScreen;

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
    //console.log("Saved photo", photo);
    return (
        <View
            style={{
                backgroundColor: "transparent",
                flex: 1,
                width: "100%",
                height: "100%",
            }}
        >
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        padding: 15,
                        justifyContent: "flex-end",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity
                            onPress={retakePicture}
                            style={{
                                width: 130,
                                height: 40,
                                alignItems: "center",
                                borderRadius: 4,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 20,
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                }}
                            >
                                Tomar foto
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={savePhoto}
                            style={{
                                width: 130,
                                height: 40,
                                alignItems: "center",
                                borderRadius: 4,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 20,
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                }}
                            >
                                Guardar foto
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({

});
