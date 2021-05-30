import {
    IonAlert,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonContent,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonModal,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonToast,
    isPlatform,
    useIonViewDidEnter
} from '@ionic/react';
import {useParams} from 'react-router';
import './Page.css';
import {Button, Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from "react-native";
import {message} from "antd";
import React, {useEffect, useRef, useState} from "react";
import firebase from "./Firebase";
import {arrowUp, heart, mailOutline, playCircle, trash} from "ionicons/icons";
import {Plugins} from '@capacitor/core';
import {RefresherEventDetail} from '@ionic/core';
import {SharedStyles} from "./GlobalStyle";
import Lottie from "react-lottie";
import {TypePicOne} from "./Types";
import _ from 'lodash'
import {reactLocalStorage} from "reactjs-localstorage";
import ReactPlayer from "react-player";
//@ts-ignore
import {WhiteSpace} from "antd-mobile";
import {getFirstData, makeSnapshotData} from "../services/SharedService";
import {CommentOutlined, DeleteOutlined, HeartOutlined, MessageOutlined} from "@ant-design/icons/lib";
//import QuerySnapshot = firebase.firestore.QuerySnapshot;

const {Toast, Device, AdMob} = Plugins;
const db = firebase.firestore();
const storage = firebase.app().storage("gs://photo-gallery00001.appspot.com")
const storageRef = storage.ref();
const useMountEffect = (fun: any) => useEffect(fun, [])

function PicList(props: any) {
    const ionInfiniteScrollRef = useRef(null);
    const [showToast2, setShowToast2] = useState(false)
    const [loading, setLoading] = useState(false);
    const {name} = useParams<{ name: string; }>();
    const [contents, setContents] = useState('');
    const [last, setLast]: any = useState({})
    const [results, setResults]: any = useState([]);
    const [prevLength, setPrevLength] = useState(0);
    const [currentItem, setCurrentItem]: any = useState('');

    const [currentIndex, setCurrentIndex]: any = useState(0);


    const [googleUser, setGoogleUser]: any = useState({
        imageUrl: '',
        email: '',
    })
    const contentRef = useRef(null);
    const [isClick, setIsClick] = useState(false);
    const itemsRef: any = useRef([]);

    useIonViewDidEnter(async () => {
        try {
            if (props.history.location.state.fromAddFeed) {
                let resultMap: any = await getFirstData(db, limit);
                setResults(resultMap.results)
                setLast(resultMap.last)
                setPrevLength(resultMap.results.length)
                setTimeout(() => {
                    scrollToTop();
                }, 250)
            }
        } catch (e) {

        }
    });


    useEffect(() => {
        let _googleUser = reactLocalStorage.getObject('googleUser');
        setGoogleUser(_googleUser);
        getInitData();
        getUserInfo();
    }, [])

    async function getInitData() {
        try {
            let resultMap: any = await getFirstData(db, limit);
            setResults(resultMap.results)
            setLast(resultMap.last)
            setPrevLength(resultMap.results.length)
        } catch (e) {

            alert(e.toString())
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


    async function getUserInfo() {
        setLoading(true)
        if (props.history.location.state != undefined) {
            setGoogleUser(props.history.location.state.googleUser)
        } else {
            setGoogleUser({
                imageUrl: 'https://image.freepik.com/free-vector/smiling-girl-avatar_102172-32.jpg',
                email: '아무개',
            })
        }
        setLoading(false);
    }


    function scrollToTop() {
        try {
            // @ts-ignore
            contentRef?.current?.scrollToPoint(0, 0, 1000);
        } catch (e) {

        }
    };

    const limit = 20;


    async function deleteItemOne(item: any) {
        setCurrentItem(item);
        setShowAlert(true)
    }


    async function handleDoubleClick(item: any, index: any) {
        addRemoveFavorite(item, index,)
    }

    async function addRemoveFavorite(item: any, index: any,) {
        try {
            console.log("temp-===>", item);
            //todo: toggle likes
            let _googleUser: any = reactLocalStorage.getObject('googleUser')

            if (_googleUser.email !== undefined) {
                let tempRslt: any = results;
                tempRslt[index].data.loading = true
                setLoading(tempRslt);
                let _email = _googleUser.email
                let _resultOne = await db.collection('test').doc(item._id).get();
                // @ts-ignore
                let clients: any = []
                try {
                    // @ts-ignore
                    clients = _resultOne.data().clients
                } catch (e) {
                    clients = [];
                }
                console.info("clients====>", clients);
                let elIndexNo = -1;
                try {
                    elIndexNo = clients.indexOf(_email)
                } catch (e) {
                    clients = [];
                }


                if (elIndexNo > -1) {
                    //todo:이미 데이터가 배열에 있는 경우..
                    clients.splice(elIndexNo)
                } else {
                    //todo:중복이 아닌 경우 push
                    //todo:중복이 아닌 경우 push
                    clients.push(_email)
                }


                let itemOne: TypePicOne = {
                    clients: clients,
                    comments: [],
                    authorImage: '',
                }
                await db.collection('test').doc(item._id).update(itemOne);
                let _one: any = await (await db.collection('test').doc(item._id).get()).data();
                console.log("final clients-===>", _one.clients);


                //todo: ##########################
                //todo: loading to false..
                //todo: ##########################
                setTimeout(() => {
                    let newResult: any[] = []
                    results.map((item: any) => {
                        item.data.loading = false;
                        newResult.push(item)
                    })
                    setResults(newResult)
                    if (itemsRef.current[index].style.color === 'grey') {
                        itemsRef.current[index].style.color = 'red';
                    } else {
                        itemsRef.current[index].style.color = 'grey';
                    }

                }, 777)
            } else {
                message.success('Google Sign-in 을 해야가능')
            }
        } catch (e) {
            alert(e.toString());
            let newResult: any[] = []
            results.map((item: any) => {
                item.data.loading = false;
                newResult.push(item)
            })
            setResults(newResult)
        }

    }


    function getFileExtension3(filename: any) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    const player = useRef(null);

    function __renderBottomCommentBar(item: any, index: any, IsExistBookmark: boolean) {
        return (
            <div style={{height: 'auto', marginTop: 10, flex: 1, marginBottom: 15,}}>
                <View style={{width: '100%', flexDirection: 'row', marginLeft: 4,}}>
                    {/*todo:###############*/}
                    {/*todo:delete icons*/}
                    {/*todo:###############*/}
                    <TouchableOpacity
                        style={{flex: .13, justifyContent: 'center', alignItems: 'center',}}
                        onPress={async () => {
                            await deleteItemOne(item)
                        }}
                    >
                        <DeleteOutlined style={{fontSize: 28,}}/>
                    </TouchableOpacity>
                    {/*todo:###############*/}
                    {/*todo:Heart icons*/}
                    {/*todo:###############*/}
                    <TouchableOpacity
                        onPress={() => {
                            addRemoveFavorite(item, index);
                        }}
                        style={{flex: .13, justifyContent: 'center', alignItems: 'center',}}
                    >

                        <HeartOutlined
                            ref={el => {
                                itemsRef.current[index] = el
                            }}
                            style={{color: IsExistBookmark ? 'red' : 'grey', fontSize: 28,}}
                        />


                    </TouchableOpacity>
                    {/*todo:###############*/}
                    {/*todo:message icons*/}
                    {/*todo:###############*/}
                    <TouchableOpacity
                        onPress={() => {
                            setCurrentItem(item)
                            setCurrentIndex(index)
                            setShowModal(true)
                            //props.history.push('/AddCommentScreen')

                        }}
                        style={{flex: .13, justifyContent: 'center', alignItems: 'center',}}
                    >
                        <CommentOutlined style={{fontSize: 28,}}/>

                    </TouchableOpacity>
                    <View style={{flex: .5}}>

                    </View>
                </View>
                <View style={{marginTop: 15, marginBottom: 5,}}>
                    <View style={{flex: .85, flexDirection: 'row'}}>
                        <div style={{
                            marginLeft: 25,
                            wordWrap: 'break-word',
                            marginRight: 15,
                            marginTop: 5,
                            marginBottom: 5,
                        }}>
                            <Text style={[SharedStyles.whiteText, {fontSize: 22, fontStyle: 'italic'}]}>
                                {_.isEmpty(item.data.contents) ? 'none' : item.data.contents}
                            </Text>
                        </div>

                    </View>
                </View>

                {item.data.comments !== undefined &&
                item.data.comments.map((innerItem: any, index: number) => {
                    return (
                        <React.Fragment>
                            {index === 0 && <View style={{marginTop: 0,}}/>}
                            <View style={{flexDirection: 'row', marginTop: 10,}}>
                                <View style={{flex: .15, justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={{uri: innerItem.avatar}}
                                           style={{width: 30, height: 30, borderRadius: 50}}/>
                                </View>
                                <View style={{flex: .3, justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={[SharedStyles.whiteText, {fontSize: 14, color: 'green'}]}>
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
                                    <Text style={[SharedStyles.whiteText, {fontSize: 14, color: 'yellow'}]}>
                                        {innerItem.content}
                                    </Text>
                                </View>
                            </View>
                        </React.Fragment>
                    )
                })}

            </div>
        )

    }

    function _ItemOne(item: any, index: number,) {
        let IsExistBookmark: boolean = false;

        let picOne: TypePicOne = item.data

        // @ts-ignore
        let _email = reactLocalStorage.getObject('googleUser').email
        IsExistBookmark = _.includes(picOne.clients, _email)
        let _re = getFileExtension3(picOne.imageUrl);
        let fileExt = _re.split('?')[0]


        return (
            <React.Fragment>
                <IonCard
                    style={{marginTop: 0, padding: 0, margin: 0, marginVertical: '5px !important', height: 'auto'}}>
                    <IonCardHeader style={{height: 80}}>
                        <IonCardSubtitle>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Image source={{uri: picOne.authorImage}}
                                           style={{width: 50, height: 50, borderRadius: 50,}}/>
                                </View>
                                <View style={{marginLeft: 20,}}>
                                    <Text style={{lineHeight: 50, fontSize: 17, color: 'white'}}>
                                        {picOne.email}
                                    </Text>
                                </View>
                            </View>
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent style={{
                        width: '100%',
                        marginTop: 10,
                        marginHorizontal: 0,
                        padding: 0,
                        justifyContent: 'center',
                        height: 'inherit'
                    }}>
                        {fileExt === 'jpg' || fileExt === 'png' || fileExt === 'jpeg' ?
                            <ImageBackground
                                loadingIndicatorSource={{uri: 'https://www.costaloc.com/img/loaders/loader-blue.png'}}
                                source={{uri: picOne.imageUrl}} resizeMode={'cover'}
                                style={{
                                    width: isPlatform('mobile') ? window.innerWidth : 600,
                                    height: 550,
                                    marginTop: 10,
                                }}>
                                <React.Fragment>
                                    <div
                                        onDoubleClick={() => {
                                            handleDoubleClick(item, index)
                                        }}
                                        style={{zIndex: 1, backgroundColor: 'transparent', height: 500}}>
                                    </div>
                                    {results[index].data.loading ?
                                        <View style={{
                                            backgroundColor: 'transparent',
                                            position: "absolute",
                                            top: '35%',
                                            left: '34%',
                                        }}>
                                            <Lottie
                                                options={{
                                                    loop: true,
                                                    autoplay: true,
                                                    animationData: require('./heart.json'),
                                                    rendererSettings: {
                                                        preserveAspectRatio: 'xMidYMid slice'
                                                    }
                                                }}
                                                isStopped={true}
                                                height={150}
                                                width={150}
                                            />
                                        </View> :
                                        null
                                    }
                                </React.Fragment>
                            </ImageBackground>
                            :
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    let newResults = results;
                                    newResults[index].data.playing = !newResults[index].data.playing;
                                    console.log("temp-===>", results);
                                    setResults((prevResults: any) => (
                                        [...[], ...newResults]
                                    ))
                                }}
                                style={{width: '100%'}}
                            >
                                <ReactPlayer
                                    ref={player}
                                    controls={false}
                                    light={false}
                                    playing={results[index].data.playing}
                                    //className='react-player'
                                    url={item.data.imageUrl}
                                    width={'100%'}
                                    height={'auto'}
                                    playsinline={true}
                                />
                                <View style={{position: 'absolute', bottom: '45%', left: '48%'}}>
                                    {!results[index].data.playing &&
                                    <IonIcon icon={playCircle} style={{fontSize: 50,}} color={'white'}/>}
                                </View>
                                {results[index].loading ?
                                    <View style={{
                                        backgroundColor: 'transparent',
                                        position: "absolute",
                                        top: '45%',
                                        left: '37%',

                                    }}>
                                        <Lottie
                                            options={{
                                                loop: true,
                                                autoplay: true,
                                                animationData: require('./heart.json'),
                                                rendererSettings: {
                                                    preserveAspectRatio: 'xMidYMid slice'
                                                }
                                            }}
                                            isStopped={true}
                                            height={150}
                                            width={150}
                                        />
                                    </View> :
                                    null
                                }
                            </TouchableOpacity>
                        }
                        <View style={{height: 10,}}/>
                        {__renderBottomCommentBar(item, index, IsExistBookmark)}
                    </IonCardContent>
                </IonCard>

                <View style={{height: 5,}}/>
            </React.Fragment>
        )

    }

    async function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        let resultMap: any = await getFirstData(db, limit);
        setResults(resultMap.results)
        setLast(resultMap.last)
        setPrevLength(resultMap.results.length)
        setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
        }, 1);
    }


    const _renderList = () => (
        <IonContent ref={contentRef} scrollEvents={true}
                    style={{marginBottom: 50,}}>
            <IonRefresher style={{}} slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
                <IonRefresherContent>
                </IonRefresherContent>
            </IonRefresher>
            <IonGrid style={{marginBottom: 0, padding: 0, marginTop: isPlatform("ios") ? 30 : 0}}>
                {results.map((item: any, index: number) => {
                    return _ItemOne(item, index)
                })}

            </IonGrid>
            {renderInfiniteScroll()}

        </IonContent>
    )


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
                    loadingSpinner="dots"
                    loadingText="Loading..."
                >
                </IonInfiniteScrollContent>
            </IonInfiniteScroll>
        )
    }

    const [showAlert, setShowAlert] = useState(false);


    function renderAlert() {
        return <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass='my-custom-class'
            header={'경고'}
            message={'지울거냐?'}
            buttons={[
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: blah => {
                        console.log('Confirm Cancel: blah');
                    }
                },
                {
                    text: 'Okay',
                    handler: async () => {
                        await db.collection('test').doc(currentItem._id).delete().then(res => {
                            let filterArr = results.filter((innerItem: any) => {
                                return currentItem._id != innerItem._id
                            })
                            console.info("temp====>", filterArr);
                            setResults(filterArr)
                        })

                    }
                }
            ]}
        />
    }

    function rednerToast() {
        return <IonToast
            isOpen={showToast2}
            onDidDismiss={() => setShowToast2(false)}
            message="더 이상 데이터가 없다!"
            position="bottom"
            duration={1000}
            //color={'warning'}
        />

    }

    const [showModal, setShowModal] = useState(false);

    function renderWriteModal() {
        return (
            <IonModal
                onWillPresent={() => {
                    setContents('')
                }}
                onDidDismiss={() => {
                    setShowModal(false)
                }}
                mode={'ios'}
                isOpen={showModal}
                backdropDismiss={true}
                cssClass='my-custom-class'
            >
                <View style={{padding: 25,}}>
                    <Text style={{fontSize: 18}}>코멘트를 입력하시오~</Text>
                    <WhiteSpace style={{height: 30}}/>
                    <TextInput
                        multiline={true}
                        style={SharedStyles.textArea001}
                        onChangeText={(value) => {
                            setContents(value);
                        }}
                        onSubmitEditing={() => {
                        }}
                        placeholder='Plez, Insert comment!'
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

    async function insertComment() {
        let _one: any = await (await db.collection('test').doc(currentItem._id).get()).data();
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

        console.log("currentItem-===>", currentItem);
        console.log("incurrentIndexdex-===>", currentIndex);

        let prevResults = results;

        let newResults: any = []
        prevResults.map((item: any, innerIndex: number) => {
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
        setShowModal(false)
        setResults(newResults)
    }

    return (
        <IonPage>

            <IonContent>
                {_renderList()}
                {renderAlert()}
                {rednerToast()}
                <TouchableOpacity onPress={() => {
                    scrollToTop();
                }} style={{position: 'absolute', bottom: 5, zIndex: 0, right: 20}}>
                    <IonFabButton size={'small'} color="primary"><IonIcon icon={arrowUp}
                                                                          style={{
                                                                              color: 'white',
                                                                              fontSize: 28,
                                                                          }}/></IonFabButton>
                </TouchableOpacity>
                {renderWriteModal()}
            </IonContent>
        </IonPage>
    );
};

export default PicList;
