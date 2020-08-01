export interface MemberObject {
   member_id: string
   name: string
   profile_pic_url: string
}

export interface UserOptionObject {
   user_id: string
   name: string
}

export interface NewTeamObject {
   name: string
   description: string
   user_ids: Array<string> //TODO: Need to change as memeber_ids
}
export interface TeamObject {
   team_id: string
   name: string
   description: string
   no_of_members: number
   members: Array<MemberObject>
}

export interface CompanyObject {
   company_id: string
   name: string
   description: string
   logo_url: string
   no_of_employees: number
   employees?: [Employee]
}

export interface GetCompaniesResponse {
   total_companies_count: number
   companies: Array<CompanyObject>
}
export interface GetTeamsApiResonse {
   total_teams_count: number
   teams: Array<TeamObject> | null
}
export interface UserTeamObject {
   team_id: string
   team_name: string
}
export interface RoleObject {
   role_id: string
   role_name: string
}
export interface CompanyNameType {
   company_id: string
   company_name: string
}
export interface UserObject {
   user_id: string
   name: string
   email: string
   teams: Array<UserTeamObject>
   roles: Array<RoleObject>
   company: CompanyNameType
}
export interface GetUsersResponse {
   users: Array<UserObject>
   total: number
}

export interface UsersListAPIRequestObjectType {
   offset: number
   limit: number
   searchText: string
}

export interface AddUserRequestObject {
   name: string
   email: string
}

export interface CompanyOptionObject {
   company_id: string
   company_name: string
}

export interface UserAssignedDetilsAPIResponseObject {
   roles: Array<RoleObject>
   teams: Array<UserTeamObject>
   companies: Array<CompanyOptionObject>
}

export interface TeamObjectType {
   teamId: string
   teamName: string
}
export interface RoleObjectType {
   roleId: string
   roleName: string
}
export interface EditUserRequestObject {
   name: string
   email: string
}
export interface DeleteUserRequestObject {
   user_id: string
}
export interface AddTeamApiResponse {
   team_id: string
}

export interface GetUserOptionsApiResponse {
   users: Array<UserOptionObject>
}

export interface PostOrPutCompanyObject {
   name: string
   description: string
   employee_ids: Array<string>
}

export interface PostCompanyResponse {
   company_id: string
}

export interface Employee {
   employee_id: string
   name: string
}

export interface GetSelectedCompanyResponse {
   company_id: string
   name: string
   description: string
   logo_url: string
   employees: Array<Employee>
   no_of_employees?: number
}

export interface FormattedOption {
   value: string
   label: string
}

export type FormattedOptions = Array<FormattedOption>
