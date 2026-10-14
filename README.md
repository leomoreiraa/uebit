# CNA Studio

Construtor de sites educacional com React, Vite e Tailwind CSS.

## Executar

```sh
npm install
npm run dev
```

## Verificar

```sh
npm run lint
npm test
npm run build
```

`npm run preview` serve o build de produção localmente.

Testes de integração no navegador:

```sh
npx playwright install chromium
npm run test:e2e
```

No Windows com Microsoft Edge instalado, também é possível usar `npx playwright test --project=edge`.

## Fases

1. **Concluída — Estrutura:** layout responsivo com header, sidebar e área de trabalho. Alternância Visual/Código e seletores HTML/CSS/JS apresentam os espaços de cada modo.
2. **Concluída — Visual Builder:** arrastar e soltar títulos, parágrafos, imagens e botões usando `@dnd-kit/core`, com feedback visual e adição alternativa por clique ou teclado.
3. **Concluída — Code Engine:** Monaco com HTML, CSS e JavaScript puros, prévia ao vivo e sincronização entre código e elementos visuais.
4. **Concluída — Exportação:** download de `index.html`, `style.css` e `script.js` em ZIP com JSZip e FileSaver, incluindo imagens locais e enviadas.

As quatro fases iniciais estão implementadas.

### Expansão Scratch / MakeCode

5. **Concluída — Refatoração visual:** navbar violeta, botões arredondados e espessos, ícones Lucide, paleta categorizada (texto azul, imagens roxas e ações laranja), área central com fundo pontilhado e edição existente em um painel à direita. Em telas menores, os painéis se reorganizam verticalmente.
6. **Concluída — Palco:** botão verde Play na navbar abre uma prévia interativa sem ferramentas de edição. “Voltar ao editor” retorna ao modo anterior com o código e a seleção preservados. A versão mobile mantém a largura escolhida; desktop se adapta ao espaço disponível. A exportação continua acessível no palco.
7. **Concluída — Propriedades lúdicas:** paletas de cor de texto/fundo, tamanhos de texto P/M/G e opções visuais de largura e altura mínima. Cores e fonte são compartilhadas; dimensões respeitam a versão desktop/mobile selecionada.
8. **Concluída — Blockly:** aba adicional de blocos com geração de JavaScript e integração à exportação. O editor escrito HTML/CSS/JS com Monaco continua disponível.

## Programar com blocos

Em **Código → Blocos**, arraste e encaixe blocos das categorias Eventos, Minha página, Lógica, Repetições, Matemática, Texto e Variáveis. Os blocos de página permitem responder a cliques, trocar textos, mudar fundos e mostrar mensagens.

Nos blocos de **Eventos** e **Minha página**, escolha o destino por nome em uma lista. O caminho completo (por exemplo, `Container 1 › Container 1 › Botão 1: Saiba mais`) identifica elementos em qualquer nível. Os vínculos usam IDs estáveis: mover o bloco entre containers não quebra sua ação. Ao aplicar, HTML escrito manualmente também recebe `data-block-id`, sem alteração do layout.

O bloco de mudar texto oferece títulos, parágrafos e botões, evitando substituir os filhos de um container. Eventos e mudanças de fundo também podem escolher containers e imagens. Destinos vazios ou removidos pedem uma nova seleção antes de aplicar; a última versão aplicada é mantida. A categoria **Seletores CSS** preserva os blocos avançados com seletores como `.button`, `h1` ou `#meu-id` e os programas anteriores continuam compatíveis.

Clique em **Aplicar blocos ao site** para atualizar a prévia, o Palco e o `script.js` exportado. Alterações ainda não aplicadas são indicadas na interface. **Ver JavaScript gerado** mostra o resultado da montagem. As abas HTML, CSS e JS permanecem editáveis; JavaScript escrito à mão não é convertido automaticamente para blocos.

O workspace é preservado ao alternar abas, Visual e Palco durante a sessão. O código gerado fica entre os marcadores `CNA-BLOCKLY:START` e `CNA-BLOCKLY:END`. Escreva código manual fora desse trecho: se ele for alterado manualmente, a aplicação dos blocos informa o conflito, sem sobrescrever as alterações. Apagar todos os blocos e aplicar remove apenas o trecho gerado. Loops gerados têm limite de 10.000 passos por execução/evento.

