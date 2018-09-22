import React, { Component } from 'react'
// import styled from 'styled-components'


export default class Input extends Component {
  render () {
    switch (this.props.schema.type) {
    case 'text_block':
      return this.renderLongTextInput()
    case 'range':
      return this.renderRangeInput()
    case 'options':
      return this.renderOptionInput()
    case 'number':
      return this.renderNumberInput()
    case 'selection':
      return this.renderSelectionInput()
    default:
      return this.renderInput()
    }
  }

  renderInput () {
    return (
      <input
        type={this.props.schema.type}
        value={this.props.value || ''}
        onChange={this.props.onChange}
      />
    )
  }

  renderNumberInput () {
    return (
      <input
        type="number"
        value={this.props.value || ''}
        onChange={this.props.onChange}
        min={this.props.schema.min}
        max={this.props.schema.max}
      />
    )
  }

  renderRangeInput () {
    return (
      <input
        type="text"
        value={this.props.value || ''}
        onChange={this.props.onChange}
      />
    )
  }
  renderOptionInput () {
    const options = (this.props.schema.options || []).map((o) => (
      <option
        value={o.val || o}
        key={o.val || o}
      >
        {o.text || o}
      </option>
    ))

    return (
      <select
        onChange={this.props.onChange}
        value={this.props.value}
      >
        {options}
      </select>
    )
  }

  renderLongTextInput () {
    return (
      <textarea
        onChange={this.props.onChange}
      >
        {this.props.value || ''}
      </textarea>
    )
  }

  renderSelectionInput () {
    const options = (this.props.schema.options || []).map((o) => (
      <option
        value={o.val || o}
        key={o.val || o}
      >
        {o.text || o}
      </option>
    ))

    return (
      <select
        onChange={this.props.onChange}
        value={this.props.value}
      >
        {options}
      </select>
    )
  }
}
