"use client"
import { useEffect } from "react"
import { useAudio } from "../AudioPlayer";

export const useMinimize = () => {
    
    const { setMaximized } = useAudio();
    
    useEffect(() => {
        setMaximized(false);
    }, []);
}