const fs = require("fs").promises;
const path = require("path");

async function removeWatermarks() {
  try {
    // Process each slide file
    for (let i = 1; i <= 17; i++) {
      const fileName = `slide-${String(i).padStart(2, "0")}-${getSlideFileName(
        i
      )}.html`;
      const filePath = path.join("components", "slides", fileName);

      // Read the file content
      let content = await fs.readFile(filePath, "utf8");

      // Remove the watermark div
      content = content.replace(
        /<div class="watermark top-right">.*?<\/div>/s,
        ""
      );

      // Write back the updated content
      await fs.writeFile(filePath, content);
    }

    console.log("Watermarks removed successfully!");
  } catch (error) {
    console.error("Error removing watermarks:", error);
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
    "contact",
  ];
  return fileNames[number - 1];
}

// Run the script
removeWatermarks();
