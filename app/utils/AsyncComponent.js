import React from 'react'

/*
  This components is used for split-coding
  in conjunction with `babel-dual-import` and `extract-css-chunks-webpack-plugin`

  See a living example in app/index.js

*/

export default (loader, collection) => (
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.Component = null
      this.state = { Component: AsyncComponent.Component }
    }

    componentWillMount() {
      if (!this.state.Component) {
        loader().then((Component) => {
          AsyncComponent.Component = Component;

          this.setState({ Component });
        });
      }
    }

    render() {
      if (this.state.Component) {
        return (
          <this.state.Component { ...this.props } { ...collection } />
        )
      }

      return <div className={collection.className ? collection.className : ''} />
    }
  }
);
