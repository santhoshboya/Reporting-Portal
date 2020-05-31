import {
    API_SUCCESS,
    API_FAILED,
    API_FETCHING,
    API_INITIAL
} from "@ib/api-constants";

import getObservationsResponse from '../../fixtures/getObservationsResponse.json'
import { ObservationFixtureService } from "../../services/ObservationFixtureService/ObservationFixtureService";
import { UserStore } from "./UserStore";
import { ObservationApiService } from "../../services/ObservationApiService/ObservationApiService";

describe("UserStore Store tests", () => {
    let obsevationsAPI;
    let userStore;
    beforeEach(() => {
        obsevationsAPI = new ObservationFixtureService();
        userStore = new UserStore(obsevationsAPI);
    })
    it("should test initialising user store", () => {
        expect(userStore.getObservationListAPIStatus).toBe(API_INITIAL);
        expect(userStore.getObservationListAPIError).toBe(null);
        expect(userStore.observationList).toStrictEqual(new Array());
    })

    it("should test obseravtionsListApi data fetching state", () => {
        const mockLoadingPromise = new Promise(function (resolve, reject) { })
        const mockObservationsAPI = jest.fn();
        mockObservationsAPI.mockReturnValue(mockLoadingPromise)
        obsevationsAPI.getObservationListApi = mockObservationsAPI;

        userStore.getObservationList();
        expect(userStore.getObservationListAPIStatus).toBe(API_FETCHING)
    })

    it("should test observationListApi success state", async () => {
        const mockSuccessPromise = new Promise(function (resolve, reject) {
            resolve(getObservationsResponse);
        });
        const mockObservationsAPI = jest.fn();
        mockObservationsAPI.mockReturnValue(mockSuccessPromise);
        obsevationsAPI.getObservationListApi = mockObservationsAPI;
        await userStore.getObservationList();
        expect(userStore.getObservationListAPIStatus).toBe(API_SUCCESS)
    })

    it("should test obseravtionsListApi failure state", async () => {
        const mockFailurePromise = new Promise(function (resolve, reject) {
            reject(new Error("error"))
        })
        const mockObservationsAPI = jest.fn();
        mockObservationsAPI.mockReturnValue(mockFailurePromise)
        obsevationsAPI.getObservationListApi = mockObservationsAPI;

        await userStore.getObservationList();
        expect(userStore.getObservationListAPIStatus).toBe(API_FAILED)
    })

})


