Blockly e react-blockly são carregados sob demanda. `react-blockly@9` declara peer dependency até React 18; `.npmrc` configura `legacy-peer-deps` para a instalação com React 19. A integração é coberta por testes no navegador, incluindo arrastar blocos e executar o ZIP exportado.

## Motor Flexbox e containers aninhados

O Canvas usa **Flexbox** e uma árvore de elementos com `children`. A página organiza seus filhos em fluxo vertical; containers podem conter textos, imagens, botões e outros containers. A ordem da árvore corresponde à ordem do HTML e à ordem de leitura. O motor anterior de posições por células foi substituído.

- Arraste um **Container** verde da paleta. Ao arrastar outros blocos, a **linha roxa** indica inserção antes/depois; o **destaque verde** indica inserção dentro do container.
- Os alvos de drop priorizam o nível mais profundo. A árvore impede inserir um container dentro de si mesmo ou de seus descendentes.
- Arraste pela alça **Mover** para ordenar irmãos ou transferir elementos entre containers. A área no final da página retira elementos dos containers e os coloca na raiz.
- Clicar na paleta adiciona ao container selecionado. Use **Selecionar página** para adicionar na raiz.
- O painel **Sua página por dentro** permite selecionar qualquer nível. **Mover antes**, **Mover depois** e **Sair do container** também funcionam por teclado.
- Containers oferecem **Lado a lado**, **Empilhado**, **Centralizar tudo**, distribuição, alinhamento e espaçamento. Essas opções geram `flex-direction`, `justify-content`, `align-items` e `gap`. `flex-wrap: wrap` permite quebrar a linha quando necessário.
- Largura: **Natural**, **Metade** ou **Toda**. Altura mínima: **Natural**, **Média** ou **Grande**; o bloco pode crescer conforme seu conteúdo.
- A prévia continua renderizando o HTML/CSS real em iframe. Somente as alças do editor usam sobreposições posicionadas; o conteúdo exportado permanece em fluxo Flexbox.

### Desktop e mobile

- A prévia **Desktop** usa uma página de 1280 px, reduzida visualmente para caber no editor.
- A versão **Mobile** empilha os containers automaticamente e usa a largura disponível, inclusive em níveis aninhados.
- Teste larguras de **320, 390 e 430 px**; as larguras são fluidas.
- Ajustes no mobile são independentes do desktop e preservados quando o desktop muda. **Regerar mobile** restaura a organização automática.
- O arraste considera o zoom da prévia. A estrutura e a ordem dos elementos são compartilhadas entre desktop e mobile.

Pelo teclado, use Tab e Enter para adicionar ou acionar os controles de organização. A alça Mover também oferece Espaço para iniciar/soltar e setas para navegar entre destinos. Soltar fora do Canvas ou pressionar Escape cancela o movimento. Elementos e configurações são preservados ao alternar entre Visual, Código e Palco durante a sessão.

Containers voltaram à paleta com aninhamento funcional. A imagem inicial usa um SVG local, sem depender de serviços externos.

## Editar elementos

1. Clique em um elemento do Canvas para abrir **Editar** no painel de propriedades à direita (abaixo da área de trabalho em telas menores).
2. Altere os campos e clique em **Aplicar alterações**.
3. Use **Testar página** para executar as ações dos botões; **Voltar a editar** retorna à seleção de elementos.

- **Cabeçalho:** texto e nível H1–H6.
- **Parágrafo:** texto, incluindo quebras de linha.
- **Imagem:** endereço, upload do computador, descrição alternativa e ajuste para preencher a área ou mostrar a imagem inteira.
- **Botão:** texto e ação — abrir link (com opção de nova aba), ir para um elemento da página ou mostrar uma mensagem.
- **Container:** configura o fluxo dos seus filhos; pode conter outros containers.
- **Excluir elemento:** remove o bloco, seus descendentes e suas regras específicas. O conteúdo é compartilhado entre desktop/mobile; cada versão mantém seu layout.

As ações são gravadas como atributos HTML e JavaScript puro em `script.js`. Código escrito manualmente é preservado ao reorganizar a árvore.

## Exportar o site

Clique em **Exportar Site** para baixar `meu-site.zip`, contendo somente:

```text
index.html
style.css
script.js
```

Extraia os três arquivos na mesma pasta e abra `index.html` no navegador. As referências ao CSS/JS e a configuração de viewport são incluídas automaticamente. O site exportado mantém a versão responsiva e as ações dos botões, sem depender de React ou do construtor.

