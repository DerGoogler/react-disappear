import { doc, Util } from "googlers-tools";
import * as React from "react";

interface DisappearProps<T = HTMLElement> {
  children: React.ReactNode;
  style?: Util.Undefineable<React.CSSProperties>;
  className?: string;
  /**
   * @return The current state of the disappear component
   */
  onDisappear: (visible: boolean) => void;
  /**
   * Used to wrap the inner children
   */
  wrapper: keyof JSX.IntrinsicElements;
  onClick?: Util.Undefineable<React.MouseEventHandler<T>>;
  onDoubleClick?: Util.Undefineable<React.MouseEventHandler<T>>;
}

/**
 * Checks if the children are visible.
 * @required Wrapper
 * @extends {React.Component<DisappearProps>}
 */
class Disappear extends React.Component<DisappearProps> {
  private observer: IntersectionObserver;
  private ref: React.RefObject<Element>;

  public constructor(props: Readonly<DisappearProps>) {
    super(props);
    this.ref = React.createRef<Element>();
    this.observer = new IntersectionObserver(([entry]) => {
      props.onDisappear(entry.isIntersecting);
    });
  }

  public componentDidMount() {
    doc.findRef<Element>(this.ref, ref => {
      this.observer.observe(ref);
    });
  }

  public componentWillUnmount() {
    this.observer.disconnect();
  }

  public render(): React.ReactNode {
    const { style, className, children, wrapper, onClick, onDoubleClick } = this.props;
    return React.createElement(wrapper, { ref: this.ref, style: style, className: className, onClick: onClick, onDoubleClick: onDoubleClick }, children);
  }
}

export { Disappear, DisappearProps };
