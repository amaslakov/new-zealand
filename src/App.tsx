import './App.scss';
import ImageOverlay from './components/ImageOverlay';
import Main from './components/Main';
import OverlayProvider from './contexts/OverlayProvider';

function App() {
  return (
    <OverlayProvider>
      <Main />
      <ImageOverlay />
    </OverlayProvider>
  );
}

export default App;
