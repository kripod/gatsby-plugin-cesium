# gatsby-plugin-cesium

A [Gatsby][] plugin to add support for [CesiumJS][].

[gatsby]: https://www.gatsbyjs.org/
[cesiumjs]: https://cesiumjs.org/

## Install

`npm install --save gatsby-plugin-cesium cesium`

## How to use

Edit `gatsby-config.js`

```js
module.exports = {
  plugins: ['gatsby-plugin-cesium'],
};
```

## Notable differences from the [official webpack integration guide of Cesium][]

- All of the Cesium libraries can be imported and used with the following syntax:

  ```js
  import Cesium from 'cesium';
  import 'cesium/Source/Widgets/widgets.css';
  import React from 'react';

  class CesiumContainer extends React.Component {
    componentDidMount() {
      const viewer = new Cesium.Viewer('cesiumContainer');
    }

    render() {
      return <div id="cesiumContainer" />;
    }
  }
  ```

- Individual modules can be imported using the following syntax:

  ```js
  import Color from 'cesium/Source/Core/Color';

  const color = Color.fromRandom();
  ```

- glTF model loading is supported out of the box:

  ```js
  import CesiumGroundModelURL from '../data/models/CesiumGround.gltf';

  const model = viewer.scene.primitives.add(
    Cesium.Model.fromGltf({
      url: CesiumGroundModelURL,
    }),
  );
  ```

[official webpack integration guide of cesium]: https://cesiumjs.org/tutorials/cesium-and-webpack/
