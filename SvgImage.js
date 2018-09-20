// @flow

import React, { Component } from 'react';
import { View, WebView } from 'react-native';

const firstHtml =
  `<html>
    <head>
      <style>
        html, body 
        { margin:0; padding:0; overflow:hidden; background-color: transparent; } 
        svg { position:relative !important; top:0; left:0; height:100%; width:100%; }
      </style>
    </head>
    <body><div style="width:100%; background-color:transparent">`;
const lastHtml = '</div></body></html>';

class SvgImage extends Component {
  state = { fetchingUrl: null, svgContent: null, svgUrl:null };
  componentDidMount() {
    // this.doFetch(this.props);
    this.setState({
      svgUrl:this.props.source && this.props.source.uri
    })
  }
  componentWillReceiveProps(nextProps) {
    //this.doFetch(nextProps);
    this.setState({
      svgUrl:nextProps.source && nextProps.source.uri
    })
  }
  doFetch = props => {
    let uri = props.source && props.source.uri;
    if (uri) {
      if (uri.match(/^data:image\/svg/)) {
        const index = uri.indexOf('<svg');
        this.setState({ fetchingUrl: uri, svgContent: uri.slice(index) });
      } else {
        // console.log('fetching', uri);
        fetch(uri)
          .then(res => res.text())
          .then(text => {
            this.setState({ fetchingUrl: uri, svgContent: text });
          })
          .catch(err => {
            console.error('got error', err);
          });
      }
    }
  };
  render() {
    const props = this.props;
    const { svgContent } = this.state;

    // let html = `${firstHtml}${svgContent}${lastHtml}`
    let html = `${firstHtml}<img src="${this.state.svgUrl}" style="width:100%; ">${lastHtml}`

    // console.log("HTML", html)
    if (svgContent) {
      return (
        <View pointerEvents="none" style={[props.style, props.containerStyle]}>
          <WebView
            originWhitelist={['*']}
            scalesPageToFit={true}
            style={[
              {
                width: 200,
                height: 100,
                backgroundColor: 'transparent',
              },
              props.style,
            ]}
            scrollEnabled={false}
            source={{ html:html  }}
          />
        </View>
      );
    } else {
      return (
        <View
          pointerEvents="none"
          style={[props.containerStyle, props.style]}
        />
      );
    }
  }
}
export default SvgImage;
