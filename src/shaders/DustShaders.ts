export const dustVertex = `
uniform float uTime;
uniform float uSpeed;
uniform float uAmplitude;
attribute vec3 offset;
attribute vec3 color;
attribute float size;
attribute float hueOffset;
varying vec3 vColor;
varying float vHueOffset;

void main() {
  vec3 pos = position;
  float t = uTime * uSpeed;
  pos.x += sin(t + offset.x + pos.z * 0.1) * (uAmplitude + offset.y * 0.1);
  pos.y += cos(t + offset.y + pos.x * 0.1) * (uAmplitude + offset.z * 0.1);
  pos.z += sin(t + offset.z + pos.y * 0.1) * (uAmplitude * 0.5);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float dist = -mvPosition.z;
  float baseSize = 3.0;
  gl_PointSize = baseSize * size * (1.0 / dist);
  gl_Position = projectionMatrix * mvPosition;
  vColor = color;
  vHueOffset = hueOffset;
}
`;

export const dustFragment = `
vec3 hueShift(vec3 c, float hA) {
  float cMax = max(max(c.r, c.g), c.b);
  float cMin = min(min(c.r, c.g), c.b);
  float d = cMax - cMin;
  float H = 0.0;
  if (d != 0.0) {
    if (cMax == c.r) H = mod((c.g - c.b) / d, 6.0);
    else if (cMax == c.g) H = (c.b - c.r) / d + 2.0;
    else H = (c.r - c.g) / d + 4.0;
  }
  H *= 60.0;
  float L = (cMax + cMin)*0.5;
  float S = d==0.0?0.0:d/(1.0-abs(2.0*L-1.0));
  H += (hA*360.0);
  H = mod(H,360.0);
  float C = (1.0-abs(2.0*L-1.0))*S;
  float X = C*(1.0-abs(mod(H/60.0,2.0)-1.0));
  float M = L-C*0.5;
  vec3 rgb =
    (H<60.0)?vec3(C,X,0.0):
    (H<120.0)?vec3(X,C,0.0):
    (H<180.0)?vec3(0.0,C,X):
    (H<240.0)?vec3(0.0,X,C):
    (H<300.0)?vec3(X,0.0,C):vec3(C,0.0,X);
  rgb += vec3(M,M,M);
  return clamp(rgb,0.0,1.0);
}

uniform float uHueOffset;
varying vec3 vColor;
varying float vHueOffset;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);
  if (dist > 0.5) discard;
  float alpha = smoothstep(0.5, 0.45, dist);
  float totalHue = uHueOffset + vHueOffset;
  vec3 shiftedColor = hueShift(vColor, totalHue);
  gl_FragColor = vec4(shiftedColor, alpha);
}
`;