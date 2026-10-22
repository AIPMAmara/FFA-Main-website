import Beliefs from './who-we-are/Beliefs'
import NextSteps from './who-we-are/NextSteps'
import Opening from './who-we-are/Opening'
import OriginStory from './who-we-are/OriginStory'
import Team from './who-we-are/Team'
import Vision from './who-we-are/Vision'

// Section ids (#our-story, #our-values, #our-vision, #our-team) are linked from the footer.
export default function WhoWeAre() {
  return (
    <>
      <Opening />
      <OriginStory />
      <Beliefs />
      <Vision />
      <Team />
      <NextSteps />
    </>
  )
}
