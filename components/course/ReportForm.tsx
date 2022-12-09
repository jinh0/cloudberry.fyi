import { FormEvent, useState } from 'react'

const ReportForm = () => {
  const [header, setHeader] = useState('jinho is smart')
  const [improve, setImprove] = useState('')
  const [rating, setRating] = useState('1')

  const [error, setError] = useState(false)

  const submit = (event: FormEvent) => {
    event.preventDefault() // stops you from refreshing

    // If a required field is left empty
    if (header === '') {
      console.log("You can't submit!")

      setError(true)

      // Removes the error after a second
      setTimeout(() => {
        setError(false)
      }, 1000)

      return
    }

    console.log('Submitted', header, improve, rating)

    // Make it disappear
    setHeader('')
    setImprove('')
    setRating('1')
  }

  return (
    <div>
      <p>Report inaccurate information</p>

      {error && <div className='text-red-500'>THERE'S AN ERROR YOU IDIOT</div>}

      <form onSubmit={submit}>
        <input
          type='text'
          className='border'
          placeholder='What is wrong?'
          value={header}
          onChange={event => setHeader(event.target.value)}
        />

        <input
          type='text'
          className='border'
          placeholder='How can we improve it?'
          value={improve}
          onChange={evt => setImprove(evt.target.value)}
        />

        <input
          type='number'
          min='1'
          max='10'
          step='0.5'
          value={rating}
          onChange={event => setRating(event.target.value)}
        />

        <button className='border'>Submit</button>
      </form>
    </div>
  )
}

export default ReportForm
