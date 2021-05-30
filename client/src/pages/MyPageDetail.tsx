import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    isPlatform
} from '@ionic/react';
import './Page.css';
import React, {useEffect, useState} from "react";
import firebase from "./Firebase";
import {Image, Text, View} from "react-native";
import {Plugins} from "@capacitor/core";
import ReactPlayer from "react-player";
import {SharedStyles} from "./GlobalStyle";

const {App} = Plugins;

var db = firebase.firestore();
var storage = firebase.app().storage("gs://photo-gallery00001.appspot.com")
var storageRef = storage.ref();

export default function MyPageDetail(props: any) {
    const [last, setLast]: any = useState({})
    const [result, setResult]: any = useState([]);

    const [fileType, setFileType]: any = useState([]);
    const [loading, setLoading]: any = useState(true);


    function getFileExtension3(filename: any) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    useEffect(() => {
        let selectItem = props.history.location.state.item;
        console.info("selectItem", selectItem);

        console.log("temp-===>", selectItem.imageUrl);

        let _re = getFileExtension3(selectItem.imageUrl);
        let fileExt = _re.split('?')[0]


        if (fileExt === 'jpg' || fileExt === 'png') {
            setFileType('pic')
        } else {
            setFileType('video')
        }
        setResult(selectItem)
        setLoading(false)
        App.addListener('backButton', (data: any) => {
            props.history.go(0)
        });
    }, [])


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" onClick={() => {
                        props.history.goBack();
                    }}>
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{padding: 0,}}>

                {fileType === 'pic' ?
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{uri: result.imageUrl}}
                               resizeMode={'contain'}
                               style={{width: isPlatform('mobile') ? '100%' : 800, height: 700}}/>
                    </View>
                    :
                    <ReactPlayer
                        controls={true}
                        playing={true}
                        //className='react-player'
                        url={result.imageUrl}
                        width={'100%'}
                        height={'auto'}
                    />
                }
                <View style={{padding: 35,}}>
                    {result.contents}
                </View>
                {!loading && result.comments !== undefined &&
                result.comments.map((item: any, index: number) => {
                    return (
                        <View style={{flexDirection: 'row', marginTop: 10,}}>
                            <View style={{flex: .20, justifyContent: 'center', alignItems: 'center', marginLeft: 10,}}>
                                <Image source={{uri: item.comments.avatar}}
                                       style={{width: 30, height: 30, borderRadius: 50}}/>
                            </View>
                            <View style={{
                                flex: .35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20,
                            }}>
                                <Text style={[SharedStyles.whiteText, {fontSize: 14, color: 'green'}]}>
                                    {item.comments.author.split('@')[0]}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: .45,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    marginLeft: 25,
                                }}>
                                <Text style={[SharedStyles.whiteText, {fontSize: 14, color: 'yellow'}]}>
                                    {item.comments.content}
                                </Text>
                            </View>
                        </View>
                    )
                })
                }
            </IonContent>
        </IonPage>
    );
};

