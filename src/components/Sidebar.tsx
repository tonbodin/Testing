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
  FieldSelect,
  Flex,
  FlexItem,
  Heading,
  InputSearch,
  theme
} from "@looker/components"
import { useHistory } from "react-router"
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk"
import "./styles.css"
import { internalModelURL } from "../utils/routes"
import { ExploreList } from "./ExploreList"

export const Sidebar: React.FC<{
  currentExplore: ILookmlModelExplore
  currentModel: ILookmlModel
  loadingExplore: string
  models: ILookmlModel[]
  search: string
  setSearch: (search: string) => void
}> = ({
  currentExplore,
  currentModel,
  loadingExplore,
  models,
  search,
  setSearch
}) => {
    const history = useHistory()

    useEffect(() => {
      // Setting properties of select cusip drop down after components mount onto DOM
      var label = document.getElementById('flexy').children[0].children[0] as HTMLElement;
      label.style.color = "green";
      label.style.fontSize = "20";
      label.style.marginBottom = "10px";
      label.style.fontWeight = "semiBold";
    })

    return (
      <Flex flexDirection="column" pt="xxlarge" pb="xxlarge">
        <FlexItem
          id="flexy"
          borderBottom={`1px solid ${theme.colors.ui2}`}
          ml="large"
          mr="xlarge"
          pb="medium"
        >
          <FieldSelect
            name="select-model"
            label="Select a Model"
            options={models.map(m => ({ value: m.name, label: m.label }))}
            onChange={selectedModel =>
              history.push(internalModelURL({ model: selectedModel }))
            }
            value={currentModel && currentModel.name}
          />
        </FlexItem>
        <FlexItem ml="large" mr="xlarge" pt="medium">
          <Heading className="text" as="h5" fontWeight="semiBold" style={{ color: "green", fontSize: "20" }}>
            Explores
          </Heading>
          <InputSearch
            hideSearchIcon
            placeholder="Search Model"
            mt="medium"
            onChange={e => setSearch(e.currentTarget.value)}
            value={search}
          />
        </FlexItem>
        <ExploreList
          currentExplore={currentExplore}
          loadingExplore={loadingExplore}
          search={search}
        />
      </Flex>
    )
  }
