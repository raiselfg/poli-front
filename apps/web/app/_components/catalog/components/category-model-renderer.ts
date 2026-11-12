import {
  ACESFilmicToneMapping,
  DataTexture,
  DirectionalLight,
  HemisphereLight,
  LinearFilter,
  LinearMipmapLinearFilter,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  OrthographicCamera,
  RepeatWrapping,
  RGBAFormat,
  Scene,
  WebGLRenderer,
  type BufferGeometry,
  type Object3D,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export type CategoryModelName = 'bushing' | 'bump-stop' | 'damper' | 'seal';

function surfaceTexture(brushed: boolean) {
  const size = 128;
  const pixels = new Uint8Array(size * size * 4);
  let seed = 173;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
      const grain = (seed >>> 24) - 128;
      const value = brushed
        ? 128 + 30 * Math.sin((y / size) * Math.PI * 46) + grain * 0.12
        : 128 + grain * 0.12;
      const index = (y * size + x) * 4;
      pixels.fill(value, index, index + 3);
      pixels[index + 3] = 255;
    }
  }
  const texture = new DataTexture(pixels, size, size, RGBAFormat);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(brushed ? 1 : 3, 2);
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function createPose(model: CategoryModelName, object: Object3D) {
  const upper = object.getObjectByName('upper_assembly');
  const lower = object.getObjectByName('lower_assembly');

  return (progress: number) => {
    const t = MathUtils.clamp(progress, 0, 1);
    const ease = MathUtils.smoothstep(t, 0, 1);
    const pulse = Math.sin(t * Math.PI) ** 2;

    switch (model) {
      case 'bushing':
        object.rotation.set(
          -0.86 + 1.84 * Math.sqrt(ease),
          0,
          -0.76 + 1.48 * ease,
          'ZYX'
        );
        object.position.x = 0.23 * (ease - 0.5);
        break;
      case 'bump-stop':
        object.rotation.set(0.37 + 0.09 * pulse, 0, -0.16, 'ZYX');
        object.scale.set(1 + 0.11 * pulse, 1 - 0.32 * pulse, 1 + 0.11 * pulse);
        object.position.y = -0.23 * pulse;
        break;
      case 'damper':
        object.rotation.set(0.42, 0, -0.29 + 0.18 * ease, 'ZYX');
        object.scale.setScalar(0.97 - 0.28 * pulse);
        if (upper !== undefined && lower !== undefined) {
          upper.position.y = 0.67 * pulse;
          lower.position.y = -0.67 * pulse;
        }
        break;
      case 'seal':
        object.rotation.set(0.24 + 1.17 * ease, 0, -0.37 + 0.2 * ease, 'ZYX');
        object.position.y = -0.13 + 0.26 * ease;
        break;
    }
  };
}

export async function createCategoryModelRenderer(
  canvas: OffscreenCanvas,
  model: CategoryModelName
) {
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true });
  if (context === null) return null;

  let renderer: WebGLRenderer | undefined;

  const scene = new Scene();
  const camera = new OrthographicCamera(-1.08, 1.08, 1.08, -1.08, 0.1, 10);
  camera.position.set(0, -0.04, 4);

  const key = new DirectionalLight(0xfff3e4, 1.8);
  key.position.set(-3, 4, 4);
  const rim = new DirectionalLight(0xdbeeff, 1.1);
  rim.position.set(2, 3, -3);
  scene.add(key, rim, new HemisphereLight(0xe5efff, 0xa6abb0, 2.4));

  const grain = surfaceTexture(false);
  const brush = surfaceTexture(true);
  const geometries = new Set<BufferGeometry>();
  const materials = new Set<MeshStandardMaterial>();
  const dispose = () => {
    for (const geometry of geometries) geometry.dispose();
    for (const material of materials) material.dispose();
    brush.dispose();
    grain.dispose();
    renderer?.dispose();
    context.getExtension('WEBGL_lose_context')?.loseContext();
  };

  try {
    const response = await fetch(`/category-models/${model}.glb`);
    if (!response.ok) throw new Error('Could not load the category model');
    const loader = new GLTFLoader();
    const { scene: object } = await loader.parseAsync(
      await response.arrayBuffer(),
      ''
    );
    object.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      const mesh = child as Mesh;
      geometries.add(mesh.geometry);
      const meshMaterials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      for (const material of meshMaterials) {
        if (
          !(material instanceof MeshStandardMaterial) ||
          materials.has(material)
        )
          continue;
        materials.add(material);
        const metal = material.metalness > 0.5;
        material.bumpMap = metal ? brush : grain;
        material.bumpScale = metal ? 0.009 : 0.035;
        if (!metal) {
          // The grain texture is centered at half intensity.
          material.map = grain;
          material.color.multiplyScalar(2);
          material.roughness = 0.74;
        } else {
          material.metalness = 0.48;
        }
      }
    });
    scene.add(object);
    const pose = createPose(model, object);

    const activeRenderer = new WebGLRenderer({
      canvas,
      context,
      alpha: true,
      antialias: true,
    });
    renderer = activeRenderer;
    activeRenderer.toneMapping = ACESFilmicToneMapping;
    activeRenderer.toneMappingExposure = 1.07;

    return {
      render(progress: number, size: number) {
        if (context.isContextLost()) return false;
        if (canvas.width !== size || canvas.height !== size)
          activeRenderer.setSize(size, size, false);
        pose(progress);
        activeRenderer.render(scene, camera);
        return true;
      },
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
