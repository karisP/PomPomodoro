import React from 'react';
//reference https://www.30secondsofcode.org/react/s/use-interval

const useInterval = (callback, delay) => {
    const savedCallback = React.useRef(callback);
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export default useInterval;