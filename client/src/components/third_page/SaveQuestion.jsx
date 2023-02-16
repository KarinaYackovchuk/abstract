import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
function SaveQuestion() {


    const onFinish = async (values) => {
        console.log('Success:', values);
        const reqComparison = await fetch(
            'http://localhost:5000/savequestion',

            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(values)
            });
        const arrSortUserId = await reqComparison.json();
        console.log(arrSortUserId)
        message.success('Сохранено успешно')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Вопрос"
                    name="question"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите вопрос',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ответ"
                    name="answer"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите ответ',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}

export default SaveQuestion