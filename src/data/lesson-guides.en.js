export const GUIDES_EN = {
  "primeiros-passos": {
    "mission": "You are making a welcome page for your own Invention Club. Your website starts here!",
    "story": "Think of a toy house. HTML is the walls and rooms, CSS is the paint and furniture, and JavaScript is the light switch.",
    "words": [
      [
        "Browser",
        "The app that opens websites, such as Chrome or Firefox."
      ],
      [
        "HTML",
        "A language that organizes headings, text, and other parts of a page."
      ],
      [
        "Tag",
        "A label inside angle brackets (< >) that tells the browser what something is."
      ]
    ],
    "tryIt": "What would you call your club? It could be about games, animals, books, or science.",
    "outcome": "Your page will have a heading and an introduction. You will recognize their HTML tags.",
    "tasks": [
      {
        "steps": [
          "At the top of Uebit, choose **Visual Design**.",
          "On a phone, open the **Element palette** with the menu button.",
          "Under **Text**, click **Heading** (H) to add it.",
          "Click the new heading. Open **Styles** on the right, and find the element text field.",
          "Replace the words with **Invention Club** or your own name.",
          "Look at the page. Your large heading should be visible."
        ],
        "success": "Your page has a heading, so the activity indicator turns green.",
        "trouble": "If the heading is missing, check you are in Visual Design. On mobile, open the properties panel to edit its text."
      },
      {
        "steps": [
          "Stay in **Visual Design** and open **Text** in the element palette.",
          "Click **Paragraph** (¶).",
          "Select the paragraph on the page.",
          "In the **Styles** panel, find the element text field.",
          "Type **We love making cool things. Here are our ideas!**",
          "Check that the paragraph is near your heading."
        ],
        "success": "You have a paragraph, and the activity turns green.",
        "trouble": "Select the paragraph on the canvas or in the page structure list if the text field does not update."
      },
      {
        "steps": [
          "Click **Generated Code** in the top navigation.",
          "Select the **HTML** tab (index.html).",
          "Find **<h1**: it begins a main heading.",
          "Find **<p**: it begins a paragraph.",
          "Compare the text in the code with the text on the page.",
          "Switch back to Visual Design. You do not need to change the code."
        ],
        "success": "You found the heading tag in HTML and the task is complete.",
        "trouble": "If the code is long, scroll inside the code editor to find the tags.",
        "example": "<h1>Invention Club</h1>\n<p>We love making things!</p>"
      }
    ]
  },
  "textos-links": {
    "mission": "Make your club page easier to read and give visitors a door to another website.",
    "story": "A list works like a shopping list. A link is a door that leads to another place on the internet.",
    "words": [
      [
        "List",
        "Items organized one below another."
      ],
      [
        "Link",
        "Text that opens another place when selected."
      ],
      [
        "URL",
        "The address the browser uses to find a webpage."
      ]
    ],
    "tryIt": "Think of three fun skills you want to learn this year.",
    "outcome": "You will create a list and a useful link.",
    "tasks": [
      {
        "steps": [
          "Open **Visual Design** and the **Text** category.",
          "Choose **Bulleted list** or **Numbered list**.",
          "Click the list that appears on your page.",
          "In **Styles**, find **List items**.",
          "Put each item on its own line, for example: **Build games**, **Draw heroes**, **Make robots**.",
          "Check that three items are shown separately."
        ],
        "success": "A list appears and the activity becomes green.",
        "trouble": "If all items show on one line, press Enter between items in the List items field."
      },
      {
        "steps": [
          "In **Visual Design > Text**, add a **Link**.",
          "Select the link and open **Styles**.",
          "Change its displayed text to **Learn HTML**.",
          "In the **Link address (href)** field, enter **https://developer.mozilla.org/en-US/docs/Web/HTML**.",
          "Open **Play** and test where the link goes."
        ],
        "success": "Your page has a link. Test the destination as an extra check.",
        "trouble": "Make sure the address starts with https:// and has no spaces.",
        "example": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTML\">Learn HTML</a>"
      },
      {
        "steps": [
          "In the **Text** category, add a **Bold** element.",
          "Change its text to **My favorite ideas**.",
          "Or add another **Heading** to start a new section.",
          "Move the element near your list so it makes sense.",
          "Read the two together: does the heading describe the list?"
        ],
        "success": "Your page now has a heading or bold emphasis.",
        "trouble": "If the element appears somewhere unexpected, use its move handle to reposition it."
      }
    ]
  },
  "imagens-acessibilidade": {
    "mission": "Build an illustrated page everyone can understand, even if they cannot see the picture.",
    "story": "Imagine describing a picture over the phone to a friend: your words must make it clear what the image shows.",
    "words": [
      [
        "Image",
        "A picture or drawing on a page."
      ],
      [
        "Alt text",
        "Words describing an image when it cannot be seen."
      ],
      [
        "Accessibility",
        "Making something easier for more people to use."
      ]
    ],
    "tryIt": "How would you describe a picture of a dog playing outside without showing the picture?",
    "outcome": "You will add an image, describe it, and explain why you chose it.",
    "tasks": [
      {
        "steps": [
          "Open **Visual Design** and choose **Media** from the palette.",
          "Click **Image**. A sample image appears.",
          "Select the image and open **Styles**.",
          "You can replace the sample in the image URL field if you have permission to use another picture.",
          "Make sure the picture appears without looking stretched."
        ],
        "success": "Your page contains an image.",
        "trouble": "If your image does not load, try the default image or verify its HTTPS address."
      },
      {
        "steps": [
          "Click the image and open **Styles**.",
          "Find the field called **Alternative text (alt)**.",
          "Write a real description of what is shown, such as **A brown dog running on grass**.",
          "Avoid words like just **photo** or **picture**.",
          "Imagine hearing the description instead of seeing the picture."
        ],
        "success": "The alt field includes a useful description, different from the default sample.",
        "trouble": "If the task is not green, check that you edited alt, not the element name. Use a specific sentence.",
        "example": "alt=\"A brown dog running on grass\""
      },
      {
        "steps": [
          "Open **Visual Design > Text** and add a **Paragraph**.",
          "In **Styles**, type **This dog is running because it loves to play!**",
          "Place the paragraph close to the picture.",
          "Ask someone to read the paragraph without looking at the image. Does it make sense?"
        ],
        "success": "You now have a paragraph to explain your picture.",
        "trouble": "Find the paragraph in the page structure list if you cannot select it on the canvas."
      }
    ]
  },
  "layout-flexbox": {
    "mission": "Make two project cards, like the cards in a video game.",
    "story": "A container is a pencil case: everything inside it belongs to the same group.",
    "words": [
      [
        "Container",
        "A box that can hold other page elements."
      ],
      [
        "Flexbox",
        "A layout tool that lines items up in rows or columns."
      ],
      [
        "Gap",
        "The space between items in a group."
      ]
    ],
    "tryIt": "Put two pencils side by side. Now place one below the other. The pencils did not change, only their arrangement!",
    "outcome": "You will create a group of elements and experiment with layouts.",
    "tasks": [
      {
        "steps": [
          "Choose **Visual Design**.",
          "Open **Structure & Semantics** in the element palette.",
          "Click **Container (div)** to add an empty box.",
          "Select the box to inspect it in **Styles**.",
          "Notice that the box is ready to hold other elements."
        ],
        "success": "Your page has a container.",
        "trouble": "An empty container may look plain; you will fill it in the next activity."
      },
      {
        "steps": [
          "Find **Paragraph** in the Text category.",
          "Drag it into the **center** of the container.",
          "Release it when the inside drop area highlights.",
          "Click the paragraph and change its text to **My first card!**.",
          "Check that the paragraph is inside the container, not beside it."
        ],
        "success": "At least one element is nested inside a container.",
        "trouble": "If the paragraph lands outside, drag it again and wait for the highlighted inner drop target."
      },
      {
        "steps": [
          "Add a **Heading** and drag it into the same container.",
          "Check that both a heading and a paragraph are inside.",
          "Select the container or find it in the page structure list.",
          "In **Styles**, look for layout direction and spacing controls.",
          "Compare row and column directions. What changes?"
        ],
        "success": "Two elements are nested inside the same container.",
        "trouble": "If there is only one child, use the page structure list to find the other and drag it into the box."
      }
    ]
  },
  "css-cores": {
    "mission": "Become the designer for your club website. Choose colors and the size of the headings.",
    "story": "CSS is like a box of colorful markers with instructions: tell the browser what to paint.",
    "words": [
      [
        "CSS",
        "Rules that change colors, font sizes, and layout."
      ],
      [
        "Selector",
        "The name of the thing you want to style."
      ],
      [
        "Property",
        "The feature you change, like color or font-size."
      ]
    ],
    "tryIt": "What colors would you pick for a science fair poster?",
    "outcome": "Your page will have a heading styled with CSS that you wrote yourself.",
    "tasks": [
      {
        "steps": [
          "Open **Visual Design** and the **Text** category.",
          "Add a **Heading** and select it.",
          "Enter **Colorful Club** into its text field.",
          "Look at the heading before you start changing its size."
        ],
        "success": "The page has a heading to style.",
        "trouble": "You can reuse a heading that is already on your page."
      },
      {
        "steps": [
          "Choose **Generated Code** at the top.",
          "Open the **CSS** tab (style.css).",
          "Scroll to the bottom of the file. Do not delete the existing CSS.",
          "Add the code shown below on a new line.",
          "Look at the preview and check the background color."
        ],
        "success": "Your CSS includes a background-color declaration.",
        "trouble": "If it does not work, check the curly braces, colon and semicolon.",
        "example": "body {\n  background-color: #f8fafc;\n}"
      },
      {
        "steps": [
          "Stay in the **CSS** tab.",
          "Add a new rule at the bottom: **h1 { font-size: 42px; }**.",
          "Read it: h1 means heading; font-size means text size; 42px is the measurement.",
          "Check the preview. Try changing 42 to 32 and then to 48.",
          "Pick the size that you like most."
        ],
        "success": "Your CSS includes a font-size rule for h1.",
        "trouble": "If it is not green, make sure font-size is inside the braces of an h1 selector.",
        "example": "h1 {\n  font-size: 42px;\n}"
      }
    ]
  },
  "responsivo": {
    "mission": "Make your website fit both a school computer and a friend’s phone.",
    "story": "Responsive design is like a backpack that adjusts to hold different things.",
    "words": [
      [
        "Responsive",
        "A page that adjusts to different screen sizes."
      ],
      [
        "Viewport",
        "The visible space the browser has."
      ],
      [
        "Media query",
        "A CSS rule that applies only at particular screen widths."
      ]
    ],
    "tryIt": "How would you rearrange a drawing made for a big poster so it fits on a small card?",
    "outcome": "You will compare phone and desktop layouts and write a media query.",
    "tasks": [
      {
        "steps": [
          "In **Visual Design > Text**, add a **Paragraph**.",
          "Write **Our club shares creative ideas every week!**",
          "Notice how the paragraph fits on Desktop.",
          "You will check it on Mobile in a moment."
        ],
        "success": "Your page contains a paragraph.",
        "trouble": "You may keep an existing paragraph if you already have one."
      },
      {
        "steps": [
          "Open **Generated Code > CSS**.",
          "At the bottom of the file, add the media query shown below.",
          "Read the condition: when the screen is 600 pixels wide or smaller, use 12 pixels of padding.",
          "Count both pairs of curly braces.",
          "Compare the preview on desktop and mobile."
        ],
        "success": "Your CSS has a media query for 600px.",
        "trouble": "If it does not work, check for two opening braces and two closing braces.",
        "example": "@media (max-width: 600px) {\n  .site { padding: 12px; }\n}"
      },
      {
        "steps": [
          "Return to **Visual Design**.",
          "Above the page, find the **Desktop** and **Mobile** controls.",
          "Choose **Mobile** (the phone icon).",
          "Check the heading, paragraphs and images. Can you read and tap everything?",
          "If available, change the simulated phone width and check again."
        ],
        "success": "Mobile view is active, so the task is checked.",
        "trouble": "Look for device controls at the top of the canvas. On a small screen you may have to scroll."
      }
    ]
  },
  "formularios": {
    "mission": "Build a message form for your club, with a place to type and a button.",
    "story": "A form is like a paper registration sheet. You fill in boxes and confirm your answers.",
    "words": [
      [
        "Form",
        "A group of inputs and actions."
      ],
      [
        "Field",
        "A place where someone can type an answer."
      ],
      [
        "Button",
        "An element that can start an action when clicked."
      ]
    ],
    "tryIt": "If your class could vote for the next game, what would your form ask?",
    "outcome": "You will make the visual form and learn why saving answers also needs programming.",
    "tasks": [
      {
        "steps": [
          "Open **Visual Design**.",
          "Under **Interaction & Forms**, click **Form**.",
          "A form container will appear on the page.",
          "Select the form to see its settings.",
          "Use pretend information, not real private information, in this activity."
        ],
        "success": "A container with the form tag is present.",
        "trouble": "If it does not count, select the container and check that its semantic tag is form."
      },
      {
        "steps": [
          "In **Interaction & Forms**, add a **Text field**.",
          "Drag the field inside the form container.",
          "Select the field and find its placeholder setting in **Styles**.",
          "Enter something simple, like **Your player nickname**.",
          "Use the preview to check that you can type in the field."
        ],
        "success": "Your page contains a text input.",
        "trouble": "If the input is outside the form, drag it inside. The checker recognizes the input wherever it is."
      },
      {
        "steps": [
          "Add a **Button** from the same category.",
          "Put it close to the input, ideally inside the form.",
          "Select it and change the text to **Send idea**.",
          "Try clicking it in Play. It will not automatically store answers yet.",
          "Explain what would still be needed to save the message."
        ],
        "success": "Your page has a button.",
        "trouble": "It is okay if clicking does nothing yet: this lesson builds the interface, not a data server."
      }
    ]
  },
  "javascript-eventos": {
    "mission": "Give a button superpowers: one click will change a message on your website!",
    "story": "JavaScript is like giving a robot a rule: when the button is pressed, write a surprise sentence.",
    "words": [
      [
        "JavaScript",
        "A language that gives websites actions."
      ],
      [
        "Event",
        "Something that happens, like a click."
      ],
      [
        "ID",
        "A unique name that identifies one element on a page."
      ]
    ],
    "tryIt": "Choose a surprise message for your magic button.",
    "outcome": "You will connect a button to a paragraph with IDs and a click event.",
    "tasks": [
      {
        "steps": [
          "In **Visual Design**, add a **Button**.",
          "Select the button and find **Item ID** in **Styles**.",
          "Enter **meu-botao** in lowercase.",
          "Press Enter or click **Apply** to save the ID.",
          "Change the button text to **Click for a surprise!**."
        ],
        "success": "A button exists for your script.",
        "trouble": "The ID needs to be saved for the code to find it. Press Enter or click Apply."
      },
      {
        "steps": [
          "Add a **Paragraph** in Visual Design.",
          "Select it and enter **saida** in the **Item ID** field.",
          "Confirm with Enter or Apply.",
          "Change its text to **A surprise will appear here...**",
          "Your button and paragraph must have different IDs."
        ],
        "success": "A paragraph exists for the script to update.",
        "trouble": "Do not use the same ID twice. Each element needs its own identifier."
      },
      {
        "steps": [
          "Click **Generated Code** and select **JavaScript** (script.js).",
          "Add the example code at the bottom without deleting the other scripts.",
          "getElementById(\"meu-botao\") finds your button. The code also finds the paragraph by \"saida\".",
          "The click event runs only when the button is pressed.",
          "Open **Play** and press your button. The paragraph should change."
        ],
        "success": "Your JavaScript includes addEventListener. You have finished when clicking changes the message.",
        "trouble": "If nothing happens, check both HTML IDs, quotation marks, brackets, and parentheses in your code.",
        "example": "const button = document.getElementById(\"meu-botao\");\nconst output = document.getElementById(\"saida\");\nbutton?.addEventListener(\"click\", () => {\n  if (output) output.textContent = \"Surprise! You made this happen!\";\n});"
      }
    ]
  },
  "logica-blocos": {
    "mission": "Let’s build a clicker game. Players earn points and win when they reach a goal.",
    "story": "A variable is a scoreboard that remembers a number. An if block is a rule: if the score reaches five, the player wins.",
    "words": [
      [
        "Variable",
        "A named place to store a value."
      ],
      [
        "Condition",
        "A question that can be true or false."
      ],
      [
        "Block",
        "A colorful puzzle piece that represents an instruction."
      ]
    ],
    "tryIt": "Clap five times and count each clap. Your counter is a variable!",
    "outcome": "You will practice variable and decision blocks to plan a game.",
    "tasks": [
      {
        "steps": [
          "In **Visual Design**, add a **Button**.",
          "Change its text to **Earn point**.",
          "Also add a **Paragraph** and write **Points: 0**.",
          "Look at the button and the text. You will use them as the game controls."
        ],
        "success": "A button exists to start your game.",
        "trouble": "An existing button also counts. Use a blank project if you prefer a fresh game."
      },
      {
        "steps": [
          "Switch to **Programming** at the top.",
          "Open the **Variables** category in Blockly.",
          "Create a variable and call it **points**.",
          "Drag a **set points to** block into the workspace.",
          "Open **Math**, choose a number block, and connect **0** to the variable block.",
          "This means your scoreboard starts at zero."
        ],
        "success": "A variable assignment block is in your project.",
        "trouble": "If Variables is not visible, scroll the category list. Drag the number into the highlighted socket."
      },
      {
        "steps": [
          "Still in Programming, open **Logic**.",
          "Drag an **if** block into the workspace.",
          "Find a comparison block (like 0 = 0) in Logic.",
          "Connect the comparison into the condition socket of the if block.",
          "Imagine checking: if the score is at least 5, say “You win!”."
        ],
        "success": "Your project contains an if block.",
        "trouble": "If the block does not connect, look for the puzzle-shaped opening next to “if”."
      }
    ]
  },
  "projeto-final": {
    "mission": "Final mission! Make a website to show your classmates and explain how it works.",
    "story": "Think of an album you made yourself: it needs a cover, organized pages, and a surprise when someone taps it.",
    "words": [
      [
        "Project",
        "A creation that combines several skills."
      ],
      [
        "Test",
        "Trying something to see whether it works."
      ],
      [
        "Export",
        "Saving the website as files that can be shared."
      ]
    ],
    "tryIt": "Before opening the editor, sketch one heading, two boxes and one button on paper. Where will each go?",
    "outcome": "You will create a website with text, layout, a button and a bit of programming.",
    "tasks": [
      {
        "steps": [
          "In **Visual Design**, add a **Heading** with the website’s name.",
          "Add a **Paragraph** explaining your theme.",
          "Add a second **Paragraph** inviting visitors to explore.",
          "Read your text aloud. Would another child understand what the page is about?",
          "You may build on a project from earlier lessons."
        ],
        "success": "Your site has a heading and at least two separate paragraphs.",
        "trouble": "One long paragraph does not count as two. Add another Paragraph element if needed."
      },
      {
        "steps": [
          "Under **Structure & Semantics**, add a **Container (div)**.",
          "Under **Interaction & Forms**, add a **Button**.",
          "Change its label to **Find a surprise!**",
          "Try putting the button inside the container.",
          "Switch to Mobile view and check whether everything is easy to see and tap."
        ],
        "success": "Your project has a container and a button.",
        "trouble": "If the task stays pending, check that both element types are present."
      },
      {
        "steps": [
          "Choose **Programming** (blocks) or **Generated Code** (JavaScript).",
          "For blocks, open **Programming > Magic Examples** and try **Clicker Game (+1 Point)**.",
          "For JavaScript, use an addEventListener(\"click\", ...) event like the one in Lesson 8.",
          "Open **Play**, press your button, and check what happens.",
          "Improve any problems, save the project as **.frog**, and choose **Export Site** to share the HTML, CSS, and JavaScript."
        ],
        "success": "Your project contains block logic or JavaScript. Test that the interaction actually works in Play.",
        "trouble": "If the button does nothing, check whether the blocks target the correct element or the IDs match your JavaScript.",
        "example": "button?.addEventListener(\"click\", () => {\n  alert(\"You finished the course!\");\n});"
      }
    ]
  }
}
