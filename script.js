console.clear();

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const button = document.getElementById("scroll-button");
const label = document.getElementById("label");

canvas.width = 1800;
canvas.height = 900;

const frameCount = 120;
const buttonTarget = 60;
const startScale = 2;
const endScale = 8;

const currentFrame = index => (
  `imgs/tinified/crater-scale-5-reverse-${(index+1).toString()}.jpg`
);

const images = []
const sequencer = {
  frame: 0
};

let scrollProgress = 0;

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

images[40].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[Math.round(sequencer.frame)], 0, 0);
}

// Scroll-based animation
const scrollAnimation = gsap.to(sequencer, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    onUpdate: (self) => {
      scrollProgress = self.progress;
      updateFrame();
      let currentScale =  (startScale + (endScale - startScale) * scrollProgress).toFixed(1)
      console.log(currentScale)
      label.textContent = `A ${currentScale}×${currentScale}-mile section of Crater Lake National Park`;
    }
  },
});

function updateFrame() {
  sequencer.frame = scrollProgress * (frameCount - 1);
  render();
}

// Button click event
button.addEventListener("click", () => {
  const targetProgress = buttonTarget / (frameCount - 1);
  const duration = 1; // Duration in seconds, adjust as needed

  gsap.to(window, {
    duration: duration,
    ease: "power2.inOut",
    scrollTo: {
      y: targetProgress * scrollAnimation.scrollTrigger.end,
      autoKill: false
    },
    onUpdate: () => {
      scrollProgress = scrollAnimation.scrollTrigger.progress;
      updateFrame();
    }
  });
});