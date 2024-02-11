import axios from "axios";
import html2canvas from "html2canvas";

export default function CaptureImageContent(setResult) {
  const content = document.querySelector(".canva-box");

  html2canvas(content)
    .then((canvas) => {
      // Convert the canvas to a Blob
      canvas.toBlob(async (blob) => {
        // Send the blob to the server
        const formData = new FormData();
        formData.append("image", blob, "num_image.png");
        await axios
          // .post("http://localhost:8000/api/hdr", formData)
          .post("http://127.0.0.1:8000/api/hdr_LeNet", formData)
          .then((response) => {
            setResult(response.data);
            return response.data;
          })
          .catch((error) => console.error("Error:", error));
      }, "image/png");
    })
    .catch((err) => {
      console.error("Error capturing content:", err);
    });
}
