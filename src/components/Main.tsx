import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from 'react';
import { OverlayState } from './ImageOverlay';
import ImageThumbnail from './ImageThumbnail';

interface Props {
  overlayState: OverlayState;
  setOverlayState: Dispatch<SetStateAction<OverlayState>>;
}

function Main(props: Props) {
  const handleOpen = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>, src: string, alt?: string) => {
    document.body.style.overflow = 'hidden';
    props.setOverlayState({ open: true, src, alt, source: event.currentTarget, exitState: false });
  };

  return (
    <div className={`main ${props.overlayState.exitState ? '' : 'main--overlay-open'}`}>
      <header>
        <h4>New Zealand</h4>
        <p>
          This project might be trickier than it seems. Look around carefully. What you see? The sky is blue, the grass
          is green. The sun shines through the window.
        </p>
      </header>
      <section>
        <ImageThumbnail
          onClick={handleOpen}
          src={`${process.env.PUBLIC_URL}/images/new-zealand-679068_1920.jpg`}
          alt="Lake Wakatipu"
          circle
        />
        <ImageThumbnail
          onClick={handleOpen}
          src={`${process.env.PUBLIC_URL}/images/new-zealand-583176_1920.jpg`}
          alt="Some other lake"
        />
        <ImageThumbnail
          onClick={handleOpen}
          src={`${process.env.PUBLIC_URL}/images/new-zealand-583181_1920.jpg`}
          alt="Lake in mountains"
        />
        <ImageThumbnail
          onClick={handleOpen}
          src={`${process.env.PUBLIC_URL}/images/sun-rise-661541_1920.jpg`}
          alt="New Zealand sunset"
          circle
        />
      </section>
    </div>
  );
}

export default Main;
