import { JR } from "jrgt";
import * as React from "react";

interface DisappearProps<T = HTMLElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  /**
   * @return The current state of the disappear component
   */
  onDisappear: (visible: boolean) => void;
  /**
   * Used to wrap the inner children
   */
  wrapper: keyof JSX.IntrinsicElements;
  onClick?: React.MouseEventHandler<T> | undefined;
  onDoubleClick?: React.MouseEventHandler<T> | undefined;
}

/**
 * Checks if the children are visible.
 * @required Wrapper
 * @extends {JR.Component<Element>}
 * @example
 * ```tsx
 * <Disappear
 *   wrapper="span"
 *   onDisappear={(visible) => {
 *     this.setState({
 *       appToolbarTitle: !visible,
 *     });
 *   }}
 *   style={{ display: "inline-flex", fontSize: "23px", width: "100%" }}
 *  >
 *    {name}
 * </Disappear>
 * ```
 */
class Disappear extends JR.Component<DisappearProps> {
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

  public jrender(): JR.JRNode[] {
    const { style, className, children, wrapper, onClick, onDoubleClick } = this.props;
    return [
      {
        [wrapper]: {
          ref: this.ref,
          style: style,
          className: className,
          key: "disappear-outer",
          onClick: onClick,
          onDoubleClick: onDoubleClick,
          children: children,
        },
      },
    ];
  }
}

export { Disappear, DisappearProps };
