import Editor, { OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import { PrettierConfig } from '../config/prettier-config'
import '../Stylesheets/_code-editor.css'
interface CodeEditorProps {
    initialValue?: string
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue());
        })
    };

    const onFormat = () => {
        if (!editorRef.current) return;
        const formatted = PrettierConfig(editorRef.current.getValue());
        editorRef.current.setValue(formatted);
    }

    return (
        <div className="editor-wrapper">
            {/* <button onClick={onFormat}>Format</button> */}
            <Editor
                language="javascript"
                onMount={handleEditorDidMount}
                value={initialValue}
                height="100%"
                options={{
                    fontSize: 16,
                    folding: false,
                    lineNumbersMinChars: 3,
                    minimap: { enabled: false },
                    mouseWheelZoom: true,
                    showUnused: false,
                    scrollBeyondLastLine: false,
                    showDeprecated: true,
                    wordWrap: "on",
                    automaticLayout: true,
                    tabSize: 4,
                    theme: 'vs-dark'
                }}

            />
        </div >
    )
}

export default CodeEditor
