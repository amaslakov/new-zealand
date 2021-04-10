import { KeyboardEvent, MouseEvent } from 'react';

interface Props {
  src: string;
  alt?: string;
  circle?: boolean;
  onClick?(event: MouseEvent | KeyboardEvent, src: string, alt?: string): void;
}

function ImageThumbnail(props: Props) {
  const handleClick = (event: MouseEvent | KeyboardEvent) => {
    if (props.onClick) props.onClick(event, props.src, props.alt);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === ' ' || event.key === 'Enter') handleClick(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') event.currentTarget.blur();
  };

  return (
    <div
      onClick={handleClick}
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
  onClick: undefined,
};

export default ImageThumbnail;
