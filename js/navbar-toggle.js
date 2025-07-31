document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.getElementById('main-menu');

  // --- 1. 主選單（漢堡選單）的開關邏輯 ---
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      mainMenu.classList.toggle('is-active');
    });
  }

  // --- 2. 子選單（下拉選單）的觸控邏輯 ---
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

  // --- 3. 點擊 navbar 外部時，收合所有選單 ---
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


  // --- 4. ✨ 新增的邏輯：點擊選單內任何連結後，自動收合選單 ✨ ---
  if (mainMenu) {
    const menuLinks = mainMenu.querySelectorAll('a');

    menuLinks.forEach(link => {
      // 我們不希望點擊那些只用來展開子選單的連結時，主選單就收合
      // 所以要排除掉那些有子選單的連結
      if (!link.parentElement.classList.contains('dropdown')) {
          link.addEventListener('click', () => {
              if (mainMenu.classList.contains('is-active')) {
                  mainMenu.classList.remove('is-active');

                  // 同時也關閉所有已展開的子選單
                  document.querySelectorAll('.navbar .dropdown.open').forEach(openDropdown => {
                      openDropdown.classList.remove('open');
                  });
              }
          });
      }
    });
  }
});