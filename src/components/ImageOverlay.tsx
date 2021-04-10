import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import Portal from './Portal';

export interface OverlayState {
  open: boolean;
  src: string;
  alt?: string;
  source: (EventTarget & HTMLDivElement) | null;
  exitState: boolean;
}

interface Props {
  state: OverlayState;
  onClose?(): void;
  onExiting?(): void;
}

function ImageOverlay(props: Props) {
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (closeButtonRef.current !== null) {
      closeButtonRef.current.focus();
    }
    setEntering(props.state.open);
  }, [props.state.open]);

  const handleClose = () => {
    setEntering(false);
    if (props.onExiting) props.onExiting();
    setTimeout(() => props.onClose && props.onClose(), 300);
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

  return (
    <Portal open={props.state.open}>
      <div className={`background ${entering ? 'background--modal-open' : ''}`} />
      <div role="presentation" className="modal-container" onKeyDown={handleKeyDown} tabIndex={-1}>
        <div role="dialog" aria-label={props.state.alt} className={`overlay ${entering ? 'overlay--open' : ''}`}>
          <h4>{props.state.alt}</h4>
          <img src={props.state.src} alt={props.state.alt} />
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
