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
    </div>
  );
}
