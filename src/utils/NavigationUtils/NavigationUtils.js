export const goToHome = history => {
   history.push('./home')
}

//nested routing
export const goToSpecificProjectScreen = (history, projectId, screen) => {
   history.push(`/home/projects/${projectId}/screen/${screenId}`)
}
export const goToProjectScreen = (history, projectId, screen) => {
   history.push(`/home/projects/${projectId}`)
}

//query routing
export const goToProjectScreen = (history, projectId, screen) => {
   history.push(`/home/projects/${projectId}?sid=${screenId}`)
}
export const goToProjectScreen = (history, projectId, screen) => {
   history.push(`/home/projects/${projectId}`)
}
