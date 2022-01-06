import React from 'react';

const useAudio = (blankAudio, yayAudio, timerFinished, enabled) => {

    const soundEffect = React.useRef(new Audio());
    if (soundEffect.current && enabled) {
        soundEffect.current.autoplay = true;
    }

    React.useEffect(() => {
        if (soundEffect.current && enabled) {
            if (timerFinished) {
                soundEffect.current.src = yayAudio;
            } else {
                soundEffect.current.src = blankAudio;
            }
        }
    }, [blankAudio, yayAudio, timerFinished, enabled]);
}

export default useAudio;