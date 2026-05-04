# install_packages.R
# CS 4412 Data Mining Project — Student Performance Pattern Mining
# Author: Cesar Arevalo Colocho
#
# Run this script to install all required R packages before opening any .Rmd notebooks.
# Usage: Open an R console and run:
#   source("install_packages.R")

required_packages <- c(
  "tidyverse",    # Data manipulation (dplyr, ggplot2, tidyr, etc.)
  "cluster",      # Silhouette analysis for cluster evaluation
  "factoextra",   # Cluster and PCA visualization helpers
  "corrplot",     # Correlation heatmap visualization
  "rpart",        # Decision tree classification
  "rpart.plot",   # Decision tree plotting
  "dbscan"        # DBSCAN clustering and LOF anomaly detection
)

# Only install packages that are not already installed
missing <- required_packages[!(required_packages %in% installed.packages()[, "Package"])]

if (length(missing) > 0) {
  message("Installing missing packages: ", paste(missing, collapse = ", "))
  install.packages(missing, repos = "https://cloud.r-project.org")
} else {
  message("All required packages are already installed.")
}

# Verify all packages load successfully
message("\nVerifying package loading...")
success <- TRUE
for (pkg in required_packages) {
  if (!requireNamespace(pkg, quietly = TRUE)) {
    message("  FAILED: ", pkg)
    success <- FALSE
  } else {
    message("  OK: ", pkg)
  }
}

# Final message based on verification results
if (success) {
  message("\nAll packages installed and verified. You are ready to run the notebooks.")
} else {
  message("\nSome packages failed to load. Please check the errors above.")
}
