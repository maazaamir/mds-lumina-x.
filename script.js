gsap.registerPlugin(ScrollTrigger);

// 1. Loader & Cursor Management
const progress = document.querySelector(".progress");
const loader = document.querySelector("#loader");
const cursor = document.querySelector(".cursor-follower");

// Cursor Follower Logic
window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3 });
});

// Preloader Simulation
let width = 0;
const loadingInterval = setInterval(() => {
    width += 10;
    if (progress) progress.style.width = width + "%";
    if (width >= 100) {
        clearInterval(loadingInterval);
        gsap.to(loader, {
            y: "-100%",
            duration: 1,
            ease: "expo.inOut",
            onComplete: runAnimations
        });
    }
}, 100);

function runAnimations() {
    const tl = gsap.timeline();

    // 1. Hero Entrance
    tl.to(".product-img", { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" })
      .from(".main-title", { opacity: 0, x: -50, duration: 1, ease: "power4.out" }, "-=1")
      .from(".stat", { opacity: 0, y: 20, stagger: 0.2, duration: 0.8 }, "-=0.5");

    // 2. Idle Floating
    gsap.to(".product-img", {
        y: 20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut"
    });

    // 3. Bento Grid Animation
    gsap.to(".bento-item", {
        scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    });

    // 4. Gallery Fade-In
    gsap.to(".gallery-card img", {
        scrollTrigger: {
            trigger: ".gallery-container",
            start: "top 80%",
        },
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out"
    });

    // 5. Spec List Reveal
    gsap.to(".spec-row", {
        scrollTrigger: {
            trigger: ".spec-list",
            start: "top 85%",
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
    });

    ScrollTrigger.refresh();
}
// Live Clock for Footer
function updateClock() {
    const timeElement = document.getElementById('live-time');
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    if (timeElement) timeElement.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock(); // Run immediately