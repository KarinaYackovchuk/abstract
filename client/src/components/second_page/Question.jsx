import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';


const Question = () => {
    const [syndyk, setSyndyk] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/getallquestion')

            .then(res => res.json())
            .then(res => {
                console.log(res)
                let arr = [...res.resultSaveQuestion]
                for (let i = 0; i < arr.length; i++) {
                    arr[i].number = i + 1

                }
                setSyndyk(arr)
            })
    }, [])

    const [editRow, record] = useState([])

    let arrQuestion = [...syndyk]
    const editQuestion = (e) => {
        console.log(e)
        // for (let i = 0; i < arrQuestion.length; i++) {
        //     if (arrQuestion[i].id === e) {
        //         console.log(arrQuestion[i])
        //     }
        // }
        // 1.Поместить в useState найденную строчку
        // 2.Запустить модальное окно
    };


    const deleteQuestion = async (id) => {
        console.log(id)

        const reqDeleteQuestion = await fetch(
            'http://localhost:5000/delete_question',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ id: id })
            });
        const resultDeleteQuestion = await reqDeleteQuestion.json();
        console.log(resultDeleteQuestion)
        message.success(resultDeleteQuestion.response)
        // window.location.reload()
        // 1.сундук
        // 2.айди записи в сундуке, которую надо удалить
        // 3.функция, редактирующая сундук(сетсундук)
        // 4.информация с бека, что удалена строка

        let arr = [...syndyk]
        // // берем существующий сундук (переменную)
        let newArr = []
        // // объявляем новый массив
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id !== id) {
                newArr.push(arr[i])
            }
            //     // через цикл фор перебираем все объекты, которые находятся в массиве и если айди обьекта в массиве не равно айди - в новый пустой массив отправлется обьект.
        }
        setSyndyk(newArr)
        // // в сундуке отображается новый измененный массив.
    }
    const columns = [
        {
            title: 'Номер вопроса',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Вопрос',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Ответ',
            dataIndex: 'answer',
            key: 'answer',
        },
        {
            title: 'Редактирование',
            key: 'id',
            render: (record) => <button onClick={() => editQuestion(record)}>Редактировать</button>
        },
        {
            title: 'Удаление',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <button onClick={() => deleteQuestion(id)}>Удалить</button>
        },
    ]


    return (
        <Table
            columns={columns}
            dataSource={syndyk}
        />)
}


export default Question