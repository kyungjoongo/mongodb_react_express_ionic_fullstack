import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {useParams} from 'react-router';
import './Page.css';
import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import axios from "axios";
import {ActivityIndicator, Button, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import YouTube from "react-youtube";
import firebase from "./Firebase";


function ListScreen(props: any) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [textValue, setTextValue] = useState('one+republic');

    const [pip, setPip] = useState(false);


    const [videoId, setVideoId] = useState(undefined);

    useEffect(() => {
        getYoutubePlaylist();
    }, [])




    function getYoutubePlaylist() {
        setLoading(true);
        let uri = `https://tidal-anvil-301306.dt.r.appspot.com/?q=${textValue}`
        axios({method: 'get', url: uri, timeout: 1000 * 15}).then(response => {
            console.log("dataList====>", response.data);
            setResults(response.data)
            setLoading(false);
        }).catch((message?: any) => {
            alert('sldkflsdkf--->' + message.toString());
            setLoading(false)
        });

    }


    const {name} = useParams<{ name: string; }>();

    function renderItemOne(item: any) {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{margin: 20,}}
                    onPress={() => {
                        setVideoId(item.id);
                        // props.history.push('/DetailScreen', {
                        //     videoId: item.id,
                        // })
                    }}
                >
                    <Image
                        style={{width: 360, height: 360 / 16 * 9, borderRadius: 25,}}
                        resizeMode={'cover'}
                        source={{uri: item.thumbnails[0].url}}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize: 20, color: 'white', lineHeight: 200,}}> {item.title}</Text>
                </View>
                <Text>sdlkfsdkfldk</Text>
                <Text>sdlkflsdkf</Text>

            </View>
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>ListScreen</IonTitle>
                </IonToolbar>
                <View style={{margin: 0, flexDirection: 'row', backgroundColor: 'black', padding: 10,}}>
                    <View style={{flex: .7}}>
                        <TextInput
                            style={{
                                backgroundColor: 'black',
                                height: 30,
                                color: 'white',
                                borderColor: 'white',
                                borderStyle: "solid",
                                borderWidth: 1,
                                marginTop: 1,
                                marginLeft: 10,
                                paddingLeft: 10,
                                paddingBottom: 2,
                            }}
                            onChangeText={(e) => {
                                setTextValue(e)
                            }}
                            onSubmitEditing={() => {
                                setResults([]);
                                getYoutubePlaylist();
                            }}
                            placeholder='Plez, input song name..'
                        />
                    </View>
                    <View style={{flex: .3, marginTop: -0.5, marginHorizontal: 10,}}>
                        <Button title={'submit'}
                                onPress={() => {
                                    setResults([]);
                                    getYoutubePlaylist();
                                }}
                        />
                    </View>
                </View>
                {videoId !== undefined &&
                <View style={{marginVertical: -10,}}>
                    <YouTube
                        //  ref={videoRef}
                        videoId={videoId}
                        opts={{
                            height: (window.innerWidth / 16 * 9).toString(),
                            width: window.innerWidth.toString(),
                            playerVars: {
                                autoplay: 1,
                            },
                        }}
                        onReady={() => {

                        }}
                    />
                    {/*  <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} width={window.innerWidth}
                                 stopOnUnmount={false}
                                 onEnablePIP={() => {
                                     alert('sdlklsdkf')
                                 }}
                                 pip={pip}
                                 height={250}
                    />*/}
                    {/*<Button title={'sdlkf'} onPress={() => {*/}
                    {/*    setPip(!pip);*/}
                    {/*}}/>*/}

                </View>
                }
            </IonHeader>
            <IonContent>
                {loading && <View style={{marginTop: 10, position: "relative", top: 1, width: '100%', zIndex: 999999}}>
                    <ActivityIndicator size={'large'} color={'green'}/>
                </View>}
                {results.map((item: any, index) => {
                    if (index < 15) {
                        return renderItemOne(item);
                    }
                })}
            </IonContent>


        </IonPage>
    );
};

export default ListScreen;
