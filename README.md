# Greek Path

A tiny, static Modern Greek learning web app designed for GitHub Pages. It has no build tools, backend, accounts, trackers, or external dependencies.

## Run locally

Open `index.html` in a browser, or serve it with:

```sh
python3.13 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish to GitHub Pages

1. Create an empty GitHub repository and push this directory to its `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Select **Deploy from a branch**, then choose `main` and `/ (root)`.
4. Save. GitHub will provide the public URL after the deployment completes.

Learner progress is intentionally stored only in each browser’s `localStorage`.
