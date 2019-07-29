import "styles.css";
import "core-js";
import React from "react";
import ReactDOM from "react-dom";

class Todos extends React.Component {
  state = {
    //todos: Array.from(Array(10), (_, i) => ({ id: i, text: `Todo ${i}`, done: "false"})),
    todos: [],
  }

  removeTodo = pos => {
    this.setState(({todos}) => ({
      todos: [...todos.slice(0, pos), ...todos.slice(pos + 1)],
    }));
  };

  addTodo = item => {
    this.setState({todos: this.state.todos.concat([item])});
  }

  render() {
    return (
      <>
      <header>
        <h1>My Todos</h1>
      </header>
      <main>
        <ul>
          {this.state.todos.map((todo, i) => (
            <li key={i}>
              {todo}  
              <button key={i} onClick={() => this.removeTodo(i)}>
                Delete
              </button>
            </li>
          ))}
          <TodoInput addTodo={this.addTodo} />
        </ul>    
      </main>
      </>
    );
  }
}

class TodoInput extends React.Component {
  state= {item: ''};

  onChange = (e) => {
    this.setState({item: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.item);  
    this.setState({item: ''}, () => this.refs.item.focus());
  }
  
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="item"
               onChange={this.onChange}
               value={this.state.item} />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

class TodoCheckbox extends React.Component {
  
}

ReactDOM.render(<Todos />, document.getElementById("app"));
