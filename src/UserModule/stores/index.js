import { UserStore } from "./UserStore";
import { ObservationListApi } from "../services/ObservationListApi/ObservationListApi";
const observationListApi = new ObservationListApi();
const userStore=new UserStore(observationListApi);
export default {userStore};