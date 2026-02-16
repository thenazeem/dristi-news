function showPage(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

// News
const newsData = {
  dhaka: ["ঢাকার প্রধান খবর ১", "ঢাকার প্রধান খবর ২"],
  chittagong: ["চট্টগ্রামের খবর ১", "চট্টগ্রামের খবর ২"],
  rajshahi: ["রাজশাহীর খবর ১", "রাজশাহীর খবর ২"]
};

const select = document.getElementById("districtSelect");
if (select) {
  select.addEventListener("change", function () {
    const container = document.getElementById("newsContainer");
    container.innerHTML = "";

    const data = newsData[this.value];
    if (data) {
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

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (toggle) toggle.checked = true;
}

if (toggle) {
  toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}