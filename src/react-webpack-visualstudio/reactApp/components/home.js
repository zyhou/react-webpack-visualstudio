import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: []
        }

        axios.get('/api/values')
            .then(response => {
                this.setState({ values: JSON.stringify(response.data) });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        return (
            <div>
                {this.state.values}
           </div>
        );
    }

}