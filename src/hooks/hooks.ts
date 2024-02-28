import {useEffect, useRef} from 'react';
import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import type {AppDispatch, RootState} from '../redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};
