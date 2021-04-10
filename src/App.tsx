import './App.scss';
import { useState } from 'react';
import ImageOverlay, { OverlayState } from './components/ImageOverlay';
import Main from './components/Main';

const overlayClosed: OverlayState = { open: false, src: '', source: null, exitState: true };

function App() {
  const [overlayState, setOverlayState] = useState<OverlayState>(overlayClosed);

  const handleClose = () => {
    overlayState.source?.focus({ preventScroll: true });
    setOverlayState(overlayClosed);
  };

  const handleExiting = () => {
    document.body.style.overflow = 'unset';
    setOverlayState((current) => ({ ...current, exitState: true }));
  };

  return (
    <>
      <Main overlayState={overlayState} setOverlayState={setOverlayState} />
      <ImageOverlay state={overlayState} onClose={handleClose} onExiting={handleExiting} />
    </>
  );
}

export default App;
