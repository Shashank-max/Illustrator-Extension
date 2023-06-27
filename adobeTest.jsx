// // Check if Adobe Illustrator is running
// if (app.name === "Adobe Illustrator") {
//   // Check if a document is open
//   if (documents.length > 0) {
//     // Get the active document
//     var doc = activeDocument;

//     // Array of available design styles
//     var designStyles = ["Vintage", "Futuristic", "Minimalistic"];

//     // Generate a random index to select a design style
//     var randomIndex = Math.floor(Math.random() * designStyles.length);
//     var selectedStyle = designStyles[randomIndex];

//     // Apply the selected design style
//     switch (selectedStyle) {
//       case "Vintage":
//         applyVintageStyle();
//         break;
//       case "Futuristic":
//         applyFuturisticStyle();
//         break;
//       case "Minimalistic":
//         applyMinimalisticStyle();
//         break;
//     }

//     alert("Random design style applied: " + selectedStyle);
//   } else {
//     alert("Please open a document.");
//   }
// } else {
//   alert("Please run the script in Adobe Illustrator.");
// }

// // Function to apply the vintage style
// function applyVintageStyle() {
//   // Adjusting color balance
//   // doc.adjustColorBalance(0, 0, 50, 0);

//   // Applying a texture effect
//   // var textureEffect = app.effects.item("Texture");
//   // if (textureEffect != null) {
//   //   doc.applyEffect(textureEffect);
//   // }

//   // Applying a noise effect
//   var noiseEffect = app.effects.item("Add Noise");
//   if (noiseEffect != null) {
//     doc.applyEffect(noiseEffect);
//   }
// }

// // Function to apply the futuristic style
// function applyFuturisticStyle() {
//   // Applying gradients
//   var gradient = doc.gradients.add();
//   gradient.gradientStops[0].color = getRandomRGBColor();
//   gradient.gradientStops[1].color = getRandomRGBColor();
//   // doc.defaultFillColor = gradient;

//   // Applying geometric shapes
//   var rectangle = doc.pathItems.rectangle(0, 0, 200, 200);
//   rectangle.fillColor = getRandomRGBColor();
//   rectangle.stroked = false;

//   var circle = doc.pathItems.ellipse(300, 300, 100, 100);
//   circle.fillColor = getRandomRGBColor();
//   circle.stroked = false;
// }

// // Function to apply the minimalistic style
// function applyMinimalisticStyle() {
//   // Reducing colors
//   // doc.trace();

//   // Simplifying shapes
//   doc.pathItems.simplify();

//   // Applying clean and minimal compositions
//   doc.artboards.add(doc.visibleBounds);
// }

// // Function to generate a random RGB color
// function getRandomRGBColor() {
//   var red = Math.floor(Math.random() * 256);
//   var green = Math.floor(Math.random() * 256);
//   var blue = Math.floor(Math.random() * 256);
//   return new RGBColor(red, green, blue);
// }

// Check if Adobe Illustrator is running


if (app && app.name === 'Adobe Illustrator') {
  var doc = app.activeDocument;
  
  // Define the radius and center of the vignette
  var vignetteRadius = 500;
  var vignetteCenter = [doc.width / 2, doc.height / 2];

  // Create a new rectangle to serve as the vignette
  var vignetteRectangle = doc.pathItems.rectangle(0, 0, doc.width, doc.height);
  vignetteRectangle.filled = true;
  vignetteRectangle.fillColor = new GrayColor();
  vignetteRectangle.fillColor.gray = 0; // Black fill color
  vignetteRectangle.opacity = 0; // Set opacity to 0

  // Create a new transparent rectangle to use as the mask
  var maskRectangle = doc.pathItems.rectangle(0, 0, doc.width, doc.height);
  maskRectangle.filled = true;
  maskRectangle.fillColor = new GrayColor();
  maskRectangle.fillColor.gray = 100; // White fill color
  maskRectangle.opacity = 100; // Set opacity to 100

  // Group the vignette rectangle and mask rectangle
  var vignetteGroup = doc.groupItems.add();
  vignetteGroup.name = 'Vignette';
  vignetteGroup.move(doc, ElementPlacement.PLACEATEND); // Move to the top of the layer stack
  vignetteRectangle.moveToBeginning(vignetteGroup);
  maskRectangle.moveToBeginning(vignetteGroup);

  // Apply a transparency mask to the vignette group
  vignetteGroup.clipped = true;

  // Set the vignette group as the transparency mask of the active layer
  var activeLayer = doc.activeLayer;
  activeLayer.hasSelectedArtwork = true;
  activeLayer.selectedArtwork = vignetteGroup;

  // Set up the blending mode of the active layer to achieve the vignette effect
  activeLayer.blendingMode = BlendModes.COLORBURN;
  activeLayer.opacity = 100; // Adjust opacity if necessary
} else {
  alert('Adobe Illustrator is not running!');
}
