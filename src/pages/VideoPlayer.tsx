import { useRef, memo } from "react";

export default memo(function VideoPlayer({src, onPlay, onPause} : any) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const count = useRef(0)
    count.current++;
    
    return (
        <div>
            <span>Call count is {count.current}</span>
            <h3>{src.title}</h3>
            <video ref={videoRef} src={src.url}></video>
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
}
//// we use useMemo in Notes component to do not do this
// , (prevProps, nextProps) => {
//     if (prevProps.onPlay !== nextProps.onPlay) {
//         return false;
//     }

//     if (prevProps.onPause !== nextProps.onPause) {
//         return false;
//     }

//     if (prevProps.src.title !== nextProps.src.title) {
//         return false;
//     }

//     if (prevProps.src.url !== nextProps.src.url) {
//         return false;
//     }

//     return true;
// }
)