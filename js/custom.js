/* 右下方按钮：一键到底 点击逻辑 */
document.addEventListener('DOMContentLoaded', function () {
  const goDownBtn = document.getElementById('go-down');
  if (goDownBtn) {
    goDownBtn.addEventListener('click', function () {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
});
