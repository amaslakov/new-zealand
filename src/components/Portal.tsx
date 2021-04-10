import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  open: boolean;
  children: ReactNode;
}

function Portal(props: Props) {
  if (!props.open) return null;
  return createPortal(<div className="portal">{props.children}</div>, document.body);
}

export default Portal;
