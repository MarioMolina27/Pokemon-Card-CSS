let constrain = 30; // Determines the rotation intensity based on cursor position.
let maxRotation = 10; // Maximum allowed rotation in degrees.
let margin = 10; // Margin around the card's edge where rotation stops completely.
let cards = document.querySelectorAll(".card");
let originalTransforms = [];

// Get the original states of all cards to return them to their original position later.
cards.forEach(function(card) 
{
  originalTransforms.push(card.style.transform);
});

function transforms(x, y, el) {
  let box = el.getBoundingClientRect();
  let centerX = box.x + box.width / 2;
  let centerY = box.y + box.height / 2;
  let deltaX = x - centerX;
  let deltaY = y - centerY;

  // Limit rotation if cursor is near the edge.
  if (Math.abs(deltaX) < margin && Math.abs(deltaY) < margin) 
  {
    return originalTransforms[Array.from(cards).indexOf(el)];
  }

  let calcX = -deltaY / constrain;
  let calcY = deltaX / constrain;

  // Limit maximum rotation.
  calcX = Math.min(Math.max(calcX, -maxRotation), maxRotation);
  calcY = Math.min(Math.max(calcY, -maxRotation), maxRotation);

  return "perspective(100px) "
    + "rotateX("+ calcX +"deg) "
    + "rotateY("+ calcY +"deg) ";
}

function transformElement(card, xyEl) 
{
  card.style.transition = "transform 0.3s"; 
  card.style.transform = transforms.apply(null, xyEl);
}

function restoreOriginalTransform(card) 
{
  card.style.transition = "transform 0.3s"; 
  card.style.transform = originalTransforms[Array.from(cards).indexOf(card)];

  // Remove the transition after a brief delay to smooth out the restoration.
  setTimeout(function() 
  {
    card.style.transition = "none";
  }, 300); 
}

// mousemove and mouseleave events to each card.
cards.forEach(function(card) 
{
  card.onmousemove = function(e) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([card]);

    window.requestAnimationFrame(function(){
      transformElement(card, position);
    });
  };

  card.onmouseleave = function() 
  {
    restoreOriginalTransform(card);
  };
});