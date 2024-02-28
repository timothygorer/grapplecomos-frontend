import React, {useCallback, useState} from 'react';

const useLayout = () => {
  const [layout, setLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = useCallback(e => setLayout(e.nativeEvent.layout), []);

  return {
    layout,
    onLayout,
  };
};

export default useLayout;
