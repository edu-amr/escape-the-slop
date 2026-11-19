import Script from "next/script";

export function CrispChat() {
  return (
    <Script id="crisp-script" strategy="afterInteractive">
      {`window.$crisp = [];
  window.CRISP_WEBSITE_ID = "0313793c-c22d-4a1d-9fb8-2929809bc8dd";
  (function () {
    d = document;
    s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();
  `}
    </Script>
  );
}
