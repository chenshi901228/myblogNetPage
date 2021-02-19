import React, { Component } from 'react'
import { Select, Form, Input, Button, DatePicker, message } from 'antd';

import Editor from 'wangeditor'


import { Request } from '../../utils/axiosRequest'
import { baseUrl } from '../../config/globconf'


import styles from '../../css/editor.module.css'
import FormItem from 'antd/lib/form/FormItem';

const Option = Select.Option;
const { TextArea } = Input;
let editor = null
class ContentForm extends Component {
    state = {
        time: null,
        selectOption: [],
        editorHtml: ""
    };
    async componentDidMount() {
        // 获取分类
        let result = await Request("/classifyTitle/findTitle", "post")
        if (result.data.status === "ok") {
            this.setState({
                selectOption: result.data.msg
            })
        }
        //富文本相关设置
        let el = document.querySelector("#box")
        editor = new Editor(el)
        editor.config.height = 400
        editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            // resultFiles 是 input 中选中的文件列表
            // insertImgFn 是获取图片 url 后，插入到编辑器的方法
            resultFiles.map(async item => {
                let formData = new FormData();
                formData.append('file', item);
                let img_res = await Request("/upload", "post", formData)
                insertImgFn(baseUrl + img_res.data.msg.url)
            })
            // 上传图片，返回结果，将图片插入到编辑器中
        }
        editor.config.onchange = (html) => {
            this.setState({
                editorHtml: html
            })
        }
        editor.config.onchangeTimeout = 1000
        editor.create()
    }

    componentWillUnmount() {
        // 销毁编辑器
        new Editor(document.querySelector("#box")).destroy()
    }
    handleSubmit = (e) => {
        let t = {};
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                Object.assign(t, values, { time: this.state.time }, { editorHtml: this.state.editorHtml })
                let result = await Request("/content/newContent", "post", t)
                if (result.data.status === "ok") {
                    message.success("添加文章成功")
                    this.props.form.resetFields()
                    new Editor(document.querySelector("#box")).txt.clear()   //清空编辑器
                    this.setState({
                        time: null,
                    })
                } else {
                    message.error(result.data.msg)
                }
            }
        });
    }

    timeChange = (i, value) => {
        this.setState({
            time: value,
        });
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
                    <FormItem
                        label="正文"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 20 }}
                        colon>
                        <div id="box" className={styles.box}>
                        </div>
                    </FormItem>
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
                        <Button type="primary" htmlType="submit">添加此文章</Button>
                    </Form.Item>
                </Form>

            </div >
        )
    }
}

export default Form.create()(ContentForm)