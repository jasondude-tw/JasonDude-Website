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


//手機裝置時啟用點擊 toggle
document.addEventListener("DOMContentLoaded", () => {
  // 判斷是否觸控裝置（手機/平板）
  const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    document.querySelectorAll('.navbar .dropdown > a').forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault(); // 防止點擊跳轉

        const parentLi = this.parentElement;
        const isOpen = parentLi.classList.contains('open');

        // 先關閉所有展開的選單
        document.querySelectorAll('.navbar .dropdown').forEach(li => li.classList.remove('open'));

        // 如果剛剛是關的，則打開它
        if (!isOpen) {
          parentLi.classList.add('open');
        }
      });
    });

    // 點擊 navbar 外區塊自動收合
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar')) {
        document.querySelectorAll('.navbar .dropdown').forEach(li => li.classList.remove('open'));
      }
    });
  }
});