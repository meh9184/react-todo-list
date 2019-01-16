import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

// const initialTodos = new Array(500).fill(0).map(
//   (value, index) => ({id: index, text: `일정 ${index}`, done: false})
// );

class App extends Component {

  state = {
    input: '',
    todos: [
      {
        id: 0,
        text: '리액트 공부',
        done: true
      },
      {
        id: 1,
        text: '리덕스 공부',
        done: false
      }
    ]
  }

  id = 1;
  getId = () => {
    return ++this.id;
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({
      input: value
    });  
  }

  handleInsert = () => {
    const {todos, input} = this.state;

    // 현재의 정보 기반으로 새로운 todo 생성
    const newTodo = {
      text: input,
      done: false,
      id: this.getId()
    };

    // 현재 todos 안에 새로 추가할 newTodo 삽입
    this.setState({
      todos: [...todos, newTodo],
      input: ''
    });
  }

  handleToggle = (id) => {
    const {todos} = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    const toggled = {
      ...todos[index],
      done: !todos[index].done,
    };

    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index+1, todos.length)
      ]
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    const index = todos.findIndex((todo)=> todo.id === id );
  
    this.setState({
      todos: [
        ...todos.slice(0, index),
        ...todos.slice(index+1, todos.length)
      ]
    });
  }

  render() {
    const {input, todos} = this.state;
    const {
      handleChange, 
      handleInsert, 
      handleToggle,
      handleRemove
    } = this;

    return (
      <PageTemplate>
        <TodoInput 
          onChange={handleChange} 
          onInsert={handleInsert} 
          value={input}
        />
        <TodoList 
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </PageTemplate>
    );
  }
}

export default App;