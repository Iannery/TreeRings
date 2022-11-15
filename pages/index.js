import Head from "next/head";
import dynamic from "next/dynamic";
import { button, useControls } from "leva";
import { Suspense } from "react";

import { useEffect, useState } from "react";
const P5Component = dynamic(() => import("./components/p5component.js"), {
  ssr: false,
});

export default function Home() {
  const [data, set] = useControls(() => ({
    Background: {
      value: "#ffffff",
      label: "Cor de fundo",
      onChange: (value) => {
        document.body.style.backgroundColor = value;
      },
    },
  }));

  return (
    <div>
      <Head>
        <title>Anéis de Árvores</title>
      </Head>
      <div className="container flex h-auto items-center justify-center">
        <P5Component />
      </div>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-center text-lg font-bold">
            Copiado para a área de transferência!
          </h3>
          {/* <p className="py-4">Agora entre no link</p>
          <a
            href="https://editor.p5js.org/Iannery/sketches/ezTSxCSPw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-secondary btn-active btn">P5Js</button>
          </a>
          <p className="py-4">Cole o conteúdo no espaço</p>
          <div className="flex items-center justify-start space-x-5">
            <p className="">E clique no botão</p>
            <div class="inline-block  w-4 overflow-hidden">
              <div class=" h-6 origin-bottom-left -rotate-45 transform bg-white"></div>
            </div>
          </div> */}
        </label>
      </label>

      <footer className="footer footer-center bg-base-300 p-4 text-base-content">
        <div>
          <a href="https://www.linkedin.com/in/iannery/">
            Feito com ❤️ por Ian Nery
          </a>
        </div>
      </footer>
    </div>
  );
}
