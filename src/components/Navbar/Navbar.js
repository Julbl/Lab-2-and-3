import { Menu } from 'antd'
import React, {Component} from 'react'
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    state = {
        nav:[
            {name:'Main',path:'/'},
            {name:'Todo List',path:'/todo'},
            {name:'Users',path:'/users'},
        ]
    }
    render(){
        const {nav} = this.state;
        return(
            <>
                <Menu mode='vertical'>
                    {nav.map(({name,path},index)=>{
                        return (
                            <Menu.Item key={index}>
                                <Link to={path}>{name}</Link>
                            </Menu.Item>
                        )
                    })}

                </Menu>
                {this.props.children}
            </>
        )
    }
} 