/*
 WEST IRELAND: PPSI (Pulse Pollution Susceptibility Index)
 When heavy rain hits farmland: Mapping susceptibility to agricultural pollution pulses in western
 Ireland

 This script implements a Pulse Pollution Sesceptibility Index (PPSI) based on a 500-m screening model. 
 The Idea is to map possible Susceptibility of Agricultural Pollution through induced precipitation
 in Western Ireland Catchments. The casestudy focus on the Question: Does the same rainfall create
 the same pollution everywhere? 
 
 We create a continious PPSI-Map as well as relative quantil classes for identifying Hotspots for 
 future focus on specific catchments (HydroBASINS).

 Important!:
 PPSI describes relative spatial susceptibility, not measured pollution. It is built on a 2015-2025
 CLIMATOLOGICAL rainfall metric (mean annual Rx1day), so it answers WHERE susceptibility concentrates 
 across the landscape. It does NOT forecast WHEN an actual pollution-pulse event will occur. 
 
 The Idea for the Index is based on Milevski et al. 2025 approach of creating a Flash Flood Potential Index 
 (FFPI). Milevski, I., Aleksova, B., Valjarević, A., & Gorsevski, P. (2025). Cloud-Based Assessment of Flash
 Flood Susceptibility, Peak Runoff, and Peak Discharge on a National Scale with Google Earth Engine 
 (GEE). Atmosphere, 16(8), 945. https://doi.org/10.3390/atmos16080945
 
 This study is part of the course: MNF-Geogr-304: Große Exkursion UGM - Irland (EX) (060814)
 under Dr. John Rapaglia

 Author: Justin Lingg-Laham 12.09.2026
*/

// Defining the ROI (Our Route through Ireland: Western Ireland (LineString created in geojson.io))

var geometry = ee.Geometry.LineString(
  [
    [-8.707596093618253, 54.69504133725021],
         [-8.476883202993253, 54.68869153101796],
         [-8.268142968618253, 54.68551625529339],
         [-8.114334374868253, 54.68869153101796],
         [-8.009964257680753, 54.66328236896049],
         [-8.086868554555753, 54.609235090108385],
         [-8.125320702993253, 54.56148664015033],
         [-8.141800195180753, 54.516870915594936],
         [-8.262649804555753, 54.46582177177102],
         [-8.388992577993253, 54.417905288847244],
         [-8.526321679555753, 54.37633231278173],
         [-8.476883202993253, 54.33471719713284],
         [-8.443924218618253, 54.30908694108779],
         [-8.476883202993253, 54.25777851160667],
         [-8.487869531118253, 54.20319326501108],
         [-8.553787499868253, 54.16461903086806],
         [-8.630691796743253, 54.12922769599911],
         [-8.740555077993253, 54.064802284864214],
         [-8.751541406118253, 54.00350542690506],
         [-8.844925195180753, 53.94858424094023],
         [-9.042679101430753, 53.90006423256412],
         [-9.201980859243253, 53.88711603759011],
         [-9.339309960805753, 53.82879950215764],
         [-9.487625390493253, 53.79636630163851],
         [-9.548050195180753, 53.73792328032286],
         [-9.570022851430753, 53.65987265266892],
         [-9.618185229617223, 53.62774999268567],
         [-9.640157885867223, 53.62489949160333],
         [-9.652517505007848, 53.61879062664087],
         [-9.664533801394567, 53.61125514214636],
         [-9.68169993908988, 53.60269971897386],
         [-9.718778796511755, 53.586806477323314],
         [-9.75585765393363, 53.59251243143044],
         [-9.773023791628942, 53.577430737194064],
         [-9.85461326417313, 53.554349315753434],
         [-9.97820945557938, 53.55108592086645],
         [-9.98095603761063, 53.53313274994464],
         [-9.97820945557938, 53.47759298092497],
         [-9.88757224854813, 53.46941922930883],
         [-9.78320213136063, 53.45797333205272],
         [-9.58544822511063, 53.446524348631264],
         [-9.47283836182938, 53.44161669661324],
         [-9.32726951417313, 53.41870682377983],
         [-9.26959129151688, 53.390871089281724],
         [-9.20092674073563, 53.33186469305063],
         [-9.11303611573563, 53.28427232480245],
         [-9.03613181886063, 53.29248169067934],
         [-8.95922752198563, 53.2957649953746],
         [-8.90978904542313, 53.28427232480245],
         [-8.88232322511063, 53.24155819073669],
         [-8.8666100902625, 53.20183486981542],
         [-8.90231565666875, 53.14091934371496],
         [-9.08359007073125, 53.10960478361197],
         [-9.18246702385625, 53.0848666439744],
         [-9.34176878166875, 53.048558304747374],
         [-9.12204221916875, 52.99403839279506],
         [-8.95175413323125, 52.947725029763475],
         [-8.78146604729375, 52.83172440490026],
         [-8.57272581291875, 52.73870029419625],
         [-8.47934202385625, 52.66213880029111],
         [-8.77597288323125, 52.55873463672198],
         [-8.867380985536615, 52.54402462858282],
         [-8.977244266786615, 52.49388586885661],
         [-9.065134891786615, 52.41019407251741],
         [-9.202463993349115, 52.390084371496954],
         [-9.328806766786615, 52.400140367656235],
         [-9.383738407411615, 52.333057102946725],
         [-9.441416630067865, 52.28267778715877],
         [-9.554026493349115, 52.26251000598622],
         [-9.707835087099115, 52.23392327349979],
         [-9.839671024599115, 52.198584816780446],
         [-10.020945438661615, 52.175010224027304],
         [-10.295603641786615, 52.185115151424505],
         [-10.279124149599115, 52.15816357607438],
         [-10.108836063661615, 52.144681665098226],
         [-9.814951786317865, 52.185115151424505],
         [-9.617197880067865, 52.17837878825889],
         [-9.612838189637818, 52.13316456669154],
         [-9.645797174012818, 52.01161218082403],
         [-9.607345025575318, 51.960867653482175],
         [-9.750167291200318, 51.9168425466295],
         [-9.574386041200318, 51.8897286965014],
         [-9.656783502137818, 51.75391385336296],
         [-9.459029595887818, 51.767513764897835],
         [-9.321700494325318, 51.665414551513706],
         [-9.431563775575318, 51.57332809624605],
         [-9.272262017762818, 51.49473664068682],
         [-9.101973931825318, 51.580155724019356],
         [-8.821822564637818, 51.62792040377374],
         [-8.437301080262818, 51.79470129986361],
         [-8.459273736512818, 51.89989830819527],
         [-8.234054009950318, 51.933780392883676],
         [-8.558150689637818, 51.95748264055144],
         [-8.607589166200318, 51.8897286965014],
         [-8.525191705262818, 51.85581336619616]
  ],
  null,
  true
);
    

