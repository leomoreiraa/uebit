import { BASE_CSS, createInitialCode } from '../lib/code-engine.js'

export const TEMPLATES = [
  {
    id: 'quiz-game',
    name: 'Super Quiz & Arena dos Animais',
    description: 'Jogo completo de perguntas e respostas com placar de pontos, barra de vidas, combos, 4 alternativas ilustradas e conquistas interativas!',
    badge: 'Mini-Game & Lógica',
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
  <title>Super Quiz & Arena dos Animais</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <main class="site" data-site-root>
    <div id="quiz-card" data-block-id="quiz-card" class="container site-block" data-name="Arena do Quiz" style="background-color: #f0fdf4; border-radius: 28px; border: 4px solid #10b981; padding: 32px; align-items: center; justify-content: center; text-align: center; gap: 20px;">
      
      <!-- HUD de Status do Jogo -->
      <div id="quiz-hud" data-block-id="quiz-hud" class="container site-block" data-name="Painel de Status" style="flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; background-color: #ffffff; border-radius: 20px; border: 2px solid #a7f3d0; padding: 14px 24px; width: 100%;">
        <p id="quiz-fase" data-block-id="quiz-fase" class="paragraph site-block" data-name="Fase Atual" style="color: #047857; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0; padding: 0;">🎮 Fase 1: Planeta Selvagem</p>
        <div id="quiz-stats-row" data-block-id="quiz-stats-row" class="container site-block" data-name="Indicadores" style="flex-direction: row; gap: 16px; background: transparent; border: none; padding: 0;">
          <p id="quiz-vidas" data-block-id="quiz-vidas" class="paragraph site-block" data-name="Vidas" style="color: #e11d48; font-size: 15px; font-weight: 800; margin: 0; padding: 0;">❤️❤️❤️ 3 Vidas</p>
          <p id="quiz-pontos" data-block-id="quiz-pontos" class="paragraph site-block" data-name="Pontuação" style="color: #065f46; font-size: 15px; font-weight: 800; margin: 0; padding: 0;">💎 Pontos: 0</p>
          <p id="quiz-combo" data-block-id="quiz-combo" class="paragraph site-block" data-name="Combo" style="color: #d97706; font-size: 15px; font-weight: 800; margin: 0; padding: 0;">🔥 Combo: x0</p>
        </div>
      </div>

      <!-- Bloco da Pergunta e Imagem em Alta Resolução -->
      <div id="quiz-pergunta-box" data-block-id="quiz-pergunta-box" class="container site-block" data-name="Bloco da Pergunta" style="background: transparent; border: none; padding: 0; align-items: center; gap: 12px; width: 100%;">
        <span id="quiz-categoria" data-block-id="quiz-categoria" class="span site-block" data-name="Categoria" style="color: #059669; background-color: #d1fae5; border-radius: 9999px; font-size: 12px; font-weight: 800; padding: 6px 16px; text-transform: uppercase; letter-spacing: 1px;">🦁 Zoologia & Velocidade Extrema · Desafio #01</span>
        <h1 id="quiz-pergunta" data-block-id="quiz-pergunta" class="heading site-block" data-name="Título da Pergunta" style="color: #064e3b; font-size: 28px; font-weight: 900; margin: 0; padding: 0;">Qual é o animal terrestre mais rápido do planeta? 🐆</h1>
        <img id="quiz-foto" data-block-id="quiz-foto" class="image site-block" data-name="Foto do Desafio" src="https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&auto=format&fit=crop&q=80" alt="Guepardo veloz correndo na savana africana" style="border-radius: 20px; border: 3px solid #10b981; max-height: 240px; object-fit: cover; width: 100%; max-width: 600px;">
      </div>

      <!-- Grade de 4 Alternativas Interativas -->
      <div id="quiz-opcoes" data-block-id="quiz-opcoes" class="container site-block" data-name="Alternativas" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 14px; background: transparent; border: none; padding: 4px; width: 100%;">
        <button id="btn-opcao-a" data-block-id="btn-opcao-a" class="button site-block" data-name="Opção A (Tartaruga)" style="background-color: #3b82f6; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 16px 24px; border-bottom: 5px solid #1d4ed8; cursor: pointer; min-width: 250px;">🐢 A) Tartaruga-Gigante (0.3 km/h)</button>
        <button id="btn-opcao-b" data-block-id="btn-opcao-b" class="button site-block" data-name="Opção B (Guepardo)" style="background-color: #10b981; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 16px 24px; border-bottom: 5px solid #047857; cursor: pointer; min-width: 250px;">🐆 B) Guepardo Africano (120 km/h)</button>
        <button id="btn-opcao-c" data-block-id="btn-opcao-c" class="button site-block" data-name="Opção C (Elefante)" style="background-color: #f59e0b; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 16px 24px; border-bottom: 5px solid #b45309; cursor: pointer; min-width: 250px;">🐘 C) Elefante Savana (40 km/h)</button>
        <button id="btn-opcao-d" data-block-id="btn-opcao-d" class="button site-block" data-name="Opção D (Falcão)" style="background-color: #8b5cf6; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 16px 24px; border-bottom: 5px solid #6d28d9; cursor: pointer; min-width: 250px;">🦅 D) Falcão Peregrino (Ave voadora!)</button>
      </div>

      <!-- Painel Dinâmico de Feedback e Conquistas -->
      <div id="quiz-feedback" data-block-id="quiz-feedback" class="container site-block" data-name="Painel de Feedback" style="background-color: #fef3c7; border-radius: 20px; border: 3px dashed #f59e0b; padding: 22px; width: 100%; max-width: 660px; align-items: center; gap: 8px;">
        <h2 id="feedback-titulo" data-block-id="feedback-titulo" class="heading site-block" data-name="Título do Feedback" style="color: #92400e; font-size: 20px; font-weight: 800; margin: 0; padding: 0;">Dica do Explorador 🧭</h2>
        <p id="feedback-texto" data-block-id="feedback-texto" class="paragraph site-block" data-name="Texto da Resposta" style="color: #78350f; font-size: 15px; line-height: 1.6; margin: 0; padding: 0;">Clique em uma das 4 alternativas acima para conferir se você acertou e somar pontos!</p>
        <p id="feedback-conquista" data-block-id="feedback-conquista" class="paragraph site-block" data-name="Conquista em Jogo" style="color: #b45309; font-size: 13px; font-weight: 800; margin: 0; padding: 0;">🏆 Conquista em Jogo: "Raio da Savana" (+150 Pontos)</p>
      </div>

      <!-- Fatos Rápidos e Curiosidades Científicas -->
      <div id="quiz-curiosidades" data-block-id="quiz-curiosidades" class="container site-block" data-name="Fatos Rápidos" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 14px; background: transparent; border: none; padding: 0; width: 100%;">
        <div id="card-fato-1" data-block-id="card-fato-1" class="container site-block" data-name="Fato Aceleração" style="background-color: #ffffff; border-radius: 16px; border: 2px solid #a7f3d0; padding: 14px; width: 200px; gap: 6px;">
          <strong id="txt-fato-1-tit" data-block-id="txt-fato-1-tit" class="strong site-block" data-name="Título Fato 1" style="color: #047857; font-size: 13px;">⚡ 0 a 100 km/h</strong>
          <p id="txt-fato-1-desc" data-block-id="txt-fato-1-desc" class="paragraph site-block" data-name="Desc Fato 1" style="color: #475569; font-size: 12px; margin: 0; padding: 0;">Alcançado em apenas 3 segundos de arrancada!</p>
        </div>
        <div id="card-fato-2" data-block-id="card-fato-2" class="container site-block" data-name="Fato Garras" style="background-color: #ffffff; border-radius: 16px; border: 2px solid #a7f3d0; padding: 14px; width: 200px; gap: 6px;">
          <strong id="txt-fato-2-tit" data-block-id="txt-fato-2-tit" class="strong site-block" data-name="Título Fato 2" style="color: #047857; font-size: 13px;">🐾 Cravos Naturais</strong>
          <p id="txt-fato-2-desc" data-block-id="txt-fato-2-desc" class="paragraph site-block" data-name="Desc Fato 2" style="color: #475569; font-size: 12px; margin: 0; padding: 0;">Garras não-retráteis que cravam no solo arenoso.</p>
        </div>
        <div id="card-fato-3" data-block-id="card-fato-3" class="container site-block" data-name="Fato Cauda" style="background-color: #ffffff; border-radius: 16px; border: 2px solid #a7f3d0; padding: 14px; width: 200px; gap: 6px;">
          <strong id="txt-fato-3-tit" data-block-id="txt-fato-3-tit" class="strong site-block" data-name="Título Fato 3" style="color: #047857; font-size: 13px;">🎯 Cauda Leme</strong>
          <p id="txt-fato-3-desc" data-block-id="txt-fato-3-desc" class="paragraph site-block" data-name="Desc Fato 3" style="color: #475569; font-size: 12px; margin: 0; padding: 0;">Equilibra curvas fechadas em velocidade máxima.</p>
        </div>
      </div>

      <!-- Barra de Ações -->
      <div id="quiz-acoes" data-block-id="quiz-acoes" class="container site-block" data-name="Ações do Jogo" style="flex-direction: row; justify-content: center; gap: 14px; background: transparent; border: none; padding: 0; flex-wrap: wrap;">
        <button id="btn-dica" data-block-id="btn-dica" class="button site-block" data-name="Botão Dica 50/50" style="background-color: #0284c7; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 14px; padding: 10px 22px; border-bottom: 3px solid #0369a1; cursor: pointer;">💡 Dica 50/50</button>
        <button id="btn-reiniciar-quiz" data-block-id="btn-reiniciar-quiz" class="button site-block" data-name="Botão Reiniciar" style="background-color: #64748b; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 14px; padding: 10px 22px; border-bottom: 3px solid #334155; cursor: pointer;">🔄 Reiniciar Partida</button>
      </div>

    </div>
  </main>
