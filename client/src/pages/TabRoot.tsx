import React from 'react';
import {IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonRouterOutlet} from '@ionic/react';
import {
    calendar,
    personCircle,
    map,
    informationCircle,
    triangle,
    ellipse,
    square,
    logoFacebook,
    logoInstagram
} from 'ionicons/icons';
import {Route} from "react-router";
import PicList from "./PicList";
import DetailScreen from "./DetailScreen";
import ListScreen from "./YoutubeList";
import MyPage from "./MyPage";

export const TabRoot: React.FC = () => (
    <IonTabs>
        <IonRouterOutlet>
            <Route path="/tabs" exact={true} render={props => <PicList {...props} />}/>
            <Route path="/tabs/list" exact={true} render={props => <ListScreen {...props} />}/>
            <Route path="/tabs/detail" exact={true} render={props => <MyPage {...props}/>}/>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tabs">
                <IonIcon icon={triangle}/>
                <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="ListScreen" href="/tabs/list">
                <IonIcon icon={logoInstagram}/>
                <IonLabel>ListScreen</IonLabel>
            </IonTabButton>
            <IonTabButton tab="DetailScreen" href="/tabs/detail">
                <IonIcon icon={logoFacebook}/>
                <IonLabel>ThirdScreen</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
);
