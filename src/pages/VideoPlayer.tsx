import { useRef, memo } from "react";

export default memo(function VideoPlayer({src, onPlay, onPause} : any) {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    return (
        <div>
            <video ref={videoRef} src={src}></video>
            <button onClick={() => {
                videoRef?.current?.play();
                onPlay();
            }}>play</button>
            <button onClick={() => {
                videoRef?.current?.pause();
                onPause();
            }}>pause</button>
        </div>
    )
})