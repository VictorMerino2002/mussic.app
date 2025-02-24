import { useRef, ReactNode, useEffect, useState, useContext } from "react";
import { createContext } from "react";
import { SpotifyAPI } from "./TrackAPI/adapter/SpotifyAPI";
import { AudioPlayerService } from "./TrackAPI/service/AudioPlayerService";
import { SelfAudioExtractor } from "./TrackAPI/adapter/SelfAudioExtractor";
import { Track } from "./TrackAPI/domain/entity/Track";
import { FaPause, FaPlay, FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Slider } from "@/components/ui/slider";
import ColorThief from "colorthief";

const AudioContext = createContext<any>(null);

export function AudioProvider({ children }: { children: ReactNode }) {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [trackAPIService, setTrackAPIService] = useState<AudioPlayerService>();
    const [track, setTrack] = useState<Track | null>(null);
    const [playStatus, setPlayStatus] = useState(true);
    const [isSliding, setIsSliding] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const [maximized, setMaximized] = useState(true);
    const [dominantColor, setDominantColor] = useState("rgb(0, 0, 0)");

    useEffect(() => {
        const initTrackAPIService = async () => {
            if (!audioRef.current) return;
            const spotifyAPI = new SpotifyAPI();
            await spotifyAPI.getToken();

            const audioExtractor = new SelfAudioExtractor();

            const trackAPIService = new AudioPlayerService(spotifyAPI, audioExtractor, audioRef.current, setTrack, setPlayStatus);
            setTrackAPIService(trackAPIService);
        }
        initTrackAPIService();
    },[audioRef]);

    useEffect(() => {
        if (!playStatus || !trackAPIService) return;
        const interval = setInterval(handleTrackProgress, 1000);
        return () => clearInterval(interval);
    }, [playStatus, trackAPIService, isSliding]);
    
    useEffect(() => {
        if (!track) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = track?.album.img;
    
        img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
    }, [track]);


    const handleTrackProgress = () => {
        if (isSliding) return;
        const progress = trackAPIService?.getProgress();
        if (!progress) return;
        setTrackProgress(progress);
    }

    const togglePlayPause = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!trackAPIService) return;
        playStatus ? trackAPIService.pause() : trackAPIService.play();
    };
    

    const handleSliderCommit = (value: number) => {
        setIsSliding(false);
        trackAPIService?.goToPercent(value);
    }
    const bg = maximized ? `linear-gradient(180deg, ${dominantColor}, #000)` : dominantColor;

    return (
        <AudioContext.Provider value={trackAPIService}>
            {children}

            {track ? maximized ? (
            <div className="fixed h-full w-full flex flex-col justify-center gap-7 items-center top-0 left-0 p-10" style={{background: bg}}>
                <button className="absolute top-8 left-8 z-50" onClick={() => setMaximized(false)}>
                    <IoIosArrowDown size={20}/>
                </button>
                <main className="flex flex-col w-full gap-4 items-center">
                    <img className="rounded-md w-full max-w-80" src={track.album.img} alt={track.name} />
                    <div className="w-full">
                        <h2 className="w-full">{track.name}</h2>
                        <small className="w-full">{track.artists.map(a => a.name)}</small>
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
                        <button className="p-4" onClick={(e) => trackAPIService?.prev()}>
                            <FaBackwardStep />
                        </button>

                        <button className="bg-white p-4 rounded-full" onClick={(e) => togglePlayPause(e)}>
                            {playStatus ? <FaPause size={20} color="#000"/>: <FaPlay size={20} color="#000" />}  
                        </button>

                        <button className="p-4" onClick={(e) => trackAPIService?.next()}>
                            <FaForwardStep />
                        </button>
                    </div>
                </section>
            </div>
            ): (
                <div className="fixed bottom-20 flex justify-between gap-4 p-2 rounded-md" style={{backgroundColor: bg, width: "calc(100% - 2rem)"}} onClick={() => setMaximized(true)}>
                    <img className="rounded-md w-14" src={track.album.img} alt={track.name} />

                    <div>
                        <h2 className="w-full">{track.name}</h2>
                        <small className="w-full">{track.artists.map(a => a.name)}</small>
                    </div>

                    <button className="bg-none p-4" onClick={(e) => togglePlayPause(e)}>
                            {playStatus ? <FaPause size={20}/>: <FaPlay size={20}/>}  
                    </button>
                </div>
            )
            : null}
            <audio ref={audioRef} />
        </AudioContext.Provider>
    )
}

export const useAudio = (): AudioPlayerService => useContext(AudioContext);