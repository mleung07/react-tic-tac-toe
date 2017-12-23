import React from 'react';

class Square extends React.Component {

    render() {
        return (
            <button className={"square " + (this.props.highlight ? 'highlight' : '')}  onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;