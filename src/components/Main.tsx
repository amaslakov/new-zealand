import { useContext } from 'react';
import { OverlayContext } from '../contexts/OverlayContext';

import ImageThumbnail from './ImageThumbnail';

function Main() {
  const { transitionState } = useContext(OverlayContext);

  const exitingOrExited = transitionState === 'exiting' || transitionState === 'exited';

  return (
    <div className={`main ${exitingOrExited ? '' : 'main--overlay-open'}`}>
      <header>
        <h1>New Zealand</h1>
        <p>
          This project might be trickier than it seems. Look around carefully. What you see? The sky is blue, the grass
          is green. The sun shines through the window.
        </p>
      </header>

      <section>
        <ImageThumbnail
          src={`${process.env.PUBLIC_URL}/images/new-zealand-679068_1920.jpg`}
          alt="Lake Wakatipu"
          circle
        />
        <ImageThumbnail src={`${process.env.PUBLIC_URL}/images/new-zealand-583176_1920.jpg`} alt="Some other lake" />
        <ImageThumbnail src={`${process.env.PUBLIC_URL}/images/new-zealand-583181_1920.jpg`} alt="Lake in mountains" />
        <ImageThumbnail
          src={`${process.env.PUBLIC_URL}/images/sun-rise-661541_1920.jpg`}
          alt="New Zealand sunset"
          circle
        />
      </section>
    </div>
  );
}

export default Main;
