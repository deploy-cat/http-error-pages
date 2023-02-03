import nunjucks from "nunjucks";
import { copy } from "copy";

nunjucks.configure("templates", { autoescape: true, noCache: true });

const imgPath = "./http.cat/public/images";
const buildPath = "./.dist";
const publicPath = "./public";

await copy(
  publicPath,
  buildPath,
  { overwrite: true },
);
await copy(
  imgPath,
  `${buildPath}/images`,
  { overwrite: true },
);

const images = Deno.readDir(imgPath);
for await (const image of images) {
  const { status } = image.name.match(/(?<status>[0-9]+).jpg$/).groups;
  const destPath = `${buildPath}/${status}.html`;
  console.log("generate", destPath);
  const html = nunjucks.render("index.html", {
    img: { src: `./images/${image.name}` },
    status,
  });
  await Deno.writeTextFile(destPath, html);
}
