import { Track } from "../domain/entity/Track";
import { AudioExtractor } from "../domain/port/AudioExtractor";
const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

export class SelfAudioExtractor implements AudioExtractor {
    async getAudio(track: Track): Promise<string> {
        const enpoint = backend + `/audio?query=${encodeURI(track.name + " " + track.artists[0].name)}`
        const res = await fetch(enpoint);
        const { url } = await res.json();
        return url;
    }
}