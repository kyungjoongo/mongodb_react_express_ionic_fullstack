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
import {Button} from "antd-mobile";

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

export default function AddCommentScreen(props: any) {

    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, [])

    useIonViewDidEnter(() => {

    });


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>sdlkflsdkflksdflk938245983249823498</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <View>
                    sdlkflsdkflksdflk938245983249823498
                </View>
                <Button onClick={() => {
                    props.history.goBack();
                }}>
                    submit
                </Button>
            </IonContent>

        </IonPage>
    );
};


