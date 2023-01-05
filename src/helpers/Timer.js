import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export const Timer = () => (
  <CountdownCircleTimer
    isPlaying
    duration={60}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
    size ={50}
    strokeWidth = {6}

  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
)
