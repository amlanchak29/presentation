const fs = require("fs").promises;
const path = require("path");

// Function to correct asset paths in the combined content
function correctAssetPaths(content) {
  // Fix background-image URLs in style attributes
  content = content.replace(
    /background-image:\s*url\(['"]?assets\//g,
    "background-image: url('../assets/"
  );

  // Fix img src attributes
  content = content.replace(/src="assets\//g, 'src="../assets/');

  // Fix any remaining url('assets/...) references
  content = content.replace(/url\(['"]?assets\//g, "url('../assets/");

  return content;
}

async function buildExports() {
  try {
    // Read the export template
    const template = await fs.readFile(
      "templates/export-template.html",
      "utf8"
    );

    // Get all slide files
    const slideFiles = [];
    for (let i = 1; i <= 18; i++) {
      const fileName = `slide-${String(i).padStart(2, "0")}-${getSlideFileName(
        i
      )}.html`;
      const filePath = path.join("components", "slides", fileName);
      const content = await fs.readFile(filePath, "utf8");
      slideFiles.push(content);
    }

    // Combine all slides and correct asset paths
    const allSlides = correctAssetPaths(slideFiles.join("\n"));

    // Create light theme export
    let lightExport = template.replace(
      "<!-- SLIDES_PLACEHOLDER -->",
      allSlides
    );
    lightExport = lightExport.replace(
      '<body class="export-version">',
      '<body class="export-version light-export">'
    );
    await fs.writeFile("export/light-theme-export.html", lightExport);

    // Create dark theme export
    let darkExport = template.replace("<!-- SLIDES_PLACEHOLDER -->", allSlides);
    darkExport = darkExport.replace(
      '<body class="export-version">',
      '<body class="export-version dark-export">'
    );
    await fs.writeFile("export/dark-theme-export.html", darkExport);

    console.log("Export files built successfully!");
  } catch (error) {
    console.error("Error building export files:", error);
  }
}

// Get slide filename from number
function getSlideFileName(number) {
  const fileNames = [
    "title",
    "why-we-exist",
    "nutshell",
    "founding-team",
    "trusted-brands",
    "capabilities",
    "why-thought-leadership",
    "long-form-formats",
    "books-ebooks",
    "whitepapers-blogs",
    "long-form-video",
    "short-form-formats",
    "short-form-video",
    "linkedin-thought-leadership",
    "depth-and-breadth",
    "client-testimonials",
    "more-testimonials",
    "contact",
  ];
  return fileNames[number - 1];
}

// Run the build
buildExports();
