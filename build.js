const esbuild = require("esbuild");
const { minify: htmlMinify } = require("html-minifier-terser");
const fs = require("fs");
const CleanCSS = require("clean-css");
const path = require("path");

function copyFolderSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

const options = {
  entryPoints: ["scripts/script.js"],
  bundle: true,
  minify: true,
  metafile: true,
  outdir: "dist/scripts",
};

const htmlMinifyOptions = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  removeAttributeQuotes: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyJS: true,
  minifyCSS: true,
};

async function build() {
  await esbuild.build(options);

  const htmlContent = fs.readFileSync("index.html", "utf8");

  const minifiedHtml = await htmlMinify(htmlContent, htmlMinifyOptions);

  const css = fs.readFileSync("styles/index.css", "utf8");

  const minifiedCss = new CleanCSS().minify(css).styles;

  if (!fs.existsSync("dist/styles")) {
    fs.mkdirSync("dist/styles");
  }

  fs.writeFileSync("dist/styles/index.css", minifiedCss, "utf8");
  fs.writeFileSync("dist/index.html", minifiedHtml, "utf-8");

  copyFolderSync("public", "dist/public");
}

build();
