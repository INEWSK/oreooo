# OREOOO!

Build an Oreo-style word stack and save it as a PNG.

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo

- Custom domain: [https://oreooo.inewsk.me](https://oreooo.inewsk.me)
- Production deploys go to Cloudflare Pages, project name `oreooo`. After the project exists, Pages serves it at `https://oreooo.pages.dev` (when that name is free). Attach the custom domain to that project in the Cloudflare dashboard.

## Keyboard shortcuts

| Key           | Action            |
| ------------- | ----------------- |
| `o` / `r`     | Input "O" or "RE" |
| `-` / `Space` | Input separator   |
| `Enter`       | Generate          |
| `Backspace`   | Delete last       |

## Static build

`next.config.ts` sets `output: "export"`. `yarn build` writes the site to `./out` with an empty `basePath`, which is what `*.pages.dev` and a custom domain at the site root expect.

```bash
yarn lint
yarn build
```

`BASE_PATH` is optional and unset in CI. Set it only when hosting the export under a subpath.

## Cloudflare Pages

Workflow: [`.github/workflows/cloudflare-pages.yml`](./.github/workflows/cloudflare-pages.yml)

- Pull requests run `yarn install --frozen-lockfile`, `yarn lint`, and `yarn build`. A failure fails the check.
- Pushes to `main` run those checks, then deploy `out/` with `cloudflare/wrangler-action` (`pages deploy out --project-name=oreooo`). `main` is the production branch.
- Pull requests from this repository also deploy a preview for the head branch. Fork pull requests are linted and built only. Preview deploy is skipped when the secrets below are missing; a production deploy fails if they are missing.

### GitHub Actions secrets

Add both under **Settings → Secrets and variables → Actions**. Do not commit the values.

| Secret | What to store |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | API token with **Account · Cloudflare Pages · Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID (dashboard overview → API) |

Create the token from the [Cloudflare API tokens page](https://dash.cloudflare.com/?to=/:account/api-tokens): Custom token → Account, Cloudflare Pages, Edit.

### Create the Pages project once

The first deploy needs a Pages project named `oreooo` with production branch `main`. Create it before that deploy:

- Dashboard: **Workers & Pages → Create → Pages → Upload assets**, name `oreooo`, production branch `main`.
- Or, with the same account credentials: `npx wrangler pages project create oreooo --production-branch main`

If `oreooo` is already taken on `pages.dev`, pick another project name and set `PAGES_PROJECT` in the workflow to match.

Direct Upload from GitHub Actions is the deploy path ([direct upload with CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/), [static Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)). Build command is `yarn build` (Next `next build`); output directory is `out`.

## Contributing

UI copy lives in `messages/*.json` (`en`, `zh-hant`, `ja`).  
If new glyphs are needed, place the full font at `src/shared/fonts/Naikai.source.woff2` and run `yarn font:subset`.

## License

MIT — see [LICENSE](./LICENSE)

## Acknowledgments

[ddiu8081/oreooo](https://github.com/ddiu8081/oreooo/)
