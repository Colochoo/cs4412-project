# CS 4412 Data Mining Project — Student Performance Pattern Mining

**Author:** Cesar Arevalo Colocho  
**Email:** careval3@students.kennesaw.edu\
**Course:** CS 4412 – Data Mining – Section W01, Kennesaw State University  
**Semester:** Spring 2026

## Project Overview
This project applies data mining techniques to the UCI Student Performance Dataset

The project emphasizes **pattern discovery and behavioral segmentation** rather than predictive modeling.

### <ins>Project Structure</ins>

```
cs4412-project/
├── data/                          # Data Folder
│   ├── student-mat.csv            # Math course student data
│   ├── student-por.csv            # Portuguese course student data
│   └── student.txt                # Description of all attributes
│
├── notebooks/                     # Code Folder
│   ├── M2_Analysis.Rmd            # M2: Initial implementation (K-Means baseline)
│   └── M3_Analysis.Rmd            # M3: Complete implementation (all techniques)
│
├── docs/                          # Summary Docs Folder
│   ├── Proposal.pdf               # M1: Proposal document
│   ├── M2_Analysis_Document.pdf   # M2: Summary of Initial Analysis
│   └── M3_Analysis_Document.pdf   # M3: Summary of Complete Analysis
│
├── outputs/                       # Code Output clean PDF Folder
│   ├── M2_Analysis.pdf            # M2: Knitted notebook output
│   └── M3_Analysis.pdf            # M3: Knitted notebook output
│
└── README.md
```

### <ins>**[IMPORTANT]** - Prerequisites Before Opening Any Files</ins>

#### **1. Install R (Required)**  
R must be installed on your operating system as a system-level component before opening any `.Rmd` files. Without R installed, the notebooks will not run.

