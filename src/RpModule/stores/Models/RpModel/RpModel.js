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
        const { title, reportedOn, severty, status, dueDate, messages, dueDateType, reportedBy, observation_id } = observation;
        this.title = title;
        this.reportedOn = reportedOn;
        this.reportedBy = reportedBy;
        this.status = status;
        this.severty = severty;
        this.dueDate = dueDate;
        this.dueDateType = dueDateType
        this.messages = messages;
        this.observationId = observation_id

    }
}
export { RpModel }
