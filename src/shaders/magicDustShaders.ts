export const magicDustVertex = `
uniform float uTime;
uniform float uSpeed;

attribute float size;
attribute vec3 velocity;

varying vec3 vColor;
varying float vOpacity;

void main() {
  vec3 pos = position;

  // Circular swirling motion with upward drift
  float angle = uTime * 0.5 + length(pos.xz) * 4.0;
  pos.x += sin(angle) * 0.1;
  pos.z += cos(angle) * 0.1;
  pos.y += velocity.y * uSpeed;

  // Reset particles when they rise too high
  if (pos.y > 20.0) {
    pos.y = 0.0;
    pos.x = (fract(sin(dot(position.xz, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 10.0;
    pos.z = (fract(cos(dot(position.xz, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 10.0;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z); // Perspective scaling
  gl_Position = projectionMatrix * mvPosition;

  // Fade opacity as particles rise
  vOpacity = 1.0 - (pos.y / 20.0);

  // Dynamic color based on height
  vColor = mix(vec3(1.0, 0.4, 0.1), vec3(1.0, 0.8, 0.3), pos.y / 20.0);
}
`;
export const magicDustFragment = `
varying vec3 vColor;
varying float vOpacity;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);

  // Create a soft circular particle shape
  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;

  // Apply glow effect with vibrant colors
  gl_FragColor = vec4(vColor * alpha * 1.5, alpha);
}
`;
