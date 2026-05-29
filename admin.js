import { addPost, getPosts, usingFirebase } from "./storage.js";

const PASSWORD = "admin123";

const overlay = document.querySelector("#passwordOverlay");
const content = document.querySelector("#adminContent");
const input = document.querySelector("#passwordInput");
const btn = document.querySelector("#passwordButton");
const error = document.querySelector("#passwordError");

function checkPassword(){
  if(input.value === PASSWORD){
    overlay.classList.add("hidden");
    content.classList.remove("hidden");
  } else {
    error.textContent = "Contraseña incorrecta.";
  }
}
btn.addEventListener("click", checkPassword);
input.addEventListener("keydown", e => { if(e.key === "Enter") checkPassword(); });

const formatSelect = document.querySelector("#format");
const viewsField = document.querySelector(".reel-metric");
formatSelect.addEventListener("change", () => {
  viewsField.style.display = formatSelect.value === "Reel" ? "grid" : "none";
  if(formatSelect.value !== "Reel") document.querySelector("#views").value = 0;
});

document.querySelector("#postForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const post = {
    brand: document.querySelector("#brand").value,
    date: document.querySelector("#date").value,
    format: document.querySelector("#format").value,
    category: document.querySelector("#category").value,
    views: +document.querySelector("#views").value || 0,
    likes: +document.querySelector("#likes").value || 0,
    comments: +document.querySelector("#comments").value || 0,
    shares: +document.querySelector("#shares").value || 0,
    title: document.querySelector("#title").value.trim(),
    source: "Admin"
  };
  await addPost(post);
  document.querySelector("#status").textContent = usingFirebase()
    ? "Publicación guardada online en Firebase."
    : "Publicación guardada en este navegador. Para guardar online, activa Firebase.";
  e.target.reset();
  viewsField.style.display = "grid";
  renderList();
});

function n(num){ return new Intl.NumberFormat("es-EC").format(num || 0); }

async function renderList(){
  const data = (await getPosts()).filter(p=>p.source==="Admin").slice(-12).reverse();
  document.querySelector("#adminList").innerHTML = data.length ? data.map(p=>`
    <div class="admin-item">
      <strong>${p.brand} · ${p.title}</strong>
      <p>${p.date} · ${p.format} · ${p.category} · Likes ${n(p.likes)} · Comentarios ${n(p.comments)} · Compartidos ${n(p.shares)} ${p.format==="Reel" ? "· Views " + n(p.views) : ""}</p>
    </div>
  `).join("") : "<p>Aún no has agregado publicaciones desde el panel.</p>";
}
renderList();
