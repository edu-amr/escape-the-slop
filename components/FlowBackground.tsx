"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Curvas de nível de um campo de ruído deformado, sobre um degradê pastel suave.
const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 res;
uniform float time;
uniform vec2 mouse;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.0 + 3.7; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / res;
  float aspect = res.x / res.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.5;
  float t = time * 0.045;

  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  float md = distance(vec2(uv.x * aspect, uv.y), vec2(mouse.x * aspect, mouse.y));
  float pull = exp(-md * md * 9.0);
  float h = fbm(p + 2.2 * q + vec2(0.0, t * 0.6)) + 0.16 * pull;

  // pastéis: lilás, pêssego, menta
  vec3 a = vec3(0.925, 0.925, 1.0);
  vec3 b = vec3(1.0, 0.935, 0.92);
  vec3 c = vec3(0.92, 0.985, 0.965);
  vec3 wash = mix(mix(a, b, smoothstep(0.2, 0.8, q.x)), c, smoothstep(0.35, 0.9, q.y) * 0.8);

  // linhas de contorno finas
  float v = h * 16.0;
  float w = max(fwidth(v), 0.0001);
  float line = 1.0 - smoothstep(0.0, 1.3, abs(fract(v - 0.5) - 0.5) / w);
  float strong = 1.0 - smoothstep(0.0, 1.6, abs(fract(v / 4.0 - 0.5) - 0.5) / (w / 4.0));
  float ink = line * 0.16 + strong * 0.14 + pull * line * 0.18;

  vec3 col = mix(wash, vec3(0.28, 0.3, 0.42), ink);

  // fundo do site #fafafa: dissolve para baixo e nas bordas
  float fade = smoothstep(0.0, 0.85, uv.y);
  fade *= smoothstep(0.0, 0.12, uv.x) * smoothstep(0.0, 0.12, 1.0 - uv.x);
  col = mix(vec3(0.98), col, fade);

  col += (hash(gl_FragCoord.xy + time) - 0.5) * 0.018; // grão
  gl_FragColor = vec4(col, 1.0);
}
`;

export function FlowBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;
    gl.getExtension("OES_standard_derivatives");

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "res");
    const uTime = gl.getUniformLocation(program, "time");
    const uMouse = gl.getUniformLocation(program, "mouse");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const target = { x: 0.5, y: 0.6 };
    const current = { x: 0.5, y: 0.6 };
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (event.clientX - rect.left) / rect.width;
      target.y = 1 - (event.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let frame = 0;
    const start = performance.now();
    const draw = (now: number) => {
      if (visible) {
        current.x += (target.x - current.x) * 0.06;
        current.y += (target.y - current.y) * 0.06;
        gl.uniform1f(uTime, reduce ? 12 : (now - start) / 1000 + 12);
        gl.uniform2f(uMouse, current.x, current.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