// 1. Settings (For adjusting the Modells parameters easily)
var startDate = "2015-01-01";
var endDate = "2026-01-01"; 
var firstYear = 2015;
var lastYear = 2025;

var targetCrs = "EPSG:2157";
var targetScale = 500;  // 500 m Modell Grid (adjust for higher resolution)

// setDefaultProjection defines the grid without forcing one huge computation.
var targetProjection = ee.Projection(targetCrs)
  .atScale(targetScale);
var catchmentBufferM = 5000;  // Buffer around the Linestring to define our analyzing catchments

// Rainfall-pulse settings
var heavyRainThresholdMm = 20;  //For identifying Heavy rainfall Frequency

// Agricultural source settings
var grassProbabilityThreshold = 0.32; //Using for Global pasture Watch
var minimumSourceFraction = 0.05;

// Hydrological connectivity settings
var streamThresholdKm2 = 1;
var streamSearchDistanceM = 5000;
var fullConnectivityDistanceM = 2000;

// Mobilization: rainfall-pulse climate + soil runoff propensity (Weighting cause Precipitation is triggering the Mobilization = 60%)
var wMobilizationRain = 0.60;
var wMobilizationSoil = 0.40;

// Connectivity: slope + proximity to streams + low HAND (Milevski et al. 2025)
var wConnectivitySlope = 0.15;
var wConnectivityStream = 0.45;
var wConnectivityHand = 0.40;

// Equal weights for the three main components (Geometric Mean)
var wSourceMain = 1 / 3;
var wMobilizationMain = 1 / 3;
var wConnectivityMain = 1 / 3;

var exportFolder = "GEE_PPSI_Ireland_v4_500m";


// 2. Study area and Catchments (Based on HydroBASINS and our route Through Western Ireland)

var studyGeometry = ee.FeatureCollection([
  ee.Feature(geometry, {name: "Study geometry"})
]);

