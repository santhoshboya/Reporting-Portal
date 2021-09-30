import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import {
  NavHeader,
  ContentContainer,
  LogoutButton,
  WebsiteLogo,
  ModalContainer,
  CloseButton,
  AlignRow,
  ConfirmButton,
  ModalDesc,
  AlignColumn,
  ContentListItem,
  WebsiteLogoContainer,
  LinkItem,
} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <NavHeader bgColor="#ffffff">
      <LinkItem to="/">
        <WebsiteLogoContainer>
          <WebsiteLogo
            src="https://res.cloudinary.com/dqnh9af86/image/upload/v1632732098/Vector_nqrxvp.png"
            alt="website logo"
            height="30"
            width="40"
          />
          <WebsiteLogo
            src="https://res.cloudinary.com/dqnh9af86/image/upload/v1632732315/Features_kmnx0g.png"
            alt="website name"
            height="30"
            width="150"
          />
        </WebsiteLogoContainer>
      </LinkItem>
      <ContentContainer>
        <LinkItem to="/">
          <ContentListItem>Home</ContentListItem>
        </LinkItem>
        <LinkItem to="/cart">
          <ContentListItem>Cart</ContentListItem>
        </LinkItem>

        <ContentListItem>
          <Popup
            modal
            trigger={
              <LogoutButton type="button" data-testid="iconButton">
                Logout
              </LogoutButton>
            }
            className="popup-content"
          >
            {close => (
              <ModalContainer>
                <AlignColumn>
                  <ModalDesc>Are you sure you want to logout?</ModalDesc>
                  <AlignRow>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </CloseButton>

                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </AlignRow>
                </AlignColumn>
              </ModalContainer>
            )}
          </Popup>
        </ContentListItem>
      </ContentContainer>
    </NavHeader>
  )
}

export default withRouter(Header)
