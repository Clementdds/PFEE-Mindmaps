import React, { Component } from 'react';
import Viewer from "./Viewer";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUploaded: false,
            textFile: ""
        }
    }

    showFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);

            this.setState({
                isUploaded: true,
                textFile: text
            });
        };
        reader.readAsText(e.target.files[0])
    };

    render = () => {

        return (
            <div>
                {this.state.isUploaded ?
                (
               <Viewer textFile={this.state.textFile} />
                ) :
                (
                <div><input type="file" onChange={(e) => this.showFile(e)}/></div>
                )}
            </div>
        )
    };
}

export default App;