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
  const zoomEvent = document.querySelector(".product__media-zoom-hover");

  zoomEvent.addEventListener("click", () => {
    setTimeout(() => {
      var inicioX = 0;
      const modalImageContainer = document.querySelector(".product-media-modal__dialog");

      modalImageContainer.addEventListener('touchstart', event => {
        inicioX = event.touches[0].clientX;
      })

      modalImageContainer.addEventListener('touchmove', event => {
        event.stopPropagation();
        event.preventDefault();
        var desplazamientoX = event.touches[0].clientX - inicioX;
        if (event.touches.length >= 2) {
          isZoom = true;
          dedo1 = { x: event.touches[0].clientX, y: event.touches[0].clientY };
          dedo2 = { x: event.touches[1].clientX, y: event.touches[1].clientY };

          var distancia = Math.sqrt(
            Math.pow(dedo2.x - dedo1.x, 2) + Math.pow(dedo2.y - dedo1.y, 2)
          );

          const productMedia = document.querySelector(".product-media-modal__content");

          productMedia.style.transform = `scale(${distancia / 100})`
        }

      })

    }, 1000);
  })

}

enableZoomOnTouch(2);
enableZoomOnHover(2);
