import React, { Component } from 'react'

export class confirmedChoice extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            choice: this.props.location.state.choice,
        }
    }
    render() {
        const { choice } = this.state;
        const result = choice.type === "GP" ? ( 
            <div>{choice.properties.HCI_NAME}</div>
        ) : (<div>{choice.Name}</div>)
        return (
            
            <div>
                Thank you, the details of your selected clinic for your follow-up treatment are below:
                <br/> <hr /> {result}
                <button> Send to my email </button>
            </div>
        )
    }
}

export default confirmedChoice
