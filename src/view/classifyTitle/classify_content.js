import React, { Component } from 'react'
import { Select, Form, Input, Button, DatePicker, Icon, message } from 'antd';


import { Request } from '../../utils/axiosRequest'

import UploadImg from '../../components/uploadImg'

const Option = Select.Option;
const { TextArea } = Input;
class ContentForm extends Component {
    state = {
        time: null,
        fileList: [],
        num: [],
        key: 0,
        selectOption: []
    };
    async componentDidMount() {
        let result = await Request("/classifyTitle/findTitle", "post")
        if (result.data.status === "ok") {
            console.log(result.data.msg)
            this.setState({
                selectOption: result.data.msg
            })
        }
    }
    handleSubmit = (e) => {
        let t = {}; t.imgs = []
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                Object.assign(t, values, { time: this.state.time })
                let { fileList } = this.state;
                if (fileList.length > 0) {
                    fileList.map(async item => {
                        var formData = new FormData();
                        formData.append('file', item.file);
                        let img_res = await Request("/upload", "post", formData)
                        if (img_res.data.status === "ok") {
                            t.imgs.push({ key: item.key, url: img_res.data.msg.url })
                        } else {
                            message.error(img_res.data.msg)
                        }
                        if (t.imgs.length === fileList.length) {
                            let result = await Request("/content/newContent", "post", t)
                            if (result.data.status === "ok") {
                                message.success("添加文章成功")
                                this.props.form.resetFields()
                                this.setState({
                                    num: [],
                                    fileList: [],
                                    key: 0,
                                    time: null
                                })
                            } else {
                                message.error(result.data.msg)
                            }
                        }
                    })
                } else {
                    let result = await Request("/content/newContent", "post", t)
                    if (result.data.status === "ok") {
                        message.success("添加文章成功")
                        this.props.form.resetFields()
                        this.setState({
                            num: [],
                            fileList: [],
                            key: 0,
                            time: null
                        })
                    } else {
                        message.error(result.data.msg)
                    }
                }
            }
        });
    }
    handleCancel = () => this.setState({ previewVisible: false })

    timeChange = (i, value) => {
        this.setState({
            time: value,
        });
    }

    handleUploadImg(e, k) {
        if (e.length === 1) {
            this.state.fileList.push({ key: k, file: e[0].originFileObj })
        } else {
            this.state.fileList.filter((item, index) => {
                if (item.key === k) {
                    this.state.fileList.splice(index, 1)
                }
                return this.state.fileList
            })
        }
    }
    addItem(type) {
        this.state.num.push({ key: this.state.key, type })
        // this.setState({ key: this.state.key++ })
        this.state.key++
        this.setState(this.state)
    }
    removeItem(k) {
        this.state.num.filter((item, index) => {
            if (k === item.key) {
                this.state.num.splice(index, 1)
                if (item.type === "图片") {
                    this.state.fileList.filter((itemX, indexX) => {
                        if (itemX.key === k) {
                            this.state.fileList.splice(indexX, 1)
                        }
                        return this.state.fileList
                    })
                }
            }
            return this.state.num
        })
        this.setState(this.state)
    }
    render() {
        // 表单相关
        const { getFieldDecorator } = this.props.form;
        const formItemSubmit = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 2 },
            },
        }
        const newContent = (
            <div>
                {this.state.num.map(item => {
                    if (item.type === "标题") {
                        return <Form.Item
                            label="小标题"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 4 }}
                            colon
                            key={item.key}
                        >
                            {getFieldDecorator('subTitle' + item.key, {
                                rules: [{ required: false, message: '' }],
                            })(
                                <div>
                                    <Input style={{ width: "80%", marginRight: 10 }} placeholder="请输入小标题" />
                                    <Button shape="circle" icon="close" onClick={() => { this.removeItem(item.key) }} />
                                </div>
                            )}
                        </Form.Item>
                    } else if (item.type === "内容") {
                        return <Form.Item
                            label="内容"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 10 }}
                            colon
                            key={item.key}
                        >
                            {getFieldDecorator("content" + item.key, {
                                rules: [{ required: false, message: '请输入内容!' }],
                            })(
                                <div>
                                    <TextArea style={{ width: "80%", marginRight: 10 }} placeholder="请输入内容" autosize={{ minRows: 6 }} />
                                    <Button shape="circle" icon="close" onClick={() => { this.removeItem(item.key) }} />
                                </div>
                            )}
                        </Form.Item>
                    } else {
                        return <Form.Item
                            label="显示图片"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 10 }}
                            colon
                            key={item.key}
                        >
                            <UploadImg handleUploadImg={(e) => { this.handleUploadImg(e, item.key) }} />
                            <Button shape="circle" icon="close" onClick={() => { this.removeItem(item.key) }} />
                        </Form.Item>
                    }
                })}
            </div>
        )
        return (
            <div>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="分类标题"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 4 }}
                        colon
                    >
                        {getFieldDecorator('ify_title', {
                            rules: [{ required: true, message: '请输入分类标题!' }],
                        })(
                            <Select
                                notFoundContent="请前去添加分类"
                                placeholder="请选择分类标题"
                                style={{ flex: 1 }}>
                                {
                                    this.state.selectOption.map(item => {
                                        return <Option key={item._id} value={item.title} disabled={item.title === "网站首页" ? true : false}>{item.title}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="文章标题"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 4 }}
                        colon
                    >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入文章标题!' }],
                        })(
                            <Input placeholder="请输入文章标题" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="简介"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 8 }}
                        colon
                    >
                        {getFieldDecorator('intro', {
                            rules: [{ required: true, message: '请输入简单介绍!' }],
                        })(
                            <TextArea placeholder="请输入简单介绍" autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </Form.Item>
                    {newContent}
                    <Form.Item
                        label="日期"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 8 }}
                        colon
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择日期"
                            onChange={this.timeChange}
                        />
                    </Form.Item>
                    <Form.Item {...formItemSubmit}>
                        <Button type="dashed" style={{ marginRight: 10 }} onClick={() => { this.addItem("标题") }}>
                            <Icon type="plus" /> 添加标题
                        </Button>
                        <Button type="dashed" style={{ marginRight: 10 }} onClick={() => { this.addItem("内容") }}>
                            <Icon type="plus" /> 添加内容
                        </Button>
                        <Button type="dashed" onClick={() => { this.addItem("图片") }}>
                            <Icon type="plus" /> 添加图片
                        </Button>
                    </Form.Item>
                    <Form.Item {...formItemSubmit}>
                        <Button type="primary" htmlType="submit">添加此文章</Button>
                    </Form.Item>
                </Form>

            </div >
        )
    }
}

export default Form.create()(ContentForm)