var hydroBasins = ee.FeatureCollection(
  "WWF/HydroSHEDS/v1/Basins/hybas_9"
);

var searchArea = studyGeometry.geometry().buffer(catchmentBufferM);

var catchments = hydroBasins.filterBounds(searchArea);
var analysisArea = catchments.geometry();

Map.centerObject(catchments, 7);


// 3. Helper Functions 

// Creating a Normalization for different Parameters (Datasets) to calculate with them.
function normalizeFixed(image, lower, upper, outputName) {
  return image
    .subtract(lower)
    .divide(ee.Number(upper).subtract(lower))
    .clamp(0, 1)
    .rename(outputName);
} 


/*
Positive regional normalization of rainfall variables:

Each rainfall value is divided by the regional 95th percentile and then limited to the range 0–1:

normalized value = min(value / regional p95, 1)

A physical value of zero therefore remains zero. The regional 95th percentile is used as a robust
upper reference and receives a normalized value of 1. All values above p95 are also set to 1.

Unlike p5–p95 normalization, this method does not convert positive but regionally low rainfall 
values to zero. This avoids artificial zero-valued areas that could suppress mobilization and the
PPSI through the geometric model structure.

The method preserves differences below p95, but does not distinguish between values within the 
highest 5% of the regional distribution.*/
function normalizeRegional(image, inputBand, outputName) {

  var singleBand = image.select([inputBand]);
  var statistics = singleBand.reduceRegion({
    reducer: ee.Reducer.percentile([95]),
    geometry: analysisArea,
    crs: targetCrs,
    scale: targetScale,
    maxPixels: 1e10,
    tileScale: 16
  });
  var upper = ee.Number(
    statistics.values().get(0)
  ).max(0.000001);
  return singleBand
    .max(0)
    .divide(upper)
    .clamp(0, 1)
    .rename(outputName);
}


/*
Aggregation of fine-resolution input data to the common 500-m grid:

The native high-resolution pixels are averaged within each 500-m target cell using reduceResolution 
with a mean reducer. This producesone representative value for every cell of the common analysis
grid.

The input image is not clipped before reduceResolution and reprojection. Clipping too early could
force Earth Engine to calculate a large intermediate raster for the complete study area and increase 
processing requirements.

GEE applies the specified aggregation when the image is requested in the target projection. The
final grid is defined by the selected CRS and 500-m scale during subsequent reducers and exports.

This aggregation harmonizes the spatial resolution of the input layers but it does not create additional spatial detail.
*/
function aggregateMeanToGrid(image, outputName) {
  return image
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort: true,
      maxPixels: 4096
    })
    .setDefaultProjection(targetProjection)
    .rename(outputName)
    .clip(analysisArea);
}

function geometricThree(
  source,
  mobilization,
  connectivity,
  sourceWeight,
  mobilizationWeight,
  connectivityWeight,
  outputName
) {
  return source
    .pow(sourceWeight)
    .multiply(mobilization.pow(mobilizationWeight))
    .multiply(connectivity.pow(connectivityWeight))
    .clamp(0, 1)
    .rename(outputName)
    .clip(analysisArea);
}


// 4. Land Mask and Agricultural Source Presence (PPSI: Parameter 1)

var worldCover = ee.ImageCollection("ESA/WorldCover/v200")
  .first()
  .select("Map");

// Land fraction in each 500-m cell.
// WorldCover class 80 = permanent water.
var landFraction = aggregateMeanToGrid(
  worldCover.neq(80).toFloat(),
  "land_fraction"
);

var landMask = landFraction.gte(0.50);

// WorldCover class 40 = cropland.
var croplandBinary = worldCover
  .eq(40)
  .toFloat()
  .rename("cropland_binary");

var croplandFraction = aggregateMeanToGrid(
  croplandBinary,
  "cropland_fraction"
)
  .clamp(0, 1)
  .updateMask(landMask);

// Global Pasture Watch:
// probability of cultivated grassland in 2022.
var grassProbability = ee.ImageCollection(
  "projects/global-pasture-watch/assets/ggc-30m/v1/cultiv-grassland_p"
)
  .filterDate("2022-01-01", "2023-01-01")
  .first()
  .select("probability")
  .divide(100);

