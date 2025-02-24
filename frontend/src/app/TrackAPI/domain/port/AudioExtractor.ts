import { Track } from "../entity/Track";

export interface AudioExtractor {
    getAudio(track: Track): Promise<string>;
}