/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  Component
} from "react"
import {
  Box,
  Flex,
  FlexItem,
  Heading,
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableBody,
  theme
} from "@looker/components"
import styled from "styled-components"
import { ColumnDescriptor, CommentPermissions } from "./interfaces"
import {
  ILookmlModel,
  ILookmlModelExplore,
  ILookmlModelExploreField,
  IUser
} from "@looker/sdk"
import { DetailDrawer } from "./DetailDrawer"
import { DETAILS_PANE } from "../utils/constants"

export const TableWrapper = styled(Box as any)`
  border-bottom: 0.5px solid #95b1d6;

  &:last-child {
    border-bottom: none;
  }
`

// Sticky Table Header
export const StickyHeader = styled(TableHeaderCell as any)`
  @supports (position: sticky) {
    position: sticky;
    top: 0;
  }
`

export const Fields: React.FC<{
  columns: ColumnDescriptor[]
  explore: ILookmlModelExplore
  label: string
  model: ILookmlModel
  fields: ILookmlModelExploreField[]
  search: string
  shownColumns: string[]
  comments: string
  addComment: (newCommentStr: string, field: string) => void
  editComment: (newCommentStr: string, field: string) => void
  deleteComment: (newCommentStr: string, field: string) => void
  authors: IUser[]
  me: IUser
  permissions: CommentPermissions
}> = ({
  columns,
  explore,
  label,
  fields,
  model,
  search,
  shownColumns,
  comments,
  addComment,
  editComment,
  deleteComment,
  authors,
  me,
  permissions
}) => {
    const [tab, setTab] = React.useState(DETAILS_PANE)

    useEffect(() => {

      //setting color of text of table body 
      var tablebodies = document.getElementsByTagName('tbody') as HTMLCollection; //collection of tablebody elements
      for (let i = 0; i < tablebodies.length; i++) {
        var tablebody = tablebodies[i]; //each tablebody element
        for (let j = 0; j < tablebody.children.length; j++) { //first layer of children (each row)
          var tablerow = tablebody.children[j] as HTMLElement;
          if (tablerow != undefined) {
            var sqltext1 = tablerow.children[tablerow.children.length - 1].children[0].children[0] as HTMLElement;
            if (sqltext1 != undefined && sqltext1 != null) {
              sqltext1.style.color = "#9B9EA3";

              //changing the color of the "SQL" column, different types of characters have different colors
              if (sqltext1.children.length > 0) {
                for (let k = 0; k < sqltext1.children.length; k++) {
                  var sqltext2 = sqltext1.children[k] as HTMLElement;
                  if (sqltext2.textContent != '.'
                    && sqltext2.textContent != '`'
                    && sqltext2.textContent != '='
                    && sqltext2.textContent != 'OR'
                    && sqltext2.textContent != ','
                    && sqltext2.textContent != '-'
                  ) {
                    if (sqltext2.textContent.includes('\"')) {
                      sqltext2.style.color = "#c15151";
                    } else if (sqltext2.textContent === '(' || sqltext2.textContent === ')') {
                      sqltext2.style.color = "#9B9EA3"
                    } else if (isNaN(parseInt(sqltext2.textContent))) {
                      sqltext2.style.color = "#6767ff";
                    } else {
                      sqltext2.style.color = "green";
                    }
                  } else {
                    sqltext2.style.color = "#9B9EA3"
                  }
                }
              }
            }
          }

          var icon = tablerow.children[0] as HTMLElement;
          icon.style.borderColor = "#95b1d6" //table border color

          //second later of children (each field within a row)
          for (let k = 1; k < tablerow.children.length; k++) {
            var rowcontent = tablerow.children[k] as HTMLElement;
            rowcontent.style.borderColor = "#95b1d6"; //table border color
            rowcontent.style.color = "#9B9EA3";
          }
        }
      }
    })

    return (
      <TableWrapper p="xxlarge">
        <Flex>
          <FlexItem>
            {/* controls color of heading of table */}
            <Heading as="h2" fontWeight="semiBold" mb="large" style={{ color: '#9399a0', fontSize: '34' }}>
              {label}
            </Heading>
          </FlexItem>
        </Flex>
        <Flex flexDirection="column">
          <Table style={{ backgroundColor: '#21283c' }} width="100%">
            <TableHead>
              <TableRow>
                {columns.map(column => {
                  if (shownColumns.includes(column.rowValueDescriptor)) {
                    return (
                      //controls color of table header row
                      <StickyHeader
                        key={column.label}
                        backgroundColor="#1c2231"
                        fontWeight="medium"
                        color="#9399a0"
                        fontSize="xxlarge"
                        p="medium"
                        pl="small"
                      >
                        {column.label}
                      </StickyHeader>
                    )
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody id="tablebodyelem" fontSize="large">
              {fields.map(field => {
                if (
                  !search ||
                  (field.label_short &&
                    field.label_short
                      .toLowerCase()
                      .includes(search.toLowerCase())) ||
                  (field.description &&
                    field.description
                      .toLowerCase()
                      .includes(search.toLowerCase())) ||
                  (field.field_group_label &&
                    field.field_group_label
                      .toLowerCase()
                      .includes(search.toLowerCase()))
                ) {
                  return (
                    <DetailDrawer
                      field={field}
                      columns={columns}
                      explore={explore}
                      key={field.name}
                      model={model}
                      shownColumns={shownColumns}
                      tab={tab}
                      setTab={setTab}
                      comments={comments}
                      addComment={addComment}
                      editComment={editComment}
                      deleteComment={deleteComment}
                      authors={authors}
                      me={me}
                      permissions={permissions}
                    />
                  )
                }
              })}
            </TableBody>
          </Table>
        </Flex>
      </TableWrapper >
    )
  }
