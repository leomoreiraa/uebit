# Uebit · Identidade visual

## Ideia central
**Sua ideia dá um salto.**

Uebit aproxima três universos: **web**, o lugar de publicar; **bit**, a pequena peça que constrói algo maior; e **ué-bit!**, nossa interpretação lúdica do som de um sapo. Não é uma transcrição científica do coaxar, mas uma brincadeira sonora da marca.

O símbolo é um balão de som com um sapinho. Os olhos têm pupilas quadradas, como pixels; as bochechas lembram os sinais < e > do HTML. Pequenos bits escapam do balão. O mascote **Bit** transforma uma vitória-régia em sua estação de criação.

## Arquivos
- `uebit-logo.svg`: assinatura principal horizontal, com letras desenhadas em vetores.
- `uebit-logo-mono.svg`: versão de uma cor para impressos, carimbos e materiais simples.
- `uebit-logo-negative.svg`: versão para fundos escuros.
- `uebit-symbol.svg`: símbolo para avatares e aplicações compactas.
- `favicon.svg`: desenho simplificado para a aba do navegador.
- `uebit-mascot.svg`: Bit criando uma página; ilustração independente e editável.
- `uebit-pattern.svg`: padrão repetível de bits, ondas e sinais de código.
- `uebit-cover.svg`: capa horizontal para apresentações e materiais de divulgação.
- `icons.svg`: sprite SVG; o ZIP também inclui cada ícone separadamente em `icons/`.
- `tokens.css`: variáveis de cor e tipografia.

## Paleta
| Nome | Cor | Uso |
|---|---|---|
| Roxo ideia | `#7145D6` | Marca, navegação, programação |
| Verde sapinho | `#78E59B` | Mascote, superfícies e destaques com texto escuro |
| Verde ação | `#21824F` | Botões e estados positivos com texto branco |
| Amarelo bit | `#FFD56A` | Pequenas descobertas, realces e texto escuro |
| Coral pulso | `#D84062` | Interação, detalhes e pontos de atenção |
| Tinta | `#24203D` | Texto principal e versão monocromática |
| Papel | `#FAF9F3` | Fundo claro acolhedor |

Não use branco sobre o verde sapinho ou o amarelo bit. Use Tinta nesses fundos. Cores de estado devem vir acompanhadas de texto ou ícone.

## Tipografia
Interface: `ui-rounded, "Aptos", "Segoe UI", system-ui, sans-serif`. Títulos em peso 800–900; texto de leitura em 400–500. Código: `ui-monospace, "Cascadia Code", Consolas, monospace`. Fontes do sistema, sem downloads externos. O logotipo tem letras vetorizadas e não depende de uma fonte instalada.

## Construção e uso
- Preserve proporções e deixe espaço livre equivalente a um olho do sapinho ao redor da marca.
- Assinatura completa: largura mínima recomendada de 120 px na tela. Abaixo disso, use o símbolo; em 16–32 px, use o favicon simplificado.
- Use a versão principal sobre Papel ou branco, e a negativa sobre Tinta ou roxo escuro.
- Não estique, não incline o logotipo nem aplique sombras que prejudiquem o desenho. Não substitua o símbolo por um emoji.
- O padrão é decorativo: baixa intensidade, afastado de textos longos.
- Ícones: grade 24 × 24, traço de 1,8, pontas e cantos arredondados. A interface usa `currentColor`. Ícones decorativos ficam ocultos para leitores de tela; botões sempre têm nome acessível.
- Animações são breves e opcionais. Respeite `prefers-reduced-motion`.

## Voz
Curiosa, próxima e encorajadora: “Vamos experimentar?”, “Seu primeiro salto”, “Uma peça de cada vez”. Explique os conceitos, reconheça o progresso e trate erros como parte da descoberta. Evite infantilizar quem está aprendendo.

## Exemplo de uso do sprite
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.8"
     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <use href="/brand/icons.svg#code"></use>
</svg>
```
