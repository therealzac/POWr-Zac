import { connect,applyMiddleware } from 'react-redux'
import ApplicationComponent from 'Components/ApplicationComponent'
import * as actions from 'Actions'

const mapStateToProps = ( state, props ) => {
    return {
      ...state.Application
    }
}

const mapDispatchToProps = (dispatch) => {

  return {};
}

const ApplicationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationComponent)

export default ApplicationContainer
