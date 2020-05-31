import { UserStore } from "./UserStore";
import { ObservationApiService } from '../services/ObservationApiService/ObservationApiService'
import { ObservationFixtureService } from "../services/ObservationFixtureService/ObservationFixtureService";
import { RpStore } from "./RpStore";

const observationApiService = new ObservationApiService();
const observationFixtureService = new ObservationFixtureService();
const userStore = new UserStore(observationFixtureService);
const rpStore = new RpStore(observationFixtureService);
export default { userStore, rpStore };