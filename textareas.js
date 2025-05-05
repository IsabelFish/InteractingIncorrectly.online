// not sure but this makes the random icons work so thats cool
// aka help position the icon divs
// if it works it works ....

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("bgHorse");
  const placed = [];
  const linkSize = 60;

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
  }

  function isOverlapping(x1, y1, x2, y2) {
    return !(
      x1 + linkSize <= x2 ||
      x2 + linkSize <= x1 ||
      y1 + linkSize <= y2 ||
      y2 + linkSize <= y1
    );
  }

  for (let i = 1; i <= 12; i++) {
    let x, y;
    let attempts = 0;
    let overlapping;

    do {
      x = getRandomPosition(containerWidth - linkSize);
      y = getRandomPosition(containerHeight - linkSize);
      overlapping = placed.some(pos => isOverlapping(x, y, pos.x, pos.y));
      attempts++;
      if (attempts > 1000) {
        console.warn("Could not find non-overlapping position for all elements.");
        break;
      }
    } while (overlapping);

    placed.push({ x, y });

    const link = document.getElementById(`link${i}`);
    link.style.left = `${x}px`;
    link.style.top = `${y}px`;
  }
});

//text areas

const addTextAreas = () => {
    // Remove all existing textareas
    const existingTextAreas = document.querySelectorAll('.areaOfText');
    existingTextAreas.forEach(el => el.remove());

    const width = window.innerWidth;
    const height = window.innerHeight;

    const elementWidth = width <= 565 ? width * 0.25 : 71;
    const elementHeight = 38;

    const gridColumns = Math.floor(width / elementWidth);
    const gridRows = Math.floor(height / elementHeight) - 1;
    const totalGridSpots = gridColumns * gridRows;

    const textAreaContainer = document.querySelector('.textAreaContainer');

    // Layer 1: Full interactive grid
    const layer1 = document.createElement('div');
    layer1.className = 'textAreaLayer layer1';
    layer1.style.position = 'absolute';
    layer1.style.top = '0';
    layer1.style.left = '0';
    layer1.style.width = '100%';
    layer1.style.height = '100%';
    layer1.style.zIndex = '1';
    textAreaContainer.appendChild(layer1);

    // Store grid positions for .withText assignment later
    const availableSpots = [];

    for (let i = 0; i < totalGridSpots; i++) {
        const col = i % gridColumns;
        const row = Math.floor(i / gridColumns);

        const newTextarea = document.createElement('textarea');
        newTextarea.className = 'areaOfText';
        newTextarea.style.position = 'absolute';
        newTextarea.style.left = `${col * elementWidth}px`;
        newTextarea.style.top = `${row * (elementHeight + 3)}px`;
        newTextarea.style.width = `${elementWidth}px`;
        newTextarea.style.height = `${elementHeight - 3}px`;
        newTextarea.style.pointerEvents = 'auto';

        layer1.appendChild(newTextarea);

        // Store for random .withText assignment
        availableSpots.push({ col, row });
    }

    // Randomly pick 12 positions for .withText elements
    const shuffled = availableSpots.sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, 12);

    picked.forEach((pos, index) => {
        const textarea = document.createElement('textarea');
        textarea.className = 'areaOfText withText';
        textarea.id = `withText${index}`;
        textarea.value = '🌱';

        textarea.style.position = 'absolute';
        textarea.style.left = `${pos.col * elementWidth}px`;
        textarea.style.top = `${pos.row * (elementHeight + 3)}px`;
        textarea.style.width = `${elementWidth}px`;
        textarea.style.height = `${elementHeight - 3}px`;

        textarea.style.zIndex = '99';
        textarea.style.pointerEvents = 'auto';
        textarea.style.mixBlendMode = 'lighten';

        textAreaContainer.appendChild(textarea);
    });
};

// mobile check
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
// Always run on load
addTextAreas();
  
if (isMobile) {
  window.addEventListener('orientationchange', () => {
     // Slight delay
     setTimeout(addTextAreas, 200);
   });
} else {
    window.addEventListener('resize', addTextAreas);
}

// randomly placed link icons ! yay
function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

function isOverlapping(x1, y1, x2, y2) {
  return !(x1 + 60 <= x2 || x2 + 60 <= x1 || y1 + 60 <= y2 || y2 + 60 <= y1);
}

