import {useEffect} from 'react';
import {AppState, AppStateStatus, EventEmitter} from 'react-native';

export const useOnOpen = (callback: () => Promise<void>) => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', appState => {
      if (appState === 'active') {
        callback();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [callback]);
};
