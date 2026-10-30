export const TOOLBOX_NAMES = {
  "en": {
    "Eventos": "Events",
    "Jogos & Placar": "Games & Scores",
    "Conteúdo": "Content",
    "Aparência": "Appearance",
    "Sons & Áudio": "Sounds & Audio",
    "Tempo & Espera": "Time & Wait",
    "Lógica": "Logic",
    "Repetições": "Loops",
    "Matemática": "Math",
    "Texto": "Text",
    "Listas": "Lists",
    "Funções": "Functions",
    "Seletores CSS": "CSS Selectors",
    "Variáveis": "Variables"
  },
  "th": {
    "Eventos": "อีเวนต์",
    "Jogos & Placar": "เกมและคะแนน",
    "Conteúdo": "เนื้อหา",
    "Aparência": "รูปลักษณ์",
    "Sons & Áudio": "เสียง",
    "Tempo & Espera": "เวลาและการรอ",
    "Lógica": "ตรรกะ",
    "Repetições": "ลูป",
    "Matemática": "คณิตศาสตร์",
    "Texto": "ข้อความ",
    "Listas": "รายการ",
    "Funções": "ฟังก์ชัน",
    "Seletores CSS": "ตัวเลือก CSS",
    "Variáveis": "ตัวแปร"
  }
}
export const RECIPE_TEXT = {
  "en": {
    "click_score": [
      "🎮 Clicker Game (+1 point)",
      "Each click adds a point, plays a coin sound and makes the element jump."
    ],
    "fleeing_target": [
      "🎯 Catch the Moving Target",
      "Click the target to make it jump away and award a point."
    ],
    "keyboard_move": [
      "🕹️ Arrow-Key Controls",
      "Use left and right arrow keys to move an element."
    ],
    "secret_reveal": [
      "✨ Reveal / Hide",
      "Turn a button into a switch that reveals or hides content."
    ],
    "todo_adder": [
      "📝 Add a List Item",
      "Read text from an input and append it to a list when clicked."
    ]
  },
  "th": {
    "click_score": [
      "🎮 เกมคลิกเพิ่มคะแนน (+1)",
      "คลิกปุ่มเพื่อเพิ่มหนึ่งคะแนน เล่นเสียงเหรียญและทำให้ชิ้นงานเด้ง"
    ],
    "fleeing_target": [
      "🎯 จับเป้าหมายที่หนี",
      "คลิกเป้าหมายเพื่อให้หนีไปตำแหน่งสุ่มและได้หนึ่งคะแนน"
    ],
    "keyboard_move": [
      "🕹️ ควบคุมด้วยปุ่มลูกศร",
      "ใช้ปุ่มลูกศรซ้ายขวาเพื่อเลื่อนตัวละครหรือองค์ประกอบ"
    ],
    "secret_reveal": [
      "✨ แสดง / ซ่อนข้อมูล",
      "เปลี่ยนปุ่มเป็นสวิตช์เพื่อแสดงหรือซ่อนเนื้อหา"
    ],
    "todo_adder": [
      "📝 เพิ่มรายการจากช่องข้อความ",
      "คลิกปุ่มเพื่ออ่านข้อมูลที่พิมพ์ แล้วเพิ่มลงในรายการ"
    ]
  }
}

export function localizedToolbox(toolbox, language) {
  const names = TOOLBOX_NAMES[language]
  if (!names) return toolbox
  return { ...toolbox, contents: toolbox.contents.map((item) => {
    if (item.kind !== 'category') return item
    const name = names[item.name] ?? item.name
    return { ...item, name, contents: item.contents?.map((entry) => entry.kind === 'label' ? { ...entry, text: name } : entry) }
  }) }
}

export function localizedRecipes(recipes, language) {
  const names = RECIPE_TEXT[language]
  if (!names) return recipes
  return recipes.map((item) => names[item.id] ? { ...item, label: names[item.id][0], description: names[item.id][1] } : item)
}
