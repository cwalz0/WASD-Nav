let scrollingInterval = null;
let currentDirection = null;

document.addEventListener("keydown", (e) => {
  const activeElement = document.activeElement;

  // Prevent interference with typing in input or textarea fields
  if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
    return;
  }

  // Determine the current direction
  const direction = e.key.toLowerCase();
  if (!["w", "s", "a", "d"].includes(direction)) return;

  // If already scrolling in the same direction, do nothing
  if (scrollingInterval && currentDirection === direction) return;

  // Stop any existing scrolling in a different direction
  clearInterval(scrollingInterval);

  // Start scrolling in the new direction
  currentDirection = direction;
  scrollingInterval = setInterval(() => {
    // Dynamically calculate scroll speed based on modifier keys
    let scrollSpeed = 175; // Default speed
    if (e.shiftKey) {
      scrollSpeed = 300; // Shift key pressed
    }

    // Scroll based on the direction
    switch (currentDirection) {
      case "w": // Scroll up
        window.scrollBy(0, -scrollSpeed);
        break;
      case "s": // Scroll down
        window.scrollBy(0, scrollSpeed);
        break;
      case "a": // Scroll left
        window.scrollBy(-scrollSpeed, 0);
        break;
      case "d": // Scroll right
        window.scrollBy(scrollSpeed, 0);
        break;
    }
  }, 50);
});

document.addEventListener("keyup", (e) => {
  // Stop scrolling if the direction key is released
  if (e.key.toLowerCase() === currentDirection) {
    clearInterval(scrollingInterval);
    scrollingInterval = null;
    currentDirection = null;
  }
});