// Convert probability into a binary land-cover decision before aggregation.
var cultivatedGrassBinary = grassProbability
  .gte(grassProbabilityThreshold)
  .toFloat()
  .rename("cultivated_grass_binary");

var cultivatedGrassFraction = aggregateMeanToGrid(
  cultivatedGrassBinary,
  "cultivated_grass_fraction"
)
  .clamp(0, 1)
  .updateMask(landMask);

// Use max() to avoid double counting overlapping agricultural datasets.
var sourceTerm = croplandFraction
  .max(cultivatedGrassFraction)
  .clamp(0, 1)
  .rename("agricultural_source_presence_0_1")
  .updateMask(landMask);

// Cells with less than 5% agricultural area are removed from final results.
var sourceGate = sourceTerm.gte(minimumSourceFraction);

// 5. Climatological Rainfall-Pulse Potential (PPSI Parameter 2)

var chirps = ee.ImageCollection("UCSB-CHC/CHIRPS/V3/DAILY_SAT")
  .filterDate(startDate, endDate)
  .filterBounds(analysisArea)
  .select("precipitation");

var years = ee.List.sequence(firstYear, lastYear);

// Maximum daily precipitation in each year.
var annualRx1day = ee.ImageCollection.fromImages(
  years.map(function(year) {
    year = ee.Number(year);

    return chirps
      .filter(ee.Filter.calendarRange(year, year, "year"))
      .max()
      .rename("annual_Rx1day_mm")
      .set("year", year);
  })
);

// Mean of the eleven annual maxima.
var meanAnnualRx1day = annualRx1day
  .mean()
  .rename("mean_annual_Rx1day_mm")
  .resample("bilinear")
  .setDefaultProjection(targetProjection)
  .clip(analysisArea)
  .updateMask(landMask);

var rainfallIntensity = normalizeRegional(
  meanAnnualRx1day,
  "mean_annual_Rx1day_mm",
  "rainfall_intensity_0_1"
);

// Fraction of days with at least 20 mm precipitation.
var heavyRainFrequency = chirps
  .map(function(image) {
    return image
      .gte(heavyRainThresholdMm)
      .toFloat()
      .rename("heavy_rain_day");
  })
  .mean()
  .rename("heavy_rain_frequency")
  .resample("bilinear")
  .setDefaultProjection(targetProjection)
  .clip(analysisArea)
  .updateMask(landMask);

var heavyRainFrequencyNorm = normalizeRegional(
  heavyRainFrequency,
  "heavy_rain_frequency",
  "heavy_rain_frequency_0_1"
);

// Intensity and frequency are combined geometrically.
var rainfallPulsePotential = rainfallIntensity
  .sqrt()
  .multiply(heavyRainFrequencyNorm.sqrt())
  .clamp(0, 1)
  .rename("rainfall_pulse_potential_0_1")
  .updateMask(landMask);

// 6. Soil Runoff Propensity (PPSI Parameter 2)

// OpenLandMap USDA soil texture class at 10-cm depth.
var soilTexture = ee.Image(
  "OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02"
)
  .select("b10");

// Heuristic conversion from soil texture to surface-runoff propensity.
// (Clay-rich soils receive higher values than sandy soils.)
var soilRunoffNative = soilTexture
  .remap(
    [1,    2,    3,    4,    5,    6,
     7,    8,    9,   10,   11,   12],
    [1.00, 0.90, 0.85, 0.80, 0.75, 0.65,
     0.55, 0.55, 0.35, 0.45, 0.20, 0.10]
  )
  .toFloat()
  .rename("soil_runoff_propensity_native");

var soilRunoffPotential = aggregateMeanToGrid(
  soilRunoffNative,
  "soil_runoff_propensity_0_1"
)
  .clamp(0, 1)
  .updateMask(landMask);

// 7. Mobilization Potential ((PPSI Parameter 2))

var mobilizationTerm = rainfallPulsePotential
  .pow(wMobilizationRain)
  .multiply(soilRunoffPotential.pow(wMobilizationSoil))
  .clamp(0, 1)
  .rename("mobilization_potential_0_1")
  .updateMask(landMask);

// 8. Hydrological Connectivity (PPSI Parameter 3)

var merit = ee.Image("MERIT/Hydro/v1_0_1");

var elevationNative = merit.select("elv");
var handNative = merit.select("hnd");
var upstreamAreaNative = merit.select("upa");

// 8.1 Elevation and Slope

