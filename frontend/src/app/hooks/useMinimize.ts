"use client"
import { useEffect } from "react"
import { useAudio } from "../AudioProvider";

export const useMinimize = () => {
    
    const { setMaximized } = useAudio();
    
    useEffect(() => {
        setMaximized(false);
    }, []);
}