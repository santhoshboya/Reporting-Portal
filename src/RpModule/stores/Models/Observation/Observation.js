class Observation {
    title
    reportedOn
    assignedTo
    severty
    status
    dueDate
    messages
    observationId
    dueDateType
    constructor(observation) {
        const { title, reportedOn, severty, status, dueDate, messages, due_date_type, assignedTo, observation_id } = observation;
        this.title = title;
        this.reportedOn = reportedOn;
        this.assignedTo = assignedTo;
        this.status = status;
        this.severty = severty;
        this.dueDate = dueDate;
        this.dueDateType = due_date_type
        this.messages = messages;
        this.observationId = observation_id

    }
}
export { Observation }
