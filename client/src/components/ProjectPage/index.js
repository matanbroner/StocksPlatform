import React from "react"

class ProjectPage extends React.PureComponent {
    constructor(props){
        super(props);

        console.log(this.props)
    }

    render(){
        return(
            <div>
                Project ID {this.props.match.params.id}
            </div>
        )
    }
}


export default ProjectPage