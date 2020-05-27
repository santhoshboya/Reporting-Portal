import React from 'react'
class HelloWorld extends React.Component{
    render(){
        return(
        <span>`hello ${this.props.msg}`</span>
        )
    }
}

export {HelloWorld}