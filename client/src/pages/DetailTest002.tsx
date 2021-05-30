import {
    IonBackButton,
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
import {ActivityIndicator, Button, View, Text, Image} from "react-native";
import firebase from "./Firebase";
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {Spin, Button as AButton, Input} from "antd";
import {FacebookFilled, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {WhiteSpace} from "antd-mobile";
import {TypeClient} from "./Types";
import _ from 'lodash'


const db = firebase.firestore();
const storage = firebase.app().storage("gs://photo-gallery00001.appspot.com")
const storageRef = storage.ref();


export default function DetailTest002(props: any) {

    const [loading, setLoading] = useState(false);

    const [item, setItem]: any = useState<TypeClient | undefined>(undefined)

    useEffect(() => {
        setLoading(true)
        console.log("temp-===>", props.location.state.item);

        let _item = props.location.state.item;
        setItem(_item)

        console.log("name-===>", props.location.state.item.name);
        console.log("content-===>", props.location.state.item.content);
        setLoading(false)

    }, [])

    //const prefix = 'http://34.64.126.115:8000'
    const prefix = 'http://kyungjoon2.ipdisk.co.kr:8000'
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
                <View style={{height: 0}}/>
                <View>
                    {item !== undefined &&
                    <>
                        <Text>{item.name}</Text>
                        <Text>{item.content}</Text>
                        <Image
                            source={{uri: item.image !== undefined ? item.image : 'https://bohoon.co.kr/wp-content/uploads/sites/42/2020/04/placeholder.png'}}
                            resizeMode={'contain'}
                            style={{width: '100%', height: 650,}}/>
                    </>
                    }
                </View>
            </IonContent>

        </IonPage>
    );
};


