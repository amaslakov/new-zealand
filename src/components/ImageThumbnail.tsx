import { KeyboardEvent, MouseEvent, useContext } from 'react';
import { OverlayContext } from '../contexts/OverlayContext';

interface Props {
  src: string;
  alt?: string;
  circle?: boolean;
}

function ImageThumbnail(props: Props) {
  const { setState } = useContext(OverlayContext);

  const handleOpenOverlay = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    setState({
      open: true,
      transitionState: 'enter',
      sourceNode: event.currentTarget,
      src: props.src,
      alt: props.alt,
    });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.key === ' ' || event.key === 'Enter') handleOpenOverlay(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') event.currentTarget.blur();
  };

  return (
    <div
      onClick={handleOpenOverlay}
      onKeyPress={handleKeyPress}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`${props.alt} image thumbnail`}
      tabIndex={0}
      className={`image-container ${props.circle ? 'image-container--circle' : ''}`}
    >
      <img src={props.src} alt={props.alt} />
    </div>
  );
}

ImageThumbnail.defaultProps = {
  alt: '',
  circle: false,
};

export default ImageThumbnail;
