# CS 4412 Data Mining Project — Student Performance Pattern Mining

**Author:** Cesar Arevalo Colocho  
**Email:** careval3@students.kennesaw.edu  
**Course:** CS 4412 – Data Mining – Section W01, Kennesaw State University  
**Semester:** Spring 2026

---

## Project Overview

This project applies data mining techniques to the [UCI Student Performance Dataset](https://archive-beta.ics.uci.edu/dataset/320/student+performance) to explore patterns in student academic outcomes. The analysis focuses on discovering natural groupings of students and meaningful associations among academic, social, and lifestyle attributes.

The project emphasizes **pattern discovery and behavioral segmentation** rather than predictive modeling, using clustering, dimensionality reduction, classification trees, and anomaly detection to identify meaningful structures in the data.

### Discovery Questions

1. Do family and socioeconomic attributes form recognizable patterns associated with academic consistency?
2. How do study habits and absence behavior interact with student performance?
3. What natural clusters of students emerge when combining academic, demographic, and lifestyle factors?

---

## Project Structure

```
cs4412-project/
├── data/                              # Dataset files
│   ├── finalData-Dictionary.md        # Full data dictionary (34 attributes)
│   └── reference-data/
│       ├── student-mat.csv            # Math course student data
│       ├── student-por.csv            # Portuguese course student data
│       └── dataDictionary.txt         # Text description of all attributes
│
├── notebooks/                         # Analysis code (R Markdown)
│   ├── M2_Analysis.Rmd                # M2: Initial implementation (K-Means baseline)
│   ├── M3_Analysis.Rmd                # M3: Complete implementation (all techniques)
│   └── M4_Analysis.Rmd                # M4: Final report (consolidated analysis)
│
├── docs/                              # Summary documents
│   ├── Proposal.pdf                   # M1: Proposal document
│   ├── Summary_AnalysisDoc_M2.pdf     # M2: Summary of initial analysis
│   ├── Summary_AnalysisDoc_M3.pdf     # M3: Summary of complete analysis
│   └── M4_FinalReport.pdf             # M4: Final rendered report
│
├── outputs/                           # Knitted notebook outputs
│   ├── M2_Analysis.pdf                # M2: Rendered notebook
│   ├── M3_Analysis.pdf                # M3: Rendered notebook
│   └── M4_Analysis.pdf                # M4: Rendered notebook
│
├── Website/                           # Survey data collection template
│   ├── index.html                     # Student data entry form (34 attributes)
│   ├── style.css                      # Form styling
│   └── script.js                      # Form functionality and data handling
│
├── install-packages.R                 # One-step package installer
└── README.md
```

---

## Getting Started

### 1. Install R

R must be installed as a system-level component before opening any `.Rmd` files.

- **Download:** https://cran.r-project.org/
- Choose your operating system and follow the installer instructions
- Verify by running `R --version` in a terminal

### 2. Install an IDE

Any R-compatible IDE will work. **Positron** is recommended for this project.

- **Positron:** https://positron.posit.co/download.html
- **RStudio:** https://posit.co/download/rstudio-desktop/
- **VS Code** with the R extension also works

### 3. Clone and Install Dependencies

```bash
git clone https://github.com/Colochoo/cs4412-project.git
cd cs4412-project
```

Then open an R console and run:

```r
source("install-packages.R")
```

This will automatically install any missing packages and verify they load correctly. Once you see `All packages installed and verified`, you are ready to run the notebooks.

### 4. Run the Analysis

1. Open the project folder in your IDE
2. Open any notebook from the `notebooks/` folder (`M2_Analysis.Rmd`, `M3_Analysis.Rmd`, or `M4_Analysis.Rmd`)
3. Click **Knit** (or **Render**) to run the full analysis

>Data loads directly from this repository's `data/reference-data/` folder via GitHub raw URLs, so no manual data download is needed.


### Key Design Decisions

| Decision | Rationale |
|---|---|
| 8 clustering variables selected | Highest correlation with G3; noise variables suppressed signal |
| Nominal categoricals excluded from clustering | Arbitrary integer codes produce misleading distances |
| k=3 chosen | Elbow and silhouette methods independently converge |
| PCA applied after K-Means baseline | Removes G1/G2/G3 redundancy; improves silhouette |
| DBSCAN as validation only | Confirms gradual boundaries rather than replacing K-Means |
| Decision Tree trained on cluster labels | Interpretability tool, not a predictive model |
| LOF threshold = 1.5 | Balances sensitivity with actionability; ~10–15% flagged |

---

## Survey Website Template (Optional)

The `web/` folder contains a self-contained HTML survey form that mirrors the exact 34-attribute schema of the UCI Student Performance Dataset. It is **entirely optional** and is not required to run any of the analysis notebooks.

### What it is

A browser-based data entry form covering all six attribute categories — school enrollment, student demographics, family background, study habits, lifestyle, and academic performance. Responses are submitted directly to a Google Spreadsheet and can be exported as a `.csv` file ready for analysis without any additional formatting.

### When to use it

Use this template if you want to **conduct your own survey** and collect fresh student performance data from a real school or group. The exported `.csv` will be compatible with the same R analysis pipeline used in this project (K-Means, PCA, DBSCAN, Decision Tree, LOF), so you can replicate or extend the findings with your own population.

You do **not** need this template if you are only working with the original UCI dataset already included in `data/reference-data/`.

### How to deploy it

The site is hosted via GitHub Pages. To set it up for your own use:

1. Fork or clone this repository
2. Follow the **Setup Guide** tab inside the site to connect it to your own Google Spreadsheet via Google Apps Script
3. Set it up in your own website to make it public

>The form is free to use for any academic research or replication study. Attribution is appreciated but not required.

---

## Milestones

### M1 — Proposal

Defined the project scope, selected the UCI Student Performance dataset (1,044 students, 34 variables across Math and Portuguese courses), and formulated discovery questions around academic patterns, behavioral factors, and natural student groupings.

📄 [Proposal Document](docs/Proposal.pdf)

### M2 — Initial Implementation

Applied data preprocessing, exploratory data analysis, and K-Means clustering to establish a baseline understanding of the data.

**Key findings:**
- Previous grades (G1, G2) are the strongest predictors of final grade (G3)
- Failures, study time, and absences also influence performance
- K-Means (k=3, silhouette ≈ 0.19) identified three student profiles: high-performing, moderate, and at-risk

📄 [M2 Summary Document](docs/Summary_AnalysisDoc_M2.pdf) · 📓 [M2 Notebook](notebooks/M2_Analysis.Rmd) · 📊 [M2 Notebook Output](outputs/M2_Analysis.pdf)

### M3 — Complete Implementation

Extended M2 with additional techniques to validate cluster structure, improve interpretability, and detect anomalies.

| Technique | Category | Purpose |
|---|---|---|
| Correlation Heatmap | Feature Selection | Justify variable choices with data |
| PCA | Dimensionality Reduction | Remove G1/G2/G3 redundancy |
| DBSCAN | Density-based Clustering | Validate groups without pre-setting k |
| Hierarchical Clustering | Agglomerative Clustering | Confirm structure via dendrogram |
| Decision Tree | Classification | Explain clusters with readable rules |
| LOF | Anomaly Detection | Flag unusual student profiles |

**Key findings:**
- Three student profiles are robust across multiple clustering methods
- Failure history is the strongest behavioral risk indicator
- Family education plays a significant but secondary role
- Study time and absences have minimal impact on cluster separation
- LOF anomalies represent students with mismatched profiles worthy of individual investigation

📄 [M3 Summary Document](docs/Summary_AnalysisDoc_M3.pdf) · 📓 [M3 Notebook](notebooks/M3_Analysis.Rmd) · 📊 [M3 Notebook Output](outputs/M3_Analysis.pdf)

### M4 — Final Report

Consolidated the full analysis pipeline into a cohesive final report that directly answers all three original discovery questions. Built on the M2 and M3 foundations to evaluate the validity and interpretability of the cluster structure identified throughout the project.

**Central question:** Can we identify meaningful groups of students based on their academic, behavioral, and socioeconomic attributes, and what do those groups tell us about the factors that drive academic outcomes?

**Techniques applied:**
- **PCA** — Reduced feature redundancy from the three highly correlated grade variables (G1, G2, G3) to produce a cleaner signal for clustering
- **DBSCAN** — Density-based validation of the three-group structure without presetting k
- **Hierarchical Clustering** — Bottom-up dendrogram analysis confirming the cluster structure
- **Decision Tree** — Translated statistical clusters into simple, human-readable rules (e.g., "G2 > 12 and failures = 0 → high-performing group")
- **LOF** — Flagged individual students with genuinely unusual trait combinations

**Key findings:**
- The three-cluster structure (high-performing, moderate, at-risk) is validated across all methods
- G2 (second-period grade) and past failures are the two strongest cluster separators
- Family education (Medu, Fedu) contributes meaningfully but is secondary to academic history
- Students flagged by LOF often have mismatched socioeconomic and academic profiles
- Study time and absences do not reliably separate clusters on their own

📄 [Final Report](notebooks/FinalReport.pdf) · 📓 [M4 Notebook](notebooks/M4_Analysis.Rmd) · 📊 [M4 Notebook Output](outputs/M4_Analysis.pdf)


---

## FInal Analysis Pipeline

The project follows a sequential data mining pipeline applied across milestones M2–M4. Each stage feeds directly into the next.

```
┌─────────────────────────────────────────────────────────────┐
│  1. DATA COLLECTION                                         │
│     • Dataset in .csv format                                │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  2. PREPROCESSING                                           │
│     • Merge all dataset into one                            │
│     • Binary text → 0/1                                     │
│     • Binary Nominal → 0/1                                  │
│     • Nominal categories → integer codes                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  3. FEATURE SELECTION                                       │
│     • Correlation heatmap                                   │
│     • Bar chart of correlation with G3                      │
│     • Select key attributes                                 │
│     • Exclude Noise attributes                              │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  4. CLUSTERING PREPARATION                                  │
│     • Standardize all features (mean=0, sd=1)               │
│     • Elbow method + Silhouette method                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  5. K-MEANS CLUSTERING  (Baseline — M2)                     │
│     • Avg silhouette                                        │
|           -Close to 1 means cluster are well separated      |
|           -Close to 0 means overlaping data                 |
|           -Close to -1 means poor clustering                |
│     • check for 3 profiles:                                 |
|            Steady Achievers · Middle Ground · At-Risk       │
└───────────────────────────┬─────────────────────────────────┘
                            │
                 (M3 Analysis Progress)
          ┌─────────────────┼─────────────────┐
          │                 │                 │
┌─────────▼──────┐ ┌────────▼───────┐ ┌──────▼──────────────┐
│  6. PCA        │ │  7. DBSCAN     │ │  8. HIERARCHICAL    │
│  Dim. Reduction│ │  Density-based │ │  CLUSTERING         │
│                │ │  Validation    │ │  Agglomerative      │
│  • Re-run      │ │                │ │  Validation         │
│    K-Means     │ │ • Confirms     │ │                     │
│   on PCA space │ │   gradual      │ │   • Dendogram,      │
│   → improved   │ │   boundaries   │ │    → orginize data  │
│   silhouette   │ │                │ │  into nested groups │
└─────────┬──────┘ └────────┬───────┘ └──────┬──────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  9. DECISION TREE  (Interpretability)                       │
│     • Cluster labels used as target variable                │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  10. LOF ANOMALY DETECTION                                  │
│      • Find an Local Outlier Factor                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  11. FINDINGS & INTERPRETATION  (M4 Final Report)           │
│      • Answer the 3 original discovery questions            │
│      • Cross-method validation and silhouette comparison    │
│      • Critical assessment, limitations, ethical review     │
└─────────────────────────────────────────────────────────────┘
```

---

## Dataset

Cortez, P. and Silva, A. (2008). *Using Data Mining to Predict Secondary School Student Performance.* University of Minho, Portugal.  
Available at the UCI Machine Learning Repository:  
https://archive-beta.ics.uci.edu/dataset/320/student+performance

---

## Technologies

- **Language:** R
- **Packages:** tidyverse, cluster, factoextra, corrplot, rpart, rpart.plot, dbscan, kableExtra
- **IDE:** Positron (recommended)
