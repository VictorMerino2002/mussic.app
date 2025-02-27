import { useRef, ReactNode, useEffect, useState, useContext } from "react";
import { createContext } from "react";
import { SpotifyAPI } from "./TrackAPI/adapter/SpotifyAPI";
import { SelfAudioExtractor } from "./TrackAPI/adapter/SelfAudioExtractor";
import { Track } from "./TrackAPI/domain/entity/Track";
import { FaPause, FaPlay, FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Slider } from "@/components/ui/slider";
import ColorThief from "colorthief";
import { DefaultLoader } from "@/components/ui/Loaders";

const AudioContext = createContext<any>(null);
const MAX_HISTORY_SIZE = 25;

export function AudioProvider({ children }: { children: ReactNode }) {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [playStatus, setPlayStatus] = useState(true);
    const [isSliding, setIsSliding] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const [maximized, setMaximized] = useState(true);
    const [dominantColor, setDominantColor] = useState("rgb(0, 0, 0)");
    const [loading, setLoading] = useState(true);

    const plataformAPI = new SpotifyAPI();
    const audioExtractor = new SelfAudioExtractor();

    const [trackHistory, setTrackHistory] = useState<Track[]>([]);
    const [audioHistory, setAudioHistory] = useState<string[]>([]);
    const [cursor, setCursor] = useState(0);

    useEffect(() => {
        const getToken = async () => {
            if (!audioRef.current) return;
            await plataformAPI.getToken();
        }
        getToken();
    },[audioRef]);

    useEffect(() => {
        if (!playStatus) return;
        const interval = setInterval(handleTrackProgress, 1000);
        return () => clearInterval(interval);
    }, [playStatus, isSliding]);
    
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        const currnetTrack = getCurrentTrack();
        if (!currnetTrack.track) return;
        img.src = currnetTrack.track.album.img;
    
        img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
    }, [cursor, trackHistory]);

    useEffect(() => {
        if (trackHistory.length > 0 && audioHistory.length > 0) {
          changeAudioSrc();
        }
      }, [cursor, trackHistory, audioHistory]);
      

    const handleTrackProgress = () => {
        if (isSliding) return;
        const progress = getProgress();
        if (!progress) return;
        setTrackProgress(progress);
    }
    
    const togglePlayPause = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!audioRef.current) return;
        setPlayStatus(prev => !prev);
        playStatus ? audioRef.current.pause() : audioRef.current.play();
    };
    
    const handleSliderCommit = (value: number) => {
        setIsSliding(false);
        goTo(value);
    }

    const queue = async (track: Track) => {
        if (trackHistory.length === MAX_HISTORY_SIZE) clearQueue();
        setTrackHistory(prev => [...prev, track]);
        const audio = await audioExtractor.getAudio(track);
        setLoading(false);
        setAudioHistory(prev => [...prev, audio]);
    }

    const changeAudioSrc = () => {
        if (!audioRef.current) return;
        const { audio } = getCurrentTrack();
        audioRef.current.src = audio;
        audioRef.current.load();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    }

    const getAndQueueRelatedTrack = async (baseTrack?: Track) => {
        if (cursor === 0 && cursor !== history.length -1) return;
        const trackToUse = baseTrack ? baseTrack : trackHistory[0];
        const [relatedTrack] = await plataformAPI.getRelatedTrack(trackToUse, 1);
        queue(relatedTrack);
    }

    const prev = () => {
        if (cursor === 0) return;
        setCursor(prev => prev -1);
    }

    const next = () => {
        if (cursor === audioHistory.length - 1) return;
        setCursor(prev => prev +1);
        getAndQueueRelatedTrack();
    }

    const getCurrentTrack = () => {
        return {
            track: trackHistory[cursor],
            audio: audioHistory[cursor]
        }
    }

    const getProgress = (): number => {
        if (!audioRef.current) return 0;
        const { duration, currentTime } = audioRef.current;
        return (currentTime / duration) * 100;
    }
    
    const goTo = (percent: number) => {
        if (!audioRef.current) return;
        const { duration } = audioRef.current;
        audioRef.current.currentTime = (percent/100) * duration;
    }

    const clearQueue = () => {
        setTrackHistory([]);
        setAudioHistory([]);
        setCursor(0);
    }

    const loadInitTrack = async (track: Track) => {
        setMaximized(true);
        clearQueue();
        await queue(track);
        getAndQueueRelatedTrack(track);
    }

    const bg = maximized ? `linear-gradient(180deg, ${dominantColor}, #000)` : dominantColor;

    return (
        <AudioContext.Provider value={ { loadInitTrack, plataformAPI, setMaximized }}>
            {children}

            {trackHistory.length > 0 ? maximized ? (
            <div className="fixed h-full w-full flex flex-col justify-center gap-7 items-center top-0 left-0 p-10" style={{background: bg}}>
                <button className="absolute top-8 left-8 z-50" onClick={() => setMaximized(false)}>
                    <IoIosArrowDown size={20}/>
                </button>
                <main className="flex flex-col w-full gap-4 items-center">
                    <img className="rounded-md w-full max-w-80" src={trackHistory[cursor].album.img} alt={trackHistory[cursor].name} />
                    <div className="w-full">
                        <h2 className="w-full">{trackHistory[cursor].name}</h2>
                        <small className="w-full">{trackHistory[cursor].artists.map(a => a.name).join(", ")}</small>
                    </div>
                </main>
                <section className="w-full flex flex-col gap-5">
                    <Slider 
                        onValueChange={(value) => {
                            setIsSliding(true);
                            setTrackProgress(value[0]);
                        }}
                        onValueCommit={(value) => handleSliderCommit(value[0])}
                        value={[trackProgress]}
                        className="w-full"
                    />
                    <div className="flex justify-center gap-2">
                        <button disabled={cursor === 0} className="p-4 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => prev()}>
                            <FaBackwardStep />
                        </button>

                        <button className="bg-white p-2 rounded-full aspect-square flex justify-center items-center" onClick={(e) => togglePlayPause(e)}>
                            {loading ? <DefaultLoader/> 
                            :playStatus ? <FaPause size={20} color="#000"/>: <FaPlay size={20} color="#000" />}
                        </button>

                        <button disabled={cursor >= audioHistory.length -1} className="p-4 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => next()}>
                            <FaForwardStep />
                        </button>
                    </div>
                </section>
            </div>
            ): (
                <div className="fixed bottom-20 left-4 flex justify-between gap-4 p-2 rounded-md" style={{backgroundColor: bg, width: "calc(100% - 2rem)"}} onClick={() => setMaximized(true)}>
                    <img className="rounded-md w-14" src={trackHistory[cursor].album.img} alt={trackHistory[cursor].name} />

                    <div>
                        <h2 className="w-full">{trackHistory[cursor].name}</h2>
                        <small className="w-full">{trackHistory[cursor].artists.map(a => a.name).join(", ")}</small>
                    </div>

                    <button className="bg-none p-4" onClick={(e) => togglePlayPause(e)}>
                            {playStatus ? <FaPause size={20}/>: <FaPlay size={20}/>}  
                    </button>
                </div>
            )
            : null}
            <audio ref={audioRef} onEnded={() => next()}/>
        </AudioContext.Provider>
    )
}

export const useAudio = () => useContext(AudioContext);