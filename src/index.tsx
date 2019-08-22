import 'leaflet.pm/dist/leaflet.pm.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import 'leaflet.pm'
import { Path, Circle, Point, Polyline, Polygon, Rectangle } from 'rc-leaflet'
import MapContext, { ContextType as MapContextType } from 'rc-leaflet/es/components/RCMap/Context'
import { defaultIcon } from 'rc-leaflet/es/components/DivIcon/creator'

export enum Lang {
  en = 'en',
  de = 'de',
  it = 'it',
  ru = 'ru',
  ro = 'ro',
  es = 'es',
  fr = 'fr',
  nl = 'nl'
}

export type TranslationTooltips = Partial<{
  placeMarker: string
  firstVertex: string
  continueLine: string
  finishLine: string
  finishPoly: string
  finishRect: string
  startCircle: string
  finishCircle: string
}>

export type TranslationActions = Partial<{
  finish: string
  cancel: string
  removeLastVertex: string
}>

export type TranslationButtonTitles = Partial<{
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

export type Translation = Partial<{
  tooltips: TranslationTooltips
  actions: TranslationActions
  buttonTitles: TranslationButtonTitles
}>

export enum Mode {
  None = 'None',
  Draw = 'Draw',
  Drag = 'Drag',
  Edit = 'Edit',
  Remove = 'Remove'
}

export enum Shape {
  Marker = 'Marker',
  Circle = 'Circle',
  Line = 'Line',
  Polygon = 'Polygon',
  Rectangle = 'Rectangle'
}

export type FinishOn = 'click' | 'dblclick' | 'mousedown' | 'mouseover' | 'mouseout' | 'contextmenu' | null

export type DrawOptions = Partial<{
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

export type EditOptions = Partial<{
  draggable: boolean
  snappable: boolean
  snapDistance: number
  allowSelfIntersection: boolean
  preventMarkerRemoval: boolean
  hintlineStyle: L.PathOptions
}>

export interface PartialProps {
  lang: Lang
  translation: Translation
  mode: Mode
  shape: Shape
  drawOptions: DrawOptions
  editOptions: EditOptions
  layers: L.Layer[]
  points: L.Marker[]
  circles: L.Circle[]
  polylines: L.Polyline[]
  polygons: L.Polygon[]
  rectangles: L.Rectangle[]
  onDrawLayer (layer: L.Layer, layers: L.Layer[]): void
  onDrawPoint (point: L.Marker, points: L.Marker[]): void
  onDrawCircle (circle: L.Circle, circles: L.Circle[]): void
  onDrawPolyline (polyline: L.Polyline, polylines: L.Polyline[]): void
  onDrawPolygon (polygon: L.Polygon, polygons: L.Polygon[]): void
  onDrawRectangle (rectangle: L.Rectangle, rectangles: L.Rectangle[]): void
  onLayerChange (layer: L.Layer, index: number, layers: L.Layer[]): void
  onPointChange (point: L.Marker, index: number, points: L.Marker[]): void
  onCircleChange (circle: L.Circle, index: number, circles: L.Circle[]): void
  onPolylineChange (polyline: L.Polyline, index: number, polylines: L.Polyline[]): void
  onPolygonChange (polygon: L.Polygon, index: number, polygons: L.Polygon[]): void
  onRectangleChange (rectangle: L.Rectangle, index: number, rectangles: L.Rectangle[]): void
  onRemoveLayer (layer: L.Layer, index: number, layers: L.Layer[]): void
  onRemovePoint (point: L.Marker, index: number, points: L.Marker[]): void
  onRemoveCircle (circle: L.Circle, index: number, circles: L.Circle[]): void
  onRemovePolyline (polyline: L.Polyline, index: number, polylines: L.Polyline[]): void
  onRemovePolygon (polygon: L.Polygon, index: number, polygons: L.Polygon[]): void
  onRemoveRectangle (rectangle: L.Rectangle, index: number, rectangles: L.Rectangle[]): void
}

export type Props = Readonly<Partial<PartialProps>>

export type State = Readonly<{
  layers: L.Layer[]
}>

const { position, ...PointPropTypes } = Point.propTypes

export default class Drawing extends Component<Props, State> {
  public static propTypes = {
    lang: PropTypes.oneOf<Lang>(Object.values(Lang)),
    translation: PropTypes.shape({
      tooltips: PropTypes.shape({
        placeMarker: PropTypes.string,
        firstVertex: PropTypes.string,
        continueLine: PropTypes.string,
        finishLine: PropTypes.string,
        finishPoly: PropTypes.string,
        finishRect: PropTypes.string,
        startCircle: PropTypes.string,
        finishCircle: PropTypes.string
      }),
      actions: PropTypes.shape({
        finish: PropTypes.string,
        cancel: PropTypes.string,
        removeLastVertex: PropTypes.string
      }),
      buttonTitles: PropTypes.shape({
        drawMarkerButton: PropTypes.string,
        drawPolyButton: PropTypes.string,
        drawLineButton: PropTypes.string,
        drawCircleButton: PropTypes.string,
        drawRectButton: PropTypes.string,
        editButton: PropTypes.string,
        dragButton: PropTypes.string,
        cutButton: PropTypes.string,
        deleteButton: PropTypes.string
      })
    }),
    mode: PropTypes.oneOf<Mode>(Object.values(Mode)),
    shape: PropTypes.oneOf<Shape>(Object.values(Shape)),
    drawOptions: PropTypes.shape({
      snappable: PropTypes.bool,
      snapDistance: PropTypes.number,
      snapMiddle: PropTypes.bool,
      tooltips: PropTypes.bool,
      allowSelfIntersection: PropTypes.bool,
      templineStyle: PropTypes.shape(Path.propTypes),
      hintlineStyle: PropTypes.shape(Path.propTypes),
      cursorMarker: PropTypes.bool,
      finishOn: PropTypes.oneOf<FinishOn>(['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', null]),
      markerStyle: PropTypes.shape<Omit<typeof Point.propTypes, 'position'>>(PointPropTypes),
      pathOptions: PropTypes.shape(Path.propTypes)
    }),
    editOptions: PropTypes.shape({
      draggable: PropTypes.bool,
      snappable: PropTypes.bool,
      snapDistance: PropTypes.number,
      allowSelfIntersection: PropTypes.bool,
      preventMarkerRemoval: PropTypes.bool,
      hintlineStyle: PropTypes.shape(Path.propTypes)
    }),
    layers: PropTypes.arrayOf<L.Layer>(PropTypes.instanceOf<L.Layer>(L.Layer)),
    points: PropTypes.arrayOf<L.Marker>(PropTypes.instanceOf<L.Marker>(L.Marker)),
    circles: PropTypes.arrayOf<L.Circle>(PropTypes.instanceOf<L.Circle>(L.Circle)),
    polylines: PropTypes.arrayOf<L.Polyline>(PropTypes.instanceOf<L.Polyline>(L.Polyline)),
    polygons: PropTypes.arrayOf<L.Polygon>(PropTypes.instanceOf<L.Polygon>(L.Polygon)),
    rectangles: PropTypes.arrayOf<L.Rectangle>(PropTypes.instanceOf<L.Rectangle>(L.Rectangle)),
    onDrawLayer: PropTypes.func,
    onDrawPoint: PropTypes.func,
    onDrawCircle: PropTypes.func,
    onDrawPolyline: PropTypes.func,
    onDrawPolygon: PropTypes.func,
    onDrawRectangle: PropTypes.func,
    onLayerChange: PropTypes.func,
    onPointChange: PropTypes.func,
    onCircleChange: PropTypes.func,
    onPolylineChange: PropTypes.func,
    onPolygonChange: PropTypes.func,
    onRectangleChange: PropTypes.func,
    onRemoveLayer: PropTypes.func,
    onRemovePoint: PropTypes.func,
    onRemoveCircle: PropTypes.func,
    onRemovePolyline: PropTypes.func,
    onRemovePolygon: PropTypes.func,
    onRemoveRectangle: PropTypes.func
  }

  public static defaultProps = {
    lang: Lang.en,
    mode: Mode.None,
    shape: Shape.Marker
  }

  public static contextType = MapContext

  public context: MapContextType

  private layers: L.Layer[] = []

  public constructor (props: Props, context: MapContextType) {
    super(props, context)
    this.state = { layers: [] }
    const { lang, translation = {} } = props
    const map = this.context.map as any
    map.pm.setLang('rc-leaflet', translation, lang)
    this.context.map.on('pm:create', this.onDrawLayer)
    this.enableMode()
  }

  public componentDidUpdate (prevProps: Props): void {
    const { mode: prevMode, shape: prevShape, drawOptions: prevDrawOptions } = prevProps
    const { mode, shape, drawOptions } = this.props

    if (mode !== prevMode || (mode === Mode.Draw && (shape !== prevShape || drawOptions !== prevDrawOptions))) {
      this.disablePrevMode(prevMode)
      this.enableMode()
    }
  }

  public componentWillUnmount (): void {
    this.context.map.off('pm:create', this.onDrawLayer)
  }

  private get drawOptions (): {} {
    const { shape, drawOptions = {} } = this.props

    let options: {} = {}
    if (shape === Shape.Marker) {
      const { markerStyle = {}, ...restDrawOptions } = drawOptions
      options = { ...restDrawOptions, markerStyle: { icon: defaultIcon, ...markerStyle } }
    } else {
      const theme = this.context.theme && this.context.theme.path || {}
      const { templineStyle = {}, hintlineStyle = {}, pathOptions = {}, ...restDrawOptions } = drawOptions
      options = { ...restDrawOptions, templineStyle: { ...theme, ...templineStyle }, hintlineStyle: { ...theme, dashArray: [5, 5], ...hintlineStyle }, pathOptions: { ...theme, ...pathOptions } }
    }
    return options
  }

  private getLayers (): L.Layer[] {
    if (this.isControlled) {
      const { layers, points = [], circles = [], polylines = [], polygons = [], rectangles = [] } = this.props
      if (layers) {
        return layers
      }
      return [...points, ...circles, ...polylines, ...polygons, ...rectangles]
    }
    return this.state.layers
  }

  private get isControlled (): boolean {
    const { layers, points, circles, polylines, polygons, rectangles } = this.props
    return (layers || points || circles || polylines || polygons || rectangles) !== undefined
  }

  private isLayerRelevant = (layer: L.Layer & { pm: any }) => layer.pm && !(layer.pm.options && layer.pm.options.preventMarkerRemoval) && !(layer instanceof L.LayerGroup)

  private isLayerRemoveable = (layer: L.Layer & { pm: any, _pmTempLayer: any }) => !layer._pmTempLayer && (!layer.pm || !layer.pm.dragging())

  private onDrawLayer = (e: L.LeafletEvent & { shape: Shape, layer: L.Layer }): void => {
    const { shape, layers = [], points = [], circles = [], polylines = [], polygons = [], rectangles = [], onDrawLayer, onDrawPoint, onDrawCircle, onDrawPolyline, onDrawPolygon, onDrawRectangle } = this.props
    e.layer.remove()
    onDrawLayer && onDrawLayer(e.layer, [...layers, e.layer])
    if (e.shape === Shape.Marker && e.layer instanceof L.Marker) {
      onDrawPoint && onDrawPoint(e.layer, [...points, e.layer])
    } else if (e.shape === Shape.Circle && e.layer instanceof L.Circle) {
      onDrawCircle && onDrawCircle(e.layer, [...circles, e.layer])
    } else if (e.shape === Shape.Line && e.layer instanceof L.Polyline) {
      onDrawPolyline && onDrawPolyline(e.layer, [...polylines, e.layer])
    } else if (e.shape === Shape.Polygon && e.layer instanceof L.Polygon) {
      onDrawPolygon && onDrawPolygon(e.layer, [...polygons, e.layer])
    } else if (e.shape === Shape.Rectangle && e.layer instanceof L.Rectangle) {
      onDrawRectangle && onDrawRectangle(e.layer, [...rectangles, e.layer])
    }
    if (!this.isControlled) {
      this.setState(prevState => ({ layers: [...prevState.layers, e.layer] }))
    }
    this.context.map.pm.enableDraw(shape, this.drawOptions)
  }

  private onLayerUpdate (layer: L.Layer): void {
    const { mode } = this.props
    if (mode === Mode.Edit) {
      (layer as any).pm.enable()
    }
  }

  private onCircleChange (layer: L.Circle, index: number, center: L.LatLngExpression, radius: number): void {
    if (this.isControlled) {
      const { layers = [], circles = [], onLayerChange, onCircleChange } = this.props
      const circle = L.circle(layer.getLatLng(), layer.getRadius())
      layer.setLatLng(center)
      layer.setRadius(radius)
      onLayerChange && onLayerChange(circle, index, layers.map((l, i) => i === index ? circle : l))
      onCircleChange && onCircleChange(circle, index, circles.map((p, i) => i === index ? circle : p))
    }
  }

  private onPolylineChange (layer: L.Polyline, index: number, points: L.LatLngExpression[] | L.LatLngExpression[][] | L.LatLngExpression[][][]): void {
    if (this.isControlled) {
      const { layers = [], polylines = [], onLayerChange, onPolylineChange } = this.props
      const polyline = L.polyline(layer.getLatLngs() as any)
      layer.setLatLngs(points)
      onLayerChange && onLayerChange(polyline, index, layers.map((l, i) => i === index ? polyline : l))
      onPolylineChange && onPolylineChange(polyline, index, polylines.map((p, i) => i === index ? polyline : p))
    }
  }

  private onPolygonChange (layer: L.Polygon, index: number, points: L.LatLngExpression[] | L.LatLngExpression[][] | L.LatLngExpression[][][]): void {
    if (this.isControlled) {
      const { layers = [], polygons = [], onLayerChange, onPolygonChange } = this.props
      const polygon = L.polygon(layer.getLatLngs())
      layer.setLatLngs(points)
      onLayerChange && onLayerChange(polygon, index, layers.map((l, i) => i === index ? polygon : l))
      onPolygonChange && onPolygonChange(polygon, index, polygons.map((p, i) => i === index ? polygon : p))
    }
  }

  private onRectangleChange (layer: L.Rectangle, index: number, points: L.LatLng[] | L.LatLng[][] | L.LatLng[][][]): void {
    if (this.isControlled) {
      const { layers = [], rectangles = [], onLayerChange, onRectangleChange } = this.props
      const rectangle = L.rectangle(layer.getBounds())
      layer.setLatLngs(points)
      onLayerChange && onLayerChange(rectangle, index, layers.map((l, i) => i === index ? rectangle : l))
      onRectangleChange && onRectangleChange(rectangle, index, rectangles.map((p, i) => i === index ? rectangle : p))
    }
  }

  private onRemoveLayer = (e: L.LeafletEvent, layer: L.Layer, index: number): void => {
    if (this.props.mode === Mode.Remove && this.isLayerRelevant(e.target) && this.isLayerRemoveable(e.target)) {
      const { layers = [], points = [], circles = [], polylines = [], polygons = [], rectangles = [], onRemoveLayer, onRemovePoint, onRemoveCircle, onRemovePolyline, onRemovePolygon, onRemoveRectangle } = this.props
      if (!this.isControlled) {
        this.setState(prevState => ({ layers: prevState.layers.filter(l => l !== layer) }))
      }
      onRemoveLayer && onRemoveLayer(layer, index, layers.filter(l => l !== layer))
      if (layer instanceof L.Marker) {
        onRemovePoint && onRemovePoint(layer, index, points.filter(l => l !== layer))
      } else if (layer instanceof L.Circle) {
        onRemoveCircle && onRemoveCircle(layer, index, circles.filter(l => l !== layer))
      } else if (layer instanceof L.Polyline) {
        onRemovePolyline && onRemovePolyline(layer, index, polylines.filter(l => l !== layer))
      } else if (layer instanceof L.Polygon) {
        onRemovePolygon && onRemovePolygon(layer, index, polygons.filter(l => l !== layer))
      } else if (layer instanceof L.Rectangle) {
        onRemoveRectangle && onRemoveRectangle(layer, index, rectangles.filter(l => l !== layer))
      }
    }
  }

  private disablePrevMode (mode: Mode): void {
    if (mode === Mode.Draw) {
      (this.context.map as any).pm.disableDraw()
    } else if (mode === Mode.Edit) {
      for (const layer of this.layers) {
        (layer as any).pm.disable()
      }
    } else if (mode === Mode.Drag) {
      for (const layer of this.layers) {
        (layer as any).pm.disableLayerDrag()
      }
    }
  }

  private enableMode (): void {
    const { mode, shape, editOptions } = this.props

    if (mode === Mode.Draw) {
      this.context.map.pm.enableDraw(shape, this.drawOptions)
    } else if (mode === Mode.Edit) {
      for (const layer of this.layers) {
        (layer as any).pm.enable(editOptions)
      }
    } else if (mode === Mode.Drag) {
      for (const layer of this.layers) {
        (layer as any).pm.enableLayerDrag()
      }
    }
  }

  private addPoint (layer: L.Marker, index: number): void {
    let pos: L.LatLngExpression
    layer.on('dragstart', e => {
      pos = layer.getLatLng()
    })
    layer.on('drag', () => {
      if (this.isControlled) {
        const { layers = [], points = [], onLayerChange, onPointChange } = this.props
        const point = L.marker(layer.getLatLng())
        layer.setLatLng(pos)
        onLayerChange && onLayerChange(point, index, layers.map((l, i) => i === index ? point : l))
        onPointChange && onPointChange(point, index, points.map((p, i) => i === index ? point : p))
      }
    })
    this.layers.push(layer)
  }

  private addCircle (layer: L.Circle, index: number): void {
    let center: L.LatLngExpression
    let radius: number
    layer.on('pm:dragstart', () => {
      center = layer.getLatLng()
      radius = layer.getRadius()
    })
    layer.on('pm:dragend', () => this.onCircleChange(layer, index, center, radius))
    layer.on('pm:markerdragstart', () => {
      center = layer.getLatLng()
      radius = layer.getRadius()
    })
    layer.on('pm:markerdragend', () => {
      this.onCircleChange(layer, index, center, radius)
      this.isControlled && (layer as any).pm.enable()
    })
    this.layers.push(layer)
  }

  private addPolyline (layer: L.Polyline, index: number): void {
    let points: any
    layer.on('pm:dragstart', () => {
      points = layer.getLatLngs()
    })
    layer.on('pm:dragend', () => this.onPolylineChange(layer, index, points))
    layer.on('pm:markerdragstart', () => {
      points = layer.getLatLngs()
    })
    layer.on('pm:markerdragend', () => {
      this.onPolylineChange(layer, index, points)
      this.isControlled && layer.pm.enable()
    })
    this.layers.push(layer)
  }

  private addPolygon (layer: L.Polygon, index: number): void {
    let points: L.LatLngExpression[] | L.LatLngExpression[][] | L.LatLngExpression[][][]
    layer.on('pm:dragstart', () => {
      points = layer.getLatLngs()
    })
    layer.on('pm:dragend', () => this.onPolygonChange(layer, index, points))
    layer.on('pm:markerdragstart', () => {
      points = layer.getLatLngs()
    })
    layer.on('pm:markerdragend', () => {
      this.onPolygonChange(layer, index, points)
      this.isControlled && layer.pm.enable()
    })
    this.layers.push(layer)
  }

  private addRectangle (layer: L.Rectangle, index: number): void {
    let points: L.LatLng[] | L.LatLng[][] | L.LatLng[][][]
    layer.on('pm:dragstart', () => {
      points = layer.getLatLngs()
    })
    layer.on('pm:dragend', () => this.onRectangleChange(layer, index, points))
    layer.on('pm:markerdragstart', () => {
      points = layer.getLatLngs()
    })
    layer.on('pm:markerdragend', () => {
      this.onRectangleChange(layer, index, points)
      this.isControlled && layer.pm.enable()
    })
    this.layers.push(layer)
  }

  private removeLayer = (layer: L.Layer): void => { this.layers.filter(l => l !== layer) }

  private renderLayers (layers: L.Layer[] = []): React.ReactNode {
    return layers.map((layer: L.Layer & { options: {} }, i) => {
      const props = {
        key: i,
        ...(layer.options || {}),
        onClick: (e: L.LeafletMouseEvent): void => this.onRemoveLayer(e, layer, i),
        onUpdate: (l: L.Layer): void => this.onLayerUpdate(l),
        onBeforeRemove: this.removeLayer
      }
      if (layer instanceof L.Marker) {
        return <Point position={layer.getLatLng()} {...props} onAdd={(e: L.LeafletEvent, l: L.Layer): void => this.addPoint(l as L.Marker, i)} />
      } else if (layer instanceof L.Circle) {
        return <Circle center={layer.getLatLng()} radius={layer.getRadius()} {...props} onAdd={(e: L.LeafletEvent, l: L.Layer): void => this.addCircle(l as L.Circle, i)} />
      } else if (layer instanceof L.Rectangle) {
        return <Rectangle bounds={layer.getBounds()} {...props} onAdd={(e: L.LeafletEvent, l: L.Layer): void => this.addRectangle(l as L.Rectangle, i)} />
      } else if (layer instanceof L.Polygon) {
        return <Polygon points={layer.getLatLngs()} {...props} onAdd={(e: L.LeafletEvent, l: L.Layer): void => this.addPolygon(l as L.Polygon, i)} />
      } else if (layer instanceof L.Polyline) {
        return <Polyline points={layer.getLatLngs() as any} {...props} onAdd={(e: L.LeafletEvent, l: L.Layer): void => this.addPolyline(l as L.Polyline, i)} />
      }
      return null
    })
  }

  public render (): React.ReactNode {
    return this.renderLayers(this.getLayers())
  }
}
