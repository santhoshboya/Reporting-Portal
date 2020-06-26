export interface details{
    user_type: string,
    sort_on: string,
    sort_by: string,
    filter_on: string
}
export interface getObservationListApiRequestObject{
    limit:number,
    offeset:number,
    details:details
}

export interface observationType{
           title: string,
           reported_on:string,
           assigned_to: {
              first_name: string,
              phone_no:string
           },
           reported_by: {
              name:string ,
              phone_no:string
           },
           severty: string,
           status: string,
           due_date: string,
           due_date_type:string,
           messages_count: number,
           observation_id: number
}

export interface getObservationListApiResponce{
        user_observations: Array<observationType>
        user_observations_count: number,
        user_type: string
     
}

export interface getObservationApiRequestObject{
    observation_id:string
}


export interface personType{
    user_id:number,
    first_name:string,
    last_name:string,
    phone_number:string,
    profile_pic:string
}

export interface caregoryType{
    category_id:number,
    name:string
}
export interface subCategoryType{
    sub_category_id:number
    name:string,
    category_id:number,

}

export interface getObservationApiResponce{
    title: string,
    reported_on:string,
    assigned_to: personType,
    severity: string,
    status: string,
    due_date: string,
    due_date_type:string,
    observation_id: number,
    description:string,
    attachments:Array<string>,
    rp_list:Array<personType>,
    category:caregoryType,
    sub_category:subCategoryType

}

export interface postObservationApiRequestObject{
    title:string,
    category_id: string,
    sub_category_id:string,
    severity: string,
    description: string,
    attachments: Array<string>    
}
export interface postObservationApiResponce{
}

export interface subCategory{
    id:number,
    name:string
}

export interface category{
    category_id:number,
    category:string,
    sub_catogiries:Array<subCategory>
}
export interface getCateogariesApiResponce{
    categories:Array<category>
}

export interface updateObservationDeatailsByAdminRequestObject{
    observation_id:string,
    category_id:string,
    sub_category_id:string
}

export interface updateObservationDeatailsByRpRequestObject{
    observation_id:string,
    status:string,
    due_date:string,
    assigned_to_id:string,
    due_date_type:string
}

export interface updateObservationDeatailsRequestObject{
    userType:string,
    Details:updateObservationDeatailsByAdminRequestObject|updateObservationDeatailsByRpRequestObject
}