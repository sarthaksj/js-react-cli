import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';
import './Stylesheets/_reset.css'

const App: React.FunctionComponent = () => {
    return <CodeCell />
};

ReactDOM.render(<App />, document.getElementById('root'));

