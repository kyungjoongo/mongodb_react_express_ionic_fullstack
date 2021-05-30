import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import './Page.css';
import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {ActivityIndicator, Text, TextInput, View} from "react-native";
import {SharedStyles} from "./GlobalStyle";
import {reactLocalStorage} from "reactjs-localstorage";
import firebase from "./Firebase";
import imageCompression from "browser-image-compression";
import _ from 'lodash'
// @ts-ignore
import {v4 as uuidv4} from 'uuid';

const db = firebase.firestore();
const storage = firebase.app().storage("gs://photo-gallery00001.appspot.com")
const storageRef = storage.ref();
const v4options = {
    random: [
        0x10,
        0x91,
        0x56,
        0xbe,
        0xc4,
        0xfb,
        0xc1,
        0xea,
        0x71,
        0xb4,
        0xef,
        0xe1,
        0x67,
        0x1c,
        0x58,
        0x36,
    ],
};

export default function AddFeedScreen(props: any) {

    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, [])

    useIonViewDidEnter(() => {
        try {
            let _googleUser = reactLocalStorage.getObject('googleUser')
            setGoogleUser(_googleUser)
            setRemoteImage('');
            setContents('');
            let image = document.getElementById('frame');
            // @ts-ignore
            image.src = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
            try {
                // @ts-ignore
                document.getElementById('frame').image.src = '';
            } catch (e) {

            }
            console.info("_googleUser====>", _googleUser);
        } catch (e) {
            alert(e.toString())
        }
    });

    const [remoteImage, setRemoteImage] = useState('');
    const [contents, setContents] = useState('');
    const [googleUser, setGoogleUser]: any = useState({
        imageUrl: '',
        email: '',
    })


    async function uploadFile() {
        setLoading(true)
        // @ts-ignore
        let selectFile = document.getElementById("cameraInput").files[0]
        setLoading(true);
        let newFileName = Math.random() + "_" + selectFile.name;

        var fileExt = newFileName.split('.').pop();

        if (fileExt === 'jpg' || fileExt === 'png') {
            const compressedFile = await imageCompression(selectFile, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            });
            console.info("compressedFile====>", compressedFile);
            await storageRef.child(`${newFileName}`).put(compressedFile).then(async (snapshot) => {
                console.log("snapshot====>", snapshot);
                return snapshot
            });
        } else {//todo:동영상일떄
            await storageRef.child(`${newFileName}`).put(selectFile).then(async (snapshot) => {
                console.log("snapshot====>", snapshot);
                return snapshot
            });
        }

        let imageUrl = await storageRef.child(`${newFileName}`).getDownloadURL();
        console.log("url====>", imageUrl);
        setLoading(false);
        setRemoteImage(imageUrl);
        await __insertFeedOne(imageUrl)


    }

    async function __insertFeedOne(imageUrl: any) {
        try {
            const docRef = db.collection('test').doc();
            let _result = await docRef.set({
                contents: contents,
                email: googleUser.email === undefined ? '아무개' : googleUser.email,
                authorImage: googleUser.email === undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZinWG8a5dwB2QOpCXxdOcn8G3TSVYkZ7VQ&usqp=CAU' : googleUser.imageUrl,
                imageUrl: imageUrl,
                date: new Date().toISOString(),
                clients: [],
                uuid: uuidv4(v4options),
            })
            setLoading(false)
            props.history.replace(`/tabs/tab1`, {
                fromAddFeed: true,
            });
            /*props.history.replace(`/tabs/tab1`, {
                fromAddFeed: true,
            });*/
        } catch (e) {
            setLoading(false)
            alert(e.toString())
        }

    };

    function renderForm() {
        return (
            <IonContent>
                <View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 50}}>
                        <View style={{flex: .7}}>
                            <input
                                type="file"
                                onChange={(event) => {
                                    let image = document.getElementById('frame');
                                    // @ts-ignore
                                    image.src = URL.createObjectURL(event.target.files[0]);
                                    //setIsExistPreviewImage(true);
                                }}
                                onInput={(event) => {

                                }}
                                id="cameraInput"
                                name="cameraInput"
                                //accept="image/png, image/jpeg"
                            />
                        </View>
                        <View style={{flex: .3}}>
                            <img id="frame"
                                 src={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
                                 width="100px" height="100px"/>
                        </View>
                    </View>
                    <View style={{justifyContent: "center", alignItems: 'center', marginHorizontal: 20,}}>
                        <TextInput
                            multiline={true}
                            style={{
                                backgroundColor: 'black',
                                height: 100,
                                color: 'white',
                                borderColor: 'white',
                                borderStyle: "solid",
                                borderWidth: 1,
                                marginTop: 1,
                                marginLeft: 0,
                                padding: 10,
                                width: '100%'
                            }}
                            onChangeText={(value) => {
                                setContents(value);
                            }}
                            onSubmitEditing={() => {
                            }}
                            placeholder='Plez, input Contents for picture'
                        />
                    </View>
                    <View style={{
                        marginHorizontal: 20,
                        marginTop: 50,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: 'white',
                        padding: 10,
                    }}>
                        <Text style={SharedStyles.whiteText}>
                            {_.isEmpty(googleUser.email) ? 'anonymous' : googleUser.email}
                        </Text>
                    </View>
                    <View style={{marginTop: 40}}/>
                    <View style={{marginHorizontal: 15,}}>
                        <IonButton
                            onClick={() => {
                                uploadFile();
                            }}
                            fill={'outline'}
                            color='primary'
                        >
                            Submit
                        </IonButton>
                    </View>
                </View>
            </IonContent>
        )

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>AddFeedScreen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {loading && <View style={{position: 'absolute', top: 110, zIndex: 9999, left:'48%'}}>
                    <ActivityIndicator color={'green'} size={'large'}/>
                </View>}
                {/*<View style={{backgroundColor: 'black'}}>
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: animationData,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }}
                        height={250}
                        width={250}
                    />
                </View>*/}
                {renderForm()}

            </IonContent>

        </IonPage>
    );
};


