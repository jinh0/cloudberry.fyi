const Title = ({
  children,
}: {
  children: string | Array<string | JSX.Element>
}) => {
  return (
    <div>
      <div className='text-4xl font-semibold mt-4 mb-4 flex flex-row items-center'>
        {children}
      </div>
    </div>
  )
}

export default Title
