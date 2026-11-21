/* =========================================================
   Savora - script.js
   Every image uses a chain of sources and ends with a
   built-in illustration, so nothing can ever show as broken.
   ========================================================= */

/* ---------- Data ---------- */
const MENU = [
  { id: 1, name: "Margherita Pizza", cat: "mains", price: 349, badge: "Bestseller",
    desc: "Wood-fired crust, fresh mozzarella, basil and San Marzano tomato.",
    emoji: "🍕", c1: "#ffd29d", c2: "#e63946",
    srcs: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
      "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600"
    ] },
  { id: 2, name: "Classic Beef Burger", cat: "mains", price: 299, badge: "",
    desc: "Juicy patty, cheddar, caramelised onions and house sauce.",
    emoji: "🍔", c1: "#ffc971", c2: "#c1440e",
    srcs: [
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80",
      "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600"
    ] },
  { id: 3, name: "Creamy Alfredo Pasta", cat: "mains", price: 329, badge: "Chef's Pick",
    desc: "Fettuccine tossed in parmesan cream with garlic and herbs.",
    emoji: "🍝", c1: "#ffe3a3", c2: "#e09f3e",
    srcs: [
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80"
    ] },
  { id: 4, name: "Grilled Tandoori Skewers", cat: "starters", price: 259, badge: "Spicy",
    desc: "Smoky marinated chunks grilled to perfection with mint chutney.",
    emoji: "🍢", c1: "#ffb88c", c2: "#d62828",
    srcs: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
    ] },
  { id: 5, name: "Garden Fresh Salad", cat: "starters", price: 199, badge: "Vegan",
    desc: "Crisp greens, cherry tomatoes, avocado and citrus dressing.",
    emoji: "🥗", c1: "#c7f0a8", c2: "#2a9d8f",
    srcs: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
    ] },
  { id: 6, name: "Rainbow Power Bowl", cat: "starters", price: 279, badge: "Healthy",
    desc: "Quinoa, roasted veggies, chickpeas and tahini drizzle.",
    emoji: "🥙", c1: "#ffe08a", c2: "#52b788",
    srcs: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    ] },
  { id: 7, name: "Fluffy Berry Pancakes", cat: "breakfast", price: 229, badge: "",
    desc: "Stack of pancakes with fresh berries and maple syrup.",
    emoji: "🥞", c1: "#ffe3b3", c2: "#b5651d",
    srcs: [
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600"
    ] },
  { id: 8, name: "Avocado Egg Toast", cat: "breakfast", price: 219, badge: "New",
    desc: "Sourdough, smashed avocado, poached egg and chilli flakes.",
    emoji: "🥑", c1: "#d9f2b4", c2: "#6a994e",
    srcs: [
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=600&q=80"
    ] },
  { id: 9, name: "Molten Chocolate Cake", cat: "desserts", price: 189, badge: "Must Try",
    desc: "Warm gooey centre served with vanilla bean ice cream.",
    emoji: "🍫", c1: "#c08552", c2: "#4b2e1e",
    srcs: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
      "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600"
    ] },
  { id: 10, name: "Artisan Ice Cream", cat: "desserts", price: 149, badge: "",
    desc: "Three scoops of small-batch gelato in seasonal flavours.",
    emoji: "🍨", c1: "#ffd6e8", c2: "#e879a8",
    srcs: [
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
    ] }
];

/* ---------- Helpers ---------- */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => "₹" + n.toLocaleString("en-IN");
const safeGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const safeSet = (k, v) => { try { localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v)); } catch {} };

/* =========================================================
   BULLETPROOF IMAGE LOADER
   ========================================================= */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]));

/* Built-in illustration: always works, no network needed */
function makeFallback(emoji, label, c1, c2) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
      </linearGradient></defs>
      <rect width="800" height="800" fill="url(#g)"/>
      <circle cx="400" cy="350" r="250" fill="rgba(255,255,255,0.22)"/>
      <circle cx="400" cy="350" r="190" fill="rgba(255,255,255,0.18)"/>
      <text x="400" y="360" font-size="240" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
      <text x="400" y="700" font-size="46" font-family="Georgia, serif" font-style="italic"
            fill="#ffffff" text-anchor="middle">${esc(label)}</text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

const resolvedSrc = {};          // remembers which source worked for each image key
const LOAD_TIMEOUT = 10000;      // ms to wait before trying the next source

