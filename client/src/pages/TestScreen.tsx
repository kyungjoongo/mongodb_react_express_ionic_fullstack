import {IonButton, IonContent, IonPage, useIonViewDidEnter} from '@ionic/react';
import './Page.css';
import React, {useEffect, useRef, useState} from "react";
import firebase from "./Firebase";
import {Plugins} from '@capacitor/core';
import {ActivityIndicator, View, Text} from "react-native";
import fs from 'fs'
//@ts-ignore
import {parse} from 'himalaya'
import {request} from "http";
import axios from "axios";
import iconv from "iconv-lite";
import _ from "lodash";

const cheerio = require('cheerio');
var jsonp = require('jsonp');

const {Toast, Device, AdMob} = Plugins;
const db = firebase.firestore();
const storage = firebase.app().storage("gs://photo-gallery00001.appspot.com")
const storageRef = storage.ref();
const useMountEffect = (fun: any) => useEffect(fun, [])

function TestScreen(props: any) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const ionInfiniteScrollRef = useRef(null);

    const [results, setResults]: any = useState([]);

    useEffect(() => {



    }, [])


    return (
        <IonPage>
            <IonContent>

                <div>
                    sdlfksdlkf
                </div>
                <div>
                    sdlfksdlkf
                </div>
                <div>
                    sdlfksdlkf
                </div>
                <View>
                    <Text>sdlfksdlkf</Text>
                </View>
                <View style={{margin: 10,}}>
                    <Text>고경준 천재님이십닌elkrsdlfk</Text>
                </View>
                <View>

                    <Text>sdlfksdlkf</Text>
                </View>
                <View style={{marginTop: 30,}}/>
                <ActivityIndicator color={'red'} size={'large'}/>
                <View style={{marginTop: 30,}}/>
                <ActivityIndicator color={'red'} size={'large'}/>
                <View style={{marginTop: 30,}}/>
                <ActivityIndicator color={'red'} size={'large'}/>
                <View style={{display: 'flex', flexDirection: 'row', marginHorizontal: 20, marginVertical: 30}}>
                    <View style={{flex: .33}}>
                        <IonButton
                            size='default'
                            fill={'outline'}
                            color='primary'
                            onClick={() => {
                                props.history.push('/TestScreen')
                            }}
                        >
                            고경준 3
                        </IonButton>
                    </View>
                    <View style={{flex: .33}}>
                        <IonButton
                            size='default'
                            fill={'outline'}
                            color='primary'
                            onClick={() => {
                                props.history.push('/TestScreen')
                            }}
                        >
                            고경준 3
                        </IonButton>
                    </View>
                    <View style={{flex: .33}}>
                        <IonButton
                            size='default'
                            fill={'outline'}
                            color='primary'
                            onClick={() => {
                                props.history.push('/TestScreen')
                            }}
                        >
                            고경준 3
                        </IonButton>
                    </View>
                </View>
            </IonContent>
        </IonPage>
    );
};

export default TestScreen;
