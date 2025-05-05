// src/components/BackgroundAudio.tsx
import React, { useEffect, useRef } from 'react'

export default function BackgroundAudio() {
    const ambientAudio = new Audio('./ambient-audio.mp3');

    ambientAudio.play();

    return <></>
}
