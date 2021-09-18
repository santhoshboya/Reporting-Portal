export interface SampleApiRequest {
   phone_number: string
   country_code: string
}

export interface SampleApiResponse {
   is_profile_updated: boolean
   is_new_user: boolean
}

export interface SearchbleDropDownResultsResponse {
   search_results: Array<{
      id: number
      display_name: string
   }>
}

export interface SearchbleDropDownResultsRequest {
   text: string
}
