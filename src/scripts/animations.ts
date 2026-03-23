import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createIcons, icons } from "lucide";

createIcons({ icons });

gsap.registerPlugin(ScrollTrigger);

//─ HERO ANIMATIONS─

const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

heroTl
  .fromTo(
    ".hero-subtitle .anim-up",
    { y: "100%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 1, delay: 0.2 },
  )
  .fromTo(
    ".hero-title .anim-up",
    { y: "120%", rotation: 2, opacity: 0 },
    { y: "0%", rotation: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
    "-=0.6",
  )
  .to(
    [".hero-desc", ".scroll-indicator"],
    { opacity: 1, duration: 1, ease: "power2.out" },
    "-=0.5",
  );

//─ NAVBAR SCROLL BEHAVIOUR─

const nav = document.querySelector("nav") as HTMLElement;

window.addEventListener("scroll", () => {
  nav.style.transition = "all 0.3s ease";

  if (window.scrollY > 50) {
    nav.style.mixBlendMode = "normal";
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    nav.style.color = "#222222";
    nav.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.08)";
    nav.style.padding = "1rem 5%";
  } else {
    nav.style.mixBlendMode = "difference";
    nav.style.backgroundColor = "transparent";
    nav.style.color = "#ffffff";
    nav.style.boxShadow = "none";
    nav.style.padding = "2rem 5%";
  }
});

//─ HORIZONTAL SCROLL (Tech + Process panels)─
//
// Only runs on desktop (>992px). On mobile the CSS already switches
// .horizontal-sections to flex-direction:column, so GSAP must stay out
// completely — otherwise it pins the container and hides the second panel.

const hSection = document.querySelector<HTMLElement>(".horizontal-sections");

if (hSection) {
  const panels = gsap.utils.toArray<HTMLElement>(".horizontal-sections .panel");

  ScrollTrigger.matchMedia({
    // DESKTOP
    "(min-width: 993px)": function () {
      const totalScroll = window.innerWidth * (panels.length - 1);

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: hSection,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.3, max: 0.5 },
            ease: "power1.inOut",
          },
          end: () => "+=" + totalScroll,
        },
      });
    },

    // MOBILE─
    // No GSAP at all — CSS handles the vertical stacking.
    // Clear any inline transforms GSAP may have set during a resize
    // from desktop to mobile.
    "(max-width: 992px)": function () {
      panels.forEach((panel) => {
        gsap.set(panel, { clearProps: "all" });
      });
      gsap.set(hSection, { clearProps: "all" });
    },
  });
}

//─ STANDARD SCROLL ANIMATIONS

// Apparels section
const apparelsDiv = document.querySelector<HTMLElement>(".apparels-section");
if (apparelsDiv) {
  const content = apparelsDiv.querySelector<HTMLElement>(".div-content");
  const image = apparelsDiv.querySelector<HTMLElement>(".div-image");

  if (content) {
    gsap.from(Array.from(content.children), {
      scrollTrigger: { trigger: apparelsDiv, start: "top 70%" },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });
  }

  if (image) {
    gsap.from(image, {
      scrollTrigger: { trigger: apparelsDiv, start: "top 80%", scrub: 1 },
      scale: 1.2,
      y: 40,
      ease: "none",
    });
  }
}

// Values cards
gsap.from(".value-card", {
  scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
  y: 60,
  opacity: 0,
  duration: 0.9,
  stagger: 0.18,
  ease: "power4.out",
});

// Footer entrance
gsap.from(".footer-col", {
  scrollTrigger: { trigger: ".footer", start: "top 85%" },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
});
