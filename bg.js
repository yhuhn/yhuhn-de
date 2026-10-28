/* https://github.com/aeroheim/midori
MIT License
Copyright (c) 2020 Benjamin Pang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software. */

const SOURCES = [
  "https://esm.sh/midori-bg@1.0.3?deps=three@0.150.1",
  "https://esm.sh/midori-bg@1.0.3?deps=three@0.150.1&bundle",
  "https://cdn.jsdelivr.net/npm/midori-bg@1.0.3/+esm",
];

async function loadMidori() {
  let lastErr;
  for (const url of SOURCES) {
    try {
      const m = await import(url);
      const lib = [m, m.default, m.default?.midori, m.midori].find((c) => c && c.BackgroundRenderer);
      if (lib) return lib;
      lastErr = new Error(`no exports in ${url}`);
    } catch (e) { lastErr = e; }
  }

  throw lastErr;
}

const {
  BackgroundRenderer,
  EffectType,
  Easings,
  loadImage,
  isWebGLSupported
} = await loadMidori();

if (!isWebGLSupported()) throw new Error("webgl unsupported");

const renderer = new BackgroundRenderer(document.getElementById("bg"));
renderer.effects.set(
  EffectType.VignetteBlur, {
    size: 3,
    radius: 1.5,
    passes: 2
  }
);

const image = await loadImage("bg.webp");
renderer.setBackground(image);

const particles = renderer.background.particles;
particles.generate([
  {
    name: "small",
    amount: 200,
    minSize: 5,
    maxSize: 5,
    minOpacity: 0.8,
    maxOpacity: 0.8,
    minGradient: 0.9,
    maxGradient: 0.9,
    color: 0xffffff,
    smoothing: 0
  },
  {
    name: "large",
    amount: 30,
    minSize: 100,
    maxSize: 100,
    minOpacity: 0.05,
    maxOpacity: 0.05,
    minGradient: 1,
    maxGradient: 1,
    color: 0xffffff,
    smoothing: 0
  }
]);

particles.move(
  "small", {
    distance: 0.5,
    angle: 245
  }, {
    duration: 5,
    loop: true
  }
);

particles.move(
  "large", {
    distance: 0.4,
    angle: 225
  }, {
    duration: 5,
    loop: true
  }
);

particles.sway(
  "small", {
    x: 0.025,
    y: 0.025
  }, {
    duration: 1.5,
    easing: Easings.Sinusoidal.InOut,
    loop: true
  }
);

const camera = renderer.background.camera;
camera.move({
  x: 0.5,
  y: 0.5,
  z: 0.8 // zoom
});

function fadeInBloom(seconds) {
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / (seconds * 1000), 1);
    const opacity = 1 - Math.pow(1 - p, 3);
    renderer.effects.set(EffectType.Bloom, { opacity, radius: 1, passes: 2 });
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

fadeInBloom(6);
