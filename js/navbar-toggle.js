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
  // ✨ 這一段是本次修改的核心 ✨
  document.querySelectorAll('.navbar .dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function (e) {
      
      // ✨ 關鍵判斷：只在手機螢幕寬度下，才執行點擊展開/收合的邏輯
      if (window.innerWidth <= 768) {
        e.preventDefault(); // 只在手機上阻止連結的預設跳轉行為

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
      }
      // 在電腦版寬度下 (else)，這個監聽器將不會執行任何動作，
      // 點擊會觸發連結的預設行為，而選單的開合則完全由 CSS 的 :hover 控制。
    });
  });


  // --- 3. 點擊 navbar 外部時，收合所有選單 ---
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.navbar')) {
      if (mainMenu && mainMenu.classList.contains('is-active')) {
        mainMenu.classList.remove('is-active'); // 關閉主選單
      }
      // 在電腦上，我們不希望點擊外部就關閉 hover 的選單，所以這行不動
    }
  });

  // --- 4. 點擊選單內任何連結後，自動收合「手機版」選單並聚焦 ---
  if (mainMenu) {
    const menuLinks = mainMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      const isDropdownToggle = link.parentElement.classList.contains('dropdown') && link.nextElementSibling?.classList.contains('dropdown-menu');
      if (!isDropdownToggle) {
        link.addEventListener('click', () => {
          // 只在手機主選單是開啟的狀態下，才執行收合
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
});