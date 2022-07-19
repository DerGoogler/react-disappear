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

## Class or Function?

This library inludes to types of component

### Class Component

```tsx
import { Disappear } from "react-disappear";
import { dom } from "googlers-tools";

function App() {
  return (
    <div>
      <Disappear
        onDisappear={visible => {
          console.log(visible);
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

dom.renderAuto(App);
```

### Function Component

```tsx
import { Disappear } from "react-disappear";
import { dom } from "googlers-tools";

function App() {
  return (
    <div>
      <DisappearFunc
        onDisappear={visible => {
          console.log(visible);
        }}
      >
        <span>Content</span>
        <span>Content</span>
        <span>Content</span>
        <span>Content</span>
        <span>Content</span>
      </DisappearFunc>
    </div>
  );
}

dom.renderAuto(App);
```
