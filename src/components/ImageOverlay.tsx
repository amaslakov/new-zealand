import { KeyboardEvent, useContext, useEffect, useRef } from 'react';
import { OverlayContext } from '../contexts/OverlayContext';
import SassVariables from '../index.module.scss';
import Portal from './Portal';

const TRANSITION_DURATION = parseFloat(SassVariables.transitionDuration) * 1000 || 300;

export interface OverlayState {
  open: boolean;
  src: string;
  alt?: string;
  source: (EventTarget & HTMLDivElement) | null;
  exitState: boolean;
}

function ImageOverlay() {
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const { open, src, alt, sourceNode, setState, transitionState } = useContext(OverlayContext);

  useEffect(() => {
    if (closeButtonRef.current !== null) {
      closeButtonRef.current.focus();
    }
    if (open && transitionState === 'enter') setState({ transitionState: 'entering' });
  }, [open, setState, transitionState]);

  const handleClose = () => {
    setState({ transitionState: 'exiting' });
    setTimeout(() => {
      setState({ open: false, transitionState: 'exited' });
      sourceNode?.focus({ preventScroll: true });
    }, TRANSITION_DURATION);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') handleClose();
    if (event.key === 'Tab') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') handleClose();
  };

  const entering = transitionState === 'entering';

  return (
    <Portal open={open}>
      <div className={`background ${entering ? 'background--modal-open' : ''}`} />
      <div role="presentation" className="modal-container" onKeyDown={handleKeyDown} tabIndex={-1}>
        <div role="dialog" aria-label={alt} className={`overlay ${entering ? 'overlay--open' : ''}`}>
          <h4>{alt}</h4>
          <img src={src} alt={alt} />
          <div
            ref={closeButtonRef}
            className="close-button"
            role="button"
            aria-label="Close"
            onClick={handleClose}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            tabIndex={0}
          />
        </div>
      </div>
    </Portal>
  );
}

ImageOverlay.defaultProps = {
  onClose: undefined,
  onExiting: undefined,
};

export default ImageOverlay;
