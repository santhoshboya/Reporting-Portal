class AdminObsevationModel {
    title
    reportedOn
    reportedBy
    assignedTo
    severty
    status
    dueDate
    messages
    observationId
    dueDateType

    constructor(observation) {
        const { title, reported_on, severity, status, due_date, messages, reported_by, due_date_type, assigned_to, observation_id } = observation;
        this.title = title;
        this.reportedOn = reported_on;
        this.assignedTo = assigned_to;
        this.status = status;
        this.severty = severity;
        this.dueDate = due_date;
        this.dueDateType = due_date_type;
        this.messages = messages;
        this.observationId = observation_id;
        this.reportedBy = reported_by

    }
}
export { AdminObsevationModel }
