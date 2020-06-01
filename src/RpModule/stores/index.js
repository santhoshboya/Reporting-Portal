import { ObservationApiService } from '../services/ObservationApiService/ObservationApiService'
import { ObservationFixtureService } from "../services/ObservationFixtureService/ObservationFixtureService";
import { RpStore } from "./RpStore";

const observationApiService = new ObservationApiService();
const observationFixtureService = new ObservationFixtureService();
const rpStore = new RpStore(observationFixtureService);
export default { rpStore };