// =======================================================
// FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO DO CARROSSEL
// =======================================================

function initializeCarousel() {
    // 1. Seleção dos novos elementos: Agora selecionamos os itens (imagem + descrição)
    const items = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlideIndex = 0;
    const intervalTime = 4000; // 4 segundos para a troca automática
    let slideInterval;

    // Verificação de segurança (essencial!)
    if (!items.length || !dotsContainer || !prevBtn || !nextBtn) {
        console.warn("Elementos principais do carrossel não encontrados. Verifique as classes no HTML (especialmente '.carousel-item').");
        return;
    }

    // 2. Função para mostrar um slide específico
    function showSlide(index) {
        // Tratamento para voltar ao início/fim quando chega nas pontas
        if (index >= items.length) {
            index = 0;
        } else if (index < 0) {
            index = items.length - 1;
        }
        
        currentSlideIndex = index;

        // Remove 'active' de TODOS os itens do carrossel (imagem + descrição)
        items.forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        // Adiciona 'active' ao item e dot atual
        items[currentSlideIndex].classList.add('active');
        const activeDot = document.querySelector(`.dot[data-index="${currentSlideIndex}"]`);
        if (activeDot) {
             activeDot.classList.add('active');
        }
    }

    // 3. Funções de navegação e reinício do timer (Mantidas)
    function nextSlide() {
        showSlide(currentSlideIndex + 1);
        resetAutoSlide(); 
    }

    function prevSlide() {
        showSlide(currentSlideIndex - 1);
        resetAutoSlide();
    }

    // 4. Funções para automação (Mantidas)
    function startAutoSlide() {
        // Garante que o timer só comece se houver mais de um item
        if (items.length > 1) {
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // 5. Criação dos Dots (Indicadores de Slide)
    function createDots() {
        items.forEach((_, index) => { // Usa 'items' ao invés de 'slides'
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', index);
            
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
    }

    // 6. Configuração dos Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 7. Inicialização
    createDots();
    showSlide(0); // Mostra o primeiro item
    startAutoSlide(); // Inicia a troca automática
}

// GARANTIA: Roda a função principal somente após o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', initializeCarousel);