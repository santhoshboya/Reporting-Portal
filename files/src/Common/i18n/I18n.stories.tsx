import React from 'react'
import { storiesOf } from '@storybook/react'
import i18n from '.'
storiesOf('I18n usage for different modules usage', module)
   .add('String from common module', () => (
      <div>
         <p>{i18n.t('common:pagination.of')}</p>
         <p>{i18n.t('common:apiSearchableDropDown.errorMessages.required')}</p>
         <p>
            {i18n.t(
               'common:apiSearchableDropDown.errorMessages.shouldSelectFromDropDown'
            )}
         </p>
         <p>{i18n.t('common:apiSearchableDropDown.noResultsFound')}</p>
         <p>{i18n.t('common:checkBox.checkBox')}</p>
         <p>{i18n.t('common:BaseRadioButton.radio')}</p>
         <p>{i18n.t('common:BaseS3.fileSizeMaximumLimitReached')}</p>
         <p>{i18n.t('common:dropDown.noOptionsToselect')}</p>
      </div>
   ))
   .add('String from workflowManagement module', () => (
      <span>{i18n.t('workflowManagement:tasks.createTask')}</span>
   ))
   .add('String from userProfile module', () => (
      <span>{i18n.t('userProfile:login')}</span>
   ))
   .add('String from discussions module', () => (
      <span>{i18n.t('discussions:create.title')}</span>
   ))
