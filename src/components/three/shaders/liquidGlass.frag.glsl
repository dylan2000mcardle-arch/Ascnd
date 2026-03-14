uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vPosition;

// Inline simplex noise to avoid import issues
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vec2 uv = vUv;
  float time = uTime * 0.15;

  // Mouse influence
  vec2 mouseOffset = (uMouse - 0.5) * 0.15;

  // Multi-octave noise for distortion
  float n1 = snoise(vec3(uv * 2.0 + mouseOffset, time)) * 0.5;
  float n2 = snoise(vec3(uv * 4.0 - mouseOffset * 0.5, time * 1.3)) * 0.25;
  float n3 = snoise(vec3(uv * 8.0, time * 0.7)) * 0.125;
  float noise = (n1 + n2 + n3) * uIntensity;

  // Chromatic aberration via offset UVs
  vec2 distortedUV = uv + noise * 0.03;
  float r = snoise(vec3(distortedUV + vec2(0.003, 0.0), time * 0.5));
  float g = snoise(vec3(distortedUV, time * 0.5));
  float b = snoise(vec3(distortedUV - vec2(0.003, 0.0), time * 0.5));

  // Base dark color with subtle color shifts
  vec3 baseColor = vec3(0.004, 0.004, 0.008);
  vec3 chromaticShift = vec3(r, g, b) * 0.03;

  // Cyan accent glow from noise peaks
  float glowMask = smoothstep(0.3, 0.8, noise + 0.5);
  vec3 cyanGlow = vec3(0.0, 0.953, 1.0) * glowMask * 0.08;

  // Edge fresnel-like effect (brighter at edges)
  float edge = 1.0 - smoothstep(0.0, 0.5, length(uv - 0.5));
  vec3 edgeGlow = vec3(0.0, 0.953, 1.0) * edge * 0.02;

  // Refraction caustics pattern
  float caustic = pow(abs(snoise(vec3(uv * 6.0 + mouseOffset * 2.0, time * 0.8))), 3.0);
  vec3 causticColor = vec3(0.0, 0.953, 1.0) * caustic * 0.12;

  vec3 finalColor = baseColor + chromaticShift + cyanGlow + edgeGlow + causticColor;

  // Subtle vignette
  float vignette = 1.0 - smoothstep(0.4, 1.4, length((uv - 0.5) * 1.5));
  finalColor *= vignette;

  gl_FragColor = vec4(finalColor, 1.0);
}
