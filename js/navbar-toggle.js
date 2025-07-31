document.addEventListener("DOMContentLoaded", () => {
  // 檢查是否為觸控裝置
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    document.querySelectorAll('.navbar .dropdown > a').forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', function (e) {
        e.preventDefault();

        const parentLi = this.parentElement;
        const isOpen = parentLi.classList.contains('open');

        // 關閉其他開啟的
        document.querySelectorAll('.navbar .dropdown').forEach(li => li.classList.remove('open'));

        if (!isOpen) {
          parentLi.classList.add('open');
        }
      });
    });

    // 點擊 navbar 外部時收合
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.navbar')) {
        document.querySelectorAll('.navbar .dropdown').forEach(li => li.classList.remove('open'));
      }
    });
  }
});