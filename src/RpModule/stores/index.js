import { UserStore } from "./UserStore";

import { ObservationApiService } from '../services/ObservationApiService/ObservationApiService'
import { ObservationFixtureService } from "../services/ObservationFixtureService/ObservationFixtureService";

const observationApiService = new ObservationApiService();
const observationFixtureService = new ObservationFixtureService();
const userStore = new UserStore(observationFixtureService);
export default { userStore };