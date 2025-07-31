function loadModule(moduleName) {
  const path = `modules/${moduleName}.html`;

  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error("頁面載入失敗");
      return res.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch(err => {
      document.getElementById("content").innerHTML = `<p style="color:red;">錯誤：${err.message}</p>`;
    });
}

// 初始載入
window.addEventListener("DOMContentLoaded", () => {
  loadModule("home");

  // 綁定所有導覽列連結
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const moduleName = e.target.getAttribute("data-module");
      if (moduleName) loadModule(moduleName);
    });
  });
});
