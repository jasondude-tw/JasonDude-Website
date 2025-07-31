document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.getElementById('main-menu');
  const mainContent = document.getElementById('main-content');

  // ✨ 1. 建立一個可重複使用的「滾動與聚焦」函式 ✨
  const focusAndScrollToMain = () => {
    if (mainContent) {
      // 使用 scrollIntoView 提供平滑的滾動動畫
      mainContent.scrollIntoView({
        behavior: 'smooth', // 關鍵字：平滑滾動
        block: 'start'      // 將 main 區塊的頂部對齊視窗的頂部
      });

      // 為了最好的可及性(Accessibility)，在滾動後依然設定焦點
      // preventScroll: true 確保 focus() 不會產生第二次的、突兀的滾動
      mainContent.focus({ preventScroll: true }); 
    }
  };


  // --- 2. 主選單（漢堡選單）的開關邏輯 ---
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      mainMenu.classList.toggle('is-active');
    });
  }

  // --- 3. 子選單（下拉選單）的觸控邏輯 (僅手機) ---
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

  // --- 4. 點擊 navbar 外部時，收合所有選單 ---
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.navbar')) {
      if (mainMenu && mainMenu.classList.contains('is-active')) {
        mainMenu.classList.remove('is-active');
      }
    }
  });

  // --- 5. 點擊「手機版」選單內任何連結後，自動收合選單並滾動聚焦 ---
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
            focusAndScrollToMain(); // ✨ 呼叫我們的函式
          }
        });
      }
    });
  }

  // --- 6. 點擊「電腦版」子選單項目後，立即收合選單並滾動聚焦 ---
  const dropdownLinks = document.querySelectorAll('.navbar .dropdown-menu a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth > 768) {
        const parentDropdown = link.closest('li.dropdown');
        if (parentDropdown) {
          parentDropdown.style.pointerEvents = 'none';
          parentDropdown.addEventListener('mouseleave', () => {
            parentDropdown.style.pointerEvents = 'auto';
          }, { once: true });
        }
        focusAndScrollToMain(); // ✨ 在這裡也呼叫我們的函式
      }
    });
  });
});