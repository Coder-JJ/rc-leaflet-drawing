# React Map Drawing Component based on rc-leaflet

## History Versions

- [rc-leaflet-drawing CHANGELOG](https://github.com/Coder-JJ/rc-leaflet-drawing/blob/master/CHANGELOG.md)

## Docs

- [rc-leaflet](https://github.com/Coder-JJ/rc-leaflet)

- [leaflet.pm](https://github.com/codeofsumit/leaflet.pm)

## Features

- [x] `TypeScript` support

- [x] supported Component Modes: `Controlled Mode`, `Uncontrolled Mode`

- [x] supported Operation Modes: `None` (default), `Draw`, `Drag`, `Edit`, `Remove`

- [x] supported Drawing Shapes: `Marker` (default), `Circle`, `Line`, `Polygon`, `Rectangle`

- [ ] `Cut` Mode

## Data Structure

- `Lang`:

  ```ts
  enum Lang {
    en = 'en',
    de = 'de',
    it = 'it',
    ru = 'ru',
    ro = 'ro',
    es = 'es',
    fr = 'fr',
    nl = 'nl'
  }
  ```

- `Translation`:

  ```ts
  type TranslationTooltips = Partial<{
    placeMarker: string
    firstVertex: string
    continueLine: string
    finishLine: string
    finishPoly: string
    finishRect: string
    startCircle: string
    finishCircle: string
  }>

  type TranslationActions = Partial<{
    finish: string
    cancel: string
    removeLastVertex: string
  }>

  type TranslationButtonTitles = Partial<{
    drawMarkerButton: string
    drawPolyButton: string
    drawLineButton: string
    drawCircleButton: string
    drawRectButton: string
    editButton: string
    dragButton: string
    cutButton: string
    deleteButton: string
  }>

  type Translation = Partial<{
    tooltips: TranslationTooltips
    actions: TranslationActions
    buttonTitles: TranslationButtonTitles
  }>
  ```

- `Mode`:

  ```ts
  enum Mode {
    None = 'None',
    Draw = 'Draw',
    Drag = 'Drag',
    Edit = 'Edit',
    Remove = 'Remove'
  }
  ```

- `Shape`:

  ```ts
  enum Shape {
    Marker = 'Marker',
    Circle = 'Circle',
    Line = 'Line',
    Polygon = 'Polygon',
    Rectangle = 'Rectangle'
  }
  ```

- `DrawOptions`:

  ```ts
  type FinishOn = 'click' | 'dblclick' | 'mousedown' | 'mouseover' | 'mouseout' | 'contextmenu' | null

  type DrawOptions = Partial<{
    snappable: boolean
    snapDistance: number
    snapMiddle: boolean
    tooltips: boolean
    allowSelfIntersection: boolean
    templineStyle: L.PathOptions
    hintlineStyle: L.PathOptions
    cursorMarker: boolean
    finishOn: FinishOn
    markerStyle: L.MarkerOptions
    pathOptions: L.PathOptions
  }>
  ```

- `EditOptions`:

  ```ts
  type EditOptions = Partial<{
    draggable: boolean
    snappable: boolean
    snapDistance: number
    allowSelfIntersection: boolean
    preventMarkerRemoval: boolean
    hintlineStyle: L.PathOptions
  }>
  ```

## Usage

### Install

```cmd
npm install rc-leaflet-drawing --save
```

### Example

```jsx
import React, { Component } from 'react'
import { RCMap } from 'rc-leaflet'
import Drawing, { Mode, Shape } from 'rc-leaflet-drawing'

class App extends Component {
  state = {
    layers: []
  }

  render () {
    return (
      <RCMap>
        {/* Uncontrolled Mode */}
        <Drawing Mode={Mode.Draw} shape={Shape.Marker} onDrawLayer onLayerChange onRemoveLayer />
        {/* Controlled Mode, layers prop is passed */}
        <Drawing Mode={Mode.Draw} shape={Shape.Marker} layers={this.state.layers} onDrawLayer onLayerChange onRemoveLayer />
      </RCMap>
    )
  }
}
```

### `Props`

- lang

  - type: [Lang](#Data-Structure)

  - required: `false`

  - default: `Lang.en`

  - language setting group of `Drawing` Component.

- translation

  - type: [Translation](#Data-Structure)

  - required: `false`

  - language settings used to override settings of `lang`.

- mode

  - type: [Mode](#Data-Structure)

  - required: `false`

  - default: `Mode.None`

  - mode of `Drawing` Component.

- shape

  - type: [Shape](#Data-Structure)

  - required: `false`

  - default: `Shape.Marker`

  - shape of `Draw` mode.

- drawOptions

  - type: [DrawOptions](#Data-Structure)

  - required: `false`

  - options of `Draw` mode.

- editOptions

  - type: [EditOptions](#Data-Structure)

  - required: `false`

  - options of `Edit` mode.

- layers

  - type: `Array<L.Layer>`

  - required: `false`

  - layers to display, if passed, controlled mode is enabled.

- points

  - type: `Array<L.Marker>`

  - required: `false`

  - points to display, if passed, controlled mode is enabled.

- circles

  - type: `Array<L.Circle>`

  - required: `false`

  - circles to display, if passed, controlled mode is enabled.

- polylines

  - type: `Array<L.Polyline>`

  - required: `false`

  - polylines to display, if passed, controlled mode is enabled.

- polygons

  - type: `Array<L.Polygon>`

  - required: `false`

  - polygons to display, if passed, controlled mode is enabled.

- rectangles

  - type: `Array<L.Rectangle>`

  - required: `false`

  - rectangles to display, if passed, controlled mode is enabled.

- onDrawLayer

  - type: `(layer: L.Layer, layers: L.Layer[]): void`

  - required: `false`

  - fired when any type of layer is drawn during `Draw` mode.

- onDrawPoint

  - type: `(point: L.Marker, points: L.Marker[]): void`

  - required: `false`

  - fired when a point is drawn during `Draw` mode.

- onDrawCircle

  - type: `(circle: L.Circle, circles: L.Circle[]): void`

  - required: `false`

  - fired when a circle is drawn during `Draw` mode.

- onDrawPolyline

  - type: `(polyline: L.Polyline, polylines: L.Polyline[]): void`

  - required: `false`

  - fired when a polyline is drawn during `Draw` mode.

- onDrawPolygon

  - type: `(polygon: L.Polygon, polygons: L.Polygon[]): void`

  - required: `false`

  - fired when a polygon is drawn during `Draw` mode.

- onDrawRectangle

  - type: `(rectangle: L.Rectangle, rectangles: L.Rectangle[]): void`

  - required: `false`

  - fired when a rectangle is drawn during `Draw` mode.

- onLayerChange

  - type: `(layer: L.Layer, index: number, layers: L.Layer[]): void`

  - required: `false`

  - fired when any type of layer is changed during `Drag` or `Edit` mode.

- onPointChange

  - type: `(point: L.Marker, index: number, points: L.Marker[]): void`

  - required: `false`

  - fired when a point is changed during `Drag` or `Edit` mode.

- onCircleChange

  - type: `(circle: L.Circle, index: number, circles: L.Circle[]): void`

  - required: `false`

  - fired when a circle is changed during `Drag` or `Edit` mode.

- onPolylineChange

  - type: `(polyline: L.Polyline, index: number, polylines: L.Polyline[]): void`

  - required: `false`

  - fired when a polyline is changed during `Drag` or `Edit` mode.

- onPolygonChanges

  - type: `(polygon: L.Polygon, index: number, polygons: L.Polygon[]): void`

  - required: `false`

  - fired when a polygon is changed during `Drag` or `Edit` mode.

- onRectangleChange

  - type: `(rectangle: L.Rectangle, index: number, rectangles: L.Rectangle[]): void`

  - required: `false`

  - fired when a rectangle is changed during `Drag` or `Edit` mode.

- onRemoveLayer

  - type: `(layer: L.Layer, index: number, layers: L.Layer[]): void`

  - required: `false`

  - fired when any type of layer is removed during `Remove` mode.

- onRemovePoint

  - type: `(point: L.Marker, index: number, points: L.Marker[]): void`

  - required: `false`

  - fired when a point is removed during `Remove` mode.

- onRemoveCircle

  - type: `(circle: L.Circle, index: number, circles: L.Circle[]): void`

  - required: `false`

  - fired when a circle is removed during `Remove` mode.

- onRemovePolyline

  - type: `(polyline: L.Polyline, index: number, polylines: L.Polyline[]): void`

  - required: `false`

  - fired when a polyline is removed during `Remove` mode.

- onRemovePolygon

  - type: `(polygon: L.Polygon, index: number, polygons: L.Polygon[]): void`

  - required: `false`

  - fired when a polygon is removed during `Remove` mode.

- onRemoveRectangle

  - type: `(rectangle: L.Rectangle, index: number, rectangles: L.Rectangle[]): void`

  - required: `false`

  - fired when a rectangle is removed during `Remove` mode.
