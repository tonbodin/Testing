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

import React from "react"
import {
  Box,
  ButtonGroup,
  ButtonItem,
  Flex,
  FlexItem,
  Heading,
  theme
} from "@looker/components"
import styled from "styled-components"

export const Main = styled(Box as any)`
  border-radius: 0.25rem;
  min-height: 1.2em;
  padding 0.2em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
`

function highlightBackground(e: any) {
  e.target.style.backgroundColor = "#2A2E39"
}

function unhighlightBackground(e: any) {
  e.target.style.backgroundColor = "#1f2436"
}

export const FilterHeading = styled(Heading as any)`
  margin-bottom: 0.4em;
  color: ${theme.colors.text1};
`

export const Group = styled(FlexItem as any)`
  margin-right: 1.2em;
`

export const QuickSearch: React.FC<{
  selectedFields: string[]
  fields: string[]
  fieldTypes: string[]
  hasDescription: string[]
  hasTags: string[]
  hasComments: string[]
  setSelectedFields: (fields: string[]) => void
  setFieldTypes: (fieldTypes: string[]) => void
  setHasDescription: (hasDescription: string[]) => void
  setHasTags: (hasTags: string[]) => void
  setHasComments: (hasTags: string[]) => void
  showComments: boolean
}> = ({
  selectedFields,
  fields,
  fieldTypes,
  hasDescription,
  hasTags,
  hasComments,
  setSelectedFields,
  setFieldTypes,
  setHasDescription,
  setHasTags,
  setHasComments,
  showComments
}) => {
  return (
    <Main>
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        mt="xlarge"
        pl="xxlarge"
        pr="xxlarge"
      >
        <Group>
          <FilterHeading as="h4" >Has Description</FilterHeading>
          <ButtonGroup value={hasDescription} onChange={setHasDescription} >
            <ButtonItem value={"yes"} onMouseEnter={highlightBackground}
                onMouseLeave={unhighlightBackground} style={{ backgroundColor: "#1f2436", borderColor: "#9B9EA3", color: "#9B9EA3" }}>Yes</ButtonItem>
            <ButtonItem value={"no"} onMouseEnter={highlightBackground}
                onMouseLeave={unhighlightBackground} style={{ backgroundColor: "#1f2436", borderColor: "#9B9EA3", color: "#9B9EA3" }}>No</ButtonItem>
          </ButtonGroup>
        </Group>

        <Group>
          <FilterHeading as="h4">Fields</FilterHeading>
          <ButtonGroup value={fieldTypes} onChange={setFieldTypes}>
            <ButtonItem value="dimensions" onMouseEnter={highlightBackground}
                onMouseLeave={unhighlightBackground} style={{ backgroundColor: "#1f2436", borderColor: "#9B9EA3", color: "#9B9EA3" }}>Dimension</ButtonItem>
            <ButtonItem value="measures" onMouseEnter={highlightBackground}
            onMouseLeave={unhighlightBackground} style={{ backgroundColor: "#1f2436", borderColor: "#9B9EA3", color: "#9B9EA3" }}>Measure</ButtonItem>
          </ButtonGroup>
        </Group>

        <Group>
          <FilterHeading as="h4">Has Tags</FilterHeading>
          <ButtonGroup value={hasTags} onChange={setHasTags}>
            <ButtonItem value="yes" onMouseEnter={highlightBackground}
                onMouseLeave={unhighlightBackground} style={{ backgroundColor: "#1f2436", borderColor: "#9B9EA3", color: "#9B9EA3" }}>Yes</ButtonItem>
            <ButtonItem value="no" onMouseEnter={highlightBackground}
                onMouseLeave={unhighlightBackground} style={{ backgroundColor: "#1f2436", borderColor: "#9B9EA3", color: "#9B9EA3" }}>No</ButtonItem>
          </ButtonGroup>
        </Group>

        {showComments && (
          <Group>
            <FilterHeading as="h4">Has Comments</FilterHeading>
            <ButtonGroup value={hasComments} onChange={setHasComments}>
              <ButtonItem value="yes" onMouseEnter={highlightBackground}
                onMouseLeave={unhighlightBackground} style={{ backgroundColor: "#1f2436", borderColor: "#9B9EA3", color: "#9B9EA3" }}>Yes</ButtonItem>
              <ButtonItem value="no" onMouseEnter={highlightBackground}
                onMouseLeave={unhighlightBackground} style={{ backgroundColor: "#1f2436", borderColor: "#9B9EA3", color: "#9B9EA3" }}>No</ButtonItem>
            </ButtonGroup>
          </Group>
        )}

        <Group>
          <FilterHeading as="h4">Type</FilterHeading>
          <ButtonGroup value={selectedFields} onChange={setSelectedFields}>
            {fields.map(field => {
              return (
                <ButtonItem key={field} value={field} onMouseEnter={highlightBackground}
                onMouseLeave={unhighlightBackground} style={{ backgroundColor: "#1f2436", borderColor: "#9B9EA3", color: "#9B9EA3" }}>
                  {field}
                </ButtonItem>
              )
            })}
          </ButtonGroup>
        </Group>
      </Flex>
    </Main>
  )
}
