class RolesModel {
   roleId: string
   roleName: string

   constructor(role) {
      this.roleId = role.role_id
      this.roleName = role.role_name
   }
}
export { RolesModel }
