import { AdminObservationFixtureService } from '../services/AdminObservationFixtureService/AdminObservationFixtureService'
import { AdminStore } from './AdminStore'
import { RpObservationApiService } from '../../RpModule/services/RpObservationApiService/RpObservationApiService'
import { RpObservationFixtureService } from '../../RpModule/services/RpObservationFixtureService/RpObservationFixtureService'
import { ObservationApiService } from '../../UserModule/services/ObservationApiService/ObservationApiService'
import { ObservationFixtureService } from '../../UserModule/services/ObservationFixtureService/ObservationFixtureService'
import { AdminObservationApiService } from '../services/AdminObservationApiService/AdminObservationApiService'
const rpObservationApiService = new RpObservationApiService()
const observationApiService = new ObservationApiService()
const adminObservationApiService = new AdminObservationApiService()

const observationFixtureService = new ObservationFixtureService()
const rpObservationFixtureService = new RpObservationFixtureService()
const adminObservationFixtureService = new AdminObservationFixtureService()

const adminStore = new AdminStore(
   adminObservationApiService,
   rpObservationApiService,
   observationApiService
)
export default { adminStore }

//const observationFixtureService = new ObservationFixtureService();
// import { ObservationApiService } from '../../UserModule/services/ObservationApiService/ObservationApiService'
// import { ObservationFixtureService } from "../../UserModule/services/ObservationFixtureService/ObservationFixtureService";
// const observationApiService = new ObservationApiService();
// const rpObservationApiService = new RpObservationApiService();

//import { AdminObservationApiService } from '../services/AdminObservationApiService/AdminObservationApiService'
