import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from 'react';
import '../Stylesheets/_resizable.css'

interface ResizableProps {
    direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);


    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
    }, []);

    const resizableProps: ResizableBoxProps = {
        className: 'resize-horizontal',
        minConstraints: [innerWidth * 0.2, Infinity],
        maxConstraints: [innerWidth * 0.75, Infinity],
        height: Infinity,
        width,
        resizeHandles: ['e'],
        onResizeStop: (event, data) => {
            setWidth(data.size.width);
        },
    };

    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    )
}
export default Resizable;