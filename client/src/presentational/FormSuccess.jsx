import React, { Component } from 'react'

import FormPagination from 'presentational/FormPagination.jsx'
import { FormTitle, FormDescription } from 'styled/FormElements.jsx'


export default class FormSuccess extends Component {
  render () {
    return (
      <div>
        <FormTitle>{this.props.form.title}</FormTitle>
        <FormDescription>{this.props.form.title}</FormDescription>
        <FormDescription>Your submission ID is: {this.props.submission_id}</FormDescription>
        <FormPagination
          onLeft={null}
          leftText={ null}
          onRight={this.props.handleReset}
          rightText={ 'Reset Form' }/>
      </div>
    )
  }
}
