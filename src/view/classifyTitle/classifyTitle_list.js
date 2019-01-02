import React, { Component } from 'react'

import AddifyTitle from '../../components/classifyTitle_control'

import {
    Table, Button
} from 'antd';

import { Request } from '../../utils/axiosRequest'

function expandedRowRender(record) {
    let data = [];
    data = record.contents
    const columns = [
        { title: '文章标题', dataIndex: 'title', key: 'title', align: 'center', },
        { title: '简介', dataIndex: 'intro', key: 'intro', align: 'center', },
        {
            title: '图片', dataIndex: 'showImg', key: 'showImg', align: 'center',
            render: (text, record) => (
                <span className="table-operation">
                    <img alt="图片展示" style={{ width: 50, height: 50 }} src={text} />
                </span>
            ),
        },
        { title: '日期', dataIndex: 'date', key: 'date', align: 'center', },
        {
            title: '操作',
            dataIndex: 'operation',
            key: '_id',
            align: 'center',
            render: () => (
                <span className="table-operation">
                    <Button type="primary" style={{ marginRight: 10 }}>编辑</Button>
                    <Button type="danger">删除</Button>
                </span>
            ),
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={record => record._id}
        />
    );
}


export default class extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        this.getifysList()
    }
    async getifysList() {
        let result = await Request("/classifyTitle/findTitle", "post")
        this.setState({
            data: result.data.msg
        })
    }
    handleAdd(action) {
        if (action) {
            this.getifysList()
        }
    }
    render() {
        const columns = [
            { title: '分类', dataIndex: 'title', key: 'title' },
            {
                title: '操作', key: '_id', align: 'center',
                render: () =>
                    <span>
                        <Button type="primary" style={{ marginRight: 10 }}>编辑</Button>
                        <Button type="danger">删除</Button>
                    </span>
            },
        ];
        return <div>
            <AddifyTitle handleAdd={(e) => { this.handleAdd(e) }} />
            <Table
                className="components-table-demo-nested"
                columns={columns}
                rowKey={record => record._id}
                expandedRowRender={expandedRowRender}
                dataSource={this.state.data}
                onExpand={this.getArticle}
            />
        </div>
    }
}