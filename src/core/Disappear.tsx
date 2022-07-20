import * as React from "react";

interface DisappearProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onDisappear: (visible: boolean) => void;
  wrapper: keyof JSX.IntrinsicElements;
}

/**
 * Checks if the children are visible.
 * @required Wrapper
 * @extends {React.Component<Element>}
 */
class Disappear extends React.Component<DisappearProps> {
  private observer: IntersectionObserver;
  private ref: React.RefObject<Element>;

  public constructor(props: DisappearProps | Readonly<DisappearProps>) {
    super(props);
    this.ref = React.createRef<Element>();
    this.observer = new IntersectionObserver(([entry]) => {
      this.props.onDisappear(entry.isIntersecting);
    });
  }

  public componentDidMount() {
    if (this.ref.current) {
      this.observer.observe(this.ref.current);
    }
  }

  public componentWillUnmount() {
    this.observer.disconnect();
  }

  public render(): React.ReactNode {
    const { style, className, children, wrapper } = this.props;
    return React.createElement(wrapper, { ref: this.ref, style: style, className: className, key: "disappear-outer" }, children);
  }
}

export { Disappear, DisappearProps };
