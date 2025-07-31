document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.getElementById('main-menu');
  
  // --- 主選單（漢堡選單）的開關邏輯 ---
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      // 切換 .is-active class 來顯示或隱藏主選單
      mainMenu.classList.toggle('is-active');
    });
  }

  // --- 子選單（下拉選單）的觸控邏輯 ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.querySelectorAll('.navbar .dropdown > a').forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', function (e) {
        // 只有當主選單可見時（即手機版狀態下）才阻止預設行為
        if (mainMenu.classList.contains('is-active')) {
            e.preventDefault();
        }

        const parentLi = this.parentElement;
        const wasOpen = parentLi.classList.contains('open');

        // 先關閉所有其他的下拉選單
        document.querySelectorAll('.navbar .dropdown.open').forEach(openLi => {
          if (openLi !== parentLi) {
            openLi.classList.remove('open');
          }
        });

        // 切換當前點擊的選單狀態
        if (!wasOpen) {
          parentLi.classList.add('open');
        } else {
          parentLi.classList.remove('open');
        }
      });
    });
  }
  
  // --- 點擊 navbar 外部時，收合所有選單 ---
  document.addEventListener('click', function (e) {
    // 如果點擊的目標不是 navbar 內部，也不是漢堡按鈕
    if (!e.target.closest('.navbar')) {
      // 關閉主選單
      if (mainMenu.classList.contains('is-active')) {
        mainMenu.classList.remove('is-active');
      }
      // 關閉所有子選單
      document.querySelectorAll('.navbar .dropdown.open').forEach(li => {
        li.classList.remove('open');
      });
    }
  });
});