import { useAudio } from "@/app/AudioProvider";
import { Track } from "@/app/TrackAPI/domain/entity/Track";
import { LineLoader } from "./ui/lineLoader";
import { useState } from "react";

export function TrackThumbnail({track}: {track: Track}) {
    
    const audioPlayerService = useAudio();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        audioPlayerService.clearQueue();
        await audioPlayerService.queue(track);
        audioPlayerService.load();
        setLoading(false);
    }

    return (
        <div className="flex gap-3 cursor-pointer" onClick={handleClick}>
            <img
                src={track.album.img}
                alt={track.album.name}
                className="h-16"
            />
            
            <div className="w-full flex flex-col">
                <h3>{track.name}</h3>
                <small>{track.artists.map(a => a.name)}</small>
                {loading ? <LineLoader/> : null}
            </div>
        </div>
    )
}