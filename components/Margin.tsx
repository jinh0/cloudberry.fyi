const Margin = ({ x, y }: { x?: number; y?: number }) => {
  return <div className={`ml-${x} mt-${y}`}></div>
}

export default Margin
