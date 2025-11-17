// https://www.youtube.com/watch?v=LdT57KOxmnQ&t=457s

gsap.registerPlugin(SplitText);

const splitTextIntoLines = (selector) => {
  return new SplitText(selector, {
    type: "lines",
    linesClass: "line",
  });
};

const copyText = splitTextIntoLines(".preloader-copy p");
const counterText = splitTextIntoLines(".preloader-counter p");

gsap.set(["nav", ".hero-img", ".hero-content"], {
  y: "35vh",
});

const animateCounter = () => {
  const counterElement = document.querySelector(".preloader-counter p");
  let currentValue = 0;
  const updateInterval = 50;
  const maxDuration = 4500;
  const startTime = Date.now();

  setTimeout(() => {
    const updateCounter = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime / maxDuration;

      if (currentValue < 100 && elapsedTime < maxDuration) {
        const target = Math.floor(progress * 100);
        const jump = Math.floor(Math.random() * 15) + 3;
        currentValue = Math.min(currentValue + jump, target, 100);
        counterElement.textContent = currentValue.toString().padStart(2, "0");
        setTimeout(updateCounter, updateInterval + Math.random() * 50);
      } else {
        counterElement.textContent = "100";
      }
    };
    updateCounter();
  }, 2000);
};

animateCounter();

// Main timeline
const tl = gsap.timeline();

tl.to([".preloader-copy p .line", ".preloader-counter p .line"], {
    y: "0%",
    duration: 1,
    stagger: 0.075,
    ease: "power3.out",
    delay: 1,
})

.to(".preloader-revealer", {
    scale: 0.1,
    duration: 0.75,
    ease: "power2.out", 
}, "<" )

.to(".preloader-revealer", {
    scale: 0.25,
    duration: 1,
    ease: "power3.out",
})

.to(".preloader-revealer", {
    scale: 0.5,
    duration: 0.75,
    ease: "power3.out",
})

.to(".preloader-revealer", {
    scale: 0.75,
    duration: 0.5,
    ease: "power2.out",
})

.to(".preloader-revealer", {
    scale: 1,
    duration: 1,
    ease: "power3.out",
})

.to(".preloader", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 1.25,
    ease: "power3.out",
}, "-=1" )

.to( ["nav", ".hero-img", ".hero-content"], {
    y: "0%",
    duration: 1.25,
    ease: "power3.out",
}, "<" );