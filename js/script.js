document.addEventListener("DOMContentLoaded", function () {
  // Aktifkan feather icons
  feather.replace();

  // Deklarasi element
  const searchIcon = document.getElementById("searchIcon");
  const cartIcon = document.getElementById("cartIcon");
  const userIcon = document.getElementById("userIcon");

  const searchForm = document.getElementById("searchForm");
  const cartContainer = document.getElementById("cartContainer");
  const userDropdown = document.getElementById("userDropdown");

  const menuBar = document.getElementById("menu-bar");
  const navbarMenu = document.querySelector(".navbar ul");

  // Menu toggle
  menuBar.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
  });

  // Fungsi tutup semua
  function closeAll() {
    searchForm.style.display = "none";
    cartContainer.style.display = "none";
    userDropdown.style.display = "none";
  }

  // Toggle Search
  searchIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isVisible = searchForm.style.display === "block";
    closeAll();
    if (!isVisible) searchForm.style.display = "block";
  });

  // Search Input Enter
  document
    .getElementById("searchInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const keyword = e.target.value.toLowerCase();
        window.location.href = `product.html?search=${keyword}`;
        console.log("Kata kunci pencarian:", keyword);
      }
    });

  // ================== Render Cart ==================
  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItemsContainer.innerHTML = ""; // Kosongkan isi sebelumnya
    let total = 0;

    if (cart.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Keranjang kosong";
      cartItemsContainer.appendChild(li);
    } else {
      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${item.name} x${item.qty} - Rp ${item.price * item.qty}</span>
          <button class="remove-item" data-index="${index}">Hapus</button>
        `;
        cartItemsContainer.appendChild(li);
        total += item.price * item.qty;
      });
    }

    cartTotal.textContent = total;

    // Event tombol hapus
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Refresh cart
      });
    });
  }

  // Toggle Cart
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isVisible = cartContainer.style.display === "block";
    closeAll();
    if (!isVisible) {
      cartContainer.style.display = "block";
      renderCart();
    }
  });

  // Toggle User
  userIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isVisible = userDropdown.style.display === "block";
    closeAll();
    if (!isVisible) userDropdown.style.display = "block";
  });

  // Tutup semua jika klik di luar
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".icons") &&
      !e.target.closest(".search-form") &&
      !e.target.closest(".cart-container") &&
      !e.target.closest(".user-dropdown")
    ) {
      closeAll();
    }
  });

  // Tombol menuju halaman produk
  const seeProductBtn = document.getElementById("see-product-btn");
  if (seeProductBtn) {
    seeProductBtn.addEventListener("click", function () {
      window.location.href = "product.html";
    });
  }

  // ================== Tambah Produk ke Cart ==================
  document.querySelectorAll(".cart-icon").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      let card = this.closest(".card");
      let name = card.getAttribute("data-name");
      let price = parseInt(card.getAttribute("data-price"));

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ name: name, price: price, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      alert(`${name} berhasil ditambahkan ke keranjang!`);
    });
  });
});
