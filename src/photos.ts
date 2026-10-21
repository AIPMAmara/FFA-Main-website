// Photos in public/images, generated as AVIF + WebP at each listed width with
// the "RECALIBRATE" badge cropped off. width/height are the full-size
// dimensions; they reserve space so the page doesn't jump while images load.

export type Photo = {
  name: string
  width: number
  height: number
  widths: number[]
  alt: string
}

export const photos = {
  reflection: {
    name: 'reflection',
    width: 719,
    height: 940,
    widths: [480, 719],
    alt: 'A young woman listens intently at The Amazon Conference, pen resting at her chin.',
  },
  focus: {
    name: 'focus',
    width: 1080,
    height: 586,
    widths: [640, 1080],
    alt: 'Two young women take notes during a session at The Amazon Conference.',
  },
  audience: {
    name: 'audience',
    width: 1080,
    height: 586,
    widths: [640, 1080],
    alt: 'A hall full of young women listening at The Amazon Conference in Calabar.',
  },
  speakerJoy: {
    name: 'speaker-joy',
    width: 1080,
    height: 586,
    widths: [640, 1080],
    alt: 'A guest speaker laughs mid-talk on stage at The Amazon Conference.',
  },
  speakerRoom: {
    name: 'speaker-room',
    width: 719,
    height: 945,
    widths: [480, 719],
    alt: 'A speaker addresses the room, microphone in hand, as attendees look on.',
  },
  tacShirt: {
    name: 'tac-shirt',
    width: 719,
    height: 945,
    widths: [480, 719],
    alt: 'An attendee in a TAC T-shirt watches the stage.',
  },
  tacStage: {
    name: 'tac-stage',
    width: 720,
    height: 1080,
    widths: [480, 720],
    alt: 'A speaker on stage in front of The Amazon Conference banner reading “Find! Become!! Evolve!”',
  },
  attendees: {
    name: 'attendees',
    width: 1080,
    height: 586,
    widths: [640, 1080],
    alt: 'Conference attendees wearing name badges follow a session.',
  },
} satisfies Record<string, Photo>
