import React, { Component } from 'react'
import { DatePicker } from './DatePicker/DatePicker'
import { DropDown } from './DropDown'
import { Image } from './Image'
import { InputField } from './InputField'
import { RadioButton } from './RadioButton'
import { PrimaryButton } from './PrimaryButton'
import { SecondaryButton } from './SecondaryButton'
import { PrimaryLeftIconDefault } from './PrimaryLeftIconDefault'
import Icon from './Icon.svg'
import { DesktopLayoutAuth } from './DesktopLayoutAuth'
import { DesktopLayoutMainPage } from './DesktopLayoutMainPage'
import strings from '../../common/i18n/strings.json'
import {Typo32DarkBlueGreyRubikRegular,Typo12SteelHKGrotesk,Typo14DarkBlueGreyHKGroteskRegular
    ,Typo14WhiteRubikMedium,Typo12SteelHKGroteskSemiBold,Typo14DarkBlueGreyHKGroteskSemiBold,Typos24DarkBlueGreyHKGroteskMedium
    ,Typo18171f46HKGroteskMedium,Typo32BrightBlueHKGroteskMedium,Typo12DarkBlueGreyHKGroteskSemiBold} from '../../common/styleGuide/Typos/index'
 class Check extends Component {
    render() {
        return (
            //<DesktopLayoutMainPage></DesktopLayoutMainPage>
            <DesktopLayoutAuth>
            
            <Typo32DarkBlueGreyRubikRegular>Sign In</Typo32DarkBlueGreyRubikRegular>
        <Typo12SteelHKGrotesk>{strings.usersScreen.titleOfTheObservation}</Typo12SteelHKGrotesk>
            <Typo14DarkBlueGreyHKGroteskRegular>Sign Out</Typo14DarkBlueGreyHKGroteskRegular>
            <Typo12SteelHKGroteskSemiBold>Reset</Typo12SteelHKGroteskSemiBold>
            <DatePicker/><br/>
            <DropDown options={[1,2,3]}/>
            <Image className={'sample'} src={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4f00d506-2d1f-4bba-9084-f0666b4e3f2b@3x.png'}/><br/>
            <InputField/><br/>
            <RadioButton/><br/>
            <PrimaryButton width={200} value={"primary"}/><br/>
            <SecondaryButton value={"primary"}/><br/>
            <PrimaryLeftIconDefault src={Icon} value={"primary"}/><br/>
            
            </DesktopLayoutAuth>
        )
    }
}
export {Check}