// Aggregate elevation before calculating slope.
// Terrain.slope therefore operates on the manageable 500-m grid.
var elevationGrid = elevationNative
  .reduceResolution({
    reducer: ee.Reducer.mean(),
    bestEffort: true,
    maxPixels: 4096
  })
  .setDefaultProjection(targetProjection)
  .rename("elevation_mean_grid_m");

var slopeGrid = ee.Terrain
  .slope(elevationGrid)
  .rename("slope_mean_grid_deg")
  .clip(analysisArea);

var slopeFactor = normalizeFixed(
  slopeGrid,
  0,
  15,
  "slope_factor_0_1"
)
  .updateMask(landMask);

// 8.2 HAND (Height Above Nearest Drainage)

var handGrid = handNative
  .reduceResolution({
    reducer: ee.Reducer.mean(),
    bestEffort: true,
    maxPixels: 4096
  })
  .setDefaultProjection(targetProjection)
  .rename("HAND_mean_grid_m")
  .clip(analysisArea);

var lowHandFactor = ee.Image(1)
  .subtract(
    normalizeFixed(
      handGrid,
      0,
      30,
      "HAND_normalized"
    )
  )
  .clamp(0, 1)
  .rename("low_HAND_0_1")
  .updateMask(landMask);

// 8.3 Stream Network

// Native stream proxy.
var streamsNative = upstreamAreaNative
  .gt(streamThresholdKm2)
  .unmask(0)
  .toByte()
  .rename("stream_proxy_native");

// Preserve a stream when at least one native stream pixel occurs inside a 500-m cell.
var streamsGrid = streamsNative
  .reduceResolution({
    reducer: ee.Reducer.max(),
    bestEffort: true,
    maxPixels: 1024
  })
  .setDefaultProjection(targetProjection)
  .unmask(0)
  .toByte()
  .rename("stream_proxy_500m");

// 8.4 Fast Distance Transform

// 5000 m / 500 m = search radius of 10 grid cells.
var streamSearchPixels = Math.ceil(
  streamSearchDistanceM / targetScale
);

// fastDistanceTransform returns squared pixel distances.
// sqrt() converts them to pixels. Multiplication converts them to metres.
var distanceToStream = streamsGrid
  .fastDistanceTransform(
    streamSearchPixels,
    "pixels",
    "squared_euclidean"
  )
  .sqrt()
  .multiply(targetScale)
  .clamp(0, streamSearchDistanceM)
  .rename("distance_to_stream_m")
  .clip(analysisArea);

var streamProximity = ee.Image(1)
  .subtract(
    distanceToStream.divide(fullConnectivityDistanceM)
  )
  .clamp(0, 1)
  .rename("stream_proximity_0_1")
  .updateMask(landMask);


// 8.5 Combination for Hydrological Connectivity

var connectivityTerm = slopeFactor
  .multiply(wConnectivitySlope)
  .add(streamProximity.multiply(wConnectivityStream))
  .add(lowHandFactor.multiply(wConnectivityHand))
  .clamp(0, 1)
  .rename("hydrological_connectivity_0_1")
  .setDefaultProjection(targetProjection)
  .updateMask(landMask);

// 8.6 Print some security Checks

print(
  "CHECK: slope grid scale; expected approximately 500 m",
  slopeGrid.projection().nominalScale()
);

print(
  "CHECK: stream-distance grid scale; expected approximately 500 m",
  distanceToStream.projection().nominalScale()
);


// Optional diagnostic layers
Map.addLayer(
  streamsGrid.selfMask().clip(analysisArea),
  {palette: ["2166ac"]}, "Stream proxy 500 m",false);

Map.addLayer(
  slopeGrid, {min: 0, max: 15, palette: ["f7fcf5", "74c476", "00441b"]}, "Mean slope 500 m", false);

Map.addLayer(distanceToStream, {min: 0, max: streamSearchDistanceM, palette: ["08306b", "6baed6", "f7fbff"]  },
  "Distance to stream 500 m", false);


// 9. PPSI Model and Sensitivity variants

// Main model: equal weights for Source, Mobilization and Connectivity. (geometric Mean)
// Geometric combination prevents one strong component from completely compensating for a missing component.
var ppsiBase = geometricThree(
  sourceTerm,
  mobilizationTerm,
  connectivityTerm,
  wSourceMain,
  wMobilizationMain,
  wConnectivityMain,
  "PPSI_P_base_geometric"
);

