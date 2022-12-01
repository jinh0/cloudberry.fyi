import { Note } from '@typing'
import Link from 'next/link'

const Notes = ({ notes }: { notes: Note[] }) => {
  // Adds links to a bullet point
  const withLinks = (point: Note) => {
    return point.links.reduce(
      (acc, link) =>
        acc.flatMap(content => {
          if (!(typeof content === 'string')) return [content]

          const idx = content.search(link.text)
          if (idx === -1) return [content]

          const before = content.slice(0, idx)
          const after = content.slice(idx + link.text.length)

          const convertLink = (href: string) => {
            if (!href.startsWith('/study/2022-2023/courses/')) return href

            return '/courses/' + href.split('/study/2022-2023/courses/')[1]
          }

          return [
            before,
            <NotesLink href={convertLink(link.href)} text={link.text} />,
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
        [<span className='font-semibold mr-1'>Prerequisites: </span>] as Array<
          string | JSX.Element
        >
      ).concat(words.slice(1))
    }

    return words
  }

  return (
    <ul className='list-disc mt-4 pl-6'>
      {notes &&
        notes.map((point, idx) => (
          <li className='mb-1' key={idx}>
            {format(withLinks(point))}
          </li>
        ))}
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
