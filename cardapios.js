
//side bar funcional
const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-icon'); // ID do botão de menu no HTML
    const closeBtn = document.getElementById('close-sidebar');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            sidebar.style.left = '0';
        });
    } else {
        console.warn("Elemento com ID 'menu-icon' não encontrado. O botão de menu pode não funcionar.");
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.style.left = '-250px';
        });
    } else {
        console.warn("Elemento com ID 'close-sidebar' não encontrado.");
    }