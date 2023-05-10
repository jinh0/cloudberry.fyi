import { Note } from '@typing'
import Link from 'next/link'

const Notes = ({ notes }: { notes: Note[] }) => {
  // Adds links to a bullet point
  const withLinks = (point: Note) => {
    return point.links.reduce(
      (acc, link, redIdx) =>
        acc.flatMap(content => {
          if (!(typeof content === 'string')) return [content]

          const idx = content.search(link.text)
          if (idx === -1) return [content]

          const before = content.slice(0, idx)
          const after = content.slice(idx + link.text.length)

          return [
            before,
            <NotesLink key={redIdx} href={link.href} text={link.text} />,
            after,
          ]
        }),
      [point.content]
    )
  }

  // Add bold to "Prerequisites:" in the bullet point
  const format = (words: Array<string | JSX.Element>) => {
    if (words.length === 0) return []

    if (typeof words[0] === 'string' && words[0].startsWith('Prerequisite')) {
      return (
        [
          <span key={words[0]} className='font-semibold mr-1'>
            Prerequisites:{' '}
          </span>,
        ] as Array<string | JSX.Element>
      ).concat(words)
    }

    return words
  }

  return (
    <ul className='list-disc mt-4 pl-6'>
      {notes &&
        notes.map((point, idx) => {
          return (
            <li className='mb-1' key={idx}>
              {withLinks(point)}
            </li>
          )
        })}
    </ul>
  )
}

const NotesLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href}>
      <span className='underline'>{text}</span>
    </Link>
  )
}

export default Notes
