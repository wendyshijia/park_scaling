// import gsap from "gsap";
console.clear();
// gsap.registerPlugin(ScrollTriger, ScrollToPlugin);

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const button = document.getElementById("scroll-button");

canvas.width = 1800;
canvas.height = 900;

const frameCount = 120;
const targetCount = 47;

const currentFrame = index => (
  `imgs/tinified/crater-scale-5-reverse-${(index+1).toString()}.jpg`
);

const images = []
const sequencer = {
  frame: 0
};

let startFrame;

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

images[40].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[sequencer.frame], 0, 0); 
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
// button.addEventListener('click', () => {
//   console.log(document.body.scrollHeight)
//   // let scrollPosition = (targetCount - 1) / (frameCount - 1) * document.body.scrollHeight;
//   // console.log(scrollPosition)
//   gsap.to(window, { scrollTo: document.body.scrollHeight/2, duration: 1 });


// });