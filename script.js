const navLinks = [...document.querySelectorAll("[data-nav]")];
const sectionIds = ["home","experience","projects","stack","contact"];
const sections = sectionIds.map(id => document.getElementById(id));
const menuButton = document.getElementById("menuButton");
const mainNav = document.querySelector(".main-nav");

function setActive(id){
  navLinks.forEach(link => link.classList.toggle("active", link.dataset.nav === id));
}
function updateFromHash(){
  const id = location.hash.replace("#","") || "home";
  setActive(sectionIds.includes(id) ? id : "home");
}
window.addEventListener("hashchange", updateFromHash);
updateFromHash();

const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(visible) history.replaceState(null,"","#"+visible.target.id), setActive(visible.target.id);
},{threshold:[0.2,0.45,0.7], rootMargin:"-20% 0px -50% 0px"});

sections.forEach(section => observer.observe(section));

document.querySelectorAll(".main-nav a").forEach(a => {
  a.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded","false");
  });
});

menuButton.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
