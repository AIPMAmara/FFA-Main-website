import type { ReactNode } from 'react'
import Community from './pages/Community'
import Contact from './pages/Contact'
import GetInvolved from './pages/GetInvolved'
import Home from './pages/Home'
import HowWeGrow from './pages/HowWeGrow'
import OurWork from './pages/OurWork'
import StoriesIdeas from './pages/StoriesIdeas'
import WhoWeAre from './pages/WhoWeAre'

export type RouteMeta = {
  path: string
  element: ReactNode
  title: string
  description: string
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    element: <Home />,
    title: 'FemmeFluence Africa — A Community for Becoming',
    description:
      "A leadership and personal development community for young African women who refuse to wait to become who they're capable of being.",
  },
  {
    path: '/who-we-are',
    element: <WhoWeAre />,
    title: 'Who We Are · FemmeFluence Africa',
    description:
      "FemmeFluence Africa's story, vision, values and the team building a generation of African women equipped to lead.",
  },
  {
    path: '/community',
    element: <Community />,
    title: 'The Community · FemmeFluence Africa',
    description:
      'What it means to belong to the FemmeFluence Africa community — who it is for, and how it works.',
  },
  {
    path: '/how-we-grow',
    element: <HowWeGrow />,
    title: 'How We Grow · FemmeFluence Africa',
    description:
      'The programmes and experiences through which FemmeFluence Africa members grow — World-Class Woman Academy, Phoenix Circle, and more.',
  },
  {
    path: '/our-work',
    element: <OurWork />,
    title: 'Our Work · FemmeFluence Africa',
    description:
      "FemmeFluence Africa's impact, The Amazon Conference, and the initiatives, partnerships and stories behind the work.",
  },
  {
    path: '/stories-ideas',
    element: <StoriesIdeas />,
    title: 'Stories & Ideas · FemmeFluence Africa',
    description: 'Community stories, articles and leadership insights from FemmeFluence Africa.',
  },
  {
    path: '/get-involved',
    element: <GetInvolved />,
    title: 'Get Involved · FemmeFluence Africa',
    description: 'Join the community, volunteer, mentor, partner or sponsor FemmeFluence Africa.',
  },
  {
    path: '/contact',
    element: <Contact />,
    title: 'Contact · FemmeFluence Africa',
    description: 'Get in touch with FemmeFluence Africa.',
  },
]
