import styled from 'styled-components'

export const offersImage = styled.img`
  padding: 20px;
`

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const CarouselContainer = styled.div`
  padding: 20px;
  margin: 50px;
  margin-left: 120px;
  display: flex;
  flex-direction: column;
  flex-shrink: shrink;
`

export const PopularContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const PopularContainerTwo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 60%;
`

export const PopularHeading = styled.h3`
  font-family: DM Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 48px;
  /* identical to box height, or 150% */

  color: #183b56;
`

export const PopularDescription = styled.p`
  font-family: DM Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  /* Light / blue-gray / 500 */

  color: #64748b;
`
export const SortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
`

export const SortItem = styled.select`
  border: 0px none;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;

  background: #ffffff;
  /* Light / blue-gray / 300 */

  border: 1px solid #cbd5e1;
  box-sizing: border-box;
  /* Light / Shadow / lg */

  box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04),
    0px 4px 8px rgba(96, 97, 112, 0.16);
  border-radius: 12px;
  margin-left: 15px;
  font-family: DM Sans;
  color: #183b56;
`

export const SortOption = styled.option`
  /* Light / base / white */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  font-family: DM Sans;
`

export const ProductsLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media screen and (min-width: 768px) {
    width: 100%;
  }
`

export const RestaurantsList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  margin-left: 80px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px;
  align-items: center;
`
export const ButtonItem = styled.button`
  border: 1px solid #334155;
  color: #334155;
  background-color: transparent;
  height: 30px;
  width: 30px;
  margin: 20px;
  cursor: pointer;
`

export const PageCount = styled.p`
  font-family: Bree Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  text-align: center;

  /* Light / blue-gray / 700 */

  color: #334155;
`
