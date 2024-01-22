// create a container and set the full-size image as its background
function createOverlay(image) {
  const overlayImage = document.createElement('img');
  overlayImage.setAttribute('src', `${image.src}`);
  overlay = document.createElement('div');
  prepareOverlay(overlay, overlayImage);

  image.style.opacity = '50%';
  toggleLoadingSpinner(image);

  overlayImage.onload = () => {
    toggleLoadingSpinner(image);
    image.parentElement.insertBefore(overlay, image);
    image.style.opacity = '100%';
  };

  return overlay;
}

function prepareOverlay(container, image) {
  container.setAttribute('class', 'image-magnify-full-size');
  container.setAttribute('aria-hidden', 'true');
  container.style.backgroundImage = `url('${image.src}')`;
  container.style.backgroundColor = 'var(--gradient-background)';
}

function toggleLoadingSpinner(image) {
  const loadingSpinner = image.parentElement.parentElement.querySelector(`.loading__spinner`);
  loadingSpinner.classList.toggle('hidden');
}

function moveWithHover(image, event, zoomRatio) {
  // calculate mouse position
  const ratio = image.height / image.width;
  const container = event.target.getBoundingClientRect();
  const xPosition = event.clientX - container.left;
  const yPosition = event.clientY - container.top;
  const xPercent = `${xPosition / (image.clientWidth / 100)}%`;
  const yPercent = `${yPosition / ((image.clientWidth * ratio) / 100)}%`;

  // determine what to show in the frame
  overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;
  overlay.style.backgroundSize = `${image.width * zoomRatio}px`;
}

function magnify(image, zoomRatio) {
  const overlay = createOverlay(image);
  overlay.onclick = () => overlay.remove();
  overlay.onmousemove = (event) => moveWithHover(image, event, zoomRatio);
  overlay.onmouseleave = () => overlay.remove();
  overlay.ontouchmove = (event) => moveWithHover(image, event, zoomRatio);
}

function enableZoomOnHover(zoomRatio) {
  const images = document.querySelectorAll('.image-magnify-hover');
  images.forEach((image) => {
    image.onclick = (event) => {
      magnify(image, zoomRatio);
      moveWithHover(image, event, zoomRatio);
    };

    image.addEventListener('mouseover', event => {
      magnify(image, zoomRatio);
      moveWithHover(image, event, zoomRatio);
    })
  });
}

function enableZoomOnTouch(zoomRatio) {
  let isZoom = false;
  var inicioX = 0;
  const images = document.querySelectorAll('.product__media-item');
  images.forEach((image) => {
    image.addEventListener('touchstart', event => {
      event.stopPropagation();
      event.preventDefault();
      inicioX = event.touches[0].clientX;
    })
    image.addEventListener('touchmove', event => {
      event.stopPropagation();
      event.preventDefault();
      // const currentImage = event?.target?.previousElementSibling?.firstElementChild;
      var desplazamientoX = event.touches[0].clientX - inicioX;

      if (event.touches.length >= 2) {
        isZoom = true;
        dedo1 = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        dedo2 = { x: event.touches[1].clientX, y: event.touches[1].clientY };
        var distancia = Math.sqrt(
          Math.pow(dedo2.x - dedo1.x, 2) + Math.pow(dedo2.y - dedo1.y, 2)
        );
        var umbral = 100;
        if (distancia > umbral) {

          document.querySelector('.product__media-toggle').click()
        }
      }

      console.log("inicioX", inicioX, desplazamientoX)

      if (inicioX) {
        if (desplazamientoX > 0) {
          document.querySelector(".product--thumbnail_slider .slider-button--prev").click()
        }
        if (desplazamientoX < 0) {
          document.querySelector(".product--thumbnail_slider .slider-button--next").click()
        }
        inicioX = 0;
      }
    })
  })
}

enableZoomOnTouch(2);
enableZoomOnHover(2);
