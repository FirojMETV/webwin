import { useRef, useState } from "react";
import play from '/Users/WIN/Desktop/webwin/src/image/play.png';
import pause from '/Users/WIN/Desktop/webwin/src/image/pause.png';
import backward from '/Users/WIN/Desktop/webwin/src/image/backward.png';
import forward from '/Users/WIN/Desktop/webwin/src/image/forward.png';
import setting from '/Users/WIN/Desktop/webwin/src/image/setting.png';
import full from '/Users/WIN/Desktop/webwin/src/image/fullscreen.png';
import exit from '/Users/WIN/Desktop/webwin/src/image/maximize.png';
import sound from '/Users/WIN/Desktop/webwin/src/image/icons8-sound-48.png';
import mute from '/Users/WIN/Desktop/webwin/src/image/icons8-mute-50.png';

import "./More.css";

function Player() {

    const progressBarRef = useRef(null);
    const videoRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fullScreen, setFullScreen] = useState(false)
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(1);
    const finalVolume = isMuted ? 0: volume **2;

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
    }

    const videoHandler = (control) => {
        if (control === "play") {
            videoRef.current.play();
            setPlaying(true);
            var vid = document.getElementById("video1");
            setVideoTime(vid.duration);
        } else if (control === "pause") {
            videoRef.current.pause();
            setPlaying(false);
        }
    };
    const handleMuted = () => {
        setIsMuted(!isMuted)
        videoRef.current.muted = !isMuted
    }
    const handleProgress = () => {
        setCurrentTime(videoRef.current.currentTime);
    }
    const fastForward = () => {
        videoRef.current.currentTime += 10;
    };

    const handleProgressBarClick = (event) => {
        const progressBarWidth = progressBarRef.current.offsetWidth;
        const clickPositionX = event.pageX - progressBarRef.current.offsetLeft;
        const clickPercentage = (clickPositionX / progressBarWidth) * 100;
        const videoDuration = videoRef.current.duration;
        const newCurrentTime = (clickPercentage / 100) * videoDuration;
        videoRef.current.currentTime = newCurrentTime;
    };

    const handleVideoTimeUpdate = () => {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        const progressPercentage = (currentTime / duration) * 100;
        setProgress(progressPercentage);
    };

    const backwards = () => {
        videoRef.current.currentTime -= 10;
    };
    const toggleFullscreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
            videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen();
        }
        else {
            alert('fullscreen API is not supported');
        }

    };

    const exitfullscreen = () => {
        if (videoRef.current.exitfullscreen) {
            videoRef.current.exitfullscreen();
        } else if (videoRef.current.mozCancelFullScreen) {
            videoRef.current.mozCancelFullScreen()
        } else if (videoRef.current.msexitfullscreen) {
            videoRef.current.msexitfullscreen();
        } else if (videoRef.current.webkitexitfullscreen) {
            videoRef.current.webkitexitfullscreen();
        }
    }

    window.setInterval(function () {
        setCurrentTime(videoRef.current?.currentTime);
        setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }, 1000);

    return (
        <div className="Video">
            <video
                id="video1"
                ref={videoRef}
                className="video"

                //  onVolumeChange={handleVolume}
                onTimeUpdate={handleVideoTimeUpdate}
            >

                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" className="" />
            </video>



            <div className="controlsContainer">
                <div className="controls">
                    <img
                        onClick={backwards}
                        className="controlsIcon"
                        alt=""
                        src={backward}
                    />
                    {playing ? (
                        <img
                            onClick={() => videoHandler("pause")}
                            className="controlsIcon--small"
                            alt=""
                            src={pause}
                        />
                    ) : (
                        <img
                            onClick={() => videoHandler("play")}
                            className="controlsIcon--small"
                            alt=""
                            src={play}
                        />
                    )}
                    <img
                        className="controlsIcon"
                        onClick={fastForward}
                        alt=""
                        src={forward}
                    />
                </div>
            </div>

            <div className="timecontrols">
                {playing ? (
                    <img
                        onClick={() => videoHandler("pause")}
                        className="controlsIcon--Play-pause "
                        alt=""
                        src={pause}
                    />
                ) : (
                    <img
                        onClick={() => videoHandler("play")}
                        className="controlsIcon--Play-pause "
                        alt=""
                        src={play}
                    />
                )}
                <div className="time_progressbarContainer" >

                    <div className="time_progressBar"
                        ref={progressBarRef}
                        onClick={handleProgressBarClick}
                        style={{
                            width: `${progress}%`, width: '100%', height: '5px',
                            color: '#f4ff', cursor: 'pointer', borderRadius: 20
                        }}
                    >
                        {/* <span style={{fontsize:'100px',}}  >&#9711;</span> */}
                    </div>



                </div>
                <p className="controlsTime">
                    {Math.floor(currentTime / 60) +
                        ":" +
                        ("0" + Math.floor(currentTime % 60)).slice(-2)}
                    <text> / </text>
                    {Math.floor(videoTime / 60) +
                        ":" +
                        ("0" + Math.floor(videoTime % 60)).slice(-2)}
                </p>
                <img
                    src={setting}
                    className="controlsIcon--Play-pause " />

                {fullScreen ? (<img
                    src={full}
                    className="controlsIcon--Play-pause "
                    onClick={exitfullscreen} />)
                    :
                    (<img
                        className="controlsIcon--Play-pause "
                        onClick={toggleFullscreen}
                        src={exit} />
                    )
                }

                {isMuted ? <img
                className="controlsIcon--Play-pause "
                src={sound}/> :<img src={mute} className="controlsIcon--Play-pause " />}

                 <input
                        className="volum-up-down "
                        // style={{ background: '#fff444' }}
                        type="range"
                        min='0'
                        max='1'
                        step='0.1'
                        value={volume}
                        onChange={handleVolumeChange}
                    />


            </div>
        </div>
    );
}

export default Player;
