import React from 'react';

const useMedia = (audio, audioContext, timerFinished) => {
    const savedSource = React.useRef(audioContext?.createBufferSource());
    React.useEffect(() => {
        if (audioContext){
            savedSource.current = audioContext?.createBufferSource();
            console.log('setting audioContext.bufferSource ref current');
        } else {
            console.log('audioContext is not defined yet');
        }
    }, [audioContext]);

    React.useEffect(() => {
        console.log("audioContext", audioContext, "bufferSource", savedSource.current, timerFinished);
        if (audioContext && savedSource.current) {
            navigator.mediaDevices
                ?.getUserMedia({ audio: true })
                .then(() => {
                    const source = savedSource.current;
                    console.log("got media...opening a request");
                    const request = new XMLHttpRequest();
                    request.open('GET', audio, true);
                    request.responseType = 'arraybuffer';
                    if (timerFinished) {
                        console.log("timer just finished, decoding audio");
                        request.onload = () => {
                            audioContext.decodeAudioData(
                                request.response,
                                (buffer) => {
                                    source.buffer = buffer;
                                    source.connect(audioContext.destination);
                                    source.start();
                                },
                                (e) => {
                                    console.log('Error with decoding audio data' + e.message);
                                });
                        }

                        request.send();
                    }
                })
                .catch(reason => console.error(`Audio permissions denied: ${reason}`));
        }
    }, [audioContext, timerFinished, audio]);
};

export default useMedia;