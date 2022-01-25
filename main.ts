function Random () {
    music.ringTone(randint(131, 988))
    strip.setBrightness(255)
    strip.setPixelColor(randint(0, strip.length() - 1), neopixel.hsl(randint(0, 360), randint(63, 128), randint(0, 64)))
    strip.show()
    basic.pause(150 - Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 100))
    music.stopAllSounds()
    basic.pause(150 - Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 100))
}
input.onButtonPressed(Button.A, function () {
    if (GloveMode == 1) {
        GloveMode = 5
    } else {
        GloveMode += -1
    }
    MusicPlaying = false
    music.stopAllSounds()
    music.setVolume(Mute * 255)
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(GloveMode)
})
function ColorFade (Color: number) {
    for (let index3 = 0; index3 <= 63; index3++) {
        music.ringTone(262 + Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 200))
        music.setVolume(Mute * (index3 * 4))
        if (input.buttonIsPressed(Button.A) || IsShaking) {
            return
        }
        strip.setBrightness(index3)
        strip.showColor(Color)
        strip.show()
        basic.pause(10 - Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 10))
    }
    for (let index4 = 0; index4 <= 63; index4++) {
        music.ringTone(262 + Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 200))
        music.setVolume(Mute * (128 - index4 * 4))
        if (input.buttonIsPressed(Button.A) || IsShaking) {
            return
        }
        strip.setBrightness(63 - index4)
        strip.showColor(Color)
        strip.show()
        basic.pause(10 - Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 10))
    }
}
function TwoColors (Color1: number, Color2: number) {
    for (let index5 = 0; index5 <= Math.ceil(strip.length() / 2); index5++) {
        music.ringTone(196)
        strip.setPixelColor(index5 * 2, Color1)
        strip.setPixelColor(index5 * 2 + 1, Color2)
        strip.show()
    }
    basic.pause(350 - Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 80))
    music.stopAllSounds()
    basic.pause(350 - Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 80))
    for (let index6 = 0; index6 <= Math.ceil(strip.length() / 2); index6++) {
        music.ringTone(131)
        strip.setPixelColor(index6 * 2, Color2)
        strip.setPixelColor(index6 * 2 + 1, Color1)
        strip.show()
    }
    basic.pause(350 - Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 80))
    music.stopAllSounds()
    basic.pause(350 - Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 80))
}
input.onButtonPressed(Button.AB, function () {
    if (Mute == 1) {
        Mute = 0
    } else {
        Mute = 1
    }
    music.setVolume(Mute * 255)
})
input.onButtonPressed(Button.B, function () {
    if (GloveMode == 5) {
        GloveMode = 1
    } else {
        GloveMode += 1
    }
    MusicPlaying = false
    music.stopAllSounds()
    music.setVolume(Mute * 255)
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(GloveMode)
})
function Custom () {
    strip.clear()
    strip.show()
}
function Rainbow () {
    if (!(MusicPlaying)) {
        MusicPlaying = true
        music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Forever)
    }
    music.setTempo(Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 60, 180))
    strip.showRainbow(range1, range2)
    strip.easeBrightness()
    range1 += 2 + Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 18)
    range2 += 2 + Math.map(pins.analogReadPin(AnalogPin.P0), 0, 255, 0, 18)
    if (range1 > 360) {
        range1 = 0
        range2 = 348
    }
}
input.onGesture(Gesture.Shake, function () {
    MusicPlaying = false
    music.stopAllSounds()
    music.setVolume(Mute * 255)
    IsShaking = true
    for (let index7 = 0; index7 <= 10; index7++) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        pins.digitalWritePin(DigitalPin.P2, 1)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        music.playTone(784, music.beat(BeatFraction.Sixteenth))
        basic.pause(100 - index7 * 10)
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        music.playTone(880, music.beat(BeatFraction.Sixteenth))
        music.playTone(698, music.beat(BeatFraction.Sixteenth))
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.pause(100 - index7 * 10)
    }
    music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
    basic.pause(750)
    IsShaking = false
})
let IsShaking = false
let MusicPlaying = false
let Mute = 0
let GloveMode = 0
let range2 = 0
let range1 = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P1, 12, NeoPixelMode.RGB)
range1 = 0
range2 = 348
GloveMode = 1
Mute = 1
basic.showNumber(1)
basic.forever(function () {
    strip.setBrightness(63)
    if (!(IsShaking)) {
        if (GloveMode == 1) {
            Rainbow()
        } else if (GloveMode == 2) {
            Random()
        } else if (GloveMode == 3) {
            TwoColors(neopixel.colors(NeoPixelColors.Red), neopixel.colors(NeoPixelColors.Green))
        } else if (GloveMode == 4) {
            ColorFade(neopixel.colors(NeoPixelColors.Blue))
        } else if (GloveMode == 5) {
            Custom()
        }
    }
})
