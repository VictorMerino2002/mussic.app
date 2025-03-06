"use client"

import { useAudio } from "@/app/AudioProvider";
import { Artist } from "@/app/TrackAPI/domain/entity/Artist";
import React, { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

type ParamsType = {
    id: string;
}

export default function ArtistPage({ params }: { params: ParamsType }) {
    const { id } = React.use<ParamsType>(params);
    const [storageArtist, setStorageArtist] = useSessionStorage<Artist | null>("artist", null);
    const [artist, setArtist] = useState<Artist | null>(storageArtist);
    const { platformAPI, token } = useAudio();

    useEffect(() => {
        if (storageArtist) return;
        platformAPI.getArtistById(id, token.base)
            .then((res: Artist) => setArtist(res));
    }, []);


    return (
        <main>
            {artist?.name}
        </main>
    )
}