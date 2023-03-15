// Utility component
const Margin = ({ x, y }: { x?: number; y: number }) => {
  return <div className={`mx-${x} my-${y}`}></div>
}

export default Margin
