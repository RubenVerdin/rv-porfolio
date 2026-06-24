# Local Development Workflow

## Developing rv-design alongside rv-portfolio

`rv-design` is a personal component library used by this portfolio. During active development on both projects, set `RV_DESIGN_LOCAL_PATH` in `.env` to point directly at the local source. Vite picks up the path via the alias in `nuxt.config.ts` and watches the files — changes hot-reload instantly. No `npm link` needed.

### Setup

In `.env` (already configured, gitignored):

```env
RV_DESIGN_LOCAL_PATH=D:/Documents/Coding/rv-design/src/index.ts
```

### Daily workflow

1. Run `npm run dev` in rv-portfolio (port 3000)
2. Edit components in rv-design
3. Changes hot-reload in the portfolio immediately

### Restoring the published version

To go back to the GitHub version of rv-design, comment out or remove `RV_DESIGN_LOCAL_PATH` from `.env` and restart the dev server.
