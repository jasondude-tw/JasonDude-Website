document.addEventListener("DOMContentLoaded", () => {
  // 檢查是否為觸控裝置
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    document.querySelectorAll('.navbar .dropdown > a').forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', function (e) {
        e.preventDefault(); // 阻止連結的預設行為

        const parentLi = this.parentElement;
        const wasOpen = parentLi.classList.contains('open');

        // 步驟 1：先關閉所有其他的下拉選單
        document.querySelectorAll('.navbar .dropdown.open').forEach(openLi => {
          if (openLi !== parentLi) {
            openLi.classList.remove('open');
          }
        });

        // 步驟 2：切換當前點擊的選單狀態
        if (wasOpen) {
          parentLi.classList.remove('open'); // 如果已經是開啟的，就關閉它
        } else {
          parentLi.classList.add('open'); // 如果是關閉的，就開啟它
        }
      });
    });

    // 點擊頁面其他地方時，關閉所有開啟的選單
    document.addEventListener('click', function (e) {
      // 確保點擊的目標不是在 navbar 內部
      if (!e.target.closest('.navbar')) {
        document.querySelectorAll('.navbar .dropdown.open').forEach(li => {
          li.classList.remove('open');
        });
      }
    });
  }
});