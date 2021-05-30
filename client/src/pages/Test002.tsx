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


export default function Test002(props: any) {


    useIonViewDidEnter(() => {

    });

    useEffect(() => {
        getList();
    }, [])

    //const prefix = 'http://34.64.126.115:8000'
    //const prefix = 'http://localhost:8000'
    const prefix = 'http://kyungjoon2.ipdisk.co.kr:8000'

    async function postData() {
        let imageUrl = await uploadFile();

        let payload = {
            "name": name,
            "clientId": "kyungjoongo222",
            "clientPwd": "kyungjo23423ongo",
            "nickName": "kyungjo234234ongo",
            "sex": "kyungjoo234234432ngo",
            "phone": 123123123123,
            content: content,
            age: age,
            date: new Date(),
            image: imageUrl,
        };

        try {
            let res = await axios.post(`${prefix}/clients`, payload, {
                timeout: 10 * 1000,
            });
            let data = res.data;
            console.log(data);
            await getList();
        } catch (e) {
            alert(e.toString())
        }
    }

    async function getList() {
        try {
            setLoading(true)
            let res = await axios.get(`${prefix}/clients`);
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

    async function uploadFile() {
        setLoading(true)
        // @ts-ignore
        let selectFile = document.getElementById("cameraInput").files[0]
        setLoading(true);
        let newFileName = Math.random() + "_" + selectFile.name;

        const fileExt = newFileName.split('.').pop();

        /* const compressedFile = await imageCompression(selectFile, {
             maxSizeMB: 1,
             maxWidthOrHeight: 1920,
             useWebWorker: true
         });*/
        await storageRef.child(`${newFileName}`).put(selectFile).then(async (snapshot) => {
            console.log("snapshot====>", snapshot);
            return snapshot
        });
        let imageUrl = await storageRef.child(`${newFileName}`).getDownloadURL();
        console.log("remote saved url====>", imageUrl);
        setLoading(false);

        return imageUrl;
    }

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
                <View style={{height: 50}}/>
                <View>
                    <Input
                        size="large"
                        placeholder="배드 헌터를 입력하실요~~"
                        prefix={<UserOutlined/>}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <Input
                        size="large"
                        placeholder="배드 헌터를 content입력하실요~~"
                        prefix={<FacebookFilled/>}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                    />
                    <Input
                        size="large"
                        placeholder="배드 헌터를 age~"
                        prefix={<InstagramFilled/>}
                        onChange={(e) => {
                            setAge(parseInt(e.target.value))
                        }}
                    />
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
                    <View style={{flex: .3}}>
                        <img id="frame"
                             src={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
                             width="100px" height="100px"/>
                    </View>

                    <AButton type='primary' onClick={async () => {
                        postData();
                    }}>
                        post
                    </AButton>

                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <AButton type='default' onClick={async () => {

                        alert('sdlfksdlfklsdkf')
                    }}>
                        POST_SCREN
                    </AButton>

                    <WhiteSpace style={{height: 20,}}/>
                    <View style={{height: 50,}}/>
                </View>
                {loading && <View style={{position: "absolute", top: '35%', left: '48%'}}>
                    <ActivityIndicator color={'red'} size={'large'}/>
                </View>}
                {_.isEmpty(results) && loading && <ActivityIndicator color={'green'} size={'large'}/>}
                {results.map((item: any, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                props.history.push('/DetailTest002', {
                                    item: item,
                                })
                            }}
                            style={{flexDirection: "row", height: 50}} key={index.toString()}
                        >
                            <View style={{flex: .1}}>
                                <Text style={{color: 'white'}}>{index.toString()}</Text>
                            </View>
                            <View style={{flex: .3}}>
                                <Text style={{color: 'white'}}>{item.name}---{index.toString()}</Text>
                            </View>
                            <View style={{flex: .3, backgroundColor: 'transparent'}}>
                                <Text>{item.content}</Text>
                            </View>
                            <View style={{flex: .2, backgroundColor: 'transparent'}}>
                                <Text>{item.age}</Text>
                            </View>
                            <Button
                                color={'red'}
                                title={'Del'}
                                onPress={async () => {
                                    let _id = item._id
                                    let res = await axios.delete(`${prefix}/clients/${_id}`);
                                    if (res.status === 200) {
                                        message.success('delete success!!!')
                                        getList();
                                    }
                                }}
                            />
                            <Image source={{uri: item.image}} style={{width: 50, height: 50,}}/>
                        </TouchableOpacity>
                    )
                })}
            </IonContent>

        </IonPage>
    );
};


