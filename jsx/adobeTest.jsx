
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
