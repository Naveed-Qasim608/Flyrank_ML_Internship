# Content Refresh Prioritization using Search Intelligence

**An Explainable Machine Learning Approach for Ranking Content Update Opportunities**

FlyRank ML Internship research capstone by **Muhammad Naveed Qasim**, Bachelor of Artificial Intelligence, Riphah International University.

- **Live site:** https://naveed-qasim608.github.io/Flyrank_ML_Internship/
- **GitHub:** https://github.com/Naveed-Qasim608/Flyrank_ML_Internship
- **LinkedIn:** https://www.linkedin.com/in/muhammad-naveed-qasim-7760573a8/

---

## What this is

Content teams cannot manually review thousands of published pages to decide which ones need a refresh. This project frames that problem as a binary classification task — **declining vs. not declining** — using search intelligence signals from Google Search Console, and compares a transparent baseline rule against a Random Forest model.

The output is a ranked, reason-coded worklist (High / Medium / Low priority), designed as decision support for a human editorial team — not an autonomous publishing system.

## Research summary

| | |
|---|---|
| **Research question** | How can search intelligence signals identify declining content pages that should be refreshed before significant traffic loss occurs? |
| **Dataset** | FlyRank ML Internship dataset — 79M+ anonymized production search records, stored in DuckDB, derived from Google Search Console signals |
| **Target** | Binary classification: declining vs. not declining |
| **Features** | `content_age_days`, `days_since_last_update`, `impressions_90d`, `avg_position`, `ctr`, `word_count`, `visible_queries`, `rare_share`, `anon_share`, `top_query_share`, `imp_prev30`, `imp_last30` |
| **Models compared** | Rule-based baseline vs. Random Forest |
| **Validation** | GroupShuffleSplit (page-level grouping) with leakage checks |
| **Evaluation metrics** | Accuracy, Precision, Recall, F1, Base Rate |
| **Output** | Priority tier + reason code (`STALE_VISIBLE`, `DECLINING_SIGNAL`, `HIGH_EXPOSURE`, `LOW_PRIORITY`) |

> **Note on figures:** metrics shown on the site are labeled placeholders in the shape of the final evaluation table, pending sign-off on the exact holdout results. No unrealistic numbers are invented.

## Privacy

The dataset used for this research contains **no client names, no URLs, and no private search queries**. All figures are aggregated at the page-feature level before any modeling occurs.

## Limitations

- Findings describe observed relationships in the training window — not proven causes of ranking changes.
- This is decision support only; no content action is taken automatically.
- No causal claims are made, and the model does not predict or reverse-engineer Google's ranking algorithm.

## Repository structure

```
Flyrank_ML_Internship/
├── data/                 # anonymized samples only
├── notebooks/
│   ├── 01_feature_engineering.ipynb
│   ├── 02_baseline_and_model.ipynb
│   └── 03_evaluation_and_recommendations.ipynb
├── src/                  # feature + model code
├── docs/                 # this website (GitHub Pages source)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── 404.html
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
├── requirements.txt
└── README.md
```

## Running locally

```bash
git clone https://github.com/Naveed-Qasim608/Flyrank_ML_Internship.git
cd Flyrank_ML_Internship

pip install -r requirements.txt

jupyter notebook notebooks/01_feature_engineering.ipynb
jupyter notebook notebooks/02_baseline_and_model.ipynb
jupyter notebook notebooks/03_evaluation_and_recommendations.ipynb

# Serve the website locally
cd docs
python -m http.server 8000
```

## Deploying to GitHub Pages

1. Push the `docs/` folder (containing this site) to the `main` branch.
2. In GitHub: **Settings → Pages → Source → Deploy from branch → `main` / `docs`**.
3. The site will be published at `https://<username>.github.io/<repo>/`.

No build step is required — the site is pure HTML, CSS, and JavaScript.

## Tech stack

- Semantic HTML5
- Pure CSS (custom properties, no framework)
- Pure vanilla JavaScript (no external JS frameworks)
- SVG for all charts and illustrations (no image dependencies)

## Acknowledgments

Built on the [FlyRank ML Internship](https://flyrank.ai) dataset.

## License

© 2026 Muhammad Naveed Qasim. All rights reserved.
