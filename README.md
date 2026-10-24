# OREOOO!

Build an Oreo-style word stack and save it as a PNG.

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Local checks:

```bash
yarn lint
yarn build
```

## Demo

- Custom domain: [https://oreooo.inewsk.me](https://oreooo.inewsk.me)
- Cloudflare Pages project name: `oreooo` (`https://oreooo.pages.dev` when that name is free)

## Keyboard shortcuts

| Key           | Action            |
| ------------- | ----------------- |
| `o` / `r`     | Input "O" or "RE" |
| `-` / `Space` | Input separator   |
| `Enter`       | Generate          |
| `Backspace`   | Delete last       |

## Static build

`next.config.ts` sets `output: "export"`. `yarn build` writes the site to `./out` with an empty `basePath`, which is what `*.pages.dev` and `oreooo.inewsk.me` expect.

`BASE_PATH` is optional and unset for this deploy. Set it only when hosting the export under a subpath.

## Cloudflare Pages

Production deploys come from the [Cloudflare Workers & Pages GitHub app](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/). Connect the repo in the dashboard once. Pages builds and publishes on every push. Pull requests from this repository get preview deployments. Build settings live on the Pages project, not in GitHub Actions.

In **Workers & Pages → Create → Pages → Connect to Git**, choose `INEWSK/oreooo` and use:

| Setting | Value |
| --- | --- |
| Project name | `oreooo` |
| Production branch | `main` |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `yarn build` |
| Build output directory | `out` |
| Root directory | repository root |

Node.js is pinned to `22.16.0` in [`.node-version`](./.node-version). Pages reads that file. Next.js 16 needs Node 20.9 or newer. New Pages projects already default to Node 22 on the [v3 build image](https://developers.cloudflare.com/pages/configuration/build-image/).

The lockfile is Yarn 1 (`yarn.lock` v1). The v3 image defaults to Yarn 4 and does not infer the Yarn version from the lockfile, so set this environment variable for **Production and Preview** (Settings → Environment variables):

| Name | Value |
| --- | --- |
| `YARN_VERSION` | `1.22.22` |

Then attach the custom domain `oreooo.inewsk.me` on the project (Custom domains) and follow the DNS prompt.

Reference: [static Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) (build `next build`, output directory `out`). `yarn build` runs that same `next build`.

## Contributing

UI copy lives in `messages/*.json` (`en`, `zh-hant`, `ja`).  
If new glyphs are needed, place the full font at `src/shared/fonts/Naikai.source.woff2` and run `yarn font:subset`.

## License

MIT — see [LICENSE](./LICENSE)

## Acknowledgments

[ddiu8081/oreooo](https://github.com/ddiu8081/oreooo/)
