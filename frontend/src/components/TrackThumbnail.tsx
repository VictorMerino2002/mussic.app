import { useAudio } from "@/app/AudioPlayer";
import { defaultImg } from "@/app/config";
import { useSearchHistory } from "@/app/hooks/useSearchHistory";
import { Track } from "@/app/TrackAPI/domain/entity/Track";
import Link from "next/link";

export function TrackThumbnail({track}: {track: Track}) {
    
    const  { loadInitTrack } = useAudio();
    const trackHistory = useSearchHistory<Track>("track");

    const handleClick = async () => {
        loadInitTrack(track);
        trackHistory.push(track);
    }

    const img = track?.album?.img || defaultImg;
    const imgAlt = track?.album?.name || "default image";

    return (
        <div className="flex gap-3 cursor-pointer p-2 rounded-md" onClick={handleClick} style={{background: "#0009"}}>
            <img
                src={img}
                alt={imgAlt}
                className="h-16 aspect-square rounded-md"
            />
            
            <div className="flex flex-col">
                <h3>{track.name}</h3>
                <small className="truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
                    {track.artists.map((a, index) => (
                        <span key={a.id}>
                            <Link onClick={(e) => e.stopPropagation()} href={`/artist/${a.id}`}>{a.name}</Link>
                            {index < track.artists.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </small>
            </div>
        </div>
    )
}