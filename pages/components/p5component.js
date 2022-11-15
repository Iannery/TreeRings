import React, { useEffect } from "react";
import { button, useControls } from "leva";
import dynamic from "next/dynamic";

export default function P5Component() {
  const [posX, setPosX] = React.useState(-1);
  const [posY, setPosY] = React.useState(-1);
  const Sketch = dynamic(() => import("react-p5"), {
    ssr: false,
  });
  const p5Ref = React.useRef(null);

  const [data, set] = useControls("Manipular", () => ({
    Atualizar: button((set) => p5Ref.current.redraw(), {
      label: "Atualizar",
    }),
    Qtd: {
      value: 75,
      min: 30,
      max: 200,
      step: 1,
    },
    Espessura: {
      value: 0.8,
      min: 0.01,
      max: 3,
      step: 0.01,
      label: "Espessura",
    },
    Distancia: {
      value: 4,
      min: 2,
      max: 20,
      step: 0.1,
      label: "Distância",
    },
    Caos: {
      value: 0.015,
      min: 0.001,
      max: 0.03,
      step: 0.001,
    },
    Cor: {
      value: "rgba(0,0,0,0.5)",
      label: "Cor",
    },
    Default: button(() => {
      set({ Qtd: 75 });
      set({ Espessura: 0.8 });
      set({ Distancia: 4 });
      set({ Caos: 0.015 });
      set({ Cor: "rgba(0,0,0,0.5)" });
      setPosX(-1);
      setPosY(-1);
    }),
  }));
  useControls("Exportar", () => ({
    "Exportar Imagem": button(() => {
      p5Ref.current.saveCanvas("aneis", "png");
    }),

    "Exportar JSON": button(() => downloadJson()),
    // "Copiar JSON gerador de SVG": button((set) => copyJsonToClipboard()),
  }));

  const downloadJson = () => {
    const element = document.createElement("a");

    const file = new Blob([JSON.stringify(exportData)], {
      type: "text/json",
    });

    element.href = URL.createObjectURL(file);
    element.download = "data.json";
    document.body.appendChild(element); // Required for this to work in FireFox

    element.click();
  };

  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(exportData));
    // alert("Copiado para a área de transferência!");
    // show modal

    document.getElementById("my-modal-4").checked = true;
  };

  var npts = 1000;
  var Z0 = 0;
  var L;
  var nrings = data.Qtd;
  var wiggelParam = data.Caos;
  var sc = data.Distancia;
  var rad;
  const exportData = {};

  exportData.npts = npts;
  exportData.nrings = nrings;
  exportData.wiggelParam = wiggelParam;
  exportData.sc = sc;
  exportData.color = data.Cor;
  exportData.width = sc * 0.4 * data.Espessura;
  exportData.rings = [];

  // Colors
  var ri = data.Cor;

  const setup = (p5, canvasParentRef) => {
    p5Ref.current = p5;
    p5.createCanvas(p5.windowHeight, p5.windowHeight).parent(canvasParentRef);
    p5.clear();
    p5.noFill();

    p5.noLoop();
    rad = 2 * p5.width;
  };
  // Function to draw the wave
  const draw = (p5) => {
    rad = 2 * p5.width;

    exportData.rings.splice(0, exportData.rings.length); // clear the array
    if (posX === -1 && posY === -1) {
      exportData.posX = p5.width / 2;
      exportData.posY = p5.height / 2;
      p5.translate(p5.width / 2, p5.height / 2);
    } else {
      exportData.posX = posX;
      exportData.posY = posY;
      p5.translate(posX, posY);
    }

    //Second outer ring
    rad = rad - sc * 10;
    p5.clear();
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
    const ring = {};
    ring.rad = rad;
    ring.Z0 = Z0;
    ring.payload = [];
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
      let object = {
        x: X,
        y: Y,
        l: L,
      };
      ring.payload.push(object);
    }
    exportData.rings.push(ring);
    p5.endShape();
  };

  const mousePressed = (p5) => {
    if (
      p5.mouseX > 0 &&
      p5.mouseX < p5.width &&
      p5.mouseY > 0 &&
      p5.mouseY < p5.height
    ) {
      setPosX(p5.mouseX);
      setPosY(p5.mouseY);
    }
  };

  return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
}