// Additive structural comparison (Sensitivity)
// sourceGate prevents non-agricultural cells from receiving a positive PPSI.
var ppsiAdditive = sourceTerm
  .multiply(1 / 3)
  .add(mobilizationTerm.multiply(1 / 3))
  .add(connectivityTerm.multiply(1 / 3))
  .multiply(sourceGate)
  .clamp(0, 1)
  .rename("PPSI_P_additive_sensitivity")
  .updateMask(landMask);

// Source 50% (Sensitivity)
var ppsiSourceHeavy = geometricThree(
  sourceTerm,
  mobilizationTerm,
  connectivityTerm,
  0.50,
  0.25,
  0.25,
  "PPSI_P_source_heavy"
);

// Mobilization 50% (Sensitivity)
var ppsiMobilizationHeavy = geometricThree(
  sourceTerm,
  mobilizationTerm,
  connectivityTerm,
  0.25,
  0.50,
  0.25,
  "PPSI_P_mobilization_heavy"
);

// Connectivity 50% (Sensitivity)
var ppsiConnectivityHeavy = geometricThree(
  sourceTerm,
  mobilizationTerm,
  connectivityTerm,
  0.25,
  0.25,
  0.50,
  "PPSI_P_connectivity_heavy"
);

// Display only cells with at least 5% agricultural source presence.
var ppsiRelevant = ppsiBase
  .updateMask(sourceGate)
  .rename("PPSI_P_agriculture_relevant");


// 10. Relative Quantil Classes (For the Hotspot analysis)

var classStatistics = ppsiRelevant.reduceRegion({
  reducer: ee.Reducer.percentile([20, 40, 60, 80]),
  geometry: analysisArea,
  crs: targetCrs,
  scale: targetScale,
  maxPixels: 1e10,
  tileScale: 16
});

var q20 = ee.Number(
  classStatistics.get("PPSI_P_agriculture_relevant_p20")
);

var q40 = ee.Number(
  classStatistics.get("PPSI_P_agriculture_relevant_p40")
);

var q60 = ee.Number(
  classStatistics.get("PPSI_P_agriculture_relevant_p60")
);

var q80 = ee.Number(
  classStatistics.get("PPSI_P_agriculture_relevant_p80")
);

var ppsiClass = ee.Image(1)
  .where(ppsiRelevant.gte(q20), 2)
  .where(ppsiRelevant.gte(q40), 3)
  .where(ppsiRelevant.gte(q60), 4)
  .where(ppsiRelevant.gte(q80), 5)
  .updateMask(ppsiRelevant.mask())
  .rename("PPSI_P_relative_quintile")
  .toInt8();

// Percentage of land in the upper two regional quintiles.
var highAreaPercent = ppsiClass
  .gte(4)
  .unmask(0)
  .multiply(100)
  .updateMask(landMask)
  .rename("high_very_high_land_percent");

// 11. Catchments results (For statistical analysis and Export as CSV)

var resultStack = ee.Image.cat([
  ppsiBase,
  ppsiAdditive,
  ppsiSourceHeavy,
  ppsiMobilizationHeavy,
  ppsiConnectivityHeavy,
  sourceTerm,
  mobilizationTerm,
  connectivityTerm,
  rainfallPulsePotential,
  rainfallIntensity,
  heavyRainFrequencyNorm,
  soilRunoffPotential,
  croplandFraction,
  cultivatedGrassFraction,
  highAreaPercent,
  meanAnnualRx1day,
  heavyRainFrequency,
  slopeGrid,
  distanceToStream,
  handGrid
]);

var catchmentStatistics = resultStack.reduceRegions({
  collection: catchments,
  reducer: ee.Reducer.mean(),
  crs: targetCrs,
  scale: targetScale,
  tileScale: 16
});

var catchmentRanking = catchmentStatistics.sort(
  "PPSI_P_base_geometric",
  false
);

