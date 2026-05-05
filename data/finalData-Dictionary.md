# <div align="center"> FINAL Data Dictionary — Student Performance Dataset </div>
### <div align="center" style="color:gray"> (For Secondary Schools) </div>

---

## Overview

The purpose of this file is to provide information about all 34 attributes included in the dataset. This dataset is derived from the [reference source](https://archive-beta.ics.uci.edu/dataset/320/student+performance). The main objective of this file is to establish a dataset template that can serve as a foundation for **data pattern mining** on secondary school student performance. This template can be used in future research, or it may also be used by interested individuals who wish to conduct studies using this template.

The template includes the original 33 attributes from the source dataset, along with an additional 34th attribute introduced after merging data from two different course classes. This additional attribute enables users to differentiate between the two course classes, enabling more flexible analysis in future work.

Additionally, the file describes each variable's original format, possible values, and how it was converted to numeric form for analysis.

**Reference Source** **:** Cortez, P. and Silva, A. (2008). *Using Data Mining to Predict Secondary School Student Performance.* University of Minho, Portugal. [UCI Repository](https://archive-beta.ics.uci.edu/dataset/320/student+performance)


---

## Conversion Methods

Three types of conversions were applied during preprocessing:

1. **Binary yes/no &rarr; 1/0:** <br> Variables stored as `"yes"` or `"no"` were converted using `ifelse(x == "yes", 1, 0)`.
<br>

2. **Binary nominal &rarr; 0/1:** <br> Two-category text variables (e.g., sex, address) were mapped to numeric codes with a meaningful direction where possible.
<br>

3. **Multi-category nominal &rarr; Integer codes:** <br> Variables with 3+ text categories (e.g., school, Mjob, Fjob) were converted using `as.numeric(factor(...))`. These codes are **arbitrary** and were **not** used in distance-based algorithms like K-Means.

---

## Attribute Types List

| Type | Meaning |
|---|---|
| **Numeric** | A raw count or continuous measurement where the number itself carries direct meaning. Values have natural magnitude but no implied category boundaries. |
| **Ordinal Numeric** | A numeric variable where each integer represents an ordered category (e.g., low → high). The order is meaningful, but the gap between consecutive values is not necessarily equal. |
| **Binary** | A yes/no variable originally stored as text (`"yes"` / `"no"`). Converted to 1 (yes) or 0 (no). There are only two possible values and no ordering between them. |
| **Binary Nominal** | A two-category text variable where neither category is inherently higher or lower than the other. Mapped to 0/1 with a chosen directional convention (e.g., Rural = 1, Urban = 0). |
| **Nominal** | A multi-category text variable with no inherent order among its categories. Converted to arbitrary integer codes using `as.numeric(factor(...))`. These codes carry **no numeric meaning** and must not be used in distance-based algorithms. |

---

## Current Attribute Table

| # | Attribute | Description |  Type |  Current Values | Conversion Method | Numeric Values |
|--:|-----------|-------------|---------------|-----------------|-------------------|----------------|
| 1 | school | Identifies which school the student attends; used as a demographic grouping variable. | Nominal | GP, MS | `as.numeric(factor(...))` | 1 = GP, <br> 2 = MS <br> (arbitrary order) |
| 2 | sex | Records the student's biological sex; used to analyze performance differences by gender. | Binary Nominal | F, M | `ifelse(sex == "M", 1, 0)` | 1 = Male, <br> 0 = Female |
| 3 | age | Student's age in years; used to examine how maturity correlates with academic performance. | Numeric | 15–22 | None needed | 15–22 |
| 4 | address | Indicates whether the student lives in an urban or rural area; used to assess location-based effects on performance. | Binary Nominal | U (urban), R (rural) | `ifelse(address == "R", 1, 0)` | 1 = Rural, <br> 0 = Urban |
| 5 | famsize | Captures family size category; used to explore how household size relates to student outcomes. | Binary Nominal | LE3 (Less or Equal to 3) &rarr; ≤3, <br> GT3 (Greater Than 3) &rarr; >3 | `ifelse(famsize == "GT3", 1, 0)` | 1 = >3, <br> 0 = \(\le \)3 |
| 6 | Pstatus | Indicates whether the parents live together; used to examine how family setup affects grades. | Binary Nominal | T (together), A (apart) | `ifelse(Pstatus == "T", 1, 0)` | 1 = Together, <br> 0 = Apart |
| 7 | Medu | Mother's education level; used to examine parental education influence on student performance. | Ordinal Numeric | 0–4 | None needed | 0 = none, <br> 1 = primary, <br> 2 = 5th-9th, <br> 3 = secondary, <br> 4 = higher |
| 8 | Fedu | Father's education level; used to examine parental education influence on student performance, similar to Medu. | Ordinal Numeric | 0–4 | None needed | 0 = none, <br> 1 = primary, <br> 2 = 5th-9th, <br> 3 = secondary, <br> 4 = higher |
| 9 | Mjob | Mother's occupation; used to explore socioeconomic background effects on student success. | Nominal (5 cat) | teacher, health, services, at_home, other | `as.numeric(factor(...))` | 1–5 (arbitrary order) |
| 10 | Fjob | Father's occupation; used to explore socioeconomic background effects on student success. | Nominal (5 cat) | teacher, health, services, at_home, other | `as.numeric(factor(...))` | 1–5 (arbitrary order) |
| 11 | reason | Reason for choosing the school; used to understand student motivation and school selection factors. | Nominal (4 cat) | home, reputation, course, other | `as.numeric(factor(...))` | 1–4 (arbitrary order) |
| 12 | guardian | Identifies the student's primary guardian; used to study family support structure and its impact on grades. | Nominal (3 cat) | mother, father, other | `as.numeric(factor(...))` | 1–3 (arbitrary order) |
| 13 | traveltime | Home-to-school travel time; used to assess whether commute length affects academic performance. | Ordinal Numeric | 1–4 | None needed | 1 = <15min, <br> 2 = 15-30min, <br> 3 = 30-60min, <br> 4 = >1hr |
| 14 | studytime | Weekly study time outside school; used as a key predictor of academic achievement. | Ordinal Numeric | 1–4 | None needed | 1 = <2hrs, <br> 2 = 2-5hrs, <br> 3 = 5-10hrs, <br> 4 = >10hrs |
| 15 | failures | Number of past class failures; used as a risk indicator for predicting final grades. | Numeric | 0–4 | None needed | 0 = none, <br> 1–3 = number of past class failures, <br> 4 = \(\ge \)4 past class failures |
| 16 | schoolsup | Whether the student receives extra educational support from school; used to measure intervention impact on grades. | Binary | yes, no | `ifelse(x == "yes", 1, 0)` | 1 = yes, <br> 0 = no |
| 17 | famsup | Whether the student receives educational support at home; used to assess family academic involvement. | Binary | yes, no | `ifelse(x == "yes", 1, 0)` | 1 = yes, <br> 0 = no |
| 18 | paid | Whether the student attends paid extra classes; used to examine the role of private tutoring on performance. | Binary | yes, no | `ifelse(x == "yes", 1, 0)` | 1 = yes, <br> 0 = no |
| 19 | activities | Whether the student participates in extracurricular activities; used to study the balance between activities and academics. | Binary | yes, no | `ifelse(x == "yes", 1, 0)` | 1 = yes, <br> 0 = no |
| 20 | nursery | Whether the student attended nursery school; used to explore early childhood education effects on later performance. | Binary | yes, no | `ifelse(x == "yes", 1, 0)` | 1 = yes, <br> 0 = no |
| 21 | higher | Whether the student aspires to pursue higher education; used as a motivation indicator for academic success. | Binary | yes, no | `ifelse(x == "yes", 1, 0)` | 1 = yes, <br> 0 = no |
| 22 | internet | Whether the student has internet access at home; used to evaluate digital resource availability and its effect on grades. | Binary | yes, no | `ifelse(x == "yes", 1, 0)` | 1 = yes, <br> 0 = no |
| 23 | romantic | Whether the student is in a romantic relationship; used to examine personal life factors affecting academic focus. | Binary | yes, no | `ifelse(x == "yes", 1, 0)` | 1 = yes, <br> 0 = no |
| 24 | famrel | Quality of family relationships; used to assess how the home environment influences student well-being and grades. | Ordinal Numeric | 1–5 | None needed | 1 = Very bad, <br> 2 = Bad, <br> 3 = Neutral, <br> 4 = Good, <br> 5 = Excellent |
| 25 | freetime | Amount of free time after school; used to study how leisure time balance affects academic performance. | Ordinal Numeric | 1–5 | None needed | 1 = Very low, <br> 2 = Low, <br> 3 = Neutral, <br> 4 = High, <br> 5 = Very high |
| 26 | goout | Frequency of going out with friends; used to analyze social behavior's impact on academic outcomes. | Ordinal Numeric | 1–5 | None needed | 1 = Very low, <br> 2 = Low, <br> 3 = Neutral, <br> 4 = High, <br> 5 = Very high |
| 27 | Dalc | Workday alcohol consumption level; used to examine how weekday substance use affects grades. | Ordinal Numeric | 1–5 | None needed | 1 = Very low, <br> 2 = Low, <br> 3 = Neutral, <br> 4 = High, <br> 5 = Very high |
| 28 | Walc | Weekend alcohol consumption level; used alongside Dalc to assess overall alcohol use patterns and their effects. | Ordinal Numeric | 1–5 | None needed | 1 = Very low, <br> 2 = Low, <br> 3 = Neutral, <br> 4 = High, <br> 5 = Very high |
| 29 | health | Student's current health status; used to explore how physical well-being correlates with academic performance. | Ordinal Numeric | 1–5 | None needed | 1 = Very bad, <br> 2 = Bad, <br> 3 = Neutral, <br> 4 = Good, <br> 5 = Excellent |
| 30 | absences | Number of school absences; used to measure student engagement and examine its relationship to final grades. | Numeric | 0–93 | None needed | \(\ge \)0 |
| 31 | G1 | First period grade on a 0–20 scale; used as an early indicator of academic performance. | Numeric | 0–20 | None needed | close to 0 = Scored 0%, <br> close to 20 = Scored 100% |
| 32 | G2 | Second period grade on a 0–20 scale; used as a mid-year performance indicator to track grade progression. | Numeric | 0–20 | None needed | close to 0 = Scored 0%, <br> close to 20 = Scored 100% |
| 33 | G3 | Final grade on a 0–20 scale; serves as the primary target attribute for all comparative modeling. | Numeric | 0–20 | None needed | close to 0 = Scored 0%, <br> close to 20 = Scored 100% |
| 34 | course | Identifies the subject course the student is enrolled in; used to compare performance patterns across subjects. | Nominal | Math, Por | `as.numeric(factor(...))` | 1 = Math, <br> 2 = Portuguese <br> (arbitrary order) |

---

## Important Notes on Nominal Conversions

Attributes converted using `as.numeric(factor(...))` — specifically **school**, **Mjob**, **Fjob**, **reason**, **guardian**, and **course** — receive arbitrary integer codes based on alphabetical ordering of their categories. These codes do **not** represent any meaningful order or distance.

For example, `Mjob` might be encoded as: `at_home = 1, health = 2, other = 3, services = 4, teacher = 5`. The algorithm would interpret "teacher" (5) as being farther from "at_home" (1) than "health" (2), which has no real-world meaning.

**Consequence:** These attributes were **excluded** from distance-based clustering (K-Means, DBSCAN, Hierarchical) to avoid introducing misleading patterns. They were only used in exploratory analysis and visualizations where their categorical nature was preserved.

>**However,** for future analysis or for anyone who wishes to use this template, these attributes can be converted to an ordinal numeric type if needed. This would require manual changes to the dataset, but it can be avoided by defining an ordinal numeric range from the beginning when conducting a survey.
> - See our survey template [here](https://colochoo.github.io/cs4412-project/)

---
## Attribute Changes Made for Future Work Analysis 

| Attribute | Original Type | New Type | Current Values | Rule for New Values <br>(Future work/New research) | Reason for the Change |
|-----------|---------------|-----------------|-------------------|----------------|----------------|
| school | Binary Nominal | Multi-Category Nominal | GP, MS | Use abbreviation for new schools <br> *e.g. Marietta High School = MHS* | To allow data from multiple schools instead of just two, making the dataset more flexible for future analysis |

---
