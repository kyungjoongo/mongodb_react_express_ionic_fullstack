// @flow
import * as React from 'react';
//@ts-ignore
import {VideoPlayer, playerController} from 'react-video-players';
type Props = {

};
type State = {

};

export default class VideoRadPlayer extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <VideoPlayer src={'https://firebasestorage.googleapis.com/v0/b/photo-gallery00001.appspot.com/o/mp4%2F0.806090936541251_78625523_147444349929019_7944116148775655268_n.mp4?alt=media&token=5fe2a457-a506-4872-844d-861a883fcaf9'} />
            </div>
        );
    };
};
