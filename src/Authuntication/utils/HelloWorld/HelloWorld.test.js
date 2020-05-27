import React,{Component} from 'react'
import {render} from '@testing-library/react';
import {HelloWorld} from '.'
describe("HelloWorld msg tests",()=>{
    it("Should render givem message",()=>{
        const {getByText, debug}=render(<HelloWorld msg="santhu"/>);
        getByText(/santhu/i);
        debug();
    })
})