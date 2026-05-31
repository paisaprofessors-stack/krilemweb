const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("revealed"));
}
