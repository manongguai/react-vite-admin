import { getAllMenus } from '@/api/system'
import { buildMenuTree } from '@/utils/system'
import { Tree } from 'antd'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

const MenusPage = () => {
  const { data: res, isLoading } = useQuery([], getAllMenus)
  const treeMenus = useMemo(() => {
    console.log(res)
    if (res) {
      console.log(2)
      return buildMenuTree(res.data!)
    }
    return []
  }, [res])
  console.log(treeMenus)

  return (
    <MenuPageWrapper>
      <LeftWrapper>
        <div className="tree_title">目录结构</div>
        <div className="tree_wrapper">
          <Tree
            fieldNames={{
              key: 'id',
              title: 'name'
            }}
            treeData={treeMenus}
          ></Tree>
        </div>
      </LeftWrapper>
      <RightWrapper></RightWrapper>
    </MenuPageWrapper>
  )
}

export default MenusPage

const MenuPageWrapper = styled.div`
  display: flex;
  height: 100%;
  background-color: var(--bg-color);
`

const LeftWrapper = styled.div`
  width: 300px;
  height: 100%;
  border: solid 1px #f0f0f0;
  & .tree_title {
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    font-size: 14px;
    padding: 0 10px;
    border-bottom: 1px solid #f0f0f0;
  }

  & .tree_wrapper {
    padding: 10px 5px;
  }
`
const RightWrapper = styled.div`
  height: 100%;
  flex: auto;
`
