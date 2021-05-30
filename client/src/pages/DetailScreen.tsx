import {
    IonBackButton, IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon, IonLoading,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {useParams} from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import React, {useEffect, useState} from "react";
import {Button, Card} from 'antd';
import {star} from "ionicons/icons";
import "antd/dist/antd.css";
import YouTube from "react-youtube";
import {Platform, View} from "react-native";


export default function DetailScreen(props: any) {

    const [loading, setLoadig] = useState(false);
    const [videoId, setVideoId] = useState('')
    useEffect(() => {
        console.log("sldfklsdkflkdsf====>", props.location.state.videoId);
        setVideoId(props.location.state.videoId);

    }, [])

    function _onReady(event: any) {
        //event.target.pauseVideo();
    }

    // @ts-ignore
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>DetailScreen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <View style={{marginVertical: 10,}}>
                    <YouTube videoId={videoId} opts={{
                        height: (window.innerWidth / 16 * 9).toString(),
                        width: window.innerWidth.toString(),
                        playerVars: {
                            autoplay: 1,
                        },
                    }} onReady={_onReady}/>
                </View>

            </IonContent>

        </IonPage>
    );
};


