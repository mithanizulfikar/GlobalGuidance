document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const backTop = document.querySelector("#backTop");
  const profileForm = document.querySelector("#profileForm");
  const profileMessage = document.querySelector("#profileMessage");
  const year = document.querySelector("#year");

  // Current year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.classList.toggle("active", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // Close menu on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && nav) {
      nav.classList.remove("open");
      menuButton?.classList.remove("active");
      menuButton?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  });

  // Profile form demo
  if (profileForm) {
    profileForm.addEventListener("submit", event => {
      event.preventDefault();

      const data = new FormData(profileForm);
      const planning = data.get("planning");
      const destination = data.get("destination");

      if (profileMessage) {
        profileMessage.textContent =
          `Thank you. Your ${planning.toLowerCase()} profile for ${destination} is ready for the next step.`;
      }

      profileForm.reset();
    });
  }

  // Back-to-top button
  const handleScroll = () => {
    if (!backTop) return;
    backTop.classList.toggle("show", window.scrollY > 600);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  backTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Reveal-on-scroll animation
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }
});
