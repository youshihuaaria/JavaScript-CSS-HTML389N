import React, { Component } from "react";

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <ul key="placeList">
                    {this.props.returnList.map((element) =>
                        <li>
                            {element.city} - {element.state}
                        </li>
                    )
                    }
                </ul>
            </div>
        );
    }
}

export default List