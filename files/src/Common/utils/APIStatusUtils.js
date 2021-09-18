import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

export function isAPISuccess(...args) {
   const status = true
   return Array.from(args).reduce(
      (returnStatus, item) =>
         returnStatus && parseInt(item, 10) === API_SUCCESS,
      status
   )
}

export function isAPIFailed(...args) {
   return Array.from(args).indexOf(API_FAILED) !== -1
}

/**
     Takes only network call status of multiple calls and
     returns true if any one of them is in loading condition
   */

export function isAPIFetching(...args) {
   const status = false
   return Array.from(args).reduce(
      (returnStatus, item) =>
         returnStatus || parseInt(item, 10) === API_FETCHING,
      status
   )
}

export function isAPIInitial(...args) {
   const status = false
   const initialStatus = Array.from(args).reduce(
      (returnStatus, item) =>
         returnStatus || parseInt(item, 10) === API_INITIAL,
      status
   )
   return initialStatus
}

export function getLoadingStatus(...args) {
   if (isAPISuccess(...args)) {
      return API_SUCCESS
   } else if (isAPIFailed(...args)) {
      return API_FAILED
   } else if (isAPIFetching(...args)) {
      return API_FETCHING
   } else if (isAPIInitial(...args)) {
      return API_INITIAL
   }
   return API_SUCCESS
}