/* Tries each source in order; last one is the built-in illustration */
function hydrate(img) {
  if (img.dataset.hydrated === "1") return;
  img.dataset.hydrated = "1";

  const list = (img.dataset.srcs || "").split("|").map(s => s.trim()).filter(Boolean);
  list.push(makeFallback(
    img.dataset.emoji || "🍽️",
    img.dataset.label || img.alt || "",
    img.dataset.c1 || "#ffb88c",
    img.dataset.c2 || "#ff6b35"
  ));

  let i = -1, timer = null, done = false;

  const next = () => {
    clearTimeout(timer);
    if (done) return;
    i++;
    if (i >= list.length) return;
    img.src = list[i];
    if (i < list.length - 1) timer = setTimeout(next, LOAD_TIMEOUT);
  };

  img.addEventListener("load", () => {
    clearTimeout(timer);
    done = true;
    if (img.dataset.key) resolvedSrc[img.dataset.key] = img.currentSrc || img.src;
  });
  img.addEventListener("error", next);

  next();
}

function hydrateAll(root = document) {
  $$("img[data-srcs]", root).forEach(hydrate);
}

/* Builds an <img> tag string for a menu item */
function menuImgTag(m, extraClass = "") {
  const first = resolvedSrc["m" + m.id];
  const sources = (first ? [first, ...m.srcs.filter(s => s !== first)] : m.srcs).join("|");
  return `<img class="${extraClass}" alt="${esc(m.name)}" referrerpolicy="no-referrer"
    data-key="m${m.id}" data-srcs="${sources}"
    data-emoji="${m.emoji}" data-label="${esc(m.name)}" data-c1="${m.c1}" data-c2="${m.c2}" />`;
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Menu rendering ---------- */
function renderMenu(filter = "all") {
  const grid = $("#menuGrid");
  const items = filter === "all" ? MENU : MENU.filter(i => i.cat === filter);
  grid.innerHTML = items.map((i, idx) => `
    <article class="card" style="animation-delay:${idx * 70}ms">
      <div class="card-img">
        ${menuImgTag(i)}
        ${i.badge ? `<span class="badge">${i.badge}</span>` : ""}
      </div>
      <div class="card-body">
        <h3>${i.name}</h3>
        <p>${i.desc}</p>
        <div class="card-foot">
          <span class="price">${money(i.price)}</span>
          <button class="add-btn" data-id="${i.id}">+ Add</button>
        </div>
      </div>
    </article>`).join("");
  hydrateAll(grid);
}

$("#filters").addEventListener("click", e => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  $$(".filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderMenu(btn.dataset.filter);
});

$("#menuGrid").addEventListener("click", e => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  addToCart(+btn.dataset.id);
});

/* ---------- Cart ---------- */
let cart = safeGet("savora-cart", []).filter(c => MENU.some(m => m.id === c.id));
const saveCart = () => safeSet("savora-cart", cart);

function addToCart(id) {
  const found = cart.find(c => c.id === id);
  found ? found.qty++ : cart.push({ id, qty: 1 });
  saveCart(); renderCart();
  toast(`${MENU.find(m => m.id === id).name} added 🎉`);
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  saveCart(); renderCart();
}

function renderCart() {
  const box = $("#drawerItems");
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.qty * MENU.find(m => m.id === c.id).price, 0);

  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = money(total);

  if (!cart.length) {
    box.innerHTML = `<p class="empty">Your order is empty 🍽️<br/>Add something tasty!</p>`;
    return;
  }
  box.innerHTML = cart.map(c => {
    const m = MENU.find(x => x.id === c.id);
    return `
      <div class="item">
        ${menuImgTag(m)}
        <div class="item-info"><h4>${m.name}</h4><span>${money(m.price * c.qty)}</span></div>
        <div class="qty">
          <button data-act="dec" data-id="${m.id}" aria-label="Decrease">−</button>
          <b>${c.qty}</b>
          <button data-act="inc" data-id="${m.id}" aria-label="Increase">+</button>
        </div>
      </div>`;
  }).join("");
  hydrateAll(box);
}

$("#drawerItems").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  changeQty(+b.dataset.id, b.dataset.act === "inc" ? 1 : -1);
});

