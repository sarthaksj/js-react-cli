import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview/preview';
import startService from '../config/bundler/esbuild-config';
import Resizable from './resizable';
import '../Stylesheets/_code-cell.css'

const CodeCell: React.FunctionComponent = () => {
    const [input, setInput] = useState('');
    const [err, setError] = useState('');
    const [bundledCode, setBundledCode] = useState('');

    const time = 1000

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await startService(input);
            setBundledCode(output.code);
            setError(output.err)
        }, time)

        return () => {
            clearTimeout(timer);
        }
    }, [input])

    return (
        <div className="codecell_wrapper">
            <Resizable direction="horizontal">
                <CodeEditor
                    initialValue="const a = 1;"
                    onChange={(value) => setInput(value)} />
            </Resizable>
            <Preview code={bundledCode} error={err} />
        </div>
    );
};
export default CodeCell;