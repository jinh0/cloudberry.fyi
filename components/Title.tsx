const Title = ({ children }: { children: string | string[] }) => {
  return (
    <div>
      <p className="text-4xl font-semibold mt-4 mb-4">{children}</p>
    </div>
  )
}

export default Title
