// PixelCollision.js
export default class PixelCollision {
  constructor() {
    this.cache = new Map();
    this.debug = false;
  }

  getPixelData(image) {
    if (this.cache.has(image)) {
      return this.cache.get(image);
    }

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);

    this.cache.set(image, imageData);
    return imageData;
  }

  // Get transformed corners of an element
  getTransformedCorners(element) {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    const transform = style.transform;

    // If no transform, return simple rect
    if (transform === "none") {
      return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        points: [
          { x: rect.left, y: rect.top },
          { x: rect.right, y: rect.top },
          { x: rect.right, y: rect.bottom },
          { x: rect.left, y: rect.bottom },
        ],
      };
    }

    // Parse transform matrix
    const matrix = transform
      .match(/matrix.*\((.+)\)/)[1]
      .split(", ")
      .map(Number);

    // Get center of element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate half dimensions
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;

    // Original corners relative to center
    const corners = [
      { x: -halfW, y: -halfH },
      { x: halfW, y: -halfH },
      { x: halfW, y: halfH },
      { x: -halfW, y: halfH },
    ];

    // Transform corners
    const transformed = corners.map((corner) => {
      let x, y;

      if (matrix.length === 6) {
        // 2D transform
        x = corner.x * matrix[0] + corner.y * matrix[2] + matrix[4];
        y = corner.x * matrix[1] + corner.y * matrix[3] + matrix[5];
      } else {
        // Just translation
        x = corner.x;
        y = corner.y;
      }

      return {
        x: x + centerX,
        y: y + centerY,
      };
    });

    // Find bounds
    const xs = transformed.map((p) => p.x);
    const ys = transformed.map((p) => p.y);

    return {
      left: Math.min(...xs),
      top: Math.min(...ys),
      right: Math.max(...xs),
      bottom: Math.max(...ys),
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
      points: transformed,
    };
  }

  // Check if two rotated rectangles overlap (separating axis theorem)
  rectanglesOverlap(corners1, corners2) {
    // Test all axes (edges of both rectangles)
    const axes = [];

    // Add edges from first rectangle
    for (let i = 0; i < 4; i++) {
      const p1 = corners1[i];
      const p2 = corners1[(i + 1) % 4];
      axes.push({
        x: -(p2.y - p1.y),
        y: p2.x - p1.x,
      });
    }

    // Add edges from second rectangle
    for (let i = 0; i < 4; i++) {
      const p1 = corners2[i];
      const p2 = corners2[(i + 1) % 4];
      axes.push({
        x: -(p2.y - p1.y),
        y: p2.x - p1.x,
      });
    }

    // Check each axis
    for (const axis of axes) {
      // Normalize axis
      const length = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
      if (length === 0) continue;

      const unitAxis = {
        x: axis.x / length,
        y: axis.y / length,
      };

      // Project both rectangles onto axis
      let min1 = Infinity,
        max1 = -Infinity;
      let min2 = Infinity,
        max2 = -Infinity;

      for (const point of corners1) {
        const proj = point.x * unitAxis.x + point.y * unitAxis.y;
        min1 = Math.min(min1, proj);
        max1 = Math.max(max1, proj);
      }

      for (const point of corners2) {
        const proj = point.x * unitAxis.x + point.y * unitAxis.y;
        min2 = Math.min(min2, proj);
        max2 = Math.max(max2, proj);
      }

      // Check if projections overlap
      if (max1 < min2 || max2 < min1) {
        return false; // Gap found - no overlap
      }
    }

    return true; // All axes overlap
  }

  checkCollision(obj1, obj2) {
    // Get transformed corners
    const corners1 = this.getTransformedCorners(obj1.image);
    const corners2 = this.getTransformedCorners(obj2.image);

    if (this.debug) {
      console.log("Object 1 bounds:", {
        left: corners1.left,
        top: corners1.top,
        right: corners1.right,
        bottom: corners1.bottom,
      });
      console.log("Object 2 bounds:", {
        left: corners2.left,
        top: corners2.top,
        right: corners2.right,
        bottom: corners2.bottom,
      });
    }

    // Quick AABB check first for performance
    if (
      corners1.right < corners2.left ||
      corners1.left > corners2.right ||
      corners1.bottom < corners2.top ||
      corners1.top > corners2.bottom
    ) {
      return false;
    }

    // More precise SAT check for rotated rectangles
    if (!this.rectanglesOverlap(corners1.points, corners2.points)) {
      return false;
    }

    // Get main container for offset
    const mainRect = document.querySelector("main").getBoundingClientRect();

    // Get pixel data
    const data1 = this.getPixelData(obj1.image);
    const data2 = this.getPixelData(obj2.image);

    // Calculate overlap area in screen coordinates
    const overlapLeft = Math.max(corners1.left, corners2.left);
    const overlapTop = Math.max(corners1.top, corners2.top);
    const overlapRight = Math.min(corners1.right, corners2.right);
    const overlapBottom = Math.min(corners1.bottom, corners2.bottom);

    // Convert to integer coordinates
    const startX = Math.floor(overlapLeft);
    const startY = Math.floor(overlapTop);
    const endX = Math.ceil(overlapRight);
    const endY = Math.ceil(overlapBottom);

    // Get the actual image positions
    const img1Rect = obj1.image.getBoundingClientRect();
    const img2Rect = obj2.image.getBoundingClientRect();

    // Calculate scale factors
    const scaleX1 = obj1.image.width / img1Rect.width;
    const scaleY1 = obj1.image.height / img1Rect.height;
    const scaleX2 = obj2.image.width / img2Rect.width;
    const scaleY2 = obj2.image.height / img2Rect.height;

    // Check pixels in overlap area
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        // Map screen pixel back to image coordinates
        const img1X = Math.floor((x - img1Rect.left) * scaleX1);
        const img1Y = Math.floor((y - img1Rect.top) * scaleY1);
        const img2X = Math.floor((x - img2Rect.left) * scaleX2);
        const img2Y = Math.floor((y - img2Rect.top) * scaleY2);

        // Check bounds
        if (
          img1X >= 0 &&
          img1X < obj1.image.width &&
          img1Y >= 0 &&
          img1Y < obj1.image.height &&
          img2X >= 0 &&
          img2X < obj2.image.width &&
          img2Y >= 0 &&
          img2Y < obj2.image.height
        ) {
          const idx1 = (img1Y * obj1.image.width + img1X) * 4 + 3;
          const idx2 = (img2Y * obj2.image.width + img2X) * 4 + 3;

          if (data1.data[idx1] > 0 && data2.data[idx2] > 0) {
            if (this.debug) {
              console.log(`Collision at screen (${x},${y})`);
            }
            return true;
          }
        }
      }
    }

    return false;
  }
}