var exportProperties = [
  "HYBAS_ID",
  "SUB_AREA",
  "PPSI_P_base_geometric",
  "PPSI_P_additive_sensitivity",
  "PPSI_P_source_heavy",
  "PPSI_P_mobilization_heavy",
  "PPSI_P_connectivity_heavy",
  "agricultural_source_presence_0_1",
  "mobilization_potential_0_1",
  "hydrological_connectivity_0_1",
  "rainfall_pulse_potential_0_1",
  "rainfall_intensity_0_1",
  "heavy_rain_frequency_0_1",
  "soil_runoff_propensity_0_1",
  "cropland_fraction",
  "cultivated_grass_fraction",
  "high_very_high_land_percent",
  "mean_annual_Rx1day_mm",
  "heavy_rain_frequency",
  "slope_mean_grid_deg",
  "distance_to_stream_m",
  "HAND_mean_grid_m"
];

var compactCatchmentResults = catchmentRanking.select(
  exportProperties
);

// 12. Security Checks


print("Check: CHIRPS images; expected 4018", chirps.size());

print("Check: catchments; previous study expected 76", catchments.size());

print("Check: mobilization weights; expected 1",  wMobilizationRain + wMobilizationSoil);

print("CHECK: connectivity weights; expected 1", wConnectivitySlope + wConnectivityStream + wConnectivityHand);

print("CHECK: main PPSI weights; expected 1", wSourceMain + wMobilizationMain + wConnectivityMain);

print("Relative PPSI-P quintile thresholds", classStatistics);

print("Top 5 catchments - new 500-m base model", compactCatchmentResults.limit(5));

// 13. Visualization of Map layers (not so important)

var sequentialPalette = ["f7f4eb","d9e6c3", "f2d487", "dd8a4b", "a8323e"];

Map.addLayer(sourceTerm,{min: 0,max: 1, palette: ["ffffff", "b8dca5", "277a3e"]},"1 Source presence",  false);

Map.addLayer(rainfallPulsePotential,{ min: 0,max: 1,palette: ["fff7ec", "7fcdbb", "2c7fb8", "253494"]},
  "Rainfall-pulse climate",false);

Map.addLayer(soilRunoffPotential,{min: 0,max: 1,
    palette: ["f7fcf5", "74c476", "00441b"]},"Soil runoff propensity",false);

Map.addLayer(mobilizationTerm,{min: 0,max: 1,
    palette: ["fff7ec", "fdbb84", "e34a33", "7f0000"]}, "2 Mobilization potential", false);

Map.addLayer(connectivityTerm,{min: 0,max: 1,
    palette: ["f7fbff", "6baed6", "08306b"]}, "3 Hydrological connectivity",false);

Map.addLayer(ppsiRelevant,  {min: 0,max: 1, palette: sequentialPalette},"PPSI-P continuous",false);

Map.addLayer(ppsiClass,{min: 1, max: 5, palette: sequentialPalette},"PPSI-P relative quintiles",  true);

Map.addLayer(catchments.style({color: "333333",fillColor: "00000000", width: 1}), {}, "Catchment outlines", true);

// 14. Exports

var exportRegion = analysisArea.bounds(100);

// CSV for R ranking and robustness analysis.
Export.table.toDrive({
  collection: compactCatchmentResults,
  description: "WestIreland_PPSI_P_v4_statistics_500m",
  folder: exportFolder,
  fileFormat: "CSV"
});

var qgisCatchmentResults = compactCatchmentResults.map(
  function(feature) {
    var simplifiedGeometry = feature
      .geometry()
      .simplify(100);

    return ee.Feature(simplifiedGeometry)
      .copyProperties(feature, exportProperties);
  }
);

// Catchment polygons including all PPSI statistics for QGIS.
Export.table.toDrive({
  collection: qgisCatchmentResults,
  description: "WestIreland_PPSI_P_v4_catchments_500m",
  folder: exportFolder,
  fileFormat: "GeoJSON"
});

// 15. Story and History export (History is only important for my Presentation and to export intermediate steps )

// Band  1–7:  Result-Layer
// Band  8–22: All intermediate layers

var exportFolder =
  "GEE_PPSI_Ireland_v4_story_500m";

var exportMask = landMask;

function prepareExportLayer(image, bandName) {
  return image
    .updateMask(exportMask)
    .rename(bandName);
}

// PPSI for my presentation
var ppsiContinuousForStory = ppsiBase
  .where(sourceGate.not(), 0)
  .updateMask(exportMask)
  .rename("ppsi_continuous");

var ppsiQuintileForStory = ppsiClass
  .unmask(0)
  .updateMask(exportMask)
  .rename("ppsi_quintile")
  .toFloat();

var heavyRainDaysPerYear = heavyRainFrequency
  .multiply(365.25)
  .rename("heavy_rain_days_per_year")
  .updateMask(exportMask);

