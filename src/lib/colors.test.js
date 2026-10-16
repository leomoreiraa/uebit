import test from 'node:test'
import assert from 'node:assert/strict'
import {
  hexToRgb,
  rgbToHex,
  rgbToHsv,
  hsvToRgb,
  normalizeColorToHex,
  isValidHex,
  getTriangleVertices,
  pointToBarycentric,
  barycentricToPoint,
  barycentricToRgb,
  colorToBarycentric,
} from './colors.js'

test('hexToRgb and rgbToHex convert bidirectionally', () => {
  const rgb = hexToRgb('#7145d6')
  assert.deepEqual(rgb, { r: 113, g: 69, b: 214 })
  assert.equal(rgbToHex(rgb.r, rgb.g, rgb.b), '#7145d6')

  // 3-digit shorthand
  assert.deepEqual(hexToRgb('#fff'), { r: 255, g: 255, b: 255 })
  assert.equal(rgbToHex(255, 255, 255), '#ffffff')
})

test('rgbToHsv and hsvToRgb convert accurately', () => {
  // Pure Red
  const redHsv = rgbToHsv(255, 0, 0)
  assert.equal(redHsv.h, 0)
  assert.equal(redHsv.s, 1)
  assert.equal(redHsv.v, 1)
  const redRgb = hsvToRgb(redHsv.h, redHsv.s, redHsv.v)
  assert.deepEqual(redRgb, { r: 255, g: 0, b: 0 })

  // Pure White
  const whiteHsv = rgbToHsv(255, 255, 255)
  assert.equal(whiteHsv.s, 0)
  assert.equal(whiteHsv.v, 1)
  const whiteRgb = hsvToRgb(whiteHsv.h, whiteHsv.s, whiteHsv.v)
  assert.deepEqual(whiteRgb, { r: 255, g: 255, b: 255 })

  // Pure Black
  const blackHsv = rgbToHsv(0, 0, 0)
  assert.equal(blackHsv.v, 0)
  const blackRgb = hsvToRgb(blackHsv.h, blackHsv.s, blackHsv.v)
  assert.deepEqual(blackRgb, { r: 0, g: 0, b: 0 })
})

test('normalizeColorToHex and isValidHex', () => {
  assert.equal(normalizeColorToHex('#abc'), '#aabbcc')
  assert.equal(normalizeColorToHex('7145d6'), '#7145d6')
  assert.equal(normalizeColorToHex('rgb(113, 69, 214)'), '#7145d6')
  assert.equal(normalizeColorToHex('white'), '#ffffff')
  assert.equal(normalizeColorToHex('transparent'), 'transparent')
  assert.equal(normalizeColorToHex(''), '')

  assert.equal(isValidHex('#7145d6'), true)
  assert.equal(isValidHex('7145d6'), true)
  assert.equal(isValidHex('#fff'), true)
  assert.equal(isValidHex('zzz'), false)
  assert.equal(isValidHex(''), false)
})

test('Triangle geometry and barycentric conversions', () => {
  const { A, B, C } = getTriangleVertices(200, 150, 10)

  // Point at vertex A
  const atA = pointToBarycentric(A.x, A.y, A, B, C)
  assert(Math.abs(atA.wA - 1) < 1e-4)
  assert(Math.abs(atA.wB) < 1e-4)
  assert(Math.abs(atA.wC) < 1e-4)

  const ptA = barycentricToPoint(atA.wA, atA.wB, atA.wC, A, B, C)
  assert(Math.abs(ptA.x - A.x) < 1e-4)
  assert(Math.abs(ptA.y - A.y) < 1e-4)

  // HSV Barycentric round-trip
  const whiteBary = colorToBarycentric('#ffffff', 'hsv')
  const whiteRgb = barycentricToRgb(whiteBary.wA, whiteBary.wB, whiteBary.wC, 'hsv', whiteBary.hue)
  assert.equal(rgbToHex(whiteRgb.r, whiteRgb.g, whiteRgb.b), '#ffffff')

  const blackBary = colorToBarycentric('#000000', 'hsv')
  const blackRgb = barycentricToRgb(blackBary.wA, blackBary.wB, blackBary.wC, 'hsv', blackBary.hue)
  assert.equal(rgbToHex(blackRgb.r, blackRgb.g, blackRgb.b), '#000000')

  // Clamps points outside triangle smoothly
  const outside = pointToBarycentric(-50, -50, A, B, C)
  assert(outside.wA >= 0 && outside.wB >= 0 && outside.wC >= 0)
  assert(Math.abs(outside.wA + outside.wB + outside.wC - 1) < 1e-4)
})
