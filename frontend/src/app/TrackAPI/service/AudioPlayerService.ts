import { Track } from "../domain/entity/Track";
import { AudioExtractor } from "../domain/port/AudioExtractor";
import { PlataformAPI } from "../domain/port/PlataformAPI";
import { SearchResult } from "../types/searchResult";

type History = {
    track: Track;
    audio: string;
}
type SetTrack = (track: Track) => void;
type SetPlayStatus = (status: boolean) => void;

export class AudioPlayerService {

    private MAX_HISTORY_SIZE: number = 30;

    plataformAPI: PlataformAPI;
    audioExtractor: AudioExtractor;
    audioElement: HTMLAudioElement;

    history: History[];
    cursor: number;

    setTrack: SetTrack;
    setPlayStatus: SetPlayStatus;

    constructor(plataformAPI: PlataformAPI, audioExtractor: AudioExtractor, audioElement: HTMLAudioElement, setTrack: SetTrack, setPlayStatus: SetPlayStatus) {
        this.plataformAPI = plataformAPI;
        this.audioExtractor = audioExtractor;
        this.audioElement = audioElement;
        this.setTrack = setTrack;
        this.setPlayStatus = setPlayStatus;

        this.audioElement.volume = 0.1;

        this.history = [];
        this.cursor = 0;

        this.audioElement.addEventListener("ended", () => this.next());
    }

    async searchTrack(name: string): Promise<SearchResult<Track>> {
        return await this.plataformAPI.searchTrack(name);
    }

    public async queue(track: Track) {
        if (this.history.length === this.MAX_HISTORY_SIZE) this.history = [];
        const audio = await this.audioExtractor.getAudio(track);
        this.history.push({track, audio});
    }

    public getCurrentTrack = () => this.history[this.cursor];

    public hasNext = () => this.cursor < this.history.length -1;

    public async load() {
        const { track, audio } = this.getCurrentTrack();
        this.changTrack(track, audio);

        const [relatedTrack] = await this.plataformAPI.getRelatedTrack(this.history[0].track, 1);
        this.queue(relatedTrack);
    }

    public changTrack(track: Track, audio: string) {
        this.audioElement.src = audio;
        this.audioElement.load();
        this.play();
        this.setTrack(track);
        this.audioElement.currentTime = 0;
    }

    public play() {
        this.audioElement.play();
        this.setPlayStatus(true);
    }

    public pause() {
        this.audioElement.pause();
        this.setPlayStatus(false);
    }

    public prev() {
        if (this.cursor === 0) return;
        this.cursor--;
        const { track, audio } = this.getCurrentTrack();
        this.changTrack(track, audio);
    }

    public next() {
        if (this.cursor === this.history.length - 1) return;
        this.cursor++;
        this.load();
        this.audioElement.currentTime = 0;
    }

    public goToPercent(percent: number) {
        const { duration } = this.audioElement;
        if (isNaN(duration)) return;

        this.audioElement.currentTime = (percent / 100) * duration;
    }

    public getProgress() {
        const { currentTime, duration } = this.audioElement;
        if (isNaN(duration) || duration < 0) return;
        return (currentTime / duration) * 100;
    }

    public clearQueue() {
        this.history = [];
        this.cursor = 0;
    }
}