const files = { html: 'index.html', css: 'style.css', js: 'script.js' }
const parsers = { html: 'html', css: 'css', js: 'babel' }
const options = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  endOfLine: 'lf',
  bracketSameLine: true,
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',
}

let formatter
function loadFormatter() {
  if (!formatter) {
    formatter = Promise.all([
      import('prettier/standalone'),
      import('prettier/plugins/html'),
      import('prettier/plugins/postcss'),
      import('prettier/plugins/babel'),
      import('prettier/plugins/estree'),
    ]).then(([core, ...plugins]) => ({ format: core.format, plugins: plugins.map((plugin) => plugin.default) }))
    formatter.catch(() => { formatter = undefined })
  }
  return formatter
}

export async function formatSource(source, language) {
  if (!Object.hasOwn(parsers, language)) throw new Error('Linguagem de formatação inválida.')
  try {
    const { format, plugins } = await loadFormatter()
    return await format(source, { ...options, parser: parsers[language], plugins })
  } catch (error) {
    throw new Error(`Não foi possível formatar ${files[language]}: ${String(error.message).split('\n')[0]}`)
  }
}

// Format copies only: Blockly's applied-code markers must retain their original source.
export async function formatCode(code) {
  return Object.fromEntries(await Promise.all(Object.keys(files).map(async (language) => [language, await formatSource(code[language], language)])))
}
