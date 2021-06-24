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

import React, { useEffect, SyntheticEvent } from "react"
import {
  ButtonOutline,
  FieldCheckbox,
  Popover,
  PopoverContent
} from "@looker/components"
import { ColumnDescriptor } from "./interfaces"

const checkChange = (
  setShownColumns: (newState: string[]) => void,
  shownColumns: string[],
  columnDesc: string
) => {
  return (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    if (target.checked) {
      setShownColumns([...shownColumns, columnDesc])
    } else {
      setShownColumns(shownColumns.filter(x => x !== columnDesc))
    }
  }
}

function highlightBackground(e: any) {
  e.target.style.backgroundColor = "#2A2E39"
}

function unhighlightBackground(e: any) {
  e.target.style.backgroundColor = "#1f2436"
}

export const ViewOptions: React.FC<{
  columns: ColumnDescriptor[]
  shownColumns: string[]
  setShownColumns: (newState: string[]) => void
}> = ({ columns, shownColumns, setShownColumns }) => {

  // useEffect(() => {
  //   // Setting properties of elements in sidebar after components mount onto DOM
  //   var pop = document.getElementById('popovercontent')
  //   if (pop != null) {
  //     var popContent = document.getElementById('popovercontent').children as HTMLCollection;
  //     for (let i = 0; i < popContent.length; i++) {
  //       let span = popContent[i].children[0] as HTMLElement;
  //       span.style.color = "#9B9EA3";
  //     }
  //   }
  // })

  return (
    <Popover
      content={
        <PopoverContent
          id="popovercontent"
          style={{ backgroundColor: "#c4ccd8" }}
          p="xsmall"
          width="150px"
        >
          {columns.map(column => {
            return (
              <FieldCheckbox
                key={column.name}
                name={column.name}
                label={column.label}
                onChange={checkChange(
                  setShownColumns,
                  shownColumns,
                  column.rowValueDescriptor
                )}
                checked={shownColumns.includes(column.rowValueDescriptor)}
              />
            )
          })}
        </PopoverContent>
      }
    >
      <ButtonOutline
        onMouseEnter={highlightBackground}
        onMouseLeave={unhighlightBackground}
        style={{
          backgroundColor: "#1f2436",
          color: "#9B9EA3",
          marginLeft: "27px",
          borderColor: "9B9EA3",
          fontSize: "16px"
        }}
        aria-haspopup="true"
      >
        View Options
      </ButtonOutline>
    </Popover>
  )
}
