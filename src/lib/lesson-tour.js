export const TOUR_TARGETS = {
  "primeiros-passos": [
    [
      "view-visual",
      "palette",
      "element-heading",
      "canvas",
      "field-text",
      "canvas"
    ],
    [
      "view-visual",
      "category-text",
      "element-paragraph",
      "canvas",
      "field-text",
      "canvas"
    ],
    [
      "view-code",
      "code-tab-html",
      "code-editor",
      "code-editor",
      "code-editor",
      "view-visual"
    ]
  ],
  "textos-links": [
    [
      "view-visual",
      "category-text",
      "element-list",
      "canvas",
      "field-list",
      "canvas"
    ],
    [
      "view-visual",
      "element-link",
      "canvas",
      "field-text",
      "field-href",
      "play"
    ],
    [
      "category-text",
      "element-strong",
      "field-text",
      "canvas",
      "canvas"
    ]
  ],
  "imagens-acessibilidade": [
    [
      "view-visual",
      "category-media",
      "element-image",
      "canvas",
      "field-src",
      "canvas"
    ],
    [
      "canvas",
      "inspector",
      "field-alt",
      "field-alt",
      "canvas"
    ],
    [
      "category-text",
      "element-paragraph",
      "field-text",
      "canvas"
    ]
  ],
  "layout-flexbox": [
    [
      "view-visual",
      "category-structure",
      "element-container",
      "canvas",
      "inspector"
    ],
    [
      "element-paragraph",
      "canvas",
      "canvas",
      "field-text",
      "canvas"
    ],
    [
      "element-heading",
      "canvas",
      "inspector",
      "inspector",
      "canvas"
    ]
  ],
  "css-cores": [
    [
      "view-visual",
      "category-text",
      "element-heading",
      "field-text",
      "canvas"
    ],
    [
      "view-code",
      "code-tab-css",
      "code-editor",
      "code-editor",
      "code-editor",
      "code-editor"
    ],
    [
      "code-tab-css",
      "code-editor",
      "code-editor",
      "code-editor",
      "code-editor"
    ]
  ],
  "responsivo": [
    [
      "view-visual",
      "element-paragraph",
      "field-text",
      "canvas"
    ],
    [
      "view-code",
      "code-tab-css",
      "code-editor",
      "code-editor",
      "code-editor"
    ],
    [
      "view-visual",
      "device-group",
      "device-mobile",
      "canvas",
      "device-group"
    ]
  ],
  "formularios": [
    [
      "view-visual",
      "category-interaction",
      "element-form",
      "canvas",
      "inspector"
    ],
    [
      "category-interaction",
      "element-input",
      "canvas",
      "field-placeholder",
      "canvas"
    ],
    [
      "element-button",
      "canvas",
      "field-text",
      "play",
      "canvas"
    ]
  ],
  "javascript-eventos": [
    [
      "view-visual",
      "element-button",
      "field-html-id",
      "field-html-id",
      "field-text"
    ],
    [
      "element-paragraph",
      "field-html-id",
      "field-html-id",
      "field-text",
      "canvas"
    ],
    [
      "view-code",
      "code-tab-js",
      "code-editor",
      "code-editor",
      "play"
    ]
  ],
  "logica-blocos": [
    [
      "view-visual",
      "element-button",
      "field-text",
      "element-paragraph",
      "canvas"
    ],
    [
      "view-programming",
      "blockly-toolbox",
      "blockly-toolbox",
      "blockly-workspace",
      "blockly-workspace",
      "blockly-workspace"
    ],
    [
      "view-programming",
      "blockly-toolbox",
      "blockly-workspace",
      "blockly-workspace",
      "blockly-workspace"
    ]
  ],
  "projeto-final": [
    [
      "view-visual",
      "element-heading",
      "element-paragraph",
      "element-paragraph",
      "canvas"
    ],
    [
      "category-structure",
      "element-container",
      "category-interaction",
      "element-button",
      "field-text"
    ],
    [
      "view-programming",
      "blockly-recipes",
      "view-code",
      "play",
      "save-project"
    ]
  ]
}

export const TOUR_SELECTORS = {
  'view-visual': '[data-tour-view="visual"]',
  'view-code': '[data-tour-view="code"]',
  'view-programming': '[data-tour-view="programming"]',
  'palette': '[data-tour="palette"]',
  'inspector': '[data-tour="inspector"]',
  'canvas': '[data-tour="canvas"]',
  'category-text': '[data-tour-category="text"]',
  'category-media': '[data-tour-category="media"]',
  'category-interaction': '[data-tour-category="interaction"]',
  'category-structure': '[data-tour-category="structure"]',
  'element-heading': '[data-tour-element="heading"]',
  'element-paragraph': '[data-tour-element="paragraph"]',
  'element-link': '[data-tour-element="link"]',
  'element-strong': '[data-tour-element="strong"]',
  'element-list': '[data-tour-element="list"], [data-tour-element="ordered-list"]',
  'element-image': '[data-tour-element="image"]',
  'element-container': '[data-tour-element="container"]',
  'element-form': '[data-tour-element="form"]',
  'element-input': '[data-tour-element="input"]',
  'element-button': '[data-tour-element="button"]',
  'field-text': '[data-tour-field="text"]',
  'field-href': '[data-tour-field="href"]',
  'field-alt': '[data-tour-field="alt"]',
  'field-src': '[data-tour-field="src"]',
  'field-list': '[data-tour-field="list"]',
  'field-placeholder': '[data-tour-field="placeholder"]',
  'field-html-id': '[data-tour-field="html-id"]',
  'code-tab-html': '[data-tour-code-tab="html"]',
  'code-tab-css': '[data-tour-code-tab="css"]',
  'code-tab-js': '[data-tour-code-tab="js"]',
  'code-editor': '[data-tour="code-editor"]',
  'device-group': '[data-tour="device-group"]',
  'device-mobile': '[data-tour-device="mobile"]',
  'play': '[data-tour="play"]',
  'save-project': '[data-tour="save-project"]',
  'blockly-toolbox': '[data-tour="blockly-workspace"] .blocklyToolbox, [data-tour="blockly-workspace"]',
  'blockly-workspace': '[data-tour="blockly-workspace"]',
  'blockly-recipes': '[data-tour="blockly-recipes"]',
}

export function guideTarget(lessonId, activityIndex, stepIndex) {
  return TOUR_TARGETS[lessonId]?.[activityIndex]?.[stepIndex] ?? 'canvas'
}
export function guideView(target) {
  if (target === 'view-code' || target.startsWith('code-')) return 'code'
  if (target === 'view-programming' || target.startsWith('blockly-')) return 'programming'
  return 'visual'
}
