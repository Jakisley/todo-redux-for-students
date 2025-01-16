import { React, useRef, useState } from 'react';
import './todo-field.css';
import { useDispatch } from 'react-redux';
import { changeTaskStatus, removeTodo } from '../../../store/todo-actions';

const TodoField = ({ text, id, status }) => {
    const [disabled, setDisabled] = useState(false);
    const [fieldValue, setFieldValue] = useState(text);
    const inputRef = useRef(null);

    const dispatch = useDispatch();

    const deleteTodo = () => {
        dispatch(removeTodo(id));
    };

    const handleChangeTaskStatus = () => {
        dispatch(changeTaskStatus(id));
    };

    const showInput = () => {
        setDisabled((prev) => !prev);
        setTimeout(() => {
            inputRef.current.focus();
        }, 100);
    };

    const changeField = (e) => {
        setFieldValue(e.target.value);
    };

    const keyDownField = (e) => {
        if (e.key === 'Enter') {
            inputRef.current.blur();
        }
    };

    return (
        <div className="fieldWraper">
            {disabled ? (
                <input
                    value={fieldValue}
                    className="toDoField"
                    onBlur={() => setDisabled((prev) => !prev)}
                    onChange={changeField}
                    onKeyDown={keyDownField}
                    ref={inputRef}
                />
            ) : (
                <span
                    className={`toDoPharagraph ${
                        status ? 'toDoPharagraphDone' : 'totoDoPharagraphActive'
                    }`}
                    onClick={showInput}
                >
                    {fieldValue}
                </span>
            )}
            <button className="delBtn" onClick={() => deleteTodo(id)}>
                🗑️
            </button>
            <button
                className="complitedBtn"
                onClick={() => handleChangeTaskStatus(id)}
            >
                ✔️
            </button>
        </div>
    );
};

export default TodoField;
