import {
    IonContent,
    IonGrid,
    IonHeader, IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner, IonTabButton,
    IonToolbar, useIonViewDidEnter, isPlatform
} from '@ionic/react';
//@ts-ignore
import './Page.css';
import React, {useEffect, useRef, useState} from "react";
import firebase from "./Firebase";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {Capacitor, Toast} from "@capacitor/core";
import {GoogleLogout} from "react-google-login";
import {reactLocalStorage} from "reactjs-localstorage";
import path from "path";
import {RefresherEventDetail} from "@ionic/core";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import './tabs.css';
import _ from 'lodash'
import ReactPlayer from "react-player";
import {listCircle, playBack, playCircle} from "ionicons/icons";
import {getFileExtension3, getFirstData, makeSnapshotData} from "../services/SharedService";


var db = firebase.firestore();
var storage = firebase.app().storage("gs://photo-gallery00001.appspot.com")
var storageRef = storage.ref();

export default function MyPage(props: any) {
    const [last, setLast]: any = useState({})

    const [prevLength, setPrevLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const [googleUser, setGoogleUser]: any = useState('');
    const ionInfiniteScrollRef = useRef(null);
    const contentRef = useRef(null);
    let limit = 22;
    const [results, setResults] = useState([]);
    const [favorList, setFavorList] = useState([]);
    const player = useRef(null);


    useIonViewDidEnter(() => {
        getInitData();
    })

    useEffect(() => {
        let _googleUser: any = reactLocalStorage.getObject('googleUser')
        setGoogleUser(_googleUser)

    }, [])

    async function getInitData() {
        let resultMap: any = await getFirstData(db, limit);

        let _googleUser: any = reactLocalStorage.getObject('googleUser')

        let _filterResults = resultMap.results.filter((item: any) => {
            return item.data.email === _googleUser.email
        })

        setResults(_filterResults)
        setLast(resultMap.last)
        setPrevLength(_filterResults.length)
        setLoading(false);
    }

    async function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        let resultMap: any = await getFirstData(db, limit);
        let _googleUser: any = reactLocalStorage.getObject('googleUser')

        let _filterResults = resultMap.results.filter((item: any) => {
            return item.data.email === _googleUser.email
        })
        setResults(_filterResults)
        setLast(resultMap.last)
        setPrevLength(_filterResults.length)
        setLoading(false);
        setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
        }, 1);
    }

    const _renderList = () => (
        <IonContent ref={contentRef} scrollEvents={true}>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
                <IonRefresherContent
                >
                </IonRefresherContent>
            </IonRefresher>
            <IonGrid style={{marginBottom: 0, padding: 0}}>
                <div className='parent'>
                    {results.map((item: any, index) => {
                        return _ItemOne(item.data, index)
                    })}
                </div>
            </IonGrid>
            {renderInfiniteScroll()}
        </IonContent>
    )


    function _ItemOne(item: any, index: number) {
        let imageUriName = item.imageUrl;
        const extension = path.extname(item.imageUrl);
        const lastDot = imageUriName.lastIndexOf('.');
        const fileName = imageUriName.substring(0, lastDot);
        const ext = imageUriName.substring(lastDot + 1);
        let thumbfileName = fileName + "_400x400" + "." + ext;

        let _re = getFileExtension3(item.imageUrl);
        let fileExt = _re.split('?')[0]
        if (fileExt === 'jpg' || fileExt === 'png') {
            return (
                <div className='child'
                     style={{flex: index == results.length - 1 && index % 3 == 1 ? .66 : .33,}}

                >
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        props.history.push('/MyPageDetail', {
                            item: item,
                        })

                    }}
                                      style={{marginVertical: 2,}}
                    >
                        <Image source={{uri: thumbfileName}} resizeMode={'cover'}
                               style={{
                                   width: isPlatform('mobile') ? window.innerWidth / 3 - 5 : 600 / 3 - 5,
                                   height: isPlatform('mobile') ? window.innerWidth / 3 - 10 : 600 / 3 - 10,
                                   margin: 0,
                               }}
                        />
                    </TouchableOpacity>
                </div>
            )

        } else {
            return (
                <div className='child'>
                    <ImageBackground
                        source={{uri: ''}}
                        resizeMode={'cover'}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                props.history.push('/MyPageDetail', {
                                    item: item,
                                })
                            }}
                            style={{width: '100%'}}
                        >
                            <ReactPlayer
                                //playIcon={<IonIcon color={'red'} icon={listCircle} s/>}
                                width={isPlatform('mobile') ? window.innerWidth / 3 - 10 : 600 / 3 - 10}
                                height={isPlatform('mobile') ? window.innerWidth / 3 - 10 : 600 / 3 - 10}
                                controls={false}
                                light={false}
                                previewTabIndex={5}
                                ref={player}
                                onReady={() => {
                                    // @ts-ignore
                                    player.current.showPreview()
                                }}
                                onClickPreview={(event) => {
                                }}
                                url={item.imageUrl}
                                style={{objectFit: 'fill'}}
                            />
                        </TouchableOpacity>
                    </ImageBackground>
                </div>
            )
        }


    }


    async function getMoreData(event: any) {
        try {
            const snapshot = await db.collection('test').orderBy('date', "desc").startAfter(last).limit(limit).get()
            let resultMap = makeSnapshotData(snapshot)
            let mergeList = results.concat(resultMap.results)
            setResults(mergeList)
            setLast(resultMap.last)
            event.target.complete();
        } catch (e) {
            event.target.complete();
        }
    };


    function renderInfiniteScroll() {
        return (
            <IonInfiniteScroll
                threshold="50px"
                ref={ionInfiniteScrollRef}
                onIonInfinite={(event) => {
                    getMoreData(event);
                }}
            >
                <IonInfiniteScrollContent
                    loadingSpinner='dots'
                    loadingText="로딩중......."
                >
                </IonInfiniteScrollContent>
            </IonInfiniteScroll>
        )
    }

    function renderInfoHeader() {
        return <View style={{
            flexDirection: 'row',
            height: 60,
            alignSelf: 'center',
            width: '100%',
            justifyContent: 'center',
            paddingTop: 9,
            paddingHorizontal: 7,
        }}>
            <View style={{flex: .13}}>
                <img style={{width: 45, height: 45, borderRadius: 50}}
                     src={googleUser.imageUrl === undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZinWG8a5dwB2QOpCXxdOcn8G3TSVYkZ7VQ&usqp=CAU' : googleUser.imageUrl}/>
            </View>
            <View style={{marginLeft: 30, flex: .70}}>
                <Text style={{color: 'white', lineHeight: 50, fontSize: 17}}>
                    {googleUser.email === undefined ? '아무개' : googleUser.email}
                </Text>
            </View>
            <View style={{marginLeft: 0, flex: .17}}>
                {Capacitor.isNative ?
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {

                            props.history.replace('/')
                        }}
                    >

                        <Text style={{color: 'yellow', lineHeight: 47}}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                    :
                    /*todo: ###########
                    //todo: webLogout
                    //todo: ###########*/
                    <GoogleLogout
                        clientId="772105277078-skv77bjivos8089a1q10cco4prmt1kck.apps.googleusercontent.com"
                        buttonText="Logout"
                        render={renderProps => (
                            <TouchableOpacity
                                style={{
                                    height: 50,
                                    alignSelf: 'center',
                                    marginLeft: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={renderProps.onClick}
                            >
                                <Text style={{color: 'yellow', lineHeight: 10}}>Logout</Text>
                            </TouchableOpacity>
                        )}
                        onLogoutSuccess={() => {
                            props.history.replace('/')
                        }}
                    >
                    </GoogleLogout>
                }


            </View>
        </View>

    }


    return (
        <IonPage>
            {renderInfoHeader()}
            {_renderList()}
        </IonPage>
    );
};


/*function _ItemOneForFavorite(item: any, index: number) {
    let imageUriName = item.imageUrl;
    const extension = path.extname(item.imageUrl);
    const lastDot = imageUriName.lastIndexOf('.');
    const fileName = imageUriName.substring(0, lastDot);
    const ext = imageUriName.substring(lastDot + 1);
    let thumbfileName = fileName + "_400x400" + "." + ext;

    console.log("results-===>", favorList.length);

    return (
        <div className='child'
             style={{marginLeft: index == favorList.length - 1 && index % 3 == 1 ? -(window.innerWidth / 3 - 5) : 0}}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    props.history.push('/MyPageDetail', {
                        item: item,
                    })

                }}
            >
                <Image source={{uri: thumbfileName}} resizeMode={'cover'}
                       style={{width: 350, height: window.innerWidth / 3,}}
                />

            </TouchableOpacity>
        </div>
    )

}*/
/*function rednerFavoriteList() {
       return (
           <IonGrid style={{marginBottom: 0, padding: 0}}>
               <div className='parent'>
                   {favorList.map((item: any, index) => {
                       return _ItemOneForFavorite(item, index)
                   })}
               </div>
           </IonGrid>
       )
   }*/
/* async function getFirstFavoriteData() {
     let googleUser: any = reactLocalStorage.getObject('googleUser')
     try {
         const snapshot = await db.collection('test')
             //.where("email", "==", googleUser.email)
             .orderBy('date', "desc")
             .limit(30)
             .get()
         let _favorList: any = [];
         let _last: any = '';


         snapshot.forEach((doc) => {
             let cilents = doc.data().clients;
             if (_.includes(cilents, googleUser.email)) {
                 let itemOne = {
                     imageUrl: doc.data().imageUrl,
                     date: doc.data().date,
                     contents: doc.data().contents,
                     id: doc.id,
                     clients: doc.data().clients,
                     loading: false,
                 }

                 _favorList.push(itemOne)
                 _last = doc.data();
             }

         })



         console.log("_favorList==>", _favorList);

         setFavorList(_favorList)
     } catch (e) {
         alert(e.toString())
     }

 };
*/
