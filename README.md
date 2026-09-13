# Mapping Agricultural Pulse-Pollution Susceptibility in Western Ireland

This Project develops a workflow for mapping the relative susceptibility of western Irish catchments to agricultural pollution pulses using Google Earth Engine, R and QGIS.

We developed a 500-m Pulse-Pollution Susceptibility Index (PPSI) that combines agricultural source presence, rainfall- and soil-controlled mobilization potential, and hydrological connectivity. The resulting maps identify locations where these three conditions coincide and where pollution pulses following heavy-rainfall events may therefore be more likely. The Idea for the Index is based on Milevski et al. 2025 approach of creating a Flash Flood Potential Index (FFPI). 
The PPSI represents relative spatial susceptibility. It does not measure pollutant concentrations and does not forecast the timing of individual pollution events.

This study is part of the Course: **MNF-Geogr-304: Große Exkursion UGM - Irland (EX) (060814)** SoSe 2026

**Authors:** Justin Lingg-Laham and Jonah van den Bos

## Interactive presentation

The complete animated Quarto presentation is available here:

[Open the interactive PPSI-P presentation](https://geojussl.github.io/Ireland-Field-Trip-Implementing-Pulse-Pollution-Susceptibility-Index-PPSI-/)

The presentation includes animated map transitions that illustrate the construction of the individual PPSI components and the final priority maps.

# Project overview

The aim of this study was to identify areas in western Ireland where agricultural pollution sources, rainfall-driven mobilization and hydrological connectivity occur together.
The analysis follows a source–mobilization–connectivity framework:

$$\mathrm{PPSI\text{-}P} = \sqrt[3]{S \cdot M \cdot C}$$

where:

* \(S\) represents agricultural source presence;
* \(M\) represents the potential for pollutants to be mobilized by rainfall and surface runoff;
* \(C\) represents hydrological connectivity to the drainage network.

The geometric mean ensures that a high PPSI value requires support from all three components. A high value in one component cannot completely compensate for a very low value in another component.
All input layers were harmonized to a common spatial resolution of 500 m and normalized to values between 0 and 1.

# Methods

The workflow consists of four main parts.

## Part 1: Agricultural source presence

1.1 Extract cropland from ESA WorldCover v200
1.2 Identify cultivated grassland using Global Pasture Watch
1.3 Aggregate binary agricultural land-cover data to fractions within each 500-m cell
1.4 Combine cropland and cultivated-grassland fractions using the pixelwise maximum
1.5 Apply a minimum agricultural source threshold of 5%

The use of the maximum prevents areas represented by both datasets from being counted twice.

## Part 2: Mobilization potential

### 2.1 Rainfall-pulse potential

Daily CHIRPS precipitation data from 2015–2025 were used to calculate:

* mean annual maximum daily precipitation intensity;
* mean annual frequency of days with at least 20 mm precipitation.

Both variables were normalized using their regional 95th percentiles and combined geometrically:

$$R = \sqrt{I \cdot F}$$

where \(I\) is normalized rainfall intensity and \(F\) is normalized heavy-rainfall frequency.

### 2.2 Soil-runoff potential

USDA soil-texture classes from OpenLandMap were translated into relative runoff-propensity values. Clay-rich soils were assigned higher runoff potential than sandy soils.

Rainfall-pulse and soil-runoff potential were combined using a weighted geometric mean:

$$M = R^{0.60} \cdot B^{0.40}$$

where \(R\) represents rainfall-pulse potential and \(B\) represents soil-runoff potential.

## Part 3: Hydrological connectivity

Hydrological connectivity was derived from MERIT Hydro using:

* slope factor: 15%;
* proximity to the drainage network: 45%;
* low HAND factor: 40%.

HAND stands for Height Above Nearest Drainage and describes the vertical distance of a location above its hydrologically connected drainage channel. Low HAND values indicate terrain that is vertically close to the drainage network and potentially more directly connected to it.

The three connectivity factors were combined using a weighted pixelwise sum.

## Part 4: PPSI calculation and evaluation

4.1 Combine source presence, mobilization and connectivity using an equal-weighted geometric mean
4.2 Produce a continuous PPSI-P raster from 0 to 1
4.3 Derive relative percentile and priority classes
4.4 Aggregate mean PPSI-P values across 76 HydroBASINS Level-9 catchments
4.5 Rank catchments according to their mean PPSI-P
4.6 Test the sensitivity of the ranking to alternative model formulations
4.7 Export maps, figures and summary statistics for QGIS and Quarto

# Sensitivity analysis

The equal-weighted geometric base model was compared with four alternative formulations:

* an additive arithmetic model;
* a source-weighted geometric model;
* a mobilization-weighted geometric model;
* a connectivity-weighted geometric model.

For every model formulation, mean PPSI-P values were calculated separately for all 76 catchments. The resulting catchment rankings were compared with the base-model ranking using Spearman rank correlation and Top-5 overlap.

Spearman correlations ranged from 0.983 to 0.994, while four or five of the five highest-ranked catchments remained in the Top 5 across the alternative models.

These results indicate that the relative catchment priorities are internally robust to the tested modelling assumptions. However, this sensitivity analysis is not an external validation against observed water-quality or pollutant-concentration data.

# Main findings

* Agricultural pollution-pulse susceptibility is spatially heterogeneous across western Ireland.
* High PPSI values occur where agricultural sources coincide with strong mobilization potential and effective hydrological connectivity.
* High-ranking catchments remain largely stable under alternative component weights and aggregation methods.
* The PPSI-P can support spatial screening and the identification of areas for more detailed monitoring.
* The results represent relative susceptibility rather than measured pollution or event-specific forecasts.

# Repository contents

## Google Earth Engine

The `gee` folder contains the complete geospatial processing workflow, including:

* study-area and catchment selection;
* land-cover processing;
* rainfall climatology;
* soil-runoff classification;
* hydrological-connectivity modelling;
* PPSI calculation;
* tiled GeoTIFF and statistical exports.

## R analysis

The `R` folder contains the post-processing and robustness analysis, including:

* raster diagnostics;
* PPSI distributions and thresholds;
* component comparisons;
* catchment-level aggregation;
* sensitivity analysis;
* ranking stability;
* figure and table exports.

## Presentation

The repository contains the Quarto source document, presentation media and the rendered RevealJS presentation. The online version retains fragments, transitions and animated map sequences.

# Data sources

The workflow uses the following geospatial datasets:

* ESA WorldCover 2021: Zanaga, D., Van De Kerchove, R., Daems, D., De Keersmaecker, W., Brockmann, C., Kirches, G., Wevers, J., Cartus, O., Santoro, M., Fritz, S., Lesiv, M., Herold, M., Tsendbazar, N.E., Xu, P., Ramoino, F., Arino, O., 2022. ESA WorldCover 10 m 2021 v200. (doi:10.5281/zenodo.7254221)
  
* Global Pasture Watch: Parente, L., Sloat, L., Mesquita, V., et al. (2024) Global Pasture Watch – Annual grassland class and extent maps at 30-m spatial resolution (2000–2022) (Version v1) [Dataset]. Zenodo doi:https://doi.org/10.5281/zenodo.13890401
  
* CHIRPS Daily Precipitation: Climate Hazards Center Infrared Precipitation with Stations, Version 3 CHIRPS3 Data Repository doi:10.15780/G2JQ0P (2025)
  
* OpenLandMap USDA Soil Texture: Tomislav Hengl. (2018). Soil texture classes (USDA system) for 6 soil depths (0, 10, 30, 60, 100 and 200 cm) at 250 m (Version v02) [Data set]. Zenodo. 10.5281/zenodo.1475451
  
* MERIT Hydro: Yamazaki D., D. Ikeshima, J. Sosa, P.D. Bates, G.H. Allen, T.M. Pavelsky. MERIT Hydro: A high-resolution global hydrography map based on latest topography datasets Water Resources Research, vol.55, pp.5053-5073, 2019, doi:10.1029/2019WR024873
  
* HydroBASINS Level 9: Lehner, B., Grill G. (2013). Global river hydrography and network routing: baseline data and new approaches to study the world’s large river systems. Hydrological Processes, 27(15): 2171–2186. https://doi.org/10.1002/hyp.9740

# Reproducibility

To reproduce the analysis:

1. Run the Google Earth Engine script.
2. Export the four 500-m raster tiles and catchment statistics.
3. Merge the raster tiles into one multiband GeoTIFF.
4. Place the exported data in the directory expected by the R workflow.
5. Run the R/Quarto analysis.
6. Render the presentation using Quarto.

# Limitations

* The PPSI describes relative spatial susceptibility and not observed pollution concentrations.
* Rainfall inputs represent climatological conditions from 2015–2025 rather than individual event forecasts.
* Soil texture was translated into runoff propensity using a heuristic classification.
* All input datasets were harmonized to a 500-m grid, which limits the representation of fine-scale processes.
* Hydrological connectivity is represented through terrain-based proxies rather than explicit flow or water-quality modelling.
* The sensitivity analysis evaluates internal model robustness but does not replace external validation using monitoring data.

# Software

* Google Earth Engine
* R
* QGIS
* Quarto
* RevealJS
* Geojson.io
