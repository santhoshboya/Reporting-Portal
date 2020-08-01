import React from 'react'
import { storiesOf } from '@storybook/react'

import getTasksOverviewResponse from '../../fixtures/getTasksOverviewResponse.json'
import TaskOverviewField from '../../stores/models/TaskOverviewField'

import Field from '.'

const textField = getTasksOverviewResponse.c1.tasks[0].fields[0]
const taskOverviewTextField = new TaskOverviewField(textField)

const imageField = getTasksOverviewResponse.c1.tasks[0].fields[1]
const taskOverviewImageField = new TaskOverviewField(imageField)

storiesOf('TaskOverviewField ', module)
   .add('TaskOverview Text Field', () => (
      <Field field={taskOverviewTextField} />
   ))
   .add('TaskOverview Image Field', () => (
      <Field field={taskOverviewImageField} />
   ))
