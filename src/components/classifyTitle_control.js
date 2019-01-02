
import React, { Component } from 'react'
import {
    Form, Input, Button, message
} from 'antd';


import { fetchRequest } from '../utils/http'

class ClassifyForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let res = await fetchRequest("classifyTitle/newTitle", "POST", values)
                if (res.status === "ok") {
                    message.success(res.msg)
                    this.props.form.resetFields();
                    this.props.handleAdd("add")
                } else {
                    message.error(res.msg)
                }
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入分类标题!' }],
                    })(
                        <Input placeholder="请输入分类标题" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" icon="plus" htmlType="submit">添加</Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(ClassifyForm)