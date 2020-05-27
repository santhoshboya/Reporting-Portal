import {observable,action,computed,toJS} from "mobx"
import { API_INITIAL} from "@ib/api-constants";
import {bindPromiseWithOnSuccess} from '@ib/mobx-promise'
import {setAccessToken,clearUserSession} from '../../utils/StorageUtils'


class AuthStore{
    @observable getUserAuthAPIStatus;
    @observable getUserAuthAPIError;
    @observable Access_token
    authAPIService;

    constructor(authAPIService){
        this.authAPIService=authAPIService;
        this.init();
    }
    @action.bound
    init(){
        this.getUserAuthAPIStatus=API_INITIAL;
        this.getUserAuthAPIError=null;
    }
    @action.bound
    setGetUserAuthAPIStatus(apiStatus){
        this.getUserAuthAPIStatus=apiStatus;

    }

    @action.bound
    setGetUserAuthAPIError(error){
        this.getUserAuthAPIError=error
        
    }

    @action.bound
    setUserAuthAPIResponse(SignInAPIResponse){   
        this.Access_token=SignInAPIResponse[0].access_token;
        setAccessToken(this.Access_token);
        
    }
    @action.bound
    userSignIn(request, onSuccess, onFailure){
        const signInPromise=this.authAPIService.signInAPI();
        return bindPromiseWithOnSuccess(signInPromise)
        .to(this.setGetUserAuthAPIStatus,response => {
            this.setUserAuthAPIResponse(response);
            onSuccess();
          })
        .catch(error => {
        this.setGetUserAuthAPIError(error);
        onFailure();
      });
    }

    @action.bound
    userSignOut(){
        clearUserSession();
    }
}
export {AuthStore};