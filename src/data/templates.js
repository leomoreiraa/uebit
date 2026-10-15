import { BASE_CSS, createInitialCode } from '../lib/code-engine.js'

export const TEMPLATES = [
  {
    id: 'quiz-game',
    name: 'Quiz & Mini-Game Interativo',
    description: 'Jogo completo de perguntas e respostas com placar de pontos, alternativas e blocos que reagem em tempo real!',
    badge: 'Interação & Lógica',
    color: 'emerald',
    tagColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-500 border-emerald-800',
    icon: 'Gamepad2',
    code: {
      html: `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz & Mini-Game Interativo</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <main class="site" data-site-root>
    <div id="quiz-card" data-block-id="quiz-card" class="container site-block" data-name="Tabuleiro do Quiz" style="background-color: #f0fdf4; border-radius: 28px; border: 4px solid #10b981; padding: 32px; align-items: center; justify-content: center; text-align: center; gap: 20px;">
      
      <div id="quiz-header" data-block-id="quiz-header" class="container site-block" data-name="Cabeçalho do Jogo" style="background: transparent; border: none; padding: 0; align-items: center; gap: 8px;">
        <p id="quiz-fase" data-block-id="quiz-fase" class="paragraph site-block" data-name="Fase do Jogo" style="color: #047857; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0; padding: 0;">🎮 Desafio do Reino Animal · Fase 1</p>
        <h1 id="quiz-pergunta" data-block-id="quiz-pergunta" class="heading site-block" data-name="Pergunta Principal" style="color: #064e3b; font-size: 28px; font-weight: 900; margin: 0; padding: 0;">Qual é o animal terrestre mais veloz do mundo? 🐆</h1>
      </div>

      <div id="quiz-placar" data-block-id="quiz-placar" class="container site-block" data-name="Barra de Placar" style="flex-direction: row; justify-content: center; align-items: center; gap: 20px; background-color: #ffffff; border-radius: 18px; border: 2px solid #a7f3d0; padding: 12px 28px;">
        <p id="quiz-pontos" data-block-id="quiz-pontos" class="paragraph site-block" data-name="Pontuação" style="color: #065f46; font-size: 16px; font-weight: 800; margin: 0; padding: 0;">⭐ Pontos: 0</p>
        <p id="quiz-tentativas" data-block-id="quiz-tentativas" class="paragraph site-block" data-name="Dica da Rodada" style="color: #059669; font-size: 14px; font-weight: 600; margin: 0; padding: 0;">🎯 Escolha com atenção!</p>
      </div>

      <div id="quiz-opcoes" data-block-id="quiz-opcoes" class="container site-block" data-name="Alternativas" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 14px; background: transparent; border: none; padding: 4px; width: 100%;">
        <button id="btn-opcao-a" data-block-id="btn-opcao-a" class="button site-block" data-name="Opção A (Tartaruga)" style="background-color: #3b82f6; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 16px; padding: 16px 26px; border-bottom: 5px solid #1d4ed8; cursor: pointer;">🐢 A) Tartaruga Marinha</button>
        <button id="btn-opcao-b" data-block-id="btn-opcao-b" class="button site-block" data-name="Opção B (Guepardo)" style="background-color: #10b981; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 16px; padding: 16px 26px; border-bottom: 5px solid #047857; cursor: pointer;">🐆 B) Guepardo Africano</button>
        <button id="btn-opcao-c" data-block-id="btn-opcao-c" class="button site-block" data-name="Opção C (Elefante)" style="background-color: #f59e0b; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 16px; padding: 16px 26px; border-bottom: 5px solid #b45309; cursor: pointer;">🐘 C) Elefante Savana</button>
      </div>

      <div id="quiz-feedback" data-block-id="quiz-feedback" class="container site-block" data-name="Caixa de Resposta" style="background-color: #fef3c7; border-radius: 20px; border: 3px dashed #f59e0b; padding: 22px; width: 100%; max-width: 580px; align-items: center; gap: 8px;">
        <h2 id="feedback-titulo" data-block-id="feedback-titulo" class="heading site-block" data-name="Título da Resposta" style="color: #92400e; font-size: 20px; font-weight: 800; margin: 0; padding: 0;">Dica do Explorador 🧭</h2>
        <p id="feedback-texto" data-block-id="feedback-texto" class="paragraph site-block" data-name="Texto da Resposta" style="color: #78350f; font-size: 15px; line-height: 1.6; margin: 0; padding: 0;">Clique em uma das 3 alternativas acima para conferir se você acertou e somar pontos!</p>
      </div>

      <div id="quiz-acoes" data-block-id="quiz-acoes" class="container site-block" data-name="Ações Finais" style="flex-direction: row; justify-content: center; gap: 12px; background: transparent; border: none; padding: 0;">
        <button id="btn-reiniciar-quiz" data-block-id="btn-reiniciar-quiz" class="button site-block" data-name="Botão Reiniciar" style="background-color: #64748b; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 14px; padding: 10px 22px; border-bottom: 3px solid #334155; cursor: pointer;">🔄 Reiniciar Quiz</button>
      </div>

    </div>
  </main>
</body>
</html>`,
      css: BASE_CSS,
      js: `// JavaScript dá vida à sua página. Escreva suas ações aqui.

// UEBIT-BLOCKLY:START
(() => {
let __uebitLoopBudget = 10000;
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-opcao-b\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"quiz-pontos\\"]").forEach(node => { node.textContent = '⭐ Pontos: 100 (Acertou!)'; });
document.querySelectorAll("[data-block-id=\\"feedback-titulo\\"]").forEach(node => { node.textContent = '🎉 Resposta Correta!'; });
document.querySelectorAll("[data-block-id=\\"feedback-texto\\"]").forEach(node => { node.textContent = 'Sensacional! O guepardo pode ultrapassar 110 km/h em poucos segundos na savana!'; });
document.querySelectorAll("[data-block-id=\\"quiz-feedback\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-opcao-a\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"feedback-titulo\\"]").forEach(node => { node.textContent = '😅 Quase lá...'; });
document.querySelectorAll("[data-block-id=\\"feedback-texto\\"]").forEach(node => { node.textContent = 'A tartaruga marinha é uma nadadora veloz, mas em terra ela anda devagarzinho!'; });
document.querySelectorAll("[data-block-id=\\"quiz-feedback\\"]").forEach(node => { node.style.backgroundColor = "#facc15"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-opcao-c\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"feedback-titulo\\"]").forEach(node => { node.textContent = '🐘 Tente novamente!'; });
document.querySelectorAll("[data-block-id=\\"feedback-texto\\"]").forEach(node => { node.textContent = 'O elefante é o maior animal terrestre, mas não consegue correr tão rápido quanto o guepardo!'; });
document.querySelectorAll("[data-block-id=\\"quiz-feedback\\"]").forEach(node => { node.style.backgroundColor = "#facc15"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-reiniciar-quiz\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"quiz-pontos\\"]").forEach(node => { node.textContent = '⭐ Pontos: 0'; });
document.querySelectorAll("[data-block-id=\\"feedback-titulo\\"]").forEach(node => { node.textContent = 'Dica do Explorador 🧭'; });
document.querySelectorAll("[data-block-id=\\"feedback-texto\\"]").forEach(node => { node.textContent = 'Clique em uma das 3 alternativas acima para conferir se você acertou e somar pontos!'; });
document.querySelectorAll("[data-block-id=\\"quiz-feedback\\"]").forEach(node => { node.style.backgroundColor = "#ffffff"; });
}
});

})();
// UEBIT-BLOCKLY:END
`,
    },
    blockProject: {
      workspace: {
        blocks: {
          languageVersion: 0,
          blocks: [
            {
              type: 'site_click_element',
              id: 'quiz_click_correct',
              x: 40,
              y: 40,
              fields: { TARGET: 'btn-opcao-b' },
              inputs: {
                DO: {
                  block: {
                    type: 'site_text_element',
                    id: 'quiz_txt_pontos',
                    fields: { TARGET: 'quiz-pontos' },
                    inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '⭐ Pontos: 100 (Acertou!)' } } } },
                    next: {
                      block: {
                        type: 'site_text_element',
                        id: 'quiz_txt_tit',
                        fields: { TARGET: 'feedback-titulo' },
                        inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '🎉 Resposta Correta!' } } } },
                        next: {
                          block: {
                            type: 'site_text_element',
                            id: 'quiz_txt_exp',
                            fields: { TARGET: 'feedback-texto' },
                            inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Sensacional! O guepardo pode ultrapassar 110 km/h em poucos segundos na savana!' } } } },
                            next: {
                              block: {
                                type: 'site_background_element',
                                id: 'quiz_bg_correct',
                                fields: { TARGET: 'quiz-feedback', COLOR: '#15803d' },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
      generated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id=\\"btn-opcao-b\\"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id=\\"quiz-pontos\\"]").forEach(node => { node.textContent = '⭐ Pontos: 100 (Acertou!)'; });\ndocument.querySelectorAll("[data-block-id=\\"feedback-titulo\\"]").forEach(node => { node.textContent = '🎉 Resposta Correta!'; });\ndocument.querySelectorAll("[data-block-id=\\"feedback-texto\\"]").forEach(node => { node.textContent = 'Sensacional! O guepardo pode ultrapassar 110 km/h em poucos segundos na savana!'; });\ndocument.querySelectorAll("[data-block-id=\\"quiz-feedback\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
      applied: `// UEBIT-BLOCKLY:START\n(() => {\nlet __uebitLoopBudget = 10000;\ndocument.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id=\\"btn-opcao-b\\"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id=\\"quiz-pontos\\"]").forEach(node => { node.textContent = '⭐ Pontos: 100 (Acertou!)'; });\ndocument.querySelectorAll("[data-block-id=\\"feedback-titulo\\"]").forEach(node => { node.textContent = '🎉 Resposta Correta!'; });\ndocument.querySelectorAll("[data-block-id=\\"feedback-texto\\"]").forEach(node => { node.textContent = 'Sensacional! O guepardo pode ultrapassar 110 km/h em poucos segundos na savana!'; });\ndocument.querySelectorAll("[data-block-id=\\"quiz-feedback\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n\n})();\n// UEBIT-BLOCKLY:END`,
      appliedGenerated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id=\\"btn-opcao-b\\"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id=\\"quiz-pontos\\"]").forEach(node => { node.textContent = '⭐ Pontos: 100 (Acertou!)'; });\ndocument.querySelectorAll("[data-block-id=\\"feedback-titulo\\"]").forEach(node => { node.textContent = '🎉 Resposta Correta!'; });\ndocument.querySelectorAll("[data-block-id=\\"feedback-texto\\"]").forEach(node => { node.textContent = 'Sensacional! O guepardo pode ultrapassar 110 km/h em poucos segundos na savana!'; });\ndocument.querySelectorAll("[data-block-id=\\"quiz-feedback\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
    },
  },
  {
    id: 'portfolio',
    name: 'Portfólio de Desenhos & Fotos',
    description: 'Galeria visual moderna com banner de artista, fotos em Flexbox lado a lado, crachás de habilidades e botão interativo de curtidas!',
    badge: 'Design & Estilo',
    color: 'blue',
    tagColor: 'bg-blue-100 text-blue-950 border-blue-300',
    buttonColor: 'bg-blue-600 hover:bg-blue-500 border-blue-800',
    icon: 'Palette',
    code: {
      html: `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfólio de Desenhos & Fotos</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <main class="site" data-site-root>
    <div id="perfil-banner" data-block-id="perfil-banner" class="container site-block" data-name="Banner do Artista" style="background-color: #eff6ff; border-radius: 28px; border: 3px solid #3b82f6; padding: 32px; align-items: center; justify-content: center; text-align: center; gap: 16px;">
      <img id="avatar-artista" data-block-id="avatar-artista" class="image site-block" data-name="Foto do Artista" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" alt="Avatar da Artista" style="width: 120px; height: 120px; border-radius: 9999px; border: 4px solid #2563eb; object-fit: cover;">
      <h1 id="nome-artista" data-block-id="nome-artista" class="heading site-block" data-name="Nome da Artista" style="color: #1e3a8a; font-size: 32px; font-weight: 900; margin: 0; padding: 0;">Ateliê Criativo da Bia 🎨</h1>
      <p id="bio-artista" data-block-id="bio-artista" class="paragraph site-block" data-name="Biografia" style="color: #1e40af; font-size: 16px; max-width: 600px; margin: 0; padding: 0;">Ilustradora digital e fotógrafa de 11 anos. Adoro misturar cores vibrantes, animais fantásticos e paisagens mágicas.</p>
      
      <div id="tags-artista" data-block-id="tags-artista" class="container site-block" data-name="Crachás" style="flex-direction: row; justify-content: center; gap: 10px; flex-wrap: wrap; background: transparent; border: none; padding: 4px;">
        <button id="tag-1" data-block-id="tag-1" class="button site-block" data-name="Tag Aquarela" style="background-color: #dbeafe; color: #1e40af; border-radius: 9999px; font-weight: 800; font-size: 13px; padding: 6px 16px; border: 1px solid #bfdbfe;">✨ Aquarela Digital</button>
        <button id="tag-2" data-block-id="tag-2" class="button site-block" data-name="Tag Personagens" style="background-color: #dbeafe; color: #1e40af; border-radius: 9999px; font-weight: 800; font-size: 13px; padding: 6px 16px; border: 1px solid #bfdbfe;">🖌️ Personagens Fofos</button>
        <button id="tag-3" data-block-id="tag-3" class="button site-block" data-name="Tag Fotografia" style="background-color: #dbeafe; color: #1e40af; border-radius: 9999px; font-weight: 800; font-size: 13px; padding: 6px 16px; border: 1px solid #bfdbfe;">📸 Fotografia Urbana</button>
      </div>

      <div id="box-curtidas" data-block-id="box-curtidas" class="container site-block" data-name="Caixa de Curtidas" style="flex-direction: row; justify-content: center; align-items: center; gap: 14px; background-color: #ffffff; border-radius: 20px; border: 2px solid #bfdbfe; padding: 12px 24px;">
        <button id="btn-curtir-galeria" data-block-id="btn-curtir-galeria" class="button site-block" data-name="Botão Curtir" style="background-color: #ec4899; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 15px; padding: 10px 22px; border-bottom: 4px solid #be185d; cursor: pointer;">❤️ Curtir Ateliê</button>
        <p id="txt-contador-curtidas" data-block-id="txt-contador-curtidas" class="paragraph site-block" data-name="Contador de Curtidas" style="color: #be185d; font-size: 15px; font-weight: 800; margin: 0; padding: 0;">💖 128 pessoas amaram este ateliê!</p>
      </div>
    </div>

    <div id="galeria-secao" data-block-id="galeria-secao" class="container site-block" data-name="Seção da Galeria" style="background-color: #f8fafc; border-radius: 24px; border: 2px solid #cbd5e1; padding: 24px; gap: 20px;">
      <h2 id="galeria-titulo" data-block-id="galeria-titulo" class="heading site-block" data-name="Título da Galeria" style="color: #0f172a; font-size: 24px; font-weight: 900; margin: 0; padding: 0;">Obras em Destaque 🖼️</h2>
      
      <div id="galeria-grid" data-block-id="galeria-grid" class="container site-block" data-name="Grade Flexbox de Obras" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 20px; background: transparent; border: none; padding: 0;">
        
        <div id="card-obra-1" data-block-id="card-obra-1" class="container site-block" data-name="Cartão Obra 1" style="background-color: #ffffff; border-radius: 20px; border: 2px solid #e2e8f0; padding: 16px; width: 280px; gap: 10px;">
          <img id="img-obra-1" data-block-id="img-obra-1" class="image site-block" data-name="Imagem Obra 1" src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80" alt="Explosão de Cores" style="border-radius: 14px; height: 180px; object-fit: cover;">
          <h3 id="titulo-obra-1" data-block-id="titulo-obra-1" class="heading site-block" data-name="Título Obra 1" style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0; padding: 0;">Explosão Cósmica 🌈</h3>
          <p id="desc-obra-1" data-block-id="desc-obra-1" class="paragraph site-block" data-name="Descrição Obra 1" style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0; padding: 0;">Pintura abstrata explorando misturas de tintas a óleo e tons quentes.</p>
        </div>

        <div id="card-obra-2" data-block-id="card-obra-2" class="container site-block" data-name="Cartão Obra 2" style="background-color: #ffffff; border-radius: 20px; border: 2px solid #e2e8f0; padding: 16px; width: 280px; gap: 10px;">
          <img id="img-obra-2" data-block-id="img-obra-2" class="image site-block" data-name="Imagem Obra 2" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" alt="Dimensão Geométrica" style="border-radius: 14px; height: 180px; object-fit: cover;">
          <h3 id="titulo-obra-2" data-block-id="titulo-obra-2" class="heading site-block" data-name="Título Obra 2" style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0; padding: 0;">Dimensão Neon 🔮</h3>
          <p id="desc-obra-2" data-block-id="desc-obra-2" class="paragraph site-block" data-name="Descrição Obra 2" style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0; padding: 0;">Modelagem 3D com luzes suaves e gradientes de cores do futuro.</p>
        </div>

        <div id="card-obra-3" data-block-id="card-obra-3" class="container site-block" data-name="Cartão Obra 3" style="background-color: #ffffff; border-radius: 20px; border: 2px solid #e2e8f0; padding: 16px; width: 280px; gap: 10px;">
          <img id="img-obra-3" data-block-id="img-obra-3" class="image site-block" data-name="Imagem Obra 3" src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80" alt="Aurora dos Sonhos" style="border-radius: 14px; height: 180px; object-fit: cover;">
          <h3 id="titulo-obra-3" data-block-id="titulo-obra-3" class="heading site-block" data-name="Título Obra 3" style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0; padding: 0;">Aurora Mágica 🌌</h3>
          <p id="desc-obra-3" data-block-id="desc-obra-3" class="paragraph site-block" data-name="Descrição Obra 3" style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0; padding: 0;">Fotografia noturna capturando luzes celestes cintilantes no horizonte.</p>
        </div>

      </div>

      <div id="rodape-contato" data-block-id="rodape-contato" class="container site-block" data-name="Rodapé de Contato" style="flex-direction: row; justify-content: center; gap: 14px; background: transparent; border: none; padding: 8px;">
        <button id="btn-mensagem" data-block-id="btn-mensagem" class="button site-block" data-name="Botão Mensagem" style="background-color: #3b82f6; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 14px; padding: 10px 22px; border-bottom: 3px solid #1d4ed8; cursor: pointer;">💌 Enviar Mensagem para a Bia</button>
      </div>
    </div>
  </main>
</body>
</html>`,
      css: BASE_CSS,
      js: `// JavaScript dá vida à sua página. Escreva suas ações aqui.

// UEBIT-BLOCKLY:START
(() => {
let __uebitLoopBudget = 10000;
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-curtir-galeria\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"txt-contador-curtidas\\"]").forEach(node => { node.textContent = '🎉 Você curtiu o ateliê! Total: 129 curtidas!'; });
document.querySelectorAll("[data-block-id=\\"btn-curtir-galeria\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });
document.querySelectorAll("[data-block-id=\\"btn-curtir-galeria\\"]").forEach(node => { node.textContent = '✓ Galeria Curtida!'; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-mensagem\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"bio-artista\\"]").forEach(node => { node.textContent = 'Obrigado pelo carinho! Mensagem enviada para o caderno de artes da Bia! ✨'; });
}
});

})();
// UEBIT-BLOCKLY:END
`,
    },
    blockProject: {
      workspace: {
        blocks: {
          languageVersion: 0,
          blocks: [
            {
              type: 'site_click_element',
              id: 'art_click_like',
              x: 40,
              y: 40,
              fields: { TARGET: 'btn-curtir-galeria' },
              inputs: {
                DO: {
                  block: {
                    type: 'site_text_element',
                    id: 'art_txt_like',
                    fields: { TARGET: 'txt-contador-curtidas' },
                    inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '🎉 Você curtiu o ateliê! Total: 129 curtidas!' } } } },
                    next: {
                      block: {
                        type: 'site_background_element',
                        id: 'art_bg_like',
                        fields: { TARGET: 'btn-curtir-galeria', COLOR: '#15803d' },
                        next: {
                          block: {
                            type: 'site_text_element',
                            id: 'art_btn_text',
                            fields: { TARGET: 'btn-curtir-galeria' },
                            inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '✓ Galeria Curtida!' } } } },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
      generated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id=\\"btn-curtir-galeria\\"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id=\\"txt-contador-curtidas\\"]").forEach(node => { node.textContent = '🎉 Você curtiu o ateliê! Total: 129 curtidas!'; });\ndocument.querySelectorAll("[data-block-id=\\"btn-curtir-galeria\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\ndocument.querySelectorAll("[data-block-id=\\"btn-curtir-galeria\\"]").forEach(node => { node.textContent = '✓ Galeria Curtida!'; });\n}\n});\n`,
      applied: `// UEBIT-BLOCKLY:START\n(() => {\nlet __uebitLoopBudget = 10000;\ndocument.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id=\\"btn-curtir-galeria\\"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id=\\"txt-contador-curtidas\\"]").forEach(node => { node.textContent = '🎉 Você curtiu o ateliê! Total: 129 curtidas!'; });\ndocument.querySelectorAll("[data-block-id=\\"btn-curtir-galeria\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\ndocument.querySelectorAll("[data-block-id=\\"btn-curtir-galeria\\"]").forEach(node => { node.textContent = '✓ Galeria Curtida!'; });\n}\n});\n\n})();\n// UEBIT-BLOCKLY:END`,
      appliedGenerated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id=\\"btn-curtir-galeria\\"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id=\\"txt-contador-curtidas\\"]").forEach(node => { node.textContent = '🎉 Você curtiu o ateliê! Total: 129 curtidas!'; });\ndocument.querySelectorAll("[data-block-id=\\"btn-curtir-galeria\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\ndocument.querySelectorAll("[data-block-id=\\"btn-curtir-galeria\\"]").forEach(node => { node.textContent = '✓ Galeria Curtida!'; });\n}\n});\n`,
    },
  },
  {
    id: 'space-story',
    name: 'História Interativa Espacial',
    description: 'Uma jornada pelo cosmos! Escolha rotas com botões coloridos e descubra múltiplos finais estelares programados em blocos.',
    badge: 'Aventura & Escolhas',
    color: 'purple',
    tagColor: 'bg-purple-100 text-purple-950 border-purple-300',
    buttonColor: 'bg-purple-600 hover:bg-purple-500 border-purple-800',
    icon: 'Rocket',
    code: {
      html: `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>História Interativa Espacial</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <main class="site" data-site-root>
    <div id="nave-cockpit" data-block-id="nave-cockpit" class="container site-block" data-name="Cockpit da Nave" style="background-color: #0f172a; border-radius: 28px; border: 3px solid #8b5cf6; padding: 32px; gap: 20px; align-items: center; text-align: center;">
      
      <div id="missao-cabecalho" data-block-id="missao-cabecalho" class="container site-block" data-name="Cabeçalho da Missão" style="background: transparent; border: none; padding: 0; align-items: center; gap: 8px;">
        <p id="missao-status-tag" data-block-id="missao-status-tag" class="paragraph site-block" data-name="Etiqueta da Missão" style="color: #c084fc; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin: 0; padding: 0;">🚀 Missão Interestelar · Apollo-X</p>
        <h1 id="missao-titulo" data-block-id="missao-titulo" class="heading site-block" data-name="Título do Capítulo" style="color: #f8fafc; font-size: 30px; font-weight: 900; margin: 0; padding: 0;">O Mistério do Asteróide X-99 🪐</h1>
      </div>

      <img id="missao-imagem" data-block-id="missao-imagem" class="image site-block" data-name="Foto do Espaço" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80" alt="Nebulosa Cósmica no Espaço Profundo" style="border-radius: 20px; border: 3px solid #6366f1; max-height: 280px; object-fit: cover; width: 100%;">

      <div id="narrativa-box" data-block-id="narrativa-box" class="container site-block" data-name="Caixa de Diálogo" style="background-color: #1e1b4b; border-radius: 22px; border: 2px solid #818cf8; padding: 24px; width: 100%; max-width: 680px; align-items: center; gap: 10px;">
        <h2 id="narrativa-titulo" data-block-id="narrativa-titulo" class="heading site-block" data-name="Título da Narrativa" style="color: #a5b4fc; font-size: 20px; font-weight: 800; margin: 0; padding: 0;">Capitão no Comando! 📡</h2>
        <p id="narrativa-texto" data-block-id="narrativa-texto" class="paragraph site-block" data-name="Texto da História" style="color: #e0e7ff; font-size: 16px; line-height: 1.7; margin: 0; padding: 0;">O radar de bordo captou um sinal pulsante de rádio vindo de uma cratera de gelo cósmico. A tripulação aguarda sua decisão: qual rota a nave deve seguir?</p>
      </div>

      <div id="botoes-decisao" data-block-id="botoes-decisao" class="container site-block" data-name="Opções de Rota" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 14px; background: transparent; border: none; padding: 4px; width: 100%;">
        <button id="btn-rota-pouso" data-block-id="btn-rota-pouso" class="button site-block" data-name="Rota 1 (Pousar)" style="background-color: #2563eb; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 14px 22px; border-bottom: 5px solid #1d4ed8; cursor: pointer;">🪐 1. Pousar e Explorar a Cratera</button>
        <button id="btn-rota-escudos" data-block-id="btn-rota-escudos" class="button site-block" data-name="Rota 2 (Escudos)" style="background-color: #d97706; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 14px 22px; border-bottom: 5px solid #b45309; cursor: pointer;">🛡️ 2. Acionar Escudos e Escanear</button>
        <button id="btn-rota-salto" data-block-id="btn-rota-salto" class="button site-block" data-name="Rota 3 (Hiperespaço)" style="background-color: #9333ea; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 14px 22px; border-bottom: 5px solid #7e22ce; cursor: pointer;">⚡ 3. Ativar Salto para o Hiperespaço</button>
      </div>

      <div id="painel-status-nave" data-block-id="painel-status-nave" class="container site-block" data-name="Status da Nave" style="flex-direction: row; justify-content: space-between; align-items: center; background-color: #020617; border-radius: 18px; border: 2px solid #334155; padding: 14px 24px; width: 100%; max-width: 680px;">
        <p id="txt-status-nave" data-block-id="txt-status-nave" class="paragraph site-block" data-name="Texto de Status" style="color: #38bdf8; font-size: 14px; font-weight: 800; margin: 0; padding: 0;">📊 Escudos: 100% · Combustível: Estável · Tripulação: Pronta</p>
        <button id="btn-reiniciar-missao" data-block-id="btn-reiniciar-missao" class="button site-block" data-name="Botão Reiniciar Missão" style="background-color: #475569; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 12px; padding: 8px 16px; border-bottom: 3px solid #1e293b; cursor: pointer;">🔄 Reiniciar</button>
      </div>

    </div>
  </main>
</body>
</html>`,
      css: BASE_CSS,
      js: `// JavaScript dá vida à sua página. Escreva suas ações aqui.

// UEBIT-BLOCKLY:START
(() => {
let __uebitLoopBudget = 10000;
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-rota-pouso\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"narrativa-titulo\\"]").forEach(node => { node.textContent = '💎 Cristais Energéticos Descobertos!'; });
document.querySelectorAll("[data-block-id=\\"narrativa-texto\\"]").forEach(node => { node.textContent = 'A nave tocou o solo de gelo. A capitã encontrou cristais luminescentes que recarregaram os motores ao infinito!'; });
document.querySelectorAll("[data-block-id=\\"txt-status-nave\\"]").forEach(node => { node.textContent = '📊 Status: Missão Triunfal! Energia Ilimitada Descoberta! 🚀'; });
document.querySelectorAll("[data-block-id=\\"narrativa-box\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-rota-escudos\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"narrativa-titulo\\"]").forEach(node => { node.textContent = '🤖 Sonda Antiga Resgatada!'; });
document.querySelectorAll("[data-block-id=\\"narrativa-texto\\"]").forEach(node => { node.textContent = 'Os escudos protegeram a nave enquanto o raio trator atraía uma sonda histórica da Terra repleta de dados!'; });
document.querySelectorAll("[data-block-id=\\"txt-status-nave\\"]").forEach(node => { node.textContent = '📊 Status: Sonda Salva! Dados da Terra Antiga Baixados! 🛸'; });
document.querySelectorAll("[data-block-id=\\"narrativa-box\\"]").forEach(node => { node.style.backgroundColor = "#2563eb"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-rota-salto\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"narrativa-titulo\\"]").forEach(node => { node.textContent = '🌌 Salto Quântico Interestelar!'; });
document.querySelectorAll("[data-block-id=\\"narrativa-texto\\"]").forEach(node => { node.textContent = 'VRUMMM! Em um flash brilhante, a nave cruzou cinco galáxias e encontrou a Estação Espacial de Nova Atlântida!'; });
document.querySelectorAll("[data-block-id=\\"txt-status-nave\\"]").forEach(node => { node.textContent = '📊 Status: Hiperespaço Concluído! Estação Alcançada!'; });
document.querySelectorAll("[data-block-id=\\"narrativa-box\\"]").forEach(node => { node.style.backgroundColor = "#9333ea"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id=\\"btn-reiniciar-missao\\"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id=\\"narrativa-titulo\\"]").forEach(node => { node.textContent = 'Capitão no Comando! 📡'; });
document.querySelectorAll("[data-block-id=\\"narrativa-texto\\"]").forEach(node => { node.textContent = 'O radar de bordo captou um sinal pulsante de rádio vindo de uma cratera de gelo cósmico. A tripulação aguarda sua decisão: qual rota a nave deve seguir?'; });
document.querySelectorAll("[data-block-id=\\"txt-status-nave\\"]").forEach(node => { node.textContent = '📊 Escudos: 100% · Combustível: Estável · Tripulação: Pronta'; });
document.querySelectorAll("[data-block-id=\\"narrativa-box\\"]").forEach(node => { node.style.backgroundColor = "#ffffff"; });
}
});

})();
// UEBIT-BLOCKLY:END
`,
    },
    blockProject: {
      workspace: {
        blocks: {
          languageVersion: 0,
          blocks: [
            {
              type: 'site_click_element',
              id: 'space_click_land',
              x: 40,
              y: 40,
              fields: { TARGET: 'btn-rota-pouso' },
              inputs: {
                DO: {
                  block: {
                    type: 'site_text_element',
                    id: 'space_txt_tit',
                    fields: { TARGET: 'narrativa-titulo' },
                    inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '💎 Cristais Energéticos Descobertos!' } } } },
                    next: {
                      block: {
                        type: 'site_text_element',
                        id: 'space_txt_story',
                        fields: { TARGET: 'narrativa-texto' },
                        inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'A nave tocou o solo de gelo. A capitã encontrou cristais luminescentes que recarregaram os motores ao infinito!' } } } },
                        next: {
                          block: {
                            type: 'site_text_element',
                            id: 'space_txt_status',
                            fields: { TARGET: 'txt-status-nave' },
                            inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '📊 Status: Missão Triunfal! Energia Ilimitada Descoberta! 🚀' } } } },
                            next: {
                              block: {
                                type: 'site_background_element',
                                id: 'space_bg_story',
                                fields: { TARGET: 'narrativa-box', COLOR: '#15803d' },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
      generated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id=\\"btn-rota-pouso\\"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id=\\"narrativa-titulo\\"]").forEach(node => { node.textContent = '💎 Cristais Energéticos Descobertos!'; });\ndocument.querySelectorAll("[data-block-id=\\"narrativa-texto\\"]").forEach(node => { node.textContent = 'A nave tocou o solo de gelo. A capitã encontrou cristais luminescentes que recarregaram os motores ao infinito!'; });\ndocument.querySelectorAll("[data-block-id=\\"txt-status-nave\\"]").forEach(node => { node.textContent = '📊 Status: Missão Triunfal! Energia Ilimitada Descoberta! 🚀'; });\ndocument.querySelectorAll("[data-block-id=\\"narrativa-box\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
      applied: `// UEBIT-BLOCKLY:START\n(() => {\nlet __uebitLoopBudget = 10000;\ndocument.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id=\\"btn-rota-pouso\\"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id=\\"narrativa-titulo\\"]").forEach(node => { node.textContent = '💎 Cristais Energéticos Descobertos!'; });\ndocument.querySelectorAll("[data-block-id=\\"narrativa-texto\\"]").forEach(node => { node.textContent = 'A nave tocou o solo de gelo. A capitã encontrou cristais luminescentes que recarregaram os motores ao infinito!'; });\ndocument.querySelectorAll("[data-block-id=\\"txt-status-nave\\"]").forEach(node => { node.textContent = '📊 Status: Missão Triunfal! Energia Ilimitada Descoberta! 🚀'; });\ndocument.querySelectorAll("[data-block-id=\\"narrativa-box\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n\n})();\n// UEBIT-BLOCKLY:END`,
      appliedGenerated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id=\\"btn-rota-pouso\\"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id=\\"narrativa-titulo\\"]").forEach(node => { node.textContent = '💎 Cristais Energéticos Descobertos!'; });\ndocument.querySelectorAll("[data-block-id=\\"narrativa-texto\\"]").forEach(node => { node.textContent = 'A nave tocou o solo de gelo. A capitã encontrou cristais luminescentes que recarregaram os motores ao infinito!'; });\ndocument.querySelectorAll("[data-block-id=\\"txt-status-nave\\"]").forEach(node => { node.textContent = '📊 Status: Missão Triunfal! Energia Ilimitada Descoberta! 🚀'; });\ndocument.querySelectorAll("[data-block-id=\\"narrativa-box\\"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
    },
  },
  {
    id: 'blank',
    name: 'Projeto em Branco',
    description: 'Uma folha em branco limpa para você inventar e construir seu site do zero.',
    badge: 'Em Branco',
    color: 'slate',
    tagColor: 'bg-slate-100 text-slate-700 border-slate-300',
    buttonColor: 'bg-slate-700 hover:bg-slate-600 border-slate-900',
    icon: 'Sparkles',
    code: createInitialCode(),
    blockProject: { workspace: undefined, generated: '', applied: '', appliedGenerated: '' },
  },
]

const ALIASES = {
  'magic-button': 'quiz-game',
  'gamer': 'portfolio',
  'space-blog': 'space-story',
}

export function getTemplate(id) {
  const targetId = ALIASES[id] || id
  return TEMPLATES.find((t) => t.id === targetId) ?? TEMPLATES[0]
}
