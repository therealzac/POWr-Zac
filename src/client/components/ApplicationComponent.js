import React from 'react'

const ApplicationComponent = React.createClass({
  render: function() {
    return (
      <div>
        <div>Waddap</div>
        {this.props.children}
      </div>
    )
  }
})

module.exports = ApplicationComponent;
