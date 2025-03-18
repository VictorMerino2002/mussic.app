"use client"
import { useAudio } from "@/app/AudioPlayer";
import { theme } from "@/app/config";
import { Playlist } from "@/app/TrackAPI/domain/entity/Playlist";
import { PlaylistThumbnail } from "@/components/PlaylistThumbnail";
import { useEffect, useState } from "react";

export default function UserPlaylistsPage() {
    const { platformAPI, token } = useAudio();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        platformAPI.getCurrentUserPlaylists(token.user)
        .then(res => setPlaylists(res));
    }, []);

    return (
        <main className="flex flex-col gap-5 p-4 min-h-screen" style={{ background: theme.bg2 }}>
            <h1 className="p-4 pl-6 font-bold text-2xl w-full absolute left-0 top-0" style={{background: theme.bg}}>Playlists</h1>

            <div className="flex flex-col gap-1 p-2 pb-20 pt-16">
                {playlists ? playlists.map(playlist => (
                    <PlaylistThumbnail key={playlist.id} playlist={playlist} />
                )) : null}
            </div>
        </main>
    );
}