</body>
</html>`,
      css: BASE_CSS,
      js: `// JavaScript do Super Quiz & Arena dos Animais

// UEBIT-BLOCKLY:START
(() => {
let __uebitLoopBudget = 10000;
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-opcao-b"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="quiz-pontos"]").forEach(node => { node.textContent = '💎 Pontos: 150 (Acertou!)'; });
document.querySelectorAll("[data-block-id="quiz-combo"]").forEach(node => { node.textContent = '🔥 Combo: x3 Ativado!'; });
document.querySelectorAll("[data-block-id="feedback-titulo"]").forEach(node => { node.textContent = '🎉 Resposta Exata! Você é um Mestre da Savana!'; });
document.querySelectorAll("[data-block-id="feedback-texto"]").forEach(node => { node.textContent = 'Sensacional! O guepardo pode atingir 120 km/h em arrancadas fulminantes na savana africana!'; });
document.querySelectorAll("[data-block-id="feedback-conquista"]").forEach(node => { node.textContent = '🏆 CONQUISTA DESBLOQUEADA: "Velocidade da Luz!" ⭐⭐⭐'; });
document.querySelectorAll("[data-block-id="quiz-feedback"]").forEach(node => { node.style.backgroundColor = "#15803d"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-opcao-a"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="quiz-vidas"]").forEach(node => { node.textContent = '❤️❤️🖤 2 Vidas restantes'; });
document.querySelectorAll("[data-block-id="quiz-combo"]").forEach(node => { node.textContent = '🔥 Combo: Zerado'; });
document.querySelectorAll("[data-block-id="feedback-titulo"]").forEach(node => { node.textContent = '🐢 Devagar e sempre... mas não tão veloz!'; });
document.querySelectorAll("[data-block-id="feedback-texto"]").forEach(node => { node.textContent = 'A tartaruga-gigante anda a cerca de 0.3 km/h. Ela vive mais de 150 anos, mas perde qualquer corrida!'; });
document.querySelectorAll("[data-block-id="quiz-feedback"]").forEach(node => { node.style.backgroundColor = "#f59e0b"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-opcao-c"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="quiz-vidas"]").forEach(node => { node.textContent = '❤️❤️🖤 2 Vidas restantes'; });
document.querySelectorAll("[data-block-id="quiz-combo"]").forEach(node => { node.textContent = '🔥 Combo: Zerado'; });
document.querySelectorAll("[data-block-id="feedback-titulo"]").forEach(node => { node.textContent = '🐘 Forte e imponente, mas não tão rápido!'; });
document.querySelectorAll("[data-block-id="feedback-texto"]").forEach(node => { node.textContent = 'O elefante africano atinge respeitáveis 40 km/h quando em carga, mas não compete com os felinos de caça.'; });
document.querySelectorAll("[data-block-id="quiz-feedback"]").forEach(node => { node.style.backgroundColor = "#f59e0b"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-opcao-d"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="feedback-titulo"]").forEach(node => { node.textContent = '🦅 Cuidado com a pegadinha aérea!'; });
document.querySelectorAll("[data-block-id="feedback-texto"]").forEach(node => { node.textContent = 'O Falcão Peregrino é o animal mais rápido do MUNDO no ar (380 km/h em mergulho), mas a pergunta pede um animal TERRESTRE!'; });
document.querySelectorAll("[data-block-id="quiz-feedback"]").forEach(node => { node.style.backgroundColor = "#9333ea"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-dica"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="feedback-titulo"]").forEach(node => { node.textContent = '💡 Dica 50/50 do Sábio da Selva:'; });
document.querySelectorAll("[data-block-id="feedback-texto"]").forEach(node => { node.textContent = 'Eliminamos a Tartaruga e o Falcão. A disputa final está entre o Guepardo Africano e o Elefante da Savana!'; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-reiniciar-quiz"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="quiz-vidas"]").forEach(node => { node.textContent = '❤️❤️❤️ 3 Vidas'; });
document.querySelectorAll("[data-block-id="quiz-pontos"]").forEach(node => { node.textContent = '💎 Pontos: 0'; });
document.querySelectorAll("[data-block-id="quiz-combo"]").forEach(node => { node.textContent = '🔥 Combo: x0'; });
document.querySelectorAll("[data-block-id="feedback-titulo"]").forEach(node => { node.textContent = 'Dica do Explorador 🧭'; });
document.querySelectorAll("[data-block-id="feedback-texto"]").forEach(node => { node.textContent = 'Clique em uma das 4 alternativas acima para conferir se você acertou e somar pontos!'; });
document.querySelectorAll("[data-block-id="feedback-conquista"]").forEach(node => { node.textContent = '🏆 Conquista em Jogo: "Raio da Savana" (+150 Pontos)'; });
document.querySelectorAll("[data-block-id="quiz-feedback"]").forEach(node => { node.style.backgroundColor = "#fef3c7"; });
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
                    inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '💎 Pontos: 150 (Acertou!)' } } } },
                    next: {
                      block: {
                        type: 'site_text_element',
                        id: 'quiz_txt_combo',
                        fields: { TARGET: 'quiz-combo' },
                        inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '🔥 Combo: x3 Ativado!' } } } },
                        next: {
                          block: {
                            type: 'site_text_element',
                            id: 'quiz_txt_tit',
                            fields: { TARGET: 'feedback-titulo' },
                            inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '🎉 Resposta Exata! Você é um Mestre da Savana!' } } } },
                            next: {
                              block: {
                                type: 'site_text_element',
                                id: 'quiz_txt_exp',
                                fields: { TARGET: 'feedback-texto' },
                                inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Sensacional! O guepardo pode atingir 120 km/h em arrancadas fulminantes na savana africana!' } } } },
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
              },
            },
          ],
        },
      },
      generated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-opcao-b"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="quiz-pontos"]").forEach(node => { node.textContent = '💎 Pontos: 150 (Acertou!)'; });\ndocument.querySelectorAll("[data-block-id="quiz-combo"]").forEach(node => { node.textContent = '🔥 Combo: x3 Ativado!'; });\ndocument.querySelectorAll("[data-block-id="feedback-titulo"]").forEach(node => { node.textContent = '🎉 Resposta Exata! Você é um Mestre da Savana!'; });\ndocument.querySelectorAll("[data-block-id="feedback-texto"]").forEach(node => { node.textContent = 'Sensacional! O guepardo pode atingir 120 km/h em arrancadas fulminantes na savana africana!'; });\ndocument.querySelectorAll("[data-block-id="quiz-feedback"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
      applied: `// UEBIT-BLOCKLY:START\n(() => {\nlet __uebitLoopBudget = 10000;\ndocument.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-opcao-b"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="quiz-pontos"]").forEach(node => { node.textContent = '💎 Pontos: 150 (Acertou!)'; });\ndocument.querySelectorAll("[data-block-id="quiz-combo"]").forEach(node => { node.textContent = '🔥 Combo: x3 Ativado!'; });\ndocument.querySelectorAll("[data-block-id="feedback-titulo"]").forEach(node => { node.textContent = '🎉 Resposta Exata! Você é um Mestre da Savana!'; });\ndocument.querySelectorAll("[data-block-id="feedback-texto"]").forEach(node => { node.textContent = 'Sensacional! O guepardo pode atingir 120 km/h em arrancadas fulminantes na savana africana!'; });\ndocument.querySelectorAll("[data-block-id="quiz-feedback"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n\n})();\n// UEBIT-BLOCKLY:END`,
      appliedGenerated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-opcao-b"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="quiz-pontos"]").forEach(node => { node.textContent = '💎 Pontos: 150 (Acertou!)'; });\ndocument.querySelectorAll("[data-block-id="quiz-combo"]").forEach(node => { node.textContent = '🔥 Combo: x3 Ativado!'; });\ndocument.querySelectorAll("[data-block-id="feedback-titulo"]").forEach(node => { node.textContent = '🎉 Resposta Exata! Você é um Mestre da Savana!'; });\ndocument.querySelectorAll("[data-block-id="feedback-texto"]").forEach(node => { node.textContent = 'Sensacional! O guepardo pode atingir 120 km/h em arrancadas fulminantes na savana africana!'; });\ndocument.querySelectorAll("[data-block-id="quiz-feedback"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
    },
  },
  {
    id: 'portfolio',
    name: 'Portfólio & Studio Criativo da Bia',
    description: 'Site profissional de artista com barra de navegação, galeria de obras com curtidas em tempo real, métricas de carreira e painel de encomendas!',
    badge: 'Design & Galeria',
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
  <title>Portfólio & Studio Criativo da Bia</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <main class="site" data-site-root>
    <!-- Barra de Navegação Superior -->
    <div id="portfolio-navbar" data-block-id="portfolio-navbar" class="container site-block" data-name="Barra de Navegação" style="flex-direction: row; justify-content: space-between; align-items: center; background-color: #ffffff; border-radius: 20px; border: 2px solid #bfdbfe; padding: 14px 24px;">
      <div id="nav-brand-box" data-block-id="nav-brand-box" class="container site-block" data-name="Marca do Ateliê" style="flex-direction: row; align-items: center; gap: 10px; background: transparent; border: none; padding: 0;">
        <h2 id="nav-brand" data-block-id="nav-brand" class="heading site-block" data-name="Nome da Marca" style="color: #1e3a8a; font-size: 18px; font-weight: 900; margin: 0; padding: 0;">✨ Bia Studio Art</h2>
        <span id="nav-status" data-block-id="nav-status" class="span site-block" data-name="Status de Encomendas" style="background-color: #dcfce7; color: #15803d; border-radius: 9999px; font-size: 11px; font-weight: 800; padding: 4px 12px; border: 1px solid #bbf7d0;">🟢 Aberta para Encomendas</span>
      </div>
      <div id="nav-links" data-block-id="nav-links" class="container site-block" data-name="Links do Menu" style="flex-direction: row; gap: 14px; background: transparent; border: none; padding: 0;">
        <span id="link-galeria" data-block-id="link-galeria" class="span site-block" data-name="Link Galeria" style="color: #1e40af; font-size: 13px; font-weight: 800; cursor: pointer;">🖼️ Galeria</span>
        <span id="link-skills" data-block-id="link-skills" class="span site-block" data-name="Link Habilidades" style="color: #1e40af; font-size: 13px; font-weight: 800; cursor: pointer;">💡 Habilidades</span>
        <span id="link-contato" data-block-id="link-contato" class="span site-block" data-name="Link Encomendas" style="color: #1e40af; font-size: 13px; font-weight: 800; cursor: pointer;">💌 Contato</span>
      </div>
    </div>

    <!-- Banner Hero da Artista -->
    <div id="perfil-banner" data-block-id="perfil-banner" class="container site-block" data-name="Banner do Artista" style="background-color: #eff6ff; border-radius: 28px; border: 3px solid #3b82f6; padding: 32px; align-items: center; justify-content: center; text-align: center; gap: 16px;">
      <div id="avatar-container" data-block-id="avatar-container" class="container site-block" data-name="Foto do Artista" style="background: transparent; border: none; padding: 0; align-items: center;">
        <img id="avatar-artista" data-block-id="avatar-artista" class="image site-block" data-name="Foto da Bia" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" alt="Avatar da Artista Bia" style="width: 120px; height: 120px; border-radius: 9999px; border: 4px solid #2563eb; object-fit: cover;">
      </div>
      <h1 id="nome-artista" data-block-id="nome-artista" class="heading site-block" data-name="Nome da Artista" style="color: #1e3a8a; font-size: 32px; font-weight: 900; margin: 0; padding: 0;">Ateliê & Universo Criativo da Bia 🎨</h1>
      <p id="bio-artista" data-block-id="bio-artista" class="paragraph site-block" data-name="Biografia" style="color: #1e40af; font-size: 16px; max-width: 640px; line-height: 1.6; margin: 0; padding: 0;">Ilustradora digital e concept artist de 12 anos. Apaixonada por desenhar criaturas mágicas, cenários espaciais e cores vibrantes cheias de luz.</p>
      
      <!-- Métricas de Carreira -->
      <div id="stats-artista" data-block-id="stats-artista" class="container site-block" data-name="Métricas do Artista" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 14px; background: transparent; border: none; padding: 0; width: 100%;">
        <div id="stat-obras" data-block-id="stat-obras" class="container site-block" data-name="Card Obras" style="background-color: #ffffff; border-radius: 16px; border: 2px solid #bfdbfe; padding: 12px 24px; min-width: 140px; align-items: center; gap: 4px;">
          <strong id="txt-stat-obras" data-block-id="txt-stat-obras" class="strong site-block" data-name="Total Obras" style="color: #1e3a8a; font-size: 20px;">🎨 48+</strong>
          <span id="txt-lbl-obras" data-block-id="txt-lbl-obras" class="span site-block" data-name="Rótulo Obras" style="color: #64748b; font-size: 12px; font-weight: 700;">Obras Criadas</span>
        </div>
        <div id="stat-likes" data-block-id="stat-likes" class="container site-block" data-name="Card Curtidas" style="background-color: #ffffff; border-radius: 16px; border: 2px solid #bfdbfe; padding: 12px 24px; min-width: 140px; align-items: center; gap: 4px;">
          <strong id="txt-stat-likes" data-block-id="txt-stat-likes" class="strong site-block" data-name="Total Curtidas" style="color: #ec4899; font-size: 20px;">💖 1.450</strong>
          <span id="txt-lbl-likes" data-block-id="txt-lbl-likes" class="span site-block" data-name="Rótulo Curtidas" style="color: #64748b; font-size: 12px; font-weight: 700;">Curtidas no Ateliê</span>
        </div>
        <div id="stat-reviews" data-block-id="stat-reviews" class="container site-block" data-name="Card Avaliações" style="background-color: #ffffff; border-radius: 16px; border: 2px solid #bfdbfe; padding: 12px 24px; min-width: 140px; align-items: center; gap: 4px;">
          <strong id="txt-stat-reviews" data-block-id="txt-stat-reviews" class="strong site-block" data-name="Nota Artista" style="color: #f59e0b; font-size: 20px;">⭐ 5.0</strong>
          <span id="txt-lbl-reviews" data-block-id="txt-lbl-reviews" class="span site-block" data-name="Rótulo Avaliações" style="color: #64748b; font-size: 12px; font-weight: 700;">Avaliação dos Fãs</span>
        </div>
      </div>

      <!-- Caixa de Curtidas Interativa -->
      <div id="box-curtidas" data-block-id="box-curtidas" class="container site-block" data-name="Caixa de Curtidas" style="flex-direction: row; justify-content: center; align-items: center; gap: 14px; background-color: #ffffff; border-radius: 20px; border: 2px solid #bfdbfe; padding: 12px 28px; flex-wrap: wrap;">
        <button id="btn-curtir-galeria" data-block-id="btn-curtir-galeria" class="button site-block" data-name="Botão Curtir Ateliê" style="background-color: #ec4899; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 15px; padding: 12px 26px; border-bottom: 4px solid #be185d; cursor: pointer;">❤️ Curtir Todo o Ateliê</button>
        <p id="txt-contador-curtidas" data-block-id="txt-contador-curtidas" class="paragraph site-block" data-name="Mensagem de Curtidas" style="color: #be185d; font-size: 15px; font-weight: 800; margin: 0; padding: 0;">💖 1.450 pessoas amaram este ateliê!</p>
      </div>
    </div>

    <!-- Seção da Galeria de Obras -->
    <div id="galeria-secao" data-block-id="galeria-secao" class="container site-block" data-name="Seção da Galeria" style="background-color: #f8fafc; border-radius: 24px; border: 2px solid #cbd5e1; padding: 28px; gap: 20px;">
      <div id="galeria-header" data-block-id="galeria-header" class="container site-block" data-name="Cabeçalho Galeria" style="flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; background: transparent; border: none; padding: 0; width: 100%;">
        <h2 id="galeria-titulo" data-block-id="galeria-titulo" class="heading site-block" data-name="Título da Galeria" style="color: #0f172a; font-size: 24px; font-weight: 900; margin: 0; padding: 0;">Obras em Destaque 🖼️</h2>
        <div id="galeria-filtros" data-block-id="galeria-filtros" class="container site-block" data-name="Filtros" style="flex-direction: row; gap: 8px; background: transparent; border: none; padding: 0; flex-wrap: wrap;">
          <button id="filtro-1" data-block-id="filtro-1" class="button site-block" data-name="Filtro Todos" style="background-color: #2563eb; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 12px; padding: 6px 14px;">🌟 Todas</button>
          <button id="filtro-2" data-block-id="filtro-2" class="button site-block" data-name="Filtro Aquarela" style="background-color: #e2e8f0; color: #475569; border-radius: 9999px; font-weight: 800; font-size: 12px; padding: 6px 14px;">🖌️ Aquarela</button>
          <button id="filtro-3" data-block-id="filtro-3" class="button site-block" data-name="Filtro 3D" style="background-color: #e2e8f0; color: #475569; border-radius: 9999px; font-weight: 800; font-size: 12px; padding: 6px 14px;">🔮 3D & Neon</button>
        </div>
      </div>
      
      <!-- Grade Flexbox de Obras com Contadores Individuais -->
      <div id="galeria-grid" data-block-id="galeria-grid" class="container site-block" data-name="Grade de Obras" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 22px; background: transparent; border: none; padding: 0; width: 100%;">
        
        <div id="card-obra-1" data-block-id="card-obra-1" class="container site-block" data-name="Cartão Obra 1" style="background-color: #ffffff; border-radius: 20px; border: 2px solid #e2e8f0; padding: 18px; width: 280px; gap: 12px;">
          <img id="img-obra-1" data-block-id="img-obra-1" class="image site-block" data-name="Imagem Obra 1" src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80" alt="Explosão de Cores" style="border-radius: 14px; height: 180px; object-fit: cover;">
          <h3 id="titulo-obra-1" data-block-id="titulo-obra-1" class="heading site-block" data-name="Título Obra 1" style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0; padding: 0;">Explosão Cósmica 🌈</h3>
          <p id="desc-obra-1" data-block-id="desc-obra-1" class="paragraph site-block" data-name="Descrição Obra 1" style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0; padding: 0;">Pintura abstrata explorando misturas de tintas a óleo e tons quentes do pôr do sol.</p>
          <button id="btn-like-obra-1" data-block-id="btn-like-obra-1" class="button site-block" data-name="Curtir Obra 1" style="background-color: #f1f5f9; color: #e11d48; border-radius: 12px; font-weight: 800; font-size: 13px; padding: 10px 16px; border: 1px solid #fecdd3; cursor: pointer;">❤️ 340 Curtidas</button>
        </div>

        <div id="card-obra-2" data-block-id="card-obra-2" class="container site-block" data-name="Cartão Obra 2" style="background-color: #ffffff; border-radius: 20px; border: 2px solid #e2e8f0; padding: 18px; width: 280px; gap: 12px;">
          <img id="img-obra-2" data-block-id="img-obra-2" class="image site-block" data-name="Imagem Obra 2" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" alt="Dimensão Geométrica" style="border-radius: 14px; height: 180px; object-fit: cover;">
          <h3 id="titulo-obra-2" data-block-id="titulo-obra-2" class="heading site-block" data-name="Título Obra 2" style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0; padding: 0;">Dimensão Neon 🔮</h3>
          <p id="desc-obra-2" data-block-id="desc-obra-2" class="paragraph site-block" data-name="Descrição Obra 2" style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0; padding: 0;">Modelagem 3D com luzes suaves, vidro translúcido e gradientes futuristas.</p>
          <button id="btn-like-obra-2" data-block-id="btn-like-obra-2" class="button site-block" data-name="Curtir Obra 2" style="background-color: #f1f5f9; color: #e11d48; border-radius: 12px; font-weight: 800; font-size: 13px; padding: 10px 16px; border: 1px solid #fecdd3; cursor: pointer;">❤️ 512 Curtidas</button>
        </div>

        <div id="card-obra-3" data-block-id="card-obra-3" class="container site-block" data-name="Cartão Obra 3" style="background-color: #ffffff; border-radius: 20px; border: 2px solid #e2e8f0; padding: 18px; width: 280px; gap: 12px;">
          <img id="img-obra-3" data-block-id="img-obra-3" class="image site-block" data-name="Imagem Obra 3" src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80" alt="Aurora dos Sonhos" style="border-radius: 14px; height: 180px; object-fit: cover;">
          <h3 id="titulo-obra-3" data-block-id="titulo-obra-3" class="heading site-block" data-name="Título Obra 3" style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0; padding: 0;">Aurora Mágica 🌌</h3>
          <p id="desc-obra-3" data-block-id="desc-obra-3" class="paragraph site-block" data-name="Descrição Obra 3" style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0; padding: 0;">Fotografia noturna capturando luzes celestes cintilantes nos lagos do norte.</p>
          <button id="btn-like-obra-3" data-block-id="btn-like-obra-3" class="button site-block" data-name="Curtir Obra 3" style="background-color: #f1f5f9; color: #e11d48; border-radius: 12px; font-weight: 800; font-size: 13px; padding: 10px 16px; border: 1px solid #fecdd3; cursor: pointer;">❤️ 628 Curtidas</button>
        </div>

      </div>
    </div>

    <!-- Mural de Encomendas & Contato -->
    <div id="secao-encomendas" data-block-id="secao-encomendas" class="container site-block" data-name="Mural de Encomendas" style="background-color: #fdf2f8; border-radius: 24px; border: 2px solid #fbcfe8; padding: 28px; align-items: center; text-align: center; gap: 14px;">
      <h2 id="encomendas-titulo" data-block-id="encomendas-titulo" class="heading site-block" data-name="Título Encomendas" style="color: #831843; font-size: 22px; font-weight: 900; margin: 0; padding: 0;">Quer um desenho personalizado? 💌</h2>
      <p id="encomendas-subtitulo" data-block-id="encomendas-subtitulo" class="paragraph site-block" data-name="Subtítulo Encomendas" style="color: #9d174d; font-size: 14px; max-width: 580px; margin: 0; padding: 0;">Envie uma sugestão de personagem, avatar ou ideia mágica para o próximo quadro da Bia!</p>
      <div id="encomenda-form-box" data-block-id="encomenda-form-box" class="container site-block" data-name="Caixa de Mensagem" style="flex-direction: row; justify-content: center; gap: 12px; background: transparent; border: none; padding: 0; flex-wrap: wrap;">
        <button id="btn-enviar-pedido" data-block-id="btn-enviar-pedido" class="button site-block" data-name="Botão Enviar Pedido" style="background-color: #db2777; color: #ffffff; border-radius: 14px; font-weight: 800; font-size: 14px; padding: 12px 24px; border-bottom: 4px solid #9d174d; cursor: pointer;">✨ Enviar Pedido de Desenho para a Bia</button>
      </div>
      <p id="feedback-encomenda" data-block-id="feedback-encomenda" class="paragraph site-block" data-name="Feedback do Pedido" style="color: #be185d; font-size: 13px; font-weight: 700; margin: 0; padding: 0;">Clique no botão acima para registrar seu pedido com a artista!</p>
    </div>
  </main>
</body>
</html>`,
      css: BASE_CSS,
      js: `// JavaScript do Portfólio & Studio da Bia

// UEBIT-BLOCKLY:START
(() => {
let __uebitLoopBudget = 10000;
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-curtir-galeria"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="txt-contador-curtidas"]").forEach(node => { node.textContent = '💖 1.451 pessoas amaram este ateliê! (Você curtiu!)'; });
document.querySelectorAll("[data-block-id="btn-curtir-galeria"]").forEach(node => { node.style.backgroundColor = "#15803d"; });
document.querySelectorAll("[data-block-id="btn-curtir-galeria"]").forEach(node => { node.textContent = '✓ Ateliê Favoritado!'; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-like-obra-1"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="btn-like-obra-1"]").forEach(node => { node.textContent = '❤️ 341 Curtidas (Você amou!)'; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-like-obra-2"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="btn-like-obra-2"]").forEach(node => { node.textContent = '❤️ 513 Curtidas (Você amou!)'; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-like-obra-3"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="btn-like-obra-3"]").forEach(node => { node.textContent = '❤️ 629 Curtidas (Você amou!)'; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-enviar-pedido"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="feedback-encomenda"]").forEach(node => { node.textContent = '🎉 Pedido recebido com sucesso! A Bia vai analisar sua ideia com muito carinho! ✨'; });
document.querySelectorAll("[data-block-id="secao-encomendas"]").forEach(node => { node.style.backgroundColor = "#ecfdf5"; });
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
                    inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '💖 1.451 pessoas amaram este ateliê! (Você curtiu!)' } } } },
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
                            inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '✓ Ateliê Favoritado!' } } } },
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
      generated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-curtir-galeria"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="txt-contador-curtidas"]").forEach(node => { node.textContent = '💖 1.451 pessoas amaram este ateliê! (Você curtiu!)'; });\ndocument.querySelectorAll("[data-block-id="btn-curtir-galeria"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\ndocument.querySelectorAll("[data-block-id="btn-curtir-galeria"]").forEach(node => { node.textContent = '✓ Ateliê Favoritado!'; });\n}\n});\n`,
      applied: `// UEBIT-BLOCKLY:START\n(() => {\nlet __uebitLoopBudget = 10000;\ndocument.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-curtir-galeria"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="txt-contador-curtidas"]").forEach(node => { node.textContent = '💖 1.451 pessoas amaram este ateliê! (Você curtiu!)'; });\ndocument.querySelectorAll("[data-block-id="btn-curtir-galeria"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\ndocument.querySelectorAll("[data-block-id="btn-curtir-galeria"]").forEach(node => { node.textContent = '✓ Ateliê Favoritado!'; });\n}\n});\n\n})();\n// UEBIT-BLOCKLY:END`,
      appliedGenerated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-curtir-galeria"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="txt-contador-curtidas"]").forEach(node => { node.textContent = '💖 1.451 pessoas amaram este ateliê! (Você curtiu!)'; });\ndocument.querySelectorAll("[data-block-id="btn-curtir-galeria"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\ndocument.querySelectorAll("[data-block-id="btn-curtir-galeria"]").forEach(node => { node.textContent = '✓ Ateliê Favoritado!'; });\n}\n});\n`,
    },
  },
  {
    id: 'space-story',
    name: 'Odisseia Espacial & Missão Interestelar',
    description: 'Aventura interativa estilo RPG no espaço com ponte de comando, telemetria em tempo real, rotas táticas ramificadas e registro de inventário cósmico!',
    badge: 'Ficção & RPG',
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
  <title>Odisseia Espacial & Missão Interestelar</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <main class="site" data-site-root>
    <div id="nave-cockpit" data-block-id="nave-cockpit" class="container site-block" data-name="Ponte de Comando" style="background-color: #0b0f19; border-radius: 28px; border: 3px solid #8b5cf6; padding: 32px; gap: 20px; align-items: center; text-align: center;">
      
      <!-- Cabeçalho da Missão Cósmica -->
      <div id="missao-cabecalho" data-block-id="missao-cabecalho" class="container site-block" data-name="Cabeçalho da Missão" style="background: transparent; border: none; padding: 0; align-items: center; gap: 8px;">
        <p id="missao-status-tag" data-block-id="missao-status-tag" class="paragraph site-block" data-name="Etiqueta da Missão" style="color: #c084fc; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin: 0; padding: 0;">🚀 Missão Interestelar · Cruzador Apollo-X</p>
        <h1 id="missao-titulo" data-block-id="missao-titulo" class="heading site-block" data-name="Título da Missão" style="color: #f8fafc; font-size: 30px; font-weight: 900; margin: 0; padding: 0;">O Mistério da Nebulosa de Chronos 🪐</h1>
      </div>

      <!-- Painel de Telemetria da Nave -->
      <div id="painel-telemetria" data-block-id="painel-telemetria" class="container site-block" data-name="Painel de Telemetria" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 14px; background-color: #020617; border-radius: 18px; border: 2px solid #334155; padding: 12px 24px; width: 100%;">
        <p id="status-escudos" data-block-id="status-escudos" class="paragraph site-block" data-name="Escudos" style="color: #38bdf8; font-size: 14px; font-weight: 800; margin: 0; padding: 0;">🛡️ Escudos: 100%</p>
        <p id="status-energia" data-block-id="status-energia" class="paragraph site-block" data-name="Reator" style="color: #facc15; font-size: 14px; font-weight: 800; margin: 0; padding: 0;">⚡ Reator Plasma: 95%</p>
        <p id="status-ia" data-block-id="status-ia" class="paragraph site-block" data-name="IA de Bordo" style="color: #4ade80; font-size: 14px; font-weight: 800; margin: 0; padding: 0;">🤖 IA KRONOS: Online</p>
      </div>

      <!-- Holo-Visualizador de Espaço Profundo -->
      <img id="missao-imagem" data-block-id="missao-imagem" class="image site-block" data-name="Holo-Visualizador" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80" alt="Nebulosa Cósmica no Espaço Profundo" style="border-radius: 20px; border: 3px solid #6366f1; max-height: 260px; object-fit: cover; width: 100%;">

      <!-- Terminal Narrativo de Diálogo -->
      <div id="narrativa-box" data-block-id="narrativa-box" class="container site-block" data-name="Terminal de Diálogo" style="background-color: #1e1b4b; border-radius: 22px; border: 2px solid #818cf8; padding: 24px; width: 100%; max-width: 720px; align-items: center; gap: 10px;">
        <h2 id="narrativa-titulo" data-block-id="narrativa-titulo" class="heading site-block" data-name="Título do Registro" style="color: #a5b4fc; font-size: 20px; font-weight: 800; margin: 0; padding: 0;">Capitão no Comando! Registro #404 📡</h2>
        <p id="narrativa-texto" data-block-id="narrativa-texto" class="paragraph site-block" data-name="Texto da História" style="color: #e0e7ff; font-size: 16px; line-height: 1.7; margin: 0; padding: 0;">O radar de bordo captou um sinal pulsante de rádio vindo de uma cratera de gelo cósmico. Tempestades de plasma se aproximam em 4 minutos. Comandante, ordene a ação imediata!</p>
      </div>

      <!-- 3 Escolhas Táticas de Rota -->
      <div id="botoes-decisao" data-block-id="botoes-decisao" class="container site-block" data-name="Opções de Rota" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 14px; background: transparent; border: none; padding: 4px; width: 100%;">
        <button id="btn-rota-pouso" data-block-id="btn-rota-pouso" class="button site-block" data-name="Rota 1 (Pousar)" style="background-color: #2563eb; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 14px 22px; border-bottom: 5px solid #1d4ed8; cursor: pointer;">🪐 1. Pousar e Explorar a Cratera</button>
        <button id="btn-rota-escudos" data-block-id="btn-rota-escudos" class="button site-block" data-name="Rota 2 (Escudos)" style="background-color: #d97706; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 14px 22px; border-bottom: 5px solid #b45309; cursor: pointer;">🛡️ 2. Erguer Escudos e Lançar Sondas</button>
        <button id="btn-rota-salto" data-block-id="btn-rota-salto" class="button site-block" data-name="Rota 3 (Hiperespaço)" style="background-color: #9333ea; color: #ffffff; border-radius: 18px; font-weight: 800; font-size: 15px; padding: 14px 22px; border-bottom: 5px solid #7e22ce; cursor: pointer;">⚡ 3. Ativar Salto para o Hiperespaço</button>
      </div>

      <!-- Compartimento de Carga & Diário de Bordo -->
      <div id="painel-status-nave" data-block-id="painel-status-nave" class="container site-block" data-name="Diário e Carga" style="flex-direction: column; align-items: center; background-color: #020617; border-radius: 18px; border: 2px solid #334155; padding: 16px 24px; width: 100%; max-width: 720px; gap: 8px;">
        <p id="txt-status-nave" data-block-id="txt-status-nave" class="paragraph site-block" data-name="Inventário da Nave" style="color: #38bdf8; font-size: 14px; font-weight: 800; margin: 0; padding: 0;">💎 Compartimento de Carga: Vazio (Escolha uma rota para explorar)</p>
        <p id="txt-diario-bordo" data-block-id="txt-diario-bordo" class="paragraph site-block" data-name="Diário de Bordo" style="color: #94a3b8; font-size: 13px; font-weight: 600; margin: 0; padding: 0;">📜 Diário de Bordo: Aguardando primeira ordem do comandante.</p>
      </div>

      <!-- Controles Auxiliares -->
      <div id="botoes-auxiliares" data-block-id="botoes-auxiliares" class="container site-block" data-name="Ações da Frota" style="flex-direction: row; justify-content: center; gap: 12px; background: transparent; border: none; padding: 0; flex-wrap: wrap;">
        <button id="btn-alarme-missao" data-block-id="btn-alarme-missao" class="button site-block" data-name="Botão Alerta Vermelho" style="background-color: #dc2626; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 13px; padding: 8px 18px; border-bottom: 3px solid #991b1b; cursor: pointer;">🚨 Alerta Vermelho</button>
        <button id="btn-reiniciar-missao" data-block-id="btn-reiniciar-missao" class="button site-block" data-name="Botão Reiniciar Missão" style="background-color: #475569; color: #ffffff; border-radius: 9999px; font-weight: 800; font-size: 13px; padding: 8px 18px; border-bottom: 3px solid #1e293b; cursor: pointer;">🔄 Reiniciar Simulação</button>
      </div>

    </div>
  </main>
</body>
</html>`,
      css: BASE_CSS,
      js: `// JavaScript da Odisseia Espacial

// UEBIT-BLOCKLY:START
(() => {
let __uebitLoopBudget = 10000;
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-rota-pouso"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="narrativa-titulo"]").forEach(node => { node.textContent = '💎 Cristais Energéticos Descobertos!'; });
document.querySelectorAll("[data-block-id="narrativa-texto"]").forEach(node => { node.textContent = 'A nave tocou o solo de gelo com precisão. A tripulação minerou cristais que recarregaram os motores ao infinito!'; });
document.querySelectorAll("[data-block-id="txt-status-nave"]").forEach(node => { node.textContent = '💎 Carga Coletada: 3x Cristais Luminescentes Raros de Titã!'; });
document.querySelectorAll("[data-block-id="txt-diario-bordo"]").forEach(node => { node.textContent = '📜 Registro: Pouso bem-sucedido na cratera gelada. Recursos minerados com louvor!'; });
document.querySelectorAll("[data-block-id="status-energia"]").forEach(node => { node.textContent = '⚡ Reator Plasma: 100% (Energia Infinita!)'; });
document.querySelectorAll("[data-block-id="status-escudos"]").forEach(node => { node.textContent = '🛡️ Escudos: 80% (Desgaste no solo)'; });
document.querySelectorAll("[data-block-id="narrativa-box"]").forEach(node => { node.style.backgroundColor = "#15803d"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-rota-escudos"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="narrativa-titulo"]").forEach(node => { node.textContent = '🤖 Sonda Antiga da Terra Resgatada!'; });
document.querySelectorAll("[data-block-id="narrativa-texto"]").forEach(node => { node.textContent = 'Os escudos suportaram a radiação enquanto o raio trator atraía uma sonda histórica da Terra Antiga repleta de dados científicos!'; });
document.querySelectorAll("[data-block-id="txt-status-nave"]").forEach(node => { node.textContent = '💾 Carga Coletada: Banco de Dados Histórico da Terra Antiga!'; });
document.querySelectorAll("[data-block-id="txt-diario-bordo"]").forEach(node => { node.textContent = '📜 Registro: Sonda espacial recuperada intacta. Missão de resgate bem-sucedida!'; });
document.querySelectorAll("[data-block-id="status-escudos"]").forEach(node => { node.textContent = '🛡️ Escudos: 90% (Impactos absorvidos)'; });
document.querySelectorAll("[data-block-id="narrativa-box"]").forEach(node => { node.style.backgroundColor = "#2563eb"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-rota-salto"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="narrativa-titulo"]").forEach(node => { node.textContent = '🌌 Salto Quântico Interestelar!'; });
document.querySelectorAll("[data-block-id="narrativa-texto"]").forEach(node => { node.textContent = 'VRUMMM! Em um flash cintilante, a nave dobrou o espaço-tempo, cruzou cinco galáxias e encontrou a Estação Nova Atlântida!'; });
document.querySelectorAll("[data-block-id="txt-status-nave"]").forEach(node => { node.textContent = '🗺️ Descoberta: Carta de Navegação para a Dimensão Ômega!'; });
document.querySelectorAll("[data-block-id="txt-diario-bordo"]").forEach(node => { node.textContent = '📜 Registro: Salto completado com louvor. Nova Atlântida alcançada!'; });
document.querySelectorAll("[data-block-id="status-energia"]").forEach(node => { node.textContent = '⚡ Reator Plasma: 45% (Consumo de hiperespaço)'; });
document.querySelectorAll("[data-block-id="narrativa-box"]").forEach(node => { node.style.backgroundColor = "#9333ea"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-alarme-missao"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="status-ia"]").forEach(node => { node.textContent = '🚨 IA KRONOS: ALERTA VERMELHO ATIVADO!'; });
document.querySelectorAll("[data-block-id="narrativa-titulo"]").forEach(node => { node.textContent = '🚨 PROTOCOLO DE DEFESA ACIONADO!'; });
document.querySelectorAll("[data-block-id="narrativa-texto"]").forEach(node => { node.textContent = 'Sirenes ecoam pelos corredores da nave! Todos os tripulantes assumiram seus postos de prontidão cósmica!'; });
document.querySelectorAll("[data-block-id="narrativa-box"]").forEach(node => { node.style.backgroundColor = "#991b1b"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-reiniciar-missao"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="narrativa-titulo"]").forEach(node => { node.textContent = 'Capitão no Comando! Registro #404 📡'; });
document.querySelectorAll("[data-block-id="narrativa-texto"]").forEach(node => { node.textContent = 'O radar de bordo captou um sinal pulsante de rádio vindo de uma cratera de gelo cósmico. Tempestades de plasma se aproximam em 4 minutos. Comandante, ordene a ação imediata!'; });
document.querySelectorAll("[data-block-id="txt-status-nave"]").forEach(node => { node.textContent = '💎 Compartimento de Carga: Vazio (Escolha uma rota para explorar)'; });
document.querySelectorAll("[data-block-id="txt-diario-bordo"]").forEach(node => { node.textContent = '📜 Diário de Bordo: Aguardando primeira ordem do comandante.'; });
document.querySelectorAll("[data-block-id="status-escudos"]").forEach(node => { node.textContent = '🛡️ Escudos: 100%'; });
document.querySelectorAll("[data-block-id="status-energia"]").forEach(node => { node.textContent = '⚡ Reator Plasma: 95%'; });
document.querySelectorAll("[data-block-id="status-ia"]").forEach(node => { node.textContent = '🤖 IA KRONOS: Online'; });
document.querySelectorAll("[data-block-id="narrativa-box"]").forEach(node => { node.style.backgroundColor = "#1e1b4b"; });
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
                        inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'A nave tocou o solo de gelo com precisão. A tripulação minerou cristais que recarregaram os motores ao infinito!' } } } },
                        next: {
                          block: {
                            type: 'site_text_element',
                            id: 'space_txt_status',
                            fields: { TARGET: 'txt-status-nave' },
                            inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '💎 Carga Coletada: 3x Cristais Luminescentes Raros de Titã!' } } } },
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
      generated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-rota-pouso"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="narrativa-titulo"]").forEach(node => { node.textContent = '💎 Cristais Energéticos Descobertos!'; });\ndocument.querySelectorAll("[data-block-id="narrativa-texto"]").forEach(node => { node.textContent = 'A nave tocou o solo de gelo com precisão. A tripulação minerou cristais que recarregaram os motores ao infinito!'; });\ndocument.querySelectorAll("[data-block-id="txt-status-nave"]").forEach(node => { node.textContent = '💎 Carga Coletada: 3x Cristais Luminescentes Raros de Titã!'; });\ndocument.querySelectorAll("[data-block-id="narrativa-box"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
      applied: `// UEBIT-BLOCKLY:START\n(() => {\nlet __uebitLoopBudget = 10000;\ndocument.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-rota-pouso"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="narrativa-titulo"]").forEach(node => { node.textContent = '💎 Cristais Energéticos Descobertos!'; });\ndocument.querySelectorAll("[data-block-id="narrativa-texto"]").forEach(node => { node.textContent = 'A nave tocou o solo de gelo com precisão. A tripulação minerou cristais que recarregaram os motores ao infinito!'; });\ndocument.querySelectorAll("[data-block-id="txt-status-nave"]").forEach(node => { node.textContent = '💎 Carga Coletada: 3x Cristais Luminescentes Raros de Titã!'; });\ndocument.querySelectorAll("[data-block-id="narrativa-box"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n\n})();\n// UEBIT-BLOCKLY:END`,
      appliedGenerated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-rota-pouso"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="narrativa-titulo"]").forEach(node => { node.textContent = '💎 Cristais Energéticos Descobertos!'; });\ndocument.querySelectorAll("[data-block-id="narrativa-texto"]").forEach(node => { node.textContent = 'A nave tocou o solo de gelo com precisão. A tripulação minerou cristais que recarregaram os motores ao infinito!'; });\ndocument.querySelectorAll("[data-block-id="txt-status-nave"]").forEach(node => { node.textContent = '💎 Carga Coletada: 3x Cristais Luminescentes Raros de Titã!'; });\ndocument.querySelectorAll("[data-block-id="narrativa-box"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
    },
  },
  {
    id: 'cyber-store',
    name: 'Pizzaria & Delivery do Chef Bit',
    description: 'Cardápio gourmet completo com fotos deliciosas, carrinho de compras interativo em tempo real, cálculo de valor e envio de pedido!',
    badge: 'Comércio & Delivery',
    color: 'amber',
    tagColor: 'bg-amber-100 text-amber-950 border-amber-300',
    buttonColor: 'bg-amber-600 hover:bg-amber-500 border-amber-800',
    icon: 'UtensilsCrossed',
    code: {
      html: `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pizzaria & Delivery do Chef Bit</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <main class="site" data-site-root>
    <div id="restaurante-card" data-block-id="restaurante-card" class="container site-block" data-name="Restaurante do Chef Bit" style="background-color: #fffbeb; border-radius: 28px; border: 4px solid #f59e0b; padding: 32px; gap: 20px; align-items: center; text-align: center;">
      
      <!-- Cabeçalho e Oferta Especial -->
      <div id="restaurante-header" data-block-id="restaurante-header" class="container site-block" data-name="Cabeçalho da Lanchonete" style="background: transparent; border: none; padding: 0; align-items: center; gap: 8px; width: 100%;">
        <span id="restaurante-badge" data-block-id="restaurante-badge" class="span site-block" data-name="Selo Gourmet" style="background-color: #fef3c7; color: #b45309; border-radius: 9999px; font-weight: 800; font-size: 13px; padding: 6px 18px; border: 1px solid #fde68a;">👨‍🍳 Cozinha Artesanal · Forno a Lenha</span>
        <h1 id="restaurante-nome" data-block-id="restaurante-nome" class="heading site-block" data-name="Nome da Pizzaria" style="color: #78350f; font-size: 32px; font-weight: 900; margin: 0; padding: 0;">Pizzaria & Burger do Chef Bit 🍕</h1>
        <p id="restaurante-cupom" data-block-id="restaurante-cupom" class="paragraph site-block" data-name="Cupom de Desconto" style="color: #b91c1c; font-size: 15px; font-weight: 800; background-color: #fee2e2; border-radius: 12px; padding: 8px 18px; border: 2px dashed #ef4444; margin: 0;">🎉 CUPOM DO DIA: 'BIT10' = 10% de Desconto + Entrega Grátis!</p>
      </div>

      <!-- Cardápio em Destaque com Fotos e Preços -->
      <div id="menu-grid" data-block-id="menu-grid" class="container site-block" data-name="Cardápio em Destaque" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 20px; background: transparent; border: none; padding: 0; width: 100%;">
        
        <div id="card-prato-1" data-block-id="card-prato-1" class="container site-block" data-name="Pizza Margherita" style="background-color: #ffffff; border-radius: 20px; border: 2px solid #fed7aa; padding: 18px; width: 280px; gap: 10px; align-items: center;">
          <img id="img-prato-1" data-block-id="img-prato-1" class="image site-block" data-name="Foto da Pizza" src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80" alt="Pizza Margherita Forno a Lenha" style="border-radius: 14px; height: 160px; object-fit: cover; width: 100%;">
          <h3 id="nome-prato-1" data-block-id="nome-prato-1" class="heading site-block" data-name="Nome Pizza" style="color: #7c2d12; font-size: 18px; font-weight: 800; margin: 0; padding: 0;">Pizza Margherita 🍕</h3>
          <p id="desc-prato-1" data-block-id="desc-prato-1" class="paragraph site-block" data-name="Desc Pizza" style="color: #78716c; font-size: 13px; line-height: 1.5; margin: 0; padding: 0;">Molho italiano rústico, queijo mozzarella derretido e manjericão fresco da horta.</p>
          <strong id="preco-prato-1" data-block-id="preco-prato-1" class="strong site-block" data-name="Preço Pizza" style="color: #ea580c; font-size: 18px; padding: 2px 0;">R$ 42,00</strong>
          <button id="btn-pedir-pizza" data-block-id="btn-pedir-pizza" class="button site-block" data-name="Pedir Pizza" style="background-color: #ea580c; color: #ffffff; border-radius: 14px; font-weight: 800; font-size: 14px; padding: 12px 20px; border-bottom: 4px solid #c2410c; cursor: pointer; width: 100%;">+ Adicionar Pizza</button>
        </div>

        <div id="card-prato-2" data-block-id="card-prato-2" class="container site-block" data-name="Monster Burger" style="background-color: #ffffff; border-radius: 20px; border: 2px solid #fed7aa; padding: 18px; width: 280px; gap: 10px; align-items: center;">
          <img id="img-prato-2" data-block-id="img-prato-2" class="image site-block" data-name="Foto do Burger" src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80" alt="Hambúrguer Artesanal com Queijo" style="border-radius: 14px; height: 160px; object-fit: cover; width: 100%;">
          <h3 id="nome-prato-2" data-block-id="nome-prato-2" class="heading site-block" data-name="Nome Burger" style="color: #7c2d12; font-size: 18px; font-weight: 800; margin: 0; padding: 0;">Monster Burger 🍔</h3>
          <p id="desc-prato-2" data-block-id="desc-prato-2" class="paragraph site-block" data-name="Desc Burger" style="color: #78716c; font-size: 13px; line-height: 1.5; margin: 0; padding: 0;">Dois hambúrgueres artesanais de 160g, cebola caramelizada e piscina de cheddar.</p>
          <strong id="preco-prato-2" data-block-id="preco-prato-2" class="strong site-block" data-name="Preço Burger" style="color: #ea580c; font-size: 18px; padding: 2px 0;">R$ 36,00</strong>
          <button id="btn-pedir-burguer" data-block-id="btn-pedir-burguer" class="button site-block" data-name="Pedir Burger" style="background-color: #ea580c; color: #ffffff; border-radius: 14px; font-weight: 800; font-size: 14px; padding: 12px 20px; border-bottom: 4px solid #c2410c; cursor: pointer; width: 100%;">+ Adicionar Burger</button>
        </div>

        <div id="card-prato-3" data-block-id="card-prato-3" class="container site-block" data-name="Milk-Shake" style="background-color: #ffffff; border-radius: 20px; border: 2px solid #fed7aa; padding: 18px; width: 280px; gap: 10px; align-items: center;">
          <img id="img-prato-3" data-block-id="img-prato-3" class="image site-block" data-name="Foto do Shake" src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80" alt="Milk-shake com chantilly" style="border-radius: 14px; height: 160px; object-fit: cover; width: 100%;">
          <h3 id="nome-prato-3" data-block-id="nome-prato-3" class="heading site-block" data-name="Nome Shake" style="color: #7c2d12; font-size: 18px; font-weight: 800; margin: 0; padding: 0;">Milk-Shake Vulcão 🥤</h3>
          <p id="desc-prato-3" data-block-id="desc-prato-3" class="paragraph site-block" data-name="Desc Shake" style="color: #78716c; font-size: 13px; line-height: 1.5; margin: 0; padding: 0;">Sorvete cremoso de morangos frescos batidos, calda artesanal e chantilly nevado.</p>
          <strong id="preco-prato-3" data-block-id="preco-prato-3" class="strong site-block" data-name="Preço Shake" style="color: #ea580c; font-size: 18px; padding: 2px 0;">R$ 18,00</strong>
          <button id="btn-pedir-shake" data-block-id="btn-pedir-shake" class="button site-block" data-name="Pedir Shake" style="background-color: #ea580c; color: #ffffff; border-radius: 14px; font-weight: 800; font-size: 14px; padding: 12px 20px; border-bottom: 4px solid #c2410c; cursor: pointer; width: 100%;">+ Adicionar Shake</button>
        </div>

      </div>

      <!-- Painel do Carrinho de Compras Interativo -->
      <div id="carrinho-box" data-block-id="carrinho-box" class="container site-block" data-name="Painel do Carrinho" style="background-color: #ffffff; border-radius: 22px; border: 3px solid #f97316; padding: 24px; width: 100%; max-width: 680px; align-items: center; gap: 12px;">
        <h2 id="carrinho-titulo" data-block-id="carrinho-titulo" class="heading site-block" data-name="Título Carrinho" style="color: #c2410c; font-size: 22px; font-weight: 900; margin: 0; padding: 0;">🛒 Seu Pedido em Tempo Real</h2>
        <p id="txt-carrinho-itens" data-block-id="txt-carrinho-itens" class="paragraph site-block" data-name="Itens do Pedido" style="color: #44403c; font-size: 15px; margin: 0; padding: 0;">Carrinho vazio. Escolha um dos pratos acima para começar!</p>
        <strong id="txt-carrinho-total" data-block-id="txt-carrinho-total" class="strong site-block" data-name="Valor Total" style="color: #15803d; font-size: 22px; font-weight: 900; padding: 2px 0;">Total: R$ 0,00</strong>
        <p id="feedback-cozinha" data-block-id="feedback-cozinha" class="paragraph site-block" data-name="Status da Cozinha" style="color: #a16207; font-size: 13px; font-weight: 700; margin: 0; padding: 0;">🛵 Entrega expressa estimada em 25 a 35 minutos!</p>
        <div id="carrinho-botoes" data-block-id="carrinho-botoes" class="container site-block" data-name="Ações do Pedido" style="flex-direction: row; gap: 12px; background: transparent; border: none; padding: 0; justify-content: center; flex-wrap: wrap;">
          <button id="btn-finalizar-pedido" data-block-id="btn-finalizar-pedido" class="button site-block" data-name="Finalizar Pedido" style="background-color: #16a34a; color: #ffffff; border-radius: 16px; font-weight: 800; font-size: 15px; padding: 14px 26px; border-bottom: 5px solid #15803d; cursor: pointer;">✅ Finalizar e Enviar para Cozinha</button>
          <button id="btn-limpar-carrinho" data-block-id="btn-limpar-carrinho" class="button site-block" data-name="Limpar Pedido" style="background-color: #78716c; color: #ffffff; border-radius: 16px; font-weight: 800; font-size: 14px; padding: 14px 20px; border-bottom: 5px solid #57534e; cursor: pointer;">🗑️ Limpar Pedido</button>
        </div>
      </div>

    </div>
  </main>
</body>
</html>`,
      css: BASE_CSS,
      js: `// JavaScript da Pizzaria & Delivery do Chef Bit

// UEBIT-BLOCKLY:START
(() => {
let __uebitLoopBudget = 10000;
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-pedir-pizza"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="txt-carrinho-itens"]").forEach(node => { node.textContent = '🍕 1x Pizza Margherita Especial adicionada com sucesso!'; });
document.querySelectorAll("[data-block-id="txt-carrinho-total"]").forEach(node => { node.textContent = 'Total: R$ 42,00'; });
document.querySelectorAll("[data-block-id="feedback-cozinha"]").forEach(node => { node.textContent = '👨‍🍳 Chef Bit já separou a massa fresca para abrir no forno!'; });
document.querySelectorAll("[data-block-id="carrinho-box"]").forEach(node => { node.style.backgroundColor = "#f0fdf4"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-pedir-burguer"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="txt-carrinho-itens"]").forEach(node => { node.textContent = '🍔 1x Monster Burger Duplo adicionado ao pedido!'; });
document.querySelectorAll("[data-block-id="txt-carrinho-total"]").forEach(node => { node.textContent = 'Total: R$ 36,00'; });
document.querySelectorAll("[data-block-id="feedback-cozinha"]").forEach(node => { node.textContent = '🔥 A chapa está quente! Hambúrguer artesanal entrando em produção!'; });
document.querySelectorAll("[data-block-id="carrinho-box"]").forEach(node => { node.style.backgroundColor = "#f0fdf4"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-pedir-shake"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="txt-carrinho-itens"]").forEach(node => { node.textContent = '🥤 1x Milk-Shake Vulcão adicionado ao pedido!'; });
document.querySelectorAll("[data-block-id="txt-carrinho-total"]").forEach(node => { node.textContent = 'Total: R$ 18,00'; });
document.querySelectorAll("[data-block-id="feedback-cozinha"]").forEach(node => { node.textContent = '🍓 Morangos frescos e sorvete batidos com muito chantilly!'; });
document.querySelectorAll("[data-block-id="carrinho-box"]").forEach(node => { node.style.backgroundColor = "#f0fdf4"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-finalizar-pedido"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="feedback-cozinha"]").forEach(node => { node.textContent = '🎉 PEDIDO CONFIRMADO! O motoboy veloz do Chef Bit sai em 15 minutos! Bom apetite!'; });
document.querySelectorAll("[data-block-id="carrinho-titulo"]").forEach(node => { node.textContent = '✅ Pedido Enviado para Produção!'; });
document.querySelectorAll("[data-block-id="carrinho-box"]").forEach(node => { node.style.backgroundColor = "#dcfce7"; });
}
});
document.addEventListener('click', (event) => {
if (event.target.closest("[data-block-id="btn-limpar-carrinho"]")) {
__uebitLoopBudget = 10000;
document.querySelectorAll("[data-block-id="txt-carrinho-itens"]").forEach(node => { node.textContent = 'Carrinho vazio. Escolha um dos pratos acima para começar!'; });
document.querySelectorAll("[data-block-id="txt-carrinho-total"]").forEach(node => { node.textContent = 'Total: R$ 0,00'; });
document.querySelectorAll("[data-block-id="feedback-cozinha"]").forEach(node => { node.textContent = '🛵 Entrega expressa estimada em 25 a 35 minutos!'; });
document.querySelectorAll("[data-block-id="carrinho-titulo"]").forEach(node => { node.textContent = '🛒 Seu Pedido em Tempo Real'; });
document.querySelectorAll("[data-block-id="carrinho-box"]").forEach(node => { node.style.backgroundColor = "#ffffff"; });
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
              id: 'store_click_pizza',
              x: 40,
              y: 40,
              fields: { TARGET: 'btn-pedir-pizza' },
              inputs: {
                DO: {
                  block: {
                    type: 'site_text_element',
                    id: 'store_txt_itens',
                    fields: { TARGET: 'txt-carrinho-itens' },
                    inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '🍕 1x Pizza Margherita Especial adicionada com sucesso!' } } } },
                    next: {
                      block: {
                        type: 'site_text_element',
                        id: 'store_txt_total',
                        fields: { TARGET: 'txt-carrinho-total' },
                        inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Total: R$ 42,00' } } } },
                        next: {
                          block: {
                            type: 'site_background_element',
                            id: 'store_bg_cart',
                            fields: { TARGET: 'carrinho-box', COLOR: '#15803d' },
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
      generated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-pedir-pizza"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="txt-carrinho-itens"]").forEach(node => { node.textContent = '🍕 1x Pizza Margherita Especial adicionada com sucesso!'; });\ndocument.querySelectorAll("[data-block-id="txt-carrinho-total"]").forEach(node => { node.textContent = 'Total: R$ 42,00'; });\ndocument.querySelectorAll("[data-block-id="carrinho-box"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
      applied: `// UEBIT-BLOCKLY:START\n(() => {\nlet __uebitLoopBudget = 10000;\ndocument.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-pedir-pizza"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="txt-carrinho-itens"]").forEach(node => { node.textContent = '🍕 1x Pizza Margherita Especial adicionada com sucesso!'; });\ndocument.querySelectorAll("[data-block-id="txt-carrinho-total"]").forEach(node => { node.textContent = 'Total: R$ 42,00'; });\ndocument.querySelectorAll("[data-block-id="carrinho-box"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n\n})();\n// UEBIT-BLOCKLY:END`,
      appliedGenerated: `document.addEventListener('click', (event) => {\nif (event.target.closest("[data-block-id="btn-pedir-pizza"]")) {\n__uebitLoopBudget = 10000;\ndocument.querySelectorAll("[data-block-id="txt-carrinho-itens"]").forEach(node => { node.textContent = '🍕 1x Pizza Margherita Especial adicionada com sucesso!'; });\ndocument.querySelectorAll("[data-block-id="txt-carrinho-total"]").forEach(node => { node.textContent = 'Total: R$ 42,00'; });\ndocument.querySelectorAll("[data-block-id="carrinho-box"]").forEach(node => { node.style.backgroundColor = "#15803d"; });\n}\n});\n`,
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
  'store': 'cyber-store',
  'delivery': 'cyber-store',
  'pizza': 'cyber-store',
}

export function getTemplate(id) {
  const targetId = ALIASES[id] || id
  return TEMPLATES.find((t) => t.id === targetId) ?? TEMPLATES[0]
}
