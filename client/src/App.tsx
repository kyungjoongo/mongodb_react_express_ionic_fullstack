import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {Route} from 'react-router-dom';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import React, {useEffect} from "react";
import {add, listCircle, settings} from "ionicons/icons";
import PicList from "./pages/PicList";
import MyPage from "./pages/MyPage";
import './App.css'
import LoginScreen from "./pages/LoginScreen";
import {Plugins} from '@capacitor/core';
import AddFeedScreen from "./pages/AddFeedScreen";
import MyPageDetail from "./pages/MyPageDetail";
import TestScreen from "./pages/TestScreen";
import TestScreen003 from "./pages/TestScreen003";
import 'antd-mobile/dist/antd-mobile.css';
import AddCommentScreen from "./pages/AddCommentScreen";
import DetailTest002 from "./pages/DetailTest002";

const {AdMob} = Plugins;


const App: React.FC = (props) => {
    useEffect(() => {
        try {
            AdMob.initialize({
                testingDevices: ['FB480684835BC7DD998ADE85700ED445'],
                initializeForTesting: true,
            });
        } catch (e) {

        }
    })

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/MyPageDetail" component={MyPageDetail}/>
                    <Route exact path="/" render={(props) => (
                        <LoginScreen {...props}/>
                    )}/>

                    {/*<Route exact path="/" render={(props) => (
                        <TubeList {...props}/>
                    )}/>
                    <Route exact path="/DetailScreen" render={(props) => (
                        <DetailScreen {...props}/>
                    )}/>*/}
                    {/*<Route exact path="/" render={(props) => (
                        <Test002 {...props}/>
                    )}/>*/}

                    <Route exact path="/DetailTest002" render={(props) => (
                        <DetailTest002 {...props}/>
                    )}/>

                    <Route exact path="/TestScreen" render={(props) => (
                        <TestScreen {...props}/>
                    )}/>
                    <Route exact path="/AddCommentScreen" render={(props) => (
                        <AddCommentScreen {...props}/>
                    )}/>

                    <Route path="/TestScreen003" component={TestScreen003} exact={true}/>

                    <Route
                        path="/tabs"
                        render={() => (
                            <IonTabs>
                                <IonRouterOutlet>
                                    <Route path="/tabs/tab1" component={PicList} exact={true}/>

                                    <Route path="/tabs/tab2" component={AddFeedScreen} exact={true}/>
                                    <Route path="/tabs/tab3" component={MyPage} exact={true}/>
                                </IonRouterOutlet>
                                <IonTabBar slot="bottom">
                                    <IonTabButton tab="PicList" href="/tabs/tab1">
                                        <IonIcon icon={listCircle}/>
                                        <IonLabel>Feed List</IonLabel>
                                    </IonTabButton>
                                    <IonTabButton tab="youtube" href="/tabs/tab2">
                                        <IonIcon icon={add}/>
                                        <IonLabel>Add Feed</IonLabel>
                                    </IonTabButton>
                                    <IonTabButton tab="MyPage" href="/tabs/tab3">
                                        <IonIcon icon={settings}/>
                                        <IonLabel>My Info</IonLabel>
                                    </IonTabButton>
                                </IonTabBar>
                            </IonTabs>
                        )}
                    />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};
export default App;
