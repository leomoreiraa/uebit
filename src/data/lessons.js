/* Trilha Uebit: aulas autorais, estruturadas e sem dependência de servidor. */
export const LESSONS = [
  {
    "id": "primeiros-passos",
    "title": "1. Seu primeiro site",
    "tag": "HTML",
    "minutes": 25,
    "summary": "Entenda como uma página nasce e monte uma apresentação usando peças visuais e HTML.",
    "goals": [
      "Distinguir HTML, CSS e JavaScript",
      "Criar uma hierarquia de títulos e parágrafos",
      "Comparar o resultado visual com o código gerado"
    ],
    "theory": [
      {
        "heading": "A web é feita de páginas ligadas",
        "text": "Quando você abre um endereço, o navegador recebe documentos e os transforma em uma página. HTML descreve o que existe na página, CSS determina a aparência e JavaScript permite reagir às ações das pessoas. Não é necessário decorar tudo: primeiro vamos observar o efeito de cada mudança.",
        "example": "HTML = estrutura · CSS = aparência · JS = comportamento",
        "explain": "Pense em uma casa: HTML são os cômodos, CSS é a decoração e JS são os interruptores."
      },
      {
        "heading": "Elementos e etiquetas",
        "text": "Um elemento HTML geralmente tem uma abertura, conteúdo e fechamento. O navegador lê essas etiquetas para entender o significado do texto. Um título principal usa h1 e um parágrafo usa p. Um site pode ter vários parágrafos, mas deve organizar seus títulos de forma coerente.",
        "example": "<h1>Meu universo</h1>\n<p>Este é meu primeiro site!</p>",
        "explain": "As etiquetas não aparecem como texto na página: o navegador as interpreta."
      },
      {
        "heading": "O editor e o código trabalham juntos",
        "text": "Em Design Visual você arrasta Cabeçalho e Parágrafo. Em Código Gerado pode ver como as peças viraram HTML. Você também pode editar o código; o Uebit tenta sincronizar as mudanças com o modo visual. Salve o projeto em .frog para continuar outra hora.",
        "example": "<main class=\"site\"> ... </main>",
        "explain": "O HTML da sua página fica dentro de main. Mantenha a estrutura externa ao editar manualmente."
      },
      {
        "heading": "Estrutura semântica e acessibilidade",
        "text": "Escolha as etiquetas pelo significado, não apenas pelo tamanho da letra. O h1 informa o assunto principal; os parágrafos descrevem ideias. A organização em títulos ajuda leitores de tela, mecanismos de busca e outras pessoas que mantêm o site.",
        "example": "",
        "explain": "Uma boa primeira página responde: quem sou, o que faço e o que quero mostrar."
      }
    ],
    "tasks": [
      {
        "title": "Crie um título principal",
        "description": "Em Design Visual, adicione Cabeçalho e troque o texto pelo nome do seu projeto.",
        "hint": "Clique em Cabeçalho na paleta. Depois selecione a peça e edite seu conteúdo.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "heading"
        }
      },
      {
        "title": "Apresente sua ideia",
        "description": "Adicione um Parágrafo descrevendo o que as pessoas vão encontrar no seu site.",
        "hint": "Use uma frase que explique o tema e uma segunda frase que convide à exploração.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "paragraph"
        }
      },
      {
        "title": "Observe as etiquetas",
        "description": "Mude para Código Gerado e identifique h1 e p. Ao voltar, revise o resultado no canvas.",
        "hint": "Os dois elementos aparecem dentro do main com data-site-root.",
        "view": "code",
        "check": {
          "kind": "html",
          "value": "<h1"
        }
      }
    ],
    "quiz": {
      "question": "Qual linguagem descreve a estrutura de uma página?",
      "options": [
        "JavaScript",
        "HTML",
        "CSS"
      ],
      "correct": 1,
      "explain": "HTML define a estrutura; CSS estiliza e JavaScript controla comportamentos."
    },
    "challenge": "Experimente criar uma apresentação com dois parágrafos e um título que tenha significado para você."
  },
  {
    "id": "textos-links",
    "title": "2. Textos, listas e links",
    "tag": "HTML",
    "minutes": 30,
    "summary": "Organize informações para que outras pessoas consigam ler e navegar.",
    "goals": [
      "Diferenciar texto comum, listas e links",
      "Escrever descrições claras para a navegação",
      "Criar uma página com informação hierarquizada"
    ],
    "theory": [
      {
        "heading": "Escreva para a tela",
        "text": "As pessoas leem páginas em blocos. Títulos curtos e parágrafos objetivos ajudam a localizar informações. Listas são úteis quando vários itens pertencem ao mesmo grupo; usar apenas quebras de linha dificulta essa leitura.",
        "example": "<h2>Minhas habilidades</h2>\n<ul><li>Desenho</li><li>Programação</li></ul>",
        "explain": "Uma lista não ordenada indica um conjunto; uma lista ordenada indica sequência."
      },
      {
        "heading": "Links conectam documentos",
        "text": "O elemento a liga páginas, arquivos ou partes do mesmo site. O endereço fica no atributo href. Prefira textos descritivos em vez de “clique aqui”, pois isso ajuda quem usa leitor de tela ou navega apenas com o teclado.",
        "example": "<a href=\"https://developer.mozilla.org/\">Documentação web</a>",
        "explain": "Um endereço externo geralmente começa com https://; confira o destino antes de publicar."
      },
      {
        "heading": "A ordem transmite significado",
        "text": "Use um título para cada assunto e coloque a lista abaixo do texto que a apresenta. A hierarquia de informações deve funcionar mesmo sem cores ou enfeites. Uma página bem estruturada é mais fácil de transformar em um menu ou portfólio.",
        "example": "",
        "explain": "Comece com “Sobre mim”, depois “O que faço”, e por último “Onde aprender mais”."
      },
      {
        "heading": "Teste como visitante",
        "text": "Não basta enxergar um link bonito: ele deve ter destino válido. Ao clicar no modo Play, confira para onde leva. Uma página útil responde às perguntas de seus leitores sem obrigá-los a adivinhar.",
        "example": "",
        "explain": "Evite links com textos repetidos quando eles levam para lugares diferentes."
      }
    ],
    "tasks": [
      {
        "title": "Organize uma lista",
        "description": "Inclua uma Lista com marcadores ou Lista numerada com pelo menos três itens relevantes.",
        "hint": "Na paleta de Texto escolha o tipo de lista e edite cada linha.",
        "view": "visual",
        "check": {
          "kind": "anyelement",
          "value": "list|ordered-list"
        }
      },
      {
        "title": "Ofereça um destino",
        "description": "Adicione um Link e configure um endereço no painel de propriedades.",
        "hint": "Experimente um endereço de documentação pública confiável.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "link"
        }
      },
      {
        "title": "Destaque uma informação",
        "description": "Adicione um novo título ou um texto em negrito para organizar melhor a leitura.",
        "hint": "O negrito destaca uma ideia; um novo título abre um assunto.",
        "view": "visual",
        "check": {
          "kind": "anyelement",
          "value": "strong|heading"
        }
      }
    ],
    "quiz": {
      "question": "Qual texto é melhor para um link?",
      "options": [
        "Clique aqui",
        "Saiba mais",
        "Ler o guia de HTML"
      ],
      "correct": 2,
      "explain": "A descrição do destino informa o que acontecerá ao clicar."
    },
    "challenge": "Crie um roteiro de estudos com etapas numeradas e pelo menos um link confiável."
  },
  {
    "id": "imagens-acessibilidade",
    "title": "3. Imagens e acessibilidade",
    "tag": "HTML",
    "minutes": 30,
    "summary": "Enriqueça sua página com mídia sem excluir quem não consegue enxergá-la.",
    "goals": [
      "Adicionar imagens e textos alternativos",
      "Entender por que acessibilidade importa",
      "Usar mídia de forma responsável"
    ],
    "theory": [
      {
        "heading": "Uma imagem também comunica",
        "text": "Imagens podem explicar, orientar ou emocionar. O elemento img usa src para apontar o arquivo e alt para fornecer uma descrição alternativa. Se a imagem falhar ou uma pessoa usar leitor de tela, o alt ajuda a compreender a informação.",
        "example": "<img src=\"foto.jpg\" alt=\"Céu roxo ao pôr do sol\">",
        "explain": "O atributo alt descreve o conteúdo ou a função, não precisa começar por “imagem de”."
      },
      {
        "heading": "Texto alternativo útil",
        "text": "Uma descrição boa é específica e breve. “Foto” diz pouco; “Dois estudantes montam um circuito com luzes” transmite o que importa. Imagens puramente decorativas podem receber alt vazio, mas imagens que carregam informações precisam de alternativa textual.",
        "example": "",
        "explain": "Pergunte: o que a pessoa perderia se não pudesse ver a imagem?"
      },
      {
        "heading": "Tamanho, proporção e desempenho",
        "text": "Uma imagem muito grande deixa a página lenta. Prefira arquivos otimizados e use as opções de encaixe do editor para preservar o enquadramento. Não force a imagem a distorcer. Teste também na visualização móvel.",
        "example": "",
        "explain": "Uma imagem deve respeitar a largura disponível do container."
      },
      {
        "heading": "Vídeo e áudio também precisam de contexto",
        "text": "Vídeos importantes precisam de legendas ou transcrição; áudio deve ter descrição equivalente. O Uebit permite adicionar Vídeo e Áudio, mas a responsabilidade de oferecer alternativas acessíveis continua sendo sua.",
        "example": "",
        "explain": "O objetivo não é só carregar mídia: é comunicar bem a todas as pessoas."
      }
    ],
    "tasks": [
      {
        "title": "Insira uma imagem",
        "description": "Adicione Imagem pelo Design Visual e escolha um endereço de imagem que você possa usar.",
        "hint": "O Uebit já oferece uma ilustração padrão para você começar.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "image"
        }
      },
      {
        "title": "Escreva o texto alternativo",
        "description": "Selecione a imagem e edite o texto alternativo para descrever o que ela representa.",
        "hint": "Evite nomes genéricos como “foto”, “imagem” ou “paisagem”.",
        "view": "visual",
        "check": {
          "kind": "imagealt",
          "value": ""
        }
      },
      {
        "title": "Contextualize a imagem",
        "description": "Inclua um parágrafo explicando por que aquela imagem está na página.",
        "hint": "Imagine o texto como uma legenda mais completa.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "paragraph"
        }
      }
    ],
    "quiz": {
      "question": "Para que serve o atributo alt?",
      "options": [
        "Mudar a cor da imagem",
        "Oferecer alternativa textual",
        "Aplicar uma animação"
      ],
      "correct": 1,
      "explain": "O alt descreve o significado da imagem para tecnologias assistivas e situações de falha de carregamento."
    },
    "challenge": "Monte uma pequena galeria comentada com mais de uma imagem e legendas informativas."
  },
  {
    "id": "layout-flexbox",
    "title": "4. Containers e Flexbox",
    "tag": "Layout",
    "minutes": 35,
    "summary": "Aprenda a agrupar peças e a controlar como elas se distribuem na tela.",
    "goals": [
      "Usar containers para organizar componentes",
      "Experimentar direção, alinhamento e espaçamento",
      "Compreender o modelo Flexbox"
    ],
    "theory": [
      {
        "heading": "Páginas são grupos de elementos",
        "text": "Um container funciona como uma caixa que segura outros componentes. Agrupar ajuda a tratar várias peças como parte de uma seção. No Uebit você pode arrastar elementos para dentro de um Container e depois configurar seu layout.",
        "example": "<div class=\"cartao\"><h2>Projeto</h2><p>Descrição</p></div>",
        "explain": "Um container sozinho não acrescenta significado; use Seção ou Artigo quando houver sentido semântico."
      },
      {
        "heading": "O que é Flexbox?",
        "text": "Flexbox distribui filhos em uma direção: linha (row) ou coluna (column). O eixo principal segue essa direção. Justify-content controla a distribuição no eixo principal, align-items atua no eixo transversal e gap determina o espaço entre as peças.",
        "example": "display: flex;\nflex-direction: row;\ngap: 16px;",
        "explain": "Com row, as peças ficam lado a lado quando existe espaço. Com column, empilham verticalmente."
      },
      {
        "heading": "Espaço interno e externo",
        "text": "Padding é o respiro entre a borda de uma caixa e seu conteúdo. Margin separa a caixa dos outros elementos. Gap organiza o espaço entre filhos de um layout flexível. Usar esses valores com consistência torna a página mais agradável.",
        "example": "",
        "explain": "Evite alinhar tudo com vários espaços no texto; use ferramentas de layout."
      },
      {
        "heading": "Design adaptável",
        "text": "Layouts devem continuar legíveis em telas estreitas. Depois de montar, alterne entre Desktop e Mobile. Uma composição em linha pode precisar virar coluna no celular.",
        "example": "",
        "explain": "Teste o que acontece quando um parágrafo fica maior do que você imaginava."
      }
    ],
    "tasks": [
      {
        "title": "Monte um container",
        "description": "Adicione um Container pelo editor visual.",
        "hint": "Um container aparece como uma área que aceita outras peças.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "container"
        }
      },
      {
        "title": "Crie uma composição",
        "description": "Coloque pelo menos um elemento DENTRO do container, não apenas ao lado dele.",
        "hint": "Arraste um Parágrafo para o centro do container até indicar inclusão.",
        "view": "visual",
        "check": {
          "kind": "nested",
          "value": ""
        }
      },
      {
        "title": "Adicione outro elemento",
        "description": "Coloque ao menos dois elementos dentro do mesmo container para testar o Flexbox.",
        "hint": "Tente um título e um parágrafo; depois alterne a direção do layout.",
        "view": "visual",
        "check": {
          "kind": "nestedcount",
          "value": "2"
        }
      }
    ],
    "quiz": {
      "question": "O que faz gap em um container flexível?",
      "options": [
        "Define o texto do título",
        "Controla o espaço entre itens",
        "Abre uma nova página"
      ],
      "correct": 1,
      "explain": "Gap estabelece um espaçamento consistente entre os itens do container."
    },
    "challenge": "Monte dois cartões de projeto dentro de uma seção e compare direção linha/coluna."
  },
  {
    "id": "css-cores",
    "title": "5. CSS: cores, fontes e estilos",
    "tag": "CSS",
    "minutes": 35,
    "summary": "Vá além das opções visuais e aprenda a escrever regras CSS.",
    "goals": [
      "Entender seletores, propriedades e valores",
      "Alterar cores e tipografia",
      "Aplicar estilos consistentes"
    ],
    "theory": [
      {
        "heading": "A anatomia de uma regra CSS",
        "text": "CSS encontra elementos com seletores e aplica declarações. Em uma declaração, a propriedade vem antes dos dois-pontos e o valor antes do ponto-e-vírgula. As chaves delimitam o conjunto de estilos.",
        "example": "h1 {\n  color: rebeccapurple;\n  font-size: 36px;\n}",
        "explain": "Um seletor h1 altera todos os títulos h1; uma classe começa com ponto, como .meu-cartao."
      },
      {
        "heading": "Cor deve ajudar a ler",
        "text": "É possível escolher cores por nome, hexadecimal ou funções CSS. Cores de fundo e texto precisam ter contraste. Teste combinações com pessoas diferentes e evite transmitir informação somente pela cor.",
        "example": "body {\n  background-color: #f8fafc;\n  color: #1e293b;\n}",
        "explain": "O fundo pode ser vibrante, mas o texto deve continuar confortável de ler."
      },
      {
        "heading": "Tipografia e hierarquia",
        "text": "Font-size muda o tamanho; font-weight altera o peso; line-height define o espaço entre linhas. Não transforme tudo em título grande: uma boa hierarquia destaca o que é essencial.",
        "example": "p {\n  font-size: 18px;\n  line-height: 1.6;\n}",
        "explain": "Uma linha muito longa dificulta a leitura."
      },
      {
        "heading": "Experimente e compare",
        "text": "No Uebit, abra Código Gerado e selecione CSS. Escreva uma regra no final do arquivo e observe a atualização. Se uma alteração não surtir efeito, revise a sintaxe e se outro seletor está mais específico.",
        "example": "",
        "explain": "Uma declaração faltando ponto-e-vírgula pode alterar o resultado de várias regras."
      }
    ],
    "tasks": [
      {
        "title": "Crie algum conteúdo",
        "description": "Adicione um título no Design Visual para observar sua folha de estilos em ação.",
        "hint": "Se você já tem um título, pode reutilizá-lo.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "heading"
        }
      },
      {
        "title": "Troque a cor do fundo",
        "description": "No código CSS, adicione uma regra com background-color.",
        "hint": "Experimente: body { background-color: #f8fafc; }",
        "view": "code",
        "check": {
          "kind": "css",
          "value": "background-color\\s*:"
        }
      },
      {
        "title": "Ajuste a tipografia",
        "description": "No CSS, crie uma declaração font-size ou line-height para um seletor.",
        "hint": "Exemplo: h1 { font-size: 42px; }",
        "view": "code",
        "check": {
          "kind": "css",
          "value": "h1\\s*\\{[^}]*font-size\\s*:"
        }
      }
    ],
    "quiz": {
      "question": "Em CSS, qual é a função de um seletor?",
      "options": [
        "Escolher quais elementos serão estilizados",
        "Executar um clique",
        "Salvar o projeto"
      ],
      "correct": 0,
      "explain": "O seletor identifica os elementos aos quais as declarações serão aplicadas."
    },
    "challenge": "Crie uma pequena paleta de três cores com bom contraste e padronize os títulos."
  },
  {
    "id": "responsivo",
    "title": "6. Design responsivo",
    "tag": "CSS",
    "minutes": 35,
    "summary": "Faça seu site funcionar em telas grandes e pequenas.",
    "goals": [
      "Interpretar largura de tela e viewport",
      "Criar uma media query",
      "Testar a navegação no celular"
    ],
    "theory": [
      {
        "heading": "Uma web com muitas telas",
        "text": "A mesma página pode ser aberta em celular, tablet, notebook ou monitor grande. Design responsivo não significa encolher tudo; significa adaptar o layout para permanecer útil. O Uebit tem modo Mobile no canvas e no Play.",
        "example": "",
        "explain": "Pergunte se textos, botões e imagens continuam acessíveis em uma tela pequena."
      },
      {
        "heading": "Viewport e largura disponível",
        "text": "O navegador usa a viewport como referência para o espaço visível. Em geral, componentes devem usar larguras flexíveis, como 100%, com limites máximos quando necessário. Evite larguras fixas maiores do que o celular.",
        "example": "img { max-width: 100%; height: auto; }",
        "explain": "max-width impede que a imagem ultrapasse o espaço disponível."
      },
      {
        "heading": "Media queries mudam regras",
        "text": "Uma media query aplica estilos apenas quando uma condição é atendida. Com max-width: 600px, as declarações internas passam a valer quando a janela tem até 600 pixels de largura.",
        "example": "@media (max-width: 600px) {\n  .site { padding: 12px; }\n}",
        "explain": "Uma media query não cria outra página; ela altera o estilo da página existente."
      },
      {
        "heading": "Teste com intenção",
        "text": "Compare Desktop e Mobile e procure rolagem horizontal indevida, textos cortados e botões difíceis de tocar. O Uebit permite ajustar a largura de visualização móvel. Teste mais de um tamanho para detectar problemas.",
        "example": "",
        "explain": "Um menu que funciona bem no computador pode precisar de outra organização no celular."
      }
    ],
    "tasks": [
      {
        "title": "Tenha uma página para testar",
        "description": "Adicione pelo menos um parágrafo que possa ser lido no modo Mobile.",
        "hint": "Você pode continuar o projeto da aula anterior ou começar um novo.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "paragraph"
        }
      },
      {
        "title": "Escreva uma media query",
        "description": "Abra o CSS e adicione uma condição para telas com até 600px de largura.",
        "hint": "Copie a estrutura @media (max-width: 600px) { .site { padding: 12px; } } e personalize.",
        "view": "code",
        "check": {
          "kind": "css",
          "value": "@media\\s*\\(\\s*max-width\\s*:\\s*600px\\s*\\)"
        }
      },
      {
        "title": "Teste no celular",
        "description": "No Design Visual, alterne o dispositivo para Mobile e avalie o resultado.",
        "hint": "Procure o controle de dispositivo na área de visualização.",
        "view": "visual",
        "check": {
          "kind": "device",
          "value": "mobile"
        }
      }
    ],
    "quiz": {
      "question": "O que significa max-width: 600px em uma media query?",
      "options": [
        "A regra se aplica apenas a larguras de até 600px",
        "A regra dobra o tamanho da imagem",
        "A regra só funciona em desktops"
      ],
      "correct": 0,
      "explain": "max-width define um limite superior de largura para a condição."
    },
    "challenge": "Faça um layout com dois cartões que permaneça confortável no celular."
  },
  {
    "id": "formularios",
    "title": "7. Formulários e entradas",
    "tag": "HTML",
    "minutes": 35,
    "summary": "Crie interfaces para coletar informações de forma clara.",
    "goals": [
      "Identificar campos e seus propósitos",
      "Usar formulários e botões com sentido",
      "Planejar validação e privacidade"
    ],
    "theory": [
      {
        "heading": "O usuário também participa",
        "text": "Formulários permitem inserir informações. Uma página pode pedir um nome, uma escolha ou uma mensagem. Campos de texto usam input; mensagens longas usam textarea; opções podem aparecer em select ou checkbox.",
        "example": "",
        "explain": "Peça apenas dados necessários e explique para que serão usados."
      },
      {
        "heading": "Cada campo precisa de identificação",
        "text": "Placeholder é uma dica temporária, não substitui um rótulo acessível. No HTML tradicional, label identifica o campo e o atributo for pode apontar para o id do input. Nomes claros tornam a interface mais fácil de preencher.",
        "example": "<label for=\"nome\">Seu nome</label>\n<input id=\"nome\" placeholder=\"Como você se chama?\">",
        "explain": "Para uma página publicada, prefira rótulos visíveis, não apenas textos dentro do campo."
      },
      {
        "heading": "O formulário organiza a intenção",
        "text": "O elemento form agrupa controles relacionados. Um botão pode realizar uma ação, mas criar os campos não significa que os dados serão enviados para um servidor. Para processar ou guardar informações, ainda precisamos definir JavaScript e um destino seguro.",
        "example": "<form><input placeholder=\"Nome\"><button>Enviar</button></form>",
        "explain": "Nunca prometa envio de informações se você não implementou o processamento."
      },
      {
        "heading": "Validação e responsabilidade",
        "text": "Antes de aceitar uma resposta, verifique formatos e campos obrigatórios. Em aplicações reais, qualquer dado recebido deve ser validado também no servidor. Não coloque senhas, dados pessoais ou chaves privadas nos exemplos de aula.",
        "example": "",
        "explain": "Mesmo um formulário pequeno merece mensagens de erro úteis."
      }
    ],
    "tasks": [
      {
        "title": "Crie um grupo de formulário",
        "description": "Adicione a peça Formulário pelo Design Visual.",
        "hint": "Na categoria Interação e Formulários, a peça Formulário agrupa campos.",
        "view": "visual",
        "check": {
          "kind": "form",
          "value": ""
        }
      },
      {
        "title": "Receba uma informação",
        "description": "Adicione um Campo de texto e coloque-o dentro do formulário.",
        "hint": "Configure uma dica no placeholder e complemente com um texto visível.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "input"
        }
      },
      {
        "title": "Adicione um botão",
        "description": "Coloque um Botão para representar uma ação de envio ou confirmação.",
        "hint": "O botão ainda não envia dados automaticamente para um servidor.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "button"
        }
      }
    ],
    "quiz": {
      "question": "Um formulário visual envia dados para um banco automaticamente?",
      "options": [
        "Sim, sempre",
        "Não, precisa de lógica e destino apropriados",
        "Só se tiver duas caixas de texto"
      ],
      "correct": 1,
      "explain": "A interface coleta entradas, mas o processamento e o armazenamento precisam ser implementados."
    },
    "challenge": "Monte um formulário de opinião com campo de nome, mensagem e botão de confirmação."
  },
  {
    "id": "javascript-eventos",
    "title": "8. JavaScript e eventos",
    "tag": "JavaScript",
    "minutes": 40,
    "summary": "Faça sua página reagir a um clique usando o DOM.",
    "goals": [
      "Localizar um elemento pelo id",
      "Registrar um ouvinte de evento",
      "Alterar conteúdo em resposta a uma ação"
    ],
    "theory": [
      {
        "heading": "Programação transforma ações em respostas",
        "text": "Até agora criamos conteúdo e estilo. JavaScript permite dizer o que acontece quando alguém clica, digita ou altera uma escolha. Esses acontecimentos são chamados eventos. O navegador executa um trecho de código quando o evento ocorre.",
        "example": "",
        "explain": "Uma interação simples deve dar resposta clara: algo mudou ou uma mensagem apareceu."
      },
      {
        "heading": "DOM é a página em objetos",
        "text": "O navegador representa o HTML como uma árvore de objetos, conhecida como DOM. Com document.getElementById podemos encontrar uma peça que possui id. É importante que cada id seja único na página.",
        "example": "const botao = document.getElementById(\"meu-botao\");",
        "explain": "No editor visual, você pode configurar o ID HTML no painel de propriedades."
      },
      {
        "heading": "Escutando um clique",
        "text": "addEventListener associa uma função a um evento. O exemplo abaixo procura um botão e modifica o texto de um parágrafo. Use optional chaining ou teste a existência do elemento para evitar erros se o id não existir.",
        "example": "const botao = document.getElementById(\"meu-botao\");\nconst saida = document.getElementById(\"saida\");\nbotao?.addEventListener(\"click\", () => {\n  if (saida) saida.textContent = \"Funcionou!\";\n});",
        "explain": "A função entre parênteses só é executada quando a pessoa clica."
      },
      {
        "heading": "Experimente no Play",
        "text": "Abra Código Gerado, selecione JavaScript e acrescente o script. Configure os mesmos IDs no HTML ou nas propriedades. Depois clique em Play e teste. Se não acontecer nada, confira os IDs e observe se o código acusa erro.",
        "example": "",
        "explain": "Evite inserir conteúdo de entrada de usuário com innerHTML; prefira textContent."
      }
    ],
    "tasks": [
      {
        "title": "Coloque um botão",
        "description": "Adicione um Botão pelo Design Visual e defina seu ID HTML como meu-botao.",
        "hint": "O id serve para o JavaScript identificar o elemento correto.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "button"
        }
      },
      {
        "title": "Crie uma área de resposta",
        "description": "Adicione um Parágrafo com o ID HTML saida.",
        "hint": "O texto do parágrafo será substituído quando o clique acontecer.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "paragraph"
        }
      },
      {
        "title": "Programe o evento",
        "description": "Em Código Gerado > JavaScript, utilize addEventListener para reagir a click.",
        "hint": "Copie o exemplo teórico, confira os IDs e teste em Play.",
        "view": "code",
        "check": {
          "kind": "js",
          "value": "addEventListener\\s*\\("
        }
      }
    ],
    "quiz": {
      "question": "Para que serve addEventListener?",
      "options": [
        "Adicionar uma cor",
        "Executar lógica quando ocorre um evento",
        "Salvar CSS em arquivo"
      ],
      "correct": 1,
      "explain": "Ele registra uma função que responde a eventos como click."
    },
    "challenge": "Adicione um segundo botão que alterne entre duas mensagens diferentes."
  },
  {
    "id": "logica-blocos",
    "title": "9. Variáveis e decisões em blocos",
    "tag": "Blocos",
    "minutes": 40,
    "summary": "Crie um minijogo simples combinando eventos, variáveis e condições.",
    "goals": [
      "Usar variáveis para guardar estado",
      "Entender se/senão",
      "Programar com blocos conectados à página"
    ],
    "theory": [
      {
        "heading": "Um programa guarda informações",
        "text": "Uma variável é um nome associado a um valor que pode mudar. Em um contador de cliques, a variável pontos começa em zero e cresce a cada clique. O valor precisa existir para que o jogo saiba quantos pontos a pessoa ganhou.",
        "example": "let pontos = 0;\npontos = pontos + 1;",
        "explain": "A variável não é a pontuação visível: você ainda precisa mostrar o valor em um elemento da página."
      },
      {
        "heading": "Eventos iniciam ações",
        "text": "Em Programação, os blocos de Eventos podem ser conectados às peças do Design Visual. Primeiro crie um botão e um texto no canvas. Depois use um bloco de evento de clique e selecione a peça correta.",
        "example": "",
        "explain": "Se nenhum elemento estiver disponível, volte ao Design Visual e adicione um componente."
      },
      {
        "heading": "Condições controlam caminhos",
        "text": "O bloco se permite testar uma expressão. Por exemplo, se pontos for maior ou igual a cinco, podemos mostrar “Você venceu!”. Caso contrário, seguimos somando pontos. A condição produz um resultado verdadeiro ou falso.",
        "example": "if (pontos >= 5) {\n  console.log(\"Você venceu!\");\n}",
        "explain": "No Blockly, procure as categorias Lógica, Matemática e Variáveis."
      },
      {
        "heading": "Blocos também geram JavaScript",
        "text": "O Uebit converte os blocos em código. Isso permite aprender raciocínio lógico visualmente e depois observar a linguagem escrita. Os exemplos mágicos podem servir de inspiração, mas tente compreender e modificar cada bloco.",
        "example": "",
        "explain": "Troque números e condições para ver como o comportamento muda."
      }
    ],
    "tasks": [
      {
        "title": "Prepare a interface",
        "description": "Crie um Botão em Design Visual para iniciar sua interação.",
        "hint": "Você pode usar o mesmo botão da aula anterior.",
        "view": "visual",
        "check": {
          "kind": "element",
          "value": "button"
        }
      },
      {
        "title": "Crie uma variável com blocos",
        "description": "Abra Programação e use o grupo Variáveis para atribuir um valor.",
        "hint": "Escolha “Criar variável”, nomeie pontos e encaixe “definir pontos para 0”.",
        "view": "programming",
        "check": {
          "kind": "block",
          "value": "variables_set"
        }
      },
      {
        "title": "Monte uma condição",
        "description": "Na categoria Lógica, encaixe um bloco se para decidir algo com base na pontuação.",
        "hint": "Use o bloco se e conecte uma comparação da categoria Lógica.",
        "view": "programming",
        "check": {
          "kind": "block",
          "value": "controls_if"
        }
      }
    ],
    "quiz": {
      "question": "Uma condição se/senão escolhe com base em quê?",
      "options": [
        "Um valor lógico verdadeiro ou falso",
        "Na cor da tela",
        "No nome do projeto"
      ],
      "correct": 0,
      "explain": "Condições decidem caminhos por meio de expressões que resultam em verdadeiro ou falso."
    },
    "challenge": "Experimente o exemplo “Jogo de Clicar (+1 Ponto)” e modifique a meta para 10 pontos."
  },
  {
    "id": "projeto-final",
    "title": "10. Projeto final: seu site interativo",
    "tag": "Projeto",
    "minutes": 50,
    "summary": "Reúna HTML, CSS, responsividade e programação em uma criação autoral.",
    "goals": [
      "Planejar e organizar uma página completa",
      "Aplicar estilos e interações",
      "Revisar, testar e exportar o site"
    ],
    "theory": [
      {
        "heading": "Planejamento antes do código",
        "text": "Escolha um tema real: portfólio, catálogo de projetos, jogo, guia de estudos ou apresentação. Defina para quem a página é destinada e qual ação espera que a pessoa realize. Faça um rascunho com título, introdução, seções, conteúdo e interação.",
        "example": "",
        "explain": "Um objetivo específico facilita avaliar se o projeto ficou pronto."
      },
      {
        "heading": "Estrutura e conteúdo têm prioridade",
        "text": "Comece com título e parágrafos que expliquem sua ideia. Use containers para agrupar trechos; imagens e links podem enriquecer o resultado. Prefira títulos semânticos, textos alternativos e navegação clara.",
        "example": "",
        "explain": "Antes de adicionar efeitos, verifique se alguém entende a página somente lendo o conteúdo."
      },
      {
        "heading": "Estilo, comportamento e testes",
        "text": "Defina cores e tipografia no CSS. Crie pelo menos uma resposta a uma ação do visitante, usando programação em blocos ou JavaScript. Teste no Desktop, no Mobile e em Play. Revise erros e confira links.",
        "example": "",
        "explain": "Um projeto pequeno que funciona é melhor que uma interface enorme sem comportamento."
      },
      {
        "heading": "Compartilhando seu trabalho",
        "text": "Salve um .frog para poder continuar editando no Uebit. Depois use Exportar Site para obter HTML, CSS e JavaScript. Os arquivos exportados podem ser hospedados em um serviço estático; não inclua chaves ou dados privados.",
        "example": "",
        "explain": "Você concluiu a trilha quando consegue explicar como estrutura, estilo e comportamento se relacionam."
      }
    ],
    "tasks": [
      {
        "title": "Estruture a página",
        "description": "Use ao menos um Cabeçalho e dois Parágrafos que apresentem seu tema.",
        "hint": "Se necessário, comece de um projeto vazio e adicione informações reais.",
        "view": "visual",
        "check": {
          "kind": "both",
          "value": "heading|paragraph:2"
        }
      },
      {
        "title": "Crie composição e interação",
        "description": "Adicione pelo menos um Container e um Botão.",
        "hint": "Organize o conteúdo em uma seção e dê um propósito ao botão.",
        "view": "visual",
        "check": {
          "kind": "both",
          "value": "container|button"
        }
      },
      {
        "title": "Inclua programação",
        "description": "Implemente uma resposta em JavaScript ou blocos e teste em Play.",
        "hint": "Pode usar addEventListener ou conectar um bloco de evento a um elemento.",
        "view": "programming",
        "check": {
          "kind": "jsorblocks",
          "value": ""
        }
      }
    ],
    "quiz": {
      "question": "Qual é a melhor forma de verificar o projeto final?",
      "options": [
        "Apenas olhar no desktop",
        "Testar conteúdo, interação e mobile",
        "Exportar sem conferir nada"
      ],
      "correct": 1,
      "explain": "Uma revisão completa inclui acessibilidade, funcionamento e adaptação a diferentes telas."
    },
    "challenge": "Crie um site que gostaria de mostrar a outra pessoa e exporte o resultado em ZIP."
  }
]

export const lessonById = (id) => LESSONS.find((lesson) => lesson.id === id) ?? null
