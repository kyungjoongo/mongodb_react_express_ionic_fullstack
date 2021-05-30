import {
    IonButton,
    IonButtons,
    IonContent, IonFabButton,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import './Page.css';
import React, {useEffect, useRef, useState} from "react";
import firebase from "./Firebase";
import {Button, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Plugins} from '@capacitor/core';
import {arrowUp, logoInstagram} from "ionicons/icons";
// @ts-ignore
import {TypePicOne} from "./Types";
import {Modal, WhiteSpace} from "antd-mobile";
import {SharedStyles} from "./GlobalStyle";
import _ from 'lodash'
import {CommentOutlined, DeleteOutlined, HeartOutlined} from "@ant-design/icons/lib";
import {reactLocalStorage} from "reactjs-localstorage";
import {getFirstData} from "../services/SharedService";

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

function TestScreen003(props: any) {

    const contentRef = useRef(null);
    const [platform, setPlatForm] = useState('')
    const [loading, setLoading] = useState(true)

    const [showModal, setShowModal] = useState(false);
    const [contents, setContents] = useState('')
    const ionInfiniteScrollRef = useRef(null);
    const [results, setResults] = useState([]);

    useIonViewDidEnter(async () => {
        try {
            getList();
            //@ts-ignore
            contentRef?.current?.scrollToPoint(0, 0, 1000);
        } catch (e) {

        }
    });

    useEffect(() => {
        getList();
    }, [])

    const [last, setLast] = useState('');

    async function getList() {
        let querySnapshot = await db.collection("test")
        //.where("state", "==", "CA")
            .limit(20)
            .orderBy('date', "desc")
            .get();

        var results: any = [];
        var _last: any = '';
        querySnapshot.forEach((doc) => {
            results.push({
                data: doc.data(),
                _id: doc.id,
            });

            _last = doc.data();
        });
        console.log("temp-===>", results);
        setResults(results);
        setLast(_last.date.toString());
    }

    async function getMoreData(event: any) {
        try {
            let querySnapshot = await db.collection("test")
                .orderBy('date', "desc")
                .startAfter(last)
                .limit(20)
                .get();


            var moreResults: any = [];
            var _last: any = '';
            querySnapshot.forEach((doc) => {
                moreResults.push({
                    data: doc.data(),
                    _id: doc.id,
                });
                _last = doc.data();
            });

            if (!_.isEmpty(moreResults)) {
                console.log("moreResults-===>", moreResults);
                let mergeList = results.concat(moreResults)
                console.log("mergeList-===>", mergeList);
                setResults(mergeList);
                setLast(_last.date.toString());
                event.target.complete();
            } else {
                setLoading(false)
                event.target.complete();
            }

        } catch (e) {
            event.target.complete();
        }
    };

    const inputRef = useRef(null);

    function renderWriteModal() {
        return (
            <IonModal
                onWillPresent={() => {
                    setContents('')
                }}
                onDidPresent={() => {

                    setTimeout(() => {
                        //@ts-ignore
                        inputRef.current.focus();
                    }, 1)
                }}

                onDidDismiss={() => {
                    setShowModal(false)
                }}
                swipeToClose={true}
                mode={'ios'}
                isOpen={showModal}
                backdropDismiss={true}
                showBackdrop={true}
                cssClass='myModal'
            >
                <View style={{padding: 25,}}>
                    <View style={{
                        backgroundColor: '#ffce58',
                        height: 40,
                        justifyContent: 'center',
                        padding: 10,
                        borderRadius: 5,
                    }}>
                        <Text style={{fontSize: 18, color: 'black'}}>코멘트를 입력하시오</Text>
                    </View>
                    <WhiteSpace style={{height: 30}}/>
                    <TextInput

                        ref={inputRef}
                        multiline={true}
                        style={SharedStyles.textArea001}
                        onChangeText={(value) => {
                            setContents(value);
                        }}
                        onSubmitEditing={() => {
                        }}
                        placeholder=''
                        value={contents}
                    />
                    <WhiteSpace style={{height: 30}}/>
                    <IonButton
                        size='default'
                        fill={'outline'}
                        color='warning'
                        onClick={async () => {
                            insertComment();
                        }}
                    >Submit</IonButton>
                </View>
                <View style={{paddingHorizontal: 25, paddingBottom: 10}}>
                    <IonButton fill={'outline'} color='danger' onClick={() => setShowModal(false)}>Close
                        Modal</IonButton>
                </View>
            </IonModal>
        )

    }

    function getFileExtension3(filename: any) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    const [visible, setVisible] = useState(false)
    const [currentItem, setCurrentItem]: any = useState(false)


    async function insertComment() {
        console.log("currentItemcurrentItem-===>", currentItem);

        console.log("temp-===>", currentItem._id);


        let _one: any = await (await db.collection('test').doc(currentItem._id).get()).data();
        console.log("final comments-===>", _one.comments);


        let prevCommentList = []
        if (_one.comments !== undefined) {
            prevCommentList = _one.comments
        }

        let _googleUser: any = reactLocalStorage.getObject('googleUser');

        let commentOne = {
            author: _googleUser.email === undefined ? '아무게' : _googleUser.email,
            content: contents,
            date: new Date().toISOString(),
            avatar: _googleUser.imageUrl === undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZinWG8a5dwB2QOpCXxdOcn8G3TSVYkZ7VQ&usqp=CAU' : _googleUser.imageUrl,
        }

        prevCommentList.push(commentOne)

        await db.collection('test').doc(currentItem._id).update({
            comments: prevCommentList
        });
        setShowModal(false)

        console.log("index-===>", currentItem);
        console.log("index-===>", currentIndex);

        let prevResults = results;

        let newResults: any = []
        prevResults.map((item: any, innerIndex) => {
            if (innerIndex === currentIndex) {
                if (_.isEmpty(item.data.comments)) {
                    item.data.comments = []
                    item.data.comments.push(commentOne);
                } else {
                    item.data.comments.push(commentOne);
                }


            }
            newResults.push(item);
        })

        console.log("newResults-===>", newResults);

        setResults(newResults)
    }

    const [currentIndex, setCurrentIndex] = useState(0)


    function renderBottomBtn(item: any, index: number) {
        return (
            <View style={{width: '100%', flexDirection: 'row', marginLeft: -5, marginTop: 25}}>
                <TouchableOpacity
                    style={{flex: .13, justifyContent: 'center', alignItems: 'center',}}
                    onPress={async () => {
                    }}
                >
                    <DeleteOutlined style={{fontSize: 28,}}/>
                </TouchableOpacity>

                {/*todo:###############*/}
                {/*todo:HeartOutlined icons*/}
                {/*todo:###############*/}
                <TouchableOpacity
                    onPress={() => {
                    }}
                    style={{flex: .13, justifyContent: 'center', alignItems: 'center',}}
                >

                    <HeartOutlined
                        ref={el => {
                        }}
                        style={{fontSize: 28,}}
                    />


                </TouchableOpacity>
                {/*todo:###############*/}
                {/*todo:comment icons*/}
                {/*todo:###############*/}
                <TouchableOpacity
                    onPress={() => {
                        setCurrentItem(item)
                        setCurrentIndex(index)
                        setShowModal(true)
                    }}
                    style={{flex: .13, justifyContent: 'center', alignItems: 'center',}}
                >
                    <CommentOutlined style={{fontSize: 28,}}/>

                </TouchableOpacity>
                <View style={{flex: .5}}>

                </View>
            </View>

        )
    }

    function renderComments(picOne: TypePicOne) {

        return (
            !_.isEmpty(picOne.comments) &&
            picOne.comments.map((innerItem: any, index: number) => {
                return (

                    <React.Fragment>
                        {index === 0 && <View style={{marginTop: 0,}}/>}
                        <View style={{flexDirection: 'row', marginTop: 10,}}>
                            <View
                                style={{flex: .15, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={{uri: innerItem.avatar}}
                                       style={{width: 30, height: 30, borderRadius: 50}}/>
                            </View>
                            <View style={{
                                flex: .3,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={[SharedStyles.whiteText, {
                                    fontSize: 14,
                                    color: 'green'
                                }]}>
                                    {innerItem.author !== undefined && innerItem.author.split('@')[0]}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: .65,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    marginLeft: 15,
                                }}>
                                <Text style={[SharedStyles.whiteText, {
                                    fontSize: 14,
                                    color: 'yellow'
                                }]}>
                                    {innerItem.content}
                                </Text>
                            </View>
                        </View>
                    </React.Fragment>
                )
            })
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
                        <View style={{flexDirection: 'row'}}>
                            <div style={{marginTop: -3, margin: 10}}>
                                <Button
                                    title={'setShowModal'}
                                    onPress={() => {
                                        setShowModal(true)
                                    }}

                                />
                            </div>
                            <div style={{marginTop: -3, margin: 10}}>
                                <Button
                                    color={'green'}
                                    title={'addFeedScreen'}
                                    onPress={() => {
                                        props.history.push('/tabs/tab2')
                                    }}

                                />
                            </div>
                            <div style={{marginTop: -3, margin: 10}}>
                                <Button
                                    color={'green'}
                                    title={'asdasd'}
                                    onPress={() => {
                                        setVisible(!visible)
                                    }}

                                />
                            </div>
                        </View>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent ref={contentRef} scrollEvents={true}>

                {renderWriteModal()}
                <View>
                    {results.map((item: any, index) => {
                        let picOne: TypePicOne = item.data;
                        let _re = getFileExtension3(picOne.imageUrl);
                        let fileExt = _re.split('?')[0]

                        return (
                            <React.Fragment>
                                <View style={{padding: 10,}}>
                                    {fileExt === 'jpg' || fileExt === 'png' || fileExt === 'jpeg' ?

                                        <Image source={{uri: picOne.imageUrl}}
                                               style={{width: '100%', height: 700, borderRadius: 5,}}
                                               resizeMethod={'auto'}/>

                                        :
                                        <Image
                                            source={{uri: 'https://bohoon.co.kr/wp-content/uploads/sites/42/2020/04/placeholder.png'}}
                                            style={{width: '100%', height: 700}}
                                            resizeMethod={'auto'}/>
                                    }


                                </View>
                                <View style={{marginTop: -50, marginLeft: 20}}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 30,
                                        color: 'white'
                                    }}>{index.toString()}</Text>
                                </View>


                                {renderBottomBtn(item, index)}

                                <View style={{
                                    height: 'auto',
                                    margin: 10,
                                    //backgroundColor: 'red',
                                    padding: 8,
                                    borderRadius: 10,
                                }}>
                                    <Text
                                        style={{fontSize: 20}}>{_.isEmpty(picOne.contents) ? "undefined" : picOne.contents}</Text>
                                </View>

                                {renderComments(picOne)}
                            </React.Fragment>
                        )
                    })}
                </View>
                <IonInfiniteScroll
                    threshold="50px"
                    ref={ionInfiniteScrollRef}
                    onIonInfinite={(event) => {
                        getMoreData(event);
                    }}
                >
                    <IonInfiniteScrollContent
                        loadingSpinner="dots"
                        loadingText="로딩중......."
                    >
                    </IonInfiniteScrollContent>
                </IonInfiniteScroll>

            </IonContent>
            <TouchableOpacity onPress={() => {
                //@ts-ignore
                contentRef?.current?.scrollToPoint(0, 0, 1000);
            }} style={{position: 'absolute', bottom: 12, zIndex: 0, right: 30}}>
                <IonFabButton size={'small'} color="primary"><IonIcon icon={arrowUp}
                                                                      style={{
                                                                          color: 'white',
                                                                          fontSize: 28,
                                                                      }}/></IonFabButton>
            </TouchableOpacity>
        </IonPage>
    )
};

export default TestScreen003;
