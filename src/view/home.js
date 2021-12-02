
import React, { Component } from 'react'
import {  Link } from 'react-router-dom'

import { Layout, Menu } from 'antd'
import { UserOutlined, UnorderedListOutlined } from '@ant-design/icons'


import Routes from '../router/route'



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Home extends Component {
    state = {
        defaultSelectedKey: "1",
        defaultOpenKey: "2"
    };
    openChange(value){
        console.log(value)
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        onOpenChange={this.openChange}
                        defaultOpenKeys={[this.state.defaultOpenKey]}
                        defaultSelectedKeys={[this.state.defaultSelectedKey]}
                        mode="inline"
                    >
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link style={{ display: "inline-block" }} to="/user">当前用户</Link>
                        </Menu.Item>
                        <SubMenu
                            key="2"
                            icon={<UnorderedListOutlined />}
                            title={<span>导航分类</span>}
                        >
                            <Menu.Item key="2-1">
                                <Link to="/classifyTitleList">分类列表</Link>
                            </Menu.Item>
                            <Menu.Item key="2-2">
                                <Link to="/classifyContent">添加内容</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
                        myblog
                    </Header>
                    <Content style={{ margin: '20px 16px' }}>
                        <Routes />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
