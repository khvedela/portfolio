export const dustVertex = `
uniform float uTime;
uniform float uSpeed;
uniform float uAmplitude;
attribute vec3 offset;
attribute vec3 velocity; // Velocity for movement
attribute float size;

varying float vOpacity;

void main() {
  vec3 pos = position + offset;
  pos += velocity * sin(uTime * uSpeed);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  vOpacity = 1.0 - clamp(length(velocity) * 0.5, 0.0, 1.0); // Control opacity by velocity
}
`;

export const dustFragment = `
varying float vOpacity;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);

  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;

  vec3 color = vec3(1.0, 0.84, 0.6); // Warm golden glow
  gl_FragColor = vec4(color, alpha);
}
`;