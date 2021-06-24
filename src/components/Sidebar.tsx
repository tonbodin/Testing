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
      // Setting properties of elements in sidebar after components mount onto DOM
      var label1 = document.getElementById('sidebarflex1').children[0].children[0] as HTMLElement;
      var asideTag = document.getElementById('sidebarflex1').parentNode.parentNode as HTMLElement;
      asideTag.style.backgroundColor = "#252d40"
      label1.style.color = "#9399a0"; // "SELECT A MODEL" Text
      label1.style.fontSize = "18";
      label1.style.marginBottom = "10px";
      label1.style.fontWeight = "600";
      label1.style.width = "200px";

      // Top dropdown box on sidebar
      var inputBox1 = document.getElementById('sidebarflex1').childNodes[0].childNodes[1].childNodes[0].childNodes[0] as HTMLElement;
      inputBox1.style.backgroundColor = "#d1d6e6"
      inputBox1.style.borderColor = "#9B9EA3"
      var inputBox1Text = document.getElementById('sidebarflex1').childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
      inputBox1Text.style.color = "#131722"
      inputBox1Text.style.fontSize = "17"

      // Bottom dropdown box on sidebar
      var inputBox2 = document.getElementById('sidebarflex2').children[1] as HTMLElement;
      inputBox2.style.backgroundColor = "#d1d6e6"
      inputBox2.style.borderColor = "#9B9EA3"
      var inputBox2text = document.getElementById('sidebarflex2').children[1].children[0] as HTMLElement;
      inputBox2text.style.color = "#131722"
      inputBox2text.style.fontSize = "17"

      return () => {
        var asideTag = document.getElementById('sidebarflex1').parentNode.parentNode as HTMLElement;
        asideTag.style.backgroundColor = "#131722"
      }
    }, [])

    return (
      <Flex flexDirection="column" pt="xxlarge" pb="xxlarge">
        <FlexItem
          id="sidebarflex1"
          borderBottom={`1px solid #6c6c6c`}
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
        <FlexItem id="sidebarflex2" ml="large" mr="xlarge" pt="medium">
          <Heading className="text" as="h5" fontWeight="semiBold" style={{ color: "#9399a0", fontSize: "20" }}>
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
