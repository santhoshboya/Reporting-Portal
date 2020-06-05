import { RpObservationApiService } from '../services/RpObservationApiService/RpObservationApiService'
import { RpObservationFixtureService } from "../services/RpObservationFixtureService/RpObservationFixtureService";

import { ObservationApiService } from '../../UserModule/services/ObservationApiService/ObservationApiService'
import { ObservationFixtureService } from "../../UserModule/services/ObservationFixtureService/ObservationFixtureService";

import { RpStore } from "./RpStore";
const rpObservationApiService = new RpObservationApiService();
const observationApiService = new ObservationApiService();
const observationFixtureService = new ObservationFixtureService();
const rpObservationFixtureService = new RpObservationFixtureService();

// const observationApiService = new ObservationApiService();
// const rpObservationApiService = new RpObservationApiService();

const rpStore = new RpStore(rpObservationApiService, observationApiService);
export default { rpStore };