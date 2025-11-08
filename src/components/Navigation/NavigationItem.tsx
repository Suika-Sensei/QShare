import React from 'react'
import type { NavigationItemProps } from './types'

export default function NavigationItem({ item, active, onSelect, className }: NavigationItemProps) {
  const handleClick = (e: any) => {
    if (item.disabled) {
      e.preventDefault()
      return
    }
    onSelect && onSelect(item.id, item)
  }

  const Tag: any = item.href ? 'a' : 'button'
  const classes = [
    'nav-item',
    active ? 'nav-item--active' : '',
    item.disabled ? 'nav-item--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  const children: any[] = []
  if (item.icon) {
    children.push(
      React.createElement(
        'span',
        { className: 'nav-item__icon', key: 'icon' },
        item.icon
      )
    )
  }
  children.push(
    React.createElement('span', { className: 'nav-item__label', key: 'label' }, item.label)
  )
  if (item.badge !== undefined) {
    children.push(
      React.createElement(
        'span',
        { className: 'nav-item__badge', key: 'badge' },
        String(item.badge)
      )
    )
  }

  return React.createElement(
    Tag,
    {
      href: item.href,
      onClick: handleClick,
      className: classes,
      'aria-current': active ? 'page' : undefined,
      'aria-disabled': item.disabled || undefined,
    },
    ...children
  )
}

