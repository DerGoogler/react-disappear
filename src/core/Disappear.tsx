import * as React from "react";

interface DisappearProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onDisappear: (visible: boolean) => void;
}

/**
 * Checks if the children are visible.
 * @extends {React.Component<HTMLDivElement>}
 */
class Disappear extends React.Component<DisappearProps> {
  private observer: IntersectionObserver;
  private ref: React.RefObject<HTMLDivElement>;

  public constructor(props: DisappearProps | Readonly<DisappearProps>) {
    super(props);

    this.ref = React.createRef<HTMLDivElement>();

    this.observer = new IntersectionObserver(([entry]) => {
      this.props.onDisappear(entry.isIntersecting);
    });
  }

  public componentDidMount() {
    // Check if ref is available
    if (this.ref.current) {
      this.observer.observe(this.ref.current);
    }
  }

  public componentWillUnmount() {
    this.observer.disconnect();
  }

  public render(): React.ReactNode {
    const { style, className, children } = this.props;
    return (
      <div ref={this.ref} style={style} className={className}>
        {children}
      </div>
    );
  }
}

export { Disappear, DisappearProps };
