import React from 'react'

export default function References({ references = [] }) {
  return (
    <div className='mb-20'>
      <hr />
      <h3>References</h3>
      <ul>
        {references.map((reference, i) => (
          <li key={i}>
            <a className='text-[var(--page-muted)] hover:text-[var(--page-ink)]' href={reference.url}>{reference.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}