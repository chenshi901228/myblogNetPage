
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

// import Hello from './hello'
import User from './user/user'
import IfyTitle_list from './classifyTitle/classifyTitle_list'
import IfyTitle_content from './classifyTitle/classify_content'



import { Layout, Menu, Icon, } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class extends Component {
    state = {
        defaultSelectedKey: "1",
        defaultOpenKey: "ify"
    };
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        onOpenChange={this.openChange}
                        // defaultOpenKeys={[this.state.defaultOpenKey]}
                        // defaultSelectedKeys={[this.state.defaultSelectedKey]}
                        mode="inline"
                    >
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <Link style={{ display: "inline-block" }} to="/user">当前用户</Link>
                        </Menu.Item>
                        <SubMenu
                            key="ify"
                            title={<span><Icon type="bars" /><span>导航分类</span></span>}
                        >
                            <Menu.Item key="2">
                                <Link to="/ify_list">分类列表</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/ify_content">添加内容</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
                        myblog
                    </Header>
                    <Content style={{ margin: '20px 16px' }}>
                        <div>
                            <Route path="/user" component={User} />
                            <Route path="/ify_list" component={IfyTitle_list} />
                            <Route path="/ify_content" component={IfyTitle_content} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
