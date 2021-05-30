import React from "react";
import {createButton, createSvgIcon} from "react-social-login-buttons";
import svgIcon from "./kakao_icons.svg";
import LoadingIcon from "antd/es/button/LoadingIcon";
import {listCircle} from "ionicons/icons";
import {IonIcon} from "@ionic/react";
import {MessageOutlined} from "@ant-design/icons/lib";


const config = {
    text: "Log in with Kakao",
    icon: createSvgIcon(() => (
        <MessageOutlined style={{fontSize: 22,}}/>
    )),
    iconFormat: (name: any) => `fa fa-${name}`,
    style: {background: "#ffe812", color: 'black'},
    activeStyle: {background: '#ffeaae'}
};
export const KakaoLoginBtn = createButton(config);

