import React, { useEffect, useState } from "react";
import { StyledView } from "./HomeScreen.styled";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ImageButton from "../../atoms/ImageButton/ImageButton.component";
import nice from "../../../../assets/niceoffice.jpg";
import messy from "../../../../assets/messy.jpg";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Spinner from "../../atoms/Spinner/Spinner.component";
import { db, storage } from "../../../InitApp";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { errorHandler } from "../../../utils/ErrorsHandler";
import { showMessage } from "react-native-flash-message";
import { getBlob } from "../../../utils/utils";

const HomeScreen = () => {
    const [imageType, setImageType] = useState<"nice" | "messy" | null>(null);
    const [loading, setLoading] = useState(false);
    const data: any = useSelector<any>((store) => store.auth);

    useEffect(() => {
        (async () => {
            await Camera.requestCameraPermissionsAsync();
        })();
    }, []);

    const uploadImage = async (image) => {
        // const blob: any = await new Promise((resolve, reject) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.onload = function () {
        //         resolve(xhr.response);
        //     };
        //     xhr.onerror = function (e) {
        //         console.log(e);
        //         reject(new TypeError("Network request failed"));
        //     };
        //     xhr.responseType = "blob";
        //     xhr.open("GET", image, true);
        //     xhr.send(null);
        // });
        setLoading(true);
        try {
            const blob:any = await getBlob(image);
            const fileName = image.substring(image.lastIndexOf("/") + 1);
            const fileRef = ref(storage, "images/" + fileName);
            await uploadBytes(fileRef, blob);
            await addDoc(collection(db, "images"), {
                user: data.user.email,
                votes: [],
                type: imageType,
                creationDate: new Date(),
                image: fileRef.fullPath,
            });
            showMessage({
                type: "success",
                message: "Exito",
                description: "Imágen cargada exitosamente",
            });
            await blob.close();
        } catch (e) {
            console.log(e);
            errorHandler("image-error");
        } finally {
            setLoading(false);
        }
    };

    const handleCamera = async (type) => {
        setImageType(tp => type);
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            await uploadImage(result["uri"]);
        }
    };

    return (
        <StyledView colors={["#a8c0ff", "#3f2b96"]}>
            {loading && <Spinner />}
            <ImageButton
                raise
                onPress={() => handleCamera("nice")}
                src={nice}
            />
            <ImageButton
                raise
                onPress={() => handleCamera("messy")}
                dislike
                src={messy}
            />
        </StyledView>
    );
};

export default HomeScreen;
