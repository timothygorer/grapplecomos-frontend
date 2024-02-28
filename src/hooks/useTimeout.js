import {useEffect, useRef, useCallback, useState} from 'react';

export const useTimeout = (fn: () => void, delay = 0, autoStart = false) => {
  // as isActive is useState instead of useRef, this will re-render the component, and always gets the updated value
  const [isActive, setIsActive] = useState(() => (autoStart ? false : null));
  const timeout = useRef();
  const callback = useRef(fn);

  const restart = useCallback(() => {
    console.log('restarting timer...');
    setIsActive(false);
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setIsActive(true);
      callback.current();
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    setIsActive(null);
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update callback
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // On mount restart timeout, on unmount clear timeout
  useEffect(() => {
    // if autoStart true, it won't be necessary to call restart method on initial render
    if (autoStart) {
      restart();

      return clear;
    }
    return () => {
      return undefined;
    };
  }, [autoStart, clear, restart]);

  return [restart, clear, isActive];
};
