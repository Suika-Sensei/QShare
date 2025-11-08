import React, { useMemo, useState } from 'react'
import NavigationItem from './NavigationItem'
import type { NavigationProps, NavItem } from './types'

export default function Navigation(props: NavigationProps) {
  const {
    items,
    activeId,
    defaultActiveId,
    onChange,
    orientation = 'vertical',
    className,
    itemClassName,
    renderItem,
  } = props

  const isControlled = typeof activeId === 'string'
  const [internalActive, setInternalActive] = useState(defaultActiveId as any)

  const currentActiveId = isControlled ? (activeId as any) : internalActive

  const handleSelect = (id: string, item: NavItem) => {
    if (!isControlled) setInternalActive(id as any)
    onChange && onChange(id, item)
  }

  const containerClass = useMemo(
    function () {
      return [
        'nav',
        orientation === 'horizontal' ? 'nav--horizontal' : 'nav--vertical',
        className || '',
      ]
        .filter(Boolean)
        .join(' ')
    },
    [orientation, className]
  )

  const listChildren = items.map(function (item) {
    const active = item.id === currentActiveId
    const content = renderItem
      ? renderItem({ item, active, onSelect: handleSelect })
      : React.createElement(NavigationItem as any, {
          key: item.id,
          item,
          active,
          onSelect: handleSelect,
          className: itemClassName,
        })
    const liClass = ['nav__item', active ? 'nav__item--active' : ''].filter(Boolean).join(' ')
    return React.createElement('li', { key: item.id, className: liClass }, content)
  })

  return React.createElement(
    'nav',
    { className: containerClass, role: 'navigation' },
    React.createElement('ul', { className: 'nav__list' }, ...listChildren)
  )
}

