import React, { useEffect } from "react";
// import p5svg from "p5.js-svg";
import { button, useControls } from "leva";
import dynamic from "next/dynamic";
import Sketch from "react-p5";

export default function P5Component({ lineColor }) {
  const p5Ref = React.useRef(null);
  const [data, set] = useControls("Imagem", () => ({
    Atualizar: button((set) => p5Ref.current.redraw(), {
      label: "Atualizar",
    }),
    // ExportarSvg: button((set) => p5Ref.current.save("mySVG.svg")),

    Qtd: {
      value: 40,
      min: -1,
      max: 100,
      step: 1,
    },
    Espessura: {
      value: 0.8,
      min: 0.01,
      max: 3,
      step: 0.01,
    },
    Caos: {
      value: 0.015,
      min: 0.001,
      max: 0.03,
      step: 0.001,
    },
    Cor: {
      value: "rgba(0,0,0,0.5)",
      label: "Cor da linha",
    },
    Default: button(() => {
      set({ Qtd: 40 });
      set({ Espessura: 0.8 });
      set({ Caos: 0.015 });
      set({ Cor: "rgba(0,0,0,0.5)" });
    }),
    Exportar: button((set) => p5Ref.current.save("AneisTronco.svg")),
  }));
  // const setup = (p5, canvasParentRef) => {
  //
  // };

  var npts = 1000;
  var Z0 = 0;
  var L;
  var nrings = data.Qtd;
  var wiggelParam = data.Caos;
  var sc = 4;
  var rad;

  // Colors
  var ri = data.Cor;

  const setup = (p5, canvasParentRef) => {
    p5Ref.current = p5;
    // p5Svg
    const p5Svg = require("p5.js-svg");
    // p5Svg(p5);
    p5.createCanvas(p5.windowHeight, p5.windowHeight, p5.SVG).parent(
      canvasParentRef
    );
    p5.clear();
    p5.noLoop();
    rad = 160 * sc;
  };
  // Function to draw the wave
  const draw = (p5) => {
    rad = 160 * sc;
    p5.translate(p5.width / 2, p5.height / 2);

    //Second outer ring
    rad = rad - sc * 10;
    p5.clear();
    drawRing(rad, p5);
    p5.noFill();
    // p5.fill(bg);
    p5.stroke(ri);
    for (var i = 0; i < nrings; i++) {
      rad = rad - sc * 4 - sc * p5.randomGaussian();
      p5.strokeWeight(sc * 0.4 * data.Espessura);
      drawRing(rad, p5);
      Z0 = Z0 + 0.03;
    }

    // // Second inner rings
    // rad = rad - 20;
    // for (var i = 0; i < nrings / 2; i++) {
    //   rad = rad - sc * 4 - sc * p5.randomGaussian();
    //   if (rad < 0) {
    //     break;
    //   }
    //   p5.strokeWeight(sc * 0.4 * data.Espessura);
    //   drawRing(rad, p5);
    //   Z0 = Z0 + 0.03;
    // }
  };

  const drawRing = (rad, p5) => {
    var L = 0;
    p5.beginShape();
    for (var i = 0; i <= npts; i++) {
      let X0 = wiggelParam * (100 + rad * p5.cos(L));
      let Y0 = wiggelParam * (100 + rad * p5.sin(L));
      let rad_ = rad + 50 * p5.noise(X0, Y0, Z0);
      let X = rad_ * p5.cos(L);
      let Y = rad_ * p5.sin(L);

      p5.vertex(X, Y);
      L = L + p5.TWO_PI / npts;
    }
    p5.endShape();
  };

  return <Sketch setup={setup} draw={draw} />;
}