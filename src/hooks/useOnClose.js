import {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus, EventEmitter} from 'react-native';

export const useOnClose = (
  callbackOpen: () => Promise<void>,
  callbackClose: () => Promise<void>,
) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log(
        'fire w/ current appstate of ',
        appState,
        ' and w/nextappstate of ',
        nextAppState,
      );
      if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        callbackClose();
      } else if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        callbackOpen();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [callbackOpen, callbackClose]);
};
