mermaid.initialize({ 
    startOnLoad: true,
    theme: 'default',
    flowchart: {
        useMaxWidth: false
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Wait for Mermaid diagrams to render
    setTimeout(function () {
        const mermaidDivs = document.querySelectorAll(".mermaid");
        
        mermaidDivs.forEach((mermaidDiv, index) => {
            try {
                // Find SVG within this specific mermaid div
                const svgElement = mermaidDiv.querySelector("svg");
                if (!svgElement) {
                    console.error(`No SVG found in diagram ${index + 1}`);
                    return;
                }

                // Set explicit dimensions
                svgElement.style.width = "100%";
                svgElement.style.height = "600px";
                mermaidDiv.style.overflow = "hidden";
                
                // Initialize pan-zoom
                const panZoomInstance = svgPanZoom(svgElement, {
                    panEnabled: true,
                    zoomEnabled: true,
                    controlIconsEnabled: true,
                    fit: true,
                    center: true,
                    minZoom: 0.1,
                    maxZoom: 10,
                    zoomScaleSensitivity: 0.5,
                    beforePan: function(oldPan, newPan) {
                        return newPan;
                    }
                });

                // Add resize handler
                window.addEventListener('resize', function() {
                    panZoomInstance.resize();
                    panZoomInstance.fit();
                    panZoomInstance.center();
                });

                console.log(`Pan-zoom initialized for diagram ${index + 1}`);
            } catch (error) {
                console.error(`Error initializing pan-zoom for diagram ${index + 1}:`, error);
            }
        });
    }, 1500); // Increased timeout for reliable rendering
});