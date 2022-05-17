import React from 'react'
import Loader from 'react-native-loading-spinner-overlay';

const Spinner = () => {
  return (
    <Loader
        visible
        indicatorStyle={{zIndex:1000, flex:1}}
    />
  )
}

export default Spinner