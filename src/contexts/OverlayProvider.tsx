import { ReactNode, useMemo, useState } from 'react';
import { OverlayContext, OverlayState } from './OverlayContext';

const overlayClosed: OverlayState = {
  open: false,
  src: '',
  alt: '',
  sourceNode: null,
  transitionState: 'exited',
};

interface Props {
  children: ReactNode;
}

function OverlayProvider(props: Props) {
  const [overlayState, setOverlayState] = useState<OverlayState>(overlayClosed);

  const contextValue = useMemo(() => {
    const setState = (newState: Partial<OverlayState>) => {
      if (newState.transitionState === 'entering') document.body.style.overflow = 'hidden';
      if (newState.transitionState === 'exiting') document.body.style.overflow = 'unset';
      setOverlayState((currentState) => ({ ...currentState, ...newState }));
    };

    return {
      ...overlayState,
      setState,
    };
  }, [overlayState]);

  return <OverlayContext.Provider value={contextValue}>{props.children}</OverlayContext.Provider>;
}

export default OverlayProvider;
