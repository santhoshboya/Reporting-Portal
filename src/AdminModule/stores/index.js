import { AdminObservationFixtureService } from "../services/AdminObservationFixtureService/AdminObservationFixtureService";
import { AdminStore } from './AdminStore'

const adminObservationFixtureService = new AdminObservationFixtureService();

const adminStore = new AdminStore(adminObservationFixtureService);
export default { adminStore };







































//const observationFixtureService = new ObservationFixtureService();
// import { ObservationApiService } from '../../UserModule/services/ObservationApiService/ObservationApiService'
// import { ObservationFixtureService } from "../../UserModule/services/ObservationFixtureService/ObservationFixtureService";
// const observationApiService = new ObservationApiService();
// const rpObservationApiService = new RpObservationApiService();






//import { AdminObservationApiService } from '../services/AdminObservationApiService/AdminObservationApiService'
