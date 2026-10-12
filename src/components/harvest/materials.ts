import * as THREE from "three";
import {
  makeCapBump,
  makeGillTextures,
  makePlasticBump,
  makeSkinBump,
  makeStemBump,
  makeStrawTexture,
} from "./procedural";

/**
 * Physically-based materials with a small shader patch for fake subsurface scattering:
 * a Fresnel-weighted warm term added just before the final colour, so thin skin, mushroom
 * flesh and polythene glow softly where light grazes them.
 */

function patchRim(
  m: THREE.MeshPhysicalMaterial,
  rim: THREE.Color,
  strength: number,
  power: number,
  key: string
) {
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uRim = { value: rim };
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 uRim;")
      .replace(
        "#include <opaque_fragment>",
        `float rimF = pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), ${power.toFixed(1)});
        outgoingLight += uRim * rimF * ${strength.toFixed(2)};
        #include <opaque_fragment>`
      );
  };
  m.customProgramCacheKey = () => key;
}

export interface HarvestMaterials {
  skin: THREE.MeshPhysicalMaterial;
  nail: THREE.MeshPhysicalMaterial;
  cloth: THREE.MeshStandardMaterial;
  capTop: THREE.MeshPhysicalMaterial;
  capRim: THREE.MeshPhysicalMaterial;
  gill: THREE.MeshPhysicalMaterial;
  stem: THREE.MeshPhysicalMaterial;
  straw: THREE.MeshStandardMaterial;
  myc: THREE.MeshStandardMaterial;
  plastic: THREE.MeshPhysicalMaterial;
  crumb: THREE.MeshStandardMaterial;
  dispose: () => void;
}

export function createMaterials(): HarvestMaterials {
  const textures: THREE.Texture[] = [];
  const keep = <T extends THREE.Texture>(t: T) => (textures.push(t), t);

  const skinBump = keep(makeSkinBump());
  const skin = new THREE.MeshPhysicalMaterial({
    color: "#c3957a",
    roughness: 0.5,
    sheen: 0.7,
    sheenColor: new THREE.Color("#ff9d80"),
    sheenRoughness: 0.45,
    bumpMap: skinBump,
    bumpScale: 0.6,
    clearcoat: 0.12,
    clearcoatRoughness: 0.5,
  });
  patchRim(skin, new THREE.Color("#b5533a"), 0.3, 2.8, "skin-rim");

  const nail = new THREE.MeshPhysicalMaterial({
    color: "#f1d2c6",
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  });

  const cloth = new THREE.MeshStandardMaterial({ color: "#2c4a3a", roughness: 0.92 });

  const capBump = keep(makeCapBump());
  const capTop = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    vertexColors: true,
    roughness: 0.58,
    sheen: 0.5,
    sheenColor: new THREE.Color("#fff1d2"),
    sheenRoughness: 0.4,
    bumpMap: capBump,
    bumpScale: 0.3,
    envMapIntensity: 0.7,
    side: THREE.FrontSide,
  });
  patchRim(capTop, new THREE.Color("#ffe6b8"), 0.35, 2.2, "cap-rim");
  const capRim = capTop.clone();
  capRim.side = THREE.DoubleSide;
  patchRim(capRim, new THREE.Color("#ffe6b8"), 0.35, 2.2, "cap-rim");

  const gills = makeGillTextures();
  keep(gills.map);
  keep(gills.bump);
  const gill = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    map: gills.map,
    bumpMap: gills.bump,
    bumpScale: 0.9,
    roughness: 0.7,
    sheen: 0.8,
    sheenColor: new THREE.Color("#f3e3bd"),
    side: THREE.FrontSide,
  });
  patchRim(gill, new THREE.Color("#ffd9a0"), 0.22, 2.0, "gill-rim");

  const stemBump = keep(makeStemBump());
  const stem = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    vertexColors: true,
    roughness: 0.75,
    sheen: 0.3,
    sheenColor: new THREE.Color("#f6e6c2"),
    bumpMap: stemBump,
    bumpScale: 0.25,
    envMapIntensity: 0.6,
  });
  patchRim(stem, new THREE.Color("#ffdca8"), 0.28, 2.4, "stem-rim");

  const strawTex = makeStrawTexture();
  keep(strawTex.map);
  keep(strawTex.bump);
  const straw = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    map: strawTex.map,
    bumpMap: strawTex.bump,
    bumpScale: 1.1,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });

  const myc = new THREE.MeshStandardMaterial({ color: "#f3eee2", roughness: 1 });

  const plasticBump = keep(makePlasticBump());
  const plastic = new THREE.MeshPhysicalMaterial({
    color: "#f2f7f2",
    transparent: true,
    opacity: 0.4,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.18,
    bumpMap: plasticBump,
    bumpScale: 1.6,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const crumb = new THREE.MeshStandardMaterial({ color: "#9a7440", roughness: 1 });

  return {
    skin,
    nail,
    cloth,
    capTop,
    capRim,
    gill,
    stem,
    straw,
    myc,
    plastic,
    crumb,
    dispose() {
      [skin, nail, cloth, capTop, capRim, gill, stem, straw, myc, plastic, crumb].forEach((m) =>
        m.dispose()
      );
      textures.forEach((t) => t.dispose());
    },
  };
}
