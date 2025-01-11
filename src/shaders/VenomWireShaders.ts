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
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const venomWireFragment = `
uniform float uTime;
uniform float uRevealHeight;

varying vec3 vWorldPos;
varying float vRandY;

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p.yx, p.xy+34.45);
  return fract(p.x * p.y);
}

float noise3D(vec3 p) {
  vec3 ip = floor(p);
  vec3 f = fract(p);
  f *= f * (3.0 - 2.0 * f);
  float n = dot(ip, vec3(1, 57, 113));
  float res =
    mix(
      mix(
        mix(hash21(ip.xy + vec2(0,0)), hash21(ip.xy + vec2(1,0)), f.x),
        mix(hash21(ip.xy + vec2(0,1)), hash21(ip.xy + vec2(1,1)), f.x),
        f.y
      ),
      mix(
        mix(hash21(ip.xy + vec2(0,57)), hash21(ip.xy + vec2(1,57)), f.x),
        mix(hash21(ip.xy + vec2(0,58)), hash21(ip.xy + vec2(1,58)), f.x),
        f.y
      ),
      f.z
    );
  return res;
}

void main() {
  float revealCut = vWorldPos.y + vRandY - uRevealHeight;
  if (revealCut > 0.4) discard;

  float alpha = 1.0;
  if (revealCut > 0.0 && revealCut < 0.4) {
    alpha = 1.0 - (revealCut / 0.4);
  }

  float n = noise3D(vWorldPos * 0.3 + vec3(uTime*0.1));
  float band = smoothstep(0.3, 0.6, n);

  vec3 colorBase = vec3(1.0, 1.0, 1.0);
  vec3 colorVenom = vec3(0.86, 0.08, 0.24);
  vec3 finalColor = mix(colorBase, colorVenom, band);

  gl_FragColor = vec4(finalColor, alpha);
}
`;