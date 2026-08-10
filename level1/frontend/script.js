const API_BASE_CANDIDATES = (() => {
  const candidates = [];

  if (window.location.origin && window.location.origin !== "null") {
    candidates.push(new URL("/api/products", window.location.origin).toString());
  }

  candidates.push("http://127.0.0.1:5000/api/products");
  candidates.push("http://localhost:5000/api/products");

  return [...new Set(candidates)];
})();

const form = document.getElementById("product-form");
const idInput = document.getElementById("product-id");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");
const descInput = document.getElementById("description");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formTitle = document.getElementById("form-title");
const listEl = document.getElementById("product-list");
const statusEl = document.getElementById("status");

function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.classList.toggle("error", isError);
}

async function fetchJson(path = "", options = {}) {
  let lastError = new Error("Unable to reach the API");

  for (const baseUrl of API_BASE_CANDIDATES) {
    const url = `${baseUrl}${path}`;

    try {
      const res = await fetch(url, options);
      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        lastError = new Error(`Unexpected response from ${url}`);
        continue;
      }

      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError;
}

async function fetchProducts() {
  setStatus("Loading products...");
  try {
    const json = await fetchJson();
    if (!json.success) throw new Error(json.message);
    renderProducts(json.data);
    setStatus(`${json.count} product(s) found`);
  } catch (err) {
    setStatus(`Failed to load products: ${err.message}`, true);
  }
}

function renderProducts(products) {
  listEl.innerHTML = "";
  if (!products.length) {
    listEl.innerHTML = "<p>No products yet. Add one above.</p>";
    return;
  }
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${escapeHtml(p.name)}</h3>
      <p>$${p.price.toFixed(2)} &middot; Stock: ${p.stock}</p>
      <p>${escapeHtml(p.description || "")}</p>
      <div class="card-actions">
        <button class="edit-btn" data-id="${p._id}">Edit</button>
        <button class="delete-btn" data-id="${p._id}">Delete</button>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function resetForm() {
  form.reset();
  idInput.value = "";
  submitBtn.textContent = "Add Product";
  formTitle.textContent = "Add New Product";
  cancelBtn.classList.add("hidden");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    name: nameInput.value.trim(),
    price: parseFloat(priceInput.value),
    stock: parseInt(stockInput.value || "0", 10),
    description: descInput.value.trim(),
  };
  const editingId = idInput.value;

  try {
    const json = await fetchJson(editingId ? `/${editingId}` : "", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!json.success) throw new Error(json.message);
    resetForm();
    fetchProducts();
  } catch (err) {
    setStatus(`Save failed: ${err.message}`, true);
  }
});

listEl.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("delete-btn")) {
    if (!confirm("Delete this product?")) return;
    try {
      const json = await fetchJson(`/${id}`, { method: "DELETE" });
      if (!json.success) throw new Error(json.message);
      fetchProducts();
    } catch (err) {
      setStatus(`Delete failed: ${err.message}`, true);
    }
  }

  if (e.target.classList.contains("edit-btn")) {
    try {
      const json = await fetchJson(`/${id}`);
      if (!json.success) throw new Error(json.message);
      const p = json.data;
      idInput.value = p._id;
      nameInput.value = p.name;
      priceInput.value = p.price;
      stockInput.value = p.stock;
      descInput.value = p.description || "";
      submitBtn.textContent = "Update Product";
      formTitle.textContent = "Edit Product";
      cancelBtn.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus(`Load failed: ${err.message}`, true);
    }
  }
});

cancelBtn.addEventListener("click", resetForm);

fetchProducts();
