// import gsap from "gsap";
console.clear();
// gsap.registerPlugin(ScrollTriger, ScrollToPlugin);

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const button = document.getElementById("scroll-button");

canvas.width = 1800;
canvas.height = 900;

const frameCount = 120;
const currentFrame = index => (
  `imgs/crater-scale-4-${(frameCount-index).toString()}.jpg`
);


const images = []
const sequencer = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(sequencer, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[119].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[sequencer.frame], 0, 0); 
}

// function scrollToPosition(y) {
//   gsap.to(window, {
//     duration: 1,
//     scrollTo: { y: y, autoKill: false },
//     ease: "power2.inOut"
//   });
// }

button.addEventListener('click', function() {
  console.log('clicked')
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: 325, autoKill: false },
    ease: "power2.inOut"
  });
});

ScrollTrigger.create({
  start: 0,
  end: "max",
  onUpdate: (self) => {
    const scrollY = Math.round(self.scroll()); // Round to nearest integer
    
    if (scrollY > 323 && scrollY < 327) {
      button.classList.add('at-target-scroll');
    } else {
      button.classList.remove('at-target-scroll');
    }
  }
});