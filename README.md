# React Disappear

I wanted to give this library the name `react-visible`, but it is taken for an useless component. So back to the main! This component detects if the inner children are visible or not. With `onDisappear: (visible: boolean) => void;` can you get the current visible state

## Install

```bash
# With NPM
npm add react-disappear

# With Yarn
yarn add react-disappear

# With bun
bun add react-disappear

# In some cases you'll need tslib, do this by:
npm add --save-dev tslib
```

### How to use

> Class Component requires an wrapper

```tsx
import { Disappear } from "react-disappear";
import { rct, print } from "googlers-tools";

function App() {
  return (
    <div>
      <Disappear
        wrapper="div"
        onDisappear={visible => {
          print.out(visible);
        }}
        wrapperProps={{
          style: {
            backgroundColor: "#fff",
          },
        }}
      >
        <span>Content</span>
        <span>Content</span>
        <span>Content</span>
        <span>Content</span>
        <span>Content</span>
      </Disappear>
    </div>
  );
}

rct.renderAuto(App);
```
