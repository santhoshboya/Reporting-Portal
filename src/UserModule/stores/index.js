import { UserStore } from "./UserStore";

import {ObservationApiService} from '../services/ObservationApiService/ObservationApiService'
const observationApiService = new ObservationApiService();
const userStore=new UserStore(observationApiService);
export default {userStore};