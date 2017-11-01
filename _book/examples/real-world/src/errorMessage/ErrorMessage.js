import React from 'react'
import { connect } from 'react-redux'
import { resetErrorMessage } from './actions'

const ErrorMessage = ({ errorMessage, resetErrorMessage }) => {
    if (!errorMessage) {
      return null
    }

    const handleDismissClick = (e) => {
      resetErrorMessage()
      e.preventDefault()
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        <button onClick={handleDismissClick}>
          Dismiss
        </button>
      </p>
    )
}

const mapStateToProps = (state) => ({
  errorMessage: state
})

const mapDispatchToProps = ({
  resetErrorMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage)