var soilTextureGrid = soilTexture
  .reduceResolution({
    reducer: ee.Reducer.mode(),
    bestEffort: true,
    maxPixels: 4096
  })
  .setDefaultProjection(targetProjection)
  .rename("soil_texture_usda_class")
  .clip(analysisArea)
  .updateMask(exportMask);

var combinedExportStack = ee.Image.cat([
  prepareExportLayer(
    sourceTerm,
    "source_presence"
  ),
  prepareExportLayer(
    rainfallPulsePotential,
    "rainfall_pulse"
  ),
  prepareExportLayer(
    soilRunoffPotential,
    "soil_runoff"
  ),
  prepareExportLayer(
    mobilizationTerm,
    "mobilization"
  ),
  prepareExportLayer(
    connectivityTerm,
    "connectivity"
  ),
  ppsiContinuousForStory,
  ppsiQuintileForStory,

// Bands: 8-22
  prepareExportLayer(
    croplandFraction,
    "cropland_fraction"
  ),
  prepareExportLayer(
    cultivatedGrassFraction,
    "cultivated_grass_fraction"
  ),
  prepareExportLayer(
    meanAnnualRx1day,
    "mean_annual_rx1day_mm"
  ),
  prepareExportLayer(
    heavyRainDaysPerYear,
    "heavy_rain_days_per_year"
  ),
  prepareExportLayer(
    rainfallIntensity,
    "rainfall_intensity_0_1"
  ),
  prepareExportLayer(
    heavyRainFrequencyNorm,
    "heavy_rain_frequency_0_1"
  ),
  prepareExportLayer(
    soilTextureGrid,
    "soil_texture_usda_class"
  ),
  prepareExportLayer(
    elevationGrid,
    "elevation_mean_m"
  ),
  prepareExportLayer(
    slopeGrid,
    "slope_deg"
  ),
  prepareExportLayer(
    handGrid,
    "hand_m"
  ),
  prepareExportLayer(
    streamsGrid,
    "stream_proxy_500m"
  ),
  prepareExportLayer(
    distanceToStream,
    "distance_to_stream_m"
  ),
  prepareExportLayer(
    slopeFactor,
    "slope_factor_0_1"
  ),
  prepareExportLayer(
    streamProximity,
    "stream_proximity_0_1"
  ),
  prepareExportLayer(
    lowHandFactor,
    "low_hand_factor_0_1"
  )
])
  .toFloat()
  .clip(analysisArea);

// controll
print(
  "Combined export band names",
  combinedExportStack.bandNames()
);

print(
  "Combined export number of bands; expected 22",
  combinedExportStack.bandNames().size()
);


// four exporttiles (otherwise its too much data for GEE)


var exportTiles = {
  NW: ee.Geometry.Rectangle(
    [-11.50, 53.25, -8.75, 56.00],
    null,
    false
  ),

  NE: ee.Geometry.Rectangle(
    [-8.75, 53.25, -5.50, 56.00],
    null,
    false
  ),

  SW: ee.Geometry.Rectangle(
    [-11.50, 50.50, -8.75, 53.25],
    null,
    false
  ),

  SE: ee.Geometry.Rectangle(
    [-8.75, 50.50, -5.50, 53.25],
    null,
    false
  )
};

var exportTileFeatures = ee.FeatureCollection(
  Object.keys(exportTiles).map(function(tileCode) {

    return ee.Feature(
      exportTiles[tileCode],
      {tile: tileCode}
    );
  })
);

Map.addLayer(
  exportTileFeatures.style({
    color: "7b3294",
    fillColor: "00000000",
    width: 2
  }),
  {},
  "Combined export tiles",
  false
);


Object.keys(exportTiles).forEach(function(tileCode) {

  var exportName =
    "WestIreland_PPSI_P_v4_story_" +
    tileCode +
    "_500m";

  Export.image.toDrive({

    image: combinedExportStack.clip(
      exportTiles[tileCode]
    ),

    description: exportName,

    fileNamePrefix: exportName,

    folder: exportFolder,

    region: exportTiles[tileCode],

    crs: targetCrs,

    scale: targetScale,

    maxPixels: 1e10,

    shardSize: 128,

    fileDimensions: 2048,

    skipEmptyTiles: true,

    fileFormat: "GeoTIFF"
  });
});
