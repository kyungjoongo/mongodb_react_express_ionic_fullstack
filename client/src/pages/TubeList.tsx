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
import {ActivityIndicator, Button, View, Text, TouchableOpacity, Image} from "react-native";
import firebase from "./Firebase";
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {Spin, Button as AButton, Input, message} from "antd";
import {FacebookFilled, InstagramFilled, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {WhiteSpace} from "antd-mobile";
import {TypeClient} from "./Types";
import _ from 'lodash'
import imageCompression from "browser-image-compression";


const db = firebase.firestore();
const storage = firebase.app().storage("gs://pistagram1.appspot.com")
const storageRef = storage.ref();


export default function TubeList(props: any) {

    useEffect(() => {
        getList();
    }, [])

    //const prefix = 'http://34.64.126.115:8000'
    //const prefix = 'http://localhost:8000'
    const prefix = 'http://kyungjoon2.ipdisk.co.kr:8000'


    async function getList() {
        try {
            setLoading(true)
            let res = await axios.get(`${prefix}/videos`);
            let data = res.data;
            console.log(data);
            setResults(data);
            setLoading(false)
        } catch (e) {
            alert(e.toString())
            setLoading(false)
        }
    }


    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const [age, setAge] = useState(0);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>배트헌터 신상 명세 입력!!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <View>
                    <Text>sldkfsdlkflsdkflksfd</Text>
                </View>
                <IonContent>
                    {results.map((item: any, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {

                                    props.history.push('/DetailScreen', {
                                        videoId: item.videoId,
                                    })
                                }}
                                style={{flexDirection: "column",}} key={index.toString()}
                            >
                                <Image source={{uri: item.thumbnails}} style={{width: 480, height: 360,}}/>
                                <View style={{flex: .1}}>
                                    <Text style={{color: 'white'}}>{index.toString()}</Text>
                                </View>
                                <View style={{flex: .3}}>
                                    <Text style={{color: 'white'}}>{item.title}---{index.toString()}</Text>
                                </View>
                                <View style={{flex: .3, backgroundColor: 'transparent'}}>
                                    <Text>{item.title}</Text>
                                </View>

                            </TouchableOpacity>
                        )
                    })}
                </IonContent>
            </IonContent>

        </IonPage>
    );
};


