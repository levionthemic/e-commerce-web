function NContainer({ animationDuration, children, isFinished }) {
  return (
    <div
      style={{
        opacity: isFinished ? 0 : 1,
        pointerEvents: 'none',
        transition: `opacity ${animationDuration}ms linear`
      }}
    >
      {children}
    </div>
  )
}

export default NContainer