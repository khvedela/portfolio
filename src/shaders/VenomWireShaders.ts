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

  // Offset vertices with a sine wave for subtle animation
  float offset = sin(vWorldPos.y * 2.0 + uTime) * 0.1;
  worldPos.y += offset;

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

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p.yx, p.xy + 34.45);
  return fract(p.x * p.y);
}

float noise3D(vec3 p) {
  vec3 ip = floor(p);
  vec3 f = fract(p);
  f *= f * (3.0 - 2.0 * f);
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
  // Calculate reveal height cutoff
  float revealCut = vWorldPos.y + vRandY - uRevealHeight;
  if (revealCut > 0.5) discard;

  // Smooth alpha blending for dynamic reveal
  float alpha = smoothstep(0.5, 0.0, revealCut);

  // Add animated noise for texture
  float noiseValue = noise3D(vWorldPos * 0.4 + vec3(uTime * 0.3));
  float band = smoothstep(0.4, 0.7, noiseValue);

  // Mix colors with dynamic hue shift
  vec3 finalColor = mix(uBaseColor, uAccentColor, band);

  // Amplify bloom effect for glowing appearance
  vec3 bloomColor = finalColor * (1.0 + smoothstep(0.6, 1.0, noiseValue));

  gl_FragColor = vec4(bloomColor, alpha);
}
`;