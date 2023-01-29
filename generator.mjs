import { readFile, writeFile } from "node:fs/promises";
import { html } from "satori-html";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

// The template is a HTML string that is rendered to an SVG image using the satori library. Edit the template to change the result image.

const openGraphImageTemplate = html(`
<div style="display: flex; flex-flow: column nowrap; align-items: stretch; width: 1200px; height: 675px; backgroundImage: linear-gradient(to right, #f5f4f4); color: #000;">
    <div style="display: flex; flex: 1 0; flex-flow: row nowrap; justify-content: center; align-items: center;">
      <img src="https://www.gitpod.io/images/media-kit/logo-light-theme.png" alt="Gitpod" />
    </div>
    <div style="display: flex; justify-content: center; align-items: center; margin: 6px; padding: 12px; border-radius: 4px; background: #FFB45B; color: #f5f4f4; font-size: 22px;">
      <h1>Changelog</h1>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; margin: 6px; padding: 12px; border-radius: 4px; background: #12100C; color: #f5f4f4; font-size: 22px;">
      <p>A sum-up of Gitpod’s latest product improvements, feature releases
      and community contributions.</p>
    </div>
  </div>
  </div>
`);

// This code is used to generate an SVG image template for the open graph image.
// The open graph image is a preview image that is shown when a link to the
// website is shared on social media.
// The SVG image template is rendered to an image using the satori library.
// The satori library uses Puppeteer to render the SVG image template to an image.
// The image is stored in the public directory and is served by the Next.js server.

const generateSVG = await satori(openGraphImageTemplate, {
  width: 1200,
  height: 675,
  fonts: [
    {
      name: "Open Sans",
      data: await readFile("./fonts/OpenSans-Bold.ttf"),
      weight: 700,
      style: "normal",
    },
  ],
}).catch((error) => {
  console.error(error);
});

// Create a new Resvg instance
const resvg = new Resvg(generateSVG, {
  background: "#f5f4f4",
});

// Render the SVG to a PNG
const pngData = resvg.render();
const pngBuffer = pngData.asPng();

await writeFile("./result.png", pngBuffer);
