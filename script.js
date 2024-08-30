const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clear = document.getElementById("clearButton");
const save = document.getElementById("saveButton");
const retrieve = document.getElementById("retrieveButton");
const fontPicker = document.getElementById("fontPicker");

const dTool = canvas.getContext("2d");

colorPicker.addEventListener("change", (e) => {
  dTool.strokeStyle = e.target.value;
  dTool.fillStyle = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    dTool.beginPath();
    dTool.moveTo(lastX, lastY);
    dTool.lineTo(e.offsetX, e.offsetY);
    dTool.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvasColor.addEventListener("change", (e) => {
  dTool.fillStyle = e.target.value;
  dTool.fillRect(0, 0, 800, 500);
});

fontPicker.addEventListener("change", (e) => {
  dTool.lineWidth = e.target.value;
});

clear.addEventListener("click", (e) => {
  dTool.clearRect(0, 0, 800, 500);
});

save.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());
  let link = document.createElement("a");

  link.download = "my-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});


retrieve.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContents');
    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        dTool.drawImage(img,0,0)
    }
})