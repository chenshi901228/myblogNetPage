import React, { Component } from 'react'


import AddifyTitle from '../../components/classifyTitle_control'

import {
    Table, Button, message
} from 'antd';

import { Request } from '../../utils/axiosRequest'


async function delContent(_id) {
    let result = await Request("/content/delContent", "post", { _id })
    console.log(result)
}

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
            render: (text, record) => (
                <span className="table-operation">
                    <Button type="primary" style={{ marginRight: 10 }}>编辑</Button>
                    <Button type="danger" onClick={() => { delContent(record._id) }}>删除</Button>
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
    async handleDel(_id) {
        let res = await Request("/classifyTitle/delTitle", "post", { _id })
        message.success(res.data.msg)
        this.getifysList()
    }
    render() {
        const columns = [
            { title: '分类', dataIndex: 'title', key: 'title' },
            {
                title: '操作', key: '_id', align: 'center',
                render: (text, record) =>
                    <span>
                        <Button type="primary" style={{ marginRight: 10 }}>编辑</Button>
                        <Button type="danger" onClick={() => { this.handleDel(record._id) }}>删除</Button>
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