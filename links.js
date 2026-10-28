const links = [
  {
    label: "Twitch",
    href: "https://www.twitch.tv/yhuhn"
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@yyHuhn"
  },
  {
    label: "GitHub",
    href: "https://github.com/yhuhn"
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/31psmsn5rv5dk34sx6cxwcs6eayi",
  },
  {
    label: "Steam",
    href: "https://steamdb.info/calculator/76561199522221242/?cc=eu",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/y.yhuhn"
  },
];

const projects = [
  {
    label: "yHuhnBot",
    desc: "Twitch bot written in Go",
    href: "https://github.com/yhuhn/twitch-bot",
    icons: [
      "go.svg",
    ],
  },
  {
    label: "yhuhn.de",
    desc: "This website",
    href: "https://github.com/yhuhn/yhuhn-de",
    icons: [
      "html5.svg",
      "javascript.svg",
    ],
  },
];

const content = document.querySelector(".container");
const linksContainer = document.getElementById("linksContainer");
const projectsGrid = document.getElementById("projectsGrid");

links.forEach((link) => {
  const a = document.createElement("a");
  a.href = link.href;
  a.className = "link-item";
  a.textContent = link.label;
  a.target = "_blank";

  linksContainer.appendChild(a);
});

projects.forEach((project) => {
  const wrapper = document.createElement("div");
  wrapper.className = "project-wrapper";

  const a = document.createElement("a");
  a.href = project.href;
  a.className = "project-item";
  a.target = "_blank";

  const icons = (project.icons || [])
    .map((src) => `<span class="project-icon" style="--icon-url: url('${src}');" role="img"></span>`)
    .join("");

  a.innerHTML = `
    <div class="project-text">
      <span class="project-label">${project.label}</span>
      <span class="project-desc">${project.desc}</span>
    </div>
    <div class="project-icons">${icons}</div>
  `;

  wrapper.appendChild(a);
  projectsGrid.appendChild(wrapper);
});
