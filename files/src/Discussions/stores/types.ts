export interface TaskDiscussionsRequestObjectType {
   entity_id: string
   entity_type: string
}

export interface Discussion {
   discussion_id: string
   description: string
   title: string
   created_at: string
   author: {
      user_id: string
      name: string
      profile_pic_url: string
   }
   is_clarified: boolean
}

export interface TaskDiscussionsResponseObjectType {
   discussions: Discussion[]
   total_count: number
}

export interface TaskDiscussionRequestObjectType
   extends TaskDiscussionsRequestObjectType {
   title: string
   description: string
}
