import React, {Component,propTypes} from 'react';
import {WebView, View} from "react-native";


const BODY_TAG_PATTERN = /\<\/ *body\>/;

// Do not add any comments to this! It will break because all line breaks will removed for
// some weird reason when this script is injected.
var script = `
;(function() {
var wrapper = document.createElement("div");
wrapper.id = "height-wrapper";
while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
}
document.body.appendChild(wrapper);
var i = 0;
function updateHeight() {
    document.title = wrapper.clientHeight;
    window.location.hash = ++i;
}
updateHeight();
window.addEventListener("load", function() {
    updateHeight();
    setTimeout(updateHeight, 1000);
});
window.addEventListener("resize", updateHeight);
}());
`;


const style = `
<style>
body, html, #height-wrapper {
  font-family: "san francisco";
  font-size:15px;
  margin: 0;
  padding: 0;
}
#height-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
<script>
${script}
</script>
`;

const codeInject = (html) => html.replace(BODY_TAG_PATTERN, style + "</body>");


/**
 * Wrapped Webview which automatically sets the height according to the
 * content. Scrolling is always disabled. Required when the Webview is embedded
 * into a ScrollView with other components.
 *
 * Inspired by this SO answer http://stackoverflow.com/a/33012545
 * */
var WebViewAutoHeight = React.createClass({

    propTypes: {
        source: React.PropTypes.object.isRequired,
        injectedJavaScript: React.PropTypes.string,
        minHeight: React.PropTypes.number,
        onNavigationStateChange: React.PropTypes.func,
        style: WebView.propTypes.style,
    },

    getDefaultProps() {
        return {minHeight: 100};
    },

    getInitialState() {
        return {
            realContentHeight: this.props.minHeight,
        };
    },

    handleNavigationChange(navState) {
        if (navState.title) {
            const realContentHeight = parseInt(navState.title) || 0; // turn NaN to 0
            this.setState({realContentHeight});
        }
        if (typeof this.props.onNavigationStateChange === "function") {
            this.props.onNavigationStateChange(navState);
        }
    },

    render() {
        const {source, style, minHeight, ...otherProps} = this.props;
        const html = source.html;

        if (!html) {
            throw new Error("WebViewAutoHeight supports only source.html");
        }

        if (!BODY_TAG_PATTERN.test(html)) {
            throw new Error("Cannot find </body> from: " + html);
        }

        return (
            <View>
                <WebView
                    {...otherProps}
                    source={{html: codeInject(html)}}
                    scrollEnabled={true}
                    style={[style, {height: Math.max(this.state.realContentHeight, minHeight)}]}
                    javaScriptEnabled
                    onNavigationStateChange={this.handleNavigationChange}
                />
            </View>
        );
    },

});


export default WebViewAutoHeight;
