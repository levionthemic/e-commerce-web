import { useNProgress } from '@tanem/react-nprogress'
import Bar from '~/components/Nprogress/Bar'
import NContainer from '~/components/Nprogress/Container'

function NProgress ({ isAnimating }) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating
  })

  return (
    <NContainer animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </NContainer>
  )
}

export default NProgress