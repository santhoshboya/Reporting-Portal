import React, { Component } from 'react'
import { observable } from 'mobx';
import { UserStore } from '../../../UserModule/stores/UserStore';
import { action } from '@storybook/addon-actions';

class RpStore extends UserStore {
    @observable id = 1;
    @observable rpObservationsList;



}
export { RpStore };
