/**
 * The Form component puts together each of the top level form components
 * It also keeps track of pagination
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { buildSubmitHandle } from 'actions/formActions.js'

import FormPage from 'presentational/FormPage.jsx'
import FormPagination from 'presentational/FormPagination.jsx'
import { FormTitle, FormDescription } from 'styled/FormElements.jsx'

class Form extends Component {
  constructor () {
    super()
    this.state = {
      pageIdx: 0
    }
  }


  render () {
    const lastPage = this.state.pageIdx < this.props.form.pages.length - 1
    return (
      <div>
        <FormTitle key="">{this.props.form.title}</FormTitle>
        <FormDescription>{this.props.form.comments}</FormDescription>
        <FormPage page={this.props.form.pages[this.state.pageIdx]} />
        <FormPagination
          onLeft={this.handleLeft}
          leftText={this.state.pageIdx > 0 ? 'Back' : null}
          onRight={this.handleRight}
          rightText={lastPage ? 'Next' : 'Submit'}/>
      </div>
    )
  }

  handleLeft = () => {
    this.setState({
      pageIdx: this.state.pageIdx - 1
    })
  }

  handleRight = () => {
    const max = this.props.form.pages.length - 1

    // If on the last page, submit
    if (this.state.pageIdx === max) {
      // TODO: Validate form validity (required, in bounds, etc)
      this.props.handleSubmit(this.props.form, this.props.values)
      return
    }

    this.setState({
      pageIdx: Math.min(this.state.pageIdx + 1, max)
    })
  }
}


const mapDispatchToProps = dispatch => ({
  handleSubmit: buildSubmitHandle(dispatch)
})

export default connect(
  a => a,
  mapDispatchToProps
)(Form)
