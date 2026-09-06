# Drive for 75 — Logo Concepts & Team Vote

An interactive presentation of the logo concepts for **Drive for 75**, a nonpartisan 501(c)(3) civic-engagement campaign building grassroots voter-participation infrastructure across Michigan, starting along Interstate 75.

The page lets the whole team browse every concept, zoom in, pick their top three, and see a live leaderboard.

**Live site:** https://ziad-alhusseiny.github.io/drive-for-75-logos/

---

## What's inside

| Concept | Idea | Options |
|---|---|---|
| The Threshold | A ring closed at three-quarters: the 75% goal made visible | 2 |
| The Doorstep | A doorway arch with the 75 inside: every result begins at a household door | 2 |
| The Centerline | The numeral is the road: a dashed highway centerline runs through the 75 | 4 |
| The Corridor | The 7 and 5 drawn as one continuous highway with exits | 4 |
| The Campaign | American campaign graphics with I-75 drawn on the Michigan map, starting at Detroit | 4 |
| One Block | The campaign idea rebuilt as a single fused mark | 4 |

All options share one palette so the team compares ideas, not colors:

| Color | Use | HEX |
|---|---|---|
| Michigan Blue | Primary | `#00274C` |
| Michigan Maize | Secondary, the highway line | `#FFCB05` |
| Old Glory Red | Accent, the destination | `#B31942` |

## Features

- Hover to lift, scale and glow any logo; click to open it full size.
- Pick up to three logos in order of preference. A floating dock tracks the picks.
- Weighted scoring: first choice 3 points, second 2, third 1.
- Live leaderboard with animated bars, refreshed every 20 seconds.
- One vote per person: voting again under the same name replaces the earlier vote.
- Pure HTML, CSS and JavaScript. No build step, no framework.

## Project structure

```
index.html        The presentation and voting page
apps-script.gs    Google Apps Script that stores votes in a Google Sheet
logos/            All 20 logo options as SVG
```

## Enabling live voting

GitHub Pages is static, so votes are stored in a Google Sheet through a small Apps Script web app.

1. Create a new Google Sheet.
2. Open **Extensions → Apps Script**, delete the sample code, paste the contents of `apps-script.gs`, and save.
3. Click **Deploy → New deployment**. Type: **Web app**. Execute as: **Me**. Who has access: **Anyone**. Click **Deploy** and authorize when prompted.
4. Copy the **Web app URL**.
5. In `index.html`, find the line near the top of the script:
   ```js
   const VOTE_ENDPOINT = "";
   ```
   and paste the URL between the quotes. Commit and push.

Votes now appear in the sheet in real time and the leaderboard updates automatically. Until the URL is set, the Submit button opens the voter's email app with a prefilled vote instead, so no vote is lost.

## Running locally

Open the folder in any static server, for example:

```bash
python -m http.server 8000
```

then visit `http://localhost:8000`.
