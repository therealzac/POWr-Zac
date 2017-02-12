import { connect } from 'react-redux'
import React from 'react'

const ApplicationComponent = React.createClass({
  render: function() {
    return (
      <div>
        <div>Get yo post on!</div>
        {this.props.children}
      </div>
    )
  }
})

const mapStateToProps = ( state, props ) => {
    return { ...state.Application }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ApplicationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationComponent)

module.exports = ApplicationContainer
