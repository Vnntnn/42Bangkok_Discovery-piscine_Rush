//"fade-in"
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");

    elements.forEach(el => {
        let delay = el.getAttribute("data-delay") || 0;
        setTimeout(() => {
            el.classList.add("show");
        }, delay);
    });
});