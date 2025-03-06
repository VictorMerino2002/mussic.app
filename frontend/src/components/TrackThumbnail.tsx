import { useAudio } from "@/app/AudioProvider";
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