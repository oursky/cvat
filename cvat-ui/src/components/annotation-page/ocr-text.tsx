import './styles.scss';
import React from 'react';

interface Props {
    frameOcr: string;
}

function OCRText(props: Props) {
    const {frameOcr} = props;
    const {isOpen} = useOCRText();
    return isOpen ? (
        <pre class="ocr-text-container">
            {frameOcr}
        </pre>
    ): null;
}

type OCRTextContextValue = ReturnType<typeof useMakeContext>;
const OCRTextContext = React.createContext<OCRTextContextValue>(null as any);

function useMakeContext() {

    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = React.useCallback(() => {
        setIsOpen(!isOpen);
    },[isOpen])

    return React.useMemo(() => ({
        isOpen,
        toggleOpen,
    }),[isOpen, toggleOpen]);
}

interface ContextProviderProps {
  children: React.ReactNode;
}

export const OCTTextContextProvider = (props: ContextProviderProps) => {
    const value = useMakeContext();
    return <OCRTextContext.Provider {...props} value={value} />;
}

export function useOCRText() {
  return React.useContext(OCRTextContext);
}

export default React.memo(OCRText);