- **Download R:** [https://cran.r-project.org/](https://cran.r-project.org/)
- Choose your operating system (Windows, macOS, or Linux) and follow the installer instructions
- Verify installation by opening a terminal/command prompt and typing: `R --version`

#### **2. Install an IDE (Recommended: Positron)**
While any R-compatible IDE will work, **Positron** is the recommended IDE for this project.

- **Download Positron:** [https://positron.posit.co/download.html](https://positron.posit.co/download.html)

Other compatible IDEs include RStudio ([https://posit.co/download/rstudio-desktop/](https://posit.co/download/rstudio-desktop/)) or VS Code with the R extension.

#### **3. Install Required R Package**
After installing R and your IDE, open the IDE's **R Console** and run the following command to install all required packages:

```r
install.packages(c(
  "tidyverse",    # Data manipulation (dplyr, ggplot2, tidyr, etc.)
  "cluster",      # Silhouette analysis for cluster evaluation
  "factoextra",   # Cluster and PCA visualization helpers
  "corrplot",     # Correlation heatmap visualization
  "rpart",        # Decision tree classification
  "rpart.plot",   # Decision tree plotting
  "dbscan"        # DBSCAN clustering and LOF anomaly detection
))
```
**Step-by-step:**

1. Open Positron (or your chosen IDE)
2. Locate the **Console** panel
3. Make sure the console says `R` (not Python or Terminal)
4. Copy and paste the `install.packages(...)` command above into the console
5. Press **Enter** and wait for all packages to download and install
6. If prompted to select a CRAN mirror, choose one close to your location
7. Installation is complete when you see the `>` prompt again with no error messages

If no errors appear, you are ready to open and knit the notebooks.

<br>
<br>

---
# Milestones

<br>

## M1 - PROPOSAL
### <ins>**Brief Description**</ins>
The Student Performance dataset contains
demographic, academic, social, and lifestyle information
about secondary school students enrolled in two distinct
subjects: Mathematics and Portuguese language. The data
was collected from two Portuguese schools and captures
a wide range of factors including family background,
study habits, school engagement, alcohol consumption, and
academic outcomes. Academic performance is represented
through three grade attributes rather than a single target label,
making the dataset suitable for exploratory pattern discovery

### Dataset Source link
Cortez, P. and Silva, A. (2008). *Using Data Mining to Predict Secondary School Student Performance.* University of Minho, Portugal.\
Available at the UCI Machine Learning Repository:\
https://archive-beta.ics.uci.edu/dataset/320/student+performance

### Please review the Proposal PDF for a straightforward synopsis of the project
&emsp;Proposal.pdf Document:\
&emsp;https://github.com/Colochoo/cs4412-project/blob/main/docs/Proposal.pdf

### <ins>Main Goal Objective - Discovery Questions</ins>
Focused on finding pattern discovery using the following questions:

    1.	Do family and socioeconomic attributes form recognizable patterns associated with academic consistency?
    
    2.	How do study habits and absence behavior interact with student performance?
    
    3.	What natural clusters of students emerge when combining academic, demographic, and lifestyle factors?

<br>
<br>

## M2 - INITIAL IMPLEMENTATION
### <ins>**Brief Description**</ins>
The M2 analysis investigates factors affecting student academic performance using a dataset of 1,044 students with 34 variables combining Mathematics and Portuguese records. The study applies data preprocessing, exploratory data analysis, and K-means clustering to identify patterns in grades and student behavior. Results show that previous grades (G1 and G2) are the strongest predictors of the final grade (G3), while variables such as failures, study time, and absences also influence performance. Clustering reveals three general groups of students representing high, average, and lower academic performance. Overall, the analysis suggests that early academic results and study-related behaviors are key indicators of final outcomes.

**Key findings:**
- Exploratory data analysis and preprocessing
- Correlation analysis
- K-Means clustering (k=3, silhouette ≈ 0.19)
- Three student profiles identified: higher-performing, moderate, and at-risk

### <ins>How to Run or Open M2_Analysis.Rmd Report</ins>
&emsp;1. [IMPORTANT] Make sure R and all required packages are installed:\
&emsp;&emsp;* *(see **Prerequisites** above)*

&emsp;2. Clone this repository:\
&emsp;&emsp;`git clone https://github.com/Colochoo/cs4412-project.git`

&emsp;3. Open the folder of the cloned repository in Positron or your IDE

&emsp;4. Open `notebooks/M2_Analysis.Rmd`\
&emsp;&emsp;* *(see **File in GitHub**)* --> [M2_Analysis.Rmd](https://github.com/Colochoo/cs4412-project/blob/main/notebooks/M2_Analysis.Rmd)

&emsp;5. Click **Knit** (or **Render**) to run the full analysis — data loads directly from this repository's `data/` folder via GitHub raw URLs


### <ins>Please review the Summary Analysis Document for a brief overview of the M2_Analysis report</ins>
&emsp;AnalysisDocument_M2.pdf Document:\
&emsp;https://github.com/Colochoo/cs4412-project/blob/main/docs/AnalysisDocument_M2.pdf

<br>
<br>

## M3 - COMPLETE IMPLEMENTATION
### <ins>**Brief Description**</ins>
This analysis extends the M2 implementation to complete the full data mining pipeline for the Student Performance project. The main objective of M3 is to ensure the entire process not only runs correctly but also generates meaningful insights about student behavior.

While M2 used K-Means clustering to identify three groups (high-performing, moderate, and at-risk students), it left key questions unanswered, such as whether these groups truly exist, what defines them, and whether some students fall outside these patterns.

To address this, M3 introduces additional techniques: PCA to reduce redundant features, DBSCAN and Hierarchical Clustering to validate cluster structure, Decision Trees to create interpretable rules, and LOF to detect unusual student cases. Together, these methods strengthen the analysis and provide deeper, more reliable insights.

Building on M2, the following techniques were added:

| Technique | Category | Purpose |
|-----------|----------|---------|
| Correlation Heatmap | Feature Selection | Justify variable choices with data |
| PCA | Dimensionality Reduction | Remove G1/G2/G3 redundancy |
| DBSCAN | Density-based Clustering | Validate groups without pre-setting k |
| Hierarchical Clustering | Agglomerative Clustering | Confirm structure via dendrogram |
| Decision Tree | Classification | Explain clusters with readable rules |
| LOF | Anomaly Detection | Flag unusual student profiles |

**Key findings:**
- Three student profiles are robust across multiple methods.
- Failure history is the strongest behavioral risk indicator.
- Family education is significant, but plays as a secondary role.
- Study time and absences have a minimal impact.
- Boundary students exist (low silhouette scores are normal in educational datasets).
- LOF anomalies represent students with mismatched profiles worthy of individual investigation.

### <ins>How to Run or Open M3_Analysis.Rmd Report</ins>
&emsp;1. [IMPORTANT] Make sure R and all required packages are installed:\
&emsp;&emsp;* *(see **Prerequisites** above)*

&emsp;2. Clone this repository:\
&emsp;&emsp;`git clone https://github.com/Colochoo/cs4412-project.git`

&emsp;3. Open the folder of the cloned repository in Positron or your IDE

&emsp;4. Open `notebooks/M3_Analysis.Rmd`\
&emsp;&emsp;* *(see **File in GitHub**)* --> [M3_Analysis.Rmd](https://github.com/Colochoo/cs4412-project/blob/main/notebooks/M3_Analysis.Rmd)

&emsp;5. Click **Knit** (or **Render**) to run the full analysis — data loads directly from this repository's `data/` folder via GitHub raw URLs


### <ins>Please review the Summary Analysis Document for a brief overview of the M3_Analysis report</ins>
&emsp;AnalysisDocument_M3.pdf Document:\
&emsp;https://github.com/Colochoo/cs4412-project/blob/main/docs/AnalysisDocument_M3.pdf

<br>
<br>

## M4 - FINAL POLISH
### **Brief Description**
Coming Soon...


