import React, { useState } from "react";
import "./DigitRecognition.css";

import CanvasBoard from "./CanvasBoard";
import CaptureImageContent from "./CaptureImageContent";

import AI_Bot_GIF from "./../media/ai_bot.gif";

export default function DigitRecognition() {
  // Variable to store result of Prediction
  const [result, setResult] = useState(-1);

  // Annotated Lines on Input Box
  const [lines, setLines] = useState([]);

  // Function to clear annotation from input box
  const clearDrawing = () => {
    setLines([]);
    setResult(-1);
  };

  return (
    <div className="HDR">
      {/* Header */}
      <div className="HDR-header">
        <div className="title">Handwritten Digit Recognition</div>
        <div className="sub-title">by - Armaan Agrawal</div>
      </div>

      {/* Body */}
      <div className="HDR-body">
        <div className="left-input">
          <div className="desc">Annotate a single digit number below</div>
          <div className="annotate-board-box">
            <CanvasBoard lines={lines} setLines={setLines}></CanvasBoard>
          </div>
        </div>
        <div className="right-output">
          <div className="desc">The number annotated seems to resemble</div>
          <div className="prediction-result-box">
            {result !== -1 ? (
              <div className="prediction-res">{result}</div>
            ) : (
              <img src={AI_Bot_GIF} alt="" />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="HDR-footer">
        <div
          className="predict-btn"
          onClick={async () => {
            CaptureImageContent(setResult);
          }}
        >
          Predict
        </div>
        <div className="clear-btn" onClick={clearDrawing}>
          Clear
        </div>
      </div>
    </div>
  );
}
