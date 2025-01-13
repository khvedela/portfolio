export const venomWireVertex = `
uniform float uTime;
uniform float uRevealHeight;
attribute float aRandY;

varying vec3 vWorldPos;
varying float vRandY;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vRandY = aRandY;

  // Smooth sine wave animation with phase offset for organic movement
  float sineWave = sin(vWorldPos.y * 3.0 + uTime * 2.0) * 0.1;
  float noiseOffset = sin(vWorldPos.x * 1.5 + uTime * 1.5) * 0.05;

  // Combine sine wave and noise for vertex displacement
  worldPos.y += sineWave + noiseOffset;

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const venomWireFragment = `
uniform float uTime;
uniform float uRevealHeight;
uniform vec3 uBaseColor;
uniform vec3 uAccentColor;

varying vec3 vWorldPos;
varying float vRandY;

// Smooth hash function for more consistent noise
float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p.yx, p.xy + 34.45);
  return fract(p.x * p.y);
}

// Improved 3D noise with smooth transitions
float noise3D(vec3 p) {
  vec3 ip = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n = dot(ip, vec3(1, 57, 113));
  return mix(
    mix(
      mix(hash21(ip.xy), hash21(ip.xy + vec2(1, 0)), f.x),
      mix(hash21(ip.xy + vec2(0, 1)), hash21(ip.xy + vec2(1, 1)), f.x),
      f.y
    ),
    mix(
      mix(hash21(ip.xy + vec2(0, 57)), hash21(ip.xy + vec2(1, 57)), f.x),
      mix(hash21(ip.xy + vec2(0, 58)), hash21(ip.xy + vec2(1, 58)), f.x),
      f.y
    ),
    f.z
  );
}

void main() {
  // Smooth reveal height cutoff for a dynamic appearance
  float revealCut = vWorldPos.y + vRandY - uRevealHeight;
  if (revealCut > 0.5) discard;

  // Smooth alpha transition for reveal
  float alpha = smoothstep(0.5, 0.0, revealCut);

  // Animated noise for dynamic texture appearance
  float noiseValue = noise3D(vWorldPos * 0.5 + vec3(uTime * 0.2));
  float band = smoothstep(0.4, 0.7, noiseValue);

  // Blend colors with noise-based variation
  vec3 baseMix = mix(uBaseColor, uAccentColor, band);

  // Enhance brightness for glowing effect
  vec3 glowEffect = baseMix * (1.2 + smoothstep(0.6, 1.0, band) * 0.5);

  gl_FragColor = vec4(glowEffect, alpha);
}
`;

