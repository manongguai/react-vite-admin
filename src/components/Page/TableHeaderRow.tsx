import { Flex } from 'antd'
import React from 'react'

export interface TableHeaderRowPros {
  align?: string
  elements: {
    render: () => JSX.Element
  }[]
}
const TableHeaderRow = ({ align, elements = [] }: TableHeaderRowPros) => {
  return (
    <Flex gap={10} justify={align || 'end'} style={{ marginBottom: '16px' }}>
      {elements.length > 0 &&
        elements.map((t, i) => {
          // 加上key
          return React.cloneElement(t.render(), { key: i })
        })}
    </Flex>
  )
}

export default TableHeaderRow
