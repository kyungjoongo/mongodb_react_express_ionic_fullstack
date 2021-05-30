import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {reactLocalStorage} from "reactjs-localstorage";
import './Page.css';
import React, {useEffect, useState} from "react";
import firebase from "./Firebase";
import {Button, View, Text, Platform} from "react-native";
import {Capacitor, Device, Plugins} from '@capacitor/core';
import GoogleLogin from "react-google-login";
import {isMobile, isAndroid, isBrowser, isMobileOnly} from 'react-device-detect';
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import {BackButtonEvent} from '@ionic/core';
import {listCircle, logoInstagram} from "ionicons/icons";
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import KakaoLogin from "react-kakao-login";
import {Button as AButton} from 'antd'
import {GooglePlusOutlined, SearchOutlined} from "@ant-design/icons/lib";
import {KakaoLoginBtn} from "./KakaoLoginButton";

let db = firebase.firestore();
let storage = firebase.app().storage("gs://photo-gallery00001.appspot.com")
let storageRef = storage.ref();

const {App, Modals, AdMob} = Plugins;

declare interface TypeGoogleProfileForWeb {
    "googleId": "105885850593797690726",
    "imageUrl": "https://lh5.googleusercontent.com/-7E11iPlDhgA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnuYgNkYEz2m_tS3CEbWxeU2X1TQA/s96-c/photo.jpg",
    "email": "sportyman77777@gmail.com",
    "name": "Spory Man777",
    "givenName": "Spory",
    "familyName": "Man777"
}

function LoginScreen(props: any) {
    useEffect(() => {
    }, [])

    const [platform, setPlatForm] = useState('')
    const [loading, setLoading] = useState(true)

    function goNext() {
        props.history.replace('/Test002')

    }

    function renderGoogleLogin() {

        return (
            <View style={{flex: 1}}>
                {Capacitor.isNative ?
                    // todo:########################
                    // todo: nativeLogin
                    // todo:########################
                    <React.Fragment>
                        <GoogleLoginButton
                            style={{height: 40}}
                            onClick={async () => {
                                try {
                                    let _googleUser = await Plugins.GoogleAuth.signIn()
                                    reactLocalStorage.setObject('googleUser', _googleUser)

                                    props.history.replace('/tabs/tab1', {
                                        googleUser: _googleUser,
                                    })
                                } catch (e) {
                                    alert(e.toString())
                                }
                            }}
                        >
                        </GoogleLoginButton>
                    </React.Fragment>
                    :
                    // todo:########################
                    // todo: webLogin
                    // todo:########################
                    <GoogleLogin
                        disabled={false}
                        clientId="772105277078-skv77bjivos8089a1q10cco4prmt1kck.apps.googleusercontent.com"
                        buttonText="Sign with Google Login_web"
                        isSignedIn={false}
                        render={renderProps => (
                            <View style={{marginTop: 0, width: '100%'}}>
                                <GoogleLoginButton onClick={renderProps.onClick}>

                                </GoogleLoginButton>
                            </View>
                        )}
                        onSuccess={(response: any) => {
                            console.log("sldfklsdkflkdsf====>", response);
                            let _googleUser: TypeGoogleProfileForWeb = response.profileObj
                            console.info("temp====>", _googleUser.googleId);
                            console.info("temp====>", _googleUser.imageUrl);
                            reactLocalStorage.setObject('googleUser', _googleUser)
                            props.history.replace('/tabs/tab1', {
                                googleUser: _googleUser,
                            })


                        }}
                        onFailure={(error) => {
                            alert('login failed')
                        }}
                        onScriptLoadFailure={(err) => {
                            //alert(err.toString())
                        }}
                    />
                }
                <View style={{height: 50,}}/>

            </View>
        )

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <div style={{marginLeft: 10,}}>
                            <IonIcon icon={logoInstagram} style={{fontSize: 30}}/>
                        </div>
                    </IonButtons>
                    <IonTitle>
                        <div style={{marginTop: -3}}>
                            Pistagram
                        </div>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollEvents={true}>
                <View style={{height: 50}}/>
                {renderGoogleLogin()}
                <View style={{flex: 1, marginTop: -40}}>
                    <KakaoLogin
                        token={'1f6b1da1c5031d4065bb0ee1f0884fe0'}
                        onSuccess={(res: any) => {

                            console.log("temp-===>", res);
                            console.log("profile_image-===>", res.profile.properties.thumbnail_image);
                            console.log("nickname-===>", res.profile.kakao_account.profile.nickname);

                            let _googleUser: TypeGoogleProfileForWeb = {
                                "googleId": res.profile.kakao_account.profile.nickname,
                                "imageUrl": res.profile.properties.thumbnail_image,
                                "email": res.profile.kakao_account.profile.nickname,
                                "name": res.profile.kakao_account.profile.nickname,
                                "givenName": res.profile.kakao_account.profile.nickname,
                                "familyName": res.profile.kakao_account.profile.nickname,
                            }


                            reactLocalStorage.setObject('googleUser', _googleUser)
                            props.history.replace('/tabs/tab1', {
                                googleUser: _googleUser,
                            })

                        }}
                        onFail={(res) => {
                            alert(JSON.stringify(res))
                        }}
                        onLogout={console.info}
                        render={({onClick}) => {
                            return (
                                <KakaoLoginBtn onClick={onClick}/>
                            )
                        }}
                    />
                </View>
                <View style={{flex: .33, width: '100%', marginLeft: 0, marginTop: 10,}}>
                    <FacebookLogin
                        appId="2000973280215363"
                        fields="name,email,picture"
                        //onClick={componentClicked}
                        render={(renderProps: any) => (
                            <FacebookLoginButton onClick={renderProps.onClick}/>
                        )}
                        callback={(response: any) => {
                            //todo : 로그인이 성공한 경우...
                            //todo : 로그인이 성공한 경우...
                            console.log("temp-===>", response);


                            console.log("sldfklsdkflkdsf====>", response);
                            let _googleUser: TypeGoogleProfileForWeb = {
                                "googleId": response.id,
                                "imageUrl": response.picture.data.url,
                                "email": response.email,
                                "name": response.name,
                                "givenName": response.name,
                                "familyName": response.name,
                            }


                            reactLocalStorage.setObject('googleUser', _googleUser)
                            props.history.replace('/tabs/tab1', {
                                googleUser: _googleUser,
                            })
                        }}/>
                </View>
                <View style={{height: 50,}}/>
                <View style={{margin: 50,}}>
                    <View style={{flex: .3,}}>
                        <IonButton
                            size='default'
                            fill={'outline'}
                            color='warning'
                            onClick={() => {
                                reactLocalStorage.setObject('googleUser', {})
                                goNext();
                            }}
                        >Push Next</IonButton>
                    </View>
                    <View style={{flex: .33}}>
                        <IonButton
                            size='default'
                            fill={'outline'}
                            color='warning'
                            onClick={() => {
                                App.exitApp();
                            }}
                        >Exit</IonButton>
                    </View>
                </View>
            </IonContent>
        </IonPage>
    )
};

export default LoginScreen;
