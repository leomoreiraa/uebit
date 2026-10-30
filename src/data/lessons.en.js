export const LESSONS_EN = [
  {
    "id": "primeiros-passos",
    "title": "1. Your first website",
    "summary": "Discover how web pages work and build a personal introduction using visual elements and HTML.",
    "goals": [
      "Tell HTML, CSS and JavaScript apart",
      "Organize headings and paragraphs",
      "Compare visual elements with the generated code"
    ],
    "theory": [
      {
        "heading": "The web connects pages",
        "text": "When you open a web address, your browser downloads documents and turns them into a page. HTML describes its content, CSS controls how it looks, and JavaScript responds to user actions. You do not need to memorize everything now: begin by observing what changes when you edit a page.",
        "explain": "Imagine a house: HTML is the structure, CSS is its decoration, and JavaScript is the light switches.",
        "example": "HTML = structure · CSS = appearance · JS = behavior"
      },
      {
        "heading": "Elements and tags",
        "text": "An HTML element usually has an opening tag, some content, and a closing tag. The browser understands what the tags mean. A main heading uses h1, and a paragraph uses p. A page can contain many paragraphs; group your headings into a meaningful hierarchy.",
        "explain": "Tags are instructions to the browser, not text that visitors see.",
        "example": "<h1>My world</h1>\n<p>Welcome to my first site!</p>"
      },
      {
        "heading": "The editor and code work together",
        "text": "In Visual Design, drag a Heading and Paragraph onto the canvas. In Generated Code, inspect the HTML produced by those elements. You can also edit the code directly; Uebit tries to keep it synchronized with the visual editor. Save your project as a .frog file to continue later.",
        "explain": "The HTML for your page goes inside main. Keep the surrounding document intact when editing code."
      },
      {
        "heading": "Semantic structure and accessibility",
        "text": "Choose HTML tags for their meaning, not just their font size. An h1 explains the main topic; paragraphs explain ideas. Clear headings make pages easier to use with screen readers, search engines, and for future maintainers.",
        "explain": "A good first page answers: Who am I, what do I do, and what do I want to share?"
      }
    ],
    "tasks": [
      {
        "title": "Add a main heading",
        "description": "In Visual Design, add a Heading and replace its text with the name of your project.",
        "hint": "Click Heading in the element palette, select the new element, and edit its content."
      },
      {
        "title": "Introduce your idea",
        "description": "Add a Paragraph describing what visitors will find on your website.",
        "hint": "Write one sentence about the topic and another inviting people to explore."
      },
      {
        "title": "Find the HTML tags",
        "description": "Switch to Generated Code and locate the h1 and p tags. Then return to the canvas.",
        "hint": "Both elements live inside main with data-site-root."
      }
    ],
    "quiz": {
      "question": "Which language defines a webpage’s structure?",
      "options": [
        "JavaScript",
        "HTML",
        "CSS"
      ],
      "explain": "HTML describes structure, CSS styles it, and JavaScript adds behavior."
    },
    "challenge": "Create an introduction with two paragraphs and a meaningful heading."
  },
  {
    "id": "textos-links",
    "title": "2. Text, lists, and links",
    "summary": "Organize information so other people can read and navigate your site easily.",
    "goals": [
      "Distinguish paragraphs, lists, and links",
      "Write descriptive navigation labels",
      "Build a page with a clear information hierarchy"
    ],
    "theory": [
      {
        "heading": "Write for readers",
        "text": "People scan web pages in sections. Short headings and focused paragraphs help them find information. Lists are useful for related items; using line breaks alone can make a sequence harder to understand.",
        "explain": "Use unordered lists for collections and ordered lists when sequence matters."
      },
      {
        "heading": "Links connect documents",
        "text": "The a element links to pages, files, and sections of the same website. Its href attribute stores the destination. Choose clear link text instead of “click here” so people using screen readers or keyboards know where they are going.",
        "explain": "External web addresses usually start with https://. Check a link before publishing.",
        "example": "<a href=\"https://developer.mozilla.org/\">Web documentation</a>"
      },
      {
        "heading": "Order communicates meaning",
        "text": "Use headings to introduce each subject, with relevant lists and paragraphs below. Information hierarchy should make sense even without color or decoration. Once organized, the same structure can become a navigation menu or a portfolio.",
        "explain": "Try these sections: About me, What I make, and Further reading."
      },
      {
        "heading": "Test like a visitor",
        "text": "A link is not useful just because it looks clickable; it needs a working destination. Try it in Play mode. Visitors should be able to predict where a link goes from its label.",
        "explain": "Do not give different destinations identical, vague labels."
      }
    ],
    "tasks": [
      {
        "title": "Organize a list",
        "description": "Add a Bulleted List or Numbered List containing at least three relevant items.",
        "hint": "Find the list elements under Text and edit each line."
      },
      {
        "title": "Link somewhere useful",
        "description": "Add a Link and configure a destination in the properties panel.",
        "hint": "Try a trustworthy public documentation page."
      },
      {
        "title": "Highlight a key idea",
        "description": "Add a new heading or a Bold element to improve the hierarchy.",
        "hint": "Bold emphasizes a phrase; a heading introduces a new section."
      }
    ],
    "quiz": {
      "question": "Which label best describes a link destination?",
      "options": [
        "Click here",
        "Learn more",
        "Read the HTML guide"
      ],
      "explain": "Descriptive text helps people predict the destination."
    },
    "challenge": "Create a step-by-step learning plan with numbered items and a link to a reliable resource."
  },
  {
    "id": "imagens-acessibilidade",
    "title": "3. Images and accessibility",
    "summary": "Make your pages more engaging with images while including people who cannot see them.",
    "goals": [
      "Add images with meaningful alternative text",
      "Explain why accessibility matters",
      "Use media responsibly"
    ],
    "theory": [
      {
        "heading": "Images communicate, too",
        "text": "Images can teach, guide, and inspire. An img element has an src attribute that points to the image and an alt attribute containing a text alternative. Alt text explains the image if it cannot load or when someone uses a screen reader.",
        "explain": "Alt text should convey meaning. You do not need to start with “Image of”.",
        "example": "<img src=\"sunset.jpg\" alt=\"Purple sky at sunset\">"
      },
      {
        "heading": "Write useful alternatives",
        "text": "A good description is specific and short. “Picture” tells us very little; “Two students build a circuit with LEDs” explains what matters. Decorative images can have empty alt text, but informative images need meaningful alternatives.",
        "explain": "Ask yourself: What would a visitor miss if they could not see the picture?"
      },
      {
        "heading": "Size, aspect ratio, and performance",
        "text": "Huge image files slow down websites. Use appropriately sized, optimized images and the editor’s fitting controls to keep the intended framing. Avoid stretching images out of proportion. Always review the mobile layout.",
        "explain": "An image should never overflow its containing area."
      },
      {
        "heading": "Video and audio need context",
        "text": "Useful videos should provide captions or transcripts; audio should have an accessible text equivalent. Uebit can insert Video and Audio elements, but the creator is responsible for making their content accessible.",
        "explain": "Loading media is only the beginning. Everyone should be able to understand its message."
      }
    ],
    "tasks": [
      {
        "title": "Insert an image",
        "description": "Use Visual Design to add an Image, then select a picture you have permission to use.",
        "hint": "Uebit provides a sample illustration to get you started."
      },
      {
        "title": "Write alternative text",
        "description": "Select the image and change its alternative text to describe what it shows.",
        "hint": "Avoid vague labels such as “photo” or “picture”."
      },
      {
        "title": "Add context",
        "description": "Write a paragraph explaining why your image belongs on this page.",
        "hint": "Think of your paragraph as an extended caption."
      }
    ],
    "quiz": {
      "question": "What does the alt attribute provide?",
      "options": [
        "An image color filter",
        "A text alternative",
        "An animation"
      ],
      "explain": "Alt text communicates the image’s meaning to assistive technology and when images fail to load."
    },
    "challenge": "Create a small gallery with multiple images and informative captions."
  },
  {
    "id": "layout-flexbox",
    "title": "4. Containers and Flexbox",
    "summary": "Group elements and learn to control how they flow across your page.",
    "goals": [
      "Use containers to organize elements",
      "Experiment with direction, alignment, and spacing",
      "Understand the basics of Flexbox"
    ],
    "theory": [
      {
        "heading": "Web pages contain groups",
        "text": "A container is a box that holds other elements. Grouping lets you treat several pieces as one section. In Uebit, drag elements inside a Container and adjust its layout settings.",
        "explain": "A plain container has no special semantic meaning; use Section or Article when appropriate.",
        "example": "<div class=\"card\"><h2>Project</h2><p>Description</p></div>"
      },
      {
        "heading": "What is Flexbox?",
        "text": "Flexbox arranges child elements in a row or column. The main axis follows that direction. justify-content distributes items along the main axis; align-items controls the cross axis; and gap sets the space between items.",
        "explain": "With row, elements sit next to each other when there is room. With column, they stack vertically.",
        "example": "display: flex;\nflex-direction: row;\ngap: 16px;"
      },
      {
        "heading": "Inside space and outside space",
        "text": "Padding is the space between a box’s border and its contents. Margin separates that box from other elements. Gap creates consistent spacing between children in a Flexbox layout. These are more reliable than inserting spaces into text.",
        "explain": "Build layouts with spacing controls, not a string of space characters."
      },
      {
        "heading": "Layouts must adapt",
        "text": "A layout should remain readable on a narrow phone. After arranging elements, switch between Desktop and Mobile. A row that looks good on a large screen may need to become a column on mobile.",
        "explain": "Also test what happens when a paragraph grows longer than expected."
      }
    ],
    "tasks": [
      {
        "title": "Add a container",
        "description": "Drag a Container onto your page in Visual Design.",
        "hint": "It creates a region into which you can drop other elements."
      },
      {
        "title": "Build a group",
        "description": "Move at least one element INSIDE the container, rather than placing it next to it.",
        "hint": "Drag a Paragraph into the middle of the container until the drop target highlights."
      },
      {
        "title": "Try multiple children",
        "description": "Put at least two elements in one container and experiment with Flexbox settings.",
        "hint": "Add a heading and a paragraph, then change the layout direction."
      }
    ],
    "quiz": {
      "question": "What does gap control in Flexbox?",
      "options": [
        "The text of the heading",
        "The distance between items",
        "Opening a new page"
      ],
      "explain": "Gap sets consistent spacing between child elements."
    },
    "challenge": "Build two project cards inside a section and compare row and column layouts."
  },
  {
    "id": "css-cores",
    "title": "5. CSS: colors, fonts, and style",
    "summary": "Move beyond visual controls and write your own CSS rules.",
    "goals": [
      "Understand selectors, properties, and values",
      "Change colors and typography",
      "Apply consistent styles"
    ],
    "theory": [
      {
        "heading": "How a CSS rule works",
        "text": "CSS uses selectors to find elements and declarations to style them. A declaration contains a property, a colon, a value, and a semicolon. Curly braces group the declarations for a selector.",
        "explain": "An h1 selector changes all h1 headings; a class selector starts with a dot, like .my-card.",
        "example": "h1 {\n  color: rebeccapurple;\n  font-size: 36px;\n}"
      },
      {
        "heading": "Color should support reading",
        "text": "CSS colors can use names, hexadecimal codes, or color functions. Foreground and background should have sufficient contrast. Avoid using color as the only way to convey important information.",
        "explain": "Bright backgrounds can work, but text must remain comfortable to read.",
        "example": "body {\n  background-color: #f8fafc;\n  color: #1e293b;\n}"
      },
      {
        "heading": "Typography creates hierarchy",
        "text": "font-size controls size, font-weight changes thickness, and line-height sets line spacing. Make the main ideas stand out without making every element a huge heading.",
        "explain": "Very long lines can make paragraphs difficult to read.",
        "example": "p {\n  font-size: 18px;\n  line-height: 1.6;\n}"
      },
      {
        "heading": "Experiment and compare",
        "text": "In Uebit, open Generated Code, choose CSS, and add a rule at the end of the file. Observe how the preview changes. If nothing happens, check the syntax and whether a more specific selector overrides your rule.",
        "explain": "A missing semicolon or brace can break several declarations."
      }
    ],
    "tasks": [
      {
        "title": "Create some content",
        "description": "Add a heading in Visual Design to give your CSS something to style.",
        "hint": "An existing heading works, too."
      },
      {
        "title": "Change the background",
        "description": "In the CSS editor, add a declaration that sets background-color.",
        "hint": "Try: body { background-color: #f8fafc; }"
      },
      {
        "title": "Adjust typography",
        "description": "Write a font-size declaration inside an h1 CSS rule.",
        "hint": "For example: h1 { font-size: 42px; }"
      }
    ],
    "quiz": {
      "question": "What is a CSS selector used for?",
      "options": [
        "Choosing which elements to style",
        "Running a click event",
        "Saving a project"
      ],
      "explain": "A selector identifies the elements that receive the rule’s styles."
    },
    "challenge": "Create a three-color palette with good contrast and consistent heading styles."
  },
  {
    "id": "responsivo",
    "title": "6. Responsive design",
    "summary": "Make your website useful on large screens and small phones.",
    "goals": [
      "Understand viewport width",
      "Write a media query",
      "Test navigation and layout on mobile"
    ],
    "theory": [
      {
        "heading": "One web, many screens",
        "text": "The same site can open on a phone, tablet, laptop, or large monitor. Responsive design does not just shrink everything; it adapts the layout so that it remains readable and usable. Uebit includes Mobile mode in the editor and preview.",
        "explain": "Check whether text, buttons, and images remain easy to use on a narrow screen."
      },
      {
        "heading": "Viewport and available width",
        "text": "The viewport is the visible region of the browser. Elements should often use flexible widths such as 100%, with a maximum width when needed. Avoid fixed widths that exceed a phone screen.",
        "explain": "max-width keeps images within the available space.",
        "example": "img { max-width: 100%; height: auto; }"
      },
      {
        "heading": "Media queries change the rules",
        "text": "A media query activates CSS only under certain conditions. With max-width: 600px, the declarations inside apply when the viewport is 600 pixels wide or narrower.",
        "explain": "A media query changes how one page looks; it does not create a separate mobile page.",
        "example": "@media (max-width: 600px) {\n  .site { padding: 12px; }\n}"
      },
      {
        "heading": "Test deliberately",
        "text": "Compare Desktop and Mobile. Look for unexpected horizontal scrolling, clipped text, and tap targets that are too small. Uebit lets you change the mobile preview width. Try more than one phone size.",
        "explain": "A desktop navigation bar may need a different layout on mobile."
      }
    ],
    "tasks": [
      {
        "title": "Prepare a sample page",
        "description": "Add a paragraph that you can examine in Mobile mode.",
        "hint": "Keep working on the previous project or start from scratch."
      },
      {
        "title": "Write a media query",
        "description": "In CSS, create a media query for screens up to 600px wide.",
        "hint": "Try: @media (max-width: 600px) { .site { padding: 12px; } }"
      },
      {
        "title": "Check the phone view",
        "description": "In Visual Design, switch the preview device to Mobile and review the result.",
        "hint": "Find the device selector in the preview controls."
      }
    ],
    "quiz": {
      "question": "What does max-width: 600px mean in a media query?",
      "options": [
        "Styles apply at widths of 600px or less",
        "Images become twice as big",
        "Styles apply only on desktops"
      ],
      "explain": "max-width sets an upper viewport width limit for the condition."
    },
    "challenge": "Create two content cards that stay readable on a phone."
  },
  {
    "id": "formularios",
    "title": "7. Forms and inputs",
    "summary": "Build clear interfaces that can collect information from visitors.",
    "goals": [
      "Recognize different input types",
      "Use forms and buttons with purpose",
      "Think about validation and privacy"
    ],
    "theory": [
      {
        "heading": "Visitors can contribute",
        "text": "Forms let people enter information. A page might ask for a name, a selection, or a message. Use input for short text, textarea for longer answers, and select or checkbox for choices.",
        "explain": "Collect only the information you need, and explain how it will be used."
      },
      {
        "heading": "Every field needs a label",
        "text": "A placeholder is a temporary hint, not a replacement for an accessible label. In HTML, label identifies a field, and its for attribute can point to the input’s id. Visible labels help everyone understand a form.",
        "explain": "On a published site, show labels in addition to placeholders.",
        "example": "<label for=\"name\">Your name</label>\n<input id=\"name\" placeholder=\"What is your name?\">"
      },
      {
        "heading": "Forms organize intent",
        "text": "The form element groups related controls. A button can trigger an action, but adding fields does not automatically send data to a server. Processing or storing information requires JavaScript or a properly configured destination.",
        "explain": "Never promise that a form sends data if you have not implemented the processing.",
        "example": "<form><input placeholder=\"Name\"><button>Send</button></form>"
      },
      {
        "heading": "Validate inputs responsibly",
        "text": "Before accepting input, check that required fields and formats are valid. Real applications must validate again on the server. Never put private information, passwords, or API keys in classroom examples.",
        "explain": "Even a simple form benefits from clear error messages."
      }
    ],
    "tasks": [
      {
        "title": "Create a form",
        "description": "Add a Form element in Visual Design.",
        "hint": "Find Form under Interaction and Forms."
      },
      {
        "title": "Accept some text",
        "description": "Add a Text Input inside your form.",
        "hint": "Set a useful placeholder and include a visible description."
      },
      {
        "title": "Add an action button",
        "description": "Add a Button to represent sending or confirming the information.",
        "hint": "A button alone does not send data to a server."
      }
    ],
    "quiz": {
      "question": "Does a visual form automatically save data to a database?",
      "options": [
        "Yes, always",
        "No, processing and storage must be implemented",
        "Only when it has two text fields"
      ],
      "explain": "A form collects input, but submitting and storing it requires appropriate logic and infrastructure."
    },
    "challenge": "Design a feedback form with name, message, and confirmation button."
  },
  {
    "id": "javascript-eventos",
    "title": "8. JavaScript and events",
    "summary": "Make your page respond to clicks by using the DOM.",
    "goals": [
      "Find elements by id",
      "Register an event listener",
      "Update content after an action"
    ],
    "theory": [
      {
        "heading": "Programs respond to actions",
        "text": "We have built content and styles; now JavaScript gives the page behavior. A click, keystroke, or change in a field is an event. You can tell the browser which code to run when that event happens.",
        "explain": "Good interactions give visible feedback so people know something happened."
      },
      {
        "heading": "The DOM is the page as objects",
        "text": "The browser turns your HTML into a tree of objects called the Document Object Model (DOM). document.getElementById finds an element by its id. Each id should be unique on the page.",
        "explain": "Set the HTML ID for an element in the Visual Design properties panel.",
        "example": "const button = document.getElementById(\"meu-botao\");"
      },
      {
        "heading": "Listening for clicks",
        "text": "addEventListener connects a function to an event. The example finds a button and changes a paragraph when the visitor clicks. Optional chaining and checking the target prevent errors if an id is missing.",
        "explain": "The function runs when someone clicks, not when it is defined.",
        "example": "const button = document.getElementById(\"meu-botao\");\nconst output = document.getElementById(\"output\");\nbutton?.addEventListener(\"click\", () => {\n  if (output) output.textContent = \"It worked!\";\n});"
      },
      {
        "heading": "Try it in Play",
        "text": "Open Generated Code, select JavaScript, and enter the script. Give the matching IDs to your HTML elements or edit them in the properties panel. Then launch Play and click the button. If nothing changes, double-check the IDs and any errors.",
        "explain": "Use textContent rather than innerHTML for user-entered text."
      }
    ],
    "tasks": [
      {
        "title": "Place a button",
        "description": "Add a Button in Visual Design and give it the HTML ID meu-botao.",
        "hint": "The ID lets JavaScript find the correct element."
      },
      {
        "title": "Create a response area",
        "description": "Add a Paragraph and give it the HTML ID saida.",
        "hint": "Its text will change when the button is clicked."
      },
      {
        "title": "Handle the event",
        "description": "In Generated Code > JavaScript, use addEventListener to react to a click.",
        "hint": "Use the example as a guide, but match the IDs you actually used."
      }
    ],
    "quiz": {
      "question": "What does addEventListener do?",
      "options": [
        "Apply a color",
        "Run code when an event happens",
        "Save the CSS file"
      ],
      "explain": "It registers a function that responds to events such as click."
    },
    "challenge": "Add a second button that switches between two messages."
  },
  {
    "id": "logica-blocos",
    "title": "9. Variables and decisions with blocks",
    "summary": "Build a simple mini-game using events, variables, and conditions.",
    "goals": [
      "Use variables to store state",
      "Understand if/else decisions",
      "Program visual blocks connected to page elements"
    ],
    "theory": [
      {
        "heading": "Programs remember information",
        "text": "A variable is a name for a value that can change. In a click counter, points starts at zero and increases on each click. Your game needs to remember that number in order to track the player’s score.",
        "explain": "The variable is not automatically visible. You must update an element to display its value.",
        "example": "let points = 0;\npoints = points + 1;"
      },
      {
        "heading": "Events start actions",
        "text": "In Programming, Event blocks can react to elements created in Visual Design. First create a button and a text element. Then choose a click-event block and connect it to the correct element.",
        "explain": "If the block has no available target, return to Visual Design and add an element."
      },
      {
        "heading": "Conditions select paths",
        "text": "An if block checks a condition. For example, if the score reaches five, the game can show “You win!”. Otherwise it keeps counting. The condition is either true or false.",
        "explain": "Look for Logic, Math, and Variables in the Blockly categories.",
        "example": "if (points >= 5) {\n  console.log(\"You win!\");\n}"
      },
      {
        "heading": "Blocks produce JavaScript",
        "text": "Uebit converts the visual blocks into JavaScript. This helps you learn the logic graphically and inspect the written language afterward. Magic examples can inspire you, but try changing each block and understanding its effect.",
        "explain": "Change the target number or the condition and see what happens."
      }
    ],
    "tasks": [
      {
        "title": "Prepare the interface",
        "description": "Add a Button in Visual Design to start your interaction.",
        "hint": "You can reuse a button from an earlier lesson."
      },
      {
        "title": "Set a variable with blocks",
        "description": "Open Programming and use Variables to create and assign a value.",
        "hint": "Choose Create variable, name it points, and connect a set-variable block with 0."
      },
      {
        "title": "Build a decision",
        "description": "In Logic, use an if block to decide what happens at a target score.",
        "hint": "Connect a comparison block to the if condition."
      }
    ],
    "quiz": {
      "question": "What determines which branch an if/else statement takes?",
      "options": [
        "A true or false expression",
        "The screen color",
        "The project name"
      ],
      "explain": "Conditions choose a path according to a Boolean expression."
    },
    "challenge": "Try the “Clicker Game (+1 Point)” magic example and raise the goal to 10 points."
  },
  {
    "id": "projeto-final",
    "title": "10. Final project: your interactive website",
    "summary": "Bring HTML, CSS, responsive design, and programming together in a project of your own.",
    "goals": [
      "Plan a complete web page",
      "Apply visual styles and interactions",
      "Review, test, and export the site"
    ],
    "theory": [
      {
        "heading": "Plan before coding",
        "text": "Choose a real topic: a portfolio, project catalog, game, study guide, or personal introduction. Decide who your visitors are and what you want them to do. Sketch a page with a heading, introduction, sections, content, and interaction.",
        "explain": "A specific goal makes it easier to decide when the project is finished."
      },
      {
        "heading": "Structure and content come first",
        "text": "Start with a heading and paragraphs that explain your idea. Use containers to group content; images and links can enrich it. Write semantic headings, useful alternative text, and clear navigation.",
        "explain": "Before adding visual effects, check whether the content makes sense on its own."
      },
      {
        "heading": "Style, behavior, and testing",
        "text": "Choose readable colors and consistent typography in CSS. Add at least one response to a visitor’s action using blocks or JavaScript. Test Desktop, Mobile, and Play modes. Check errors and working links.",
        "explain": "A small working site is better than a huge interface with no useful behavior."
      },
      {
        "heading": "Share your work",
        "text": "Save a .frog file to keep editing in Uebit. Then use Export Site to download the HTML, CSS, and JavaScript. These files can be hosted on a static site service. Never include credentials or private information.",
        "explain": "You have finished the course when you can explain how structure, style, and behavior work together."
      }
    ],
    "tasks": [
      {
        "title": "Build a meaningful page",
        "description": "Include at least one Heading and two Paragraphs introducing your topic.",
        "hint": "Start from a blank project if necessary and write real content."
      },
      {
        "title": "Create layout and interaction",
        "description": "Add at least one Container and one Button.",
        "hint": "Organize a section and give your button a purpose."
      },
      {
        "title": "Add programming",
        "description": "Create an interaction with JavaScript or blocks and try it in Play.",
        "hint": "You can use addEventListener or connect a visual event block to an element."
      }
    ],
    "quiz": {
      "question": "How should you test the final project?",
      "options": [
        "Only check the desktop view",
        "Check content, interactions, and mobile",
        "Export without reviewing"
      ],
      "explain": "A complete review covers accessibility, behavior, and responsive layout."
    },
    "challenge": "Create a site you would be proud to share, then export it as a ZIP."
  }
]
