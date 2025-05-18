document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ 自定义 Tooltip 脚本已加载')

  const tooltip = document.createElement('div')
  tooltip.className = 'custom-tooltip'
  document.body.appendChild(tooltip)

  document.querySelectorAll('#footer-wrap img[title]').forEach(img => {
    const titleText = img.getAttribute('title')
    img.removeAttribute('title')
    img.dataset.tooltip = titleText

    img.addEventListener('mouseenter', e => {
      tooltip.textContent = titleText
      tooltip.style.display = 'block'
    })

    img.addEventListener('mousemove', e => {
      tooltip.style.left = e.pageX + 10 + 'px'
      tooltip.style.top = e.pageY + 10 + 'px'
    })

    img.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none'
    })
  })
})
