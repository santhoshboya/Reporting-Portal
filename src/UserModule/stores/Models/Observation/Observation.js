class Observation {
    title
    reportedOn
    assignedTo
    severty
    status
    dueDate
    messages
    constructor(observation){
        const {title,reportedOn,severty,status,dueDate,messages,assignedTo}=observation;
        this.title=title;
        this.reportedOn=reportedOn;
        this.assignedTo=assignedTo;
        this.status=status;
        this.severty=severty;
        this.dueDate=dueDate;
        this.messages=messages;
        
    }
}
export {Observation}
