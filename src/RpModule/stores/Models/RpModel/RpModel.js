class RpModel {
   title
   reportedOn
   reportedBy
   severty
   status
   dueDate
   messages
   observationId

   dueDateType
   constructor(observation) {
      const {
         title,
         reported_on,
         severity,
         status,
         due_date,
         messages_count,
         due_date_type,
         reported_by,
         observation_id
      } = observation
      this.title = title
      this.reportedOn = reported_on
      this.reportedBy = reported_by
      this.status = status
      this.severty = severity
      this.dueDate = due_date
      this.dueDateType = due_date_type
      this.messages = messages_count
      this.observationId = observation_id
   }
}
export { RpModel }
