export const GUIDES_PT = {
  "primeiros-passos": {
    "mission": "Você foi contratado para criar a página de boas-vindas de um clube de invenções. Vamos montar o começo do site!",
    "story": "Imagine uma casa de brinquedo: HTML são as paredes e os cômodos, CSS são as tintas e os móveis, e JavaScript é o botão que acende as luzes.",
    "words": [
      [
        "Navegador",
        "O programa que abre sites, como Chrome ou Firefox."
      ],
      [
        "HTML",
        "A linguagem que organiza títulos, textos e outras partes da página."
      ],
      [
        "Tag",
        "Uma marca entre < e > que explica ao navegador o tipo de conteúdo."
      ]
    ],
    "tryIt": "Antes de começar, pense: qual seria o nome de um clube que você criaria? Pode ser de jogos, livros, animais ou ciência.",
    "outcome": "Você terá uma página com um título e uma apresentação e conseguirá reconhecer as tags HTML por trás dela.",
    "tasks": [
      {
        "steps": [
          "No alto do editor, clique em **Design Visual**.",
          "Se estiver no celular, abra a **Paleta de elementos** usando o botão de menu.",
          "Encontre a categoria **Texto** e clique em **Cabeçalho** (H). A peça aparecerá na página.",
          "Clique no novo título. No painel **Estilos**, procure o campo **Texto** ou **Texto do elemento**.",
          "Troque o texto por **Clube dos Inventores**. Você também pode dar outro nome ao clube.",
          "Olhe a página: o título precisa aparecer grande, na região em que você o colocou."
        ],
        "success": "Um título está visível. O círculo da atividade deve ficar verde.",
        "trouble": "Se o título não aparecer, confira se está em Design Visual e se o botão Cabeçalho foi clicado. No celular, abra o painel **Propriedades** para editar."
      },
      {
        "steps": [
          "Continue em **Design Visual**.",
          "Na **Paleta de elementos**, clique em **Parágrafo** (¶), na categoria Texto.",
          "Clique no parágrafo que apareceu na página.",
          "No painel **Estilos**, encontre **Texto do elemento** e escreva duas frases, por exemplo: **Somos crianças curiosas. Aqui mostramos nossas ideias!**",
          "Confirme que o texto está abaixo do título. Se quiser, arraste o parágrafo pela alça de mover."
        ],
        "success": "Você vê pelo menos um parágrafo na página, e a tarefa é marcada automaticamente.",
        "trouble": "Se o texto não mudar, selecione o parágrafo no canvas ou na lista **Estrutura da página** que fica em Estilos."
      },
      {
        "steps": [
          "Na barra superior, clique em **Código Gerado**.",
          "Na lista de arquivos do editor de código, selecione **HTML** (index.html).",
          "Procure a palavra **<h1** no código. Ela indica o começo do título principal.",
          "Procure também **<p**: é a marca de um parágrafo.",
          "Compare o que está escrito entre as tags com o texto que aparece no site.",
          "Volte a Design Visual e confira se os elementos continuam lá."
        ],
        "success": "Você encontrou a marca do título no HTML, e a atividade está marcada.",
        "trouble": "Se o código for muito grande, role dentro do editor de código. Não é preciso alterar nada nesta tarefa; basta observar.",
        "example": "<h1>Clube dos Inventores</h1>\n<p>Somos crianças curiosas!</p>"
      }
    ]
  },
  "textos-links": {
    "mission": "Seu clube precisa de uma página com uma lista de ideias e um caminho para aprender mais.",
    "story": "Pense numa lista de compras: cada item vai numa linha. Um link é como uma porta que leva a outra sala da internet.",
    "words": [
      [
        "Lista",
        "Um conjunto de itens separados para facilitar a leitura."
      ],
      [
        "Link",
        "Um texto ou botão que leva a outra página."
      ],
      [
        "Endereço (URL)",
        "O caminho que o navegador usa para encontrar uma página."
      ]
    ],
    "tryIt": "Pense em três coisas que gostaria de aprender neste ano: desenhar, criar jogos ou construir robôs?",
    "outcome": "Você conseguirá montar uma lista e um link que outra pessoa pode entender e usar.",
    "tasks": [
      {
        "steps": [
          "Clique em **Design Visual**.",
          "Na **Paleta de elementos**, abra a categoria **Texto**.",
          "Escolha **Lista com marcadores** ou **Lista numerada**.",
          "Clique na lista que apareceu na página e abra **Estilos**.",
          "No campo **Itens da lista**, escreva um item por linha: **Criar jogos**, **Desenhar personagens**, **Fazer robôs**.",
          "Veja se aparecem três itens separados."
        ],
        "success": "A lista aparece na página e a atividade fica verde.",
        "trouble": "Se os itens não se separarem, coloque cada um em sua própria linha no campo **Itens da lista**."
      },
      {
        "steps": [
          "Em Design Visual, na categoria **Texto**, clique em **Link**.",
          "Selecione o novo link na página; no painel **Estilos** encontre o campo de **Texto**.",
          "Troque o texto para **Aprender sobre HTML**.",
          "No campo de **Endereço/Link (href)**, cole **https://developer.mozilla.org/pt-BR/docs/Web/HTML**.",
          "Ative **Play** e teste o endereço, preferencialmente em uma nova aba se essa opção estiver disponível."
        ],
        "success": "Você tem um link visível. Para um desafio a mais, confira se ele abre o destino certo.",
        "trouble": "Se o endereço não abrir, confira se começou com **https://** e se não há espaços.",
        "example": "<a href=\"https://developer.mozilla.org/pt-BR/docs/Web/HTML\">Aprender sobre HTML</a>"
      },
      {
        "steps": [
          "Na categoria Texto, clique em **Negrito** para adicionar uma informação importante.",
          "Escreva no campo de texto: **Minhas três ideias favoritas**.",
          "Se preferir, adicione outro **Cabeçalho** com o nome da seção.",
          "Deixe esse destaque perto da lista para o leitor entender o assunto.",
          "Releia: o destaque combina com os itens da lista?"
        ],
        "success": "O seu destaque aparece e a atividade é marcada.",
        "trouble": "Se não ficar no lugar desejado, clique no elemento e mova-o pela alça."
      }
    ]
  },
  "imagens-acessibilidade": {
    "mission": "Você vai criar uma página ilustrada que todo mundo consiga compreender, inclusive quem não enxerga a imagem.",
    "story": "Imagine que um amigo está ouvindo sua história por telefone: você precisa contar com palavras o que aparece no desenho.",
    "words": [
      [
        "Imagem",
        "Um desenho ou fotografia exibido no site."
      ],
      [
        "Alt",
        "Texto que descreve uma imagem quando não é possível vê-la."
      ],
      [
        "Acessibilidade",
        "Criar algo que mais pessoas consigam usar."
      ]
    ],
    "tryIt": "Feche os olhos por três segundos e pense: como você descreveria uma foto de um cachorro brincando?",
    "outcome": "Você saberá colocar imagem, escrever uma boa descrição e explicar por que ela é importante.",
    "tasks": [
      {
        "steps": [
          "Entre em **Design Visual** e abra a categoria **Mídia** da paleta.",
          "Clique em **Imagem**. Uma imagem de exemplo aparecerá.",
          "Selecione a imagem e procure, no painel **Estilos**, os campos da imagem.",
          "Se quiser, use um endereço de uma imagem permitida em **URL da imagem**.",
          "Confira no canvas se ela aparece sem ficar esticada."
        ],
        "success": "Você colocou uma imagem na sua página.",
        "trouble": "Se sua imagem não carregar, experimente a imagem padrão do editor ou verifique o endereço HTTPS."
      },
      {
        "steps": [
          "Clique na imagem para abrir seus dados no painel **Estilos**.",
          "Procure o campo **Texto alternativo (alt)**.",
          "Veja o que está desenhado e escreva uma frase clara de verdade, como **Um cachorro marrom correndo na grama**.",
          "Evite escrever só **foto**, **imagem** ou **desenho**.",
          "Guarde a ideia: quem não pode ver a imagem precisa entender o que ela mostra."
        ],
        "success": "A imagem tem uma descrição alternativa informativa, diferente do texto padrão.",
        "trouble": "Se não ficar verde, verifique se o campo editado foi **alt**, e não o nome da peça. Tente uma frase específica com mais de oito letras.",
        "example": "alt=\"Um cachorro marrom correndo na grama\""
      },
      {
        "steps": [
          "Na paleta, volte à categoria **Texto** e clique em **Parágrafo**.",
          "Selecione o parágrafo, abra **Estilos** e escreva uma explicação: **Esse cachorro está correndo porque gosta de brincar!**",
          "Deixe o texto perto da imagem.",
          "Peça a alguém para ler o parágrafo sem olhar a foto. A pessoa entendeu o motivo da escolha?"
        ],
        "success": "Agora seu site tem uma imagem e um texto explicativo.",
        "trouble": "Se você não vê o parágrafo, procure-o em **Estrutura da página** no painel Estilos."
      }
    ]
  },
  "layout-flexbox": {
    "mission": "Chegou a hora de construir dois cartões, como os de personagens de um jogo.",
    "story": "Um container é como uma caixa organizadora: você coloca lápis, borrachas e canetas DENTRO dela, sem misturar tudo.",
    "words": [
      [
        "Container",
        "Uma caixa da página que pode guardar outras peças."
      ],
      [
        "Flexbox",
        "Uma ferramenta do CSS que organiza peças em linha ou coluna."
      ],
      [
        "Gap",
        "Espaço entre as peças dentro de um grupo."
      ]
    ],
    "tryIt": "Ponha dois lápis lado a lado e depois um embaixo do outro. Eles são os mesmos; só a organização mudou.",
    "outcome": "Você fará um grupo com peças dentro e observará como o layout muda.",
    "tasks": [
      {
        "steps": [
          "Selecione **Design Visual**.",
          "Na **Paleta de elementos**, abra **Estrutura & Semântica**.",
          "Clique em **Container (div)**. Uma caixa vazia aparecerá na página.",
          "Selecione a caixa para encontrar seus controles no painel **Estilos**.",
          "Observe que a caixa pode receber outros elementos."
        ],
        "success": "Você vê um container que pode servir como cartão.",
        "trouble": "Se a caixa parecer vazia, isso é normal: a ideia é preenchê-la nos próximos passos."
      },
      {
        "steps": [
          "Com o container na página, encontre um **Parágrafo** na paleta.",
          "Arraste o parágrafo para o **centro da caixa**, não para o lado de fora.",
          "Espere a área de destino ficar destacada antes de soltar.",
          "Depois clique no parágrafo e digite **Meu primeiro cartão!**.",
          "Olhe se o texto ficou DENTRO do container."
        ],
        "success": "Existe pelo menos um elemento dentro da caixa.",
        "trouble": "Se o item ficar fora, arraste novamente e solte no centro quando a área interna estiver destacada."
      },
      {
        "steps": [
          "Adicione um **Cabeçalho** e arraste-o para o mesmo container.",
          "Você deve ter agora título e parágrafo dentro da caixa.",
          "Selecione o container no canvas ou em **Estrutura da página**.",
          "No painel de estilos, procure as opções de layout do grupo, como **direção** e **espaçamento**.",
          "Experimente linha e coluna: o título e o parágrafo mudam de posição."
        ],
        "success": "O container tem pelo menos dois elementos internos.",
        "trouble": "Se só houver um dentro, use a lista Estrutura da página para encontrar o segundo e movê-lo para a caixa."
      }
    ]
  },
  "css-cores": {
    "mission": "Você será o designer do site do clube: vai escolher cores e tamanhos de letra.",
    "story": "CSS parece uma caixa de lápis de cor com instruções. Você diz o que pintar e o navegador obedece.",
    "words": [
      [
        "CSS",
        "Linguagem usada para mudar cores, tamanhos e posição dos elementos."
      ],
      [
        "Seletor",
        "Nome que identifica o que será estilizado."
      ],
      [
        "Propriedade",
        "A característica que você quer mudar, como color ou font-size."
      ]
    ],
    "tryIt": "Olhe ao seu redor: quais duas cores você escolheria para um cartaz de feira de ciências? Elas combinam?",
    "outcome": "Sua página terá um título estilizado e você escreverá regras CSS simples.",
    "tasks": [
      {
        "steps": [
          "Abra **Design Visual** e a categoria **Texto**.",
          "Clique em **Cabeçalho** para criar um título.",
          "Selecione o título e escreva **Clube Colorido** no campo de texto.",
          "Observe o tamanho original da letra; logo você vai mudá-lo com CSS."
        ],
        "success": "Existe um título para testar o CSS.",
        "trouble": "Se já havia um cabeçalho na página, a tarefa também pode aparecer como concluída."
      },
      {
        "steps": [
          "No menu superior, clique em **Código Gerado**.",
          "Na lista de arquivos, clique na aba **CSS** (style.css).",
          "Role até o final do código e clique em uma linha vazia.",
          "Escreva uma regra nova: **body { background-color: #f8fafc; }**.",
          "Olhe a prévia ao lado ou alterne a visualização para ver a nova cor.",
          "Não apague o resto do arquivo: acrescente sua regra no final."
        ],
        "success": "O CSS contém uma declaração background-color.",
        "trouble": "Se não funcionar, confira as chaves { }, os dois-pontos depois do nome e o ponto e vírgula no fim.",
        "example": "body {\n  background-color: #f8fafc;\n}"
      },
      {
        "steps": [
          "Continue no arquivo **CSS**.",
          "Vá para o final, em uma linha nova, e digite **h1 { font-size: 42px; }**.",
          "Leia em voz alta: h1 é o título, font-size é o tamanho, 42px é a medida.",
          "Veja a prévia do título. Experimente trocar 42 por 32 e depois por 48.",
          "Escolha o tamanho que ficou melhor."
        ],
        "success": "Você criou uma regra de tamanho para h1.",
        "trouble": "Se não ficar verde, certifique-se de que usou exatamente o seletor **h1** e a propriedade **font-size** dentro das chaves.",
        "example": "h1 {\n  font-size: 42px;\n}"
      }
    ]
  },
  "responsivo": {
    "mission": "Seu site precisa caber no celular do amigo e também no computador da escola.",
    "story": "Uma mochila se adapta ao que colocamos nela. O design responsivo adapta o site ao tamanho da tela.",
    "words": [
      [
        "Responsivo",
        "Um site que se reorganiza para caber em telas diferentes."
      ],
      [
        "Viewport",
        "O espaço que o navegador tem para mostrar a página."
      ],
      [
        "Media query",
        "Uma regra CSS usada só em determinadas larguras de tela."
      ]
    ],
    "tryIt": "Imagine um desenho em folha A4 e depois em um cartão pequeno. Como você reorganizaria o título e as imagens?",
    "outcome": "Você saberá comparar versões de desktop e celular e criar sua primeira media query.",
    "tasks": [
      {
        "steps": [
          "Abra **Design Visual**, escolha **Parágrafo** em Texto e adicione um texto.",
          "Escreva uma mensagem como **Nosso clube compartilha ideias criativas todas as semanas!**.",
          "Observe como o texto ocupa espaço na versão Desktop.",
          "Depois desta etapa você poderá testar o mesmo parágrafo no celular."
        ],
        "success": "Há um parágrafo para experimentar o layout.",
        "trouble": "Se já houver um parágrafo, você pode usá-lo sem criar outro."
      },
      {
        "steps": [
          "Abra **Código Gerado** e selecione **CSS**.",
          "Depois das outras regras do CSS, escreva **@media (max-width: 600px) { .site { padding: 12px; } }**.",
          "Entenda a regra: quando a tela tiver até 600 pixels, o site usará um espaçamento interno de 12 pixels.",
          "Confira se abriu e fechou dois pares de chaves.",
          "Altere o tamanho da prévia entre desktop e celular para comparar."
        ],
        "success": "O código contém a media query de 600px.",
        "trouble": "Se a regra estiver vermelha ou não funcionar, conte as chaves: duas abrindo e duas fechando.",
        "example": "@media (max-width: 600px) {\n  .site { padding: 12px; }\n}"
      },
      {
        "steps": [
          "Volte ao **Design Visual**.",
          "Na parte de cima da área da página, procure os controles **Desktop** e **Mobile**.",
          "Clique em **Mobile** (ícone de celular).",
          "Olhe o título, o parágrafo e os outros itens: ficou tudo legível?",
          "Mude a largura do celular, se a opção estiver visível, e veja se a página continua boa."
        ],
        "success": "A visualização Mobile está ativa e a atividade foi verificada.",
        "trouble": "Se não encontrar o botão, veja o topo do canvas; em telas estreitas talvez seja preciso rolar para enxergá-lo."
      }
    ]
  },
  "formularios": {
    "mission": "Vamos construir uma caixinha de recados para o clube. Ela terá espaços para digitar e um botão.",
    "story": "Um formulário é como uma ficha de inscrição de papel: tem campos para preencher e um espaço para confirmar.",
    "words": [
      [
        "Formulário",
        "Um grupo de espaços para digitar, escolher e enviar informações."
      ],
      [
        "Campo",
        "Lugar onde uma pessoa escreve uma informação."
      ],
      [
        "Botão",
        "Elemento que pode iniciar uma ação quando clicado."
      ]
    ],
    "tryIt": "Se você criasse um formulário para escolher o próximo jogo da turma, quais perguntas faria?",
    "outcome": "Você saberá montar a aparência de um formulário e entenderá que guardar respostas exige programação.",
    "tasks": [
      {
        "steps": [
          "Vá para **Design Visual**.",
          "Na paleta de **Interação & Formulários**, clique em **Formulário**.",
          "Uma caixa do tipo form será adicionada.",
          "Selecione a caixa e veja que ela é um grupo para receber campos.",
          "Não coloque dados pessoais reais no exercício."
        ],
        "success": "Você criou um container com tag form.",
        "trouble": "Se não aparecer marcado, selecione a peça no painel e confira se o tipo do container está como **form**."
      },
      {
        "steps": [
          "Na mesma categoria, clique em **Campo de texto**.",
          "Arraste o campo para DENTRO da caixa do formulário.",
          "Clique no campo e abra Estilos para mudar o texto de exemplo, se desejar.",
          "Use um exemplo simples como **Seu apelido de jogador**.",
          "Confira que o campo permite digitar quando você testa a página."
        ],
        "success": "Há um campo de texto na sua página.",
        "trouble": "Se o campo ficar fora do form, arraste-o para dentro. O avaliador marca a presença do campo; colocar dentro é um desafio extra."
      },
      {
        "steps": [
          "Adicione um **Botão** pela categoria Interação & Formulários.",
          "Arraste-o para perto do campo, de preferência dentro do form.",
          "Selecione o botão e mude o texto para **Enviar ideia**.",
          "Use Play para clicar no botão. Nesta aula, ele ainda não vai guardar nada automaticamente.",
          "Explique com suas palavras: o que faltaria para salvar uma mensagem?"
        ],
        "success": "Há um botão na página.",
        "trouble": "Se não acontecer nada quando clicar, tudo bem: ainda não programamos o envio."
      }
    ]
  },
  "javascript-eventos": {
    "mission": "Você vai dar superpoderes a um botão: um clique fará o site mudar de mensagem!",
    "story": "JavaScript é como dar instruções a um robô: “quando alguém apertar este botão, escreva uma nova frase”.",
    "words": [
      [
        "JavaScript",
        "Linguagem que cria ações e mudanças na página."
      ],
      [
        "Evento",
        "Algo que acontece, como um clique."
      ],
      [
        "ID",
        "Um nome único para encontrar um elemento da página."
      ]
    ],
    "tryIt": "Escolha uma frase surpresa que apareceria depois de apertar um botão mágico.",
    "outcome": "Você conseguirá conectar um botão e um parágrafo usando IDs e um evento de clique.",
    "tasks": [
      {
        "steps": [
          "Vá para **Design Visual** e adicione um **Botão** pela paleta.",
          "Selecione o botão na página. No painel Estilos, encontre **ID do item**.",
          "No campo, digite **meu-botao**, tudo minúsculo e com hífen.",
          "Clique em **Aplicar** ao lado do campo ou pressione Enter para confirmar.",
          "No campo de texto do botão, escreva **Clique para ver uma surpresa!**."
        ],
        "success": "Há um botão para usar na programação.",
        "trouble": "O ID é importante para o código funcionar. Se ele não ficar gravado, pressione Enter ou clique em Aplicar."
      },
      {
        "steps": [
          "Continue em Design Visual e adicione um **Parágrafo**.",
          "Selecione o parágrafo e, no campo **ID do item**, digite **saida**.",
          "Confirme com Enter ou Aplicar.",
          "Mude o texto para **A surpresa vai aparecer aqui...**.",
          "Confira que você tem um botão com ID meu-botao e um parágrafo com ID saida."
        ],
        "success": "Há um parágrafo na página.",
        "trouble": "Não use o mesmo ID nos dois elementos: cada elemento precisa de um nome único."
      },
      {
        "steps": [
          "Na barra superior, clique em **Código Gerado** e escolha a aba **JavaScript** (script.js).",
          "No final do arquivo, acrescente o código de exemplo mostrado aqui, sem apagar o restante.",
          "A linha getElementById(\"meu-botao\") encontra o botão. A linha com \"saida\" encontra o parágrafo.",
          "A palavra click significa que estamos esperando um clique.",
          "Clique em **Play** e aperte o botão. O parágrafo deve mostrar a mensagem da surpresa."
        ],
        "success": "O editor encontrou addEventListener no seu JavaScript. A experiência está completa quando o clique muda o texto.",
        "trouble": "Se nada mudar, volte a Design Visual e confirme os dois IDs (meu-botao e saida). Confira parênteses, aspas e chaves no código.",
        "example": "const botao = document.getElementById(\"meu-botao\");\nconst saida = document.getElementById(\"saida\");\nbotao?.addEventListener(\"click\", () => {\n  if (saida) saida.textContent = \"Surpresa! Você programou!\";\n});"
      }
    ]
  },
  "logica-blocos": {
    "mission": "Vamos criar um jogo de clicar. O jogador ganha pontos e pode vencer ao chegar a uma meta!",
    "story": "Uma variável é como o placar de um jogo: guarda um número que pode mudar. A condição “se” é como uma regra: se chegar a 10 pontos, você venceu.",
    "words": [
      [
        "Variável",
        "Uma caixa com nome que guarda um valor."
      ],
      [
        "Condição",
        "Uma pergunta que pode ser verdadeira ou falsa."
      ],
      [
        "Bloco",
        "Uma peça colorida que representa uma instrução."
      ]
    ],
    "tryIt": "Conte cinco palmas. A cada palma, o número aumenta. Esse contador pode ser uma variável!",
    "outcome": "Você conhecerá os blocos de variável e condição e terá uma ideia de como montar um jogo.",
    "tasks": [
      {
        "steps": [
          "Vá para **Design Visual** e adicione um **Botão**.",
          "Selecione o botão e altere o texto para **Ganhar ponto**.",
          "Adicione também um **Parágrafo** com o texto **Pontos: 0**.",
          "Volte a observar as peças; vamos usar o botão como controle do jogo."
        ],
        "success": "Há um botão para começar a programar.",
        "trouble": "Se já houver um botão, pode aproveitá-lo. Para um jogo novo, prefira um projeto vazio."
      },
      {
        "steps": [
          "Na parte de cima, entre na aba **Programação**.",
          "Na lista de categorias do Blockly, abra **Variáveis**.",
          "Clique na opção de criar variável e dê o nome **pontos**.",
          "Arraste o bloco **definir pontos para** para a área de blocos.",
          "Na categoria **Matemática**, encaixe o bloco do número **0** na entrada do bloco.",
          "Esse bloco significa: o placar começa com zero pontos."
        ],
        "success": "O projeto contém um bloco para atribuir valor a uma variável.",
        "trouble": "Se não aparecer o menu Variáveis, role a caixa de categorias. Se um bloco não encaixar, solte-o na entrada destacada do outro bloco."
      },
      {
        "steps": [
          "Ainda em Programação, abra a categoria **Lógica**.",
          "Arraste o bloco **se** para a área de trabalho.",
          "Na categoria Lógica, procure um bloco de comparação, como **0 = 0**.",
          "Encaixe a comparação na entrada do bloco **se**.",
          "Imagine a regra: **se pontos for maior ou igual a 5, mostrar “Você venceu!”**. Você pode conectar outros blocos para completar o jogo."
        ],
        "success": "O projeto contém um bloco de condição “se”.",
        "trouble": "Se o bloco não encaixar, encontre a entrada em forma de quebra-cabeça ao lado de “se”. A tarefa verifica a presença do bloco de decisão."
      }
    ]
  },
  "projeto-final": {
    "mission": "Missão final! Você vai fazer um site para mostrar à turma e explicar como ele funciona.",
    "story": "Pense num álbum feito por você: ele precisa de capa, páginas organizadas e alguma surpresa que funcione ao tocar.",
    "words": [
      [
        "Projeto",
        "Um trabalho que reúne várias ideias e ferramentas."
      ],
      [
        "Teste",
        "Experimentar para descobrir se tudo funciona."
      ],
      [
        "Exportar",
        "Guardar o site em arquivos que podem ser compartilhados."
      ]
    ],
    "tryIt": "Antes de mexer no editor, desenhe numa folha um título, duas caixas e um botão. Onde cada parte vai ficar?",
    "outcome": "Você terá um site com texto, organização, botão e um pedacinho de programação.",
    "tasks": [
      {
        "steps": [
          "Em **Design Visual**, adicione um **Cabeçalho** com o título do site.",
          "Adicione um primeiro **Parágrafo** explicando o tema.",
          "Adicione um segundo **Parágrafo** convidando alguém a conhecer o conteúdo.",
          "Leia o texto em voz alta: uma criança de outra turma entenderia sua ideia?",
          "Se preferir, continue um projeto que já começou nas aulas anteriores."
        ],
        "success": "Há um título e pelo menos dois parágrafos.",
        "trouble": "Se faltar um parágrafo, adicione mais um. Um texto longo em um único parágrafo não conta como dois elementos separados."
      },
      {
        "steps": [
          "Na paleta **Estrutura & Semântica**, adicione um **Container (div)**.",
          "Na categoria **Interação & Formulários**, adicione um **Botão**.",
          "Selecione o botão e escreva **Descobrir surpresa!**.",
          "Experimente colocar o botão dentro do container.",
          "No modo Mobile, verifique se tudo continua visível e se o botão é fácil de tocar."
        ],
        "success": "Seu projeto tem um container e um botão.",
        "trouble": "Se a tarefa não ficar verde, confira se você criou os dois tipos de elemento."
      },
      {
        "steps": [
          "Escolha uma forma de programação: **Programação** com blocos ou **Código Gerado** com JavaScript.",
          "Para blocos, abra **Programação**, expanda **Exemplos Mágicos** e explore o exemplo **Jogo de Clicar (+1 Ponto)**.",
          "Para JavaScript, use um evento **addEventListener(\"click\", ...)** como na aula 8.",
          "Vá para **Play**, clique no botão e observe a resposta.",
          "Volte ao editor para melhorar detalhes. Por fim, salve um arquivo **.frog** e use **Exportar Site** se quiser compartilhar os arquivos."
        ],
        "success": "O projeto possui lógica em blocos ou JavaScript. Confira no Play se a interação realmente funciona.",
        "trouble": "Se clicar e nada acontecer, veja se os blocos apontam para uma peça que existe ou se os IDs usados no JavaScript estão corretos.",
        "example": "const botaoFinal = document.querySelector(\"button\");\nbotaoFinal?.addEventListener(\"click\", () => {\n  alert(\"Você chegou ao final da trilha!\");\n});"
      }
    ]
  }
}
