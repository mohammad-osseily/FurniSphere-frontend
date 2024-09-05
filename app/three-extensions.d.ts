// three-extensions.d.ts

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, EventDispatcher, Vector3, MOUSE, TOUCH } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(camera: Camera, domElement?: HTMLElement);

    enabled: boolean;
    target: Vector3;

    minDistance: number;
    maxDistance: number;

    minZoom: number;
    maxZoom: number;

    enableDamping: boolean;
    dampingFactor: number;

    enableZoom: boolean;
    zoomSpeed: number;

    enableRotate: boolean;
    rotateSpeed: number;

    enablePan: boolean;
    panSpeed: number;

    screenSpacePanning: boolean;

    keyPanSpeed: number;

    autoRotate: boolean;
    autoRotateSpeed: number;

    minPolarAngle: number;
    maxPolarAngle: number;

    minAzimuthAngle: number;
    maxAzimuthAngle: number;

    enableKeys: boolean;
    keys: { LEFT: number; UP: number; RIGHT: number; BOTTOM: number };

    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };

    touches: { ONE: TOUCH; TWO: TOUCH };

    update(): void;
    saveState(): void;
    reset(): void;
    dispose(): void;
  }
}