function placeDivs() {
  const container = document.getElementById("bgHorse");
  const placed = [];

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  for (let i = 1; i <= 12; i++) {
    let x, y;
    let tries = 0;
    let overlaps;

    do {
      x = getRandomPosition(containerWidth - 60);
      y = getRandomPosition(containerHeight - 60);
      overlaps = placed.some(pos => isOverlapping(x, y, pos.x, pos.y));
      tries++;
      if (tries > 1000) {
        console.error("Could not place all divs without overlap.");
        return;
      }
    } while (overlaps);

    placed.push({ x, y });

    const div = document.getElementById(`link${i}`);
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
  }
}

placeDivs();

// draggable?
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".link");
  links.forEach(link => {
    let isDragging = false;
    let offsetX, offsetY;

    link.addEventListener("mousedown", function (e) {
      isDragging = true;
      const rect = link.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      // Prevent default behavior like selecting text
      e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;

      const container = document.getElementById("bgHorse");
      const containerRect = container.getBoundingClientRect();

      let x = e.clientX - containerRect.left - offsetX;
      let y = e.clientY - containerRect.top - offsetY;

      // Constrain within container bounds
      x = Math.max(0, Math.min(x, container.clientWidth - 60));
      y = Math.max(0, Math.min(y, container.clientHeight - 60));

      link.style.left = `${x}px`;
      link.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
    });
  });
});

// drag no click
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".link");

  links.forEach(link => {
    let isDragging = false;
    let startX, startY;
    let offsetX, offsetY;
    let dragged = false;

    link.addEventListener("mousedown", function (e) {
      isDragging = true;
      dragged = false;

      const rect = link.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      startX = e.clientX;
      startY = e.clientY;

      e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Consider it a drag if movement is more than 5px
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        dragged = true;

        const container = document.getElementById("bgHorse");
        const containerRect = container.getBoundingClientRect();

        let x = e.clientX - containerRect.left - offsetX;
        let y = e.clientY - containerRect.top - offsetY;

        x = Math.max(0, Math.min(x, container.clientWidth - 60));
        y = Math.max(0, Math.min(y, container.clientHeight - 60));

        link.style.left = `${x}px`;
        link.style.top = `${y}px`;
      }
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
    });

    // Prevent navigation if it was dragged
    link.addEventListener("click", function (e) {
      if (dragged) {
        e.preventDefault();
      }
    });
  });
});

// drag mobile
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".link");
  const container = document.getElementById("bgHorse");

  links.forEach(link => {
    let isDragging = false;
    let startX, startY;
    let offsetX, offsetY;
    let dragged = false;

    function startDrag(e) {
      isDragging = true;
      dragged = false;

      const isTouch = e.type.startsWith("touch");
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      const rect = link.getBoundingClientRect();
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;

      startX = clientX;
      startY = clientY;

      if (!isTouch) e.preventDefault(); // only prevent mouse default
    }

    function drag(e) {
      if (!isDragging) return;

      const isTouch = e.type.startsWith("touch");
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        dragged = true;

        const containerRect = container.getBoundingClientRect();
        let x = clientX - containerRect.left - offsetX;
        let y = clientY - containerRect.top - offsetY;

        x = Math.max(0, Math.min(x, container.clientWidth - 60));
        y = Math.max(0, Math.min(y, container.clientHeight - 60));

        link.style.left = `${x}px`;
        link.style.top = `${y}px`;
      }

      if (isTouch) e.preventDefault(); // prevent scroll while dragging
    }

    function endDrag() {
      isDragging = false;
    }

    function handleClick(e) {
      if (dragged) {
        e.preventDefault(); // block link if dragged
      }
    }

    // Add mouse listeners
    link.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);

    // Add touch listeners
    link.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", endDrag);

    // Cancel click if drag occurred
    link.addEventListener("click", handleClick);
  });
});


// BACK TO INDEX AFTER 1 MIN NO ACTIVITY

let inactivityRedirect = function () {
  let timeout;
  const redirectUrl = 'index.html';
  function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          window.location.href = redirectUrl; // Redirects to the specified URL
      }, 90000); // 1 minute = 60000 ms
  }

  ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(evt =>
      window.addEventListener(evt, resetTimer)
  );

  resetTimer();
};

inactivityRedirect();

