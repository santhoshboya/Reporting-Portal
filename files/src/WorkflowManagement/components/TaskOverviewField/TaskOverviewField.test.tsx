import React from 'react'
import { render } from '@testing-library/react'

import getTasksOverviewResponse from '../../fixtures/getTasksOverviewResponse.json'
import TaskOverviewField from '../../stores/models/TaskOverviewField'

import Field from '.'

const fields = getTasksOverviewResponse.c1.tasks[0].fields
const fieldText = new TaskOverviewField(fields[0])
const fieldImage = new TaskOverviewField(fields[1])

describe('TaskOverviewField component tests', () => {
   it('should render the given text', () => {
      const { getByText } = render(<Field field={fieldText} />)
      getByText(fieldText.value)
   })
   it('should render the given image', () => {
      const { getByAltText } = render(<Field field={fieldImage} />)
      getByAltText(fieldImage.name)
   })
})
