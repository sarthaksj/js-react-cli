import { useRef, useEffect } from 'react';
import { Markup } from './markup';
import '../../Stylesheets/_preview.css';

interface PreviewProps {
      code: string;
      error: string
}

const html = Markup();

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
      const iframe = useRef<any>();

      useEffect(() => {
            iframe.current.srcdoc = html;
            setTimeout(() => {
                  iframe.current.contentWindow.postMessage(code, '*');
            }, 40);
      }, [code]);

      console.log(error);

      return (
            <div className="preview-wrapper">
                  <iframe
                        title="result"
                        ref={iframe}
                        sandbox="allow-scripts"
                        srcDoc={html} />
            </div>
      );
};

export default Preview;
