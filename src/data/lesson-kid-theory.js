export const KID_THEORY = {
  "pt-BR": {
    "primeiros-passos": [
      "Um site é uma página que você abre no navegador. O HTML coloca títulos, imagens e textos no lugar. O CSS escolhe cores e tamanhos. O JavaScript faz as coisas acontecerem, como um botão que reage ao clique.",
      "Uma tag é como uma etiqueta que diz ao navegador o que mostrar. Por exemplo, <h1> significa título principal, e <p> significa parágrafo. O texto fica entre a abertura e o fechamento.",
      "No Uebit, você pode clicar nas peças em Design Visual para criar seu site. Depois, em Código Gerado, pode observar o HTML dessas mesmas peças. São duas maneiras de ver o mesmo trabalho!",
      "Uma página fica mais fácil de entender quando tem um título que conta o assunto e textos divididos em partes. Imagine um livro com capítulos e subtítulos: a organização ajuda a encontrar informações."
    ],
    "textos-links": [
      "Parágrafos contam histórias. Títulos mostram onde começa um assunto. Uma lista separa várias ideias, como coisas para levar numa viagem, e ajuda as pessoas a ler com calma.",
      "Um link é como uma porta: você clica e vai para outro lugar. Ele precisa ter um texto claro. “Ler sobre dinossauros” ajuda mais do que “clique aqui”.",
      "Coloque o título antes da lista. Assim, quem olha a página sabe o que os itens significam. Agrupar coisas parecidas torna o site mais fácil de usar.",
      "Experimente o site como se fosse uma visita. Leia os títulos e clique nos links. Você consegue entender para onde cada um leva? Se não, mude o texto do link."
    ],
    "imagens-acessibilidade": [
      "Uma imagem pode mostrar algo que seria difícil explicar só com palavras. Em HTML, img é a tag de imagem. O atributo src indica onde o arquivo da imagem está. O alt conta o que a imagem significa.",
      "Imagine um amigo que não consegue olhar seu desenho. Em vez de escrever “foto”, descreva o que aparece: “Um gato laranja dormindo numa cadeira azul”. Isso é um texto alternativo útil!",
      "Imagens muito grandes podem deixar o site lento. Escolha fotos que carreguem bem e que não fiquem esticadas. Depois, veja a página no computador e no celular.",
      "Vídeos e sons também precisam de explicações. Se uma pessoa não conseguir ouvir, uma legenda ou um texto pode ajudá-la a entender. Um site bom é um site que muita gente consegue usar."
    ],
    "layout-flexbox": [
      "Um container é uma caixa que guarda outras peças da página. Pode ser um cartão de personagem com título, desenho e descrição. Você escolhe as peças e as coloca dentro da caixa.",
      "Flexbox ajuda a organizar as peças da caixa. Em row, elas ficam lado a lado. Em column, ficam uma embaixo da outra. Gap é o espaço que separa as peças.",
      "Padding é o espaço dentro da caixa, perto da borda. Margin é o espaço fora dela. Pense em uma moldura: deixamos um pouco de espaço para o desenho não encostar nas bordas.",
      "Seu site pode ser aberto em telas de muitos tamanhos. Veja se as peças do seu container não ficam apertadas no celular. Se ficarem, experimente organizá-las em coluna."
    ],
    "css-cores": [
      "CSS é uma lista de instruções para decorar a página. Você escolhe um elemento, como h1, e escreve o que quer mudar entre chaves: a cor, o tamanho ou o espaço.",
      "Uma boa cor não é só bonita. Você também precisa conseguir ler as letras. Se o fundo for claro, um texto escuro costuma funcionar melhor. Teste as combinações!",
      "Você pode dizer “todos os parágrafos devem ter letras um pouco maiores”. A propriedade font-size muda o tamanho; line-height aumenta o espaço entre as linhas.",
      "No Uebit, abra Código Gerado e depois CSS. Escreva uma regra no fim do arquivo, olhe a prévia e veja o que mudou. Se der erro, procure os dois-pontos, o ponto e vírgula e as chaves."
    ],
    "responsivo": [
      "Seu site vai ser visto em celulares, computadores e tablets. No celular, há menos espaço. Um design responsivo reorganiza a página para tudo continuar fácil de ler e de clicar.",
      "Viewport é o espaço da tela que o navegador usa. Se uma imagem for grande demais, ela pode sair da página. A regra max-width: 100% ajuda a imagem a caber no espaço disponível.",
      "Uma media query é como dizer: “Se a tela for pequena, faça deste jeito”. Por exemplo, podemos reduzir o espaço das bordas quando a largura for de até 600 pixels.",
      "Depois de escrever o CSS, toque em Mobile no Uebit e teste. O texto cabe? Os botões são fáceis de apertar? Não tem nada cortado? Se precisar, volte e ajuste."
    ],
    "formularios": [
      "Formulários são como fichas para preencher. Pode haver um campo para nome, um lugar para mensagem e um botão. Cada pergunta precisa ser fácil de entender.",
      "Uma pessoa precisa saber o que digitar. Por isso é importante dar nome aos campos. Placeholder é uma dica dentro do campo, mas ter uma explicação visível também ajuda.",
      "O elemento form agrupa campos. O botão não guarda mensagens sozinho: para isso é preciso criar uma programação que faça algo com os dados. Aqui vamos montar a aparência primeiro.",
      "Não é seguro colocar senhas ou dados privados em exercícios. Quando um formulário de verdade recebe respostas, ele precisa conferir se estão corretas e cuidar das informações das pessoas."
    ],
    "javascript-eventos": [
      "JavaScript dá movimento e reação ao site. Você pode mandar o navegador mostrar uma surpresa quando alguém clica no botão, sem precisar recarregar a página.",
      "O navegador guarda cada elemento como parte de uma árvore chamada DOM. Para achar uma peça específica, você pode dar a ela um ID, como meu-botao. Cada peça deve ter um ID diferente.",
      "addEventListener quer dizer “escutar um acontecimento”. Com ele, podemos esperar pelo click. Quando o botão for clicado, uma função muda o texto do parágrafo que tem ID saida.",
      "No Uebit, escreva o JavaScript em Código Gerado, abra Play e clique no botão. Se não acontecer nada, confira se os IDs estão exatamente iguais no código e na página."
    ],
    "logica-blocos": [
      "Uma variável guarda um valor que pode mudar. Se você está fazendo um jogo de pontos, a variável pontos pode guardar 0, depois 1, depois 2, e assim por diante.",
      "Um evento é algo que inicia uma ação, como apertar um botão. Nos blocos do Uebit, você pode escolher um botão de sua página e dizer o que fazer quando ele for clicado.",
      "Uma condição “se” é uma pergunta: se pontos for 5 ou mais, o jogador venceu? Quando a resposta é sim, um grupo de ações acontece. Se for não, o jogo continua.",
      "Programar com blocos é encaixar instruções como num quebra-cabeça. O Uebit também pode transformar esses blocos em JavaScript. Troque o número da meta para ver o que muda!"
    ],
    "projeto-final": [
      "Um projeto começa com uma ideia: para quem será o site e o que ele vai mostrar? Antes de construir, faça um desenho simples com título, textos, imagens e um botão.",
      "Primeiro coloque o conteúdo no lugar. Use títulos para apresentar assuntos e containers para juntar coisas relacionadas. Depois pense nas cores e na aparência.",
      "Agora faça o site responder a alguma ação: um botão que muda mensagem ou um minijogo de pontos. Teste no computador, no celular e no Play para conferir se tudo funciona.",
      "Quando terminar, salve o projeto no formato .frog para continuar editando depois. Use Exportar Site para baixar os arquivos do site e compartilhá-los. Nunca coloque dados secretos nesses arquivos."
    ]
  },
  "en": {
    "primeiros-passos": [
      "A website is a page you open in a browser. HTML puts headings, pictures and text in place. CSS chooses colors and sizes. JavaScript makes things happen, like a button that reacts when clicked.",
      "A tag is a label that tells the browser what to show. For example, <h1> means main heading and <p> means paragraph. The words go between opening and closing tags.",
      "In Uebit, you can click elements in Visual Design to make your site. In Generated Code, you can see the HTML behind those elements. These are two views of the same work!",
      "A page is easier to understand when it has a clear title and sections. Like chapters and headings in a book, organization helps people find what they need."
    ],
    "textos-links": [
      "Paragraphs tell stories. Headings show where topics begin. Lists split several ideas into separate items, like things to pack for a trip, making them easier to read.",
      "A link is like a door to another place. Its text should tell you what is on the other side. “Read about dinosaurs” is more helpful than “click here”.",
      "Put a heading before a list. This way, visitors understand what the items are about. Grouping related things helps people use your site.",
      "Try visiting your own site like a guest. Read the headings and click the links. Can you tell where they go? If not, change their labels."
    ],
    "imagens-acessibilidade": [
      "A picture can show something that is hard to explain with words alone. In HTML, img is the image tag. src gives the image address; alt describes what the image means.",
      "Imagine a friend who cannot see your drawing. Instead of saying “photo”, say “An orange cat sleeping on a blue chair”. That is useful alternative text!",
      "Huge pictures may make a website slow. Choose files that load quickly and do not stretch. Then check how the page looks on both computer and phone.",
      "Videos and sounds also need explanations. If a person cannot hear, subtitles or written words can help. A good website works for as many people as possible."
    ],
    "layout-flexbox": [
      "A container is a box that holds other page elements. It can become a character card with a heading, drawing and description. You choose what goes inside.",
      "Flexbox arranges items inside the box. With row, they sit side by side. With column, they stack on top of each other. Gap is the space between them.",
      "Padding means space inside a box near its border. Margin means space outside it. Think of a picture frame: we leave room so the picture does not touch the edges.",
      "Your site can appear on screens of different sizes. Check that your container does not feel crowded on a phone. If it does, try stacking items in a column."
    ],
    "css-cores": [
      "CSS is a list of instructions for decorating a page. Choose an element such as h1 and put the changes inside curly braces: color, size or space.",
      "A good color is not just pretty: people must be able to read the words. Dark text on a light background is often easier to read. Test your combinations!",
      "You can say “Make all paragraphs a bit bigger”. The font-size property changes size; line-height changes the space between lines.",
      "In Uebit, open Generated Code and then CSS. Add a rule at the bottom, inspect the preview and see what changed. If something breaks, check colons, semicolons and braces."
    ],
    "responsivo": [
      "Your website may be seen on phones, computers and tablets. Phones have less space. Responsive design rearranges the page so words and buttons remain easy to use.",
      "Viewport means the part of the screen available to the browser. An enormous image might overflow. The rule max-width: 100% helps it fit.",
      "A media query means: “If the screen is small, use these rules”. For example, we can reduce the padding when the width is 600 pixels or less.",
      "After writing CSS, choose Mobile in Uebit. Does the text fit? Are buttons easy to press? Is anything cut off? Return and adjust if necessary."
    ],
    "formularios": [
      "A form is like a paper sheet that people fill out. It may have a name field, a message field and a button. Each question should be easy to understand.",
      "People need to know what to type. Give each field a clear label. A placeholder is a hint inside a field, but a visible label is also important.",
      "The form element groups input fields. A button cannot save messages by itself: you must add code that processes the data. First we will build the appearance.",
      "Do not put passwords or private information in practice exercises. Real forms must check answers and protect the information people share."
    ],
    "javascript-eventos": [
      "JavaScript lets websites respond to people. You can make a surprise message appear when someone clicks a button, without reloading the page.",
      "The browser organizes HTML elements in a tree called the DOM. To find one specific element, give it an ID like meu-botao. Each ID must be unique.",
      "addEventListener means “listen for something to happen”. We listen for click and run a function that changes the text of a paragraph with ID saida.",
      "In Uebit, write JavaScript in Generated Code, open Play and click the button. If nothing happens, check that the IDs match exactly in your code and in the page."
    ],
    "logica-blocos": [
      "A variable remembers a value that can change. In a points game, a variable called points can contain 0, then 1, then 2 and so on.",
      "An event starts an action, like pressing a button. In Uebit blocks, you can select a button from your page and decide what should happen when it is clicked.",
      "An if condition asks a question: is the score 5 or higher? If yes, the player wins; otherwise the game continues.",
      "Block programming is like connecting puzzle pieces. Uebit can also turn the blocks into JavaScript. Change the target score to see what happens!"
    ],
    "projeto-final": [
      "A project begins with an idea: who will use the site and what should they see? First sketch a heading, text, pictures and one button on paper.",
      "Put the content in place first. Use headings for topics and containers to group related things. Then choose colors and styles.",
      "Give your site one interaction: a button that changes a message or a mini-game. Try it on desktop, mobile and in Play to check that it works.",
      "When finished, save a .frog project to edit later. Use Export Site to download and share its files. Never put secrets inside exported files."
    ]
  },
  "th": {
    "primeiros-passos": [
      "เว็บไซต์คือหน้าที่เราเปิดในเบราว์เซอร์ HTML จัดวางหัวข้อ รูปภาพ และข้อความ CSS เลือกสีและขนาด ส่วน JavaScript ทำให้เกิดการทำงาน เช่น ปุ่มตอบสนองเมื่อคลิก",
      "แท็กเหมือนป้ายที่บอกเบราว์เซอร์ว่าต้องแสดงอะไร ตัวอย่าง <h1> หมายถึงหัวข้อหลัก และ <p> หมายถึงย่อหน้า ข้อความอยู่ระหว่างแท็กเปิดและแท็กปิด",
      "ใน Uebit เราสร้างเว็บด้วยการคลิกองค์ประกอบในโหมดออกแบบหน้าเว็บ แล้วเปิดโค้ดที่สร้างขึ้นเพื่อดู HTML ที่อยู่เบื้องหลัง ทั้งสองแบบคือผลงานเดียวกัน",
      "หน้าเว็บเข้าใจง่ายขึ้นเมื่อมีชื่อเรื่องและส่วนเนื้อหาที่ชัดเจน คล้ายหนังสือที่มีบทและหัวข้อย่อย ช่วยให้หาข้อมูลได้ง่าย"
    ],
    "textos-links": [
      "ย่อหน้าใช้เล่าเรื่อง หัวข้อบอกว่าเริ่มเรื่องอะไร และรายการช่วยแยกไอเดีย เช่น รายการสิ่งของที่จะนำไปเที่ยว ทำให้อ่านง่าย",
      "ลิงก์เหมือนประตูไปยังอีกที่หนึ่ง ข้อความลิงก์ควรบอกปลายทาง “อ่านเรื่องไดโนเสาร์” ชัดเจนกว่า “คลิกที่นี่”",
      "วางหัวข้อก่อนรายการ ผู้อ่านจะได้รู้ว่ารายการพูดถึงอะไร การรวมสิ่งที่เกี่ยวข้องกันทำให้เว็บใช้งานง่าย",
      "ลองเข้าเว็บของตัวเองเหมือนเป็นผู้มาเยือน อ่านหัวข้อแล้วคลิกลิงก์ รู้ไหมว่าจะไปไหน ถ้าไม่ชัดให้เปลี่ยนคำบนลิงก์"
    ],
    "imagens-acessibilidade": [
      "ภาพช่วยแสดงสิ่งที่อาจอธิบายเป็นคำพูดได้ยาก ใน HTML แท็ก img ใช้แสดงภาพ src บอกที่อยู่ไฟล์ และ alt ใช้อธิบายความหมายของภาพ",
      "ลองเล่ารูปให้เพื่อนที่มองไม่เห็นฟัง แทนที่จะพูดว่า “รูป” ให้พูดว่า “แมวสีส้มกำลังนอนบนเก้าอี้สีฟ้า” นี่คือ alt ที่มีประโยชน์",
      "ไฟล์ภาพใหญ่อาจทำให้เว็บช้า เลือกภาพที่โหลดเร็วและไม่ถูกยืด แล้วตรวจทั้งบนคอมพิวเตอร์และมือถือ",
      "วิดีโอและเสียงก็ควรมีคำอธิบาย ถ้าคนฟังไม่ได้ คำบรรยายหรือข้อความจะช่วยให้เข้าใจ เว็บไซต์ที่ดีควรใช้ได้กับผู้คนหลายกลุ่ม"
    ],
    "layout-flexbox": [
      "คอนเทนเนอร์คือกล่องที่เก็บองค์ประกอบอื่นบนหน้าเว็บ เช่น การ์ดตัวละครที่มีหัวข้อ รูปภาพ และคำอธิบาย เราเลือกสิ่งที่จะอยู่ข้างในได้",
      "Flexbox ช่วยจัดของในกล่อง แบบ row จะเรียงข้างกัน แบบ column จะเรียงซ้อนบนลงล่าง และ gap คือช่องว่างระหว่างชิ้นงาน",
      "padding คือช่องว่างด้านในขอบกล่อง ส่วน margin คือช่องว่างด้านนอก ลองนึกถึงกรอบรูปที่เว้นพื้นที่ให้ภาพไม่ชนขอบ",
      "เว็บไซต์เปิดได้บนจอหลายขนาด ลองดูว่าของในกล่องไม่เบียดกันบนมือถือ ถ้าแน่นไปให้ลองเรียงเป็นคอลัมน์"
    ],
    "css-cores": [
      "CSS เป็นกฎที่ใช้ตกแต่งหน้าเว็บ เลือกสิ่งที่ต้องการ เช่น h1 แล้วเขียนสิ่งที่จะเปลี่ยนไว้ในปีกกา เช่น สี ขนาด หรือระยะห่าง",
      "สีที่ดีไม่ใช่แค่สวย ต้องอ่านข้อความได้ชัดด้วย ตัวอักษรเข้มบนพื้นหลังสีอ่อนมักอ่านง่าย ลองทดสอบดู",
      "เราสามารถสั่งว่า “ทำให้ย่อหน้าทั้งหมดมีตัวอักษรใหญ่ขึ้น” font-size ใช้ปรับขนาด และ line-height ใช้เพิ่มระยะระหว่างบรรทัด",
      "ใน Uebit เปิดโค้ดที่สร้างขึ้นแล้วเลือก CSS เพิ่มกฎที่ท้ายไฟล์แล้วดูผล หากมีปัญหาให้ตรวจเครื่องหมาย : ; และปีกกา"
    ],
    "responsivo": [
      "เว็บของคุณอาจเปิดบนมือถือ คอมพิวเตอร์ หรือแท็บเล็ต มือถือมีพื้นที่น้อยกว่า Responsive Design ช่วยจัดหน้าใหม่ให้ข้อความและปุ่มใช้งานง่าย",
      "Viewport คือพื้นที่หน้าจอที่เบราว์เซอร์ใช้ ถ้าภาพใหญ่เกินไปอาจล้นหน้า กฎ max-width: 100% ช่วยให้ภาพอยู่ในพื้นที่",
      "Media query เหมือนการบอกว่า “ถ้าหน้าจอเล็ก ใช้กฎนี้” เช่น ลดช่องว่างขอบเมื่อหน้าจอกว้างไม่เกิน 600 พิกเซล",
      "เมื่อเขียน CSS แล้ว เลือก Mobile ใน Uebit ข้อความอยู่ครบไหม ปุ่มกดง่ายไหม มีอะไรถูกตัดหรือไม่ หากมีให้กลับไปปรับ"
    ],
    "formularios": [
      "ฟอร์มเหมือนกระดาษให้คนกรอก อาจมีช่องชื่อ ช่องข้อความ และปุ่ม ทุกคำถามควรชัดเจนและเข้าใจง่าย",
      "คนกรอกต้องรู้ว่าจะพิมพ์อะไร จึงควรมีชื่อฟิลด์ที่ชัดเจน placeholder เป็นคำใบ้ในช่อง แต่ควรมีป้ายชื่อที่มองเห็นด้วย",
      "แท็ก form ใช้รวมช่องกรอก ปุ่มไม่ได้บันทึกข้อความเอง ต้องเขียนโปรแกรมจัดการข้อมูลก่อน ในบทนี้เราจะสร้างหน้าตาของฟอร์ม",
      "อย่าใส่รหัสผ่านหรือข้อมูลส่วนตัวจริงในแบบฝึกหัด ฟอร์มจริงต้องตรวจความถูกต้องและปกป้องข้อมูลของผู้ใช้"
    ],
    "javascript-eventos": [
      "JavaScript ช่วยให้เว็บตอบสนองต่อผู้ใช้ เช่น แสดงข้อความเซอร์ไพรส์เมื่อคลิกปุ่ม โดยไม่ต้องโหลดหน้าใหม่",
      "เบราว์เซอร์จัด HTML เป็นโครงสร้างต้นไม้ชื่อ DOM หากอยากหาชิ้นงานเฉพาะ ให้ตั้ง ID เช่น meu-botao โดยแต่ละ ID ต้องไม่ซ้ำกัน",
      "addEventListener หมายถึง “รอเหตุการณ์” เรารอ click แล้วให้ฟังก์ชันเปลี่ยนข้อความของย่อหน้าที่มี ID ชื่อ saida",
      "ใน Uebit เขียน JavaScript ในโค้ดที่สร้างขึ้น เปิด Play แล้วกดปุ่ม ถ้าไม่เกิดอะไรขึ้นให้ตรวจว่า ID ในโค้ดตรงกับหน้าเว็บทุกตัวอักษร"
    ],
    "logica-blocos": [
      "ตัวแปรเป็นที่เก็บค่าที่เปลี่ยนได้ เช่น ในเกมสะสมแต้ม ตัวแปร points อาจเริ่มจาก 0 แล้วเพิ่มเป็น 1, 2, 3",
      "อีเวนต์คือสิ่งที่เริ่มการทำงาน เช่น การกดปุ่ม ในบล็อก Uebit เราเลือกปุ่มจากหน้าเว็บแล้วกำหนดว่าจะเกิดอะไรขึ้นเมื่อกด",
      "เงื่อนไข if เป็นคำถาม เช่น คะแนนถึง 5 หรือยัง ถ้าถึงก็ชนะ ถ้ายังไม่ถึงก็เล่นต่อ เราจึงใช้เงื่อนไขเพื่อเลือกว่าต้องทำอะไรต่อไป",
      "การเขียนโปรแกรมแบบบล็อกเหมือนต่อจิ๊กซอว์ Uebit ยังแปลงบล็อกเป็น JavaScript ได้ ลองเปลี่ยนคะแนนเป้าหมายแล้วดูผล!"
    ],
    "projeto-final": [
      "โปรเจกต์เริ่มจากไอเดีย: ใครจะใช้เว็บไซต์ และต้องการดูอะไร ก่อนสร้างลองวาดหัวข้อ ข้อความ รูปภาพ และปุ่มลงกระดาษ",
      "จัดเนื้อหาก่อน ใช้หัวข้อแยกเรื่องและคอนเทนเนอร์รวมสิ่งที่เกี่ยวกัน จากนั้นค่อยเลือกสีและรูปแบบ",
      "เพิ่มการโต้ตอบสักอย่าง เช่น ปุ่มเปลี่ยนข้อความหรือมินิเกม ทดลองในคอมพิวเตอร์ มือถือ และ Play ว่าทุกอย่างทำงาน",
      "เมื่อเสร็จแล้วบันทึกไฟล์ .frog เพื่อกลับมาแก้ไข ใช้ส่งออกเว็บไซต์เพื่อเก็บไฟล์และแบ่งปัน อย่าใส่ข้อมูลลับในไฟล์ที่ส่งออก"
    ]
  }
}
