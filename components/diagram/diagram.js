mermaid.initialize({ startOnLoad: true });

document.addEventListener("DOMContentLoaded", function () {
  // Wait for Mermaid to render the diagram
  setTimeout(function () {
    var svgElement = document.querySelector(".mermaid svg");
    svgElement.style.maxWidth = "";
    svgElement.style.height = "600px";

    if (svgElement) {
      svgPanZoom(svgElement, {
        viewportSelector: ".mermaid",
        panEnabled: true,
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
      });
    }
  }, 500); // Adjust timeout if needed
});
