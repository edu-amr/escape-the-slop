"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const HOME = "/";

function Row({ children, n }: { children: React.ReactNode; n?: number }) {
  return (
    <p className="nf-row">
      <span>{children}</span>
      {n !== undefined && <span>{n}</span>}
    </p>
  );
}

export function NotFoundTerminal() {
  const router = useRouter();
  const root = useRef<HTMLElement>(null);

  // boot: cada linha aparece em sequência, como um terminal carregando
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(
      ".nf-cols p, .nf-title, .nf-prompt, .nf-dots",
    ).forEach((node, i) => node.style.setProperty("--i", String(i)));
    el.classList.add("nf-booted");
    // rajadas de glitch em intervalos aleatórios
    let timer: number;
    const burst = () => {
      el.classList.add("nf-glitch");
      window.setTimeout(
        () => el.classList.remove("nf-glitch"),
        120 + Math.random() * 260,
      );
      timer = window.setTimeout(burst, 1400 + Math.random() * 3600);
    };
    timer = window.setTimeout(burst, 1800);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") router.push(HOME);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main className="nf" ref={root}>
      <svg width="0" height="0" className="nf-svg" aria-hidden>
        <filter id="nf-distort" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.002 0.06"
            numOctaves="1"
            seed="3"
            result="n"
          >
            <animate
              attributeName="seed"
              values="3;9;5;14;2;8"
              dur="1.2s"
              repeatCount="indefinite"
              calcMode="discrete"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            <animate
              attributeName="scale"
              values="0;0;0;0;0;60;0;0;18;0;0;0;120;0;0"
              keyTimes="0;.15;.3;.45;.55;.57;.6;.7;.72;.75;.85;.9;.91;.94;1"
              dur="7s"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </svg>
      <div className="nf-noise" aria-hidden />
      <div className="nf-tracking" aria-hidden />
      <div className="nf-scanline" aria-hidden />
      <div className="nf-cols">
        <div className="nf-col">
          <p className="nf-home-wrap">
            <Link href={HOME} className="nf-link">
              :/ ESCAPE-THE-SLOP
            </Link>
          </p>
          <div className="nf-hide-sm">
            <p>SYSTEM: ESCAPE-THE-SLOP_404_HANDLER</p>
            <p>RUNNING ERROR ROUTINE...</p>
            <p>&gt;&gt;&gt; PAGE NOT FOUND_EXCEPTION</p>
            <br />
            <p>CURATOR AUTOCODER // LIBRARY RETRIEVAL</p>
            <p>FAILURE LOC 004: ATTEMPTED TO LOAD</p>
            <p>RESOURCE [404.PAGE]</p>
            <p>STATUS: NULL_POINTER_REFERENCE</p>
            <p>RETURN CODE: -404</p>
          </div>
        </div>

        <div className="nf-col nf-col-mid">
          <div>
            <Row n={10}>
              <i className="nf-block" />
              404 error : página não encontrada
            </Row>
            <Row n={20}>CURATOR AUTOCODER // LIBRARY RETRIEVAL FAILURE</Row>
            <Row n={30}>LOC 004: ATTEMPTED TO LOAD RESOURCE [404.PAGE]</Row>
            <Row n={40}>a curadoria vai tentar</Row>
            <Row n={50}>to REBOOT THE SYSTEM</Row>
          </div>
          <div>
            <p>SYSTEM TRACE:</p>
            <br />
            <p>
              0001 LOAD{" "}
              <Link className="nf-link" href={HOME}>
                /bibliotecas
              </Link>
            </p>
            <p>
              0002 RUN{" "}
              <Link className="nf-link" href="/en">
                /en
              </Link>
            </p>
            <p>
              0003 RUN{" "}
              <Link className="nf-link" href="/es">
                /es
              </Link>
            </p>
            <p>0004 EXIT</p>
          </div>
          <div>
            <p>IF SLOP == TRUE THEN</p>
            <p>PRINT &quot;ESCAPE O SLOP. SEMPRE EXISTE UMA BIBLIOTECA MELHOR.&quot;</p>
            <br />
            <Row n={60}>&gt; EXECUTION HALTED</Row>
            <Row n={70}>&gt; MEMORY ADDRESS NOT ALLOCATED</Row>
            <Row n={80}>&gt; REDIRECT PATH UNDEFINED</Row>
            <Row n={90}>&gt; INITIATE MANUAL REBOOT (HOME)</Row>
          </div>
          <div>
            <p>0001 — ALLOCATE MEMORY BLOCK [PAGE.DATA]</p>
            <p>0002 — DATA STREAM EMPTY</p>
            <p>0003 — RETRIEVE FROM CACHE... TIMEOUT</p>
            <p>0004 — CACHE INDEX OUT OF RANGE</p>
            <p>0005 — 160 BIBLIOTECAS DETECTADAS, NENHUMA NESTE ENDEREÇO</p>
            <br />
            <p>ERROR 404xSL: RESOURCE NOT FOUND</p>
            <p>CAUSE: UNKNOWN</p>
            <p>LIKELY REASONS:</p>
            <p>- LINK QUEBRADO</p>
            <p>- CAMINHO DIGITADO ERRADO</p>
            <p>RECOVERY STEPS:</p>
            <p>&gt; TRY AGAIN</p>
            <Link href={HOME} className="nf-stretch-wrap">
              <Row n={100}>&gt; GO HOME</Row>
              <span className="nf-stretch nf-s3" aria-hidden>
                <span>&gt; GO HOME</span>
                <span>100</span>
              </span>
              <span className="nf-stretch nf-s7" aria-hidden>
                <span>&gt; GO HOME</span>
                <span>100</span>
              </span>
              <span className="nf-stretch nf-s16" aria-hidden>
                <span>&gt; GO HOME</span>
                <span>100</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="nf-col nf-hide-md nf-nowrap">
          <div>
            <p>NOTE_01: NEM TODA BIBLIOTECA É SLOP.</p>
            <p>NOTE_02: GOSTO TAMBÉM SE CURA.</p>
            <p>NOTE_03: TEMPLATE GENÉRICO É GLITCH NÃO INTENCIONAL.</p>
            <p>NOTE_04: TUDO QUE ESTÁ QUEBRADO AINDA RODA DE ALGUM JEITO.</p>
          </div>
          <div>
            <p>&gt; INITIALIZING ESCAPE-THE-SLOP FRAMEWORK</p>
            <p>&gt; SYSTEM CLOCK SYNC: ±0.0001s</p>
            <p>&gt; BOOT SECTOR CLEAN</p>
            <br />
            <div className="nf-dots" aria-hidden />
          </div>
          <div>
            <p>&gt; Trace do sistema indica ausência, não defeito.</p>
            <p>&gt; Nada corrompido. Nada apagado. A página simplesmente nunca chegou.</p>
            <p>&gt;</p>
            <p>&gt; O servidor responde com silêncio, como um catálogo que lembra</p>
            <p>&gt; dos ícones, mas não do endereço.</p>
            <br />
            <p>[MEMORY DUMP /dev/escape-the-slop/logs/404]</p>
            <br />
            <p>0001 &gt; O sistema lembra de cards, mas não deste.</p>
            <p>0002 &gt; Alguém digitou um caminho que nunca existiu.</p>
            <p>0003 &gt; Os logs se encheram de redundância poética.</p>
            <p>0004 &gt; Em algum lugar da máquina, um eco respondeu.</p>
            <p>0005 &gt; END OF MEMORY SECTOR 404.</p>
          </div>
        </div>
      </div>

      <div className="nf-bottom">
        <div className="nf-title" data-text="> 404 página não encontrada">
          &gt; 404 página não encontrada
        </div>
        <div className="nf-prompt">
          <span>&gt; pressione enter para reiniciar</span>
          <Link href={HOME} className="nf-key nf-blink">
            Enter
          </Link>
        </div>
        <div className="nf-prompt nf-right">
          <span>ou pressione</span>
          <span className="nf-key">ESC</span>
          <span>se tiver coragem.</span>
        </div>
      </div>

      <Link href={HOME} className="nf-back">
        Voltar para o início
      </Link>
    </main>
  );
}
