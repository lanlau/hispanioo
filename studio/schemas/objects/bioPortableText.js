import React from 'react'
export default {
  name: 'bioPortableText',
  type: 'array',
  title: 'Excerpt',
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Underline',
            value: 'u',
            blockEditor: {
              icon: () => <span style={{ 'text-decoration': 'underline' }}>U</span>,
              render: props => (
                <span style={{ 'text-decoration': 'underline' }}>{props.children}</span>
              )
            }
          },
          {
            title: 'Strike',
            value: 'strike',
            blockEditor: {
              icon: () => <span style={{ 'text-decoration': 'line-through' }}>R</span>,
              render: props => (
                <span style={{ 'text-decoration': 'line-through' }}>{props.children}</span>
              )
            }
          }
        ]
      }
    }
  ]
}
