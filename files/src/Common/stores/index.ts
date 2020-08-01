import SearchableDropDownService from '../services/SearchableDropDownService/index.fixture'
import TaskService from '../../WorkflowManagement/services/TaskService/index.fixture'
import TaskStore from '../../WorkflowManagement/stores/TaskStore'
import TaskTempleteService from '../../WorkflowManagement/services/TaskTempleteService/index.fixture'
import TaskTemplateStore from '../../WorkflowManagement/stores/TaskTemplateStore'
import TaskActionsService from '../../WorkflowManagement/services/TaskActionsService/TaskActionsFixture'

import FileUploadAPIService from '../services/FileUploadService/index.fixture'

import BoardsService from '../../WorkflowManagement/services/BoardsService/index.api'
import BoardsStore from '../../WorkflowManagement/stores/BoardsStore'
import ColumnsStore from '../../WorkflowManagement/stores/ColumnsStore'
import ColumnsService from '../../WorkflowManagement/services/ColumnsService/ColumnsAPI'

// import authStore = new authStore
// import { networkCallWithApisauce } from '../utils/AuthAPIUtils'
// export const networkCallWithApisauceWithAuth = networkCallWithApisauce(
//    authStore
// )
import CompaniesService from '../../IAM/services/CompaniesService/index.fixture'

import CompaniesStore from '../../IAM/stores/CompaniesStore'
import { networkCallWithApisauce } from '../utils/AuthAPIUtils'

import { UserStore } from '../../IAM/stores/UserStore'

import AuthService from '../../UserProfile/services/AuthService/index.api'
import PasswordService from '../../UserProfile/services/PasswordService/index.fixture'
import TeamsService from '../../IAM/services/TeamsService/index.api'
import UsersSeachService from '../../IAM/services/UserOptionsService/index.fixture'
import UserProfileDetailsService from '../../UserProfile/services/UserProfileDetailsService/index.fixture'
import WorkflowUiStore from '../../WorkflowManagement/stores/WorkflowUiStore'
import AuthStore from '../../UserProfile/stores/AuthStore'
import PasswordStore from '../../UserProfile/stores/PasswordStore'
import UserSearchStore from '../../IAM/stores/UserSearchStore'
import TeamsStore from '../../IAM/stores/TeamsStore'
import HomeTasksStore from '../../WorkflowManagement/stores/HomeTasksStore'
import HomeTasksServiceAPI from '../../WorkflowManagement/services/HomeTasksService/index.fixture'
import UserProfileDetailsStore from '../../UserProfile/stores/UserProfileDetailsStore'
import UsersService from '../../IAM/services/UserService/index.api'
import SearchableDropDownStore from './SearchableDropDownStore'
import FileUploaderStore from './FileUploadStore'
import CounterStore from './CounterStore'

const homeTaskStore = new HomeTasksStore(new HomeTasksServiceAPI())

const authStore = new AuthStore(new AuthService())

export const networkCallWithApisauceWithAuth = networkCallWithApisauce(
   authStore
)

const passwordStore = new PasswordStore(new PasswordService())

const teamsStore = new TeamsStore(
   new TeamsService(networkCallWithApisauceWithAuth)
)

const fileUploadService = new FileUploadAPIService()
const companiesStore = new CompaniesStore(
   new CompaniesService(networkCallWithApisauceWithAuth)
)

const fileUploadStore = new FileUploaderStore(fileUploadService)

const userStore = new UserStore(
   new UsersService(networkCallWithApisauceWithAuth)
)

const userSearchStore = new UserSearchStore(
   new UsersSeachService(networkCallWithApisauceWithAuth)
)

const counterStore = new CounterStore()
const boardsService = new BoardsService(networkCallWithApisauceWithAuth)
const boardsStore = new BoardsStore(boardsService)

const columnsAPI = new ColumnsService(networkCallWithApisauceWithAuth)

const taskActionsService = new TaskActionsService()

//TODO: replace networkCallWithApisauceWithAuth in SearchableDropDownService (url,networkCallWithApisauceWithAuth)

const columnsStore = new ColumnsStore(columnsAPI, taskActionsService)
export const getSearchableDropDownStore = url =>
   new SearchableDropDownStore(new SearchableDropDownService(url, () => {}))

const taskTempleteService = new TaskTempleteService()
const taskTemplateStore = new TaskTemplateStore(taskTempleteService)
const taskService = new TaskService(networkCallWithApisauceWithAuth)
const taskStore = new TaskStore(taskService, taskTemplateStore)

const userProfileDetailsStore = new UserProfileDetailsStore(
   new UserProfileDetailsService(networkCallWithApisauceWithAuth)
)
const workflowUiStore = new WorkflowUiStore()
export default {
   taskTemplateStore,
   taskStore,
   counterStore,
   columnsStore,
   fileUploadStore,
   boardsStore,
   teamsStore,
   companiesStore,
   userStore,
   userSearchStore,
   authStore,
   passwordStore,
   userProfileDetailsStore,
   homeTaskStore,
   workflowUiStore
}

/*

Sample usage of networkCallWithApisauceWithAuth:

   userProfileDetailsStore,
   workflowUiStore
}*/
