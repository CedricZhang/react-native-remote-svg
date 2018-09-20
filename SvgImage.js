// @flow

import React, { Component } from 'react';
import { View, WebView } from 'react-native';



class SvgImage extends Component {
  state = { fetchingUrl: null, svgContent: null, svgUrl:null };
  componentDidMount() {
    //this.doFetch(this.props);
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
    const { svgContent,svgUrl } = this.state;

    const firstHtml =
  `<html>
    <head>
      <script>
        
        
      
      </script>
      
      <style>
        html, body 
        { margin:0; padding:0; overflow:hidden; background-color: transparent; } 
        svg { position:relative !important; top:0; left:0; height:100%; width:100%; }

        #loading {
          position: absolute;
          left: 50%;
          margin-left: -15vw;
          top: 50vh;
          margin-top: -15vw;
        }

        .sk-cube-grid {
          width: 30vw;
          height: 30vw;
        }
        
        .sk-cube-grid .sk-cube {
          width: 33%;
          height: 33%;
          background-color: #2979FF;
          float: left;
          -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
                  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
        }
        .sk-cube-grid .sk-cube1 {
          -webkit-animation-delay: 0.2s;
                  animation-delay: 0.2s; }
        .sk-cube-grid .sk-cube2 {
          -webkit-animation-delay: 0.3s;
                  animation-delay: 0.3s; }
        .sk-cube-grid .sk-cube3 {
          -webkit-animation-delay: 0.4s;
                  animation-delay: 0.4s; }
        .sk-cube-grid .sk-cube4 {
          -webkit-animation-delay: 0.1s;
                  animation-delay: 0.1s; }
        .sk-cube-grid .sk-cube5 {
          -webkit-animation-delay: 0.2s;
                  animation-delay: 0.2s; }
        .sk-cube-grid .sk-cube6 {
          -webkit-animation-delay: 0.3s;
                  animation-delay: 0.3s; }
        .sk-cube-grid .sk-cube7 {
          -webkit-animation-delay: 0s;
                  animation-delay: 0s; }
        .sk-cube-grid .sk-cube8 {
          -webkit-animation-delay: 0.1s;
                  animation-delay: 0.1s; }
        .sk-cube-grid .sk-cube9 {
          -webkit-animation-delay: 0.2s;
                  animation-delay: 0.2s; }
        
        @-webkit-keyframes sk-cubeGridScaleDelay {
          0%, 70%, 100% {
            -webkit-transform: scale3D(1, 1, 1);
                    transform: scale3D(1, 1, 1);
          } 35% {
            -webkit-transform: scale3D(0, 0, 1);
                    transform: scale3D(0, 0, 1); 
          }
        }
        
        @keyframes sk-cubeGridScaleDelay {
          0%, 70%, 100% {
            -webkit-transform: scale3D(1, 1, 1);
                    transform: scale3D(1, 1, 1);
          } 35% {
            -webkit-transform: scale3D(0, 0, 1);
                    transform: scale3D(0, 0, 1);
          } 
        }

      </style>
    </head>
    <body>
    <div id="loading">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </div>
    
    <div style="width:100%; background-color:#77ffff00">`;
    const lastHtml = `</div>

    <script>
    
    function hideLoading(){
      document.getElementById("loading").style.display = 'none';
      
    }

    document.getElementById("image").onload=hideLoading;
    document.getElementById("image").src="${svgUrl}";
    

    </script>

    
    </body></html>`;

    // let html = `${firstHtml}${svgContent}${lastHtml}`
    let html = `${firstHtml}<img src="" id="image" style="width:100%;">${lastHtml}`
    // console.log(html)
    // console.log("HTML", html)
    if (svgUrl) {
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
                // backgroundColor: '#66ccff',
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
