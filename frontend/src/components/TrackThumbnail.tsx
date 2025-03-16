import { useAudio } from "@/app/AudioProvider";
import { defaultImg } from "@/app/config";
import { Track } from "@/app/TrackAPI/domain/entity/Track";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export function TrackThumbnail({track}: {track: Track}) {
    
    const  { loadInitTrack } = useAudio();
    const [searchTrackHistory, setSearchTrackHistory] = useLocalStorage<Track[]>("searchTrackHistory", []);

    const handleClick = async () => {
        loadInitTrack(track);
        setSearchTrackHistory((prev) => {
            if (!prev.some((t) => t.id === track.id)) {
                return [...prev, track];
            }
            return prev;
        });
    }

    const img = track?.album?.img || defaultImg;
    const imgAlt = track?.album?.name || "default image";

    return (
        <div className="flex gap-3 cursor-pointer p-3 rounded-md" onClick={handleClick} style={{background: "#0009"}}>
            <img
                src={img}
                alt={imgAlt}
                className="h-16 aspect-square"
            />
            
            <div className="w-full flex flex-col">
                <h3>{track.name}</h3>
                <small>{track.artists.map(a => a.name).join(", ")}</small>
            </div>
        </div>
    )
}