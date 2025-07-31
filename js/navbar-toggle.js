document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.getElementById('main-menu');
  const mainContent = document.getElementById('main-content');

  // --- 1. 主選單（漢堡選單）的開關邏輯 ---
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      mainMenu.classList.toggle('is-active');
    });
  }

  // --- 2. 子選單（下拉選單）的觸控邏輯 ---
  document.querySelectorAll('.navbar .dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
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
      }
    });
  });

  // --- 3. 點擊 navbar 外部時，收合所有選單 ---
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.navbar')) {
      if (mainMenu && mainMenu.classList.contains('is-active')) {
        mainMenu.classList.remove('is-active');
      }
    }
  });

  // --- 4. 點擊選單內任何連結後，自動收合「手機版」選單並聚焦 ---
  if (mainMenu) {
    const menuLinks = mainMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      const isDropdownToggle = link.parentElement.classList.contains('dropdown') && link.nextElementSibling?.classList.contains('dropdown-menu');
      if (!isDropdownToggle) {
        link.addEventListener('click', () => {
          if (mainMenu.classList.contains('is-active')) {
            mainMenu.classList.remove('is-active');
            document.querySelectorAll('.navbar .dropdown.open').forEach(openDropdown => {
              openDropdown.classList.remove('open');
            });
            if (mainContent) {
              setTimeout(() => { mainContent.focus(); }, 0);
            }
          }
        });
      }
    });
  }

  // --- 5. ✨ 新增的邏輯：電腦版點擊子選單項目後，立即收合選單 ✨ ---
  const dropdownLinks = document.querySelectorAll('.navbar .dropdown-menu a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      // 這段邏輯只在電腦版寬度下有意義
      if (window.innerWidth > 768) {
        const parentDropdown = link.closest('li.dropdown');
        if (parentDropdown) {
          // 暫時禁用滑鼠事件，讓 :hover 失效，選單就會收合
          parentDropdown.style.pointerEvents = 'none';

          // 當滑鼠移開後，再重新啟用滑鼠事件，以便下次還能懸停
          parentDropdown.addEventListener('mouseleave', () => {
            parentDropdown.style.pointerEvents = 'auto';
          }, { once: true }); // 這個事件只監聽一次，執行完就自動移除
        }
      }
    });
  });
});