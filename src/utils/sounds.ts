let audioContext: AudioContext | null = null

function obtenerAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null

  const AudioCtx =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

  if (!AudioCtx) return null

  if (!audioContext) {
    audioContext = new AudioCtx()
  }

  if (audioContext.state === 'suspended') {
    void audioContext.resume()
  }

  return audioContext
}

function reproducirNota(
  ctx: AudioContext,
  frecuencia: number,
  inicio: number,
  duracion: number,
  tipo: OscillatorType = 'sine',
  volumen = 0.09,
): void {
  const oscilador = ctx.createOscillator()
  const ganancia = ctx.createGain()

  oscilador.type = tipo
  oscilador.frequency.setValueAtTime(frecuencia, inicio)

  // Envolvente suave para evitar chasquidos al iniciar y cortar el tono
  ganancia.gain.setValueAtTime(0.0001, inicio)
  ganancia.gain.exponentialRampToValueAtTime(volumen, inicio + 0.015)
  ganancia.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion)

  oscilador.connect(ganancia)
  ganancia.connect(ctx.destination)

  oscilador.start(inicio)
  oscilador.stop(inicio + duracion + 0.01)
}

export function reproducirSonidoAcierto(): void {
  try {
    const ctx = obtenerAudioContext()
    if (!ctx) return

    const ahora = ctx.currentTime
    reproducirNota(ctx, 523.25, ahora, 0.11, 'sine', 0.09)
    reproducirNota(ctx, 783.99, ahora + 0.08, 0.16, 'sine', 0.1)
  } catch {
    // Ignorar si el navegador bloquea la reproducción de audio
  }
}

export function reproducirSonidoError(): void {
  try {
    const ctx = obtenerAudioContext()
    if (!ctx) return

    const ahora = ctx.currentTime
    reproducirNota(ctx, 220, ahora, 0.09, 'triangle', 0.07)
    reproducirNota(ctx, 175, ahora + 0.08, 0.12, 'triangle', 0.07)
  } catch {
    // Ignorar si el navegador bloquea la reproducción de audio
  }
}

export function reproducirSonidoFinPartida(): void {
  try {
    const ctx = obtenerAudioContext()
    if (!ctx) return

    const ahora = ctx.currentTime
    reproducirNota(ctx, 587.33, ahora, 0.13, 'sine', 0.08)
    reproducirNota(ctx, 493.88, ahora + 0.11, 0.13, 'sine', 0.08)
    reproducirNota(ctx, 392.0, ahora + 0.22, 0.24, 'sine', 0.09)
  } catch {
    // Ignorar si el navegador bloquea la reproducción de audio
  }
}
