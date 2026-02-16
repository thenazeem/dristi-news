// Section Switching
const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".bottom-nav button");
const backBtn = document.getElementById("backBtn");
const pageTitle = document.getElementById("pageTitle");

// Show section
function showPage(id) {
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  navButtons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.bottom-nav button[data-page="${id}"]`)?.classList.add("active");

  // Back button visibility
  if(id === "quran" || id === "hadith" || id === "dua" || id === "prayer") {
    backBtn.style.display = "block";
  } else {
    backBtn.style.display = "none";
  }

  // Update title
  if(id === "home") pageTitle.textContent = "DristiBD";
  else if(id === "news") pageTitle.textContent = "নিউজ";
  else if(id === "islamic") pageTitle.textContent = "ইসলামিক";
  else if(id === "profile") pageTitle.textContent = "প্রোফাইল";
  else if(id === "quran") pageTitle.textContent = "কুরআন";
  else if(id === "hadith") pageTitle.textContent = "হাদিস";
  else if(id === "dua") pageTitle.textContent = "দোয়া";
  else if(id === "prayer") pageTitle.textContent = "নামাজ";

  localStorage.setItem("lastPage", id);
}

// Back Button
backBtn.addEventListener("click", function() {
  showPage("islamic");
});

// Bottom Nav click
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.getAttribute("data-page");
    showPage(page);
  });
});

// District News
const newsData = {
  dhaka: ["ঢাকার খবর ১", "ঢাকার খবর ২"],
  chittagong: ["চট্টগ্রামের খবর ১", "চট্টগ্রামের খবর ২"],
  rajshahi: ["রাজশাহীর খবর ১", "রাজশাহীর খবর ২"]
};

const select = document.getElementById("districtSelect");
if(select) {
  select.addEventListener("change", function() {
    const container = document.getElementById("newsContainer");
    container.innerHTML = "";
    const data = newsData[this.value];
    if(data) {
      data.forEach(news => {
        const div = document.createElement("div");
        div.className = "card";
        div.textContent = news;
        container.appendChild(div);
      });
    }
  });
}

// Dark Mode
const toggle = document.getElementById("darkToggle");
if(localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if(toggle) toggle.checked = true;
}
if(toggle) {
  toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

// Islamic Subpage Click
document.querySelectorAll(".grid a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const sub = this.getAttribute("data-subpage");
    showPage(sub);
  });
});

// Load last visited page
window.addEventListener("DOMContentLoaded", function() {
  const last = localStorage.getItem("lastPage");
  if(last && document.getElementById(last)) showPage(last);
});