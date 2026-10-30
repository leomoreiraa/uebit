export const TEMPLATE_LOCALES = {
  "en": {
    "quiz-game": [
      "Wildlife Quiz & Arena",
      "An interactive challenge with scores, lives, combos, a chameleon reflex game, hidden trophies, and a leaderboard.",
      "Mini-Game & Arena"
    ],
    "portfolio": [
      "Vértice Studio — Product Design & Front-end",
      "A professional studio website with navigation, interactive case studies, a budget simulator, deliverables, and a briefing scheduler.",
      "Design & Technology"
    ],
    "space-story": [
      "Space Odyssey & Apollo-X Simulator",
      "An interstellar command center with decision-based adventures, flight controls, asteroid mining, and a mission log.",
      "Space & RPG"
    ],
    "cyber-store": [
      "Brasa & Forno — Burgers & Pizza",
      "A restaurant website with a menu, live shopping cart, discounts, delivery options, and checkout.",
      "Food & Delivery"
    ],
    "blank": [
      "Blank Project",
      "Start building from scratch.",
      "Blank"
    ]
  },
  "th": {
    "quiz-game": [
      "ควิซสัตว์ป่าและอารีนา",
      "เกมตอบคำถามพร้อมคะแนน ชีวิต คอมโบ เกมจับกิ้งก่า ถ้วยรางวัลลับ และตารางอันดับ",
      "มินิเกมและอารีนา"
    ],
    "portfolio": [
      "Vértice Studio — ดีไซน์และฟรอนต์เอนด์",
      "เว็บสตูดิโอมืออาชีพพร้อมผลงานแบบโต้ตอบ เครื่องคำนวณงบประมาณ รายการบริการ และแบบฟอร์มนัดหมาย",
      "ออกแบบและเทคโนโลยี"
    ],
    "space-story": [
      "ผจญภัยอวกาศและ Apollo-X",
      "ศูนย์บัญชาการอวกาศ พร้อมเกมตัดสินใจ ระบบควบคุมยาน ขุดดาวเคราะห์น้อย และบันทึกภารกิจ",
      "อวกาศและ RPG"
    ],
    "cyber-store": [
      "Brasa & Forno — เบอร์เกอร์และพิซซ่า",
      "เว็บไซต์ร้านอาหารที่มีเมนู ตะกร้าสินค้าแบบสด ส่วนลด ตัวเลือกจัดส่ง และชำระเงิน",
      "อาหารและเดลิเวอรี"
    ],
    "blank": [
      "โปรเจกต์เปล่า",
      "เริ่มสร้างใหม่ตั้งแต่ต้น",
      "โปรเจกต์เปล่า"
    ]
  }
}
export function translateTemplate(template, language) {
  const entry = TEMPLATE_LOCALES[language]?.[template.id]
  return entry ? { ...template, name: entry[0], description: entry[1], badge: entry[2] } : template
}
