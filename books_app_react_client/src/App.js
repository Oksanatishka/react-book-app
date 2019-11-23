import React, { Component } from 'react';
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import axios from 'axios';

// function A(t1, t2) {
//     this.t1 = t1;
//     this.t2 = t2;

//     console.log('this A', this);
// }

// A();

// A = A.bind({ hello: 'world' });

// A()

// let myA = new A('hello', 'world');
// let myB = new A('hello1', 'world1');

// let filteredArray = [...this.state.books];

// console.log('result', { myA, myB });
class App extends Component {
    // state = {
    //     books: [],
    //     filteredBooks: [],
    //     newBookData: {
    //         title: '',
    //         rating: ''
    //     },
    //     searchData: {
    //         title: ''
    //     },
    //     editBookData: {
    //         id: '',
    //         title: '',
    //         rating: ''
    //     },
    //     newBookModal: false,
    //     editBookModal: false
    // };

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            filteredBooks: [],
            newBookData: {
                title: '',
                rating: ''
            },
            searchData: {
                title: ''
            },
            editBookData: {
                id: '',
                title: '',
                rating: ''
            },
            newBookModal: false,
            editBookModal: false
        };

        this.temp = '123';
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   if (propsAreEqual(this.props, nextProps)) {
    //     return false;
    //   }
    //   if (stateAreEqual(this.state.books, nextState.books)) {
    //     return false;
    //   }
    //   return true;
    // }
    componentDidMount() {
        this._refreshBooks();
    }

    toggleNewBookModal() {
        this.setState({
            newBookModal: !this.state.newBookModal
        });
    }

    addBook() {
        axios.post('http://localhost:3001/books', this.state.newBookData).then(res => {
            let { books } = this.state;
            books.push(res.data);
            this.setState({ books, newBookModal: false });
        });
    }
    toggleEditBookModal() {
        this.setState({
            editBookModal: !this.state.editBookModal
        });
    }
    editBook(id, title, rating) {
        this.setState({
            editBookData: { id, title, rating },
            editBookModal: !this.state.editBookModal
        });
    }
    updateBook() {
        let { title, rating } = this.state.editBookData;
        axios
            .put('http://localhost:3001/books/' + this.state.editBookData.id, {
                title,
                rating
            })
            .then(response => {
                this._refreshBooks();
            });
    }

    deleteBook(id) {
        axios.delete('http://localhost:3001/books/' + id).then(response => {
            this._refreshBooks();
        });
    }
    _refreshBooks() {
        axios.get('http://localhost:3001/books').then(res => {
            this.setState({
                books: res.data
            });
        });
    }
    render() {
        let result;
        if (this.state.filteredBooks.length !== 0) {
            result = this.state.filteredBooks;
        } else {
            result = this.state.books;
        }
        let books = result.map(book => {
            return (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.rating}</td>
                    <td>
                        <Button
                            color="success"
                            size="sm"
                            className="mr-2"
                            onClick={this.editBook.bind(this, book.id, book.title, book.rating)}
                        >
                            Edit
                        </Button>{' '}
                        <Button color="danger" size="sm" onClick={() => this.deleteBook(book.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="App container">
                <h1>Books App</h1>
                <Button
                    className="my-3"
                    color="primary"
                    onClick={this.toggleNewBookModal.bind(this)}
                >
                    Add Book
                </Button>{' '}
                <Button
                    className="my-3"
                    color="info"
                    onClick={e => {
                        this.state.books.sort((a, b) => {
                            if (a.title > b.title) {
                                return 1;
                            } else if (a.title < b.title) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredBooks: this.state.books
                        });
                    }}
                >
                    Sort by Title ASC
                </Button>{' '}
                <Button
                    className="my-3"
                    color="info"
                    onClick={e => {
                        this.state.books.sort((a, b) => {
                            if (a.title > b.title) {
                                return -1;
                            } else if (a.title < b.title) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredBooks: this.state.books
                        });
                    }}
                >
                    Sort by Title DESC
                </Button>{' '}
                <Button
                    className="my-3"
                    color="secondary"
                    onClick={e => {
                        this.state.books.sort((a, b) => {
                            if (a.rating > b.rating) {
                                return 1;
                            } else if (a.rating < b.rating) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredBooks: this.state.books
                        });
                    }}
                >
                    Sort by Rating ASC
                </Button>{' '}
                <Button
                    className="my-3"
                    color="secondary"
                    onClick={e => {
                        this.state.books.sort((a, b) => {
                            if (a.rating > b.rating) {
                                return -1;
                            } else if (a.rating < b.rating) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredBooks: this.state.books
                        });
                    }}
                >
                    Sort by Rating DESC
                </Button>{' '}
                {/* <Form> */}
                <FormGroup>
                    <Input
                        type="search"
                        placeholder="Search for ..."
                        onChange={e => {
                            this.setState({
                                filteredBooks: this.state.books.filter(book => {
                                    return book.title.indexOf(e.target.value) !== -1;
                                })
                            });
                        }}
                    />
                </FormGroup>
                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
                        Add a new book
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.newBookData.title}
                                onChange={e => {
                                    let { newBookData } = this.state;
                                    newBookData.title = e.target.value;
                                    this.setState({ newBookData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input
                                id="rating"
                                value={this.state.newBookData.rating}
                                onChange={e => {
                                    let { newBookData } = this.state;
                                    newBookData.rating = e.target.value;
                                    this.setState({ newBookData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addBook.bind(this)}>
                            Add Book
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.editBookModal}
                    toggle={this.toggleEditBookModal.bind(this)}
                >
                    <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
                        Edit a new book
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.editBookData.title}
                                onChange={e => {
                                    let { editBookData } = this.state;
                                    editBookData.title = e.target.value;
                                    this.setState({ editBookData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input
                                id="rating"
                                value={this.state.editBookData.rating}
                                onChange={e => {
                                    let { editBookData } = this.state;
                                    editBookData.rating = e.target.value;
                                    this.setState({ editBookData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateBook.bind(this)}>
                            Update Book
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books}
                        {/* {this.state.books.map(book => (
                            <tr>
                                <td>{book.name}</td>

                                
                                <td>Book title</td>
                                <td>2.5</td>
                                <td>
                                    <Button
                                        color="success"
                                        size="sm"
                                        className="mr-2"
                                        onClick={this.toggleEditBookModal.bind(this)}
                                    >
                                        Edit
                                    </Button>
                                    
                                    <Button size="sm" color="danger">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default App;
