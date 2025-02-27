import { useAudio } from "@/app/AudioProvider";
import { Track } from "@/app/TrackAPI/domain/entity/Track";
import { useState } from "react";

export function TrackThumbnail({track}: {track: Track}) {
    
    const  { loadInitTrack } = useAudio();

    const handleClick = async () => {
        loadInitTrack(track);
    }

    return (
        <div className="flex gap-3 cursor-pointer" onClick={handleClick}>
            <img
                src={track.album.img}
                alt={track.album.name}
                className="h-16 aspect-square"
            />
            
            <div className="w-full flex flex-col">
                <h3>{track.name}</h3>
                <small>{track.artists.map(a => a.name).join(", ")}</small>
            </div>
        </div>
    )
}