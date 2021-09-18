import React from 'react'
import { render } from '@testing-library/react'
import {
   getRandomItemFromGivenArray,
   changeGivenTextToUpperCase,
   getFirstTwoLettersFromGivenName
} from '.'

describe('Should test Helper utils', () => {
   it('Should return a random item from an array', () => {
      const array = [1, 2, 3, 4]
      const randomNumber = getRandomItemFromGivenArray(array)
      expect(array.includes(randomNumber))
   })
   it('Should test changeGivenTextToUpperCase util', () => {
      const testName = 'ibhubs'
      const result = changeGivenTextToUpperCase(testName)
      expect(result).toBe(testName.toUpperCase())
   })
   it('Should test getFirstTwoLettersFromGivenName util', () => {
      const testName = 'ibhubs'
      const result = getFirstTwoLettersFromGivenName(testName)
      expect(result).toBe('ib')
   })
})
