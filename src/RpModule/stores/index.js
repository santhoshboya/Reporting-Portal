import { RpObservationApiService } from '../services/RpObservationApiService/RpObservationApiService'
import { RpObservationFixtureService } from "../services/RpObservationFixtureService/RpObservationFixtureService";

import { ObservationApiService } from '../../UserModule/services/ObservationApiService/ObservationApiService'
import { ObservationFixtureService } from "../../UserModule/services/ObservationFixtureService/ObservationFixtureService";

import { RpStore } from "./RpStore";
const observationFixtureService = new ObservationFixtureService();
const rpObservationFixtureService = new RpObservationFixtureService();

// const observationApiService = new ObservationApiService();
// const rpObservationApiService = new RpObservationApiService();

const rpStore = new RpStore(rpObservationFixtureService, observationFixtureService);
export default { rpStore };