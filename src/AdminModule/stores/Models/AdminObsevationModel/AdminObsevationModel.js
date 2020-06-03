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
        const { title, reportedOn, severty, status, dueDate, messages, reportedBy, dueDateType, assignedTo, observation_id } = observation;
        this.title = title;
        this.reportedOn = reportedOn;
        this.assignedTo = assignedTo;
        this.status = status;
        this.severty = severty;
        this.dueDate = dueDate;
        this.dueDateType = dueDateType;
        this.messages = messages;
        this.observationId = observation_id
        this.reportedBy = reportedBy

    }
}
export { AdminObsevationModel }