Imagens enviadas ficam incorporadas no HTML; a imagem padrão e recursos locais referenciados em imagens/CSS também são incorporados durante a exportação. Imagens de URLs externas continuam usando esses endereços. Se um arquivo local não existir, a interface informa qual recurso precisa ser corrigido.

## Editar código

- Clique em **Código** para abrir as abas `index.html`, `style.css` e `script.js` no Monaco. O editor e seus workers são carregados localmente pelo Vite, sem CDN.
- A prévia ao vivo executa o HTML/CSS/JS da página. Alterações de texto, elementos, estilos e interações também aparecem no Canvas ao voltar para **Visual**.
- Adicionar, mover ou dimensionar um bloco atualiza a hierarquia HTML e suas regras Flexbox. O motor move nós existentes, preservando atributos, conteúdo personalizado, outras declarações CSS e JavaScript manual.
- Os controles visuais percorrem os filhos de `.site` / `[data-site-root]` recursivamente. Divs e elementos estruturais como `section` e `article` são containers; marcação interna de texto, como `em` e `strong`, permanece no próprio bloco. `data-block-id` identifica os elementos na sincronização, com validação de IDs duplicados em toda a árvore.
- Ao atualizar visualmente um projeto antigo, regras de posicionamento Grid dos elementos gerenciados são migradas para Flexbox; a ordem usada é a do HTML.
- O CSS gerado contém uma media query em `767px` para a versão mobile. A prévia usa a largura real de cada dispositivo, incluindo suas regras CSS.
- Erros de sintaxe CSS mostram uma mensagem com a linha e mantêm a última prévia válida. Corrija o código para voltar a editar visualmente. Erros de execução JavaScript são apresentados junto à prévia.
- O site roda em um iframe isolado: seu JavaScript não acessa a interface do construtor. As alças do editor acompanham as dimensões reais dos elementos renderizados.

## Estrutura

- `src/App.jsx`: estado dos elementos, contexto de arraste e modo de visualização.
- `src/components/Header.jsx`: marca, alternância de modo e botão de exportação.
- `src/components/Sidebar.jsx`: paleta dos cinco tipos de elementos, incluindo Container.
- `src/components/PropertiesPanel.jsx`: hierarquia, seleção e controles de organização.
- `src/components/FlexControls.jsx`: controles amigáveis de direção, alinhamento e espaçamento.
- `src/components/ElementInspector.jsx`: edição de textos, imagens, ações e remoção de blocos.
- `src/components/Workspace.jsx`: alternância do Canvas e Monaco carregado sob demanda.
- `src/components/Canvas.jsx`: área de soltar e alças de edição sobre a página renderizada.
- `src/components/CodeEditor.jsx`: abas HTML/CSS/JS e prévia ao vivo.
- `src/components/SitePreview.jsx`: iframe e comunicação das medidas dos elementos.
- `src/data/elements.js`: catálogo e criação dos dados de cada bloco.
- `src/lib/tree.js`: inserção, remoção, movimentação, proteção contra ciclos e layouts responsivos recursivos.
- `src/lib/block-targets.js`: nomes e caminhos da hierarquia para seleção nos blocos.
- `src/lib/responsive.js`: dimensões de prévia desktop/mobile.
- `src/lib/code-engine.js`: leitura do HTML/CSS e atualização do código a partir dos blocos.
- `src/lib/element-content.js`: propriedades editáveis, validação e ações dos botões.
- `src/lib/export-site.js`: incorporação de recursos, criação do ZIP e download.
- `src/lib/preview.js`: documento de prévia e execução do JavaScript.
- `src/lib/monaco.js`: configuração local do Monaco e workers.
- `tests/code-engine.spec.js`: testes de integração do editor, Canvas e sincronização.
- `tests/site-export.spec.js`: edição visual, ações e abertura do site exportado fora do construtor.
- `tests/nesting.spec.js`: arrastes reais entre níveis, ordenação, cancelamento, Flexbox responsivo e exportação de containers.
- `tests/block-targets.spec.js`: seleção visual de destinos aninhados, vínculos após movimentação, remoção de destinos e execução do ZIP exportado.
- `src/index.css`: Tailwind e estilos globais.
- `vite.config.js`: plugins React e Tailwind.
