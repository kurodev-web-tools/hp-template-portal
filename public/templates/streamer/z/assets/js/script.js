document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".mobile-toggle");
    const menu = document.querySelector(".mobile-menu");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.classList.add("is-ready");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            const isActive = menu.classList.toggle("active");
            toggle.classList.toggle("active", isActive);
            toggle.setAttribute("aria-expanded", String(isActive));
            toggle.setAttribute("aria-label", isActive ? "メニューを閉じる" : "メニューを開く");
            menu.setAttribute("aria-hidden", String(!isActive));
            document.body.classList.toggle("menu-open", isActive);

            const icon = toggle.querySelector(".material-icons");
            if (icon) {
                icon.textContent = isActive ? "close" : "circle";
            }
        });

        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
                toggle.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
                toggle.setAttribute("aria-label", "メニューを開く");
                menu.setAttribute("aria-hidden", "true");
                document.body.classList.remove("menu-open");

                const icon = toggle.querySelector(".material-icons");
                if (icon) {
                    icon.textContent = "circle";
                }
            });
        });
    }

    document.querySelectorAll(".seal-cta").forEach((button) => {
        button.addEventListener("pointerdown", () => {
            if (reduceMotion) return;
            button.animate(
                [
                    { transform: "translateY(0) scale(1)" },
                    { transform: "translateY(2px) scale(0.98)" },
                    { transform: "translateY(0) scale(1)" }
                ],
                {
                    duration: 180,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)"
                }
            );
        });
    });
});
