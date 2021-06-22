import {
  ILookmlModelExplore,
  ILookmlModelExploreField
} from '@looker/sdk'

export function exploreURL(explore: ILookmlModelExplore) {
  return `/explore/${encodeURIComponent(
    explore.model_name
  )}/${encodeURIComponent(explore.name)}`
}

export function exploreFieldURL(
  explore: ILookmlModelExplore,
  field: ILookmlModelExploreField
) {
  return `${exploreURL(explore)}?fields=${encodeURIComponent(field.name)}`
}
