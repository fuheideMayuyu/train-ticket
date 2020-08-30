import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css'
import Header from '../common/Header.jsx'
import DepartDate from './DepartDate.jsx'
import HighSpeed from './HighSpeed.jsx'
import Journey from './Journey.jsx'
import Submit from './Submit.jsx'
import CitySelector from '../common/CitySelector.jsx'

import{ exchangeFromTo, showCitySelector } from './actions'

function App(props) {

  const { from, to, dispatch, isCitySelectorVisible, cityData, isLoadingCityData } = props

  const onBack = useCallback(() =>{
    window.history.back()
  }, [])
  
  const cbs = useMemo(() =>{
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}/> 
      </div>
      <form className="form">
        <Journey from={from} to={to} {...cbs}/>
        <DepartDate/>
        <HighSpeed/>
        <Submit/>
      </form>
      <CitySelector show={isCitySelectorVisible} cityData={cityData} isLoading={isLoadingCityData}/>
    </div>
  )
}

export default connect(
  function mapStateTopProps(state) {
    return state
  },
  function mapDispatchTopProps(dispatch) {
    return { dispatch }
  },
)(App)