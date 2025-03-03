let lastScrollTop = 0;


const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll down
        navbar.classList.add('hidden');
    } else {
        // Scroll up
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

gsap.registerPlugin(ScrollTrigger);

var floatingText = document.getElementById("floatingText");

gsap.to(floatingText, {
  opacity: 1,
  y: "-100%",
  duration: 1,
  scrollTrigger: {
    trigger: floatingText,
    start: "bottom 80%", // Adjust the start position as needed
    end: "top 20%", // Adjust the end position as needed
    toggleActions: "play none none reset"
  }
});