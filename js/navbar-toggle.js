document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.getElementById('main-menu');
  const mainContent = document.getElementById('main-content'); // ✨ 1. 選取我們新增的 main 區域

  // --- 主選單（漢堡選單）的開關邏輯 ---
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      mainMenu.classList.toggle('is-active');
    });
  }

  // --- 子選單（下拉選單）的觸控邏輯 ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.querySelectorAll('.navbar .dropdown > a').forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
        }
        const parentLi = this.parentElement;
        const wasOpen = parentLi.classList.contains('open');
        document.querySelectorAll('.navbar .dropdown.open').forEach(openLi => {
          if (openLi !== parentLi) {
            openLi.classList.remove('open');
          }
        });
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
    if (!e.target.closest('.navbar')) {
      if (mainMenu && mainMenu.classList.contains('is-active')) {
        mainMenu.classList.remove('is-active');
      }
      document.querySelectorAll('.navbar .dropdown.open').forEach(li => {
        li.classList.remove('open');
      });
    }
  });

  // --- 點擊選單內任何連結後，自動收合選單並聚焦 ---
  if (mainMenu) {
    const menuLinks = mainMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      // 確保點擊的不是只用來展開子選單的連結
      const isDropdownToggle = link.parentElement.classList.contains('dropdown') && link.nextElementSibling?.classList.contains('dropdown-menu');

      if (!isDropdownToggle) {
        link.addEventListener('click', () => {
          if (mainMenu.classList.contains('is-active')) {
            mainMenu.classList.remove('is-active');
            document.querySelectorAll('.navbar .dropdown.open').forEach(openDropdown => {
              openDropdown.classList.remove('open');
            });
            
            // ✨ 2. 在選單收合後，聚焦到 main 區域
            if (mainContent) {
              // 使用 setTimeout 確保在瀏覽器完成渲染後再聚焦
              setTimeout(() => {
                mainContent.focus();
              }, 0);
            }
          }
        });
      }
    });
  }
});