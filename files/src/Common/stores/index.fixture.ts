import TaskTempleteService from '../../WorkflowManagement/services/TaskTempleteService/index.fixture'
import SearchableDropDownServiceAPI from '../services/SearchableDropDownService/index.fixture'
import TaskTemplateStore from '../../WorkflowManagement/stores/TaskTemplateStore'
import TaskService from '../../WorkflowManagement/services/TaskService/index.fixture'
import TaskStore from '../../WorkflowManagement/stores/TaskStore'

import FileUploadAPIService from '../services/FileUploadService/index.fixture'

import { networkCallWithAPISauceWithoutAuth } from '../utils/APIUtils'
import FileUploaderStore from './FileUploadStore'

import CounterStore from './CounterStore'
import SearchableDropDownStore from './SearchableDropDownStore'

// import authStore = new authStore

const fileUploadService = new FileUploadAPIService()
const fileUploadStore = new FileUploaderStore(fileUploadService)

const counterStore = new CounterStore()

const taskTempleteService = new TaskTempleteService()
//TODO: replace networkCallWithApisauceWithAuth in SearchableDropDownServiceAPI (url,networkCallWithApisauceWithAuth)

export const getSearchableDropDownStore = url =>
   new SearchableDropDownStore(new SearchableDropDownServiceAPI(url, () => {}))

const taskTemplateStore = new TaskTemplateStore(taskTempleteService)
const taskService = new TaskService(networkCallWithAPISauceWithoutAuth)
const taskStore = new TaskStore(taskService, taskTemplateStore)

export default { taskTemplateStore, taskStore, counterStore, fileUploadStore }