const drawer = $("#drawer"), overlay = $("#overlay");
function toggleDrawer(open) {
  drawer.classList.toggle("open", open);
  overlay.classList.toggle("show", open);
  document.body.classList.toggle("no-scroll", open);
}
$("#cartBtn").addEventListener("click", () => toggleDrawer(true));
$("#closeDrawer").addEventListener("click", () => toggleDrawer(false));
overlay.addEventListener("click", () => toggleDrawer(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") toggleDrawer(false); });

$("#checkout").addEventListener("click", () => {
  if (!cart.length) return toast("Your order is empty!");
  cart = []; saveCart(); renderCart(); toggleDrawer(false);
  toast("Order placed! Your food is on the way 🚴");
});

/* ---------- Header, nav, scroll ---------- */
const header = $("#header"), toTop = $("#toTop");
const sections = $$("section[id]");
const links = $$(".nav-links a");

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 30);
  toTop.classList.toggle("show", y > 600);

  let current = "home";
  sections.forEach(s => { if (y >= s.offsetTop - 140) current = s.id; });
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const hamburger = $("#hamburger"), navLinks = $("#navLinks");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
links.forEach(a => a.addEventListener("click", () => {
  hamburger.classList.remove("open");
  navLinks.classList.remove("open");
}));

/* ---------- Dark mode ---------- */
const themeBtn = $("#themeToggle");
function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
  safeSet("savora-theme", t);
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("savora-theme"); } catch {}
setTheme(savedTheme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () =>
  setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"));

/* ---------- Scroll reveal ---------- */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => io.observe(el));
} else {
  $$(".reveal").forEach(el => el.classList.add("visible"));
}

/* ---------- Animated counters ---------- */
function runCounter(el) {
  const target = +el.dataset.count;
  const t0 = performance.now(), dur = 1800;
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    el.textContent = Math.floor(p * target).toLocaleString("en-IN") + (p === 1 ? "+" : "");
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
if ("IntersectionObserver" in window) {
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      runCounter(en.target);
      counterIO.unobserve(en.target);
    });
  }, { threshold: 0.5 });
  $$("[data-count]").forEach(el => counterIO.observe(el));
} else {
  $$("[data-count]").forEach(runCounter);
}

/* ---------- Testimonial slider ---------- */
const slides = $("#slides"), dotsBox = $("#dots");
const slideCount = $$(".slide").length;
let slideIdx = 0, slideTimer;

dotsBox.innerHTML = Array.from({ length: slideCount }, (_, i) =>
  `<button class="dot" data-i="${i}" aria-label="Slide ${i + 1}"></button>`).join("");

function goTo(i) {
  slideIdx = (i + slideCount) % slideCount;
  slides.style.transform = `translateX(-${slideIdx * 100}%)`;
  $$(".dot").forEach((d, k) => d.classList.toggle("active", k === slideIdx));
}
function autoPlay() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goTo(slideIdx + 1), 5000);
}
dotsBox.addEventListener("click", e => {
  const d = e.target.closest(".dot");
  if (d) { goTo(+d.dataset.i); autoPlay(); }
});
goTo(0); autoPlay();

/* ---------- Reservation form ---------- */
const dateInput = $("#date");
(function setMinDate() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  dateInput.min = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // local date
})();

$("#reserveForm").addEventListener("submit", e => {
  e.preventDefault();
  const msg = $("#formMsg");
  const name = $("#name"), phone = $("#phone"), guests = $("#guests");
  let ok = true;

  [name, phone, dateInput, guests].forEach(f => f.parentElement.classList.remove("error"));

  if (name.value.trim().length < 2) { name.parentElement.classList.add("error"); ok = false; }
  if (!/^[0-9+\-\s]{8,15}$/.test(phone.value.trim())) { phone.parentElement.classList.add("error"); ok = false; }
  if (!dateInput.value || dateInput.value < dateInput.min) { dateInput.parentElement.classList.add("error"); ok = false; }
  if (!guests.value) { guests.parentElement.classList.add("error"); ok = false; }

  if (!ok) {
    msg.className = "form-msg err";
    msg.textContent = "Please fill in all required fields correctly.";
    return;
  }
  msg.className = "form-msg ok";
  msg.textContent = `Thank you, ${name.value.trim()}! Your table is reserved 🎉`;
  e.target.reset();
  toast("Reservation confirmed ✅");
});

/* ---------- Newsletter ---------- */
$("#newsForm").addEventListener("submit", e => {
  e.preventDefault();
  e.target.reset();
  toast("Subscribed! Welcome to the family 💌");
});

/* ---------- Init ---------- */
$("#year").textContent = new Date().getFullYear();
hydrateAll();   // hero + about images
renderMenu();   // menu images
renderCart();   // cart images
