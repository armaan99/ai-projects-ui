import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DigitRecognition from "./handwritten_digit_recognition/DigitRecognition";
import LensTryOn from "./lens-tryon/LensTryOn";

export default function Routess() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/ai/digit-recog"
          element={<DigitRecognition></DigitRecognition>}
        ></Route>
        <Route path="/ai/lens" element={<LensTryOn></LensTryOn>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
